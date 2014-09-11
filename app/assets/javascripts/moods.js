$(document).ready(function(){

	$(".imageDiv").draggable({ containment: ".page", scroll: true });
	$('#image').resizable({containment: ".page", aspectRatio: true});
})