function sendJSON() {

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        var DONE = this.DONE || 4;
        if (this.readyState === DONE) {
            //alert(xhr.responseText);
        }
    };
    request.open('POST', 'http://71.33.136.126:25565/', true);
    request.send(document.getElementById("imgdata").value);
}

function sendJSONLocal() {

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        var DONE = this.DONE || 4;
        if (this.readyState === DONE) {
            //alert(xhr.responseText);
        }
    };
    request.open('POST', 'http://192.168.0.51:25565/', true);
    request.send(document.getElementById("imgdata").value);
}

var colors = [];
colors[0] = '#000000' // black
colors[1] = '#FFFFFF' // white
colors[2] = '#FF0000' // red
colors[3] = '#00FF00' // green
colors[4] = '#0000FF' // blue
colors[5] = '#00FFFF' // cyan
colors[6] = '#FF00FF' // magenta
colors[7] = '#FFFF00' // yellow
colors[8] = '#FF6800' // orange
colors[9] = '#404040' // grey

document.getElementById("imgdata").value = '0'.repeat(1024);

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d"); var ctx = canvas.getContext("2d");
var pxsize = 16
var color = 1

var mouseDown = 0;
document.body.onmousedown = function () {
    mouseDown = 1
}
document.body.onmouseup = function () {
    mouseDown = 0
}

function showimg(){
    ctx.canvas.width = 32 * pxsize
    ctx.canvas.height = 32 * pxsize
    ctx.scale(pxsize, pxsize);
    ctx.fillStyle = colors[0];
    ctx.fillRect(0, 0, 1080, 1080);
    imgdata = document.getElementById("imgdata").value;
    datalength = imgdata.length;
    if (datalength > 1024){
        console.log(datalength);
    }

    for (let x = 0; x <= 32; x++) {
        for (let y = 0; y <= 32; y++) {
            id = x + (y * 32);
            pixelcolor = imgdata.charAt(id);

            if (id <= datalength){
                ctx.fillStyle = colors[parseInt(pixelcolor)];
                ctx.fillRect(x, y, 1, 1);
            }
            else{
                ctx.fillStyle = colors[0];
                ctx.fillRect(x, y, 1, 1); 
            }
        }
    }

    ctx.scale(1 / pxsize, 1 / pxsize);

}
showimg()

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function noise(){
    
    newimg = ""
    for (let i = 0; i < 1024; i++) {
        newimg = newimg + getRandomInt(9)
    }
    document.getElementById("imgdata").value = newimg
    showimg()
}

function mnoise() {

    newimg = ""
    for (let i = 0; i < 1024; i++) {
        newimg = newimg + getRandomInt(2)
    }
    document.getElementById("imgdata").value = newimg
    showimg()
}

function fill() {

    newimg = ""
    for (let i = 0; i < 1024; i++) {
        newimg = newimg + color
    }
    document.getElementById("imgdata").value = newimg
    showimg()
}

function sc(id){
    color = id
}

function draw(x,y){
    if(x != null && y != null && x >= 0 && y >= 0){
        //console.log(x,y)
        id = x + (y * 32);
        newimg = document.getElementById("imgdata").value.replaceAt(id, color.toString())
        document.getElementById("imgdata").value = newimg
        showimg()
    }
}

String.prototype.replaceAt = function (index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

canvas.addEventListener("mousemove", function (e) {
    var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
    var canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
    var canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make  
    canvasX = Math.round(canvasX / pxsize - 0.5)
    canvasY = Math.round(canvasY / pxsize - 0.5)
    if (mouseDown){
        draw(canvasX, canvasY);
    }
});