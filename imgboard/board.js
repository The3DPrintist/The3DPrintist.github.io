function sendJSON() {

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        var DONE = this.DONE || 4;
        if (this.readyState === DONE) {
            alert(xhr.responseText);
        }
    };
    request.open('POST', 'http://192.168.0.51:25565/', true);
    request.send("IMAGEDATAHERE");
}