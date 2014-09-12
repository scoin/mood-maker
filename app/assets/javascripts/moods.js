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

function hideMenus(){
	$('.imageOptions').hide();
	$('.textOptions').hide();
}

function initImage(){
	$(".imageDiv").draggable({ containment: ".page", 
								scroll: true,
								start: function(event, ui){
									selectImage(ui.helper[0]);
								},
								stop: function(event, ui){
									selectImage(ui.helper[0]);
								}
							});
	$('.image').resizable({containment: ".page", 
							aspectRatio: true,
							start: function(event, ui){
								selectImage(ui.element['0']);
							},
							resize: function(event, ui){
								$('#width').val($(this).width());
								$('#height').val($(this).height());
							},
							stop: function(event, ui){
								selectImage(ui.element['0']);
							}
						});
}

function initText(){
	$(".textDiv").draggable({ containment: ".page", scroll: true });
	$('.pageText').resizable({containment: ".page", 
					        create: function(event, ui) {
					            initDiagonal = getContentDiagonal();
					            initFontSize = parseInt($(".pageText").css("font-size"));
					        },
					        resize: function(e, ui) {
					            var newDiagonal = getContentDiagonal();
					            var ratio = newDiagonal / initDiagonal;
					            $(".pageText").css("font-size", initFontSize + ratio * 2);
					            $('#fontsize').val($(".pageText").css("font-size"));
					        }
						});
}

function escapeSelected(){
	$(document).keyup(function(k){
		if(k.keyCode === 27){
			selected.obj = undefined;
			$('#z-index').val('');
			$('#width').val('');
			$('#height').val('');
			$('.selected').removeClass('selected');
			hideMenus();
		}
	})
}

function selectImage(that){
	selected.obj = that;
	selected.w = $(that).width();
	selected.h = $(that).height();

	$('#z-index').val($(that).zIndex());
	$('#width').val($(that).width());
	$('#height').val($(that).height());
	$('.selected').removeClass('selected');
	$(selected.obj).addClass("selected");
	hideMenus();
	$('.imageOptions').show();
}

function selectText(that){
	selected.obj = that;
	selected.w = $(that).width();
	selected.h = $(that).height();

	$('#z-index').val($(that).zIndex());
	$('#edittext').val($(that).text());
	$('#fontsize').val($(that).children().css('font-size'));
	$('.selected').removeClass('selected');
	$(selected.obj).addClass("selected");
	hideMenus();
	$('.textOptions').show();
}

function getSelected(){
	$('.page').on('click', '.imageDiv', function(){
		selectImage(this);
	})

	$('.page').on('click', '.textDiv', function(){
		selectText(this);
	})
}

function setZIndex(){
	$('#z-index').keyup(function(k){
		if(k.keyCode != 8){
			if(selected.obj != undefined){
				$(selected.obj).zIndex($('#z-index').val());
			}
		}
	})
}

function setWidth(newWidth){
	$(selected.obj).children().width(newWidth);
	$(selected.obj).find($('.image')).width(newWidth);
	$('#width').val($(selected.obj).width());
}

function setHeight(newHeight){
	$(selected.obj).children().height(newHeight);
	$(selected.obj).find($('.image')).height(newHeight);
	$('#height').val($(selected.obj).height());
}

function getContentDiagonal() {
    var contentWidth = $(".pageText").width();
    var contentHeight = $(".pageText").height();
    return contentWidth * contentWidth + contentHeight * contentHeight;
}

$(document).ready(function(){

	initImage();

	hideMenus();

	escapeSelected();

	getSelected();

	setZIndex();

	$('#addImage').submit(function(e){
		e.preventDefault();
		$.post('/addimage', $('#addImage').serialize(), function(){
			image = $('#imageURL').val();
			$('#imageURL').val('');
		})
			.done(function(data){
				$('.page').append("<div class='imageDiv'><img src='" + image + "' class='image'></div>");
				initImage();
			});
	});

	$('#addText').submit(function(e){
		e.preventDefault();
		text = $('#text').val();
		$('#text').val('');
		$('.page').append("<div class='textDiv'><div class='pageText'><p>" + text + "</p></div></div>");
		initText();
	})

	$('#edittext').keyup(function(k){
		if(k.keyCode != 8){
			$(selected.obj).find($('p')).text($('#edittext').val());
		}
	})
	$('#fontsize').keyup(function(k){
		if(k.keyCode != 8){
			$(selected.obj).find($('.pageText')).css('font-size', $('#fontsize').val());
		}
	})


	$('#width').keyup(function(k){
		if(k.keyCode != 8){
			if(selected.obj != undefined){
				if($('#width').val() > $('.page').width()){
					$('#width').val($('.page').width())
				}
					setWidth($('#width').val());
					setHeight($('#width').val() * selected.heightRatio());

				if($(selected.obj).height() > $('.page').height()){
					setHeight($('.page').height());
					setWidth($('.page').height() * selected.widthRatio());
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

				setHeight($('#height').val());
				setWidth($('#height').val() * selected.widthRatio());

				if($(selected.obj).width() > $('.page').width()){

					setWidth($('.page').width());
					setHeight($('.page').width() * selected.heightRatio());
				}
			}
		}
	})
})