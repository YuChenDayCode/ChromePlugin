/*
 * cz
 */
chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, { urls: ["http://*/*", "https://*/*"] }, ["blocking"]);
function onBeforeRequest(details) {
    var ptype = details.type;
    var url = details.url;
    if (ptype == "main_frame") {
        AccessRecords(url);
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

var itv;//计时器
var AccessWeb = ""; //当前访问网站
//访问记录统计
function AccessRecords(url) {
    var host = url.split('/')[2];
    var moyu = JSON.parse(localStorage.getItem("Moyu")) || [];
    var single = moyu.find(t => t.host == host) || null;
    if (single == null) moyu.push({ "host": host, "count": 1, "time": 0 });
    else single.count += 1;
    localStorage.setItem("Moyu", JSON.stringify(moyu));
}

//创建标签
chrome.tabs.onCreated.addListener(function (tab) {
    if (tab.active && tab.url.indexOf(AccessWeb) == -1) //创建的网页不是当前域名
        clearInterval(itv);
});
//关闭标签 关闭浏览器也会触发，并显示所有标签 removeInfo:{isWindowClosing: true,windowId: 4724}
chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    if (tabId == removeInfo.windowId) //关闭的是当前计时的页面
        clearInterval(itv);
});
//标签切换 tabId：标签id， selectInfo:浏览器的窗口id 意义不大 没啥用
chrome.tabs.onSelectionChanged.addListener(function (tabId, selectInfo) {
    chrome.tabs.get(tabId, function (tab) {
        if (tab.url.indexOf(AccessWeb) == -1) //切换了 才停止计时
            clearInterval(itv);
        UpdatedTab(tab.status, true, tab.url);
    });
});
//标签改变 changeInfo：状态 以及改变后的信息 
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    UpdatedTab(changeInfo.status, tab.active, tab.url);
});

function UpdatedTab(status, active, thisurl) {
    if (status == "complete" && active) //一个标签加载一个页面完成时 根据url开始计时
    {
        if (thisurl.indexOf('chrome://') > -1) {
            AccessWeb = "";
            return;
        }
        var host = thisurl.split('/')[2];
        if (host != AccessWeb) {
            clearInterval(itv);
            AccessWeb = host;
        }
        else return;

        var moyu = JSON.parse(localStorage.getItem("Moyu")) || [];
        var single = moyu.find(t => t.host == host) || null;
        if (single != null) {
            itv = setInterval(() => {
                single.time += 1;
                console.log(single);
                localStorage.setItem("Moyu", JSON.stringify(moyu));
            }, 1000);
        }
    }
}

//监听浏览器是否焦点
var isRun = false;
var globalTimer = setInterval(() => {
    chrome.windows.getLastFocused(function (f) {
        if (!f.focused) {
            clearInterval(itv);
            isRun = true;
        }
        else {
            if (isRun) {
                var tempurl ="http://"+AccessWeb;
                AccessWeb=""; //清空地址不然无法计时
                UpdatedTab("complete", true, tempurl);
                isRun = false;
            }
        }
    });
}, 1000);




