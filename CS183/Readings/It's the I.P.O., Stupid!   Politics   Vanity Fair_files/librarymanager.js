if(typeof CQClientLibraryManager=="undefined"){CQClientLibraryManager={debug:false,scripts:{},initialInclude:true,windowLoaded:false,contextPath:null,hook:null,channelCB:function(){return""
},setChannelCB:function(A){this.channelCB=A
},isDebug:function(B){var A=document.location.href;
return(typeof console!="undefined")&&(B||this.debug)&&A.indexOf("debugConsole=true")!=-1
},write:function(A,C){C=this.isDebug(C);
var E=this.channelCB();
if(!E){E="default"
}if(C){console.log("LibraryManager: detected channel: "+E)
}for(var D=0;
D<A.length;
D++){var B=A[D];
if(!this.scripts[B.p]){this.scripts[B.p]=B;
if(C){console.log("LibraryManager: processing script",B.p,B)
}if(this.isIncluded(E,B.c,C)){this.includeScript(B.p,C)
}}}},isIncluded:function(G,A,B){if(A.length==0){if(B){console.log("LibraryManager: ...accepted. no channels defined")
}return true
}var F="!"+G;
var E=false;
var D=0;
for(var C=0;
C<A.length;
C++){var H=A[C];
if(H.charAt(0)=="!"){if(H==F){if(B){console.log("LibraryManager: ...rejected. channel excluded: ",H)
}return false
}}else{if(H==G){if(B){console.log("LibraryManager: ...accepted. channel included: ",H)
}E=true
}D++
}}if(D==0){if(B){console.log("LibraryManager: ...accepted. no more channels after exclusion ")
}E=true
}if(!E&&B){console.log("LibraryManager: ...rejected.")
}return E
},includeScript:function(path,debug){var ext=path;
var idx=ext.indexOf("?");
if(idx>0){ext=ext.substring(0,idx)
}ext=ext.substring(ext.lastIndexOf(".")+1);
if(this.initialInclude){this.initialInclude=false;
if(typeof CQ_XHR_HOOK!="undefined"&&Object.prototype.toString.call(CQ_XHR_HOOK)==="[object Function]"){this.hook=CQ_XHR_HOOK
}this.contextPath=this.detectContextPath();
var man=this;
if(window.addEventListener){window.addEventListener("load",function(){man.windowLoaded=true
},false)
}else{if(window.attachEvent){window.attachEvent("onload",function(){man.windowLoaded=true
})
}}}if(this.hook){var p={url:path,method:"GET"};
try{var out=CQ_XHR_HOOK(p);
if(out){path=out.url
}}catch(e){if(debug){console.log("LibraryManager: error during CQ_XHR_HOOK call: ",e.message)
}}}if(this.contextPath){if(path.indexOf("/")==0&&path.indexOf(this.contextPath+"/")!=0){path=this.contextPath+path
}}if(ext=="js"){if(debug){console.log("LibraryManager: --> writing js include: ",path)
}if(this.windowLoaded){try{var request=document.all?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();
request.open("GET",path,false);
request.send(null);
if(window.execScript){window.execScript(request.responseText)
}else{eval.call(null,request.responseText)
}}catch(err){if(debug){console.log("LibraryManager: --> evaluating js include failed: ",path)
}}}else{document.writeln('<script src="'+path+'" type="text/javascript"><\/script>')
}}else{if(ext=="css"){var head=document.getElementsByTagName("head")||document.getElementsByTagName("*");
head=head[0];
var n=document.createElement("link");
n.type="text/css";
n.rel="stylesheet";
n.href=path;
head.appendChild(n);
if(debug){console.log("LibraryManager: --> writing css include: ",path)
}}else{if(debug){console.log("LibraryManager: --> unsupported extension: ",path)
}}}},detectContextPath:function(){var A=document.getElementsByTagName("script");
var C=/\/etc\/clientlibs\/foundation\/librarymanager\/*\.js$/;
for(var B=0;
B<A.length;
B++){var D=A[B].src;
if(D.indexOf("?")>=0){D=D.substring(0,D.indexOf("?"))
}if(D.match(C)){D=D.replace(/.*\:[\/][\/]/,"");
D=D.substring(D.indexOf("/"));
D=D.replace(C,"");
this.contextPath=D;
break
}}}}
}CQClientLibraryManager.setChannelCB(function(){var A=[{channel:"ie6",match:"MSIE 6."},{channel:"touch",match:"iPhone"},{channel:"touch",match:"iPad"}];
var C=navigator.userAgent;
for(var B=0;
B<A.length;
B++){var D=A[B];
if(C.indexOf(D.match)>=0){return D.channel
}}return""
});