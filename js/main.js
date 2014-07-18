var cur_index = 0;

var postList = [];

var popWin = null;

var tipWin = null;

function log(msg) {
	console.log(msg);
}

function initPostList(callback) {
	$.get('list.js', function(resp) {
		postList = JSON.parse(resp);
		callback();
	});
}

function showPostWithIndex(index) {
	var post = postList[index];

	updatePost('image/' + post.name + '.jpg', post.title, post.desc, post.date);
	
	if (index > 0) {
		$('.prev').attr('href', '#' + postList[index - 1].name);
	}
	else {
		$('.prev').attr('href', '#' + postList[0].name);
	}
	
	if (index < postList.length - 1) {
		$('.next').attr('href', '#' + postList[index + 1].name);
	}
	else {
		$('.next').attr('href', '#' + postList[postList.length - 1].name);
	}
}

function show404Page() {
	updatePost('image/NotFound.jpg', 'Not Found', 'Not Found', null);

	$('.prev').attr('href', '#' + postList[0].name);
	$('.next').attr('href', '#' + postList[0].name);
}

function showAboutPage() {
	updatePost('image/About.jpg', '关于', '一个涂鸦的集合', null);

	$('.prev').attr('href', '#' + postList[0].name);
	$('.next').attr('href', '#' + postList[0].name);
}

function showPostWithName(name) {
	for (var i = 0, len = postList.length; i < len; i++) {
		if (postList[i].name == name) {
			showPostWithIndex(i);
			
			return;
		}
	}
	
	show404Page();
}


// 路由
function handleHashChange(hash) {
    if ('' == hash) {
        showPostWithIndex(0);
    }
	else if ('#NotFound' == hash) {
		show404Page();
	}
	else if ('#About' == hash) {
		showAboutPage();
	}
    else if (hash.charAt(0) == '#') {
		var name = hash.substring(1, hash.length);
		showPostWithName(name);
	}
	else {
		error();
    }
}

function setTitle(title) {
	document.title = title + ' - All the Lost';
}

function updatePost(image, title, desc, date) {
	var dest_title = title ? title : '';
	var dest_desc = desc ? desc : '';
	var dest_img = image ? image : '';
	
	setTitle(dest_title);
	$('#title').text(dest_title);
	$('#desc').text(dest_desc);
	
	if ($('#pic').attr('src') != dest_img) {
		popWin.show(5000);
		updateImage(dest_img, function() {
			reloadComment(image.substring('image/'.length, image.lastIndexOf('.')), dest_title);
			popWin.hide();
		});
	}
}

function updateImage(dest_img, callback) {
	$('#pic').attr('src', dest_img);
	
	$('#pic').on('load', function(e) {
		if(callback) {
			callback();
		}
	});
}

function reloadComment(postId, title) {
	var dsThread = $('<div />');
	dsThread.attr('data-thread-key', postId);
	dsThread.attr('data-title', title);
	dsThread.attr('data-url', location.href);
	DUOSHUO.EmbedThread(dsThread[0]);
	
	$('.widget').html(dsThread);
}

function jumpto(hash) {
	window.location.href = '#' + hash;
}

$(function() {
	popWin = new PopWin($('#loading'));
	tipWin = new PopWin();

	$(document).on('keypress', function(e) {
		
	});
	
	// hash change event
    $(window).hashchange(function(){
        handleHashChange(location.hash);
    });
    
    initPostList(function() {
		 $(window).hashchange();
	})
   
});
