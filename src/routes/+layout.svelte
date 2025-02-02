<script>
    import BottomNavbar from "$lib/components/bottom-navbar.svelte";

    import Navbar from "$lib/components/navbar.svelte";
</script>

<Navbar></Navbar>

<slot></slot>

<BottomNavbar></BottomNavbar>
