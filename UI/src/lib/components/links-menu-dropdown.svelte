<script lang="ts">
    export let options: any[];
    export let renderDirection: "left-end" | "default" = "default";

    let isOpened = false;
    let button: any;

    const handleClick = () => {
        if (button && isOpened) {
            button.blur();
        } else {
            isOpened = true;
        }
    };
</script>

<div
    class="dropdown"
    class:dropdown-left={renderDirection == "left-end"}
    class:dropdown-end={renderDirection == "left-end"}
>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        tabindex="0"
        role="button"
        class="btn btn-ghost"
        on:blur={() => {
            isOpened = false;
        }}
        on:click={handleClick}
        bind:this={button}
    >
        <slot />
    </div>

    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul
        tabindex="0"
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
    >
        {#each options as link}
            <li>
                <a href={link.href} target="_blank">{link.title} </a>
            </li>
        {/each}
    </ul>
</div>
