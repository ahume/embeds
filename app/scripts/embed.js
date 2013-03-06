define(function() {

	var count = 0;

	function embedDone(id) {
        setTimeout(function() {
            resizeIframe(id);
        }, 1000);
    }

    function enhance() {
	    var embeds = document.querySelectorAll('iframe.api-embed:not(.api-embed-polyfilled)');

	    for (var i = 0, j = embeds.length; i<j; ++i) {
	        var id = 'embed-iframe-' + count++;
	        var iframe = embeds[i];
	        iframe.id = id;
	        var supportsSrcdoc = iframe.srcdoc;
	        var src = iframe.getAttribute('srcdoc');
	        src += '<script>window.parent.embedDone("' + id + '");<' + '/script>';

	        if (!supportsSrcdoc) {
	        	iframe.contentWindow.document.write(src);
	        } else {
	        	iframe.srcdoc = src;
	        }

	        iframe.className = iframe.className + ' api-embed-polyfilled';
	    }
	}

	function resizeIframe(id) {
	    var iframe = document.getElementById(id)
	    var b = iframe.contentWindow.document.body;
	    b.style.padding = 0;
	    b.style.margin = 0;
	    var height = iframe.contentWindow.document.height || iframe.contentWindow.document.body.offsetHeight;
	    iframe.style.height = height + 'px';
	}



	return {
		embedDone: embedDone,
		enhance: enhance
	}


})