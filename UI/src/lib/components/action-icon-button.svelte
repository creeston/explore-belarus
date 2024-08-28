<script lang="ts">
    import { Icon } from "svelte-hero-icons";

    export let style: "ghost" | "normal" = "normal";
    export let showTooltipOnHover = true;
    export let openTooltip = false;
    export let icon: any;
    export let active: boolean;
    export let setActive: () => void;
    export let setInactive: () => void;
    export let tooltipText: string;
</script>

{#if showTooltipOnHover}
    <div
        class="tooltip tooltip-left"
        data-tip={tooltipText}
        class:tooltip-open={openTooltip}
    >
        <button
            class="btn btn-square btn-sm"
            class:btn-success={active}
            class:btn-ghost={!active}
            on:click={() => (active ? setInactive() : setActive())}
        >
            <Icon
                src={icon}
                size="20"
                class={active ? "btn-neutral" : ""}
                color={style == "ghost" ? "#fff" : ""}
            />
        </button>
    </div>
{/if}

{#if !showTooltipOnHover}
    <button
        class="btn btn-square btn-sm"
        class:btn-success={active}
        class:btn-ghost={!active}
        on:click={() => (active ? setInactive() : setActive())}
    >
        <Icon
            src={icon}
            size="20"
            class={active ? "btn-neutral" : ""}
            color={style == "ghost" ? "#fff" : ""}
        />
    </button>
{/if}
