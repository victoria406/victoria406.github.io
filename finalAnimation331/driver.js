document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(MotionPathPlugin);


    gsap.from("#logo", { y: -50, opacity: 0, duration: 1 });

    
    gsap.from("input", { scale: 0, duration: 0.5, delay: 1, stagger: 0.2 });


    gsap.from("button", { y: 50, opacity: 0, duration: 0.5, delay: 2 });

    document.getElementById("login-button").addEventListener("click", () => {
        document.getElementById("login-container").classList.add("hidden");
    
        const loadingScreen = document.getElementById("loading-screen");
        loadingScreen.classList.remove("hidden");
    });    
        gsap.to("#locust", {
            motionPath: {
                path: [{ x: 100, y: 50 }, { x: 50, y: 100 }, { x: 0, y: 50 }, { x: 50, y: 0 }, { x: 100, y: 50 }],
                curviness: 1,
                autoRotate: true
            },
            duration: 3,
            repeat: -1
        });
    });

    // Animate the loading message
    gsap.fromTo("#loading-message", { opacity: 0 }, { opacity: 1, duration: 1, repeat: -1, yoyo: true });