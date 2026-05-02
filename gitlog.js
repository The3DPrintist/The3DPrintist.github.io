
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

window.addEventListener('load',function(){

    const canvas = document.getElementById("gitlog");

    const url = "https://github-contributions-api.deno.dev/the3dprintist.json";

    let response = httpGet(url);
    let data = JSON.parse(response);

    console.log(data);

    let contributions = data.contributions

    let calw = contributions.length;
    let calh = 7
    let squaresl = 16;
    let gap = 2;

    canvas.width = contributions.length*squaresl;
    canvas.height = 7*squaresl;
    canvas.style.maxWidth = canvas.width+"px";

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, ctx.width, ctx.height);

    const colors = ["#151b23","#033a16","#196c2e","#2ea043","#56d364"]

    for(cx=0; cx<calw; cx++){
        for(cy=0; cy<calh; cy++){
            
            let count = contributions[cx][cy].contributionCount;
            if(count>4){count=4;}

            ctx.fillStyle = colors[count];
            ctx.beginPath();
            ctx.roundRect((cx*squaresl)+gap,(cy*squaresl)+gap,squaresl-(2*gap),squaresl-(2*gap),3);
            ctx.fill();


        }
    }
});