<script lang="ts">
    import { Icon, Sparkles, BuildingLibrary } from "svelte-hero-icons";
    import "../../app.css";
    import type { PlaceSelection } from "$lib/models/place";
    import CitiesInput from "./cities-input.svelte";

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
                <a href="/"><Icon src={BuildingLibrary} size="14" />Places</a>
            </li>
        </ul>
    </div>

    <div class="navbar-end">
        <CitiesInput {places}></CitiesInput>
    </div>
</div>
