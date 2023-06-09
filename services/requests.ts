export const postRequest = async (url: string, submit: any) => {
    const controller = new AbortController();
    const data = await fetch(global.SERVERPATH + url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: Object.keys(submit)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent((submit as any)[key]))
            .join('&'),
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response data from the PHP server
            return data;
        })
        .catch(error => {
            // Handle any errors that occurred during the request
            console.error(error);
        });
    //auto abort if run multiple times in succession
    controller.abort();
    if (!data) {
        alert("SERVER CONNECTION ERROR");
        return false
    }
    if (data.result === "Success") {
        return data;
    } else if (data.result === "Error") {
        alert(data.message);
        return false
    } else {
        alert(JSON.stringify(data));
        return false
    }
}
