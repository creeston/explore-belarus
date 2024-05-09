<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import PlaceCard from "$lib/components/place-card.svelte";
    import SightHero from "$lib/components/place-hero.svelte";
    import InfiniteScroll from "svelte-infinite-scroll";
    import type { Place } from "$lib/models/place";
    import "../app.css";
    import GeoFilterDropdown from "$lib/components/geo-filter-dropdown.svelte";
    import RatingFilterDropdown from "$lib/components/rating-filter-dropdown.svelte";
    import { AdjustmentsHorizontal, Icon, XMark } from "svelte-hero-icons";
    import type { SelectOption } from "$lib/models/select-option";
    import { visited } from "$lib/stores/visited-store";
    import { planned } from "$lib/stores/planned-store";
    import { userPerformedFirstAction } from "$lib/stores/event-store";
    import { t, locale, locales } from "../i18n";
    import type { FilterSpecification } from "$lib/models/filter-specification";
    import FilterBar from "$lib/components/filter-bar.svelte";

    export let data;

    const allPlacesData: Place[] = data.props.places.sort(
        (a: Place, b: Place) => a.rating - b.rating
    );

    const getFilteredPlaces = (filter: FilterSpecification) => {
        let filteredPlaces = [...allPlacesData];

        if (filter.regions.length > 0) {
            filteredPlaces = filteredPlaces.filter((place) =>
                filter.regions.some((option: string) =>
                    place.location.includes(option)
                )
            );
        }

        if (filter.ratings.length > 0) {
            filteredPlaces = filteredPlaces.filter((place) =>
                filter.ratings.some((option: number) => place.rating === option)
            );
        }

        if (filter.excludeVisited) {
            filteredPlaces = filteredPlaces.filter((place) => {
                return !$visited.some(
                    (visitedPlace) => visitedPlace.placeId === place.id
                );
            });
        }

        if (filter.excludePlanned) {
            filteredPlaces = filteredPlaces.filter((place) => {
                return !$planned.some(
                    (plannedPlace) => plannedPlace.placeId === place.id
                );
            });
        }

        return filteredPlaces;
    };

    const filterData = (filter: FilterSpecification) => {
        page = 0;
        places = getFilteredPlaces(filter);
        placesToDisplay = places.splice(size * page, size * (page + 1) - 1);
    };

    const searchByText = (search: string, filter: FilterSpecification) => {
        page = 0;
        places = getFilteredPlaces(filter);

        if (search.length > 0) {
            places = places.filter(
                (place) =>
                    place.name.toLowerCase().includes(search.toLowerCase()) ||
                    place.sights.some((sight) =>
                        sight.name.toLowerCase().includes(search.toLowerCase())
                    )
            );
        }

        placesToDisplay = places.splice(size * page, size * (page + 1) - 1);
    };

    let page = 0;
    let size = 20;
    let placesToDisplay: Place[] = [];
    let places = [...allPlacesData];
    let storageWarnModal: any;

    $: userPerformedFirstAction.subscribe((hasPerformedAction) => {
        if (hasPerformedAction && storageWarnModal) {
            storageWarnModal.showModal();
        }
    });

    $: placesToDisplay = [
        ...placesToDisplay,
        ...places.splice(size * page, size * (page + 1) - 1),
    ];
</script>

<Navbar selectedMenu="sights"></Navbar>

<SightHero places={allPlacesData} />

<FilterBar onFilterChange={filterData} onSearchChange={searchByText}
></FilterBar>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->

<!-- <div class="mt-5 space-x-4 ml-10 items-center hidden md:flex">
    <label class="btn btn-circle swap swap-rotate">
        <input type="checkbox" bind:checked={showFilters} />
        <Icon
            src={AdjustmentsHorizontal}
            width="32"
            height="32"
            class="swap-off fill-current"
        />
        <Icon src={XMark} width="32" height="32" class="swap-on" />
    </label>
    <div>
        {#if showFilters}
            <GeoFilterDropdown
                options={geoFilterOptions}
                onValueChange={filterDataByGeo}
            ></GeoFilterDropdown>
        {/if}
    </div>
    <div>
        {#if showFilters}
            <RatingFilterDropdown
                options={ratingOptions}
                onValueChange={filterDataByRating}
            ></RatingFilterDropdown>
        {/if}
    </div>
    <div class="form-control">
        {#if showFilters}
            <label class="label cursor-pointer">
                <span class="label-text">Без посещенных</span>
                <input
                    type="checkbox"
                    class="toggle ml-4"
                    bind:checked={hideVisited}
                    on:change={filterDataByNonVisisted}
                />
            </label>
        {/if}
    </div>
    <div class="form-control">
        {#if showFilters}
            <label class="label cursor-pointer">
                <span class="label-text">Без запланированных</span>
                <input
                    type="checkbox"
                    class="toggle ml-4"
                    bind:checked={hidePlanned}
                />
            </label>
        {/if}
    </div>
</div> -->

<ul class="flex flex-wrap justify-center">
    {#each placesToDisplay as place, i}
        <li>
            <PlaceCard {place}></PlaceCard>
        </li>
    {/each}
    <InfiniteScroll threshold={100} on:loadMore={() => page++} window={true} />
</ul>

<dialog id="storageWarnModal" class="modal" bind:this={storageWarnModal}>
    <div class="modal-box">
        <h3 class="font-bold text-lg">{$t("user.storageWarnTitle")}</h3>
        <p class="py-4">{$t("user.storageWarnDescription")}</p>
        <div class="modal-action">
            <form method="dialog">
                <button class="btn">{$t("actions.ok")}</button>
            </form>
        </div>
    </div>
</dialog>

<style>
    ul {
        max-height: 70vw;
    }
</style>
