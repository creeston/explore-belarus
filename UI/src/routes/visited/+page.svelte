<script lang="ts">
    import PlaceCard from "$lib/components/place-card.svelte";
    import InfiniteScroll from "svelte-infinite-scroll";
    import type { Place, VisitedPlace } from "$lib/models/place";
    import "../../app.css";
    import Map from "$lib/components/map.svelte";
    import { visited } from "$lib/stores/visited-store";
    import { t } from "../../i18n";

    export let data;

    let innerWidth = 0;
    let innerHeight = 0;

    const allPlacesData: VisitedPlace[] = data.props.places
        .map((place: Place) => {
            const visitedInfo = $visited.find(
                (visited) => visited.placeId === place.id
            );

            if (visitedInfo) {
                return {
                    place: place,
                    date: new Date(visitedInfo.date),
                } as VisitedPlace;
            } else {
                return null;
            }
        })
        .filter((place: VisitedPlace) => place)
        .sort((a: VisitedPlace, b: VisitedPlace) => {
            return b.date.getTime() - a.date.getTime();
        });

    const placesHovered = Array(allPlacesData.length).fill(false);
    let page = 0;
    let size = 20;
    let placesToDisplay: VisitedPlace[] = [];
    let places = [...allPlacesData];

    $: placesToDisplay = [
        ...placesToDisplay,
        ...places.splice(size * page, size * (page + 1) - 1),
    ];
</script>

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
                coords={allPlacesData.map((place) => place.place.coordinates)}
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
                coords={allPlacesData.map((place) => place.place.coordinates)}
            ></Map>
        </div>

        <div style="width:500px" class="hidden md:block"></div>
        <div>
            <ul class="flex flex-wrap justify-center">
                {#each placesToDisplay as place, i}
                    <li>
                        <PlaceCard
                            bind:hovered={placesHovered[i]}
                            place={place.place}
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

<style>
    ul {
        max-height: 70vw;
        width: calc(100vw - 550px);
    }
    .empty-title {
        cursor: default;
    }
</style>
