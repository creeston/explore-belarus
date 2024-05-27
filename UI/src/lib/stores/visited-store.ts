import { writable } from 'svelte/store'

interface Visited {
    placeId: number;
    date: string;
}

export const visited = writable<Visited[]>(JSON.parse(localStorage.getItem('visited') ?? '[]'))
visited.subscribe((value) => localStorage.visited = JSON.stringify(value))