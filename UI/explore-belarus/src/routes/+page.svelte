<script lang="ts">
    export let data;

    const places: Place[] = data.props.places.sort(
        (a: Place, b: Place) => a.rating - b.rating
    );

    const placesSelection: PlaceSelection[] = places.map((place) => ({
        name: place.name,
        coords: place.coords,
    }));

    import Navbar from "$lib/components/navbar.svelte";
    import PlaceCard from "$lib/components/place-card.svelte";
    import SightHero from "$lib/components/sight-hero.svelte";
    import Map from "$lib/components/map.svelte";
    import type { Place, PlaceSelection } from "$lib/models/place";
    import "../app.css";
</script>

<Navbar places={placesSelection}></Navbar>

<SightHero {places} />

<div class="flex flex-wrap justify-center">
    {#each places.slice(0, 100) as place, i}
        <PlaceCard {place}></PlaceCard>
    {/each}
</div>
