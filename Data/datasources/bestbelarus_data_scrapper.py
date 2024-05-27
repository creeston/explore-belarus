from dataclasses import dataclass
from time import sleep
import requests

from bs4 import BeautifulSoup
from tinydb import Query, TinyDB


@dataclass
class BestBelarusPlaceMetadata:
    name: str
    url: str
    image: str
    title: str


@dataclass
class BestBelarusSight:
    name: str
    images: list[str]

@dataclass
class BestBelarusPlace:
    name: str
    location: str
    coords: tuple[float, float] | None
    sights: list[BestBelarusSight]
    url: str


class BestBelarusDataScrapper:
    def __init__(self):
        self.base_url = "https://bestbelarus.by"
        self.all_places_url = f"{self.base_url}/objects/all/"

    def get_data(self) -> list[BestBelarusPlace]:
        page_number = 1
        places_metadata = []
        while True:
            page_places_metadata = self.__get_data_from_page(page_number)
            if not page_places_metadata:
                break
            page_number += 1
            places_metadata.extend(page_places_metadata)
            sleep(1)

        places = []
        for metadata in places_metadata:
            place = self.__get_place_data(metadata)
            places.append(place)
        return places
    
    def get_places_metadata(self) -> list[BestBelarusPlaceMetadata]:
        page_number = 1
        places_metadata = []
        while True:
            page_places_metadata = self.__get_data_from_page(page_number)
            if not page_places_metadata:
                break
            page_number += 1
            places_metadata.extend(page_places_metadata)
            sleep(1)
        return places_metadata
    
    def get_place_data(self, metadata: BestBelarusPlaceMetadata) -> BestBelarusPlace:
        retry_count = 3
        for _ in range(retry_count):
            try:
                return self.__get_place_data(metadata)
            except Exception as e:
                print(e)
                continue
        raise Exception("Failed to get place data after 3 retries.") 
    
    def __get_place_data(self, metadata: BestBelarusPlaceMetadata) -> BestBelarusPlace:
        response = requests.get(metadata.url, timeout=600)
        if response.status_code != 200:
            raise Exception(f"Failed to get place data. Status code: {response.status_code}")
        
        soup = BeautifulSoup(response.text, 'html.parser')
        tabs_div = soup.find("div", class_="size_menu_top_new")
        tabs_links = tabs_div.find_all("a", {"data-toggle": "tab"})
        tab_content = soup.find("div", class_="tab-content")
        address_div = soup.find("div", class_="adress")

        sights = []
        for link in tabs_links:
            text = link.text.strip()
            href = link.attrs['href']
            gallery_id = href.split("#")[1]
            gallery_div = tab_content.find("div", id=gallery_id)
            images = gallery_div.find_all("img")
            image_links = [self.base_url + img['src'] for img in images]
            sight = BestBelarusSight(text, image_links)
            sights.append(sight)

        values = address_div.text.strip().split('\r\n')
        address = None
        if len(values) == 1:
            address = values[0]
        elif len(values) == 2:
            address = values[0]
        else:
            address = values[0] + values[1]
        coordinates_div = soup.find("div", class_="coordinates")
        if coordinates_div:
            coordinates_div = coordinates_div.text
            coords = [float(c.strip()) for c in coordinates_div.split(",")]
        else:
            coords = None
        return BestBelarusPlace(metadata.name, address.strip(), coords, sights, metadata.url)

    def __get_data_from_page(self, page):
        url = f"{self.all_places_url}/?PAGEN_1={page}"
        response = requests.get(url, timeout=600)
        if response.status_code != 200:
            raise Exception(f"Failed to get data from page {page}. Status code: {response.status_code}")
        
        soup = BeautifulSoup(response.text, 'html.parser')

        pagination_ul = soup.find('ul', class_='pagination')
        if not pagination_ul:
            raise Exception("Failed to find pagination ul.")
        
        active_li = pagination_ul.find('li', class_='active')
        if not active_li:
            raise Exception("Failed to find active li.")
        
        active_text = active_li.text.strip()
        if active_text != str(page):
            return None
        
        table_element = soup.find('div', class_='catalog item-views table')
        table_row = table_element.find('div', class_='row')
        rows = table_row.find_all('div', class_='row', recursive=False)
        rows = [row for row in rows if len(row.attrs['class']) == 1]

        places_metadata = []
        for row in rows:
            child_divs = row.find_all('div', recursive=False)
            table_div = child_divs[0]
            place_divs = [div for div in table_div.children if div.name == "div" and "data-nav-item" in div.attrs]
            for place_div in place_divs:
                image = place_div.find('div', class_='image')
                link = image.find('a')
                href = link['href']
                img = link.find('img')
                src = img['data-src']
                image_alt = img['alt']
                if image_alt is None:
                    text_element = place_div.find('div', class_='text')
                    title = text_element.text.strip()
                else:
                    title = image_alt.strip()
                name = title
                if ":" in name:
                    name = name.split(":")[0].strip()
                if name.endswith("..."):
                    name = name[:-3].strip()

                place_metadata = BestBelarusPlaceMetadata(name, self.base_url + href, self.base_url + src, title)
                places_metadata.append(place_metadata)
        return places_metadata


if __name__ == "__main__":
    db = TinyDB("bestbelarus.json")
    scraper = BestBelarusDataScrapper()
    metadatas = db.all()
    Place = Query()
    metadatas = [
            metadata.__dict__ for metadata in scraper.get_places_metadata()
    ]
    for metadata in metadatas:
        db.update(metadata, Place.url == metadata["url"])

    # if len(metadatas) == 0:
    #     metadatas = [
    #         metadata.__dict__ for metadata in scraper.get_places_metadata()
    #     ]
    #     for metadata in metadatas:
    #         db.insert(metadata)
    # empty_metadatas = [metadata for metadata in metadatas if "place" not in metadata]
    # print(f"Empty metadatas: {len(empty_metadatas)}")
    # for metadata in empty_metadatas:
    #     metadata = BestBelarusPlaceMetadata(**metadata)
    #     print(metadata.url)
    #     place = scraper.get_place_data(metadata)
    #     print(len(place.sights))
    #     place_dict = place.__dict__
    #     if place.sights is not None:
    #         place_dict["sights"] = [sight.__dict__ for sight in place.sights]
    #     db.update({"place": place_dict}, Place.url == metadata.url)