$(function() {
	var emojiDOM = '';
	for(var i=0;i<emoji.length;i++) {
        var item = emoji[i]
        emojiDOM += '<li><a href="javascript:;"><img src="' + item.path + '" alt="" title="'+item.name+'" class="js_emoji_gif"></a></li>'
    }
    $('.emoji').html(emojiDOM)

	$('.js_logo_emoji').click(function(e) {
		e.stopPropagation()
		$('.emoji').toggleClass('hidden')
	})

	$(document).click(function() {
		$('.emoji').addClass('hidden')
	})

	$(document).on('click', '.js_emoji_gif', function() {
		var emoji = $(this).attr('src')
        $("#editor").focus();
        var source = '<img src="'+emoji+'">';
        insertDom(source);
	})

	$('.js_send').click(function() {
		send()
	})

	$(document).on('keyup', '#editor', function(e) {
        if (e.ctrlKey && e.keyCode == 13) {
            console.log('Ctrl + Enter...')
            insertDom('<div><br></div>')
        }else if (e.keyCode == 13) {
            console.log('Enter...')
            send()
        }
    })
})

function send() {
	var editor = $('#editor')
	var content = editor.html()
		.replace(/<div><br><\/div>/g, '\n')
		.replace(/<\/div>/g, '\n')
		.replace(/<div>/g, '\n')
		.trim()
	
	if(!content) {
		console.log('请输入内容！');
	}else {
		console.log('send: ' + content)
		var speak = $('<div class="right"><span>NAME</span> <pre>' + content + '</pre></div>')
		$('.show').append(speak)
		speak.get(0).scrollIntoView(true)	//使聊天内容出现在可视区
	}
	editor.html('');

}

function insertDom(str){
	document.getElementById('editor').focus();
    var selection= window.getSelection ? window.getSelection() : document.selection;
    var range= selection.createRange ? selection.createRange() : selection.getRangeAt(0);
    if (!window.getSelection){
        range.pasteHTML(str);
        range.collapse(false);
        range.select();
    }
    else{
        range.collapse(false);
        var hasR = range.createContextualFragment(str);
        var hasR_lastChild = hasR.lastChild;
        while (hasR_lastChild && 
        	hasR_lastChild.nodeName.toLowerCase() == "br" && 
        	hasR_lastChild.previousSibling && 
        	hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br"
        ) {
            var e = hasR_lastChild;
            hasR_lastChild = hasR_lastChild.previousSibling;
            hasR.removeChild(e)
        }
        range.insertNode(hasR);
        if (hasR_lastChild) {
            range.setEndAfter(hasR_lastChild);
            range.setStartAfter(hasR_lastChild)
        }
        selection.removeAllRanges();
        selection.addRange(range)
    }
}



