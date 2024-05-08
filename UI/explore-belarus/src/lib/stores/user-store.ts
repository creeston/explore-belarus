import { writable } from 'svelte/store'

interface UserInfo {
    hasPerformedAction: boolean;
    selectedLocale: string;
}

export const userInfo = writable<UserInfo>(JSON.parse(localStorage.getItem('userInfo') ?? '[]'))
userInfo.subscribe((value) => localStorage.userInfo = JSON.stringify(value))