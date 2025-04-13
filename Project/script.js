let popup = document.querySelector(".module_cell"); // Target the module_cell

function openPopup() {
    popup.classList.add("open-popup");
}

function closePopup() {
    popup.classList.remove("open-popup");
}

function nextPopup() {
    const popupColorDisplays = document.querySelectorAll(".popup .colorDisplayPopup");
    const mainColorDisplays = document.querySelectorAll(".pickerColors .colorDisplay");

    popupColorDisplays.forEach((popupDisplay, index) => {
        if (mainColorDisplays[index]) {
            const backgroundColor = popupDisplay.style.backgroundColor;
            mainColorDisplays[index].style.backgroundColor = backgroundColor;

            // Optionally, you can also update the hex input values if needed
            const hexInput = mainColorDisplays[index].querySelector(".hexInput");
            if (hexInput) {
                hexInput.value = backgroundColor;
            }
        }
    });
    closePopup(); // Close the popup after transferring colors
}

const imageUpload = document.getElementById("imageUpload");
const imageCanvas = document.getElementById("imageCanvas");
const hexInputs = Array.from(document.querySelectorAll(".pickerColors .hexInput"));
const colorDisplays = Array.from(document.querySelectorAll(".pickerColors .colorDisplay"));
const ctx = imageCanvas.getContext("2d");
const pickedColors = ["", "", "", "", ""]; // Initialize an array to store picked colors
let selectedColorIndex = -1; // Store the index of the clicked color display
const popupElement = document.querySelector(".popup"); // Get the popup element

// Add click event listeners to color display divs in the popup
const popupColorDisplayElements = document.querySelectorAll(".popup .colorDisplayPopup");
popupColorDisplayElements.forEach((display, index) => {
    display.addEventListener("click", () => {
        selectedColorIndex = index; // Store the index of the clicked popup color display
    });
});

imageUpload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        const image = new Image();
        image.onload = () => {
            // Get the current width and height of the popup
            const popupWidth = popupElement.offsetWidth;
            const popupHeight = popupElement.offsetHeight;
            const imageWidth = image.naturalWidth;
            const imageHeight = image.naturalHeight;

            let newWidth = imageWidth;
            let newHeight = imageHeight;

            // Check if the image needs to be resized
            if (imageWidth > popupWidth || imageHeight > popupHeight) {
                const aspectRatio = imageWidth / imageHeight;

                if (imageWidth / popupWidth > imageHeight / popupHeight) {
                    newWidth = popupWidth * 0.9; // Leave some padding
                    newHeight = newWidth / aspectRatio;
                } else {
                    newHeight = popupHeight * 0.6; // Leave some padding
                    newWidth = newHeight * aspectRatio;
                }
            }

            imageCanvas.width = newWidth;
            imageCanvas.height = newHeight;
            ctx.drawImage(image, 0, 0, newWidth, newHeight);
        };
        image.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

imageCanvas.addEventListener("click", (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);

    const popupColorDisplays = document.querySelectorAll(".popup .colorDisplayPopup");

    if (selectedColorIndex !== -1 && popupColorDisplays[selectedColorIndex]) {
        // Update the selected color display in the popup
        popupColorDisplays[selectedColorIndex].style.backgroundColor = hex;
        selectedColorIndex = -1; // Reset the index
    } else if (Array.from(popupColorDisplays).some(display => !display.style.backgroundColor)) {
        // If no color display is selected, fill the first empty one in the popup
        const firstEmptyIndex = Array.from(popupColorDisplays).findIndex(display => !display.style.backgroundColor);
        if (firstEmptyIndex !== -1) {
            popupColorDisplays[firstEmptyIndex].style.backgroundColor = hex;
        }
    }
});

// Add input event listeners to each hex input outside the popup
hexInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
        const hex = input.value;
        if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(hex)) {
            colorDisplays[index].style.backgroundColor = hex;
            // Optionally, you could update a corresponding 'pickedColors' array here if you maintain one for the main pickers.
        }
    });
});

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}