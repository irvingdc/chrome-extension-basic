chrome.storage.sync.get('loading', data => {
    if(data && data,loading){
        document.querySelector("#status").innerHTML = "Getting information..."
    }
});

chrome.storage.sync.get('result', data => {
    if(data && data.result){
        document.querySelector("#lastResult").innerHTML = data.result
    }
})

document.querySelector("button").onclick = () => {
    
    document.querySelector("#status").innerHTML="Getting information..."
    chrome.storage.sync.set({result: null, loading: true})

    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.executeScript(
            tabs[0].id,
            { file: "action.js" },
            result => {
                let interval = setInterval(()=>{
                    chrome.storage.sync.get('result', data => {
                        if(data.result){
                            document.querySelector("#status").innerHTML = data.result
                            clearInterval(interval)
                            chrome.storage.sync.set({loading: false})
                        }
                    });
                },500)
            }
        );
    });

};