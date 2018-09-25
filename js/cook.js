var wordlist = [];
chrome.storage.local.get("rico",function(res){
	wordlist = res.rico;
	for(var i=0;i<wordlist.length;i++){
		$('.main').append('<div class="wordlistItem">'+ wordlist[i] +'<button class="button btn btn-primary"  value="'+ wordlist[i] +'" type="button" data-toggle="modal" data-target=".bs-example-modal-sm">translate</button><button class="remove" value="'+ wordlist[i] +'">remove</button></div>')
	};
	$('.remove').click(function(e){
		// e.target.parentNode.style.color = 'grey';
		e.target.parentNode.style.display ='none';
		chrome.storage.local.get("rico",function(res){
			if(JSON.stringify(res)=='{}'){
				oldwordlist = []
			}else{
				oldwordlist = res.rico;
			}
			var index = oldwordlist.indexOf(e.target.attributes.value.value);
			if (index > -1) {
				oldwordlist.splice(index, 1);
			}
			chrome.storage.local.set({"rico":oldwordlist},function(){
			});
		});	
	});
	$('.button').click(function(e){
		var word = e.target.attributes.value.value;
		axios.get('http://fanyi.youdao.com/openapi.do?keyfrom=youdaoci&key=694691143&type=data&doctype=json&version=1.1&q='+ word).then(function(res){
			// alert(res.data.translation);
			var data=res.data;
			var insert = ``;
			for(var i=0;i<data.basic.explains.length;i++){
				insert = insert + `<p style="text-align:left;margin:0">${data.basic.explains[i]}</p>` ;
			};
			var explainToast = `<div class="pop" style="background-color:white;border:solid 1px #bdbdbd;border-radius:3px;padding:5px;width:300px;text-align: center;font-size:14px">
						<p style="text-align:left;font-weight:bold;margin:0"><span>${data.translation}</span></p>
						<p style="text-align:left;font-weight:bold;margin:0"><span>[${data.basic.phonetic}]</span></p>
						<p style="text-align:left;font-weight:bold;margin:0"></p>
						${insert}
					</div>`;
			$('.modal-content').empty();
			$('.modal-content').append(explainToast);
			
		})
	})
});