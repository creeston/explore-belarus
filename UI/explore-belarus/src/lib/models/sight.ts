export interface Sight {
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
    place: SightPlace;
}

interface SightPlace {
    name: string;
    rating: number;
    location: string;
    coords: string[];
}