from dataclasses import dataclass
from enum import Enum
import requests
from bs4 import BeautifulSoup
from tinydb import TinyDB, Query
import threading

# TODO
# {
#    "name":"Береза",
#    "location":"Город (районный центр), Берёзовский район, Брестская область",
#    "coords":[
#       "52.53139",
#       "24.974063"
#    ],
#    "sights":[
#       {
#          "name":"монастырь картезианцев (руины)",
#          "image":"https://globustut.by/bereza/index.htmmonast_main027_d68.jpg",
#          "props":[
#             [
#                "Дата строительства",
#                "1648—89 гг."
#             ],
#             [
#                "Рейтинг (1..4)",
#                "увидеть обязательно"
#             ],
#             [
#                "Координаты",
#                "52.53322, 24.95936 (*)"
#             ],
#             [
#                "Списки",
#                "Топ 100Монастыри картезианцевВосстание 1830-31 гг."
#             ]
#          ]
#       }
#    ]
# }
# Extract list of tags for sight properly

# Location of sight should be set as "potential location" to place if place location is empty

# Coords should be float instead of string


class PlacePageSectionType(Enum):
    FIXED_HEADER = 1
    FIRST_MENTION = 2
    SIGHTS_TABLE = 3
    DESCRIPTION = 4
    SIGHTS = 5


@dataclass
class PlaceMetadata:
    name: str
    url: str
    rating: int
    photo_count: int


@dataclass
class ParsedSight:
    name: str
    image: str
    props: list[tuple[str, str]]


@dataclass
class GlobusPlace:
    name: str
    location: str
    coords: tuple[str, str]
    sights: list[ParsedSight]


@dataclass
class ParsedPlaceHeader:
    name: str
    location: str
    coords: tuple[float, float] | None


