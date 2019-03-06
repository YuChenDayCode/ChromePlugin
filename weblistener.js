/*
 * cz
 */
chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, { urls: ["http://*/*", "https://*/*"] }, ["blocking"]);
function onBeforeRequest(details) {
    var ptype = details.type;
    var url = details.url;
    if (ptype == "main_frame") {
        var host = url.split('/')[2];
        var moyu=JSON.parse(localStorage.getItem("Moyu")) || [];
        var single = moyu.find(t=>t.host==host)||null;
        if(single==null) moyu.push({"host":host,"count":1});
        else single.count+=1;
        localStorage.setItem("Moyu",JSON.stringify(moyu));
        return;
    }
    else {
        for (i in rule) {
            if (new RegExp(rule[i]).test(url)) {
                return { cancel: true };
            }
        }

    }

}
