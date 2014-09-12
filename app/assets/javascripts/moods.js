var image = '';
var selected = {obj: undefined,
				heightRatio: function(){
					return this.h / this.w;
				},
				widthRatio: function(){
					return this.w / this.h;
				},
				orientation: function(){
					if(this.widthRatio() >= 1) return 'landscape';
					if(this.heightRatio() >= 1) return 'portrait';
				}
				};

function initUI(){
	$(".imageDiv").draggable({ containment: ".page", scroll: true });
	$('.image').resizable({containment: ".page", 
							aspectRatio: true,
							resize: function(event, ui){
								$('#width').val($(this).width());
								$('#height').val($(this).height());
							}
						});
}

$(document).ready(function(){

	initUI();

	$('#addImage').submit(function(e){
		e.preventDefault();
		$.post('/addimage', $('#addImage').serialize(), function(){
			image = $('#imageURL').val();
			$('#imageURL').val('');
		})
			.done(function(data){
				$('.page').append("<div class='imageDiv'><img src='" + image + "' class='image'></div>");
				initUI();
			});
	});

	$('.page').on('click', '.imageDiv', function(){
		selected.obj = this;
		selected.w = $(this).width();
		selected.h = $(this).height();

		$('#z-index').val($(this).zIndex());
		$('#width').val($(this).width());
		$('#height').val($(this).height());
	})

	$(document).keyup(function(k){
		if(k.keyCode === 27){
			selected.obj = undefined;
			$('#z-index').val('');
			$('#width').val('');
			$('#height').val('');

		}
	})

	$('#z-index').keyup(function(k){
		if(k.keyCode != 8){
			if(selected.obj != undefined){
				$(selected.obj).zIndex($('#z-index').val());
			}
		}
	})

	$('#width').keyup(function(k){
		if(k.keyCode != 8){
			if(selected.obj != undefined){
				if($('#width').val() > $('.page').width()){
					$('#width').val($('.page').width())
				}
				
					$(selected.obj).children().width($('#width').val());
					$(selected.obj).find($('.image')).width($('#width').val());
					$(selected.obj).children().height($('#width').val() * selected.heightRatio());
					$(selected.obj).find($('.image')).height($('#width').val() * selected.heightRatio());
					$('#height').val($(selected.obj).height());

				if($(selected.obj).height() > $('.page').height()){
					$(selected.obj).children().height($('.page').height());
					$(selected.obj).find($('.image')).height($('.page').height());
					$(selected.obj).children().width($('.page').height() * selected.widthRatio());
					$(selected.obj).find('.image').width($('.page').height() * selected.widthRatio());
					$('#height').val($(selected.obj).height());
					$('#width').val($(selected.obj).width());
				}
			}
		}
	})

	$('#height').keyup(function(k){
		if(k.keyCode != 8){
			if(selected.obj != undefined){
				if($('#height').val() > $('.page').height()){
					$('#height').val($('.page').height())
				}

				$(selected.obj).children().height($('#height').val());
				$(selected.obj).find($('.image')).height($('#height').val());

				$(selected.obj).children().width($('#height').val() * selected.widthRatio());
				$(selected.obj).find($('.image')).width($('#height').val() * selected.widthRatio());
				$('#width').val($(selected.obj).width());

				if($(selected.obj).width() > $('.page').width()){
					$(selected.obj).children().width($('.page').width());
					$(selected.obj).find($('.image')).width($('.page').width());
					$(selected.obj).children().height($('.page').width() * selected.heightRatio());
					$(selected.obj).find('.image').height($('.page').width() * selected.heightRatio());
					$('#height').val($(selected.obj).height());
					$('#width').val($(selected.obj).width());
				}
			}
		}
	})
})