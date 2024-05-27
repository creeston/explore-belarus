from dataclasses import dataclass
import requests
from tinydb import TinyDB

@dataclass
class GoToBelarusPlaceMetadata:
    name: str
    description: str # can be either place description, or empty or sight description
    coords: tuple[float, float]
    links: list[str]
    rating: int
    images: list[str]
    type: str

class GoToBelarusDataScraper:
    def __init__(self):
        self.base_url = "https://34travel.me"
        self.all_places_url = f"{self.base_url}/gotobelarus/places"


    def get_data(self):
        response = requests.get(self.all_places_url)
        places_object = response.json()
        places_features = places_object['features']
        places_features = [feature for feature in places_features if feature['options']['pinUrl'] == "/themes/travel/i/pin1.svg" or feature['options']['pinUrl'] == "/themes/travel/i/pin2.svg"]
        
        places = []
        for feature in places_features:
            coords = feature['geometry']['coordinates']
            coords = (float(coords[0]), float(coords[1]))
            name = feature['properties']['title']
            description = feature['properties']['description']
            links = [{"href": self.base_url + link['href'], "text": link['text']} for link in feature['properties']['links']]
            images = [self.base_url + link for link in feature['properties']['objectImgSlider']]
            rating = 4 if feature['options']['pinUrl'] == "/themes/travel/i/pin1.svg" else 3
            places.append(GoToBelarusPlaceMetadata(name, description, coords, links, rating, images, "place"))

        nature_features = [feature for feature in places_features if feature['options']['pinUrl'] == "/themes/travel/i/pin3.svg"]
        for feature in nature_features:
            coords = feature['geometry']['coordinates']
            coords = (float(coords[0]), float(coords[1]))
            name = feature['properties']['title']
            description = feature['properties']['description']
            links = [{"href": self.base_url + link['href'], "text": link['text']} for link in feature['properties']['links']]
            images = [self.base_url + link for link in feature['properties']['objectImgSlider']]
            rating = 4 if feature['options']['pinUrl'] == "/themes/travel/i/pin1.svg" else 3
            places.append(GoToBelarusPlaceMetadata(name, description, coords, links, rating, images, "nature"))

        return places
    

if __name__ == "__main__":
    db = TinyDB("gotobelarus.json")
    scraper = GoToBelarusDataScraper()
    data = scraper.get_data()
    for place in data:
        db.insert(place.__dict__)