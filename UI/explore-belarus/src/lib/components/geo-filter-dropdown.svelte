<script lang="ts">
    import type { SelectOption } from "$lib/models/select-option";
    import MultiselectDropdown from "./multiselect-dropdown.svelte";
    import { t } from "../../i18n";

    export let onValueChange: (values: string[]) => void;
    export let value: string[] | null = null;

    const geoFilterOptions: SelectOption[] = [
        { viewValue: $t("filters.region.minsk"), value: "Минская" },
        { viewValue: $t("filters.region.brest"), value: "Брестская" },
        { viewValue: $t("filters.region.grodno"), value: "Гродненская" },
        { viewValue: $t("filters.region.gomel"), value: "Гомельская" },
        { viewValue: $t("filters.region.vitebsk"), value: "Витебская" },
        { viewValue: $t("filters.region.mogilev"), value: "Могилевская" },
    ];

    const generatePlaceholder = (selectedOptions: string[]) => {
        return selectedOptions.length === 0
            ? $t("filters.chooseRegion")
            : selectedOptions.join(", ");
    };
</script>

<MultiselectDropdown
    options={geoFilterOptions}
    {onValueChange}
    {value}
    placeholderGenerator={generatePlaceholder}
/>
