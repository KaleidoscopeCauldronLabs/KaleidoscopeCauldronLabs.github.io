// Number of images in `./images` - will be one higher than the highest number
// in the folder
export const imageCount = 16;

// Must be one of the `presets` entries.
export const defaultPreset = "Red Mug";

// Entries can be in any order and will determine the order in the app.
// `layers` is a list of each image layer that should change color together -
// the numbers match those in `./images`.
export const components = [
    { label: "Bow Center", layers: [0] },
    { label: "Bow", layers: [1] },
    { label: "Leaves", layers: [2] },
    { label: "Bricks", layers: [3, 12] },
    { label: "Candy Stripes", layers: [4] },
    { label: "Candy Base", layers: [5] },
    { label: "Snow", layers: [6] },
    { label: "Mug", layers: [7, 15] },
    { label: "Doorknob", layers: [8] },
    { label: "Door", layers: [9] },
    { label: "Window Frames", layers: [10] },
    { label: "Window Panes", layers: [11] },
    { label: "Marshmallows", layers: [13] },
    { label: "Cocoa", layers: [14] },
];

// Preset keys can be named anything.
// Components must match the `component` labels.
// Colors must match `palette` color names in `/constants.js`.
export const presets = {
    "Red Mug": {
        "Bow Center": "Red",
        "Bow": "White",
        "Leaves":  "Green",
        "Bricks": "Black",
        "Candy Stripes": "Green",
        "Candy Base": "White",
        "Snow": "White",
        "Mug": "Red",
        "Doorknob": "White",
        "Door": "Green",
        "Window Frames": "White",
        "Window Panes": "Light Blue",
        "Marshmallows": "White",
        "Cocoa": "Brown",
    },
    "Green Mug": {
        "Bow Center": "White",
        "Bow": "Red",
        "Leaves":  "Spruce",
        "Bricks": "Black",
        "Candy Stripes": "Red",
        "Candy Base": "White",
        "Snow": "White",
        "Mug": "Green",
        "Doorknob": "White",
        "Door": "Red",
        "Window Frames": "White",
        "Window Panes": "Light Blue",
        "Marshmallows": "White",
        "Cocoa": "Brown",
    },
};