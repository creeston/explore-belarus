<script lang="ts">
    import type { Place, Image } from "$lib/models/place";
    import GeoPinMenu from "./geo-pin-menu.svelte";
    import PlanButton from "./plan-button.svelte";
    import VisitedButton from "./visited-button.svelte";
    import ImageWatermark from "./image-watermark.svelte";
    import PlaceLinksModal from "./place-links-modal.svelte";
    import IgnoreButton from "./ignore-button.svelte";

    export let place: Place;

    const getImageForPlace = (place: Place) => {
        if (place.images && place.images.length > 0) {
            // First priority is image from gotobelarus
            if (
                place.images.some(
                    (image: Image) => image.source === "gotobelarus",
                )
            ) {
                return place.images.filter(
                    (image: Image) => image.source === "gotobelarus",
                )[0];
            }

            // Second priority is image from bestbelarus
            if (
                place.images.some(
                    (image: Image) => image.source === "bestbelarus",
                )
            ) {
                return place.images.filter(
                    (image: Image) => image.source === "bestbelarus",
                )[0];
            }
        }

        // Third priority is image from sights (most probably from globus source)
        if (place.sights && place.sights.length > 0) {
            const sight = place.sights.find(
                (sight) => sight.images && sight.images.length > 0,
            );
            if (sight) {
                return sight.images[0];
            }
        }

        // Fourth priority is image from tropinki
        if (place.images.some((image: Image) => image.source === "tropinki")) {
            return place.images.filter(
                (image: Image) => image.source === "tropinki",
            )[0];
        }

        // Fifth priority is any image
        if (place.images && place.images.length > 0) {
            return place.images[0];
        }

        return null;
    };

    $: image = getImageForPlace(place);

    const preprocessLocation = (location: string[]) => {
        return location.join(", ");
    };

    $: location = preprocessLocation(place.location);
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div class="place-card m-5">
    <div class="place-card-body-lg hidden sm:flex">
        <div class="image-container">
            <div class="overlay"></div>
            {#if image}
                <img src={image.url} alt={place.name} />
            {/if}
            <div class="card-action">
                <IgnoreButton {place} style={"ghost"}></IgnoreButton>
                <PlanButton {place} style={"ghost"}></PlanButton>
                <VisitedButton {place} style={"ghost"}></VisitedButton>
            </div>
            {#if image}
                <ImageWatermark source={image.source}></ImageWatermark>
            {/if}
        </div>
    </div>
    <div class="place-card-body flex sm:hidden">
        <div class="image-container">
            <div class="overlay"></div>
            {#if image}
                <img src={image.url} alt={place.name} />
            {/if}
            <div class="card-action-small">
                <IgnoreButton {place} style={"ghost"} showTooltip={false}
                ></IgnoreButton>
                <PlanButton {place} style={"ghost"} showTooltip={false}
                ></PlanButton>
                <VisitedButton {place} style={"ghost"} showTooltip={false}
                ></VisitedButton>
            </div>
            {#if image}
                <ImageWatermark source={image.source}></ImageWatermark>
            {/if}
        </div>
    </div>
    <div class="place-card-title">
        <h5>{place.name}</h5>
        <small> {location} </small>
    </div>
    <div class="place-card-footer">
        <GeoPinMenu {place}></GeoPinMenu>
        <PlaceLinksModal {place}></PlaceLinksModal>
    </div>
</div>

<style lang="scss">
    .card-action {
        position: absolute;
        top: 10px;
        right: 10px;
        display: none;
        opacity: 0;
    }

    .place-card-body-lg:hover .card-action {
        display: block; /* Show when parent is hovered */
        opacity: 1;
    }

    .card-action-small {
        position: absolute;
        top: 10px;
        right: 10px;
    }

    .place-card {
        width: 300px;
        border: 1px solid #00000023;
        border-top: 0px;
        border-radius: 10px;
    }

    .place-card-body {
        justify-content: center;
        align-items: center;
        height: 400px;
        padding: 0px;
        position: relative;
        border-radius: 10px 10px 0px 0px;
        overflow: hidden;
    }

    .place-card-body-lg {
        justify-content: center;
        align-items: center;
        height: 400px;
        padding: 0px;
        position: relative;
        border-radius: 10px 10px 0px 0px;
        overflow: hidden;
    }

    .image-container {
        width: 300px;
        height: 400px;
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

    .place-card-footer {
        display: flex;
        justify-content: space-around;
        padding: 10px;
    }

    .place-card-title {
        text-align: center;
        padding-top: 10px;
        padding-left: 5px;
        padding-right: 5px;

        h5 {
            margin-bottom: 5px;
        }

        small {
            font-size: 0.7em;
        }
    }
</style>
