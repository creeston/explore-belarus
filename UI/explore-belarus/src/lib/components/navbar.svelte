<script lang="ts">
    import {
        Icon,
        Sparkles,
        Check,
        Bookmark,
        GlobeAlt,
    } from "svelte-hero-icons";
    import "../../app.css";
    import type { PlaceSelection } from "$lib/models/place";

    export let places: PlaceSelection[];
</script>

<div class="navbar bg-base-100 border-b-slate-100 border-b-2">
    <div class="navbar-start">
        <a class="btn btn-ghost text-xl" href="/">
            <div>Explore Belarus ⛺</div>
        </a>
    </div>
    <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
            <li><a href="/"><Icon src={Sparkles} size="14" /> Sights</a></li>
            <li>
                <a href="/"><Icon src={Bookmark} size="14" />Planned</a>
            </li>
            <li>
                <a href="/"><Icon src={Check} size="14" />Visited</a>
            </li>
        </ul>
    </div>

    <div class="navbar-end">
        <button class="btn mr-10">
            <Icon src={GlobeAlt} size="24" /> бел
        </button>
        <!-- <CitiesInput {places}></CitiesInput> -->
    </div>
</div>
