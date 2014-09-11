var image = '';
var selected = '';

$(document).ready(function(){

	$(".imageDiv").draggable({ containment: ".page", scroll: true });
	$('.image').resizable({containment: ".page", aspectRatio: true});

	$('#addImage').submit(function(e){
		e.preventDefault();
		$.post('/addimage', $('#addImage').serialize(), function(){
			image = $('#imageURL').val();
			$('#imageURL').val('');
		})
			.done(function(data){
				$('.page').append("<div class='imageDiv'><img src='" + image + "' class='image'></div>")
				$(".imageDiv").draggable({ containment: ".page", scroll: true });
				$('.image').resizable({containment: ".page", aspectRatio: true});
			});
	});

	$('.page').on('click', '.imageDiv', function(){
		selected = this;
		$('#z-index').val($(this).zIndex());
	})

	$('#z-index').keyup(function(k){
		if(selected != undefined){
			$(selected).zIndex($('#z-index').val());
		}
	})
})