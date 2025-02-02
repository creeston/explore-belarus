import { writable } from 'svelte/store'

interface Ignored {
    placeId: number;
    date: string;
}

export const ignored = writable<Ignored[]>(JSON.parse(localStorage.getItem('ignored') ?? '[]'))
ignored.subscribe((value) => localStorage.ignored = JSON.stringify(value))