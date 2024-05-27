from dataclasses import dataclass
import threading

from bs4 import BeautifulSoup
import requests

from tinydb import Query, TinyDB

@dataclass
class TropinkiPlaceMetadata:
    title: str
    url: str
    image: str


@dataclass
class TropinkiPlace:
    title: str
    address: str
    coordinates: tuple[float, float]
    image: str


class TropinkiDataScrapper:
    def __init__(self):
        self.base_url = "https://tropinki.by"
        self.all_places_url = f"{self.base_url}/vse-marshruty"

    def get_data(self):
        places_metadata = self.__get_places_metadata()
        places = []
        for metadata in places_metadata:
            place = self.__get_place_data(metadata)
            places.append(place)
            break
        return places
    
    def get_places_metadata(self) -> list[TropinkiPlaceMetadata]:
        return self.__get_places_metadata()
    
    def get_place_data(self, metadata: TropinkiPlaceMetadata) -> TropinkiPlace:
        retry_count = 3
        for _ in range(retry_count):
            try:
                return self.__get_place_data(metadata)
            except Exception as e:
                print(e)
                continue
        raise Exception("Failed to get place data after 3 retries.")

    def __get_place_data(self, metadata: TropinkiPlaceMetadata):
        response = requests.get(metadata.url, timeout=600)
        if response.status_code != 200:
            raise Exception(f"Failed to get data for {metadata.title}. Status code: {response.status_code}")
    
        soup = BeautifulSoup(response.text, 'html.parser')
        location_element = soup.find("div", class_="q-card__section q-card__section--vert")
        address = location_element.find("div", class_="text-body2 text-muted q-mb-xs").text.strip()
        coordinates = location_element.find("div", class_="q-chip__content col row no-wrap items-center q-anchor--skip").text.strip()
        coordinates = [float(coord.strip()) for coord in coordinates.split(",")]

        return TropinkiPlace(metadata.title, address, coordinates, metadata.image)

    def __get_places_metadata(self) -> list[TropinkiPlaceMetadata]:
        response = requests.get(self.all_places_url, timeout=600)
        soup = BeautifulSoup(response.text, 'html.parser')
        grid = soup.find("div", class_="q-tab-panel category-tab-panel")
        place_cards = grid.find_all("div", class_="q-card")
        result = []
        for place_card in place_cards:
            image = self.base_url + place_card.find("img")["src"]
            title_link = place_card.find("a", class_="post-card-header")
            title = title_link.text.strip()
            link = self.base_url + title_link["href"]
            result.append(TropinkiPlaceMetadata(title, link, image))
        return result


if __name__ == "__main__":
    scraper = TropinkiDataScrapper()
    db = TinyDB("tropinki.json")
    metadatas = db.all()
    Place = Query()
    if len(metadatas) == 0:
        metadatas = [
            metadata.__dict__ for metadata in scraper.get_places_metadata()
        ]
        for metadata in metadatas:
            db.insert(metadata)
    empty_metadatas = [metadata for metadata in metadatas if "place" not in metadata]
    print(f"Empty metadatas: {len(empty_metadatas)}")

    lock = threading.Lock()
    semaphore = threading.Semaphore(10)

    def process_metadata(metadata: TropinkiPlaceMetadata):
        print(metadata.url)
        try:
            place = scraper.get_place_data(metadata)
            with lock:
                db.update({"place": place.__dict__}, Place.url == metadata.url)
        finally:
            semaphore.release()
    
    threads = []
    for metadata in empty_metadatas:
        semaphore.acquire()
        thread = threading.Thread(target=process_metadata, args=(TropinkiPlaceMetadata(**metadata),))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()