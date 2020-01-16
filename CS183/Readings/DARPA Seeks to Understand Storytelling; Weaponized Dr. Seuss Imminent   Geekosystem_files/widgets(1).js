STMBLPN=window.STMBLPN||{};
(function(){if(STMBLPN&&STMBLPN.hasHelperFunctions){return
}if(STMBLPN instanceof Array){var a=STMBLPN;
STMBLPN={};
STMBLPN.list=a
}STMBLPN.browser=function(){var b=navigator.userAgent;
return{ie:b.match(/MSIE\s([^;]*)/)}
}();
STMBLPN.trim=function(b){return b.replace(/^\s+|\s+$/g,"")
};
STMBLPN.byId=function(b){if(typeof b=="string"){return document.getElementById(b)
}return b
};
STMBLPN.loadStyleSheet=function(d,e,c){if(!STMBLPN.Namespace.loadingStyleSheet){STMBLPN.Namespace.loadingStyleSheet=true;
var b=document.createElement("link");
b.href=d;
b.rel="stylesheet";
b.type="text/css";
document.getElementsByTagName("head")[0].appendChild(b);
var f=setInterval(function(){var g=getStyle(c,"position");
if(g=="relative"){clearInterval(f);
f=null;
STMBLPN.Namespace.hasLoadedStyleSheet=true
}},50)
}};
STMBLPN.jsonP=function(c,e){var b=document.createElement("script");
var d=document.getElementsByTagName("head")[0];
b.type="text/javascript";
b.src=c;
d.insertBefore(b,d.firstChild);
e(b);
return b
};
STMBLPN.classes={has:function(b,d){return new RegExp("(^|\\s)"+d+"(\\s|$)").test(STMBLPN.byId(b).className)
},add:function(b,d){if(!this.has(b,d)){STMBLPN.byId(b).className=STMBLPN.trim(STMBLPN.byId(b).className)+" "+d
}},remove:function(b,d){if(this.has(b,d)){STMBLPN.byId(b).className=STMBLPN.byId(b).className.replace(new RegExp("(^|\\s)"+d+"(\\s|$)","g"),"")
}}};
STMBLPN.events={add:function(d,c,b){if(d.addEventListener){d.addEventListener(c,b,false)
}else{d.attachEvent("on"+c,function(){b.call(d,window.event)
})
}},remove:function(d,c,b){if(d.removeEventListener){d.removeEventListener(c,b,false)
}else{d.detachEvent("on"+c,b)
}},ready:function(b){/in/.test(document.readyState)?setTimeout("STMBLPN.events.ready("+b+")",9):b()
}};
STMBLPN.wasBadgeDataColleted=false;
STMBLPN.collectBadgeData=function(){try{if(!window._gat){return
}var k=window._gat._getTrackerByName()._getAccount();
if(k.indexOf("UA-XXXX")==0){k=window.pageTracker._getAccount()
}var d={utmn:(new Date()).getTime(),utmhn:document.location.hostname,utmt:"event",utmr:"http://www.stumbleupon.com/refer.php",utmp:document.location.pathname,utmac:k,url:document.URL,utmcc:""};
var b={__utma:true,__utmb:true,__utmc:true,__utmz:true};
var n=document.cookie.split(";");
for(var h=0;
h<n.length;
h++){var m=n[h].indexOf("=");
if(m==-1){continue
}var f=n[h].substring(0,m);
var j=n[h].substring(m);
if(b[f]===true){d.utmcc+=(d.utmcc?";":"")+f+"="+j
}}var g=[];
for(var c in d){g.push('"'+c+'": "'+String(d[c]).replace('"','\\"')+'"')
}return'{"type": "SU_BADGEMESSAGE", "params": {'+g.join(", ")+"}}"
}catch(l){}};
STMBLPN.createIframe=function(f,c,b){var d=document.createElement("iframe");
d.scrolling="no";
d.frameBorder="0";
d.setAttribute("allowTransparency","true");
d.style.overflow="hidden";
d.style.margin=0;
d.style.padding=0;
d.style.border=0;
d.src=f;
if(c){d.width=c
}if(b){d.height=b
}return d
};
STMBLPN.isNode=function(b){return(typeof Node==="object"?b instanceof Node:typeof b==="object"&&typeof b.nodeType==="number"&&typeof b.nodeName==="string")
};
STMBLPN.wasProcessLoaded=false;
STMBLPN.processWidgets=function(){STMBLPN.wasProcessLoaded=true;
var g=document.getElementsByTagName("su:badge");
if(g){var d=["layout","location","id","domain"];
var h=[];
for(var f=0;
f<g.length;
f++){var c=g[f];
var k={container:c,type:"badge"};
for(var e=0;
e<d.length;
e++){var b=c.getAttribute(d[e]);
if(b){k[d[e]]=b
}}h.push(new STMBLPN.Widget(k))
}for(var f=0;
f<h.length;
f++){h[f].render()
}STMBLPN.Widget.sendBadgeData()
}g=document.getElementsByTagName("su:follow");
if(g){var h=[];
for(var f=0;
f<g.length;
f++){var c=g[f];
var k={container:c,type:"follow"};
k.ref=c.getAttribute("ref");
if(!k.ref){continue
}var d=["layout","id","domain"];
for(var e=0;
e<d.length;
e++){var b=c.getAttribute(d[e]);
if(b){k[d[e]]=b
}}h.push(new STMBLPN.Widget(k))
}for(var f=0;
f<h.length;
f++){h[f].render()
}}};
STMBLPN.hasHelperFunction=true;
return true
})();
(function(){if(STMBLPN&&STMBLPN.Widget){return
}STMBLPN.Widget=function(a){this.init(a)
};
(function(){isHttps=window.location.protocol.match(/https/);
STMBLPN.Widget.sendBadgeData=function(){try{if(STMBLPN.wasBadgeDataColleted){return
}STMBLPN.wasBadgeDataColleted=true;
var a=STMBLPN.collectBadgeData();
if(!a){return
}top.postMessage(a,"http://www.stumbleupon.com")
}catch(b){}};
STMBLPN.Widget.NUMBER=0;
STMBLPN.Widget.prototype=function(){var b=(isHttps?"https:":"http:")+"//";
var c="/badge/embed/";
var a="/widgets/follow_badge.php";
var d="/widgets/get.php";
return{init:function(m){var l=this;
this._badgeNumber=++STMBLPN.Widget.NUMBER;
this.selfContainer=false;
this.domain=m.domain?m.domain.replace(/^\.+/g,""):"stumbleupon.com";
this.type=m.type||"badge";
this.layout=m.layout?parseInt(m.layout):1;
this.layout=this.layout||1;
this.id=m.id||"stmblpn-widget-"+this._badgeNumber;
this.container=m.container;
if(m.id){var n=STMBLPN.byId(m.id);
if(n){this.selfContainer=true
}}if(!this.container&&!this.selfContainer){document.write('<div id="'+this.id+'"></div>');
this.container=STMBLPN.byId(this.id)
}switch(this.type){case"badge":this.location=m.location||document.URL;
break;
case"follow":this.ref=m.ref;
break;
case"bestof":this.title=m.title||"";
this.request=[];
var o=["usernames","channels","topics","sites"];
for(var f=0;
f<o.length;
f++){var h=o[f];
if(!m[h]){continue
}var j=m[h];
if(typeof j=="object"&&j instanceof Array){for(var g=0;
g<j.length;
g++){this.request.push(h+"[]="+encodeURIComponent(j[g]))
}}else{this.request.push(h+"="+encodeURIComponent(j))
}}break
}return this
},render:function(){var h=this;
var i=this._getIframeSrc();
var g=this._getIframeDimensions();
var f=null;
var e=STMBLPN.createIframe(i,g.width,g.height);
e.id="iframe-"+this.id;
if(this.container&&STMBLPN.isNode(this.container)){f=this.container.parentNode
}if(this.selfContainer){STMBLPN.byId(this.id).appendChild(e)
}else{if(f){f.insertBefore(e,this.container)
}}if(this.container&&STMBLPN.isNode(this.container)){f.removeChild(this.container);
delete this.container
}return this
},_getIframeSrc:function(){if(this.type=="badge"){var e=(isHttps?"www.":"badge.");
return b+e+this.domain+c+this.layout+"/?url="+encodeURIComponent(this.location)
}else{if(this.type=="follow"){return b+"www."+this.domain+a+"?id="+this.ref+"&l="+this.layout
}else{if(this.type=="bestof"){return b+"www."+this.domain+d+"?"+this.request.join("&")+"&l="+this.layout+"&title="+encodeURIComponent(this.title)
}}}},_getIframeDimensions:function(){var e;
if(this.type=="badge"){e={1:{width:74,height:18},2:{width:65,height:18},4:{width:18,height:18},5:{width:50,height:60},6:{width:30,height:31},200:{width:108,height:22},310:{width:128,height:22}};
e[3]=e[2];
e[210]=e[200];
e[300]=e[200];
e[this.layout]=e[this.layout]||e[1];
return e[this.layout]
}else{if(this.type=="follow"){e={1:{width:154,height:21},2:{width:210,height:28},3:{width:160,height:105}};
e[this.layout]=e[this.layout]||e[1];
return e[this.layout]
}else{if(this.type=="bestof"){e={1:{width:300,height:250},2:{width:600,height:250},3:{width:160,height:600}};
e[this.layout]=e[this.layout]||e[1];
return e[this.layout]
}}}return{width:null,height:null}
}}
}()
})()
})();
(function(){if(STMBLPN.wasProcessLoaded==false){STMBLPN.wasProcessLoaded=true;
STMBLPN.events.ready(STMBLPN.processWidgets)
}if(STMBLPN.list){while(STMBLPN.list.length){new STMBLPN.Widget(STMBLPN.list.shift()).render()
}}})();