<script lang="ts">
    import MultiselectDropdown from "./multiselect-dropdown.svelte";

    export let options: any[];
    export let onValueChange: (value: any) => void;

    const generatePlaceholder = (selectedOptions: any[]) => {
        return selectedOptions.length === 0
            ? "Выберите рейтинг"
            : "Рейтинг: " + selectedOptions.map((option) => option).join(", ");
    };
</script>

<MultiselectDropdown
    {options}
    {onValueChange}
    placeholderGenerator={generatePlaceholder}
/>
