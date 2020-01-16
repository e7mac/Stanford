// GOOGLE ANALYTICS
var _gaq = [['_setAccount', 'UA-12283289-1'], ['_trackPageview']];
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = (document.location.protocol == 'https:' ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
function recordOutboundLink(link, category, action) {
  _gat._getTrackerByName()._trackEvent(category, action);
  setTimeout('document.location = "' + link.href + '"', 100);
}

// CHARTBEAT
var _sf_async_config = {uid: 3557, domain: 'geekosystem.com'};
$(document).ready(function() {
  var u = (document.location.protocol == 'https:' ? 'https://s3.amazonaws.com/' : 'http://') + 'static.chartbeat.com/js/chartbeat.js';
  var e = $('<script/>').attr('type', 'text/javascript').attr('src', u);
  $('body').append(e);
});

// MEEBO INIT
window.Meebo||function(c){function p(){return["<",i,' onload="var d=',g,";d.getElementsByTagName('head')[0].",
j,"(d.",h,"('script')).",k,"='//cim.meebo.com/cim?iv=",a.v,"&",q,"=",c[q],c[l]?
"&"+l+"="+c[l]:"",c[e]?"&"+e+"="+c[e]:"","'\"></",i,">"].join("")}var f=window,
a=f.Meebo=f.Meebo||function(){(a._=a._||[]).push(arguments)},d=document,i="body",
m=d[i],r;if(!m){r=arguments.callee;return setTimeout(function(){r(c)},100)}a.$=
{0:+new Date};a.T=function(u){a.$[u]=new Date-a.$[0]};a.v=5;var j="appendChild",
h="createElement",k="src",l="lang",q="network",e="domain",n=d[h]("div"),v=n[j](d[h]("m")),
b=d[h]("iframe"),g="document",o,s=function(){a.T("load");a("load")};f.addEventListener?
f.addEventListener("load",s,false):f.attachEvent("onload",s);n.style.display="none";
m.insertBefore(n,m.firstChild).id="meebo";b.frameBorder="0";b.name=b.id="meebo-iframe";
b.allowTransparency="true";v[j](b);try{b.contentWindow[g].open()}catch(w){c[e]=
d[e];o="javascript:var d="+g+".open();d.domain='"+d.domain+"';";b[k]=o+"void(0);"}try{var t=
b.contentWindow[g];t.write(p());t.close()}catch(x){b[k]=o+'d.write("'+p().replace(/"/g,
'\\"')+'");d.close();'}a.T(1)}({network:"geekosystem"});

// MEEBO CONFIG
Meebo('addButton', {
  id: 'meebo_random',
  type: 'action',
  icon: bloginfo.template_directory + '/images/icon-random.png',
  label: 'Random Post',
  onClick: function() {
    window.location = bloginfo.url + '/random/';
  }
});
Meebo('addButton', {
  id: 'meebo_reddit',
  type: 'action',
  icon: bloginfo.template_directory + '/images/icon-reddit.png',
  label: 'Reddit',
  onClick: function() {
    window.location = 'http://www.reddit.com/submit?url=' + encodeURIComponent(window.location) + '&title=' + document.title;
  }
});
Meebo('setDefaultThumbnail', {thumbnail: bloginfo.template_directory + '/images/logo-smallsquare.png', height: 80, width: 80});
$(document).ready(function() { Meebo('domReady'); });

// FLASH WMODE FIX (needed for proper Meebo display)
function fix_flash_wmode() {
  if (!$.browser.mozilla) return false;
  $('param[name="wmode"]').remove();
  $('object').each(function() {
    $('<param/>').attr('name', 'wmode').attr('value', 'transparent').appendTo(this);
    $(this).clone().appendTo($(this).parent());
    $(this).remove();
  });
  $('embed').each(function() {
    $(this).attr({'wmode': 'transparent'});
    $(this).clone().appendTo($(this).parent());
    $(this).remove();
  });
}

// ARRAY SHUFFLE
function array_shuffle(in_array) {
  var out_array = [];
  while (in_array.length > 0) out_array.push(in_array.splice(Math.random() * in_array.length, 1));
  return out_array;
}