var timeLeft = 0;
const texbox = document.getElementById("message");

function sendClicked(){
    var msg = texbox.value.trim();

    if(msg.length > 0 && timeLeft<1){
        sendData(msg)
        texbox.value = "";

        startCountdown();
    }
}

function startCountdown() {
    timeLeft = 15; // seconds
    const countdownElement = document.getElementById('gen');

    const countdownInterval = setInterval(function() {
        countdownElement.innerHTML = timeLeft;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "Send";
        }
    }, 1000); // Update every second
}

//on start
const maxMessageLength = 2000
const maxNewlines = 45
const columnCount = 42;
const pixelWidth = 512;
const charSheetPath = "charsheet.png";
const charKeyPath = "charkey.txt";
const charWidth = 12;
const charHeight = 24;
const receiptColor = "#e9e7d5";
var receiptColorRGB = hexToRgb(receiptColor);
window.addEventListener('load',function(){

    document.getElementById('message').addEventListener('input', function(event) {updatePreview();});

    document.getElementById('imageUploader').addEventListener('change', function(event) {
        //console.log(event.target.files.length);
        let file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                let img = new Image();
                img.onload = function() {
                    // Calculate the new dimensions while maintaining the aspect ratio
                    const maxWidth = 512;
                    const maxHeight = maxWidth*3;

                    let resizedImage = resizeMax(img,maxWidth,maxHeight);

                    // Convert the canvas to a Base64 string
                    let base64String = "base64img:" + resizedImage.toDataURL('image/jpeg').split(',')[1];

                    //set text
                    const textbox = document.getElementById("message");
                    textbox.value = base64String;

                    updatePreview();
                };

                img.src = e.target.result;
            };
            reader.readAsDataURL(file);  // This will read the image as a Data URL (Base64)
        }
    });

    loadFont();
    updatePreview();
});