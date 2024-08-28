<script lang="ts">
    import { Icon, XMark } from "svelte-hero-icons";
    import { t } from "../../i18n";
    import type { Place } from "$lib/models/place";
    import { ignored } from "$lib/stores/ignored-store";
    import { userInfo } from "$lib/stores/user-store";
    import { userPerformedFirstAction } from "$lib/stores/event-store";
    import ActionIconButton from "./action-icon-button.svelte";

    export let place: Place;
    export let style: "ghost" | "normal" = "normal";
    export let showTooltip = true;

    $: markedAsIgnored = $ignored.some(
        (ignoredPlace) => ignoredPlace.placeId === place.id,
    );

    const markAsIgnored = () => {
        ignored.update((ignored) => [
            ...ignored,
            { placeId: place.id, date: new Date().toISOString() },
        ]);
        if (!$userInfo.hasPerformedAction) {
            userPerformedFirstAction.set(true);
        }
    };

    const unmarkAsIgnored = () => {
        ignored.update((ignored) =>
            ignored.filter((ignoredPlace) => ignoredPlace.placeId !== place.id),
        );
    };
</script>

<ActionIconButton
    {style}
    showTooltipOnHover={showTooltip}
    tooltipText={$t("placecard.markAsIgnoredTooltip")}
    icon={XMark}
    active={markedAsIgnored}
    setActive={markAsIgnored}
    setInctive={unmarkAsIgnored}
></ActionIconButton>
