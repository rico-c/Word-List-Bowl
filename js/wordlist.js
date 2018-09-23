$('.check').click(function(){
	window.location = 'check.html'
})
$('.cook').click(function(){
	chrome.windows.create({
		url:"cook.html",
		type :"normal"
	})
})
