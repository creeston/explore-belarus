<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import PlaceCard from "$lib/components/place-card.svelte";
    import InfiniteScroll from "svelte-infinite-scroll";
    import type { Place } from "$lib/models/place";
    import "../../app.css";
    import Map from "$lib/components/map.svelte";
    import { visited } from "$lib/stores/visited-store";

    export let data;

    const allPlacesData: Place[] = data.props.places
        .sort((a: Place, b: Place) => a.rating - b.rating)
        .filter((place: Place) => {
            return $visited.some((visited) => visited.placeId === place.id);
        });

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

<div class="justify-center flex">
    <Map
        height={250}
        width={250}
        coord={placesToDisplay && placesToDisplay.length > 0
            ? [
                  parseFloat(placesToDisplay[0].coords[0]),
                  parseFloat(placesToDisplay[0].coords[1]),
              ]
            : undefined}
    ></Map>
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
