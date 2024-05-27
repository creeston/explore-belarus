<script lang="ts">
    import { Icon, Link } from "svelte-hero-icons";
    import { t } from "../../i18n";
    import type { Place, Url } from "$lib/models/place";

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
            options.push({
                title: renderSource(source),
                urls: groupedUrls[source],
            });
        }
        return options;
    };

    $: menuOptions = createMenuOptions(place?.urls ?? []);

    let linksModal: any;
</script>

<button class="btn btn-ghost" on:click={linksModal.showModal()}>
    <Icon src={Link} size="20"></Icon>
    {$t("placecard.more")}
</button>

<dialog id="linksModal" class="modal" bind:this={linksModal}>
    <div class="modal-box max-w-5xl">
        <ul class="menu lg:menu-horizontal">
            {#each menuOptions as option}
                <li>
                    <h4 class="menu-title">{option.title}</h4>
                    <ul>
                        {#each option.urls as url}
                            <li>
                                <a target="_blank" href={url.href}>
                                    <Icon size="16" src={Link}
                                    ></Icon>{url.text}</a
                                >
                            </li>
                        {/each}
                    </ul>
                </li>
            {/each}
        </ul>
        <div class="modal-action">
            <form method="dialog">
                <button class="btn">{$t("actions.close")}</button>
            </form>
        </div>
    </div>
    <form method="dialog" class="modal-backdrop">
        <button>close</button>
    </form>
</dialog>
