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
        optionElements[index].blur();
    };

    $: placeholder = placeholderGenerator(selectedOption);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<details class="dropdown dropdown-end">
    <summary class="btn max-sm:btn-sm"
        >{#if icon}
            <Icon src={icon} size="24" />
        {/if}
        {placeholder}</summary
    >
    <ul
        class="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
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
</details>
