<script lang="ts">
    import MultiselectDropdown from "./multiselect-dropdown.svelte";
    import { t } from "../../i18n";
    import type { SelectOption } from "$lib/models/select-option";

    export let onValueChange: (value: any) => void;
    export let value: any[] | null = null;

    const ratingOptions: SelectOption[] = [
        { viewValue: $t("filters.rating.1"), value: 1, group: "globus" },
        { viewValue: $t("filters.rating.2"), value: 2, group: "globus" },
        { viewValue: $t("filters.rating.3"), value: 3, group: "globus" },
        { viewValue: $t("filters.rating.4"), value: 4, group: "globus" },
    ];

    const generatePlaceholder = (selectedOptions: any[]) => {
        return selectedOptions.length === 0
            ? $t("filters.rating")
            : $t("filters.rating") +
                  ": " +
                  selectedOptions.map((option) => option).join(", ");
    };
</script>

<MultiselectDropdown
    options={ratingOptions}
    {onValueChange}
    {value}
    placeholderGenerator={generatePlaceholder}
/>
