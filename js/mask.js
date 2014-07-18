function PopWin(win) {
	this.win = win;
	this.mask = null;
	this.visible = false;
	this.timer = -1;
	
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
		'background-color': 'rgba(0, 0, 0, 0)'
	});
	
	$(document.body).append(mask);
	
	this.mask = mask;
}

PopWin.prototype.show = function(timeout) {

	if (this.visible) return;

	var mask = this.mask;
	var win = this.win;
	
	mask.width($(document.body).width());
	mask.height($(document.body).height());

	var popWidth = win.width();
	var popHeight = win.height();
	var clientWidth = $(window).width();
	var clientHeight = $(window).height();
	var scrollLeft = $(window).scrollLeft();
	var scrollTop = $(window).scrollTop();
	
	var popLeft = Math.abs(Math.floor((clientWidth - popWidth) / 2)) + scrollLeft;
	var popTop = Math.abs(Math.floor((clientHeight - popHeight) / 2)) + scrollTop;
	
	/* win.offset({ left: popLeft, top: popTop }); */
	
	win.css('left', popLeft + 'px').css('top', popTop + 'px');

	mask.show();
	win.show();
	
	this.visible = true;
	
	// 设置超时
	clearTimeout(this.timer);
	if (timeout) {
		this.timer = setTimeout(function() {
			this.hide();
		}, timeout);
	}
}

PopWin.prototype.hide = function() {
	if (!this.visible) return;
	
	var mask = this.mask;
	var win = this.win;
	
	win.hide();
	mask.hide();
	
	this.visible = false;
	
	// 清除定时
	clearTimeout(this.timer);
}