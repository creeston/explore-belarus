<script lang="ts">
    import type { SelectOption } from "$lib/models/select-option";
    import MultiselectDropdown from "./multiselect-dropdown.svelte";

    export let options: SelectOption[];
    export let onValueChange: (values: string[]) => void;

    const generatePlaceholder = (selectedOptions: string[]) => {
        return selectedOptions.length === 0
            ? "Выберите область"
            : selectedOptions.join(", ");
    };
</script>

<MultiselectDropdown
    {options}
    {onValueChange}
    placeholderGenerator={generatePlaceholder}
/>
