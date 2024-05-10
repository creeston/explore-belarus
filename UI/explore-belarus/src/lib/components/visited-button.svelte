<script lang="ts">
    import { Check, Icon } from "svelte-hero-icons";
    import { t } from "../../i18n";
    import type { Place } from "$lib/models/place";
    import { visited } from "$lib/stores/visited-store";
    import { userInfo } from "$lib/stores/user-store";
    import { userPerformedFirstAction } from "$lib/stores/event-store";

    export let place: Place;
    export let style: "ghost" | "normal" = "normal";

    $: markedAsVisited = $visited.some(
        (visitedPlace) => visitedPlace.placeId === place.id
    );

    const markAsVisited = () => {
        visited.update((visited) => [...visited, { placeId: place.id }]);
        if (!$userInfo.hasPerformedAction) {
            // userInfo.update((user) => ({ ...user, hasPerformedAction: true }));
            userPerformedFirstAction.set(true);
        }
    };

    const unmarkAsVisited = () => {
        visited.update((visited) =>
            visited.filter((visitedPlace) => visitedPlace.placeId !== place.id)
        );
    };
</script>

{#if markedAsVisited}
    <button
        class="btn btn-square btn-sm btn-success"
        on:click={unmarkAsVisited}
    >
        <Icon src={Check} size="20" class="btn-neutral" />
    </button>
{/if}
{#if !markedAsVisited}
    <div
        class="tooltip tooltip-left"
        data-tip={$t("placecard.markAsVisitedTooltip")}
    >
        <button
            class="btn btn-square btn-ghost btn-sm"
            on:click={markAsVisited}
        >
            <Icon
                src={Check}
                size="20"
                color={style == "ghost" ? "#fff" : ""}
            />
        </button>
    </div>
{/if}
