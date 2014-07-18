var cur_index = 0;

var postList = [];

var popWin = null;

var timer = -1;

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
	
	if (index < postList.length - 1) {
		$('.next').attr('href', '#' + postList[index + 1].name);
	}
}

function show404Page() {
	updatePost('image/NotFound.jpg', 'Not Found', 'Not Found', null);

	$('.prev').attr('href', '#' + postList[0].name);
	$('.next').attr('href', '#' + postList[0].name);
}

function showAboutPage() {
	updatePost('image/About.jpg', 'About', '一个涂鸦的集合', null);

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

function updatePost(image, title, desc, date) {
	var dest_title = title ? title : '';
	var dest_desc = desc ? desc : '';
	var dest_img = image ? image : '';
	
	$('#title').text(dest_title);
	$('#desc').text(dest_desc);
	
	if ($('#pic').attr('src') != dest_img) {
		$('#pic').attr('src', dest_img);
		clearTimeout(timer);
		popWin.show();
		timer = setTimeout(function() {
			popWin.hide();
		}, 5000);
	}
}


function jumpto(hash) {
	window.location.href = '#' + hash;
}

$(function() {
	popWin = new PopWin($('#loading'));

	$(document).on('keypress', function(e) {
		
	});

	$('#pic').on('load', function(e) {
		popWin.hide();
	});
	
	// popWin.hide();
	
	// hash change event
    $(window).hashchange(function(){
        handleHashChange(location.hash);
    });
    
    initPostList(function() {
		 $(window).hashchange();
	})
   
});
