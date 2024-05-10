<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import PlaceCard from "$lib/components/place-card.svelte";
    import InfiniteScroll from "svelte-infinite-scroll";
    import type { Place } from "$lib/models/place";
    import "../../app.css";
    import Map from "$lib/components/map.svelte";
    import { visited } from "$lib/stores/visited-store";
    import { t } from "../../i18n";

    export let data;

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

{#if placesToDisplay.length === 0}
    <div class="text-center text-2xl mt-10 empty-title text-slate-600">
        {$t("visited.empty")}
    </div>
{/if}

<div class="grid grid-flow-col auto-cols-max">
    {#if placesToDisplay.length > 0}
        <div style="position: fixed; left: 50px; top: 25%">
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
    {/if}

    <div style="width: 450px"></div>
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

<style>
    ul {
        max-height: 70vw;
        width: calc(100vw - 550px);
    }
    .empty-title {
        cursor: default;
    }
</style>
