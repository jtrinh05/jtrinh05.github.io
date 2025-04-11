let popup = document.querySelector(".module_cell"); // Target the module_cell

function openPopup() {
    popup.classList.add("open-popup");
}

function closePopup() {
    popup.classList.remove("open-popup");
}

const imageUpload = document.getElementById("imageUpload");
const imageCanvas = document.getElementById("imageCanvas");
const hexInput = document.getElementById("hexInput");
const colorDisplays = [
    document.getElementById("colorDisplay1"),
    document.getElementById("colorDisplay2"),
    document.getElementById("colorDisplay3"),
    document.getElementById("colorDisplay4"),
    document.getElementById("colorDisplay5"),
];
const ctx = imageCanvas.getContext("2d");
const pickedColors = [];
let selectedColorIndex = -1; // Store the index of the selected color display

// Add click event listeners to color display divs
colorDisplays.forEach((display, index) => {
    display.addEventListener("click", () => {
        selectedColorIndex = index;
    });
});

imageUpload.addEventListener("change", (e) => {
    // ... (image upload logic remains the same) ...
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        const image = new Image();
        image.onload = () => {
            imageCanvas.width = image.width;
            imageCanvas.height = image.height;
            ctx.drawImage(image, 0, 0);
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
hexInput.value = hex;

if (selectedColorIndex !== -1) {
    // Update the selected color display
    pickedColors[selectedColorIndex] = hex;
    colorDisplays[selectedColorIndex].style.backgroundColor = hex;
    selectedColorIndex = -1; // Reset the index
} else if (pickedColors.length < 5) {
    // Add a new color
    pickedColors.push(hex);
    colorDisplays[pickedColors.length - 1].style.backgroundColor = hex;
}
});

hexInput.addEventListener("input", () => {
    const hex = hexInput.value;
    if (/^#([0-9A-Fa-f]{3}){1,2}$/.test(hex)) {
        if (pickedColors.length>0){
            colorDisplays[0].style.backgroundColor = hex;
        }
    }
});

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}