<script lang="ts">
    import { Bookmark } from "svelte-hero-icons";
    import { t } from "../../i18n";
    import { planned } from "$lib/stores/planned-store";
    import { userInfo } from "$lib/stores/user-store";
    import { userPerformedFirstAction } from "$lib/stores/event-store";
    import type { Place } from "$lib/models/place";
    import ActionIconButton from "./action-icon-button.svelte";

    export let place: Place;
    export let style: "ghost" | "normal" = "normal";
    export let showTooltip = true;

    $: markedAsPlanned = $planned.some(
        (plannedPlace) => plannedPlace.placeId === place.id,
    );

    const markAsPlanned = () => {
        planned.update((planned) => [
            ...planned,
            { placeId: place.id, date: new Date().toISOString() },
        ]);
        if (!$userInfo.hasPerformedAction) {
            userPerformedFirstAction.set(true);
        }
    };

    const unmarkAsPlanned = () => {
        planned.update((planned) =>
            planned.filter((plannedPlace) => plannedPlace.placeId !== place.id),
        );
    };
</script>

<ActionIconButton
    {style}
    showTooltipOnHover={showTooltip}
    tooltipText={$t("placecard.markAsPlannedTooltip")}
    icon={Bookmark}
    active={markedAsPlanned}
    setActive={markAsPlanned}
    setInactive={unmarkAsPlanned}
></ActionIconButton>
