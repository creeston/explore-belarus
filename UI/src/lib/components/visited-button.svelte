<script lang="ts">
    import { Check } from "svelte-hero-icons";
    import { t } from "../../i18n";
    import type { Place } from "$lib/models/place";
    import { visited } from "$lib/stores/visited-store";
    import { userInfo } from "$lib/stores/user-store";
    import { userPerformedFirstAction } from "$lib/stores/event-store";
    import ActionIconButton from "./action-icon-button.svelte";

    export let place: Place;
    export let style: "ghost" | "normal" = "normal";
    export let showTooltip = true;

    $: markedAsVisited = $visited.some(
        (visitedPlace) => visitedPlace.placeId === place.id,
    );

    const markAsVisited = () => {
        visited.update((visited) => [
            ...visited,
            { placeId: place.id, date: new Date().toISOString() },
        ]);
        if (!$userInfo.hasPerformedAction) {
            userPerformedFirstAction.set(true);
        }
    };

    const unmarkAsVisited = () => {
        visited.update((visited) =>
            visited.filter((visitedPlace) => visitedPlace.placeId !== place.id),
        );
    };
</script>

<ActionIconButton
    {style}
    showTooltipOnHover={showTooltip}
    tooltipText={$t("placecard.markAsPlannedTooltip")}
    icon={Check}
    active={markedAsVisited}
    setActive={markAsVisited}
    setInactive={unmarkAsVisited}
></ActionIconButton>
