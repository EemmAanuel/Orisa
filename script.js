document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       HERO
       ========================================================= */

    const hero = document.querySelector(".hero");
    const letters = document.querySelectorAll(".hero-logo .letter");
    const tagline = document.querySelector(".hero-tagline");
    const scrollIndicator = document.querySelector(".scroll-indicator");
    const navbar = document.querySelector(".navbar");


    let animationRunning = false;


    function resetHero() {

        letters.forEach((letter) => {

            letter.style.transition = "none";

            letter.style.opacity = "0";

            letter.style.transform =
                "translateY(120px) scale(0.96)";

            letter.style.filter = "blur(12px)";

        });


        tagline.style.transition = "none";
        tagline.style.opacity = "0";


        scrollIndicator.style.transition = "none";
        scrollIndicator.style.opacity = "0";


        navbar.style.transition = "none";
        navbar.style.opacity = "0";

    }


    function playHeroAnimation() {

        if (animationRunning) return;

        animationRunning = true;

        resetHero();


        /* -----------------------------------------
           LETTERS
           ----------------------------------------- */

        letters.forEach((letter, index) => {

            setTimeout(() => {

                letter.style.transition = `
                    opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1),
                    transform 1.4s cubic-bezier(0.16, 1, 0.3, 1),
                    filter 1.2s ease
                `;

                letter.style.opacity = "1";

                letter.style.transform =
                    "translateY(0) scale(1)";

                letter.style.filter = "blur(0)";

            }, 700 + index * 550);

        });


        /* -----------------------------------------
           TAGLINE
           ----------------------------------------- */

        setTimeout(() => {

            tagline.style.transition = `
                opacity 1.5s ease,
                transform 1.5s ease
            `;

            tagline.style.opacity = "1";

        }, 3900);


        /* -----------------------------------------
           NAVIGATION
           ----------------------------------------- */

        setTimeout(() => {

            navbar.style.transition =
                "opacity 1.2s ease";

            navbar.style.opacity = "1";

        }, 4500);


        /* -----------------------------------------
           SCROLL INDICATOR
           ----------------------------------------- */

        setTimeout(() => {

            scrollIndicator.style.transition =
                "opacity 1.2s ease";

            scrollIndicator.style.opacity = "0.5";

        }, 5000);


        /* -----------------------------------------
           ALLOW ANIMATION TO RUN AGAIN
           ----------------------------------------- */

        setTimeout(() => {

            animationRunning = false;

        }, 6000);

    }


    /* -----------------------------------------
       HERO OBSERVER
       ----------------------------------------- */

    const heroObserver = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    playHeroAnimation();

                } else {

                    animationRunning = false;

                }

            });

        },

        {
            threshold: 0.5
        }

    );


    if (hero) {

        heroObserver.observe(hero);

    }


    /* -----------------------------------------
       PLAY HERO ON LOAD
       ----------------------------------------- */

    playHeroAnimation();



    /* =========================================================
       MOBILE MENU
       ========================================================= */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mobileMenu =
        document.querySelector(".mobile-menu");

    const mobileLinks =
        document.querySelectorAll(".mobile-menu a");


    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");

            mobileMenu.classList.toggle("active");

        });


        mobileLinks.forEach((link) => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");

                mobileMenu.classList.remove("active");

            });

        });

    }



    /* =========================================================
       MENU CARD REVEAL
       ========================================================= */

    const menuItems =
        document.querySelectorAll(".menu-item");


    if (menuItems.length) {

        menuItems.forEach((item) => {

            item.style.opacity = "0";

            item.style.transform =
                "translateY(50px)";

            item.style.transition = `
                opacity 1s ease,
                transform 1s cubic-bezier(
                    0.16,
                    1,
                    0.3,
                    1
                )
            `;

        });


        const menuObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        const item = entry.target;


                        item.style.opacity = "1";

                        item.style.transform =
                            "translateY(0)";


                        observer.unobserve(item);

                    });

                },

                {
                    threshold: 0.15
                }

            );


        menuItems.forEach((item) => {

            menuObserver.observe(item);

        });

    }



    /* =========================================================
       REDUCED MOTION
       ========================================================= */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (prefersReducedMotion) {

        menuItems.forEach((item) => {

            item.style.opacity = "1";

            item.style.transform =
                "translateY(0)";

            item.style.transition = "none";

        });

    }
    /* =========================================================
       RESERVATION MODAL
       ========================================================= */

    const reservationButton =
        document.querySelector("#reservation-button");

    const reservationModal =
        document.querySelector("#reservation-modal");

    const reservationClose =
        document.querySelector("#reservation-close");

    const reservationForm =
        document.querySelector("#reservation-form");


    function openReservation() {

        if (!reservationModal) return;

        reservationModal.classList.add("active");

        document.body.style.overflow = "hidden";

    }


    function closeReservation() {

        if (!reservationModal) return;

        reservationModal.classList.remove("active");

        document.body.style.overflow = "";

    }


    if (reservationButton) {

        reservationButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                openReservation();

            }
        );

    }


    if (reservationClose) {

        reservationClose.addEventListener(
            "click",
            closeReservation
        );

    }


    if (reservationModal) {

        reservationModal.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === reservationModal
                ) {

                    closeReservation();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeReservation();

            }

        }
    );


    if (reservationForm) {

        reservationForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                alert(
                    "Thank you. Your reservation request has been received."
                );

                reservationForm.reset();

                closeReservation();

            }
        );

    }
});