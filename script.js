document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       HERO
       ========================================================= */

    const hero = document.querySelector(".hero");
    const letters = document.querySelectorAll(".hero-logo .letter");
    const tagline = document.querySelector(".hero-tagline");
    const scrollIndicator = document.querySelector(".scroll-indicator");
    const navbar = document.querySelector(".navbar");
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


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

        if (prefersReducedMotion) {

            letters.forEach((letter) => {
                letter.style.opacity = "1";
                letter.style.transform = "none";
                letter.style.filter = "none";
            });

            tagline.style.opacity = "1";
            scrollIndicator.style.opacity = "0.5";
            navbar.style.opacity = "1";

            return;

        }

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

            const isOpen = menuToggle.classList.toggle("active");

            mobileMenu.classList.toggle("active", isOpen);
            mobileMenu.setAttribute("aria-hidden", String(!isOpen));
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );
            document.body.classList.toggle("menu-open", isOpen);

        });


        mobileLinks.forEach((link) => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");

                mobileMenu.classList.remove("active");
                mobileMenu.setAttribute("aria-hidden", "true");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open menu");
                document.body.classList.remove("menu-open");

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

    const reservationSuccess =
        document.querySelector("#reservation-success");

    const reservationDone =
        document.querySelector("#reservation-done");

    const guestName = document.querySelector("#guest-name");
    const guestDate = document.querySelector("#guest-date");
    const guestTime = document.querySelector("#guest-time");
    const guestCount = document.querySelector("#guest-count");
    const confirmationName =
        document.querySelector("#reservation-guest-name");
    const confirmationDetails =
        document.querySelector("#reservation-details");

    let lastFocusedElement = null;

    if (guestDate) {

        guestDate.min = new Date().toISOString().split("T")[0];

    }


    function openReservation() {

        if (!reservationModal) return;

        lastFocusedElement = document.activeElement;

        reservationForm.hidden = false;
        reservationSuccess.hidden = true;
        reservationModal.classList.add("active");
        reservationModal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        window.setTimeout(() => guestName?.focus(), 100);

    }


    function closeReservation() {

        if (!reservationModal) return;

        reservationModal.classList.remove("active");
        reservationModal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        lastFocusedElement?.focus();

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

            if (
                event.key === "Tab" &&
                reservationModal?.classList.contains("active")
            ) {

                const focusable = reservationModal.querySelectorAll(
                    "button:not([hidden]), input:not([hidden]), select:not([hidden])"
                );
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (event.shiftKey && document.activeElement === first) {

                    event.preventDefault();
                    last.focus();

                } else if (!event.shiftKey && document.activeElement === last) {

                    event.preventDefault();
                    first.focus();

                }

            }

        }
    );


    if (reservationForm) {

        reservationForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                const date = new Intl.DateTimeFormat("en-NG", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }).format(new Date(`${guestDate.value}T12:00:00`));

                confirmationName.textContent = guestName.value.trim();
                confirmationDetails.textContent =
                    `${guestCount.value} guest${guestCount.value === "1" ? "" : "s"} on ${date} at ${guestTime.value}`;

                reservationForm.hidden = true;
                reservationSuccess.hidden = false;
                reservationDone.focus();

            }
        );

    }


    reservationDone?.addEventListener("click", () => {

        reservationForm.reset();
        closeReservation();

    });
});

