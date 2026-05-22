


async function getImage(){
    const img = document.getElementById("cam");
    const url = "https://print.zack3dprints.workers.dev/cam";
    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.text();
        console.log(result);

        img.src = "data:image/png;base64," + result;

    } catch (error) {
        console.error(error.message);
    }
}

window.addEventListener('load',function(){

    const pixelWidth = 512;

    getImage();



});
