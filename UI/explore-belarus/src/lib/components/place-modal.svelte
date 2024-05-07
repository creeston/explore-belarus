<script lang="ts">
    import type { Place } from "$lib/models/place";
    import Map from "./map.svelte";

    export let place: Place;
    $: sightsWithImage = place.sights.filter((sight: any) => sight.image);
</script>

<dialog id="my_modal_{place.id}" class="modal">
    <div class="modal-box">
        <h3 class="font-bold text-lg">{place.name}</h3>
        <Map
            height={250}
            width={250}
            coord={[parseFloat(place.coords[0]), parseFloat(place.coords[1])]}
        />
        <div class="carousel w-96">
            {#each sightsWithImage as sight, i}
                <div
                    id="slide_{place.id}_{i}"
                    class="carousel-item relative w-full"
                >
                    <img src={sight.image} alt={sight.name} />
                    <div
                        class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2"
                    >
                        {#if i > 0}
                            <a
                                href="#slide_{place.id}_{i - 1}"
                                class="btn btn-circle navigator">❮</a
                            >
                        {/if}
                        {#if i == 0}
                            <div class="btn btn-circle empty-navigator"></div>
                        {/if}

                        {#if i < sightsWithImage.length - 1}
                            <a
                                href="#slide_{place.id}_{i + 1}"
                                class="btn btn-circle navigator">❯</a
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
</dialog>

<style lang="scss">
    .empty-navigator {
        background-color: transparent;
        border-color: transparent;
    }

    .navigator {
        background-color: rgba(255, 255, 255, 0.4);
        border: 0px;
    }
</style>
