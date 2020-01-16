

(function () {
	var i;
	var AND_LINK_TEXT = " and ";
	var REACTIONS_LINK_TEXT = {
		zero: "",
		one: "1 Reaction",
		multiple: "{num} Reactions"
	};

	// find disqus nodes.
	var tagname = 'a';
	var nodes = document.getElementsByTagName(tagname);
	var disqus_nodes = [];

    if (tagname === 'span') {
        var _node_is_disqus = function(node) { return (node.className.indexOf('dsq-postid') >= 0); }
    } else {
        var _node_is_disqus = function(node) { return (node.href.indexOf('#disqus_thread') >= 0); }
    };
	
	for (i = 0; i < nodes.length; i++) {
		try {
		    if (_node_is_disqus(nodes[i])) {
				disqus_nodes.push(nodes[i]);
			}
		} catch(e) {
			// IE does not like URLs that are not quoted properly
			// (e.g., http://disqus.com/%FOO) and will raise an "Invalid
			// Argument" when we try to access the "href" attribute on the
			// element.
		}
	}

	var num_replies = ''.split(',');
	var num_reactions = '' ? ''.split(',') : '';

	// replace with counts.
	var replies_count, reactions_count, link_text;
	for (i = 0; i < disqus_nodes.length; i++) {
		link_text = '';

		// build comment count text
		replies_count = parseInt(num_replies[i], 10);
		if (replies_count !== undefined && !isNaN(replies_count)) {
			if (replies_count > 1) {
				link_text += '{num} Comments'.replace('{num}', replies_count);
			} else if (replies_count) {
				link_text += '1 Comment'.replace('{num}', replies_count);
			} else {
				link_text += '0 Comments'.replace('{num}', replies_count);
			}
		}
		// build reaction count text
		if (num_reactions) {
			reactions_count = parseInt(num_reactions[i], 10);
			if (reactions_count !== undefined && !isNaN(reactions_count)) {
				if (reactions_count > 1 && REACTIONS_LINK_TEXT.multiple) {
					link_text += AND_LINK_TEXT + REACTIONS_LINK_TEXT.multiple.replace('{num}', reactions_count);
				} else if (reactions_count === 1 && REACTIONS_LINK_TEXT.one) {
					link_text += AND_LINK_TEXT + REACTIONS_LINK_TEXT.one.replace('{num}', reactions_count);
				} else if (REACTIONS_LINK_TEXT.zero) {
					link_text += AND_LINK_TEXT + REACTIONS_LINK_TEXT.zero.replace('{num}', reactions_count);
				}
			}
		}

		if (link_text) {
			try {
				disqus_nodes[i].innerHTML = link_text;
			} catch(e) {
				if (disqus_nodes[i].innerText) {
					disqus_nodes[i].innerText = link_text;
				}
			}
		}
	}
})();
