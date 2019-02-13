/*
 * cz
 */
chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, { urls: ["http://*/*", "https://*/*"] }, ["blocking"]);
function onBeforeRequest(details) {
    var ptype = details.type;
    var url = details.url;
    if (ptype == "main_frame") {
        return ;
    }
    else {
        for (i in rule) {
            if (new RegExp(rule[i]).test(url)){
                return { cancel: true };
            }
        }
        
    }

}
