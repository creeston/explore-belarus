export interface Place {
    id: number;
    name: string;
    url: string;
    rating: number;
    coords: string[];
    location: string;
    sights: Sight[];
}

export class Sight {
    name: string;
    image: string;
    id: string;
    coord: [string, boolean];
    hint?: string;
    date?: string;
    rate: number;
    state_rate?: number;
    status?: string;
    address?: string;
    style?: string;
    tags: string[];
    place: Place;
}
