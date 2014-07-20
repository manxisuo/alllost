var POST_SOURCE_URL = 'list.js';

var IMAGE_DIR = 'image/';

var COMMON_IMAGE_DIR = '../image/';

var CONTEXT = 'sphere';

var poster = null;

function initPostList(callback) {
	$.get(POST_SOURCE_URL, function(resp) {
		var postList = JSON.parse(resp);
		callback(postList);
	});
}

function getImageUrl(post) {
	return IMAGE_DIR + post.name + '.jpg';
}

// 路由
function handleHashChange(hash) {
    if ('' == hash) {
        poster.showPost(0);
    }
	else if ('#NotFound' == hash) {
		poster.show404Page();
	}
	else if ('#About' == hash) {
		poster.showAboutPage();
	}
    else if (isValidHash(hash)) {
		var index = parseInt(hash.substring(1, hash.length));
		poster.showPost(index);
	}
	else {
		poster.show404Page();
    }
}

$(function() {
	// hash change event
    $(window).hashchange(function(){
        handleHashChange(location.hash);
    });
    
    initPostList(function(postList) {
		poster = new Poster(postList, new Pager($('.prev'), $('.next')));
		poster.init({
			titleEl: $('#title'),
			descEl: $('#desc'),
			dateEl: $('#date'),
			imageEl: $('#pic'),
			commentEl: $('.widget'),
			popWin: new PopWin($('#loading')),
			imageDir: IMAGE_DIR,
			commonImageDir: COMMON_IMAGE_DIR,
			context: CONTEXT
		});
		
		poster.addKeydownSupport();
	
		$(window).hashchange();
	})
});
