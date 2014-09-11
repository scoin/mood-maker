var image = '';

$(document).ready(function(){

	$(".imageDiv").draggable({ containment: ".page", scroll: true });
	$('.image').resizable({containment: ".page", aspectRatio: true});

	$('#addImage').submit(function(e){
		e.preventDefault();
		$.post('/addimage', $('#addImage').serialize(), function(){
			image = $('#imageURL').val();
		})
			.done(function(data){
				$('.page').append("<div class='imageDiv'><img src='" + image + "' class='image'></div>")
				$(".imageDiv").draggable({ containment: ".page", scroll: true });
				$('.image').resizable({containment: ".page", aspectRatio: true});
				$('#imageURL').val('');
			})
	})
})