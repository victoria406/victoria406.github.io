document.addEventListener("DOMContentLoaded", () => {
    const mainShape = document.getElementById("main-shape");
    const shapeOptions = document.querySelectorAll(".shape-option");

    let currentAnimation; // Keep track of the current animation
    let currentShape = "circle"; // Default shape

    // Map of shape colors
    const shapeColors = {
        circle: "#ff9999", // Light red
        star: "#99ff99",   // Light green
        square: "#9999ff", // Light blue
        triangle: "#ffcc99", // Light orange
        diamond: "#99ccff"  // Light cyan
    };

    let currentShapeColor = shapeColors.circle; // Default color

    // Change the main shape's appearance based on the selected shape
    shapeOptions.forEach(option => {
        option.addEventListener("click", () => {
            const shape = option.getAttribute("data-shape");
            currentShapeColor = shapeColors[shape]; // Update the current shape color
            applyShape(shape);
        });
    });

    // Apply the selected shape and color to the main shape
    function applyShape(shape) {
        // Cancel any running animation to prevent interference
        if (currentAnimation) {
            currentAnimation.cancel();
        }

        // Update the current shape
        currentShape = shape;

        // Reset boxShadow to ensure a clean state
        mainShape.style.boxShadow = `0 0 0 0 transparent`;

        // Change the clip-path and background color based on the selected shape
        mainShape.style.backgroundColor = currentShapeColor || "#ff6347"; // Default to tomato red
        switch (shape) {
            case "circle":
                mainShape.style.clipPath = "circle()";
                break;
            case "star":
                mainShape.style.clipPath =
                    "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
                break;
            case "square":
                mainShape.style.clipPath = "inset(0)"; // Correct square clip-path
                break;
            case "triangle":
                mainShape.style.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)";
                break;
            case "diamond":
                mainShape.style.clipPath =
                    "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";
                break;
            default:
                console.error("Unknown shape:", shape);
        }
    }


    // Add click event listeners to all animation tiles
    document.querySelectorAll(".box").forEach((box, index) => {
        box.addEventListener("click", () => {
            // Cancel the current animation, if any
            if (currentAnimation) {
                currentAnimation.cancel();
            }

            // Start the new animation
            currentAnimation = addAnimation(mainShape, index + 1);
        });
    });

    function getClipPath(shape) {
        switch (shape) {
            case "circle":
                return "circle()";
            case "star":
                return "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
            case "square":
                return "inset(0)";
            case "triangle":
                return "polygon(50% 0%, 0% 100%, 100% 100%)";
            case "diamond":
                return "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";
            default:
                console.error("Unknown shape:", shape);
                return "circle()"; // Fallback
        }
    }

    // Function to apply animations to the main shape
    function addAnimation(shape, animationId) {
        switch (animationId) {
            case 1: // Scale and Rotate
                return shape.animate(
                    [
                        { transform: "scale(1) rotate(0deg)" },
                        { transform: "scale(1.5) rotate(360deg)" },
                        { transform: "scale(1) rotate(0deg)" }
                    ],
                    { duration: 3000, iterations: Infinity }
                );

            case 2: // Pulsing Color
                return shape.animate(
                    [
                        { backgroundColor: currentShapeColor },
                        { backgroundColor: "#ff4500" }, // Slightly darker version of the original color
                        { backgroundColor: currentShapeColor }
                    ],
                    { duration: 2000, iterations: Infinity }
                );

            case 3: // Bounce
                return shape.animate(
                    [
                        { transform: "translateY(0)" },
                        { transform: "translateY(-30px)" },
                        { transform: "translateY(0)" }
                    ],
                    { duration: 1000, iterations: Infinity, easing: "ease-in-out" }
                );

            case 4: // Wobble
                return shape.animate(
                    [
                        { transform: "rotate(0deg)" },
                        { transform: "rotate(-20deg)" },
                        { transform: "rotate(20deg)" },
                        { transform: "rotate(0deg)" }
                    ],
                    { duration: 1500, iterations: Infinity }
                );

            case 5: // Expanding Border
                return shape.animate(
                    [
                        { borderWidth: "5px", borderColor: currentShapeColor }, // Initial border
                        { borderWidth: "15px", borderColor: "rgba(0, 0, 0, 0.3)" }, // Expanded border
                        { borderWidth: "5px", borderColor: currentShapeColor } // Return to initial border
                    ],
                    {
                        duration: 2500,
                        iterations: Infinity,
                        easing: "ease-in-out"
                    }
                );


            case 6: // Circular Motion
                return shape.animate(
                    [
                        { transform: "translate(0, 0)" },
                        { transform: "translate(50px, 0)" },
                        { transform: "translate(50px, 50px)" },
                        { transform: "translate(0, 50px)" },
                        { transform: "translate(0, 0)" }
                    ],
                    { duration: 4000, iterations: Infinity }
                );

            case 7: // Fade In and Out (More Drastic)
                return shape.animate(
                    [
                        { opacity: 1 },
                        { opacity: 0.2, backgroundColor: currentShapeColor }, // Drastic fade with color
                        { opacity: 1 }
                    ],
                    { duration: 3000, iterations: Infinity, easing: "ease-in-out" }
                );

            case 8: // Skew and Shake
                return shape.animate(
                    [
                        { transform: "skewX(0deg)" },
                        { transform: "skewX(30deg)" },
                        { transform: "skewX(-30deg)" },
                        { transform: "skewX(0deg)" }
                    ],
                    { duration: 2000, iterations: Infinity }
                );

            case 9: // Zig-Zag Movement
                return shape.animate(
                    [
                        { transform: "translate(0, 0)" },
                        { transform: "translate(-50px, 50px)" },
                        { transform: "translate(50px, -50px)" },
                        { transform: "translate(0, 0)" }
                    ],
                    { duration: 2000, iterations: Infinity }
                );

            default:
                console.error("Unknown animation ID:", animationId);
        }
    }
});
