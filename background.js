function getClickHandler() {
  return function(info, tab) {
    if(info.selectionText == undefined){
      alert('Accept English Word Only  (╯-_-)╯╧╧')
      return
    }

    var ajax = new XMLHttpRequest();
    ajax.open('get','http://fanyi.youdao.com/openapi.do?keyfrom=youdaoci&key=694691143&type=data&doctype=json&version=1.1&q='+ info.selectionText);
    ajax.send();
    ajax.onreadystatechange = function () {
       if (ajax.readyState==4 &&ajax.status==200) {
    　　　　alert(JSON.parse(ajax.responseText).translation);
      　　}
    }
  };
};

chrome.contextMenus.create({
  "title" : "Check Explain",
  "type" : "normal",
  "contexts" : ["all"],
  "onclick" : getClickHandler()
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({})
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

