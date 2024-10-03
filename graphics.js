export function drawCompositeImage(ctx, images, indexToColorFn) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, images[0].width, images[0].height);
    for (let i = 0; i < images.length; i++) {
        drawTinted(ctx, images[i], indexToColorFn(i));
    }
}

function drawTinted(ctx, image, color) {
    const [tempCanvas, tempCtx] = createContext(image.width, image.height);
    drawColoredStencilFromImage(tempCtx, image, color);

    // Shade the stencil
    // TODO: for some reason, this causes the alpha to be lost around the edges?
    tempCtx.globalCompositeOperation = "multiply";
    tempCtx.drawImage(image, 0, 0);

    // Draw it onto the output
    ctx.drawImage(tempCanvas, 0, 0);
}

function createContext(width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    return [canvas, context];
}

// Draws a colored stencil of the opaque parts of an image into the context.
function drawColoredStencilFromImage(ctx, image, color) {
    ctx.drawImage(image, 0, 0);
    ctx.globalCompositeOperation = "source-atop";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, image.width, image.height);
}