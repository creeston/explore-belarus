<script lang="ts">
    import PlaceCard from "$lib/components/place-card.svelte";
    import InfiniteScroll from "svelte-infinite-scroll";
    import type { Place, PlannedPlace } from "$lib/models/place";
    import "../../app.css";
    import { planned } from "$lib/stores/planned-store";
    import { t } from "../../i18n";

    export let data;

    const allPlacesData: PlannedPlace[] = data.props.places
        .map((place: Place) => {
            const plannedInfo = $planned.find(
                (planned) => planned.placeId === place.id
            );

            if (plannedInfo) {
                return {
                    place: place,
                    date: new Date(plannedInfo.date),
                } as PlannedPlace;
            } else {
                return null;
            }
        })
        .filter((place: PlannedPlace) => place)
        .sort((a: PlannedPlace, b: PlannedPlace) => {
            return b.date.getTime() - a.date.getTime();
        });

    let page = 0;
    let size = 20;
    let placesToDisplay: PlannedPlace[] = [];
    let places = [...allPlacesData];

    $: placesToDisplay = [
        ...placesToDisplay,
        ...places.splice(size * page, size * (page + 1) - 1),
    ];
</script>

{#if placesToDisplay.length === 0}
    <div
        class="text-center md:text-2xl max-sm:text-md mt-10 empty-title text-slate-600"
    >
        {$t("planned.empty")}
    </div>
{/if}

<ul class="flex flex-wrap justify-center">
    {#each placesToDisplay as place}
        <li>
            <PlaceCard place={place.place}></PlaceCard>
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
