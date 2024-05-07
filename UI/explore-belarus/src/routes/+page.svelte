<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import PlaceCard from "$lib/components/place-card.svelte";
    import SightHero from "$lib/components/place-hero.svelte";
    import InfiniteScroll from "svelte-infinite-scroll";
    import type { Place, PlaceSelection } from "$lib/models/place";
    import "../app.css";
    import GeoFilterDropdown from "$lib/components/geo-filter-dropdown.svelte";
    import RatingFilterDropdown from "$lib/components/rating-filter-dropdown.svelte";
    import { AdjustmentsHorizontal, Icon, XMark } from "svelte-hero-icons";
    import type { SelectOption } from "$lib/models/select-option";

    export let data;

    const allPlacesData: Place[] = data.props.places.sort(
        (a: Place, b: Place) => a.rating - b.rating
    );

    const placesSelection: PlaceSelection[] = allPlacesData.map((place) => ({
        name: place.name,
        coords: place.coords,
    }));

    const geoFilterOptions: SelectOption[] = [
        { viewValue: "Минская", value: "Минская" },
        { viewValue: "Брестская", value: "Брестская" },
        { viewValue: "Гродненская", value: "Гродненская" },
        { viewValue: "Гомельская", value: "Гомельская" },
        { viewValue: "Витебская", value: "Витебская" },
    ];

    const ratingOptions: SelectOption[] = [
        { viewValue: "Увидеть обязательно (1)", value: 1, group: "globus" },
        { viewValue: "Увидеть интересно (2)", value: 2, group: "globus" },
        { viewValue: "Увидеть по дороге (3)", value: 3, group: "globus" },
        { viewValue: "Взглянуть (4)", value: 4, group: "globus" },
    ];

    const filterDataByGeo = (e: string[]) => {
        page = 0;
        if (e.length === 0) {
            places = [...allPlacesData];
        } else {
            places = allPlacesData.filter((place) =>
                e.some((option: string) => place.location.includes(option))
            );
        }
        placesToDisplay = places.splice(size * page, size * (page + 1) - 1);
    };

    const filterDataByRating = (e: number[]) => {
        page = 0;
        if (e.length === 0) {
            places = [...allPlacesData];
        } else {
            places = allPlacesData.filter((place) =>
                e.some((option: number) => place.rating === option)
            );
        }
        placesToDisplay = places.splice(size * page, size * (page + 1) - 1);
    };

    let page = 0;
    let size = 20;
    let placesToDisplay: Place[] = [];
    let showFilters = true;
    let places = [...allPlacesData];

    $: placesToDisplay = [
        ...placesToDisplay,
        ...places.splice(size * page, size * (page + 1) - 1),
    ];
</script>

<Navbar places={placesSelection}></Navbar>

<SightHero places={allPlacesData} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->

<div class="flex mt-5 space-x-4 ml-10 items-center">
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
                <span class="label-text">Только непосещенные</span>
                <input type="checkbox" class="toggle ml-4" checked />
            </label>
        {/if}
    </div>
</div>

<ul class="flex flex-wrap justify-center">
    {#each placesToDisplay as place, i}
        <li>
            <PlaceCard {place}></PlaceCard>
        </li>
    {/each}
    <InfiniteScroll threshold={100} on:loadMore={() => page++} window={true} />
</ul>

<style>
    ul {
        max-height: 70vw;
    }
</style>
