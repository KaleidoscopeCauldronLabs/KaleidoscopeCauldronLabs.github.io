import { mountEl, div, text } from "./dom.js";
import { palette } from "./constants.js";

function loadImage(src) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

const imageCount = 16;
const imagePromises = Promise.all(
    Array(imageCount)
        .fill(null)
        .map((_x, i) => loadImage(`images/${(imageCount - (i + 1)).toString().padStart(3, "0")}.png`))
);

const components = [
    { label: "Bow Center", layers: [0], colorKey: "Red" },
    { label: "Bow", layers: [1], colorKey: "White" },
    { label: "Leaves", layers: [2], colorKey: "Green" },
    { label: "Bricks", layers: [3, 12], colorKey: "Black" },
    { label: "Candy Stripes", layers: [4], colorKey: "Green" },
    { label: "Candy Base", layers: [5], colorKey: "White" },
    { label: "Snow", layers: [6], colorKey: "White" },
    { label: "Mug", layers: [7, 15], colorKey: "Red" },
    { label: "Doorknob", layers: [8], colorKey: "White" },
    { label: "Door", layers: [9], colorKey: "Green" },
    { label: "Window Frames", layers: [10], colorKey: "White" },
    { label: "Window Panes", layers: [11], colorKey: "Light Blue" },
    { label: "Marshmallows", layers: [13], colorKey: "White" },
    { label: "Cocoa", layers: [14], colorKey: "Brown" },
];

const layerToComponent = {}
for (let i = 0; i < components.length; i++) {
    const component = components[i];
    for (const layer of component.layers) {
        layerToComponent[layer] = i;
    }
}

function drawCompositeImage(ctx, images) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 1280, 1024);
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const component = components[layerToComponent[imageCount - (i + 1)]];
        drawTinted(ctx, image, palette[component.colorKey]);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const images = await imagePromises;
    const canvas = document.getElementById("main-canvas");
    setCanvasSize(canvas, 1280, 1024);
    const ctx = canvas.getContext("2d");

    drawCompositeImage(ctx, images);

    const componentListEl = document.getElementById("layer-list");
    const componentToEl = new Map();
    const elToComponent = new Map();
    const componentEls = components.map(component => {
        const el = div({ class: "list-item" }, [
            div({
                class: "color-icon",
                style: `background: ${palette[component.colorKey]}`,
            }, []),
            text(component.label),
        ])
        componentToEl.set(component, el);
        elToComponent.set(el, component);
        return el;
    });
    mountEl(componentListEl, componentEls);

    const paletteEl = document.getElementById("color-palette");
    const colorKeyToEl = new Map();
    const elToColorKey = new Map();
    const paletteColorEls = Object.entries(palette).map(([key, color]) => {
        const el = div({ class: "palette-color" }, [
            div({ class: "color-icon", style: `background: ${color}` }, [])
        ])
        colorKeyToEl.set(key, el);
        elToColorKey.set(el, key);
        return el;
    });
    mountEl(paletteEl, paletteColorEls);

    let selectedComponent = null;
    function updateSelectedComponent(component) {
        selectedComponent = component;
        const el = componentToEl.get(component);
        for (const componentEl of componentEls) {
            componentEl.classList.remove("selected");
        }
        el.classList.add("selected");
    }

    function updateSelectedColor(key) {
        const el = colorKeyToEl.get(key);
        for (const paletteColorEl of paletteColorEls) {
            paletteColorEl.classList.remove("selected");
        }
        el.classList.add("selected");
    }

    for (let i = 0; i < componentEls.length; i++) {
        const componentEl = componentEls[i];
        componentEl.addEventListener("click", () => {
            const component = components[i];
            updateSelectedComponent(component);
            updateSelectedColor(component.colorKey);
        });
    }

    for (let i = 0; i < paletteColorEls.length; i++) {
        const paletteColorEl = paletteColorEls[i];
        paletteColorEl.addEventListener("click", () => {
            const colorKey = elToColorKey.get(paletteColorEl);
            selectedComponent.colorKey = colorKey;
            const componentEl = componentToEl
                .get(selectedComponent)
                .getElementsByClassName("color-icon")[0]
                .style = `background: ${palette[colorKey]}`;
            console.log(componentEl)
            updateSelectedColor(colorKey);
            drawCompositeImage(ctx, images);
        });
    }
});

function setCanvasSize(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${width / 2}px`;
    canvas.style.height = `${height / 2}px`;
}

function drawTinted(ctx, image, color) {
    const tempCanvas = document.createElement("canvas");
    setCanvasSize(tempCanvas, 1280, 1024);
    const tempCtx = tempCanvas.getContext("2d");

    // Create a flat-colored stencil of the input image
    tempCtx.drawImage(image, 0, 0);
    tempCtx.globalCompositeOperation = "source-atop";
    tempCtx.fillStyle = color;
    tempCtx.fillRect(0, 0, 1280, 1024);

    // Shade the stencil
    // TODO: for some reason, this causes the alpha to be lost around the edges?
    tempCtx.globalCompositeOperation = "multiply";
    tempCtx.drawImage(image, 0, 0);

    // Draw it onto the output
    ctx.drawImage(tempCanvas, 0, 0);
}