class GlobusDataScrapper:
    def __init__(self):
        self.base_url = "https://globustut.by"
        self.all_places_url = f"{self.base_url}/area_pl_all.htm"

    def get_places(self) -> list[GlobusPlace]:
        soup = self.__get_all_places_content()
        places_metadata = self.__extract_all_places_metadata(soup)
        places = []
        for metadata in places_metadata:
            place = self.get_place_data(metadata.url)
            places.append(place)
        return places

    def get_places_metadata(self) -> list[PlaceMetadata]:
        soup = self.__get_all_places_content()
        places_metadata = self.__extract_all_places_metadata(soup)
        return places_metadata

    def get_place_data(self, url: str) -> GlobusPlace:
        retry_count = 3
        for _ in range(retry_count):
            try:
                return self.__get_place_data(url)
            except Exception as e:
                print(e)
                continue
        raise Exception("Failed to get place data after 3 retries.") 
    
    def __get_place_data(self, url) -> GlobusPlace:
        soup = self.__get_place_soup(url)
        place_page_sections = self.__get_place_page_sections(soup)

        if place_page_sections[PlacePageSectionType.FIXED_HEADER] is None:
            raise Exception("Invalid place page")

        place_header = self.__get_parsed_place_header(
            place_page_sections[PlacePageSectionType.FIXED_HEADER]
        )
        if place_header is None:
            raise Exception("Invalid place header")

        sights_elements = place_page_sections[PlacePageSectionType.SIGHTS]
        if sights_elements is None:
            raise Exception("Invalid place sights")

        sights = []
        for sight_div in sights_elements:
            sight = self.__parse_sight_table(sight_div, url)
            sights.append(sight)

        return GlobusPlace(
            place_header.name, place_header.location, place_header.coords, sights
        )

    def __parse_sight_table(self, sight_div, place_url: str) -> ParsedSight:
        sight_id = sight_div["id"].replace("GATag_WholeObj_", "")
        main_image = next(
            image
            for image in sight_div.find_all("span")
            if "id" in image.attrs and image["id"] == f"GATag_MainImgs_{sight_id}"
        )
        image_element = main_image.find("img")
        if image_element is not None:
            src = image_element["src"]
            if not src.startswith("http"):
                image_src = place_url + image_element["src"]
            else:
                image_src = src
        else:
            image_src = None

        sight_info_table = sight_div.find("table", recursive=False)
        sight_name_element = sight_info_table.find("font", {"class": "subhPage"})
        if not sight_name_element:
            sight_name_element = sight_info_table.find(
                "font", {"class": "subhPageStrach"}
            )
        sight_name = sight_name_element.text.strip()

        _, *info_tables = sight_info_table.find_all("table")

        props = []
        for info_table in info_tables:
            cells = info_table.find_all("td")
            cells = [[c.strip() if isinstance(c, str) else c for c in cell.contents[:-1]] for cell in cells]
            cells = [[c for c in cell if c != ''] for cell in cells]
            cells = [cell for cell in cells if len(cell) > 0]
            if len(cells) % 2 != 0:
                raise Exception("Invalid sight property table")
            
            for i in range(0, len(cells), 2):
                prop_name = " ".join([c.strip() if isinstance(c, str) else c.text.strip() for c in cells[i]]).replace("\xa0", " ").replace(":", "")
                prop_values=  [c.strip() if isinstance(c, str) else c.text.strip() for c in cells[i + 1]]
                prop_values = [c.replace("\xa0", " ").strip() for c in prop_values]
                prop_values = [c for c in prop_values if c != ""]
                props.append((prop_name, prop_values))

        return ParsedSight(sight_name, image_src, props)

    def __get_place_page_sections(
        self, soup
    ) -> dict[PlacePageSectionType, BeautifulSoup]:
        place_header_div = self.__get_fixed_place_header(soup)
        container = place_header_div.parent
        description_element = container.find(id="GATag_WholeObj_index")
        sights_divs = [
            div
            for div in container.find_all("div")
            if "id" in div.attrs
            and div["id"] != "GATag_WholeObj_index"
            and "GATag_WholeObj_" in div["id"]
        ]

        return {
            PlacePageSectionType.FIXED_HEADER: place_header_div,
            PlacePageSectionType.DESCRIPTION: description_element,
            PlacePageSectionType.SIGHTS: sights_divs,
        }

    def __get_parsed_place_header(self, place_header_element) -> ParsedPlaceHeader:
        child_divs = place_header_element.find_all(
            "div", align="center", recursive=False
        )
        if len(child_divs) < 2:
            print("Invalid header div")
            return None
        
        coords_div = None
        name_and_location_div = None

        if len(child_divs) == 2:
            name_and_location_div = child_divs[1]
        elif len(child_divs) == 3:
            name_and_location_div, coords_div = child_divs[1:]
        else:
            raise Exception("Invalid header div")            

        name_and_location_children = [
            element
            for element in name_and_location_div.children
            if element.text.strip() != ""
        ]
        if len(name_and_location_children) < 2:
            raise Exception("Invalid name and location div")

        name_div, *location_div = name_and_location_children
        name = name_div.text.strip()
        location = "".join([div.text for div in location_div])

        coords = None
        if coords_div is not None:
            coords_text = coords_div.find("a").text
            coords = [float(c.strip()) for c in coords_text.split(",")]
            coords = tuple(coords)

        return ParsedPlaceHeader(name, location, coords)

    def __get_fixed_place_header(self, soup) -> BeautifulSoup:
        divs = soup.find_all("div", align="center")
        place_header_div = next(
            div for div in divs if "position:fixed;" in div.get("style", "")
        )
        return place_header_div

    def __extract_all_places_metadata(self, soup) -> list[PlaceMetadata]:
        links = soup.find_all("a")
        place_links = [
            l for l in links if l.parent.name == "nobr" and l.parent.parent.name == "td"
        ]
        places = []
        for link in place_links:
            nobr_element = link.parent
            place_title = link.text.strip()
            place_url = self.base_url + "/" + link["href"]
            next_td = nobr_element.next_sibling
            children = list(next_td.children)
            if len(children) == 1:
                next_td = children[0]
                photo_count = 0
            else:
                photo_count, next_td = list(next_td.children)
                photo_count = photo_count.text.strip()
                photo_count = int(photo_count) if photo_count.isdigit() else 0

            place_rating = next(next_td.children)["alt"]
            place_rating = int(place_rating) if place_rating.isdigit() else 0
            places.append(
                PlaceMetadata(place_title, place_url, place_rating, photo_count)
            )
        places.sort(key=lambda x: x.name, reverse=False)
        return places

    def __get_all_places_content(self):
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
        }
        result = requests.get(self.all_places_url, timeout=600, headers=headers)
        if result.status_code != 200:
            raise Exception(f"Failed to get all places content. Status code: {result.status_code}")
        content =  result.content.decode("Windows-1251")
        soup = BeautifulSoup(content, "html.parser")
        return soup

    def __get_place_soup(self, place_url: str) -> BeautifulSoup:
        result = requests.get(place_url, timeout=600)
        if result.status_code != 200:
            raise Exception(f"Failed to get place content. Status code: {result.status_code}")
        place_content = result.content.decode("Windows-1251")
        soup = BeautifulSoup(place_content, "html.parser")
        return soup


if __name__ == "__main__":
    db = TinyDB("globus.json")
    globus_data_scrapper = GlobusDataScrapper()
    Place = Query()
    metadatas = db.all()
    if len(metadatas) == 0:
        metadatas = [
            metadata.__dict__ for metadata in globus_data_scrapper.get_places_metadata()
        ]
        for metadata in metadatas:
            db.insert(metadata)

    # metadatas_to_process = [metadata for metadata in metadatas if "place" not in metadata]
    # metadatas_to_process = [
    #     metadata
    #     for metadata in metadatas
    #     if "place" in metadata and "sights" in metadata["place"]
    #     and any("props" in sight and any([name == "Списки" and len(value) > 30 for name, value in sight["props"]]) for sight in metadata["place"]["sights"])
    # ]
    metadatas_to_process = metadatas
    print("Metadatas to process:", len(metadatas_to_process))

    lock = threading.Lock()
    semaphore = threading.Semaphore(20)

    def process_metadata(metadata):
        print(metadata["url"])
        place = globus_data_scrapper.get_place_data(metadata["url"])
        print(len(place.sights))
        place_dict = place.__dict__
        if place.sights is not None:
            place_dict["sights"] = [sight.__dict__ for sight in place.sights]
        
        # Acquire the lock before writing to the database
        with lock:
            db.update({"place": place_dict}, Place.url == metadata["url"])

        semaphore.release()
    threads = []
    for metadata in metadatas_to_process:
        semaphore.acquire()

        thread = threading.Thread(target=process_metadata, args=(metadata,))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()