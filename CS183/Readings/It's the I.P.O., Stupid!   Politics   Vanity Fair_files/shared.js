window.CQ=window.CQ||{};
CQ.shared={};
if(window.console===undefined){window.console={log:function(A){}}
}CQ.shared.HTTP=new function(){var createResponse=function(){var response=new Object();
response.headers=new Object();
response.body=new Object();
return response
};
var getResponseFromXhr=function(request){if(!request){return null
}var response=createResponse();
response.body=request.responseText;
response.headers[CQ.shared.HTTP.HEADER_STATUS]=request.status;
response.responseText=request.responseText;
response.status=request.status;
return response
};
var contextPath=null;
var SCRIPT_URL_REGEXP=/\/etc\/clientlibs\/foundation\/shared.*\.js$/;
var ENCODE_PATH_REGEXP=/[^\w-\.!~\*'\(\)\/%;:@&=\$,]/;
return{EXTENSION_HTML:".html",EXTENSION_JSON:".json",EXTENSION_RES:".res",HEADER_STATUS:"Status",HEADER_MESSAGE:"Message",HEADER_LOCATION:"Location",HEADER_PATH:"Path",PARAM_NO_CACHE:"cq_ck",get:function(url,callback,scope){url=CQ.shared.HTTP.externalize(url,true);
if(typeof CQ_XHR_HOOK!="undefined"&&$CQ.isFunction(CQ_XHR_HOOK)){var p={url:url,method:"GET"};
var out=CQ_XHR_HOOK(p);
if(out){url=out.url
}}if(callback!=undefined){return $CQ.ajax({type:"GET",url:url,complete:function(request,textStatus){var response=getResponseFromXhr(request);
callback.call(scope||this,this,textStatus=="success",response)
}})
}else{try{var request=$CQ.ajax({type:"GET",url:url,async:false});
return getResponseFromXhr(request)
}catch(e){return null
}}},post:function(url,callback,params,scope){url=CQ.shared.HTTP.externalize(url,true);
if(typeof CQ_XHR_HOOK!="undefined"&&$CQ.isFunction(CQ_XHR_HOOK)){var p={url:url,method:"POST",params:params};
var out=CQ_XHR_HOOK(p);
if(out){url=out.url;
params=out.params
}}if(callback!=undefined){return $CQ.ajax({type:"POST",url:url,data:params,complete:function(request,textStatus){var response=CQ.shared.HTTP.buildPostResponseFromHTML(request.responseText);
callback.call(scope||this,this,textStatus=="success",response)
}})
}else{try{var request=$CQ.ajax({type:"POST",url:url,data:params,async:false});
return CQ.shared.HTTP.buildPostResponseFromHTML(request.responseText)
}catch(e){return null
}}},getParameter:function(url,name){var params=CQ.shared.HTTP.getParameters(url,name);
return params!=null?params[0]:null
},getParameters:function(url,name){var values=[];
if(!name){return null
}name=encodeURIComponent(name);
if(url.indexOf("?")==-1){return null
}var query=url.substring(url.indexOf("?")+1);
if(query.indexOf(name)==-1){return null
}var queryPts=query.split("&");
for(var i=0;
i<queryPts.length;
i++){var paramPts=queryPts[i].split("=");
if(paramPts[0]==name){values.push(paramPts.length>1?decodeURIComponent(paramPts[1]):"")
}}return values.length>0?values:null
},addParameter:function(url,name,value){if(value&&value instanceof Array){for(var i=0;
i<value.length;
i++){url=CQ.shared.HTTP.addParameter(url,name,value[i])
}return url
}var separator=url.indexOf("?")==-1?"?":"&";
var hashIdx=url.indexOf("#");
if(hashIdx<0){return url+separator+encodeURIComponent(name)+"="+encodeURIComponent(value)
}else{var hash=url.substring(hashIdx);
url=url.substring(0,hashIdx);
return url+separator+encodeURIComponent(name)+"="+encodeURIComponent(value)+hash
}},setParameter:function(url,name,value){url=CQ.shared.HTTP.removeParameter(url,name);
return CQ.shared.HTTP.addParameter(url,name,value)
},removeParameter:function(url,name){var pattern0="?"+encodeURIComponent(name)+"=";
var pattern1="&"+encodeURIComponent(name)+"=";
var pattern;
if(url.indexOf(pattern0)!=-1){pattern=pattern0
}else{if(url.indexOf(pattern1)!=-1){pattern=pattern1
}else{return url
}}var indexCutStart=url.indexOf(pattern);
var begin=url.substring(0,indexCutStart);
var indexCutEnd=url.indexOf("&",indexCutStart+1);
var end="";
if(indexCutEnd!=-1){end=url.substring(indexCutEnd);
if(end.indexOf("&")==0){end.replace("&","?")
}}return begin+end
},removeParameters:function(url){if(url.indexOf("?")!=-1){return url.substring(0,url.indexOf("?"))
}return url
},addSelector:function(url,selector,index){if(!index){index=0
}var post="";
var pIndex=url.indexOf("?");
if(pIndex==-1){pIndex=url.indexOf("#")
}if(pIndex!=-1){post=url.substring(pIndex);
url=url.substring(0,pIndex)
}var sIndex=url.lastIndexOf("/");
var main=url.substring(sIndex);
if(main.indexOf("."+selector+".")==-1){var path=url.substring(0,sIndex);
var obj=main.split(".");
var newMain="";
var delim="";
if(index>obj.length-2||index==-1){index=obj.length-2
}for(var i=0;
i<obj.length;
i++){newMain+=delim+obj[i];
delim=".";
if(index==i){newMain+=delim+selector
}}return path+newMain+post
}else{return url
}},setSelector:function(url,selector,index){var post="";
var pIndex=url.indexOf("?");
if(pIndex==-1){pIndex=url.indexOf("#")
}if(pIndex!=-1){post=url.substring(pIndex);
url=url.substring(0,pIndex)
}var selectors=CQ.shared.HTTP.getSelectors(url);
var ext=url.substring(url.lastIndexOf("."));
url=url.substring(0,url.lastIndexOf("."));
var fragment=(selectors.length>0)?url.replace("."+selectors.join("."),""):url;
if(selectors.length>0){for(var i=0;
i<selectors.length;
i++){if(index==i){fragment+="."+selector
}else{fragment+="."+selectors[i]
}}}else{fragment+="."+selector
}return fragment+ext+post
},getAnchor:function(url){if(url.indexOf("#")!=-1){return url.substring(url.indexOf("#")+1)
}return""
},setAnchor:function(url,anchor){return CQ.shared.HTTP.removeAnchor(url)+"#"+anchor
},removeAnchor:function(url){if(url.indexOf("#")!=-1){return url.substring(0,url.indexOf("#"))
}return url
},noCaching:function(url){return CQ.shared.HTTP.setParameter(url,CQ.shared.HTTP.PARAM_NO_CACHE,new Date().valueOf())
},buildPostResponseFromNode:function(node,response){if(!node){return null
}if(response==undefined){response=createResponse()
}for(var i=0;
i<node.childNodes.length;
i++){var child=node.childNodes[i];
if(child.tagName){if(child.id){if(child.href){response.headers[child.id]=child.href
}else{response.headers[child.id]=child.innerHTML
}}response=CQ.shared.HTTP.buildPostResponseFromNode(child,response)
}}return response
},buildPostResponseFromHTML:function(html){var response=createResponse();
try{if(html.responseText!=undefined){html=html.responseText
}else{if(typeof html!="string"){html=html.toString()
}}var div=document.createElement("div");
div.innerHTML=html;
response=CQ.shared.HTTP.buildPostResponseFromNode(div,response);
div=null
}catch(e){}return response
},getCookie:function(name){var cname=encodeURIComponent(name)+"=";
var dc=document.cookie;
if(dc.length>0){var begin=dc.indexOf(cname);
if(begin!=-1){begin+=cname.length;
var end=dc.indexOf(";",begin);
if(end==-1){end=dc.length
}return decodeURIComponent(dc.substring(begin,end))
}}return null
},setCookie:function(name,value,path,days,domain,secure){if(typeof (days)!="number"){days=7
}var date;
if(days>0){date=new Date();
date.setTime(date.getTime()+(days*24*60*60*1000))
}else{date=new Date(1970,0,1)
}document.cookie=encodeURIComponent(name)+"="+encodeURIComponent(value)+"; "+(days!=0?"expires="+date.toGMTString()+"; ":"")+(domain?"domain="+domain+"; ":"")+(path?"path="+path:"")+(secure?"; secure":"");
return value
},clearCookie:function(name,path,domain,secure){CQ.shared.HTTP.setCookie(name,"null",path||"",-1,domain||"",secure||"")
},getSchemeAndAuthority:function(url){try{if(url.indexOf("://")==-1){return""
}var end=url.indexOf("/",url.indexOf("://")+3);
if(end==-1){return url
}return url.substring(0,end)
}catch(e){return""
}},getContextPath:function(){return contextPath
},detectContextPath:function(){try{if(typeof CQ.CONTEXT_PATH!="undefined"){contextPath=CQ.CONTEXT_PATH
}else{if(typeof CQ_CONTEXT_PATH!="undefined"){contextPath=CQ_CONTEXT_PATH
}else{var scripts=document.getElementsByTagName("script");
for(var i=0;
i<scripts.length;
i++){var path=scripts[i].src;
if(path.indexOf("?")>=0){path=path.substring(0,path.indexOf("?"))
}if(SCRIPT_URL_REGEXP.test(path)){path=path.replace(/.*\:[\/][\/]/,"");
path=path.substring(path.indexOf("/"));
path=path.replace(SCRIPT_URL_REGEXP,"");
contextPath=path;
break
}}}}}catch(e){}},externalize:function(url,encode){if(encode){url=CQ.shared.HTTP.encodePathOfURI(url)
}try{if(url.indexOf("/")==0&&contextPath&&url.indexOf(contextPath+"/")!=0){url=contextPath+url
}}catch(e){}return url
},internalize:function(url,doc){if(!doc){doc=document
}var docHost=CQ.shared.HTTP.getSchemeAndAuthority(doc.location.href);
var urlHost=CQ.shared.HTTP.getSchemeAndAuthority(url);
if(docHost==urlHost){return url.substring(urlHost.length+contextPath.length)
}else{return url
}},getPath:function(url){url=url||window.location.href;
url=CQ.shared.HTTP.internalize(url);
url=CQ.shared.HTTP.removeParameters(url);
url=CQ.shared.HTTP.removeAnchor(url);
var i=url.indexOf(".",url.lastIndexOf("/"));
if(i!=-1){url=url.substring(0,url.indexOf(".",url.lastIndexOf("/")))
}return url
},getSelectors:function(url){var selectors=[];
url=CQ.shared.HTTP.removeParameters(url);
url=CQ.shared.HTTP.removeAnchor(url);
var fragment=url.substring(url.lastIndexOf("/"));
if(fragment){var split=fragment.split(".");
if(split.length>2){for(var i=0;
i<split.length;
i++){if(i>0&&i<split.length-1){selectors.push(split[i])
}}}}return selectors
},getExtension:function(url){url=CQ.shared.HTTP.removeParameters(url);
url=CQ.shaerd.HTTP.removeAnchor(url);
var pos=url.lastIndexOf(".");
if(pos<0){return""
}url=url.substring(pos+1);
pos=url.indexOf("/");
if(pos<0){return url
}return url.substring(0,pos)
},encodePathOfURI:function(url){var parts,delim;
if(url.indexOf("?")!=-1){parts=url.split("?");
delim="?"
}else{if(url.indexOf("#")!=-1){parts=url.split("#");
delim="#"
}else{parts=[url]
}}if(ENCODE_PATH_REGEXP.test(parts[0])){parts[0]=CQ.shared.HTTP.encodePath(parts[0])
}return parts.join(delim)
},encodePath:function(path){path=encodeURI(path);
path=path.replace(/\+/g,"%2B");
path=path.replace(/\?/g,"%3F");
path=path.replace(/;/g,"%3B");
path=path.replace(/#/g,"%23");
path=path.replace(/=/g,"%3D");
path=path.replace(/\$/g,"%24");
path=path.replace(/,/g,"%2C");
path=path.replace(/'/g,"%27");
path=path.replace(/"/g,"%22");
return path
},eval:function(response){if(typeof response!="object"){response=CQ.shared.HTTP.get(response)
}try{return eval("("+(response.body?response.body:response.responseText)+")")
}catch(e){}return null
},isOkStatus:function(status){try{return(new String(status).indexOf("2")==0)
}catch(e){return false
}},isOk:function(response){try{return CQ.shared.HTTP.isOkStatus(response.headers[CQ.shared.HTTP.HEADER_STATUS])
}catch(e){return false
}}}
};
CQ.shared.Util=new function(){return{reload:function(C,A,B){if(!C){C=window
}if(!A){A=CQ.shared.HTTP.noCaching(C.location.href)
}if(typeof CQ_RELOAD_HOOK!="undefined"&&$.isFunction(CQ_RELOAD_HOOK)){A=CQ_RELOAD_HOOK(A)||A
}if(B){C.location.replace(A)
}else{C.location.href=A
}},load:function(A,B){CQ.shared.Util.reload(window,A,B)
},open:function(C,D,B,A){if(!D){D=window
}if(!C){return 
}if(typeof CQ_RELOAD_HOOK!="undefined"&&$.isFunction(CQ_RELOAD_HOOK)){C=CQ_RELOAD_HOOK(C)||C
}if(!B){B=""
}if(!A){A=""
}return D.open(C,B,A)
},htmlEncode:function(A){return !A?A:String(A).replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;")
},htmlDecode:function(A){return !A?A:String(A).replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&quot;/g,'"').replace(/&amp;/g,"&")
},ellipsis:function(C,B,D){if(C&&C.length>B){if(D){var E=C.substr(0,B-2);
var A=Math.max(E.lastIndexOf(" "),E.lastIndexOf("."),E.lastIndexOf("!"),E.lastIndexOf("?"),E.lastIndexOf(";"));
if(A==-1||A<(B-15)){return C.substr(0,B-3)+"..."
}else{return E.substr(0,A)+"..."
}}else{return C.substr(0,B-3)+"..."
}}return C
}}
};
CQ.shared.Sling=function(){return{SELECTOR_INFINITY:".infinity",CHARSET:"_charset_",STATUS:":status",STATUS_BROWSER:"browser",OPERATION:":operation",OPERATION_DELETE:"delete",OPERATION_MOVE:"move",DELETE_SUFFIX:"@Delete",TYPEHINT_SUFFIX:"@TypeHint",COPY_SUFFIX:"@CopyFrom",MOVE_SUFFIX:"@MoveFrom",ORDER:":order",REPLACE:":replace",DESTINATION:":dest",SAVE_PARAM_PREFIX:":saveParamPrefix",IGNORE_PARAM:":ignore",REQUEST_LOGIN_PARAM:"sling:authRequestLogin",processBinaryData:function(A){if(A&&A[":jcr:data"]!=undefined){var B=new Object();
B.size=A[":jcr:data"];
B.type=A["jcr:mimeType"];
B.date=A["jcr:lastModified"];
A=B
}return A
},getContentPath:function(B,A){var C=A;
if(C.lastIndexOf(".")>C.lastIndexOf("/")){C=C.substr(0,C.indexOf(".",C.lastIndexOf("/")))
}if(B){if(B.indexOf("/")==0){C=B
}else{B=B.replace("./","");
C=C+"/"+B
}}return C
}}
}();
CQ.Sling=CQ.shared.Sling;
CQ.shared.XSS=new function(){return{getXSSPropertyName:function(A){if(!A){return""
}if(CQ.shared.XSS.KEY_REGEXP.test(A)){return A
}return A+=CQ.shared.XSS.KEY_SUFFIX
},getXSSRecordPropertyValue:function(E,C,A){var D="";
if(E&&C){var B=E.get(this.getXSSPropertyName(C));
if(B){D=B
}else{D=E.get(C)
}if(A&&!isNaN(A)){D=CQ.shared.Util.ellipsis(D,A,true)
}}return D
},getXSSTablePropertyValue:function(D,C,A){var E="";
if(D&&C){var B=D[this.getXSSPropertyName(C)];
if(B){E=B
}else{E=D[C]
}if(A&&!isNaN(A)){E=CQ.shared.Util.ellipsis(E,A,true)
}}return E
},getXSSValue:function(A){if(A){return CQ.shared.Util.htmlEncode(A)
}else{return""
}},updatePropertyName:function(A,B){if(!A||!B||!A[B]){return 
}if(A.xssProtect&&!A.xssKeepPropName){A[B]=this.getXSSPropertyName(A[B])
}},xssPropertyRenderer:function(D,B,C,A){if(A&&A.dataIndex&&C&&C.data&&C.data[this.getXSSPropertyName(A.dataIndex)]){D=C.data[this.getXSSPropertyName(A.dataIndex)];
if(A.ellipsisLimit&&!isNaN(A.ellipsisLimit)){D=CQ.shared.Util.ellipsis(D,A.ellipsisLimit,true)
}return D
}else{if(D){return D
}else{return""
}}}}
};
CQ.shared.XSS.KEY_SUFFIX="_xss";
CQ.shared.XSS.KEY_REGEXP=new RegExp(CQ.shared.XSS.KEY_SUFFIX+"$");
CQ.shared.HTTP.detectContextPath();