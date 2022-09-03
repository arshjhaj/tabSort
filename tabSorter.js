function script(){
    var completed = [];
    chrome.tabs.query({currentWindow:true}, function(tabs) {
        var tabPartitioning = [];
        var currIndex = 0;
        for (var i=0; i < tabs.length; i++) {
            var baseURL = getBaseURL(tabs[i].url);
            if (!completed.includes(baseURL)){
                for (var k = i; k<tabs.length; k++){
                    if (getBaseURL(tabs[k].url) == baseURL){
                        tabPartitioning[currIndex] = tabs[k].id;
                        currIndex++;
                    }
                }
                    completed.push(baseURL);
            }
         }

            for (var i = 0; i < tabPartitioning.length; i++){
                chrome.tabs.move(tabPartitioning[i], {index: i});
            }

    });

    
}

function getBaseURL(url){
    var backslashCounter = 0;
    for (var i = 0; i<url.length; i++){
        if(url.charAt(i) == '/'){
            backslashCounter++;
        }
        
        if (backslashCounter == 2 && i == url.length - 1){
            return url.substring(0, i+1);
        }

        if (backslashCounter == 3){
            return url.substring(0, i);
        }

    }

    return url;
}

document.getElementById('clicker').onclick = script;