/*
 * cz
 */
chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, { urls: ["http://*/*", "https://*/*"] }, ["blocking"]);
function onBeforeRequest(details) {
    var ptype = details.type;
    var url = details.url;
    if (ptype == "main_frame") 
        return;
    else {
        //console.log(rule)
        for (i in rule) {
            if (new RegExp(rule[i]).test(url)){
                 //console.log(rule[i]);
                return { cancel: true };
            }
        }
        
    }

}
