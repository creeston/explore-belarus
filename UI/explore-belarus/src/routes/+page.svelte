<script lang="ts">
    import "../app.css";
    // import titleImage from "$lib/images/title-image-2.png";
</script>

<div class="flex p-3 navigation">
    <div class="basis-1/5 flex">
        <div class="flex-auto flex items-center justify-center">
            <span>Places</span>
        </div>
        <div class="flex-auto flex items-center justify-center">
            <span>Sights</span>
        </div>
    </div>

    <div class="flex-auto flex items-center justify-center w-60">
        <h4 class="title">Explore Belarus ⛺</h4>
    </div>

    <div class="basis-1/5 flex">
        <div class="flex-auto flex items-center justify-center">About</div>
        <div class="flex-auto flex items-center justify-center">Contact Us</div>
    </div>
</div>

<!-- <div class="hero min-h-96" style="background-image: url(/title-image-2.png);">
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
            <h1 class="mb-5 text-5xl font-bold">Hello there</h1>
            <p class="mb-5">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
            </p>
            <button class="btn btn-primary">Get Started</button>
        </div>
    </div>
</div> -->

<!-- <div class="container">
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid">
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Places</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Sights</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">About Us</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</div>
<div id="hero">
    <div class="overlay"></div>

    <div class="title">
        <div class="text-center text-white title-text">
            <h1>Explore Belarus</h1>
            <p class="lead">Find a new place to visit</p>
        </div>
    </div>
</div>
<a href="/places/1">Novogrudok</a> -->

<style lang="scss">
    .title {
        font-weight: bold;
        font-size: 2rem;
    }

    .navigation {
        background-color: rgb(43, 77, 109);
        color: white;
    }
    // .navbar-container {
    //     z-index: 5;
    //     position: relative;
    // }
    // .title {
    //     z-index: 4;
    //     -webkit-user-select: none; /* Safari */
    //     -ms-user-select: none; /* IE 10 and IE 11 */
    //     user-select: none; /* Standard syntax */
    //     position: relative;
    // }

    // .title-text {
    //     h1 {
    //         font-size: 8rem;
    //     }
    //     color: #fff;
    // }
    // /* Custom CSS */
    // .overlay {
    //     background: linear-gradient(
    //         0deg,
    //         rgba(0, 0, 0, 0.7),
    //         rgba(255, 255, 255, 0.3)
    //     );
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     height: 100%;
    //     width: 100%;
    // }
    // #hero {
    //     background-image: url("/title-image-2.png");
    //     background-size: cover;
    //     background-position: center;
    //     position: relative;
    //     height: 50vh; /* Changed from 100vh to 50vh */
    // }
    // .navbar-brand {
    //     font-size: 2rem;
    //     color: #a65725;
    //     font-weight: bold;
    // }

    // .nav-link {
    //     color: #a65725;
    // }
    // @media (max-width: 768px) {
    //     #hero {
    //         background-attachment: fixed;
    //     }
    // }
</style>
