<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
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
    import BottomNavbar from "$lib/components/bottom-navbar.svelte";

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

    // Commented functionality allosws to immediately filter places when user marks them as visited or planned
    // However, in the current implementation, it is not user friendly

    // $: visited.subscribe(() => {
    //     if (!$userInfo.filterSpecification) {
    //         return;
    //     }

    //     if ($userInfo.filterSpecification?.excludeVisited) {
    //         places = getFilteredPlaces($userInfo.filterSpecification);
    //         placesToDisplay = places.slice(0, size - 1);
    //     }
    // });

    // $: planned.subscribe(() => {
    //     if (!$userInfo.filterSpecification) {
    //         return;
    //     }

    //     if ($userInfo.filterSpecification.excludePlanned) {
    //         places = getFilteredPlaces($userInfo.filterSpecification);
    //         placesToDisplay = places.slice(0, size - 1);
    //     }
    // });

    const filterData = (filter: FilterSpecification) => {
        page = 0;
        places = getFilteredPlaces(filter);
        placesToDisplay = [];
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
</script>

<Navbar selectedMenu="sights"></Navbar>

<div class="hidden md:block">
    <SightHero places={allPlacesData} />
</div>

<FilterBar onFilterChange={filterData} onSearchChange={searchByText}
></FilterBar>

<ul class="flex flex-wrap justify-center">
    {#each placesToDisplay as place, i}
        <li>
            <PlaceCard {place}></PlaceCard>
        </li>
    {/each}
    <InfiniteScroll threshold={100} on:loadMore={() => page++} window={true} />
</ul>
<BottomNavbar selectedMenu="sights"></BottomNavbar>

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
