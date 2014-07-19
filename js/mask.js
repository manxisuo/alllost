function PopWin(win) {
	this.win = win;
	this.mask = null;
	this.visible = false;
	this.timer = -1;
	
	this._initWin();
	this._initMask();
}

PopWin.prototype._initWin = function() {
	if (!this.win) {
		this.win = $('<div />').addClass('mxs-popwin');
		this.win.appendTo($(document.body));
	}
	else if (typeof this.win == 'string') {
		var tip = this.win;
		this.win = $('<div />').addClass('mxs-popwin');
		this.win.html(tip);
		this.win.appendTo($(document.body));
	}
}

PopWin.prototype._initMask = function() {
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

PopWin.prototype.tip = function(msg) {
	this.win.html(msg);
	this.show(1000);
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
		var _this = this;
		this.timer = setTimeout(function() {
			_this.hide();
		}, timeout);
	}
}

PopWin.prototype.hide = function() {
	// 清除定时
	clearTimeout(this.timer);
	
	if (!this.visible) return;
	
	var mask = this.mask;
	var win = this.win;
	
	win.hide();
	mask.hide();
	
	this.visible = false;
}