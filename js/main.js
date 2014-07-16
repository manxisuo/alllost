var img_sel;
var cur_index = 0;

function initSelector() {
	img_sel = $('#pic');
}

function log(msg) {
	console.log(msg);
}

function showPost() {
	img_sel.attr('src', 'image/' + cur_index + '.jpg');
	if (cur_index > 0) {
		$('.prev').attr('href', '#' + (cur_index - 1));
	}
	$('.next').attr('href', '#' + (cur_index + 1));
}

function showPostList() {
	
}

// 路由
function handleHashChange(hash) {
    if ('' == hash) {
        // showPostList();
        showPost(0);
    }
    else if (hash.charAt(0) == '#') {
		var index = hash.substring(1, hash.length);
		cur_index = parseInt(index);
		showPost();
	}
	else {
		error();
    }
}

$(function() {
	initSelector();
	
	// hash change event
    $(window).hashchange(function(){
        handleHashChange(location.hash);
    });
    
    $(window).hashchange();
});
