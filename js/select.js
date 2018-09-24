var currentWord = '';

window.onload=function(){
	var left = '';
	var top = '';
    var objImg=new Image();
    objImg.src='http://www.ricofishing.com/me/usr/uploads/2018/09/3166145910.png';
    objImg.style.display='none';
    objImg.style.position='absolute';
    objImg.style.cursor='pointer';
    objImg.style.width='20px';
    objImg.style.height='20px';
    document.body.appendChild(objImg);	
    // 获取选中
    function selectText(){
	    if(document.selection){//For ie
		    return document.selection.createRange().text;
	    }else{
		    return window.getSelection().toString();
	    }
    }	
    // 获取单词数据
    function getClickHandler() {
	    var ajax = new XMLHttpRequest();
	    ajax.open('get','https://fanyi.youdao.com/openapi.do?keyfrom=youdaoci&key=694691143&type=data&doctype=json&version=1.1&q='+ selectText());
	    ajax.send();
	    ajax.onreadystatechange = function () {
	       if (ajax.readyState==4 &&ajax.status==200) {
	    　　　　pop(ajax.responseText);
	      　　}
	    }
	}

	// 渲染弹窗
	function pop(res){
		var data = JSON.parse(res);
		var insert = ``;
		for(var i=0;i<data.basic.explains.length;i++){
			insert = insert + `<p style="text-align:left;margin:0">${data.basic.explains[i]}</p>` ;
		};
		var explainToast = `<div class="pop" style="background-color:white;border:solid 1px #bdbdbd;border-radius:3px;padding:5px;width:200px;text-align: center;font-size:14px">
			<p style="text-align:left;font-weight:bold;margin:0">翻译：<span>${data.translation}</span></p>
			<p style="text-align:left;font-weight:bold;margin:0">音标： <span>[${data.basic.phonetic}]</span></p>
			<p style="text-align:left;font-weight:bold;margin:0">详细：</p>
			${insert}
			<p></p>
			<a href="https://cn.bing.com/dict/search?q=${data.query}" target="_blank">●Bing词典</a>
			<a href="https://www.collinsdictionary.com/dictionary/english-chinese/${data.query}" target="_blank">●柯林斯在线</a>
			<p></p>
			<button class="push" style="margin-top:10px;cursor:pointer;border-radius:3px;background-color:black;color:white;padding:0 10px;">Push to My Bowl</button>
		</div>`;
		$('body').append(explainToast);
		$('.pop').css('position','absolute');
		$('.pop').css('top',top);
		$('.pop').css('left',left);
		
		console.log(chrome.storage.local.get("rico",function(){}));
		console.log(chrome.storage.local.get);
		// 处理单词存储
		currentWord = data.query;
		$('.push').click(function(){
			objImg.style.display='none';	
			var oldwordlist = chrome.storage.local.get("rico",function(){}) || [];
			oldwordlist.push(currentWord);
			console.log(oldwordlist);
			chrome.storage.local.set({"rico":oldwordlist},function(){});

		})
	}

    document.onmouseup=function(ev){
	    var	ev   = ev || window.event;
    	left = ev.clientX + 10,
    	top  = ev.clientY + $(document).scrollTop();
	    	
	    setTimeout(function(){
		    if(selectText().length>0){
			    setTimeout(function(){
				    objImg.style.display='block';
				    objImg.style.left = left+'px'; 
				    objImg.style.top  = top +'px';
				}, 100);
		    }
	    },200);
    }

	objImg.onclick=function(ev){
		getClickHandler();
	}

	objImg.onmouseup=function(ev){
		var ev=ev|| window.event;
		ev.cancelBubble=true;
	}
    document.onclick=function(ev){
	    objImg.style.display='none';
	    $('.pop').hide();
    }
}
