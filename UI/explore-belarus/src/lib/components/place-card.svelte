<script lang="ts">
    import { Icon, Link } from "svelte-hero-icons";
    import type { Place } from "$lib/models/place";
    import GeoPinMenu from "./geo-pin-menu.svelte";
    import PlanButton from "./plan-button.svelte";
    import VisitedButton from "./visited-button.svelte";

    export let place: Place;
    $: sights = place.sights;
    $: sightsWithImage = sights.filter((sight: any) => sight.image);
    $: image = sightsWithImage.length > 0 ? sightsWithImage[0].image : null;

    const preprocessLocation = (location: string) => {
        const parts = location.split(",");
        return parts.slice(parts.length - 2).join(",");
    };

    $: location = preprocessLocation(place.location);

    let isHovered = false;
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
    class="place-card m-5"
    on:mouseover={() => (isHovered = true)}
    on:mouseout={() => (isHovered = false)}
>
    <div class="place-card-body">
        <div class="image-container">
            <div class="overlay"></div>
            <img src={image} alt={place.name} />
            <div class="card-action" class:card-action-visible={isHovered}>
                <PlanButton {place} style={"ghost"}></PlanButton>
                <VisitedButton {place} style={"ghost"}></VisitedButton>
            </div>
        </div>
    </div>
    <div class="place-card-title">
        <h5>{place.name}</h5>
        <small> {location} </small>
    </div>
    <div class="place-card-footer">
        <GeoPinMenu {place}></GeoPinMenu>

        <a class="btn btn-ghost btn-sm" href={place.url} target="_blank"
            ><Icon src={Link} size="10" /> globustut</a
        >
        <a
            class="btn btn-ghost btn-sm"
            href={place && place.coords
                ? `https://orda.of.by/.map/?${place.coords[0]},${place.coords[1]}&m=roadmap/13`
                : "/"}
            target="_blank"><Icon src={Link} size="10" /> 34travel</a
        >
    </div>
</div>

<style lang="scss">
    .card-action {
        position: absolute;
        top: 10px;
        right: 10px;
        display: none;
        opacity: 0;
        .btn-ghost {
            background-color: #00000012;
        }
    }

    .card-action-visible {
        display: block;
        opacity: 1;

        div {
            button {
                cursor: pointer;
            }
        }
    }

    .place-card {
        width: 300px;
        // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        // margin-bottom: 50px;
        border: 1px solid #00000023;
        border-top: 0px;
        border-radius: 10px;
    }

    .place-distance {
        position: absolute;
        background: #3b393952;
        color: white;
        border-radius: 5px;
        bottom: 40px;
        left: 15px;
        padding-left: 5px;
        padding-right: 5px;
    }

    .place-card-body {
        display: flex;
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
