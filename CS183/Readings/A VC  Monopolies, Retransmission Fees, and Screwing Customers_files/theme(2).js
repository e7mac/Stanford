
    DISQUS.addBlocks('theme')(function ($d) {
        $d.blocks["relatedAvatar"] = function block_relatedAvatar ($globals, $locals) {

    var $h = new $d.Builder();

    var localScope = DISQUS.extend({}, $globals, $locals);
    with (localScope) {

$h.put("    \x3Cimg src\x3D\x22");
$h.put(($h.esc || function (s) { return s; })(avatar.cache));
$h.put("\x22 width\x3D\x22");
$h.put(($h.esc || function (s) { return s; })(width));
$h.put("\x22 height\x3D\x22");
$h.put(($h.esc || function (s) { return s; })(height));
$h.put("\x22\x3E");
return $h.compile();

}

};
$d.blocks["relatedThread"] = function block_relatedThread ($globals, $locals) {

    var $h = new $d.Builder();

    var localScope = DISQUS.extend({}, $globals, $locals);
    with (localScope) {

$h.put("    \x3Cli class\x3D\x22discovery\x2Dunit\x22\x3E        \x3Ca class\x3D\x22title\x22 href\x3D\x22");
$h.put(($h.esc || function (s) { return s; })(thread.link));
$h.put("#disqus_thread\x22 data\x2Dredirect\x3D\x22");
$h.put(($h.esc || function (s) { return s; })(thread.redirectUrl));
$h.put("\x22\x3E\x3Ch3 title\x3D\x22");
$h.put(thread.title);
$h.put("\x22\x3E");
$h.put(thread.title);
$h.put("\x3C/h3\x3E\x3C/a\x3E        \x3Ca class\x3D\x22avatar\x22 href\x3D\x22");
$h.put(($h.esc || function (s) { return s; })(thread.link));
$h.put("#disqus_thread\x22 data\x2Dredirect\x3D\x22");
$h.put(($h.esc || function (s) { return s; })(thread.redirectUrl));
$h.put("\x22\x3E\x3Cimg src\x3D\x22");
$h.put(($h.esc || function (s) { return s; })(urls.avatar.generic));
$h.put("\x22 alt\x3D\x22Default user\x22 data\x2Drole\x3D\x22discovery\x2Davatar\x22\x3E\x3C/a\x3E        \x3Ca class\x3D\x22top\x2Dcomment\x22 href\x3D\x22");
$h.put(($h.esc || function (s) { return s; })(thread.link));
$h.put("#disqus_thread\x22 data\x2Dredirect\x3D\x22");
$h.put(($h.esc || function (s) { return s; })(thread.redirectUrl));
$h.put("\x22 data\x2Drole\x3D\x22discovery\x2Dtop\x2Dcomment\x22\x3E\x3Cp\x3E\x3Cspan class\x3D\x22user\x22 data\x2Drole\x3D\x22discovery\x2Dtop\x2Dcomment\x2Dauthor\x22\x3E");
$h.put("\x3C/span\x3E \x26#8212\x3B \x3Cspan data\x2Drole\x3D\x22discovery\x2Dtop\x2Dcomment\x2Dsnippet\x22\x3E");
$h.put("\x3C/span\x3E\x3C/p\x3E\x3C/a\x3E    \x3C/li\x3E");
return $h.compile();

}

};
$d.blocks["relatedThreads"] = function block_relatedThreads ($globals, $locals) {

    var $h = new $d.Builder();

    var localScope = DISQUS.extend({}, $globals, $locals);
    with (localScope) {

$h.put("\x3Cdiv id\x3D\x22discovery\x22\x3E    \x3Cdiv id\x3D\x22discovery\x2Dnote\x22 style\x3D\x22display:none\x3B\x22\x3E\x3Cstrong\x3EThe new DISQUS Discovery box helps you find other vibrant discussions on the communities you love. Feedback? \x3C/strong\x3E \x3Ca href\x3D\x22https://www.surveymonkey.com/s/GHK872T\x22 target\x3D\x22_blank\x22\x3E\x3Cem\x3ELet us know.\x3C/em\x3E\x3C/a\x3E\x3C/div\x3E    \x3Cheader\x3E        \x3Cdiv id\x3D\x22discovery\x2Doptions\x22\x3E            \x3Ca href\x3D\x22#\x22 id\x3D\x22discovery\x2Dhelp\x22 data\x2Daction\x3D\x22discovery\x2Dhelp\x22\x3EWhat\x27s this?\x3C/a\x3E            \x3Ca href\x3D\x22#\x22 id\x3D\x22discovery\x2Dclose\x22 data\x2Daction\x3D\x22discovery\x2Dclose\x22 title\x3D\x22Close this box\x22\x3E\x26#10006\x3B\x3C/a\x3E        \x3C/div\x3E        \x3Ch2\x3EAlso on ");
$h.put(($h.esc || function (s) { return s; })(forum.name));
$h.put("\x3C/h2\x3E    \x3C/header\x3E    \x3Csection\x3E        \x3Cul\x3E            ");
$h.put("        \x3C/ul\x3E    \x3C/section\x3E\x3C/div\x3E");
return $h.compile();

}

};
    });

(function (window, undefined) {
var document = window.document, DISQUS = window.DISQUS;

DISQUS.registerActions = function () {
    /*jshint browser:true, white:true, undef:true, strict:true */
/*global $, DISQUS */

(function () {
    "use strict";
    var ref = window.document.referrer;
    var $feedback = $('#discovery-note a');
    var base = $feedback.attr('href');
    var url = DISQUS.serialize(base, {c: ref});
    $feedback.attr('href', url);
})();

};

}(this));
