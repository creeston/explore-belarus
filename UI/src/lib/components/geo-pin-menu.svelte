<script lang="ts">
    import type { Place } from "$lib/models/place";
    import { Icon, MapPin } from "svelte-hero-icons";
    import { t } from "../../i18n";
    import LinksMenuDropdown from "./links-menu-dropdown.svelte";
    export let place: Place;

    $: menuOptions =
        place && place.coordinates && place.coordinates.length === 2
            ? [
                  {
                      title: "Google Maps",
                      href: `https://www.google.com/maps/@${place.coordinates[0]},${place.coordinates[1]},15z`,
                  },
                  {
                      title: "Orda",
                      href: `https://orda.of.by/.map/?${place.coordinates[0]},${place.coordinates[1]}&m=roadmap/13`,
                  },
              ]
            : null;
</script>

{#if menuOptions}
    <LinksMenuDropdown options={menuOptions} renderDirection={"default"}>
        <Icon src={MapPin} size="20"></Icon>
        {$t("placecard.onTheMap")}
    </LinksMenuDropdown>
{/if}
