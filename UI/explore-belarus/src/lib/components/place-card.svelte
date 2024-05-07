<script lang="ts">
    import { Bookmark, Check, Icon, Link, MapPin } from "svelte-hero-icons";
    import PlaceModal from "./place-modal.svelte";
    import type { Place } from "$lib/models/place";

    export let place: Place;
    $: sights = place.sights;
    $: sightsWithImage = sights.filter((sight: any) => sight.image);
    $: image = sightsWithImage.length > 0 ? sightsWithImage[0].image : null;

    const preprocessLocation = (location: string) => {
        // split by comma and get last two parts
        const parts = location.split(",");
        return parts.slice(parts.length - 2).join(",");
    };

    $: location = preprocessLocation(place.location);

    let markedAsPlanned = false;
    let markedAsVisited = false;

    const showModal = () => {
        const modal = document.getElementById(`my_modal_${place.id}`) as any;
        modal.showModal();
    };
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="place-card m-5">
    <div class="place-card-body">
        <div class="image-container">
            <div class="overlay"></div>
            <img src={image} alt={place.name} />
            <div class="card-action">
                {#if !markedAsPlanned}
                    <button
                        class="btn btn-square btn-sm btn-ghost"
                        on:click={() => {
                            markedAsPlanned = true;
                        }}
                    >
                        <Icon src={Bookmark} size="20" color="#fff" />
                    </button>
                {/if}
                {#if markedAsPlanned}
                    <button
                        class="btn btn-square btn-sm btn-success"
                        on:click={() => {
                            markedAsPlanned = false;
                        }}
                    >
                        <Icon src={Bookmark} size="20" class="btn-neutral" />
                    </button>
                {/if}

                {#if markedAsVisited}
                    <button
                        class="btn btn-square btn-sm btn-success"
                        on:click={() => {
                            markedAsVisited = false;
                        }}
                    >
                        <Icon src={Check} size="20" class="btn-neutral" />
                    </button>
                {/if}
                {#if !markedAsVisited}
                    <button
                        class="btn btn-square btn-sm btn-ghost"
                        on:click={() => {
                            markedAsVisited = true;
                        }}
                    >
                        <Icon src={Check} size="20" color="#fff" />
                    </button>
                {/if}
            </div>
        </div>
    </div>
    <div class="place-card-title">
        <h5>{place.name}</h5>
        <small> {location} </small>
    </div>
    <div class="place-card-footer">
        <div class="dropdown">
            <div
                tabindex="0"
                role="button"
                class="btn btn-circle btn-sm btn-ghost"
            >
                <Icon src={MapPin} size="20"></Icon>
            </div>
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <ul
                tabindex="0"
                class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
                <li>
                    <a
                        href={`https://www.google.com/maps/@${place.coords[0]},${place.coords[1]},15z`}
                        target="_blank">Google Maps</a
                    >
                </li>
                <li>
                    <a
                        href={`https://orda.of.by/.map/?${place.coords[0]},${place.coords[1]}&m=roadmap/13`}
                        target="_blank"
                    >
                        Orda</a
                    >
                </li>
            </ul>
        </div>

        <a class="btn btn-ghost btn-sm" href={place.url} target="_blank"
            ><Icon src={Link} size="10" /> globustut</a
        >
        <a
            class="btn btn-ghost btn-sm"
            href={`https://orda.of.by/.map/?${place.coords[0]},${place.coords[1]}&m=roadmap/13`}
            target="_blank"><Icon src={Link} size="10" /> 34travel</a
        >
    </div>
</div>

<!-- Put this part before </body> tag -->
<!-- <input type="checkbox" id="my_modal_7" class="modal-toggle" /> -->
<PlaceModal {place} />

<!-- <dialog id="my_modal_{place.id}" class="modal">
    <div class="modal-box">
        <h3 class="font-bold text-lg">{place.name}</h3>
        <div class="carousel w-96">
            {#each sightsWithImage as sight, i}
                <div
                    id="slide_{place.id}_{i}"
                    class="carousel-item relative w-full"
                >
                    <img
                        src={sight.image}
                        alt={sight.name}
                        on:click={showModal}
                    />
                    <div
                        class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
                    >
                        {#if i > 0}
                            <a
                                href="#slide_{place.id}_{i - 1}"
                                class="btn btn-circle">❮</a
                            >
                        {/if}
                        {#if i == 0}
                            <div class="btn btn-circle"></div>
                        {/if}

                        {#if i < sightsWithImage.length - 1}
                            <a
                                href="#slide_{place.id}_{i + 1}"
                                class="btn btn-circle">❯</a
                            >
                        {/if}
                    </div>
                </div>
            {/each}
        </div>

        <p class="py-4">Press ESC key or click outside to close</p>
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog> -->

<style lang="scss">
    .card-action {
        position: absolute;
        top: 10px;
        right: 10px;

        .btn-ghost {
            background-color: #00000012;
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

    .place-card-header {
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        text-align: center;
        position: absolute;
        width: 300px;
        z-index: 2;
        font-weight: bold;
        padding-bottom: 10px;
        padding-top: 10px;
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

    .carousel-container {
        width: 300px;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background-color: #ccc;
        position: relative;
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

    .controls {
        width: 280px;
        display: -webkit-box;
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        color: white;
        position: absolute;
    }

    .left-arrow,
    .right-arrow {
        // cursor: pointer;
    }

    .place-card-footer {
        display: flex;
        justify-content: space-around;
        padding: 10px;
    }

    .icon-button {
        // cursor: pointer;
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
            font-size: 0.6em;
        }
    }
</style>
