// Number of images in `./images` - will be one higher than the highest number
// in the folder
export const imageCount = 16;

// Must be one of the `presets` entries.
export const defaultPreset = "Red Mug";

// Entries can be in any order and will determine the order in the app.
// `layers` is a list of each image layer that should change color together -
// the numbers match those in `./images`.
export const components = [
    { label: "Mug", layers: [13] },
    { label: "Bricks", layers: [14, 12] },
    { label: "Frames & Doorknob", layers: [7, 6] },
    { label: "Door", layers: [8] },
    { label: "Leaves", layers: [5, 2] },
    { label: "Bow", layers: [1] },
    { label: "Bow Center", layers: [0] },
    { label: "Candy Base", layers: [4] },
    { label: "Candy Stripes", layers: [3] },
    { label: "Glass", layers: [9] },
    { label: "Marshmallows", layers: [10] },
    { label: "Cocoa", layers: [11] },
    { label: "Snow", layers: [15] },
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
        "Frames & Doorknob": "White",
        "Door": "Green",
        "Glass": "Clear",
        "Marshmallows": "White",
        "Cocoa": "Chocolate",
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
        "Frames & Doorknob": "White",
        "Door": "Red",
        "Glass": "Clear",
        "Marshmallows": "White",
        "Cocoa": "Chocolate",
    },
};