<script lang="ts">
    import type { Place } from "$lib/models/place";
    import { Icon, MapPin } from "svelte-hero-icons";
    export let place: Place;
</script>

<div class="dropdown">
    <div tabindex="0" role="button" class="btn btn-circle btn-sm btn-ghost">
        <Icon src={MapPin} size="20"></Icon>
    </div>

    {#if place && place.coords && place.coords.length === 2}
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
    {/if}
</div>
