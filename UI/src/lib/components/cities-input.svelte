<script lang="ts">
    import type { PlaceSelection } from "$lib/models/place";

    export let places: PlaceSelection[];

    let filteredCountries: string[] = [];
    const filterCountries = () => {
        let storageArr: string[] = [];
        if (inputValue) {
            places.forEach((place) => {
                if (
                    place.name
                        .toLowerCase()
                        .startsWith(inputValue.toLowerCase())
                ) {
                    storageArr = [...storageArr, makeMatchBold(place.name)];
                }
            });
        }
        filteredCountries = storageArr.slice(0, 10);
    };

    let searchInput; // use with bind:this to focus element
    let inputValue = "";

    $: if (!inputValue) {
        filteredCountries = [];
        hiLiteIndex = null;
    }

    const setInputVal = (countryName: string) => {
        inputValue = removeBold(countryName);
        filteredCountries = [];
        hiLiteIndex = null;
        if (document) {
            (document.querySelector("#country-input") as any)?.focus();
        }
    };

    const makeMatchBold = (value: string) => {
        let matched = value.substring(0, inputValue.length);
        let makeBold = `<strong>${matched}</strong>`;
        let boldedMatch = value.replace(matched, makeBold);
        return boldedMatch;
    };

    const removeBold = (value: string) => {
        //replace < and > all characters between
        return value.replace(/<(.)*?>/g, "");
        // return str.replace(/<(strong)>/g, "").replace(/<\/(strong)>/g, "");
    };

    /* NAVIGATING OVER THE LIST OF COUNTRIES W HIGHLIGHTING */
    let hiLiteIndex: any = null;
    //$: console.log(hiLiteIndex);
    $: hiLitedCountry = filteredCountries[hiLiteIndex];

    const navigateList = (e: any) => {
        if (
            e.key === "ArrowDown" &&
            hiLiteIndex <= filteredCountries.length - 1
        ) {
            hiLiteIndex === null ? (hiLiteIndex = 0) : (hiLiteIndex += 1);
        } else if (e.key === "ArrowUp" && hiLiteIndex !== null) {
            hiLiteIndex === 0
                ? (hiLiteIndex = filteredCountries.length - 1)
                : (hiLiteIndex -= 1);
        } else if (e.key === "Enter") {
            setInputVal(filteredCountries[hiLiteIndex]);
        } else {
            return;
        }
    };
</script>

<svelte:window on:keydown={navigateList} />

<div class="autocomplete">
    <input
        type="text"
        placeholder="Your city"
        class="input input-bordered w-full max-w-xs"
        bind:this={searchInput}
        bind:value={inputValue}
        on:input={filterCountries}
    />
    <!-- FILTERED LIST OF COUNTRIES -->
    {#if filteredCountries.length > 0}
        <ul id="autocomplete-items-list">
            {#each filteredCountries as country, i}
                <li
                    class="autocomplete-items"
                    class:autocomplete-active={i === hiLiteIndex}
                    on:click={() => setInputVal(country)}
                >
                    {@html country}
                </li>
            {/each}
        </ul>
    {/if}

    <!-- <details class="dropdown">
        <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-xs"
        />
        <ul
            class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
        >
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
        </ul>
    </details> -->
</div>

<style>
    li.autocomplete-items {
        list-style: none;
        border-bottom: 1px solid #d4d4d4;
        z-index: 99;
        /*position the autocomplete items to be the same width as the container:*/
        top: 100%;
        left: 0;
        right: 0;
        padding: 10px;
        cursor: pointer;
        background-color: #fff;
    }

    li.autocomplete-items:hover {
        /*when hovering an item:*/
        background-color: #81921f;
        color: white;
    }

    li.autocomplete-items:active {
        /*when navigating through the items using the arrow keys:*/
        background-color: DodgerBlue !important;
        color: #ffffff;
    }

    .autocomplete-active {
        /*when navigating through the items using the arrow keys:*/
        background-color: DodgerBlue !important;
        color: #ffffff;
    }

    div.autocomplete {
        /*the container must be positioned relative:*/
        position: relative;
        display: inline-block;
        width: 300px;
    }
    input {
        border: 1px solid transparent;
        background-color: #f1f1f1;
        padding: 10px;
        font-size: 16px;
        margin: 0;
    }
    input[type="text"] {
        background-color: #f1f1f1;
        width: 100%;
    }
    input[type="submit"] {
        background-color: DodgerBlue;
        color: #fff;
    }

    #autocomplete-items-list {
        margin: 0;
        padding: 0;
        top: 0;
        width: 297px;
        border: 1px solid #ddd;
        background-color: #ddd;
        position: absolute;
        top: 50px;
    }
</style>
