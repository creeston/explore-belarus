<script lang="ts">
    export let height = 500;
    export let width = 500;
    export let coords: [number, number][] | null | undefined = null;
    export let highlighedCoordIndex: number | null = null;
    import { onMount } from "svelte";
    import { geoPath } from "d3-geo";
    import * as d3 from "d3";

    const projection = d3
        .geoMercator()
        .center([28, 54])
        .scale(height * 6)
        .translate([height / 2, width / 2]);
    const path = geoPath().projection(projection);
    let counties: any[] = [];

    $: points = coords
        ? coords.map((coord) => projection([coord[1], coord[0]]))
        : [];

    onMount(async () => {
        const response = await fetch(
            "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
        );
        const json = await response.json();
        counties = json.features.filter(function (d: any) {
            return d.properties.name == "Belarus";
        });
    });
</script>

<div>
    <svg {width} {height}>
        {#each counties as feature, i}
            <path
                d={path(feature)}
                class="state"
                stroke="rgb(522, 201, 207 / 90%)"
                fill="rgb(182, 201, 207)"
                stroke-width="1px"
            />
        {/each}

        {#each points as point, i}
            {#if point}
                {#if highlighedCoordIndex === i}
                    <text
                        x={point[0] - 16}
                        y={point[1] + 8}
                        style="font-size: 20px;"
                    >
                        🌟
                    </text>
                {:else}
                    <text
                        x={point[0] - 8}
                        y={point[1] + 4}
                        style="font-size: 10px;"
                    >
                        ⭐
                    </text>
                {/if}
            {/if}
        {/each}
    </svg>
</div>

<style lang="scss">
    svg text {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    svg text::selection {
        background: none;
    }
</style>
