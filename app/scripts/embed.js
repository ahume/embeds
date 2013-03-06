define(function() {

	var count = 0;

	function done(id, wait) {
		setTimeout(function() {
			resizeIframe(id);
		}, (wait || 0));
    }

    function enhance() {
    	// Get all embed iframes that have not been fully rendered yet.
	    var embeds = document.querySelectorAll('iframe.api-embed:not(.api-embed-polyfilled)');

	    for (var i = 0, j = embeds.length; i<j; ++i) {
	        var iframe = embeds[i];

	        // If we don't set this to 0 the body measurements later will never be < 180ish.
	        iframe.style.height = 0;

	        // Create an ID to track the iframe from other modules.
	        var id = 'embed-iframe-' + ++count;
	        iframe.id = id;

	        var supportsSrcdoc = !!iframe.srcdoc;

	        // If there's no srcdoc support, grab the code from the attribue and write it in to the iframe.
	        if (!supportsSrcdoc) {
	        	var src = iframe.getAttribute('srcdoc') + '<script>window.parent.GuardianEmbedDone("' + id + '", 1000);<' + '/script>';
	        	iframe.contentWindow.document.write(src);
	        } else {
	        	if (iframe.contentWindow.document.readyState === 'complete') {
	        		done(id);
	        	} else {
	        		var thisid = id;
	        		iframe.addEventListener('load', function() {
	        			done(thisid);
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
	    iframe.style.height = height + 'px';
	}

	window.GuardianEmbedDone = done;

	return {
		enhance: enhance
	}


})