
function jumpto(url) {
	window.location.href = url;
}

function setTitle(title) {
	document.title = title + ' - All the Lost';
}

function isValidHash(hash) {
	return !isNaN(parseInt(hash.substring(1, hash.length)));
}

// Pager ---------------------------------------------------------------------

function Pager(prevEl, nextEl) {
	this.prevEl = prevEl;
	this.nextEl = nextEl;
}

Pager.prototype.setPrev = function(index) {
	this.prevEl.attr('href', '#' + index);
	this.setPrevVisible(true);
}

Pager.prototype.setNext = function(index) {
	this.nextEl.attr('href', '#' + index);
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
	if ('none' != this.prevEl.css('display')) {
		jumpto(this.prevEl.attr('href'));
	}
}

Pager.prototype.toNext = function() {
	if ('none' != this.nextEl.css('display')) {
		jumpto(this.nextEl.attr('href'));
	}
}

// Poster ---------------------------------------------------------------------

function Poster(postList, pager) {
	this.postList = postList;
	this.pager = pager;
}

Poster.prototype.init = function(option) {
	this.titleEl = option.titleEl;
	this.descEl = option.descEl;
	this.dateEl = option.dateEl;
	this.imageEl = option.imageEl;
	this.commentEl = option.commentEl;
	this.popWin = option.popWin;
	
	this.IMAGE_DIR = option.imageDir;
	this.COMMON_IMAGE_DIR = option.commonImageDir;
}

Poster.prototype.show404Page = function() {
	this._updatePost(this.COMMON_IMAGE_DIR + 'NotFound.jpg', 'Not Found', 'Not Found', null);
	
	var pager = this.pager;
	pager.setPrev(0);
	pager.setNext(0);
	pager.setPrevVisible(false);
	pager.setNextVisible(false);
}

Poster.prototype.showAboutPage = function() {
	this._updatePost(this.COMMON_IMAGE_DIR + 'About.jpg', '关于', '一个涂鸦的集合', null);

	var pager = this.pager;
	pager.setPrev(0);
	pager.setNext(0);
	pager.setPrevVisible(false);
	pager.setNextVisible(false);
}


Poster.prototype.showPost = function (index) {
	var pager = this.pager;

	if (index < 0 || index >= this.postList.length) {
		this.show404Page();
		
		return;
	}

	var post = this.postList[index];

	this._updatePost(getImageUrl(post), post.title, post.desc, post.date);
	
	if (index > 0) {
		pager.setPrev(index - 1);
	}
	else {
		pager.setPrev(0);
		pager.setPrevVisible(false);
	}

	
	if (index < this.postList.length - 1) {
		pager.setNext(index + 1);
	}
	else {
		pager.setNext(this.postList.length - 1);
		pager.setNextVisible(false);
	}
}

Poster.prototype.prev = function() {
	this.pager.toPrev();
}

Poster.prototype.next = function() {
	this.pager.toNext();
}

// 注册方向键按下事件
Poster.prototype.addKeydownSupport = function() {
	var KEY_LEFT = 37, KEY_RIGHT = 39;
	var _this = this;
	
	$('body').attr('tabindex', 0).on('keydown', function(e) {
		switch(e.which) {
			case KEY_LEFT:
				e.preventDefault();
				_this.prev();
				break;
			case KEY_RIGHT:
				e.preventDefault();
				_this.next();
		}
	});
}

Poster.prototype._updatePost = function(imageUrl, title, desc, date) {
	var dest_title = title ? title : '';
	var dest_desc = desc ? desc : '';
	var dest_imgUrl = imageUrl ? imageUrl : '';
	
	var titleEl = this.titleEl;
	var descEl = this.descEl;
	var popWin = this.popWin;
	var imageEl = this.imageEl;
	var _this = this;
	
	if (imageEl.attr('src') != dest_imgUrl) {
		popWin.show();
		
		this._updateImage(dest_imgUrl, function() {		
			setTitle(dest_title);
			titleEl.text(dest_title);
			
			descEl.text(dest_desc);
			
			
			var threadKey = imageUrl.substring(_this.IMAGE_DIR.length, imageUrl.lastIndexOf('.'));
			_this._updateComment(threadKey, dest_title);
			
			popWin.hide();
		}, function() {
			popWin.hide();
		});
	}
}

Poster.prototype._updateImage = function(imgUrl, success, error) {
	var imageEl = this.imageEl;
	
	$.ajax(imgUrl, {
		success: function() {
			imageEl.attr('src', imgUrl);
		}, 
		error: function() {
			if (error) error();
		}
	});

	imageEl.on('load', function(e) {
		if(success) success();
	});
}

Poster.prototype._updateComment = function(postId, title) {
	var dsThread = $('<div />');
	dsThread.attr('data-thread-key', postId);
	dsThread.attr('data-title', title);
	dsThread.attr('data-url', location.href);
	DUOSHUO.EmbedThread(dsThread[0]);
	
	this.commentEl.html(dsThread);
}
