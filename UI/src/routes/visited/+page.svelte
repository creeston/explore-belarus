<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import PlaceCard from "$lib/components/place-card.svelte";
    import InfiniteScroll from "svelte-infinite-scroll";
    import type { Place } from "$lib/models/place";
    import "../../app.css";
    import Map from "$lib/components/map.svelte";
    import { visited } from "$lib/stores/visited-store";
    import { t } from "../../i18n";
    import BottomNavbar from "$lib/components/bottom-navbar.svelte";

    export let data;

    let innerWidth = 0;
    let innerHeight = 0;

    const allPlacesData: Place[] = data.props.places
        .sort((a: Place, b: Place) => a.rating - b.rating)
        .filter((place: Place) => {
            return $visited.some((visited) => visited.placeId === place.id);
        });

    const placesHovered = Array(allPlacesData.length).fill(false);
    let page = 0;
    let size = 20;
    let placesToDisplay: Place[] = [];
    let places = [...allPlacesData];

    $: placesToDisplay = [
        ...placesToDisplay,
        ...places.splice(size * page, size * (page + 1) - 1),
    ];
</script>

<Navbar selectedMenu="visited"></Navbar>

<svelte:window bind:innerWidth bind:innerHeight />

{#if placesToDisplay.length === 0}
    <div
        class="text-center md:text-2xl max-sm:text-md mt-10 empty-title text-slate-600"
    >
        {$t("visited.empty")}
    </div>
{/if}

{#if placesToDisplay.length > 0}
    {#if innerWidth > 0}
        <div class="hidden max-md:flex justify-center w-full">
            <Map
                height={innerWidth - 50}
                width={innerWidth - 50}
                highlighedCoordIndex={placesHovered.findIndex(
                    (hovered) => hovered
                )}
                coords={allPlacesData.map((place) => [
                    parseFloat(place.coords[0]),
                    parseFloat(place.coords[1]),
                ])}
            ></Map>
        </div>
    {/if}
    <div class="flex max-md:justify-center">
        <div style="left: 50px; top: 25%" class="hidden md:fixed md:block">
            <Map
                height={500}
                width={500}
                highlighedCoordIndex={placesHovered.findIndex(
                    (hovered) => hovered
                )}
                coords={allPlacesData.map((place) => [
                    parseFloat(place.coords[0]),
                    parseFloat(place.coords[1]),
                ])}
            ></Map>
        </div>

        <div style="width:500px" class="hidden md:block"></div>
        <div>
            <ul class="flex flex-wrap justify-center">
                {#each placesToDisplay as place, i}
                    <li>
                        <PlaceCard bind:hovered={placesHovered[i]} {place}
                        ></PlaceCard>
                    </li>
                {/each}
                <InfiniteScroll
                    threshold={100}
                    on:loadMore={() => page++}
                    window={true}
                />
            </ul>
        </div>
    </div>
{/if}

<BottomNavbar selectedMenu="visited"></BottomNavbar>

<style>
    ul {
        max-height: 70vw;
        width: calc(100vw - 550px);
    }
    .empty-title {
        cursor: default;
    }
</style>
