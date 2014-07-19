function Pager(prevEl, nextEl) {
	this.prevEl = prevEl;
	this.nextEl = nextEl;
}

Pager.prototype.setPrev = function(filename) {
	this.prevEl.attr('href', '#' + filename);
	this.setPrevVisible(true);
}

Pager.prototype.setNext = function(filename) {
	this.nextEl.attr('href', '#' + filename);
	this.setNextVisible(true);
}

Pager.prototype.setPrevVisible = function(visible) {
	if (visible) this.prevEl.show();
	else this.prevEl.hide();
}

Pager.prototype.setNextVisible = function(visible) {
	if (visible) this.nextEl.show();
	else this.nextEl.hide();
}

Pager.prototype.toPrev = function() {
	jumpto(this.prevEl.attr('href'));
}

Pager.prototype.toNext = function() {
	jumpto(this.nextEl.attr('href'));
}