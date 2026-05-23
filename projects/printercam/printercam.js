


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

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

window.addEventListener('load',function(){

    const pixelWidth = 512;

    if(findGetParameter("agree")=="true"){
        const disclaimerPanel = document.getElementById("image");
        disclaimerPanel.style.display="block";
        getImage();
    }else{
        const disclaimerPanel = document.getElementById("disclaimer");
        disclaimerPanel.style.display="block";
    }




});
