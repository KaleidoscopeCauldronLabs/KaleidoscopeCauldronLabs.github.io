## Development

(Assuming `npx` exists)

```
npx http-server
```

Then navigate to `localhost:8080`

## Add a new model

- Copy and paste one of the app folders (e.g., `/hot-cocoa-fairy-mug`) and rename it to the desired URL slug.
- Add a new `<li>` entry to `/index.html` with the correct title and URL.
- Rename the `<h1>` in the `/<slug>/index.html` file to the desired page title.
- Replace the images in the `/<slug>/images` folder (each image must be named a 3-digit number starting from `000.png` as the frontmost layer, incrementing by one for each layer - numbers must not be skipped).
- Edit each of the constants in `/<slug>/custom.js` - further instructions are in that file.