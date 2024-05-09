import type { FilterSpecification } from '$lib/models/filter-specification';
import { writable } from 'svelte/store'

interface UserInfo {
    hasPerformedAction: boolean;
    selectedLocale: string;
    showFilterBar: boolean;
    filterSpecification: FilterSpecification;
}

export const userInfo = writable<UserInfo>(JSON.parse(localStorage.getItem('userInfo') ?? '[]'))
userInfo.subscribe((value) => localStorage.userInfo = JSON.stringify(value))