var wordlist = [];
chrome.storage.local.get("rico",function(res){
	wordlist = res.rico;
	for(var i=0;i<wordlist.length;i++){
		$('.main').append('<div class="wordlistItem">'+ wordlist[i] +'</div>')
	}
});
