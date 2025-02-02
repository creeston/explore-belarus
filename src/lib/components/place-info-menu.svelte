<script lang="ts">
    import type { Place, Url } from "$lib/models/place";
    import { Icon, Link } from "svelte-hero-icons";
    import LinksMenuDropdown from "./links-menu-dropdown.svelte";
    export let place: Place;

    const renderSource = (urlSource: string) => {
        switch (urlSource) {
            case "globus":
                return "Глобус Беларуси";
            case "gotobelarus":
                return "Go to Belarus";
            case "vedaj":
                return "vedaj.by";
            case "bestbelarus":
                return "bestbelarus.by";
            case "tropinki":
                return "tropinki.by";
        }
    };

    const createMenuOptions = (urls: any) => {
        const groupedUrls = urls.reduce((acc: any, url: Url) => {
            if (!acc[url.source]) {
                acc[url.source] = [];
            }
            acc[url.source].push(url);
            return acc;
        }, {});
        const options = [];
        for (const source in groupedUrls) {
            for (let i = 0; i < groupedUrls[source].length; i++) {
                const url = groupedUrls[source][i];
                const prefix =
                    groupedUrls[source].length > 1 ? ` #${i + 1}` : "";
                options.push({
                    title: renderSource(source) + prefix,
                    href: url.url,
                });
            }
        }
        return options;
    };

    $: menuOptions = createMenuOptions(place?.urls ?? []);
</script>

{#if place && place.urls && place.urls.length > 0}
    <LinksMenuDropdown options={menuOptions} renderDirection={"left-end"}>
        <Icon src={Link} size="20"></Icon> Подробнее
    </LinksMenuDropdown>
{/if}
