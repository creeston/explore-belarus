<script lang="ts">
    import type { Place, PlaceSight } from "$lib/models/place";
    import { Icon, Link, ArrowPath } from "svelte-hero-icons";
    import Map from "./map.svelte";

    export let places: Place[];

    const mapWidth = 250;
    const mapHeight = 250;
    const long1 = 23.11; //23.177973;
    const lat1 = 51.25; // 51.262152;
    const long2 = 32.8; //32.776439;
    const lat2 = 56.182; //56.171905;

    const refreshPlace = () => {
        place = getRandomPlace();
    };

    const getRandomPlace = () => {
        const candidates = places
            .filter(
                (place) =>
                    place.sights.length > 0 &&
                    place.sights.filter(
                        (sight) => sight.rate > 0 && sight.image
                    ).length > 0
            )
            .slice(0, 200);

        return candidates[Math.floor(Math.random() * candidates.length)];
    };

    const getBestSight = (place: Place) => {
        const sightsSortedByRating = place.sights.sort(
            (a: PlaceSight, b: PlaceSight) => b.rate - a.rate
        );
        return sightsSortedByRating[0];
    };

    const transformCoordinates = (realLat: number, realLong: number) => {
        // Determine the x scale
        const xScale = mapWidth / (long2 - long1);

        // Determine the y scale
        const yScale = mapHeight / (lat2 - lat1);

        // Determine the x offset
        const xOffset = long1;

        // Determine the y offset
        const yOffset = lat1;

        // Transform the real coordinates into SVG coordinates
        const x = (realLong - xOffset) * xScale;
        const y = (realLat - yOffset) * yScale;

        return [x, mapHeight - y];
    };

    const getPlaceCoordX = (place: Place) => {
        const [lat, long] = place.coords;
        const coord = transformCoordinates(+lat, +long);
        return coord[0];
    };

    const getPlaceCoordY = (place: Place) => {
        const [lat, long] = place.coords;
        const coord = transformCoordinates(+lat, +long);
        return coord[1];
    };

    let place = getRandomPlace();
    $: sight = getBestSight(place);
    $: xCord = getPlaceCoordX(place);
    $: yCord = getPlaceCoordY(place);
</script>

{#if sight && place}
    <div class="hero bg-white-200 mt-5 border-b-slate-100 border-b-2">
        <div class="hero-content flex-col lg:flex-row-reverse">
            <div class="w-96">
                <Map
                    height={mapHeight}
                    width={mapWidth}
                    coord={[xCord, yCord]}
                />
            </div>

            <img
                src={sight.image}
                class="rounded-lg shadow-2xl object-cover h-64 w-96"
                alt="hero"
            />

            <div class="w-96">
                <h1 class="text-5xl font-bold">{place.name}</h1>
                <p class="py-6">
                    {sight.name}
                </p>
                <a class="btn" href={place.url} target="_blank">
                    <Icon src={Link} size="14" /> Подробнее
                </a>
                <button class="btn btn-circle ml-5" on:click={refreshPlace}
                    ><Icon src={ArrowPath} size="14" /></button
                >
            </div>
        </div>
    </div>
{/if}
