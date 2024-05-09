<script lang="ts">
    import type { Place, PlaceSight } from "$lib/models/place";
    import { Icon, Link, Bookmark, Check } from "svelte-hero-icons";
    import Carousel from "svelte-carousel";
    import Map from "./map.svelte";
    import GeoPinMenu from "./geo-pin-menu.svelte";
    import VisitedButton from "./visited-button.svelte";
    import PlanButton from "./plan-button.svelte";

    export let places: Place[];
    const placeCandidates = places
        .filter(
            (place) =>
                place.sights.length > 0 &&
                place.sights.filter((sight) => sight.rate < 4 && sight.image)
                    .length > 0
        )
        .slice(0, 200);

    let place: Place | null = null;
    let sights: PlaceSight[] | null = null;
    let page = 0;
    let carousel: any;

    $: activeSight = sights ? sights[page] : null;
    $: refreshPlace();

    const refreshPlace = () => {
        place = getRandomPlace();
        page = 0;
        carousel?.goTo(0, { animated: false });
        sights = place.sights
            .filter(
                (sight: any) =>
                    sight && sight.name && sight.image && sight.rate < 4
            )
            .sort((a, b) => a.rate - b.rate)
            .slice(0, 10);
    };

    const getRandomPlace = () => {
        return placeCandidates[
            Math.floor(Math.random() * placeCandidates.length)
        ];
    };

    const onPageChanged = (event: any) => {
        page = event.detail;
    };
</script>

<div class="hero bg-white-200 mt-5 border-b-slate-100 border-b-2">
    <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="hero-image">
            {#if sights && sights.length === 1}
                <img
                    src={sights[0].image}
                    class="rounded-lg shadow-2xl object-cover h-64 w-96 one-sight-image"
                    alt="hero"
                />
            {/if}
            {#key sights}
                {#if sights && sights.length > 1}
                    <Carousel
                        autoplay={true}
                        on:pageChange={onPageChanged}
                        bind:this={carousel}
                    >
                        {#each sights as sight}
                            <img
                                src={sight.image}
                                class="rounded-lg object-cover h-64 w-96 sight-image"
                                alt="hero"
                            />
                        {/each}
                    </Carousel>
                {/if}
            {/key}
        </div>

        <div class="hidden lg:block">
            {#if place}
                <Map
                    height={250}
                    width={250}
                    coord={[
                        parseFloat(place.coords[0]),
                        parseFloat(place.coords[1]),
                    ]}
                />
            {/if}
        </div>

        <div class="hero-description">
            <h1 class="text-5xl font-bold pb-5">
                {place?.name}
            </h1>
            <div class="h-24 w-full">
                <p>
                    {activeSight?.name}
                </p>
            </div>

            {#if place}
                <div class="h-12">
                    <a class="btn btn-ghost" href={place?.url} target="_blank">
                        <Icon src={Link} size="14" /> globustut
                    </a>
                    <a class="btn btn-ghost" href={place?.url} target="_blank">
                        <Icon src={Link} size="14" /> 34travel
                    </a>
                    <GeoPinMenu {place}></GeoPinMenu>
                    <PlanButton {place}></PlanButton>
                    <VisitedButton {place}></VisitedButton>
                    <!-- <button class="btn btn-circle ml-5" on:click={refreshPlace}
                    ><Icon src={ArrowPath} size="14" /></button
                > -->
                </div>
            {/if}
        </div>
    </div>
</div>

<style lang="scss">
    .hero-description {
        width: calc(100vw - 20px);
        max-width: 400px;
    }
    .hero-image {
        width: calc(100vw - 20px);
        max-width: 450px;
    }

    .one-sight-image {
        margin-bottom: 20px;
    }

    .sight-image {
        min-width: 390px;
        max-width: 390px;
    }

    .custom-arrow.svelte-4bw00n.svelte-4bw00n {
        width: 20px;
        background-color: #000000;
        opacity: 0.3;
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 1;
        transition: opacity 150ms ease;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
    }

    .custom-arrow:hover {
        opacity: 0.5;
    }

    .custom-arrow > i {
        border: solid #1e1e1e;
        border-width: 0 5px 5px 0;
        padding: 5px;
        position: relative;
    }

    .custom-arrow-prev {
        left: 0;
    }

    .custom-arrow-prev > i {
        transform: rotate(135deg);
        right: -4px;
    }

    .custom-arrow-next {
        right: 0;
    }

    .custom-arrow-next > i {
        transform: rotate(-45deg);
        left: -4px;
    }
</style>
