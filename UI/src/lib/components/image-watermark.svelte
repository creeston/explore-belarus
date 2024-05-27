<script lang="ts">
    import type { Source } from "$lib/models/place";

    export let source: Source;

    const renderSource = (urlSource: string) => {
        switch (urlSource) {
            case "globus":
                return "Глобус Беларуси";
            case "gotobelarus":
                return "Go to Belarus";
            case "vedaj":
                return "vedaj.by";
            case "bestbelarus":
                return "bestbelarus.by";
            case "tropinki":
                return "tropinki.by";
        }
    };

    const renderUrl = (urlSource: string) => {
        switch (urlSource) {
            case "globus":
                return "https://globustut.by";
            case "gotobelarus":
                return "https://34travel.me/gotobelarus";
            case "vedaj":
                return "https://vedaj.by/";
            case "bestbelarus":
                return "https://bestbelarus.by/";
            case "tropinki":
                return "https://tropinki.by/";
        }
    };
</script>

<!-- <div class="card-watermark">{renderSource(source)}</div> -->

<a href={renderUrl(source)} target="_blank" class="card-watermark">
    {renderSource(source)}
</a>

<style>
    .card-watermark {
        position: absolute;
        top: 10px;
        left: 10px;
        cursor: pointer;
        color: rgb(255, 255, 255, 0.5);
        font-size: small;

        text-shadow: 1px 1px 2px rgba(77, 73, 73, 0.221); /* Adjust shadow for contrast */
    }
</style>
