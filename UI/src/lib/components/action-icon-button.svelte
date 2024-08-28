<script lang="ts">
    import { Icon } from "svelte-hero-icons";

    export let style: "ghost" | "normal" = "normal";
    export let showTooltipOnHover = true;
    export let openTooltip = false;
    export let icon: any;
    export let active: boolean;
    export let setActive: () => void;
    export let setInctive: () => void;
    export let tooltipText: string;
</script>

{#if active}
    <button class="btn btn-square btn-sm btn-success" on:click={setInctive}>
        <Icon src={icon} size="20" class="btn-neutral" />
    </button>
{/if}

{#if !active}
    {#if showTooltipOnHover}
        <div
            class="tooltip tooltip-left"
            data-tip={tooltipText}
            class:tooltip-open={openTooltip}
        >
            <button
                class="btn btn-square btn-ghost btn-sm"
                on:click={setActive}
            >
                <Icon
                    src={icon}
                    size="20"
                    color={style == "ghost" ? "#fff" : ""}
                />
            </button>
        </div>
    {/if}
    {#if !showTooltipOnHover}
        <button class="btn btn-square btn-ghost btn-sm" on:click={setActive}>
            <Icon src={icon} size="20" color={style == "ghost" ? "#fff" : ""} />
        </button>
    {/if}
{/if}
