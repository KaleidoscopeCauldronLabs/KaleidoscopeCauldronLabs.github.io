// Number of images in `./images` - will be one higher than the highest number
// in the folder
export const imageCount = 13;

// Must be one of the `presets` entries.
export const defaultPreset = "Silver Bell";

// Entries can be in any order and will determine the order in the app.
// `layers` is a list of each image layer that should change color together -
// the numbers match those in `./images`.
export const components = [
    { label: "Bell", layers: [11] },
    { label: "Bell Bow", layers: [2] },
    { label: "Wreath Bow", layers: [9] },
    { label: "Wreath Bow Center", layers: [8] },
    { label: "Frames", layers: [7] },
    { label: "Window Bars and Door", layers: [5] },
    { label: "Doorknob", layers: [4] },
    { label: "Glass", layers: [6] },
    { label: "Ladder", layers: [1] },
    { label: "Street Light", layers: [0] },
    { label: "Hook", layers: [3] },
    { label: "Foliage", layers: [10] },
    { label: "Snow", layers: [12] },
];

// Preset keys can be named anything.
// Components must match the `component` labels.
// Colors must match `palette` color names in `/constants.js`.
export const presets = {
    "Silver Bell": {
        "Bell": "Metallic Silver",
        "Bell Bow": "Green",
        "Wreath Bow":  "Red",
        "Wreath Bow Center": "White",
        "Frames": "White",
        "Window Bars and Door": "Red",
        "Doorknob": "White",
        "Glass": "Clear",
        "Ladder": "Dirt Brown",
        "Street Light": "Black",
        "Hook": "Metallic Silver",
        "Foliage": "Green",
        "Snow": "White",
    },
    "Gold Bell": {
        "Bell": "Metallic Gold",
        "Bell Bow": "Red",
        "Wreath Bow":  "Red",
        "Wreath Bow Center": "White",
        "Frames": "White",
        "Window Bars and Door": "Green",
        "Doorknob": "White",
        "Glass": "Clear",
        "Ladder": "Dirt Brown",
        "Street Light": "Black",
        "Hook": "Metallic Silver",
        "Foliage": "Green",
        "Snow": "White",
    },
};