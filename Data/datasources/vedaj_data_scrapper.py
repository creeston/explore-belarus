from dataclasses import dataclass
import threading
from bs4 import BeautifulSoup
import requests
from tinydb import Query, TinyDB

# TODO

# Extract sights data from description text using LLM


@dataclass
class VedajPlaceMetadata:
    name: str
    url: str


@dataclass
class VedajPlace:
    name: str
    location: list[str]
    images: list[str]
    url: str
    tags: list[str]


class VedajDataScrapper:
    def __init__(self, lang=None):
        self.base_url = "https://vedaj.by"
        self.all_places_url = f"{self.base_url}/index.php/garady/allcities" if lang is None else f"{self.base_url}/index.php/{lang}/goroda/allcities"

    def get_data(self):
        places_metadata = self.__get_places_metadata()
        places = []
        for metadata in places_metadata:
            place = self.__get_place_data(metadata)
            places.append(place)
            print(place)
        return places
    
    def get_places_metadata(self) -> list[VedajPlaceMetadata]:
        return self.__get_places_metadata()
    
    def get_place_data(self, metadata: VedajPlaceMetadata) -> VedajPlace:
        retry_count = 3
        for _ in range(retry_count):
            try:
                return self.__get_place_data(metadata)
            except Exception as e:
                print(e)
                continue
        raise Exception("Failed to get place data after 3 retries.") 
    
    def __get_place_data(self, metadata: VedajPlaceMetadata) -> VedajPlace:
        headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36' }
        response = requests.get(metadata.url, timeout=600, headers=headers)
        if response.status_code != 200:
            raise Exception(f"Failed to get data for {metadata.name}. Status code: {response.status_code}")
        
        soup = BeautifulSoup(response.text, 'html.parser')
        tags_container = soup.find("div", class_="tags")
        tags = [tag.text.strip() for tag in tags_container.find_all("a")]
        path_div = soup.find("ul", class_="breadcrumb")
        path_elements = [a.text.strip() for a in path_div.find_all("a")]
        address = path_elements[2:]
        article_body = soup.find("div", {"itemprop": "articleBody"})
        images = [self.base_url + img["src"] for img in article_body.find_all("img")]
        return VedajPlace(
            metadata.name,
            address,
            images,
            metadata.url,
            tags
        )

    def __get_places_metadata(self) -> list[VedajPlaceMetadata]:
        headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36' }
        response = requests.get(self.all_places_url, timeout=600, headers=headers)
        soup = BeautifulSoup(response.content, "html.parser")
        table = soup.find("table", class_="category table table-striped table-bordered table-hover")
        table_body = table.find("tbody")
        places_metadata = []
        for place_div in table_body.find_all("tr"):
            link = place_div.find("a")
            name = link.text.strip()
            link = self.base_url + link["href"]
            places_metadata.append(VedajPlaceMetadata(name, link))
        return places_metadata
    

if __name__ == "__main__":
    db = TinyDB("vedaj_ru.json")
    scraper = VedajDataScrapper("ru")
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
    semaphore = threading.Semaphore(20)

    def process_metadata(metadata: VedajPlaceMetadata):
        print(metadata.url)
        try:
            place = scraper.get_place_data(metadata)
            print(len(place.tags))
            with lock:
                db.update({"place": place.__dict__}, Place.url == metadata.url)
        finally:
            semaphore.release()
    
    threads = []
    for metadata in empty_metadatas:
        semaphore.acquire()
        thread = threading.Thread(target=process_metadata, args=(VedajPlaceMetadata(**metadata),))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()