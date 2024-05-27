<script lang="ts">
    import { Icon, InformationCircle } from "svelte-hero-icons";
    import { t } from "../../i18n";

    let infoModal: any;

    const dataSources = [
        "https://globustut.by",
        "https://34travel.me/gotobelarus",
        "https://vedaj.by/",
        "https://bestbelarus.by/",
        "https://tropinki.by/",
    ];
</script>

<button
    class="btn btn-circle ml-5 hidden md:flex"
    on:click={infoModal.showModal()}
>
    <Icon src={InformationCircle} size="26"></Icon>
</button>

<dialog id="infoModal" class="modal" bind:this={infoModal}>
    <div class="modal-box">
        <h3 class="font-bold text-lg">{$t("about.title")}</h3>
        <p class="py-4">{$t("about.description")}</p>
        <a
            class="link"
            href="https://github.com/creeston/explore-belarus"
            target="_blank">https://github.com/creeston/explore-belarus</a
        >
        <p class="py-4">{$t("about.dataSources")}</p>

        {#each dataSources as source}
            <a class="link" target="_blank" href={source}>{source}</a><br />
        {/each}
        <div class="modal-action">
            <form method="dialog">
                <button class="btn">{$t("actions.close")}</button>
            </form>
        </div>
    </div>
</dialog>
