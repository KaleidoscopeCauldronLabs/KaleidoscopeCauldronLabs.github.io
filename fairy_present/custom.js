// Number of images in `./images` - will be one higher than the highest number
// in the folder
export const imageCount = 13;

// Must be one of the `presets` entries.
export const defaultPreset = "Green Present";

// Entries can be in any order and will determine the order in the app.
// `layers` is a list of each image layer that should change color together -
// the numbers match those in `./images`.
export const components = [
    { label: "Present Box", layers: [10] },
    { label: "Ribbon & Bow", layers: [8, 9] },
    { label: "Wood", layers: [0] },
    { label: "Chimney", layers: [11] },
    { label: "Frames & Doorknob", layers: [5, 4] },
    { label: "Door", layers: [6] },
    { label: "Glass", layers: [7] },
    { label: "Tag", layers: [3] },
    { label: "Tag Words", layers: [2] },
    { label: "Trees", layers: [1] },
    { label: "Snow", layers: [12] },
];

// Preset keys can be named anything.
// Components must match the `component` labels.
// Colors must match `palette` color names in `/constants.js`.
export const presets = {
    "Green Present": {
        "Present Box": "Green",
        "Ribbon & Bow": "Red",
        "Wood": "Dirt Brown",
        "Chimney": "Metallic Silver",
        "Frames & Doorknob": "White",
        "Door": "Red",
        "Glass": "Clear",
        "Tag": "White",
        "Tag Words": "Black",
        "Trees": "Spruce",
        "Snow": "White",
    },
    "Red Present": {
        "Present Box": "Red",
        "Ribbon & Bow": "Green",
        "Wood": "Dirt Brown",
        "Chimney": "Metallic Silver",
        "Frames & Doorknob": "White",
        "Door": "Green",
        "Glass": "Clear",
        "Tag": "White",
        "Tag Words": "Black",
        "Trees": "Green",
        "Snow": "White",
    },
};