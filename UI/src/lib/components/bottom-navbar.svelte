<script lang="ts">
    import { Bookmark, Check, Icon, Sparkles } from "svelte-hero-icons";

    const getSelectedMenu = (page: any) => {
        const lastPart = page.url.pathname.split("/").pop();
        if (lastPart === "planned") {
            return "planned";
        } else if (lastPart === "visited") {
            return "visited";
        } else {
            return "sights";
        }
    };

    $: selectedMenu = getSelectedMenu($page);

    import { planned } from "$lib/stores/planned-store";
    import { visited } from "$lib/stores/visited-store";

    import { base } from "$app/paths";
    import { page } from "$app/stores";
</script>

<div class="btm-nav lg:hidden">
    <a
        href="{base}/"
        class:active={selectedMenu === "sights"}
        class="max-sm:text-xs"
    >
        <Icon src={Sparkles} size="20" />
    </a>
    <a
        href="{base}/planned"
        class:active={selectedMenu === "planned"}
        class="max-sm:text-xs"
    >
        <span class="indicator">
            {#if $planned.length > 0 && $planned.length < 100}
                <span class="indicator-item badge badge-ghost badge-xs"
                    >{$planned.length}</span
                >
            {/if}
            {#if $planned.length >= 100}
                <span class="indicator-item badge badge-ghost badge-xs"
                    >99+</span
                >
            {/if}
            <Icon src={Bookmark} size="20" />
        </span>
    </a>
    <a
        href="{base}/visited"
        class:active={selectedMenu === "visited"}
        class="max-sm:text-xs"
    >
        <span class="indicator">
            {#if $visited.length > 0 && $visited.length < 100}
                <span class="indicator-item badge badge-ghost badge-sm"
                    >{$visited.length}</span
                >
            {/if}
            {#if $visited.length >= 100}
                <span class="indicator-item badge badge-ghost badge-xs"
                    >99+</span
                >
            {/if}
            <Icon src={Check} size="20" />
        </span>
    </a>
</div>
