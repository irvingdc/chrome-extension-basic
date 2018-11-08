window.makeRequest = info => {
    fetch('https://www.appinchina.co/admin/chromeTest.php?data='+info)
    .then(response => response.json() )
    .catch(e => console.log("Error during request. ",e))
    .then(result => {
        console.log('Request successful: ', result);
        chrome.storage.sync.set({result: result.data})
        window.open("https://www.appinchina.co","_self")
    })
    .catch(e => console.log("Error while parsing response. ",e))
}

window.text = document.body.querySelector("p").innerText
if(window.text){
    console.log("info:", window.text)
    window.makeRequest(window.text)
}

//this is returned to the callback
"end of script"