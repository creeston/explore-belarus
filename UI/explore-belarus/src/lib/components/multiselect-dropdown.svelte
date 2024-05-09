<script lang="ts">
    import type { SelectOption } from "$lib/models/select-option";

    export let placeholderGenerator: (selectedOptions: string[]) => string;
    export let options: SelectOption[];
    export let onValueChange: (values: any[]) => void;
    export let value: any[] | null = null;

    $: checkedOptions = Array(options.length)
        .fill(5)
        .map((_, i) => {
            return value?.includes(options[i].value) ?? false;
        });
    $: groupedOptions = options.reduce((acc: any, option: any) => {
        if (!acc[option.group]) {
            acc[option.group] = [];
        }
        acc[option.group].push(option);
        return acc;
    }, {});
    let selectedOptions: any = value ?? [];
    let button: any;

    const onOptionSelect = (option: any, index: number) => {
        checkedOptions[index] = !checkedOptions[index];
        if (selectedOptions.includes(option)) {
            selectedOptions = selectedOptions.filter(
                (selectedOption: any) => selectedOption !== option
            );
        } else {
            selectedOptions.push(option);
            selectedOptions = [...selectedOptions];
        }

        onValueChange(selectedOptions);
    };

    let isOpened = false;
    const handleClick = () => {
        if (button && isOpened) {
            button.blur();
        } else {
            isOpened = true;
        }
    };

    $: placeholder = placeholderGenerator(selectedOptions);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="dropdown">
    <div
        tabindex="0"
        role="button"
        class="btn"
        on:blur={() => {
            isOpened = false;
        }}
        on:click={handleClick}
        bind:this={button}
    >
        {placeholder}
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul
        tabindex="0"
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
    >
        {#each Object.keys(groupedOptions) as group}
            {#if group !== "undefined"}
                <h3>{group}</h3>
            {/if}

            {#each groupedOptions[group] as option, index}
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <li on:click={() => onOptionSelect(option.value, index)}>
                    <div class="flex">
                        <div class="grow">{option.viewValue}</div>
                        <input
                            type="checkbox"
                            checked={checkedOptions[index]}
                            class="checkbox"
                        />
                    </div>
                </li>
            {/each}
        {/each}
    </ul>
</div>

<style lang="scss">
    .dropdown-content {
        h3 {
            font-size: 1rem;
            font-weight: 500;
            margin: 0.5rem;
            cursor: default;
        }
    }
</style>
