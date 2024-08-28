<script lang="ts">
    import PlaceCard from "$lib/components/place-card.svelte";
    import SightHero from "$lib/components/place-hero.svelte";
    import InfiniteScroll from "svelte-infinite-scroll";
    import type { Place } from "$lib/models/place";
    import "../app.css";
    import { visited } from "$lib/stores/visited-store";
    import { planned } from "$lib/stores/planned-store";
    import { userPerformedFirstAction } from "$lib/stores/event-store";
    import { t } from "../i18n";
    import type { FilterSpecification } from "$lib/models/filter-specification";
    import FilterBar from "$lib/components/filter-bar.svelte";
    import { userInfo } from "$lib/stores/user-store";
    import { RatingService } from "$lib/services/rating-service";
    import { ignored } from "$lib/stores/ignored-store";
    import { fade } from "svelte/transition";

    export let data;

    const allPlacesData: Place[] = data.props.places.sort(
        (a: Place, b: Place) =>
            RatingService.getSortRating(b) - RatingService.getSortRating(a),
    );

    const getFilteredPlaces = (
        filter: FilterSpecification,
        dataToFilter: Place[] | null = null,
    ) => {
        let filteredPlaces = dataToFilter ?? [...allPlacesData];

        if (filter.regions.length > 0) {
            filteredPlaces = filteredPlaces.filter((place) =>
                filter.regions.some((option: string) =>
                    place.location.some((part: string) =>
                        part.includes(option),
                    ),
                ),
            );
        }

        if (filter.excludeVisited) {
            filteredPlaces = filteredPlaces.filter((place) => {
                return !$visited.some(
                    (visitedPlace) => visitedPlace.placeId === place.id,
                );
            });
        }

        if (filter.excludePlanned) {
            filteredPlaces = filteredPlaces.filter((place) => {
                return !$planned.some(
                    (plannedPlace) => plannedPlace.placeId === place.id,
                );
            });
        }

        if (filter.excludeIgnored) {
            filteredPlaces = filteredPlaces.filter((place) => {
                return !$ignored.some(
                    (ignoredPlace) => ignoredPlace.placeId === place.id,
                );
            });
        }

        return filteredPlaces;
    };

    let filterSpecification: FilterSpecification | null = null;

    const filterData = (filter: FilterSpecification) => {
        page = 0;
        places = getFilteredPlaces(filter);
        placesToDisplay = places.splice(size * page, size * (page + 1) - 1);
        filterSpecification = filter;
    };

    const searchByText = (search: string, filter: FilterSpecification) => {
        page = 0;
        places = getFilteredPlaces(filter);

        if (search.length > 0) {
            places = places.filter(
                (place) =>
                    place.name.toLowerCase().includes(search.toLowerCase()) ||
                    (place.sights &&
                        place.sights.some((sight) =>
                            sight.name
                                .toLowerCase()
                                .includes(search.toLowerCase()),
                        )),
            );
        }

        placesToDisplay = places.splice(size * page, size * (page + 1) - 1);
    };

    let page = 0;
    let size = 10;
    let placesToDisplay: Place[] = [];
    let places = [...allPlacesData];
    let storageWarnModal: any;

    $: userPerformedFirstAction.subscribe((hasPerformedAction) => {
        if (
            hasPerformedAction &&
            !$userInfo.hasPerformedAction &&
            storageWarnModal
        ) {
            storageWarnModal.showModal();
            $userInfo.hasPerformedAction = true;
        }
    });

    $: placesToDisplay = [
        ...placesToDisplay,
        ...places.splice(size * page, size * (page + 1) - 1),
    ];

    visited.subscribe(() => {
        if (filterSpecification && filterSpecification.excludeVisited) {
            filterData(filterSpecification);
        }
    });

    planned.subscribe(() => {
        if (filterSpecification && filterSpecification.excludePlanned) {
            filterData(filterSpecification);
        }
    });

    ignored.subscribe(() => {
        if (filterSpecification && filterSpecification.excludeIgnored) {
            filterData(filterSpecification);
        }
    });
</script>

<div class="hidden md:block">
    <SightHero places={allPlacesData} />
</div>

<FilterBar onFilterChange={filterData} onSearchChange={searchByText}
></FilterBar>

<ul class="flex flex-wrap justify-center">
    {#each placesToDisplay as place, i (place.id)}
        <li transition:fade>
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
