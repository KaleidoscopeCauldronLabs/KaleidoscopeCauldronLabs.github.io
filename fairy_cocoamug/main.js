import { mountEl, createEl, div, text } from "/dom.js";
import { drawCompositeImage } from "/graphics.js"
import { palette } from "/constants.js";
import { imageCount, defaultPreset, components, presets } from "./custom.js"

function loadImage(src) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

const imagePromises = Promise.all(
    Array(imageCount)
        .fill(null)
        .map((_x, i) => loadImage(`images/${(imageCount - (i + 1)).toString().padStart(3, "0")}.png`))
);

function applyPreset(presetKey) {
    const preset = presets[presetKey];
    for (const component of components) {
        component.colorKey = preset[component.label];
    }
}

function componentsToString(components) {
    const outputLines = [];
    for (const component of components) {
        outputLines.push(`${component.label} - ${component.colorKey}`);
    }
    return outputLines.join("\n");
}

const layerToComponent = {}
for (let i = 0; i < components.length; i++) {
    const component = components[i];
    for (const layer of component.layers) {
        layerToComponent[layer] = i;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const copyCodeButton = document.getElementById("copy-code");
    copyCodeButton.addEventListener("click", () => {
        navigator.clipboard.writeText(componentsToString(components));
    });

    const images = await imagePromises;
    const canvas = document.getElementById("main-canvas");
    setCanvasSize(canvas, images[0].width, images[0].height);
    const ctx = canvas.getContext("2d");

    applyPreset(defaultPreset);

    function indexToColor(index) {
        const component = components[layerToComponent[images.length - (index + 1)]];
        return palette[component.colorKey];
    }

    drawCompositeImage(ctx, images, indexToColor);

    const componentListEl = document.getElementById("layer-list");
    const componentToEl = new Map();
    const elToComponent = new Map();
    const componentEls = components.map(component => {
        const el = div({ class: "list-item", title: component.colorKey }, [
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
        const el = div({ class: "palette-color", title: key }, [
            div({ class: "color-icon", style: `background: ${color}` }, [])
        ])
        colorKeyToEl.set(key, el);
        elToColorKey.set(el, key);
        return el;
    });
    mountEl(paletteEl, paletteColorEls);

    function setComponentColor(component, colorKey) {
        const el = componentToEl
            .get(component)
            .getElementsByClassName("color-icon")[0];
        el.style = `background: ${palette[colorKey]}`;
        el.parentNode.setAttribute("title", colorKey);
    }

    const presetOptionEls = Object.keys(presets).map(presetKey => (
        createEl("option", {}, [text(presetKey)])
    ));
    const presetSelectorEl = document.getElementById("preset-selector");
    presetSelectorEl.addEventListener("change", e => {
        const presetKey = e.target.value;
        const preset = presets[presetKey];
        for (const component of components) {
            setComponentColor(component, preset[component.label]);
        }
        applyPreset(presetKey);
        drawCompositeImage(ctx, images, indexToColor);
    });
    mountEl(presetSelectorEl, presetOptionEls);

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

    const colorNameEl = document.getElementById("selected-color");

    for (let i = 0; i < componentEls.length; i++) {
        const componentEl = componentEls[i];
        componentEl.addEventListener("click", () => {
            const component = components[i];
            colorNameEl.innerText = `Color Palette - ${component.colorKey}`;
            updateSelectedComponent(component);
            updateSelectedColor(component.colorKey);
        });
    }

    for (let i = 0; i < paletteColorEls.length; i++) {
        const paletteColorEl = paletteColorEls[i];
        paletteColorEl.addEventListener("click", () => {
            const colorKey = elToColorKey.get(paletteColorEl);
            colorNameEl.innerText = `Color Palette - ${colorKey}`;
            selectedComponent.colorKey = colorKey;
            setComponentColor(selectedComponent, colorKey);
            updateSelectedColor(colorKey);
            drawCompositeImage(ctx, images, indexToColor);
        });
    }
});

function setCanvasSize(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${width / 2}px`;
    canvas.style.height = `${height / 2}px`;
}