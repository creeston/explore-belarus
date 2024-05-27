<script lang="ts">
    import type { SelectOption } from "$lib/models/select-option";
    import { Icon } from "svelte-hero-icons";

    export let placeholderGenerator: (selectedOption: any) => string;
    export let icon: any | null = null;
    export let options: SelectOption[];
    export let onValueChange: (value: string) => void;
    export let value: any;

    $: selectedOption = value;
    let button: any;
    let optionElements = Array(options.length).fill(null);

    const onOptionSelect = (option: any, index: number) => {
        selectedOption = option;
        onValueChange(selectedOption);
        button.blur();
        button.blur();
        optionElements[index].blur();
    };

    let isOpened = false;
    const handleClick = () => {
        if (button && isOpened) {
            button.blur();
        } else {
            isOpened = true;
        }
    };

    $: placeholder = placeholderGenerator(selectedOption);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="dropdown dropdown-end">
    <button
        class="btn max-sm:btn-sm"
        on:blur={() => {
            isOpened = false;
        }}
        on:click={handleClick}
        bind:this={button}
    >
        {#if icon}
            <Icon src={icon} size="24" />
        {/if}
        {placeholder}
    </button>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul
        tabindex="0"
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
    >
        {#each options as option, index}
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <li
                on:click={() => onOptionSelect(option.value, index)}
                bind:this={optionElements[index]}
            >
                <div class="flex">
                    <div class="grow">{option.viewValue}</div>
                </div>
            </li>
        {/each}
    </ul>
</div>
