<script lang="ts">
    import type { Image, Place, PlaceSight } from "$lib/models/place";
    import Carousel from "svelte-carousel";
    import Map from "./map.svelte";
    import GeoPinMenu from "./geo-pin-menu.svelte";
    import VisitedButton from "./visited-button.svelte";
    import PlanButton from "./plan-button.svelte";
    import ImageWatermark from "./image-watermark.svelte";
    import PlaceLinksModal from "./place-links-modal.svelte";

    export let places: Place[];
    const placeCandidates = places.filter(
        (place) =>
            place.sights && place.sights.length > 0 && place.urls.length > 1
    );

    let place: Place | null = null;
    let images: Image[] | null = null;
    let carousel: any;

    $: refreshPlace();

    const refreshPlace = () => {
        place = getRandomPlace();
        carousel?.goTo(0, { animated: false });
        const imagesToDisplay = [];
        imagesToDisplay.push(
            ...place.images.filter((image) => image.source == "gotobelarus")
        );
        imagesToDisplay.push(
            ...place.images.filter((image) => image.source == "bestbelarus")
        );
        if (place.sights) {
            place.sights.forEach((sight) => {
                if (sight && sight.images && sight.images.length > 0) {
                    imagesToDisplay.push(sight.images[0]);
                }
            });
        }

        imagesToDisplay.push(
            ...place.images.filter((image) => image.source == "tropinki")
        );

        images = imagesToDisplay.slice(0, 10);
    };

    const getRandomPlace = () => {
        return placeCandidates[
            Math.floor(Math.random() * placeCandidates.length)
        ];
    };

    const displayLocation = (place: Place | null) => {
        if (place && place.location && place.location.length > 0) {
            return place.location.join(", ");
        }
        return "";
    };
</script>

<div class="hero bg-white-200 mt-5 border-b-slate-100 border-b-2 place-hero">
    <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="hero-image">
            {#if images && images.length >= 1}
                <Carousel autoplay={images.length > 1} bind:this={carousel}>
                    {#each images as image}
                        <div class="image-container rounded-lg sight-image">
                            <img src={image.url} alt="hero" />
                            <div class="overlay"></div>
                            <ImageWatermark source={image.source} />
                        </div>
                    {/each}
                </Carousel>
            {/if}
        </div>

        <div class="hidden lg:block">
            {#if place}
                <Map height={250} width={250} coords={[place.coordinates]} />
            {/if}
        </div>

        <div class="hero-description">
            <h1 class="text-5xl font-bold pb-5">
                {place?.name}
            </h1>
            <div class="mb-5">
                <p>
                    {displayLocation(place)}
                </p>
            </div>

            {#if place}
                <div>
                    <PlaceLinksModal {place}></PlaceLinksModal>
                    <GeoPinMenu {place}></GeoPinMenu>
                    <PlanButton {place}></PlanButton>
                    <VisitedButton {place}></VisitedButton>
                </div>
            {/if}
        </div>
    </div>
</div>

<style lang="scss">
    .image-container {
        height: 250px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background-color: #ccc;
        position: relative;

        .overlay {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: rgba(243, 217, 145, 0.15);
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

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
