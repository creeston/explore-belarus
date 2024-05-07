export interface Place {
    name: string;
    url: string;
    rating: number;
    photo_count: string;
    coords: [string, string];
    location: string;
    sights: PlaceSight[];
    id: number;
}

export interface PlaceSight {
    name: string;
    image: string;
    props: any;
    id: number;
    coord: string[];
    hint: string;
    date: string;
    rate: number;
    state_rate: string;
    status: string;
    address: string;
    style: string;
    tags: string[];
}

export interface PlaceSelection {
    name: string;
    coords: [string, string];
}