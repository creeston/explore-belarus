import { writable } from 'svelte/store'


export const userPerformedFirstAction = writable<boolean>(false)