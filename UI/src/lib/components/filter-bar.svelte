<script lang="ts">
    import {
        AdjustmentsHorizontal,
        Icon,
        MagnifyingGlass,
        XMark,
    } from "svelte-hero-icons";
    import GeoFilterDropdown from "./geo-filter-dropdown.svelte";
    import { userInfo } from "$lib/stores/user-store";
    import type { FilterSpecification } from "$lib/models/filter-specification";
    import { t } from "../../i18n";

    export let onFilterChange: (filter: FilterSpecification) => void;
    export let onSearchChange: (
        search: string,
        filter: FilterSpecification,
    ) => void;

    let showFilters =
        $userInfo.showFilterBar !== undefined ? $userInfo.showFilterBar : true;
    let excludeVisited = $userInfo.filterSpecification?.excludeVisited ?? false;
    let excludePlanned = $userInfo.filterSpecification?.excludePlanned ?? false;
    let excludeIgnored = $userInfo.filterSpecification?.excludeIgnored ?? true;
    let regions: string[] = $userInfo.filterSpecification?.regions ?? [];
    let searchValue = "";

    const filterToggled = () => {
        $userInfo.showFilterBar = showFilters;
    };

    const getFilterSpecification = (): FilterSpecification => {
        return {
            regions,
            excludeVisited,
            excludePlanned,
            excludeIgnored,
        };
    };

    $: {
        const filterSpecification = {
            regions,
            // ratings,
            excludeVisited,
            excludePlanned,
            excludeIgnored,
        };
        $userInfo.filterSpecification = filterSpecification;
        onFilterChange(filterSpecification);
    }

    $: onSearchChange(searchValue, getFilterSpecification());
</script>

<div
    class="max-sm:ml-5 max-sm:mr-5 mt-5 md:ml-10 md:space-x-4 max-sm:space-y-4 items-center sm:block md:flex"
>
    <label class="input input-bordered flex items-center gap-2">
        <input
            type="text"
            class="grow"
            placeholder={$t("filters.search")}
            bind:value={searchValue}
        />
        <Icon src={MagnifyingGlass} size="16"></Icon>
    </label>
    <label class="btn btn-circle swap swap-rotate">
        <input
            type="checkbox"
            bind:checked={showFilters}
            on:change={filterToggled}
        />
        <Icon
            src={AdjustmentsHorizontal}
            width="32"
            height="32"
            class="swap-off fill-current"
        />
        <Icon
            src={XMark}
            width="28"
            height="28"
            class="swap-on"
            style="margin-left: 2px"
        />
    </label>
    {#if showFilters}
        <div>
            <GeoFilterDropdown
                value={regions}
                onValueChange={(value) => {
                    regions = value;
                }}
            ></GeoFilterDropdown>
        </div>
        <div class="form-control">
            <label class="label cursor-pointer">
                <span class="label-text">{$t("filters.excludeVisited")}</span>
                <input
                    type="checkbox"
                    class="toggle ml-4"
                    bind:checked={excludeVisited}
                />
            </label>
        </div>
        <div class="form-control">
            <label class="label cursor-pointer">
                <span class="label-text">{$t("filters.excludePlanned")}</span>
                <input
                    type="checkbox"
                    class="toggle ml-4"
                    bind:checked={excludePlanned}
                />
            </label>
        </div>
        <div class="form-control">
            <label class="label cursor-pointer">
                <span class="label-text">{$t("filters.excludeIgnored")}</span>
                <input
                    type="checkbox"
                    class="toggle ml-4"
                    bind:checked={excludeIgnored}
                />
            </label>
        </div>
    {/if}
</div>
