<script lang="ts">
    import Navbar from "$lib/components/navbar.svelte";
    import PlaceCard from "$lib/components/place-card.svelte";
    import InfiniteScroll from "svelte-infinite-scroll";
    import type { Place } from "$lib/models/place";
    import "../../app.css";
    import { planned } from "$lib/stores/planned-store";
    import { t } from "../../i18n";

    export let data;

    const allPlacesData: Place[] = data.props.places
        .sort((a: Place, b: Place) => a.rating - b.rating)
        .filter((place: Place) => {
            return $planned.some((planned) => planned.placeId === place.id);
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

<Navbar selectedMenu="planned"></Navbar>

{#if placesToDisplay.length === 0}
    <div class="text-center text-2xl mt-10 empty-title text-slate-600">
        {$t("planned.empty")}
    </div>
{/if}

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

    .empty-title {
        cursor: default;
    }
</style>
