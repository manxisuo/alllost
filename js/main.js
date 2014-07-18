var cur_index = 0;

var postList = [];

var popWin = null;

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
	
	content.update('image/' + post.name + '.jpg', post.title, post.desc, post.date);
	
	if (index > 0) {
		$('.prev').attr('href', '#' + postList[index - 1].name);
	}
	
	if (index < postList.length - 1) {
		$('.next').attr('href', '#' + postList[index + 1].name);
	}
}

function show404Page() {
	content.update('image/NotFound.jpg', 'Not Found', 'Not Found', null);

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
        // showPostList();
        showPostWithIndex(0);
    }
    else if (hash.charAt(0) == '#') {
		var name = hash.substring(1, hash.length);
		showPostWithName(name);
	}
	else {
		error();
    }
}

var content = {
	title: '',
	desc: '',
	date: '',
	image: '',
	update: function(image, title, desc, date) {
		this.title = title ? title : '';
		this.desc = desc ? desc : '';
		this.date = date ? date : '';
		this.image = image ? image : '';
		this._reload();
	},
	_reload: function() {
		$('#title').text(this.title);
		$('#desc').text(this.desc);
		$('#pic').attr('src', this.image);
		popWin.show();
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
