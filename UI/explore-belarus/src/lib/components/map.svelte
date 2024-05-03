<script lang="ts">
    export let height = 500;
    export let width = 500;
    export let coord: [number, number] | null | undefined = null;
</script>

<div>
    <svg {height} {width} xmlns:xlink="http://www.w3.org/1999/xlink">
        <image href="map.svg" {height} {width} />
        {#if coord}
            <!-- <circle
                cx={coord[0]}
                cy={coord[1]}
                r="1"
                style="fill: #F3D991; stroke: #F3D991; stroke-width: 1px;"
            >
            </circle> -->

            <text
                x={coord[0]}
                y={coord[1]}
                style="font-size: 12px; font-family: Arial; fill: #F3D991;"
            >
                ⭐
            </text>
        {/if}
        <!-- <g *ngIf="viewSelector === 'places'">
              <circle *ngFor="let place of places" attr.cx="{{getPlaceCoordX(place)}}"
                attr.cy="{{getPlaceCoordY(place)}}" r="1" style="fill: #F3D991; stroke: #F3D991; stroke-width: 1px;"
                attr.id="place{{place.id}}"></circle>
            </g>
            <g *ngIf="viewSelector === 'sights'">
              <circle *ngFor="let sight of sights"
                attr.cx="{{getPlaceCoordX(sight.place)}}"
                attr.cy="{{getPlaceCoordY(sight.place)}}" r="1" style="fill: #F3D991; stroke: #F3D991; stroke-width: 1px;"
                attr.id="place{{sight.place.id}}"></circle>
            </g> -->
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
