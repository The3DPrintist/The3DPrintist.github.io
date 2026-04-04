async function sendData(data) {

    if(data.length < 1){
        return false;
    }

    let response = await fetch("https://print.zack3dprints.workers.dev/send", {
        method: "POST",
        body: data
    });

    try {
        let response = await fetch("https://print.zack3dprints.workers.dev/send", {method: "POST", body: data});
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }

        console.log(await response.text());
    } catch (error) {
        console.error(error.message);
    }

    console.log(response.body);
    return true;
}