// facebook minified - allows count to be displayed and allows liking without leaving the site.
(function(a,b,c){var d,e=a.getElementsByTagName(b)[0];if(a.getElementById(c))return;d=a.createElement(b);d.id=c;d.src="//connect.facebook.net/en_US/all.js#xfbml=1";e.parentNode.insertBefore(d,e)})(document,"script","facebook-jssdk");
// twitter - used for at least opening a new window
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
// might as well use jquery to do this stuff since it only works with javascript on anyway
// get the facebook url
//var fbhref = $('#soc-facebook a').attr('href');
// add facebook's root element
//$('#social').prepend('<div id="fb-root"></div>');
// add facebook's container element
//$('#soc-facebook').prepend('<div class="fb-like" data-layout="button_count"></div>');
// add facebook's url
//$('#soc-facebook .fb-like').attr('data-href', fbhref);
// get rid of the non-javascript fallback element
//$('#soc-facebook a').remove('a');
// get rid of the styling
//$('#soc-facebook').removeClass('soc-item');
// add attributes to make the twitter link work
//$('#soc-twitter a').attr({
//	'class': 'twitter-follow-button',
//	'data-show-count': 'false',
//	'data-show-screen-name': 'false'
//});
// get rid of the styling
//$('#soc-twitter').removeClass('soc-item');

