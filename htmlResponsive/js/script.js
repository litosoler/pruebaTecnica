//Cuando la pagina este lista
$(function(){
	autoHeight(); 
});

$(window).resize(function() {
	autoHeight();
});

function autoHeight(){
	$("body").css("height", $(window).height());
}
