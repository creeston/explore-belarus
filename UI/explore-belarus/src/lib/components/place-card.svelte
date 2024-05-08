<script lang="ts">
    import { Bookmark, Check, Icon, Link, MapPin } from "svelte-hero-icons";
    import type { Place } from "$lib/models/place";
    import { planned } from "$lib/stores/planned-store";
    import { visited } from "$lib/stores/visited-store";
    import { t, locale } from "../../i18n";
    import { userInfo } from "$lib/stores/user-store";
    import { userPerformedFirstAction } from "$lib/stores/event-store";

    export let place: Place;
    $: sights = place.sights;
    $: sightsWithImage = sights.filter((sight: any) => sight.image);
    $: image = sightsWithImage.length > 0 ? sightsWithImage[0].image : null;

    const preprocessLocation = (location: string) => {
        const parts = location.split(",");
        return parts.slice(parts.length - 2).join(",");
    };

    $: location = preprocessLocation(place.location);

    $: markedAsPlanned = $planned.some(
        (plannedPlace) => plannedPlace.placeId === place.id
    );
    $: markedAsVisited = $visited.some(
        (visitedPlace) => visitedPlace.placeId === place.id
    );

    const markAsPlanned = () => {
        planned.update((planned) => [...planned, { placeId: place.id }]);
        if (!$userInfo.hasPerformedAction) {
            userInfo.update((user) => ({ ...user, hasPerformedAction: true }));
            userPerformedFirstAction.set(true);
        }
    };

    const unmarkAsPlanned = () => {
        planned.update((planned) =>
            planned.filter((plannedPlace) => plannedPlace.placeId !== place.id)
        );
    };

    const markAsVisited = () => {
        visited.update((visited) => [...visited, { placeId: place.id }]);
    };

    const unmarkAsVisited = () => {
        visited.update((visited) =>
            visited.filter((visitedPlace) => visitedPlace.placeId !== place.id)
        );
    };

    let isHovered = false;
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
    class="place-card m-5"
    on:mouseover={() => (isHovered = true)}
    on:mouseout={() => (isHovered = false)}
>
    <div class="place-card-body">
        <div class="image-container">
            <div class="overlay"></div>
            <img src={image} alt={place.name} />
            <div class="card-action" class:card-action-visible={isHovered}>
                {#if !markedAsPlanned}
                    <div
                        class="tooltip tooltip-left"
                        data-tip={$t("placecard.markAsPlannedTooltip")}
                    >
                        <button
                            class="btn btn-square btn-sm btn-ghost"
                            on:click={markAsPlanned}
                        >
                            <Icon src={Bookmark} size="20" color="#fff" />
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
                            class="btn btn-square btn-sm btn-ghost"
                            on:click={markAsVisited}
                        >
                            <Icon src={Check} size="20" color="#fff" />
                        </button>
                    </div>
                {/if}
            </div>
        </div>
    </div>
    <div class="place-card-title">
        <h5>{place.name}</h5>
        <small> {location} </small>
    </div>
    <div class="place-card-footer">
        <div class="dropdown">
            <div
                tabindex="0"
                role="button"
                class="btn btn-circle btn-sm btn-ghost"
            >
                <Icon src={MapPin} size="20"></Icon>
            </div>
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <ul
                tabindex="0"
                class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
                <li>
                    <a
                        href={`https://www.google.com/maps/@${place.coords[0]},${place.coords[1]},15z`}
                        target="_blank">Google Maps</a
                    >
                </li>
                <li>
                    <a
                        href={`https://orda.of.by/.map/?${place.coords[0]},${place.coords[1]}&m=roadmap/13`}
                        target="_blank"
                    >
                        Orda</a
                    >
                </li>
            </ul>
        </div>

        <a class="btn btn-ghost btn-sm" href={place.url} target="_blank"
            ><Icon src={Link} size="10" /> globustut</a
        >
        <a
            class="btn btn-ghost btn-sm"
            href={`https://orda.of.by/.map/?${place.coords[0]},${place.coords[1]}&m=roadmap/13`}
            target="_blank"><Icon src={Link} size="10" /> 34travel</a
        >
    </div>
</div>

<style lang="scss">
    .card-action {
        position: absolute;
        top: 10px;
        right: 10px;
        display: none;
        opacity: 0;
        .btn-ghost {
            background-color: #00000012;
        }
    }

    .card-action-visible {
        display: block;
        opacity: 1;
    }

    .place-card {
        width: 300px;
        // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        // margin-bottom: 50px;
        border: 1px solid #00000023;
        border-top: 0px;
        border-radius: 10px;
    }

    .place-distance {
        position: absolute;
        background: #3b393952;
        color: white;
        border-radius: 5px;
        bottom: 40px;
        left: 15px;
        padding-left: 5px;
        padding-right: 5px;
    }

    .place-card-header {
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        text-align: center;
        position: absolute;
        width: 300px;
        z-index: 2;
        font-weight: bold;
        padding-bottom: 10px;
        padding-top: 10px;
    }

    .place-card-body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 400px;
        padding: 0px;
        position: relative;
        border-radius: 10px 10px 0px 0px;
        overflow: hidden;
    }

    .carousel-container {
        width: 300px;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background-color: #ccc;
        position: relative;
    }

    .image-container {
        width: 300px;
        height: 400px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        background-color: #ccc;
        position: relative;

        .overlay {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: rgba(243, 217, 145, 0.15);
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .controls {
        width: 280px;
        display: -webkit-box;
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        color: white;
        position: absolute;
    }

    .place-card-footer {
        display: flex;
        justify-content: space-around;
        padding: 10px;
    }

    .place-card-title {
        text-align: center;
        padding-top: 10px;
        padding-left: 5px;
        padding-right: 5px;

        h5 {
            margin-bottom: 5px;
        }

        small {
            font-size: 0.7em;
        }
    }
</style>
