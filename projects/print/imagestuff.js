function isImg(msg){
    if(msg.startsWith('https://') && (msg.endsWith('.png') || msg.endsWith('.jpg') || msg.endsWith('.jpeg') || msg.endsWith('.webp'))){
        return true;
    }

    return false;
}

function isImgBlob(msg){
  if(msg.startsWith('base64img:')){
      return true;
  }

  return false;
}

function resizeMax(image,maxWidth,maxHeight){
  let width = image.width;
  let height = image.height;

  if (width > maxWidth) {
    height *= maxWidth / width;
    width = maxWidth;
  }

  if (height > maxHeight) {
    width *= maxHeight / height;
    height = maxHeight;
  }

  // Create a canvas and draw the resized image onto it
  let canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  fillCanvas(canvas,'#FFFFFF');
  let ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, width, height);
  return canvas;
}

function cropImage(image, x,y,w,h){
  let canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  let ctx = canvas.getContext('2d');
  ctx.drawImage(image, -x, -y, image.width, image.height);
  return canvas;
}

function fillCanvas(canvas, color){
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

function filterCanvas(ctx, filter, x,y,w,h){
  let imgData = ctx.getImageData(x, y, w, h);

  for (let i = 0; i < imgData.data.length; i += 4) {
    imgData.data = filter(imgData.data,i);
  }

  ctx.putImageData(imgData, x, y);
}

function filterInvert(data,i){

  data[i] = 255-data[i];
  data[i+1] = 255-data[i+1];
  data[i+2] = 255-data[i+2];
  data[i+3] = 255;

  return data;
}

function filterReceipt(data,i){

  let gray = rgbToGrayscale(data[i],data[i+1],data[i+2]);
  data[i] = ((gray/255) * (receiptColorRGB.r/255))*255;
  data[i+1] = ((gray/255) * (receiptColorRGB.g/255))*255;
  data[i+2] = ((gray/255) * (receiptColorRGB.b/255))*255;
  data[i+3] = 255;

  return data;
}

function filterTint(data,i,tintRGB){

  data[i] = ((data[i]/255) * (tintRGB.r/255))*255;
  data[i+1] = ((data[i+1]/255) * (tintRGB.g/255))*255;
  data[i+2] = ((data[i+2]/255) * (tintRGB.b/255))*255;
  data[i+3] = 255;

  return data;
}

function rgbToGrayscale(red, green, blue) {
    /* remember: if you multiply a number by a decimal between 0
    and 1, it will make the number smaller. That's why we don't
    need to divide the result by three - unlike the previous
    example - because it's already balanced. */

    const r = red * .3 // ------> Red is low
    const g = green * .59 // ---> Green is high
    const b = blue * .11 // ----> Blue is very low

    return r + g + b;
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

async function loadImage(url){
    const loadImageHelper = path => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = 'Anonymous' // to avoid CORS if used with Canvas
        img.src = path
        img.onload = () => {
        resolve(img)
        }
        img.onerror = e => {
        reject(e)
        }
    })
    }

    let image = await loadImageHelper(url);
    return image;
}