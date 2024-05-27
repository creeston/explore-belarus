import { writable } from 'svelte/store'

interface Planned {
    placeId: number;
    date: string;
}

export const planned = writable<Planned[]>(JSON.parse(localStorage.getItem('planned') ?? '[]'))
planned.subscribe((value) => localStorage.planned = JSON.stringify(value))