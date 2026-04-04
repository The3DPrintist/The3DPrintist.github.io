
async function loadFont(){
    let fontLoaded = false;

    font = {}

    //load font key
    let charKey = "";
    await fetch("./"+charKeyPath)
    .then(response => response.text())
    .then((data) => {
        charKey = data.replaceAll("\n","");
    });

    console.log(charKey);

    let charSheet = await loadImage("./"+charSheetPath);

    //populate char to image dictionary
    ccw = charSheet.width;
    px=0;
    py=0;
    console.log(ccw);
    for(i = 0; i < charKey.length; i++)
    {
        c = charKey.charAt(i);

        let charImage = cropImage(charSheet,px,py,charWidth,charHeight)

        font[c]=charImage;

        px += charWidth;
        if(px>ccw){
            py += charHeight;
            px = 0;
        }
    }
    console.log("loaded " + Object.keys(font).length + " characters for font.");

}

function updatePreview(){
    //console.log("updating preview");
    const status = document.getElementById("counter");
    const previewCanvas = document.getElementById("preview");
    const ctx = previewCanvas.getContext("2d");
    const textbox = document.getElementById("message");

    status.innerHTML = "";
    if(isImgBlob(textbox.value)){
        //image display

        status.innerHTML = "Loaded Image!"

        drawBlobAndFormatOnPreview(previewCanvas,textbox.value,12,charHeight*2);

    }else{
        //text display

        //max length
        if(textbox.value.length > maxMessageLength){
            textbox.value = textbox.value.substring(0,maxMessageLength);
            status.innerHTML = "You hit the max of "+ maxMessageLength +" characters";
        }
        
        //max newlines
        let nlmaxidx = indexOfMax(textbox.value,"\n",maxNewlines)
        if(nlmaxidx>0){
            textbox.value = textbox.value.substring(0,nlmaxidx);
            status.innerHTML = "You hit the max of "+ maxNewlines +" lines";
        }

        //resize to fit
        let rows = textRows(textbox.value);
        setPreviewSize(rows);

        fillReceipt(previewCanvas);

        drawTextOnPreview(ctx,textbox.value,12,charHeight*2);

    }


}

function drawTextOnPreview(ctx, text, sx, sy){
    let c = -1;
    let r = 0;
    let nl = "\n"

    for (let i = 0; i < text.length; i++) {
        let char = text[i]
        let ci = font[char];

        if(c > (columnCount-2) || (char==nl)){
            c = 0;
            r += 1;

            if(char==nl){c-=1;}
        }else{
            c += 1;
        }
        
        if(char!=nl){
            if(ci){
                ctx.drawImage(ci,sx + (c*charWidth),sy + (r*charHeight))
            }else{
                ctx.drawImage(font["?"],sx + (c*charWidth),sy + (r*charHeight))
                console.log("invalid char: " + char );
            }
        }
    }
}

function drawBlobAndFormatOnPreview(canvas, text, sx, sy){

    let ctx = canvas.getContext("2d");
    let px = sx;
    let py = sy;

    let data = text.slice(10);

    var image = new Image();
    image.onload = function() {
        
        let rows = Math.ceil(image.height/charHeight);
        setPreviewSize(rows);
        fillReceipt(canvas);

        ctx.drawImage(image, px, py);

        filterCanvas(ctx, filterReceipt, px, py, image.width, image.height);
    };
    image.src = "data:image/png;base64," + data;


}

function indexOfMax(str,targetChar,maxCount){
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === targetChar) {
            count++;
            if(count > maxCount){
                return i;
            }
        }
    }
    return -1;
}

function textRows(text){
    let c = -1;
    let r = 0;
    let nl = "\n"

    for (let i = 0; i < text.length; i++) {
        let char = text[i]
        let ci = font[char];

        if(c > (columnCount-2) || (char==nl)){
            c = 0;
            r += 1;

            if(char==nl){c-=1;}
        }else{
            c += 1;
        }
        
        if(char!=nl){
            if(ci){
                //ctx.drawImage(ci,sx + (c*charWidth),sy + (r*charHeight))
            }else{
                //ctx.drawImage(font["?"],sx + (c*charWidth),sy + (r*charHeight))
                //console.log("invalid char: " + char );
            }
        }
    }

    return r+1;
}

function setPreviewSize(rows){
    const previewCanvas = document.getElementById("preview");

    let cWidth = (charWidth*2)+pixelWidth;
    let cHeight = (rows+4)*charHeight;

    previewCanvas.width = cWidth;
    previewCanvas.height = cHeight;
    previewCanvas.style.width = cWidth+"px";
    previewCanvas.style.height = cHeight+"px";
}

function fillReceipt(canvas){
    //fill with white
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = receiptColor;
    ctx.beginPath();
    ctx.rect(0, 4, canvas.width, canvas.height-8);
    ctx.fill();

    ctx.beginPath();
    let p = new Path2D;
    for(x=0;x<canvas.width;x+=8){
        triangle(ctx,p,x,4, x+4,0, x+8,4);
    }

    let b = canvas.height-4;
    for(x=0;x<canvas.width;x+=8){
        triangle(ctx,p,x,b, x+4,b+4, x+8,b);
    }

    ctx.fill(p);
}

function triangle(ctx,p,x1,y1,x2,y2,x3,y3){
    p.moveTo(x1,y1);
    p.lineTo(x2,y2);
    p.lineTo(x3,y3);
}