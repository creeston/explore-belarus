<script lang="ts">
    import {
        Icon,
        Sparkles,
        Check,
        Bookmark,
        GlobeAlt,
        Map,
    } from "svelte-hero-icons";
    import "../../app.css";
    import { planned } from "$lib/stores/planned-store";
    import { visited } from "$lib/stores/visited-store";
    import { t, locale, locales, type Locale } from "../../i18n";
    import SelectDropdown from "./select-dropdown.svelte";
    import type { SelectOption } from "$lib/models/select-option";
    import { userInfo } from "$lib/stores/user-store";
    import { base } from "$app/paths";
    import InfoModalButton from "./info-modal-button.svelte";

    import { page } from "$app/stores";

    const getSelectedMenu = (page: any) => {
        const lastPart = page.url.pathname.split("/").pop();
        if (lastPart === "planned") {
            return "planned";
        } else if (lastPart === "visited") {
            return "visited";
        } else {
            return "sights";
        }
    };

    $: selectedMenu = getSelectedMenu($page);

    const changeLocale = (locale: string) => {
        $locale = locale;
        userInfo.update((user) => ({ ...user, selectedLocale: locale }));
        window.location.reload();
    };

    $: {
        if (!$userInfo.selectedLocale) {
            userInfo.update((user) => ({
                ...user,
                selectedLocale: $locale,
            }));
        } else {
            $locale = $userInfo.selectedLocale;
        }
    }

    const generateLanguageSelectionPlaceholder = (selectedOption: Locale) =>
        selectedOption ? locales[selectedOption].shortName : "N/A";

    const localeSelectOptions: SelectOption[] = Object.keys(locales).map(
        (key: any) => ({
            viewValue: locales[key as Locale].name,
            value: key,
        })
    );
</script>

<div class="navbar bg-base-100 border-b-slate-100 border-b-2 md:pl-10 md:pr-10">
    <div class="navbar-start">
        <a class="btn btn-ghost text-xl" href="{base}/" target="_self">
            <Icon src={Map} size="20"></Icon> Беларускі вандроўнік
        </a>
    </div>
    <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1 space-x-5">
            <li>
                <a href="{base}/" class:active={selectedMenu === "sights"}
                    ><Icon src={Sparkles} size="14" /> {$t("navbar.sights")}
                </a>
            </li>
            <li>
                <a
                    href="{base}/planned"
                    class="indicator"
                    class:active={selectedMenu === "planned"}
                >
                    {#if $planned.length > 0 && $planned.length < 100}
                        <span class="indicator-item badge badge-ghost badge-sm"
                            >{$planned.length}</span
                        >
                    {/if}
                    {#if $planned.length >= 100}
                        <span class="indicator-item badge badge-ghost badge-sm"
                            >99+</span
                        >
                    {/if}
                    <Icon src={Bookmark} size="14" />
                    <span>{$t("navbar.planned")}</span>
                </a>
            </li>

            <li>
                <a
                    href="{base}/visited"
                    class="indicator"
                    class:active={selectedMenu === "visited"}
                >
                    {#if $visited.length > 0 && $visited.length < 100}
                        <span class="indicator-item badge badge-ghost badge-sm"
                            >{$visited.length}</span
                        >
                    {/if}
                    {#if $visited.length >= 100}
                        <span class="indicator-item badge badge-ghost badge-sm"
                            >99+</span
                        >
                    {/if}

                    <Icon src={Check} size="14" /><span
                        >{$t("navbar.visited")}</span
                    ></a
                >
            </li>
        </ul>
    </div>

    <div class="navbar-end">
        <SelectDropdown
            options={localeSelectOptions}
            icon={GlobeAlt}
            onValueChange={changeLocale}
            value={$locale}
            placeholderGenerator={generateLanguageSelectionPlaceholder}
        />

        <InfoModalButton />
    </div>
</div>
