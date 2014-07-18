function PopWin(win) {
	this.win = win;
	this.mask = null;
	this._init();
}

PopWin.prototype._init = function() {
	var mask = $('<div />');
	mask.css({
		'display': 'none',
		'position': 'absolute',
		'left': 0,
		'top': 0,
		'z-index': 1000,
		'width': '1280px',
		'height': '900px',
		'background-color': 'rgba(0, 0, 0, 0.5)'
	});
	
	$(document.body).append(mask);
	
	this.mask = mask;
}

PopWin.prototype.show = function() {
	var mask = this.mask;
	var win = this.win;
	
	mask.width($(document.body).width());
	mask.height($(document.body).height());
	
	var popWidth = win.width();
	var popHeight = win.height();
	var clientWidth = $(window).width();
	var clientHeight = $(window).height();
	
	var popLeft = Math.abs(Math.floor((clientWidth - popWidth) / 2)) + $(window).scrollLeft();
	var popTop = Math.abs(Math.floor((clientHeight - popHeight) / 2)) + $(window).scrollTop();
	
	/*
	win.offset({
		left: popLeft,
		top: popTop
	});
	*/
	
	win.css('left', popLeft + 'px').css('top', popTop + 'px');

	mask.show();
	win.show();
}

PopWin.prototype.hide = function() {
	var mask = this.mask;
	var win = this.win;
	
	win.hide();
	mask.hide();
	
}