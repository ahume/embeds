define(function() {

	var count = 0;

	function embedDone(id, wait) {
		console.log(id);
		setTimeout(function() {
			resizeIframe(id);
		}, (wait || 0));
    }

    function enhance() {
	    var embeds = document.querySelectorAll('iframe.api-embed:not(.api-embed-polyfilled)');
	    console.log(embeds);
	    for (var i = 0, j = embeds.length; i<j; ++i) {
	        var id = 'embed-iframe-' + ++count;
	        var iframe = embeds[i];
	        iframe.id = id;
	        var supportsSrcdoc = iframe.srcdoc;
	        var src = iframe.getAttribute('srcdoc')

	        if (!supportsSrcdoc) {
	        	src += '<script>window.parent.embedDone("' + id + '", 1000);<' + '/script>';
	        	iframe.contentWindow.document.write(src);
	        } else {
	        	if (iframe.contentWindow.document.readyState === 'complete') {
	        		embedDone(id);
	        	} else {
	        		var thisid = id;
	        		iframe.addEventListener('load', function() {
	        			embedDone(thisid);
	        		}, false);
	        	}
	        }

	        iframe.className = iframe.className + ' api-embed-polyfilled';
	    }
	}

	function resizeIframe(id) {
	    var iframe = document.getElementById(id);
	    var b = iframe.contentWindow.document.body;
	    b.style.padding = 0;
	    b.style.margin = 0;
	    var height = iframe.contentWindow.document.height || iframe.contentWindow.document.body.offsetHeight;
	    console.log(height);
	    iframe.style.height = height + 'px';
	}



	return {
		embedDone: embedDone,
		enhance: enhance
	}


})