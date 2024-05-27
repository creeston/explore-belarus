export interface Place {
    id: number;
    name: string;
    location: string[];
    ratings: Rating[];
    coordinates: [number, number];
    urls: Url[];
    sights?: PlaceSight[];
    images: Image[];
}

export interface VisitedPlace {
    place: Place;
    date: Date;
}

export interface PlannedPlace {
    place: Place;
    date: Date;
}

export type Source = 'globus' | 'gotobelarus' | 'vedaj' | 'bestbelarus' | 'tropinki'

export interface Url {
    href: string;
    text: string;
    source: Source;
}

export interface Image {
    url: string;
    source: Source;
}

export interface Rating {
    rating: number;
    source: Source;
}

export interface PlaceSight {
    name: string;
    images: Image[];
    coordinates: [number, number];
    ratings: Rating[];
    tags: string[];
}

export interface PlaceSelection {
    name: string;
    coords: [string, string];
}