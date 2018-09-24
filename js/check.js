var wordlist = chrome.storage.local.get(['rico'],function(){});
for(var i=0;i<wordlist.length;i++){
	$('.main').append('<p>'+ wordlist[i] +'</p>')
}