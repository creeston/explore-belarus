<script lang="ts">
    import { Icon, Bookmark } from "svelte-hero-icons";
    import { t } from "../../i18n";
    import { planned } from "$lib/stores/planned-store";
    import { userInfo } from "$lib/stores/user-store";
    import { userPerformedFirstAction } from "$lib/stores/event-store";
    import type { Place } from "$lib/models/place";

    export let place: Place;
    export let style: "ghost" | "normal" = "normal";

    $: markedAsPlanned = $planned.some(
        (plannedPlace) => plannedPlace.placeId === place.id
    );

    const markAsPlanned = () => {
        planned.update((planned) => [...planned, { placeId: place.id }]);
        if (!$userInfo.hasPerformedAction) {
            userPerformedFirstAction.set(true);
        }
    };

    const unmarkAsPlanned = () => {
        planned.update((planned) =>
            planned.filter((plannedPlace) => plannedPlace.placeId !== place.id)
        );
    };
</script>

{#if !markedAsPlanned}
    <div
        class="tooltip tooltip-left"
        data-tip={$t("placecard.markAsPlannedTooltip")}
    >
        <button
            class="btn btn-square btn-sm btn-ghost"
            on:click={markAsPlanned}
        >
            <Icon
                src={Bookmark}
                size="20"
                color={style == "ghost" ? "#fff" : ""}
            />
        </button>
    </div>
{/if}
{#if markedAsPlanned}
    <button
        class="btn btn-square btn-sm btn-success"
        on:click={unmarkAsPlanned}
    >
        <Icon src={Bookmark} size="20" class="btn-neutral" />
    </button>
{/if}
