<script lang="ts">
    import PlaceCard from "$lib/components/place-card.svelte";

    export let data;
    const { place } = data.props;
</script>

{#if place != null}
    <PlaceCard {place}></PlaceCard>
{/if}
