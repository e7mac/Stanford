if(!window.CQ_Analytics){window.CQ_Analytics={}
}CQ_Analytics.Operator=(function(){return function(){}
})();
CQ_Analytics.Operator.IS="is";
CQ_Analytics.Operator.EQUALS="equals";
CQ_Analytics.Operator.NOT_EQUAL="notequal";
CQ_Analytics.Operator.GREATER="greater";
CQ_Analytics.Operator.GREATER_OR_EQUAL="greaterorequal";
CQ_Analytics.Operator.OLDER="older";
CQ_Analytics.Operator.OLDER_OR_EQUAL="olderorequal";
CQ_Analytics.Operator.LESS="less";
CQ_Analytics.Operator.LESS_OR_EQUAL="lessorequal";
CQ_Analytics.Operator.YOUNGER="younger";
CQ_Analytics.Operator.YOUNGER_OR_EQUAL="youngerorequal";
CQ_Analytics.Operator.CONTAINS="contains";
CQ_Analytics.Operator.BEGINS_WITH="beginswith";
CQ_Analytics.OperatorActions=function(){var mapping={};
var addOperator=function(name,text,operation){mapping[name]=[text,operation]
};
addOperator(CQ_Analytics.Operator.EQUALS,"equals","==");
addOperator(CQ_Analytics.Operator.IS,"is","==");
addOperator(CQ_Analytics.Operator.NOT_EQUAL,"is not equal to","!=");
addOperator(CQ_Analytics.Operator.GREATER,"is greater than",">");
addOperator(CQ_Analytics.Operator.GREATER_OR_EQUAL,"is equal to or greater than",">=");
addOperator(CQ_Analytics.Operator.OLDER,"is older than",">");
addOperator(CQ_Analytics.Operator.OLDER_OR_EQUAL,"is equal to or older than",">=");
addOperator(CQ_Analytics.Operator.LESS,"is less than","<");
addOperator(CQ_Analytics.Operator.LESS_OR_EQUAL,"is equal to or less than","<=");
addOperator(CQ_Analytics.Operator.YOUNGER,"is younger than","<");
addOperator(CQ_Analytics.Operator.YOUNGER_OR_EQUAL,"is equal to or younger than","<=");
addOperator(CQ_Analytics.Operator.CONTAINS,"contains",function(s1,s2){if(s1){if(s2){s1=""+s1;
s2=""+s2;
return s1.toLowerCase().indexOf(s2.toLowerCase())!=-1
}return true
}return false
});
addOperator(CQ_Analytics.Operator.BEGINS_WITH,"begins with",function(s1,s2){if(s1){if(s2){s1=""+s1;
s2=""+s2;
return s1.toLowerCase().indexOf(s2.toLowerCase())==0
}return true
}return false
});
var getByIndex=function(op,index){if(mapping[op]&&mapping[op][index]){return mapping[op][index]
}return""
};
var escapeQuote=function(str){if(str){str=str.replace(new RegExp("\\'","ig"),str)
}return str
};
return{getText:function(operator){return getByIndex(operator,0)
},getOperation:function(operator){return getByIndex(operator,1)
},operate:function(object,property,operator,value,valueFormat){try{if(object&&object[property]){var toEval="";
var op=this.getOperation(operator);
op=op?op:operator;
var objectValue=CQ.shared.XSS.getXSSTablePropertyValue(object,property);
if(typeof op=="function"){return op.call(this,objectValue,value,valueFormat)
}else{if(valueFormat){toEval=valueFormat+"("+objectValue+") "+op+" "+valueFormat+"("+value+")"
}else{var s1=escapeQuote(objectValue);
var s2=escapeQuote(value);
toEval="'"+s1+"' "+op+" '"+s2+"'"
}var b=eval(toEval);
return b
}}}catch(e){}return false
}}
}();
var RUZEE=window.RUZEE||{};
RUZEE.ShadedBorder={create:function(Q){var M=/msie/i.test(navigator.userAgent)&&!window.opera;
var a=M&&!window.XMLHttpRequest;
function S(n,b){for(k in b){if(/ie_/.test(k)){if(M){n.style[k.substr(3)]=b[k]
}}else{n.style[k]=b[k]
}}}function V(n){var b=document.createElement("div");
b.className="sb-gen";
S(b,n);
return b
}function T(b){b=b<0?0:b;
if(b>0.99999){return""
}return M?" filter:alpha(opacity="+(b*100)+");":" opacity:"+b+";"
}var I=Q.shadow||0;
var c=Q.corner||0;
var G=0;
var F=Q.border||0;
var H=Q.borderOpacity||1;
var X=I!=0;
var P=c>I?c:I;
var R=P;
var B=P;
var j=P;
if(F>0){G=c;
c=c-F
}var L=c!=0&&X?Math.round(P/3):0;
var K=L;
var O=Math.round(L/2);
var N=c>0?"sb-inner":"sb-shadow";
var U="sb-shadow";
var f="sb-border";
var J=Q.edges||"trlb";
if(!/t/i.test(J)){B=0
}if(!/b/i.test(J)){j=0
}if(!/l/i.test(J)){P=0
}if(!/r/i.test(J)){R=0
}var e={position:"absolute",left:"0",top:"0",width:P+"px",height:B+"px",ie_fontSize:"1px",overflow:"hidden",margin:"0",padding:"0"};
var A=V(e);
delete e.left;
e.right="0";
e.width=R+"px";
var l=V(e);
delete e.top;
e.bottom="0";
e.height=j+"px";
var d=V(e);
delete e.right;
e.left="0";
e.width=P+"px";
var g=V(e);
var h=V({position:"absolute",width:"100%",height:B+"px",ie_fontSize:"1px",top:"0",left:"0",overflow:"hidden",margin:"0",padding:"0"});
var Z=V({position:"relative",height:B+"px",ie_fontSize:"1px",margin:"0 "+R+"px 0 "+P+"px",overflow:"hidden",padding:"0"});
h.appendChild(Z);
var Y=V({position:"absolute",left:"0",bottom:"0",width:"100%",height:j+"px",ie_fontSize:"1px",overflow:"hidden",margin:"0",padding:"0"});
var m=V({position:"relative",height:j+"px",ie_fontSize:"1px",margin:"0 "+R+"px 0 "+P+"px",overflow:"hidden",padding:"0"});
Y.appendChild(m);
var E=V({position:"absolute",top:(-j)+"px",left:"0",width:"100%",height:"100%",overflow:"hidden",ie_fontSize:"1px",padding:"0",margin:"0"});
function W(p,AD,AH){var AA=AH?P:R;
var AK=AD?B:j;
var AE=AD?O:-O;
var u=[];
var q=[];
var b=[];
var AB=0;
var AI=1;
if(AH){AB=AA-1;
AI=-1
}for(var z=0;
z<AA;
++z){var AL=AK-1;
var n=-1;
if(AD){AL=0;
n=1
}var r=false;
for(var v=AK-1;
v>=0&&!r;
--v){var AF='<div style="position:absolute; top:'+AL+"px; left:"+AB+"px; width:1px; height:1px; overflow:hidden; margin:0; padding:0;";
var AJ=z-L;
var o=v-K-AE;
var AM=Math.sqrt(AJ*AJ+o*o);
var AC=false;
if(c>0){if(AJ<0&&o<G&&o>=c||o<0&&AJ<G&&AJ>=c){u.push(AF+T(H)+'" class="'+f+'"></div>')
}else{if(AM<G&&AM>=c-1&&AJ>=0&&o>=0){var AN=AF;
if(AM>=G-1){AN+=T((G-AM)*H);
AC=true
}else{AN+=T(H)
}u.push(AN+'" class="'+f+'"></div>')
}}var AN=AF+" z-index:2;"+(AD?"background-position:0 -"+(c-o-1)+"px;":"background-image:none;");
var AG=function(){if(!AD){AN=AN.replace(/top\:\d+px/,"top:0px")
}AN=AN.replace(/height\:1px/,"height:"+(v+1)+"px");
q.push(AN+'" class="'+N+'"></div>');
r=true
};
if(AJ<0&&o<c||o<0&&AJ<c){AG()
}else{if(AM<c&&AJ>=0&&o>=0){if(AM>=c-1){AN+=T(c-AM);
AC=true;
q.push(AN+'" class="'+N+'"></div>')
}else{AG()
}}else{AC=true
}}}else{AC=true
}if(I>0&&AC){AM=Math.sqrt(z*z+v*v);
if(AM<I){b.push(AF+" z-index:0; "+T(1-(AM/I))+'" class="'+U+'"></div>')
}}AL+=n
}AB+=AI
}p.innerHTML=b.concat(u.concat(q)).join("")
}function C(q){var p=[];
p.push('<div style="position:relative; top:'+(B+j)+"px; height:2048px;  margin:0 "+(R-c-L)+"px 0 "+(P-c-L)+"px;  padding:0; overflow:hidden; background-position:0 "+(B>0?-(c+K+O):"0")+'px;" class="'+N+'"></div>');
var n='<div style="position:absolute; width:1px; top:'+(B+j)+"px; height:2048px; padding:0; margin:0;";
if(I>0){for(var b=0;
b<P-c-L;
++b){p.push(n+" left:"+b+"px;"+T((b+1)/P)+'" class="'+U+'"></div>')
}for(var b=0;
b<R-c-L;
++b){p.push(n+" right:"+b+"px;"+T((b+1)/R)+'" class="'+U+'"></div>')
}}if(F>0){var o=" width:"+F+"px;"+T(H)+'" class="'+f+'"></div>';
p.push(n+" left:"+(P-G-L)+"px;"+o);
p.push(n+" right:"+(R-G-L)+"px;"+o)
}q.innerHTML=p.join("")
}function D(q,n){var r=[];
var p=n?B:j;
var b='<div style="height:1px; overflow:hidden; position:absolute; margin:0; padding:0; width:100%; left:0px; ';
var o=n?O:-O;
for(var u=0;
u<p-o-K-c;
++u){if(I>0){r.push(b+(n?"top:":"bottom:")+u+"px;"+T((u+1)*1/p)+'" class="'+U+'"></div>')
}}if(u>=F){r.push(b+(n?"top:":"bottom:")+(u-F)+"px;"+T(H)+" height:"+F+'px;" class="'+f+'"></div>')
}r.push(b+(n?"background-position-y:0; top:":"background-image:none; bottom:")+u+"px; height:"+(c+K+o)+'px;" class="'+N+'"></div>');
q.innerHTML=r.join("")
}W(A,true,true);
W(l,true,false);
W(g,false,true);
W(d,false,false);
C(E);
D(Z,true);
D(m,false);
return{render:function(n){if(typeof n=="string"){n=document.getElementById(n)
}if(n.length!=undefined){for(var q=0;
q<n.length;
++q){this.render(n[q])
}return 
}n.className+=" sb";
S(n,{position:"relative",background:"transparent"});
var o=n.firstChild;
while(o){var p=o.nextSibling;
if(o.nodeType==1&&o.className=="sb-gen"){n.removeChild(o)
}o=p
}var u=n.firstChild;
var r=h.cloneNode(true);
var t=E.cloneNode(true);
var s=Y.cloneNode(true);
n.insertBefore(A.cloneNode(true),u);
n.insertBefore(l.cloneNode(true),u);
n.insertBefore(g.cloneNode(true),u);
n.insertBefore(d.cloneNode(true),u);
n.insertBefore(r,u);
n.insertBefore(t,u);
n.insertBefore(s,u);
if(a){n.onmouseover=function(){this.className+=" hover"
};
n.onmouseout=function(){this.className=this.className.replace(/ hover/,"")
};
window.setTimeout(function(){n.className+=" hover";
n.className=n.className.replace(/ hover/,"")
},100)
}if(M){function b(){r.style.width=s.style.width=t.style.width=n.offsetWidth+"px";
t.firstChild.style.height=n.offsetHeight+"px"
}n.onresize=b;
b()
}}}
}};
CQ_Analytics.Utils=new function(){return{registerDocumentEventHandler:function(C,B){var A=window.document[C];
if(typeof window.document[C]!="function"){window.document[C]=B
}else{window.document[C]=function(D){if(A){A(D)
}B(D)
}
}},eventWrapper:function(A){return function(D){var C,B;
if(document.all){C=window.event.keyCode;
B=window.event
}else{C=(typeof (D.which)!="undefined")?D.which:0;
B=D
}if(B){A(B,C)
}}
},loadElement:function(A,B){CQ_Analytics.Utils.load(A,function(E,C,D){$CQ("#"+B).html(D.responseText)
})
},clearElement:function(A){if(A){$CQ("#"+A).html("")
}},indexOf:function(D,C){for(var B=0,A=D.length;
B<A;
B++){if(D[B]==C){return B
}}return -1
},load:function(A,C,B){return CQ.shared.HTTP.get(A,C,B)
},post:function(A,D,C,B){return CQ.shared.HTTP.post(A,D,C,B)
},getPagePath:function(){return CQ.shared.HTTP.getPath()
},getPath:function(A){return CQ.shared.HTTP.getPath(A)
},addParameter:function(B,A,C){return CQ.shared.HTTP.addParameter(B,A,C)
},removeParameters:function(A){return CQ.shared.HTTP.removeParameters(A)
},removeAnchor:function(A){return CQ.shared.HTTP.removeAnchor(A)
},getSchemeAndAuthority:function(A){return CQ.shared.HTTP.getSchemeAndAuthority(A)
},internalize:function(A,B){return CQ.shared.HTTP.internalize(B)
},externalize:function(A,B){return CQ.shared.HTTP.externalize(A,B)
},encodePathOfURI:function(A){return CQ.shared.HTTP.encodePathOfURI(A)
},encodePath:function(A){return CQ.shared.HTTP.encodePath(A)
},getContextPath:function(){return CQ.shared.HTTP.getContextPath()
},detectContextPath:function(){return CQ.shared.HTTP.detectContextPath()
},urlEncode:function(H){if(!H){return""
}if(typeof H=="string"){return H
}var C=[];
for(var F in H){var E=H[F],B=encodeURIComponent(F);
var G=typeof E;
if(G=="undefined"){C.push(B,"=&")
}else{if(G!="function"&&G!="object"){C.push(B,"=",encodeURIComponent(E),"&")
}else{if(typeof E=="array"){if(E.length){for(var D=0,A=E.length;
D<A;
D++){C.push(B,"=",encodeURIComponent(E[D]===undefined?"":E[D]),"&")
}}else{C.push(B,"=&")
}}}}}C.pop();
return C.join("")
},getUID:function(){var A=Math.floor(Math.random()*(Math.pow(2,42)-1));
return this.getTimestamp().toString(16)+A.toString(16)
},getTimestamp:function(){var A=new Date();
return A.getTime()
},insert:function(D,C,B){if(!D||isNaN(C)||!B){return D
}var A="";
var F=0;
var E=C;
while(E<D.length){A+=D.substring(F,E)+B;
F+=C;
E+=C
}if(F<D.length){A+=D.substring(F)
}return A
},addListener:function(){if(window.addEventListener){return function(D,B,C,A){D.addEventListener(B,C,(A))
}
}else{if(window.attachEvent){return function(D,B,C,A){D.attachEvent("on"+B,C)
}
}else{return function(){}
}}},removeListener:function(){if(window.removeEventListener){return function(D,B,C,A){D.removeEventListener(B,C,(A))
}
}else{if(window.detachEvent){return function(C,A,B){C.detachEvent("on"+A,B)
}
}else{return function(){}
}}}}
};
CQ_Analytics.ClickstreamcloudRenderingUtils=new function(){return{createLink:function(F,D,B,A){var C=document.createElement("a");
C.href=A;
C.onclick=D;
C.innerHTML=F;
if(B){for(var E in B){if(B.hasOwnProperty(E)){C[E]=B[E]
}}}return C
},createStaticLink:function(D,A,C){var B=document.createElement("a");
B.href=A;
B.innerHTML=D;
B.title=C;
B.alt=C;
return B
},createNameValue:function(B,D,A,E){var C=document.createElement("span");
C.className=A||"ccl-data";
C.innerHTML=B+" = "+D;
C.title=E;
C.alt=E;
return C
},createText:function(D,A,C){var B=document.createElement("span");
B.className=A||"ccl-data";
if(D&&D.indexOf&&((D.indexOf("/home")!=-1&&D.indexOf("/image")!=-1)||(D.indexOf("/")!=-1&&D.indexOf(".png")!=-1))){B.innerHTML='<img src="'+D+'.prof.thumbnail.png" border="0">'
}else{if(D&&D.indexOf&&D.indexOf("www.gravatar.com")!=-1){B.innerHTML='<img src="'+D+'">'
}else{B.innerHTML=D
}}B.title=C;
B.alt=C;
return B
},createEditablePropertySpan:function(B,D){var A="var editSpan = this.nextSibling; this.style.display = 'none'; editSpan.style.display = 'block';";
var E="var editSpan = this.parentNode; var readSpan = this.parentNode.previousSibling;var newValue = this.value;editSpan.style.display = 'none'; readSpan.innerHTML = '"+B+" = '+value; readSpan.style.display = 'block';";
var C=document.createElement("span");
C.innerHTML='<span class="ccl-data" onclick="'+A+'">'+B+" = "+D+"</span>";
C.innerHTML+='<span class="ccl-data" style="display: none;">'+B+' = <input class="ccl-input" type="text" value="'+D+'" onblur="'+E+'"></span>';
C.className="ccl-data";
return C
}}
};
CQ_Analytics.Cookie={set:function(C,D,E){var A="";
if(E){var B=new Date();
B.setTime(B.getTime()+(E*24*60*60*1000));
A="; expires="+B.toGMTString()
}document.cookie=C+"="+D+A+"; path=/"
},read:function(B){var D=B+"=";
var A=document.cookie.split(";");
for(var C=0;
C<A.length;
C++){var E=A[C];
while(E.charAt(0)==" "){E=E.substring(1,E.length)
}if(E.indexOf(D)==0){return E.substring(D.length,E.length)
}}return null
},erase:function(A){CQ_Analytics.Cookie.set(A,"",-1)
}};
CQ_Analytics.SessionPersistence=function(){return{COOKIE_NAME:"SessionPersistence",set:function(C,D){D=D||"";
var F=this.getMap();
if(!F){F=""
}var B=F.indexOf(C+":=");
if(B==-1){F+=C+":="+D+"|"
}else{var E=F.substring(0,B);
var A=F.substring(F.indexOf("|",B+2)+1);
F=E+C+":="+D+"|"+A
}this.setMap(F)
},get:function(B){var D=this.getMap();
var C="";
if(D){var A=D.indexOf(B+":=");
if(A!=-1){C=D.substring(A+(B+":=").length,D.indexOf("|",A+2))
}}C=(C=="null"?"":(C||""));
return C
},getMap:function(){var A=CQ_Analytics.Cookie.read(this.COOKIE_NAME);
if(A){return decodeURIComponent(A)
}return null
},setMap:function(A){CQ_Analytics.Cookie.set(this.COOKIE_NAME,encodeURIComponent(A),365)
},clearMap:function(){CQ_Analytics.Cookie.erase(this.COOKIE_NAME)
},remove:function(C){var E=this.getMap();
if(!E){E=""
}var B=E.indexOf(C+":=");
if(B!=-1){var D=E.substring(0,B);
var A=E.substring(E.indexOf("|",B+2)+1);
E=D+A
}this.setMap(E)
}}
};
CQ_Analytics.Observable=function(){this.fireEvent=function(D){if(D&&this.listeners){D=D.toLowerCase();
var B=Array.prototype.slice.call(arguments,0);
for(var C=0;
C<this.listeners.length;
C++){var A=this.listeners[C];
if(D==A.event){if(A.fireFn.apply(A.scope||this||window,B)===false){return false
}}}}return true
}
};
CQ_Analytics.Observable.prototype.addListener=function(C,A,B){this.listeners=this.listeners||new Array();
if(C&&A){this.listeners.push({event:C.toLowerCase(),fireFn:A,scope:B})
}};
CQ_Analytics.Observable.prototype.removeListener=function(C,A){this.listeners=this.listeners||new Array();
if(C&&A){for(var B=0;
B<this.listeners.length;
B++){if(this.listeners[B].event==C&&this.listeners[B].fireFn==A){this.listeners.splice(B,1)
}}}};
CQ_Analytics.Observable.prototype.listeners=null;
CQ_Analytics.SessionStore=function(){};
CQ_Analytics.SessionStore.prototype=new CQ_Analytics.Observable();
CQ_Analytics.SessionStore.prototype.setProperty=function(A,B){if(this.data==null){this.init()
}this.data[A]=B;
this.fireEvent("update",A)
};
CQ_Analytics.SessionStore.prototype.init=function(){};
CQ_Analytics.SessionStore.prototype.getLabel=function(A){return A
};
CQ_Analytics.SessionStore.prototype.getLink=function(A){return A
};
CQ_Analytics.SessionStore.prototype.removeProperty=function(A){if(this.data==null){this.init()
}if(this.data[A]){delete this.data[A]
}var B=CQ.shared.XSS.getXSSPropertyName(A);
if(this.data[B]){delete this.data[B]
}this.fireEvent("update",A)
};
CQ_Analytics.SessionStore.prototype.getPropertyNames=function(A){if(this.data==null){this.init()
}A=A?A:[];
var B=new Array();
for(var C in this.data){if(CQ_Analytics.Utils.indexOf(A,C)==-1){B.push(C)
}}return B
};
CQ_Analytics.SessionStore.prototype.getSessionStore=function(){return this
};
CQ_Analytics.SessionStore.prototype.clear=function(){this.data=null
};
CQ_Analytics.SessionStore.prototype.getData=function(B){if(this.data==null){this.init()
}if(B){var A={};
for(var C in this.data){if(CQ_Analytics.Utils.indexOf(B,C)==-1){A[C]=this.data[C]
}}return A
}else{return this.data
}};
CQ_Analytics.SessionStore.prototype.reset=function(){if(this.data!=null){this.data=null;
this.fireEvent("update")
}};
CQ_Analytics.SessionStore.prototype.getProperty=function(B,A){if(this.data==null){this.init()
}if(!A){var C=CQ.shared.XSS.getXSSPropertyName(B);
if(this.data[C]){return this.data[C]
}}return this.data[B]
};
CQ_Analytics.SessionStore.prototype.getName=function(){return this.STORENAME
};
CQ_Analytics.SessionStore.prototype.addInitProperty=function(A,B){if(!this.initProperty){this.initProperty={}
}this.initProperty[A]=B
};
CQ_Analytics.SessionStore.prototype.loadInitProperties=function(B){if(B){for(var A in B){this.addInitProperty(A,B[A])
}}};
CQ_Analytics.PersistedSessionStore=function(){};
CQ_Analytics.PersistedSessionStore.prototype=new CQ_Analytics.SessionStore();
CQ_Analytics.PersistedSessionStore.prototype.STOREKEY="key";
CQ_Analytics.PersistedSessionStore.prototype.setNonPersisted=function(A){if(!this.nonPersisted){this.nonPersisted={}
}this.nonPersisted[A]=true
};
CQ_Analytics.PersistedSessionStore.prototype.isPersisted=function(A){if(!this.nonPersisted){this.nonPersisted={}
}return this.nonPersisted[A]!==true
};
CQ_Analytics.PersistedSessionStore.prototype.getStoreKey=function(){return this.STOREKEY
};
CQ_Analytics.PersistedSessionStore.prototype.persist=function(){if(this.fireEvent("beforepersist")!==false){var A=new CQ_Analytics.SessionPersistence();
A.set(this.getStoreKey(),this.toString());
this.fireEvent("persist")
}};
CQ_Analytics.PersistedSessionStore.prototype.setProperty=function(A,B){if(this.data==null){this.init()
}this.data[A]=B;
if(this.isPersisted(A)){this.persist()
}this.fireEvent("update",A)
};
CQ_Analytics.PersistedSessionStore.prototype.toString=function(){var A=null;
if(this.data){for(var B in this.data){if(this.isPersisted(B)&&this.data.hasOwnProperty(B)){A=(A===null?"":A+",");
A+=(B+"="+this.data[B])
}}}return A
};
CQ_Analytics.PersistedSessionStore.prototype.parse=function(D){var C={};
var E=D.split(",");
for(var A in E){if(E.hasOwnProperty(A)){var B=E[A].split("=");
if(B.length==2){C[B[0]]=B[1]
}}}return C
};
CQ_Analytics.PersistedSessionStore.prototype.reset=function(A){if(this.data!=null){this.data={};
this.persist();
this.data=null;
if(!A){this.fireEvent("update")
}}};
CQ_Analytics.PersistedSessionStore.prototype.removeProperty=function(A){if(this.data==null){this.init()
}if(this.data[A]){delete this.data[A];
if(this.isPersisted(A)){this.persist()
}}this.fireEvent("update",A)
};
CQ_Analytics.PersistedSessionStore.prototype.clear=function(){var A=new CQ_Analytics.SessionPersistence();
A.remove(this.getStoreKey());
this.data=null
};
if(!CQ_Analytics.ClickstreamcloudMgr){CQ_Analytics.ClickstreamcloudMgr=function(){this.clickstreamcloud=null;
this.clickstreamcloudToServer=null;
this.stores={};
this.data=null;
this.config=null;
this.isConfigLoaded=false;
this.areStoresLoaded=false;
this.posting=false
};
CQ_Analytics.ClickstreamcloudMgr.prototype=new CQ_Analytics.PersistedSessionStore();
CQ_Analytics.ClickstreamcloudMgr.prototype.STOREKEY="CLICKSTREAMCLOUD";
CQ_Analytics.ClickstreamcloudMgr.prototype.STORENAME="clickstreamcloud";
CQ_Analytics.ClickstreamcloudMgr.prototype.POST_MODE_PAGELOAD=1;
CQ_Analytics.ClickstreamcloudMgr.prototype.POST_MODE_TIMER=2;
CQ_Analytics.ClickstreamcloudMgr.prototype.POST_MODE_DATAUPDATE=4;
CQ_Analytics.ClickstreamcloudMgr.prototype.POST_TIMER=600;
CQ_Analytics.ClickstreamcloudMgr.prototype.POST_PROCESS_TIMER=60;
CQ_Analytics.ClickstreamcloudMgr.prototype.POST_MODE=6;
CQ_Analytics.ClickstreamcloudMgr.prototype.POST_PATH="/var/statistics/";
CQ_Analytics.ClickstreamcloudMgr.prototype.CONFIG_PATH=CQ_Analytics.Utils.externalize("/libs/cq/personalization/components/clickstreamcloud/content/config.json",true);
CQ_Analytics.ClickstreamcloudMgr.prototype.init=function(){this.clickstreamcloud={};
this.clickstreamcloudToServer={};
var B=new CQ_Analytics.SessionPersistence();
var D=B.get(this.getStoreKey());
if(D){this.data=this.parse(D)
}else{this.data={}
}if(CQ_Analytics.CCM&&this.isMode(CQ_Analytics.CCM.POST_MODE_TIMER)){var A=this;
var C=function(){A.timer=window.setInterval(function(){try{var F=parseInt(A.data.lastPost);
var H=false;
if(isNaN(F)){H=true
}else{var G=new Date().getTime();
if(G>F+CQ_Analytics.CCM.POST_TIMER*1000){H=true
}}}catch(E){}if(H){A.post()
}},CQ_Analytics.POST_PROCESS_TIMER*1000)
};
if(this.areStoresLoaded){C.call(this)
}else{this.addListener("storesloaded",C,this)
}}};
CQ_Analytics.ClickstreamcloudMgr.prototype.getSessionId=function(){if(!this.data.sessionId){this.setSessionId(CQ_Analytics.Utils.getUID())
}return this.data.sessionId
};
CQ_Analytics.ClickstreamcloudMgr.prototype.setSessionId=function(A){if(A){this.setProperty("sessionId",A)
}};
CQ_Analytics.ClickstreamcloudMgr.prototype.getVisitorId=function(){return this.data.visitorId
};
CQ_Analytics.ClickstreamcloudMgr.prototype.setVisitorId=function(A){this.setProperty("visitorId",A)
};
CQ_Analytics.ClickstreamcloudMgr.prototype.getId=function(){var A=this.getVisitorId();
if(!A){return this.getSessionId()
}return A
};
CQ_Analytics.ClickstreamcloudMgr.prototype.isAnonymous=function(){var A=this.getVisitorId();
return(!A)
};
CQ_Analytics.ClickstreamcloudMgr.prototype.isMode=function(A){return(CQ_Analytics.CCM.POST_MODE&A)>0
};
CQ_Analytics.ClickstreamcloudMgr.prototype.get=function(A){if(this.clickstreamcloud==null){this.init()
}if(A){return this.clickstreamcloudToServer
}return this.clickstreamcloud
};
CQ_Analytics.ClickstreamcloudMgr.prototype.register=function(C){if(this.clickstreamcloud==null){this.init()
}var A=this;
this.clickstreamcloud[C.getName()]=C.getData();
this.stores[C.getName()]=C;
var B=this.getStoreConfig(C.getName());
if(B.stats!==false&&B.stats!="false"){this.clickstreamcloudToServer[C.getName()]=C.getData(B.excludedFromStats)
}C.addListener("update",function(){A.update(C)
});
if(this.isMode(CQ_Analytics.CCM.POST_MODE_DATAUPDATE)){C.addListener("persist",function(){if(A.areStoresLoaded){A.post(C)
}})
}this.addListener("clear",function(){C.clear()
});
this.fireEvent("storeupdate",C)
};
CQ_Analytics.ClickstreamcloudMgr.prototype.update=function(B){if(this.clickstreamcloud==null){this.init()
}this.clickstreamcloud[B.getName()]=B.getData();
var A=this.getStoreConfig(B.getName());
if(A.stats!==false&&A.stats!="false"){this.clickstreamcloudToServer[B.getName()]=B.getData(A.excludedFromStats)
}this.fireEvent("storeupdate",B)
};
CQ_Analytics.ClickstreamcloudMgr.prototype.startPosting=function(){this.posting=true
};
CQ_Analytics.ClickstreamcloudMgr.prototype.stopPosting=function(){this.posting=false
};
CQ_Analytics.ClickstreamcloudMgr.prototype.post=function(){if(this.posting){try{var E=this.getCCMToJCR();
var D=CQ_Analytics.Utils.getTimestamp();
E["./jcr:primaryType"]="nt:unstructured";
E["./sessionId"]=this.getSessionId();
var C=this.POST_PATH+this.getName()+"/";
if(this.isAnonymous()){var A=CQ_Analytics.Utils.insert(this.getId(),2,"/");
C+="anonymous/"+A+"/"+D
}else{C+="users/"+this.getId()+"/"+D
}CQ_Analytics.Utils.post(C,null,E);
this.setProperty("lastPost",D)
}catch(B){}}};
CQ_Analytics.ClickstreamcloudMgr.prototype.getCCMToJCR=function(){var G=this.get(true);
var H={};
for(var D in G){var C=G[D],B=encodeURIComponent(D);
var E=typeof C;
if(E=="object"){for(var F in C){var A=C[F];
F=F.replace(":","/");
H["./"+D+"/./"+F]=A
}}else{H["./"+D]=C
}}return H
},CQ_Analytics.ClickstreamcloudMgr.prototype.getName=function(){return this.STORENAME
};
CQ_Analytics.ClickstreamcloudMgr.prototype.clear=function(){this.clickstreamcloud=null;
this.clickstreamcloudToServer=null;
this.fireEvent("clear")
};
CQ_Analytics.ClickstreamcloudMgr.prototype.getRegisteredStore=function(A){return this.stores&&this.stores[A]?this.stores[A]:null
};
CQ_Analytics.ClickstreamcloudMgr.prototype.loadConfig=function(c){var setConfig=function(ccm,config){ccm.config=config;
ccm.isConfigLoaded=true;
ccm.fireEvent("configloaded");
ccm.fireEvent("storesloaded");
ccm.areStoresLoaded=true;
if(ccm.isMode(CQ_Analytics.CCM.POST_MODE_PAGELOAD)){ccm.post()
}};
if(c){setConfig(this,c)
}else{var params={};
params.path=CQ_Analytics.Utils.getPagePath();
params.cq_ck=new Date().valueOf();
var url=this.CONFIG_PATH;
url+="?"+CQ_Analytics.Utils.urlEncode(params);
CQ_Analytics.Utils.load(url,function(data,status,response){var config={};
try{config=eval("config = "+response.responseText)
}catch(error){}setConfig(this,config)
},this)
}};
CQ_Analytics.ClickstreamcloudMgr.prototype.getConfig=function(){return this.config
};
CQ_Analytics.ClickstreamcloudMgr.prototype.getStoreConfig=function(A){if(this.config&&this.config.configs&&this.config.configs[A]&&this.config.configs[A]["store"]){return this.config.configs[A]["store"]
}return{}
};
CQ_Analytics.ClickstreamcloudMgr.prototype.getEditConfig=function(A){if(this.config&&this.config.configs&&this.config.configs[A]&&this.config.configs[A]["edit"]){return this.config.configs[A]["edit"]
}return{}
};
CQ_Analytics.ClickstreamcloudMgr.prototype.getUIConfig=function(A){if(this.config&&this.config.configs&&this.config.configs[A]&&this.config.configs[A]["ui"]){return this.config.configs[A]["ui"]
}return{}
};
CQ_Analytics.ClickstreamcloudMgr.prototype.getInitialData=function(A){if(this.config&&this.config.data&&this.config.data[A]){return this.config.data[A]
}return{}
};
CQ_Analytics.ClickstreamcloudMgr=CQ_Analytics.CCM=new CQ_Analytics.ClickstreamcloudMgr();
$CQ(function(){CQ_Analytics.ClickstreamcloudMgr.loadConfig()
});
window.setTimeout(function(){CQ_Analytics.CCM.init()
},1);
CQ_Analytics.Utils.addListener(window,"unload",function(){try{for(var B in CQ_Analytics.ClickstreamcloudMgr){delete CQ_Analytics.ClickstreamcloudMgr[B]
}CQ_Analytics.ClickstreamcloudMgr=null
}catch(A){}CQ_Analytics.CCM=null
})
}if(!CQ_Analytics.SegmentMgr){CQ_Analytics.SegmentMgr=function(){this.SEGMENTATION_ROOT="/etc/segmentation";
this.SEGMENT_SELECTOR=".segment.js";
this.SEGMENTATION_SCRIPT_LOADER="cq-segmentation-loader";
this.segments={};
this.boosts={};
var A=this;
this.fireUpdate=function(){A.fireEvent("update")
}
};
CQ_Analytics.SegmentMgr.prototype=new CQ_Analytics.SessionStore();
CQ_Analytics.SegmentMgr.prototype.STORENAME="segments";
CQ_Analytics.SegmentMgr.prototype.register=function(A,C,B){this.segments[A]=C;
this.boosts[A]=!isNaN(B)?parseInt(B):0;
this.fireUpdate()
};
CQ_Analytics.SegmentMgr.prototype.resolveArray=function(E,G,B){G=G||CQ_Analytics.ClickstreamcloudMgr.get();
if(!(E instanceof Array)){return this.resolve(E,G)
}B=(B=="AND"?"AND":"OR");
var A=(B=="AND");
for(var D=0;
D<E.length;
D++){var F=E[D];
var C=this.resolve(F,G);
if(B=="AND"){if(C!==true){return C
}}else{if(C===true){return true
}}}return A
};
CQ_Analytics.SegmentMgr.prototype.resolve=function(segmentPath,clickstreamcloud){clickstreamcloud=clickstreamcloud||CQ_Analytics.ClickstreamcloudMgr.get();
if(!segmentPath){return false
}if(segmentPath instanceof Array){return this.resolveArray(segmentPath,clickstreamcloud)
}if(segmentPath.indexOf(this.SEGMENTATION_ROOT)!=0){return false
}if(segmentPath==this.SEGMENTATION_ROOT){return true
}if(!this.segments[segmentPath]){return true
}var parent=segmentPath.substring(0,segmentPath.lastIndexOf("/"));
if(parent.indexOf(this.SEGMENTATION_ROOT)==0){var pres=this.resolve(parent,clickstreamcloud);
if(pres!==true){return pres
}}var rules="function(clickstreamcloud) { return true ";
rules+=" && ( "+this.segments[segmentPath]+" ) ";
rules+=";}";
var res=true;
try{var f=null;
eval("f = "+rules+"");
var e=(f==null||f(clickstreamcloud));
res=res&&(e===true)
}catch(error){return"Unresolved - Error while evaluating segment "+segmentPath+" : "+error.message
}return res
};
CQ_Analytics.SegmentMgr.prototype.getResolved=function(C){C=C||CQ_Analytics.ClickstreamcloudMgr.get();
var A=new Array();
for(var B in this.segments){if(this.resolve(B,C)===true){A.push(B)
}}return A
};
CQ_Analytics.SegmentMgr.prototype.getMaxBoost=function(D,F){if(!(D instanceof Array)){return this.getBoost(D)
}var B=0;
for(var C=0;
C<D.length;
C++){var E=D[C];
if(this.resolve(E,F)===true){var A=this.boosts[E]||0;
if(A>B){B=A
}}}return B
};
CQ_Analytics.SegmentMgr.prototype.getBoost=function(A){if(!(A instanceof Array)){A=[A]
}return this.boosts[A]||0
};
CQ_Analytics.SegmentMgr.prototype.reload=function(path){var url=path;
if(!url){url=this.SEGMENTATION_ROOT
}if(url){if(url.indexOf(this.SEGMENT_SELECTOR)==-1){url+=this.SEGMENT_SELECTOR
}try{CQ_Analytics.Utils.load(url,function(config,status,response){if(response&&response.responseText){eval(response.responseText)
}},this);
var response=CQ.HTTP.get(scripts[i].src)
}catch(err){}}};
CQ_Analytics.SegmentMgr.prototype.getSessionStore=function(){return this
};
CQ_Analytics.SegmentMgr.prototype.getProperty=function(A){return A
};
CQ_Analytics.SegmentMgr.prototype.getLink=function(A){return A+".html"
};
CQ_Analytics.SegmentMgr.prototype.getLabel=function(C){if(C){var B=C;
var A=B.lastIndexOf("/");
if(A!=-1){B=B.substring(A+1,B.length)
}var D=this.resolve(C);
if(D===true){return B
}else{if(D!==true){return'<span class="invalid" title="'+D+'" alt="'+D+'">'+B+"</span>"
}}}return C
};
CQ_Analytics.SegmentMgr.prototype.getPropertyNames=function(){return this.getResolved()
};
CQ_Analytics.SegmentMgr=new CQ_Analytics.SegmentMgr();
CQ_Analytics.ClickstreamcloudMgr.addListener("storeupdate",CQ_Analytics.SegmentMgr.fireUpdate);
CQ_Analytics.Utils.addListener(window,"unload",function(){try{for(var B in CQ_Analytics.SegmentMgr){delete CQ_Analytics.SegmentMgr[B]
}}catch(A){}CQ_Analytics.SegmentMgr=null
})
}if(!CQ_Analytics.StrategyMgr){CQ_Analytics.StrategyMgr=function(){this.strategies={}
};
CQ_Analytics.StrategyMgr.prototype={};
CQ_Analytics.StrategyMgr.prototype.isRegistered=function(A){return !!this.strategies[A]
};
CQ_Analytics.StrategyMgr.prototype.register=function(B,A){if(typeof A=="function"){this.strategies[B]=A
}};
CQ_Analytics.StrategyMgr.prototype.choose=function(B,A){if(A.length==1){return A[0]
}if(this.strategies[B]){return this.strategies[B].call(this,A)
}};
CQ_Analytics.StrategyMgr=new CQ_Analytics.StrategyMgr()
}CQ_Analytics.StrategyMgr.register("clickstream-score",function(H){if(H.length==1){return H[0]
}var A=[];
if(CQ_Analytics.TagCloudMgr){var K=CQ_Analytics.TagCloudMgr.getTags();
K=K||{};
var J=-1;
for(var E=0;
E<H.length;
E++){var G=0;
var I=H[E].tags;
if(I){for(var D=0;
D<I.length;
D++){var F=I[D].tagID;
G+=parseInt(K[F])||0
}}if(G==J){A.push(H[E])
}else{if(G>J){A=[];
A.push(H[E]);
J=G
}}}}else{A=H
}if(A.length==1){return A[0]
}var B=null;
if(CQ_Analytics.PageDataMgr){B=CQ_Analytics.PageDataMgr.getProperty("random")
}if(!B){B=window.CQ_StrategyRandom
}if(!B){B=window.CQ_StrategyRandom=Math.random()
}if(parseFloat(B)>1){B=1/B
}if(parseFloat(B)==1){B=0
}var C=Math.floor(B*A.length);
return A[C]
});
CQ_Analytics.StrategyMgr.register("first",function(A){return A[0]
});
CQ_Analytics.StrategyMgr.register("random",function(C){var A=null;
if(CQ_Analytics.PageDataMgr){A=CQ_Analytics.PageDataMgr.getProperty("random")
}if(!A){A=window.CQ_StrategyRandom
}if(!A){A=window.CQ_StrategyRandom=Math.random()
}if(parseFloat(A)>1){A=1/A
}if(parseFloat(A)==1){A=0
}var B=Math.floor(A*C.length);
return C[B]
});
if(!CQ_Analytics.ClickstreamcloudUI){CQ_Analytics.ClickstreamcloudUI=function(){this.SHOW_BOX_COOKIE="show-clickstreamcloud";
this.BOX_ID="clickstreamcloud";
this.box=null;
this.top=null;
this.sections=null;
this.bottom=null;
this.nbSection=0;
this.isRendered=false
};
CQ_Analytics.ClickstreamcloudUI.prototype=new CQ_Analytics.Observable();
CQ_Analytics.ClickstreamcloudUI.prototype.createBox=function(C){var A=this;
this.box=document.createElement("div");
this.box.id=this.BOX_ID;
this.box.style.display="none";
var D=document.createElement("div");
this.box.appendChild(D);
this.top=document.createElement("div");
this.top.className="ccl-header ccl-header-close";
this.addListener("close",function(){A.onVisibilityChange()
});
this.top.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createStaticLink("","#ccl",""));
this.top.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createLink("Close",function(){A.box.style.display="none";
A.fireEvent("close")
},{className:"ccl-close"},"#ccl"));
if(this.hideLoadLink===false){this.top.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createLink("Load",function(){A.fireEvent("loadclick")
},{className:"ccl-load"},"#ccl"))
}if(this.hideEditLink===false){this.top.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createLink("Edit",function(){A.fireEvent("editclick")
},{className:"ccl-edit"},"#ccl"))
}D.appendChild(this.top);
this.sections=document.createElement("div");
D.appendChild(this.sections);
this.bottom=document.createElement("div");
this.bottom.className="ccl-spacer";
D.appendChild(this.bottom);
var B=RUZEE.ShadedBorder.create({corner:10,border:2,shadow:21});
B.render(D);
C.appendChild(this.box);
if(D.onresize){this.addListener("show",D.onresize,D)
}};
CQ_Analytics.ClickstreamcloudUI.prototype.init=function(B){B=B||{};
this.parentId=B.target;
var C=document.getElementById(this.parentId);
if(C){this.version=B.version||CQ_Analytics.ClickstreamcloudUI.VERSION_FULL;
this.hideEditLink=B.hideEditLink!==false;
this.hideLoadLink=B.hideLoadLink!==false;
this.disableKeyShortcut=B.disableKeyShortcut!==false;
if(CQ_Analytics.Cookie.read(this.SHOW_BOX_COOKIE)=="true"){this.show()
}if(!this.disableKeyShortcut){var A=this;
CQ_Analytics.Utils.registerDocumentEventHandler("onkeydown",CQ_Analytics.Utils.eventWrapper(function(D,E){if(D.ctrlKey&&D.altKey&&E=="C".charCodeAt(0)){A.toggle()
}}))
}}};
CQ_Analytics.ClickstreamcloudUI.prototype.onVisibilityChange=function(){CQ_Analytics.Cookie.set(this.SHOW_BOX_COOKIE,this.isVisible()?"true":"false",365)
};
CQ_Analytics.ClickstreamcloudUI.prototype.isVisible=function(){return(this.box!=null&&this.box.style.display!="none")
};
CQ_Analytics.ClickstreamcloudUI.prototype.toggle=function(){if(this.isVisible()){this.hide()
}else{this.show()
}};
CQ_Analytics.ClickstreamcloudUI.prototype.register=function(D,A,C){var B=function(){var E=new CQ_Analytics.ClickstreamcloudUI.Section(D,this.version,A||{},C);
this.addSection(E);
D.addListener("update",E.reset,E)
};
if(this.isRendered){B.call(this)
}else{this.addListener("render",B,this)
}};
CQ_Analytics.ClickstreamcloudUI.prototype.addSection=function(C,A){if(A<this.nbSection&&this.nbSection>0){var B=this.nbSection;
var D=this.sections.lastChild;
while(B>A+1){B--;
D=D.previousSibling
}this.sections.insertBefore(C.get(),D)
}else{this.sections.appendChild(C.get())
}this.nbSection++
};
CQ_Analytics.ClickstreamcloudUI.prototype.removeSection=function(A){this.sections.removeChild(A);
this.nbSection--
};
CQ_Analytics.ClickstreamcloudUI.prototype.show=function(){if(!this.isRendered){var A=document.getElementById(this.parentId);
if(A){this.createBox(A);
this.isRendered=true;
this.fireEvent("render")
}}this.box.style.display="block";
this.onVisibilityChange();
this.fireEvent("show")
};
CQ_Analytics.ClickstreamcloudUI.prototype.hide=function(){if(this.box!=null){this.box.style.display="none"
}this.onVisibilityChange()
};
CQ_Analytics.ClickstreamcloudUI.prototype.MODE_TEXTFIELD="textfield";
CQ_Analytics.ClickstreamcloudUI.prototype.MODE_LINK="link";
CQ_Analytics.ClickstreamcloudUI.prototype.MODE_STATIC="static";
CQ_Analytics.ClickstreamcloudUI.prototype.VERSION_FULL="full";
CQ_Analytics.ClickstreamcloudUI.prototype.VERSION_LIGHT="light";
CQ_Analytics.ClickstreamcloudUI.prototype.Section=function(D,A,B,C){this.contentbox=null;
this.section=null;
this.sessionStore=D;
this.version=A;
this.title=B.title;
this.mode=B.mode||CQ_Analytics.ClickstreamcloudUI.MODE_TEXTFIELD;
this.renderer=C;
this.buildContentBox=function(){if(this.renderer){this.contentbox=this.renderer.call(this.sessionStore)
}else{this.contentbox=document.createElement("p");
this.contentbox.className="ccl-sectioncontent";
var G=CQ_Analytics.CCM.getStoreConfig(this.sessionStore.getName());
var K=this.sessionStore.getPropertyNames(G.invisible);
var I=this.sessionStore.getData();
if(this.version==CQ_Analytics.ClickstreamcloudUI.VERSION_LIGHT){var H=new Array();
var M=new Array();
for(var J=0;
J<K.length;
J++){var F=K[J];
var P=this.sessionStore.getProperty(F);
if(P==F){H.push(F);
M.push(F)
}else{var O=CQ.shared.XSS.getXSSTablePropertyValue(I,F);
if(CQ_Analytics.Utils.indexOf(H,O)==-1){H.push(O);
F=CQ.shared.XSS.KEY_REGEXP.test(F)?F.substring(0,F.length-4):F;
M.push(F)
}}}for(var J=0,E=0;
J<H.length;
J++){var F=M[J];
var N=H[J];
if(this.mode==CQ_Analytics.ClickstreamcloudUI.MODE_LINK){var L=CQ_Analytics.Utils.externalize(this.sessionStore.getLink(F),true);
this.addLink(this.sessionStore.getLabel(F),L,"ccl-data-light",F)
}else{this.addStaticText(N,"ccl-data-light",F)
}E++;
if(E>3){E=0;
this.addLineBreak()
}}}else{for(var J=0;
J<K.length;
J++){var F=K[J];
var O=CQ.shared.XSS.getXSSTablePropertyValue(I,F);
F=CQ.shared.XSS.KEY_REGEXP.test(F)?F.substring(0,F.length-4):F;
if(this.mode==CQ_Analytics.ClickstreamcloudUI.MODE_TEXTFIELD){this.addNameValueField(this.sessionStore.getLabel(F),O,F,"ccl-data",F)
}else{if(this.mode==CQ_Analytics.ClickstreamcloudUI.MODE_LINK){var L=CQ_Analytics.Utils.externalize(this.sessionStore.getLink(F),true);
this.addLink(this.sessionStore.getLabel(F),L,"ccl-data",F)
}else{this.addStaticText(this.sessionStore.getLabel(F),"ccl-data",F)
}}this.contentbox.appendChild(document.createTextNode(" "))
}}}};
this.buildSection=function(){if(this.contentbox==null){this.buildContentBox()
}if(this.section==null){this.section=document.createElement("div")
}var F=document.createElement("div");
F.className="ccl-header";
this.section.appendChild(F);
var E=document.createElement("div");
E.innerHTML=this.title;
E.className="ccl-title";
F.appendChild(E);
this.section.appendChild(this.contentbox)
}
};
CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype=new CQ_Analytics.Observable();
CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype.get=function(){if(this.section==null){this.buildSection()
}return this.section
};
CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype.reset=function(){if(!this.isReseting){this.isReseting=true;
if(this.section!=null){while(this.section.hasChildNodes()){this.section.removeChild(this.section.firstChild)
}this.contentbox=null
}this.buildSection();
this.isReseting=false
}};
CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype.addNameValueField=function(C,D,B,A,E){this.contentbox.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createNameValue(B,D,A,E))
};
CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype.addLink=function(E,C,A,D){if(C){var B=document.createElement("span");
B.className=A||"ccl-data";
B.title=D;
B.alt=D;
B.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createStaticLink(E,C,D));
this.contentbox.appendChild(B)
}else{this.addStaticText(E)
}};
CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype.addStaticText=function(C,A,B){if(C){this.contentbox.appendChild(CQ_Analytics.ClickstreamcloudRenderingUtils.createText(C,A,B))
}};
CQ_Analytics.ClickstreamcloudUI.prototype.Section.prototype.addLineBreak=function(){this.contentbox.appendChild(document.createElement("br"))
};
CQ_Analytics.ClickstreamcloudUI=new CQ_Analytics.ClickstreamcloudUI();
CQ_Analytics.CCM.addListener("configloaded",function(){CQ_Analytics.ClickstreamcloudUI.init(CQ_Analytics.CCM.getConfig()["ui"])
})
}if(!CQ_Analytics.ProfileDataMgr){CQ_Analytics.ProfileDataMgr=function(){this.addListener("beforepersist",function(){this.checkAuthorizableId()
},this)
};
CQ_Analytics.ProfileDataMgr.prototype=new CQ_Analytics.PersistedSessionStore();
CQ_Analytics.ProfileDataMgr.prototype.STOREKEY="PROFILEDATA";
CQ_Analytics.ProfileDataMgr.prototype.STORENAME="profile";
CQ_Analytics.ProfileDataMgr.prototype.LOADER_PATH=CQ_Analytics.Utils.externalize("/libs/cq/personalization/components/profileloader/content/load.js",true);
CQ_Analytics.ProfileDataMgr.prototype.PROFILE_LOADER=CQ_Analytics.Utils.externalize("/libs/cq/personalization/components/profileloader/content/load.json",true);
CQ_Analytics.ProfileDataMgr.prototype.init=function(){var A=new CQ_Analytics.SessionPersistence();
var B=A.get(this.getStoreKey());
if(!B||B==""){this.data={};
for(var C in this.initProperty){this.data[C]=this.initProperty[C]
}}else{this.data=this.parse(B)
}this.persist();
this.fireEvent("update")
};
CQ_Analytics.ProfileDataMgr.prototype.checkAuthorizableId=function(){if(!this.data){this.init()
}if(this.data.authorizableId){CQ_Analytics.CCM.setVisitorId(this.data.authorizableId)
}else{CQ_Analytics.CCM.setVisitorId("")
}};
CQ_Analytics.ProfileDataMgr.prototype.getLabel=function(A){return A
};
CQ_Analytics.ProfileDataMgr.prototype.getLink=function(A){return""
};
CQ_Analytics.ProfileDataMgr.prototype.clear=function(){var A=new CQ_Analytics.SessionPersistence();
A.remove(this.getStoreKey());
this.data=null;
this.initProperty={}
};
CQ_Analytics.ProfileDataMgr.prototype.loadProfile=function(authorizableId){var url=this.PROFILE_LOADER;
url=CQ_Analytics.Utils.addParameter(url,"authorizableId",authorizableId);
try{var object=CQ.shared.HTTP.eval(url);
if(object){CQ_Analytics.ProfileDataMgr.clear();
for(var p in object){this.initProperty[p]=object[p]
}CQ_Analytics.ProfileDataMgr.reset();
CQ_Analytics.ProfileDataMgr.init();
if(CQ_Analytics.ClickstreamcloudEditor){CQ_Analytics.ClickstreamcloudEditor.reload()
}return true
}}catch(error){if(console&&console.log){console.log("error",error)
}}return false
};
CQ_Analytics.ProfileDataMgr=new CQ_Analytics.ProfileDataMgr();
CQ_Analytics.CCM.addListener("configloaded",function(){this.loadInitProperties(CQ_Analytics.CCM.getInitialData(this.getName()));
this.checkAuthorizableId();
CQ_Analytics.ClickstreamcloudUI.register(this.getSessionStore(),CQ_Analytics.CCM.getUIConfig(this.getName()));
CQ_Analytics.CCM.register(this)
},CQ_Analytics.ProfileDataMgr)
}if(!CQ_Analytics.TagCloudMgr){CQ_Analytics.TagCloudMgr=function(){this.data=null;
this.addedTags={};
this.frequencies=null;
this.initialTags=null;
this.initialAddedTags={};
this.copyObject=function(C){var B={};
for(var A in C){B[A]=C[A]
}return B
}
};
CQ_Analytics.TagCloudMgr.prototype=new CQ_Analytics.PersistedSessionStore();
CQ_Analytics.TagCloudMgr.prototype.STOREKEY="TAGCLOUD";
CQ_Analytics.TagCloudMgr.prototype.STORENAME="tagcloud";
CQ_Analytics.TagCloudMgr.prototype.parseTagList=function(A){var C={};
var B=A.split(",");
for(var D in B){if(B.hasOwnProperty(D)){var E=B[D].split("=");
if(E.length==2){C[E[0]]=parseInt(E[1])
}}}return C
};
CQ_Analytics.TagCloudMgr.prototype.parseString=function(A){this.data=this.parseTagList(A);
return this
};
CQ_Analytics.TagCloudMgr.prototype.add=function(A){this.addedTags[A]=true;
this.data[A]=(this.data[A]||0)+1
};
CQ_Analytics.TagCloudMgr.prototype.each=function(B){for(var A in this.data){if(this.data.hasOwnProperty(A)){B(A,this.data[A])
}}};
CQ_Analytics.TagCloudMgr.prototype.calculateFrequencies=function(){var C={};
var A=[];
this.each(function(D,E){if(!C[E]){A.push(E)
}C[E]=true
});
A.sort(function B(E,D){if(E>D){return 1
}if(E<D){return -1
}return 0
});
return A
};
CQ_Analytics.TagCloudMgr.prototype.calculateNtile=function(B,C){if(this.frequencies===null){this.frequencies=this.calculateFrequencies()
}var A=0;
while(true){if((A>=(this.frequencies.length-1))||(this.frequencies[A]>=B)){return Math.ceil((A+1)/this.frequencies.length*C)
}A++
}};
CQ_Analytics.TagCloudMgr.prototype.getTags=function(){return this.data
};
CQ_Analytics.TagCloudMgr.prototype.getData=function(A){return this.getTags()
};
CQ_Analytics.TagCloudMgr.prototype.getTag=function(A){return this.data[A]>0?this.data[A]:0
};
CQ_Analytics.TagCloudMgr.prototype.init=function(A){var B=new CQ_Analytics.SessionPersistence();
var D=B.get(this.getStoreKey());
D=D===null?"":new String(D);
this.data=this.parseTagList(D);
if(A){for(var C in A){if(A.hasOwnProperty(C)){this.add(A[C])
}}}this.initialTags=this.copyObject(this.data);
this.initialAddedTags=this.copyObject(this.addedTags);
this.persist();
this.fireEvent("update")
};
CQ_Analytics.TagCloudMgr.prototype.setProperty=function(A,B){if(this.data==null){this.init()
}if(B>0){this.addedTags[A]=true;
this.data[A]=B>0?B:0
}else{delete this.addedTags[A];
delete this.data[A]
}this.persist();
this.fireEvent("update")
};
CQ_Analytics.TagCloudMgr.prototype.reset=function(){this.clear();
this.fireEvent("update")
};
CQ_Analytics.TagCloudMgr.prototype.getProperty=function(A){if(this.data==null){this.init()
}return this.data[A]>0?this.data[A]:0
};
CQ_Analytics.TagCloudMgr.prototype.removeProperty=function(A){if(this.data==null){this.init()
}this.setProperty(A,0)
};
CQ_Analytics.TagCloudMgr.prototype.clear=function(){var A=new CQ_Analytics.SessionPersistence();
A.remove(this.getStoreKey());
this.addedTags={};
this.data={}
};
CQ_Analytics.TagCloudMgr.prototype.getLink=function(A){return""
};
CQ_Analytics.TagCloudMgr.prototype.getLabel=function(B){if(B){var C=B.split(":");
var A=C[C.length-1].split("/");
B=A[A.length-1]
}return B
};
CQ_Analytics.TagCloudMgr.prototype.createHTMLElement=function(){var C=document.createElement("div");
var B=document.createElement("p");
var A=this;
B.className="cloud";
this.each(function(E,H){var D=document.createElement("span");
var G=A.calculateNtile(H,10);
var I=E.split(":");
var F=I[I.length-1].split("/");
D.innerHTML=F[F.length-1]+"<span class='count tag"+G+"'>&nbsp;("+H+")</span>";
D.className="tag";
if(A.addedTags[E]){D.className+=" new"
}D.className+=" tag"+G;
D.title=E+" ("+H+")";
B.appendChild(D);
B.appendChild(document.createTextNode(" "))
});
C.appendChild(B);
return C
};
CQ_Analytics.TagCloudMgr=new CQ_Analytics.TagCloudMgr();
CQ_Analytics.CCM.addListener("configloaded",function(){var A=CQ_Analytics.CCM.getInitialData(this.getName());
if(A&&A.tags){this.init(A.tags)
}CQ_Analytics.ClickstreamcloudUI.register(this.getSessionStore(),CQ_Analytics.CCM.getUIConfig(this.getName()),this.createHTMLElement);
CQ_Analytics.CCM.register(this)
},CQ_Analytics.TagCloudMgr)
}if(!CQ_Analytics.PageDataMgr){CQ_Analytics.PageDataMgr=function(){};
CQ_Analytics.PageDataMgr.prototype=new CQ_Analytics.SessionStore();
CQ_Analytics.PageDataMgr.prototype.STORENAME="pagedata";
CQ_Analytics.PageDataMgr.prototype.init=function(){this.data={};
for(var A in this.initProperty){this.data[A]=this.initProperty[A]
}this.fireEvent("update")
};
CQ_Analytics.PageDataMgr.prototype.getLabel=function(A){return A
};
CQ_Analytics.PageDataMgr.prototype.getLink=function(A){return""
};
CQ_Analytics.PageDataMgr=new CQ_Analytics.PageDataMgr();
CQ_Analytics.CCM.addListener("configloaded",function(){this.loadInitProperties(CQ_Analytics.CCM.getInitialData(this.getName()));
this.init();
CQ_Analytics.ClickstreamcloudUI.register(this.getSessionStore(),CQ_Analytics.CCM.getUIConfig(this.getName()));
CQ_Analytics.CCM.register(this)
},CQ_Analytics.PageDataMgr)
}CQ_Analytics.BrowserInfo=function(){var N=navigator.userAgent.toLowerCase();
var Q=function(U){return U.test(N)
};
this.browserName="Unresolved";
var S=Q(/opera/);
this.browserName=S?"Opera":this.browserName;
var O=Q(/webkit/);
this.browserName=O?"WebKit":this.browserName;
var F=Q(/chrome/);
this.browserName=F?"Chrome":this.browserName;
var P=!F&&Q(/safari/);
if(P){var D=P&&Q(/applewebkit\/4/);
this.browserName=D?"Safari 2":this.browserName;
var A=P&&Q(/version\/3/);
this.browserName=A?"Safari 3":this.browserName;
var T=P&&Q(/version\/4/);
this.browserName=T?"Safari 4":this.browserName
}var M=!S&&Q(/msie/);
if(M){var K=M&&Q(/msie 7/);
this.browserName=K?"IE 7":this.browserName;
var J=M&&Q(/msie 8/);
this.browserName=J?"IE 8":this.browserName;
var L=M&&!K&&!J;
this.browserName=L?"IE 6":this.browserName
}var I=!O&&Q(/gecko/);
if(I){var E=I&&Q(/rv:1\.8/);
this.browserName=E?"Firefox 2":this.browserName;
var B=I&&Q(/rv:1\.9/);
this.browserName=B?"Firefox 3":this.browserName
}this.OSName="Unresolved";
var R=Q(/windows|win32/);
if(R){this.OSName=R?"Windows":this.OSName;
this.OSName=Q(/windows 98|win98/)?"Windows 98":this.OSName;
this.OSName=Q(/windows nt 5.0|windows 2000/)?"Windows 2000":this.OSName;
this.OSName=Q(/windows nt 5.1|windows xp/)?"Windows XP":this.OSName;
this.OSName=Q(/windows nt 5.2/)?"Windows Server 2003":this.OSName;
this.OSName=Q(/windows nt 6.0/)?"Windows Vista":this.OSName;
this.OSName=Q(/windows nt 7.0/)?"Windows 7":this.OSName;
this.OSName=Q(/windows nt 4.0|winnt4.0|winnt/)?"Windows NT 4.0":this.OSName;
this.OSName=Q(/windows me/)?"Windows ME":this.OSName
}var G=Q(/macintosh|mac os/);
this.OSName=G?"Mac OS":this.OSName;
var G=Q(/mac os x/);
this.OSName=G?"Mac OS X":this.OSName;
var H=Q(/linux/);
this.OSName=H?"Linux":this.OSName;
var C=/^https/i.test(window.location.protocol);
this.screenResolution=screen.width+"x"+screen.height
};
CQ_Analytics.BrowserInfo.prototype={getBrowserName:function(){return this.browserName
},getOSName:function(){return this.OSName
},getScreenResolution:function(){return this.screenResolution
}};
if(!CQ_Analytics.SurferInfoMgr){CQ_Analytics.SurferInfoMgr=function(){};
CQ_Analytics.SurferInfoMgr.prototype=new CQ_Analytics.PersistedSessionStore();
CQ_Analytics.SurferInfoMgr.prototype.STOREKEY="SURFERINFO";
CQ_Analytics.SurferInfoMgr.prototype.STORENAME="surferinfo";
CQ_Analytics.SurferInfoMgr.prototype.init=function(){var A=new CQ_Analytics.SessionPersistence();
var B=A.get(this.getStoreKey());
if(!B||B==""){this.data={};
for(var C in this.initProperty){this.data[C]=this.initProperty[C]
}}else{this.data=this.parse(B);
if(this.data.keywords!=this.initProperty.keywords){this.data.keywords=this.initProperty.keywords
}}this.persist();
this.fireEvent("update")
};
CQ_Analytics.SurferInfoMgr.prototype.clear=function(){var A=new CQ_Analytics.SessionPersistence();
A.remove(this.getStoreKey());
this.data=null;
this.initProperty={}
};
CQ_Analytics.SurferInfoMgr.prototype.getLabel=function(A){return A
};
CQ_Analytics.SurferInfoMgr.prototype.getLink=function(A){return""
};
CQ_Analytics.SurferInfoMgr=new CQ_Analytics.SurferInfoMgr();
CQ_Analytics.CCM.addListener("configloaded",function(){this.loadInitProperties(CQ_Analytics.CCM.getInitialData(this.getName()));
var A=new CQ_Analytics.BrowserInfo();
this.addInitProperty("browser",A.getBrowserName());
this.addInitProperty("OS",A.getOSName());
this.addInitProperty("resolution",A.getScreenResolution());
this.setNonPersisted("mouse X");
this.setNonPersisted("mouse Y");
if(CQ_Analytics.MousePositionMgr){CQ_Analytics.MousePositionMgr.addListener("update",function(){this.setProperty("mouse X",CQ_Analytics.MousePositionMgr.getProperty("x"));
this.setProperty("mouse Y",CQ_Analytics.MousePositionMgr.getProperty("y"))
},this)
}CQ_Analytics.ClickstreamcloudUI.register(this.getSessionStore(),CQ_Analytics.CCM.getUIConfig(this.getName()));
CQ_Analytics.CCM.register(this)
},CQ_Analytics.SurferInfoMgr)
}if(!CQ_Analytics.MousePositionMgr){CQ_Analytics.MousePositionMgr=function(){this.position={x:0,y:0};
this.getPageX=function(C){var B=C.pageX;
if(!B&&0!==B){B=C.clientX||0
}return B
};
this.getPageY=function(B){var C=B.pageY;
if(!C&&0!==C){C=B.clientY||0
}return C
};
var A=this;
this.timer=null;
$CQ(document).bind("mousemove",function(E,D,C,H){var F=E||window.event;
if(F){if(!A.timer){var B=A.getPageX(F);
var G=A.getPageY(F);
A.timer=setTimeout(function(){A.setPosition(B,G);
A.timer=null
},500)
}}})
};
CQ_Analytics.MousePositionMgr.prototype=new CQ_Analytics.SessionStore();
CQ_Analytics.MousePositionMgr.prototype.STORENAME="mouseposition";
CQ_Analytics.MousePositionMgr.prototype.setPosition=function(A,B){this.position.x=A;
this.position.y=B;
this.fireEvent("update")
};
CQ_Analytics.MousePositionMgr.prototype.getProperty=function(A){return this.position[A]
};
CQ_Analytics.MousePositionMgr.prototype.getLabel=function(A){return A
};
CQ_Analytics.MousePositionMgr.prototype.getLink=function(A){return""
};
CQ_Analytics.MousePositionMgr.prototype.getPropertyNames=function(){var A=new Array();
for(var B in this.position){A.push(B)
}return A
};
CQ_Analytics.MousePositionMgr.prototype.getSessionStore=function(){return this
};
CQ_Analytics.MousePositionMgr.prototype.getData=function(A){return this.position
};
CQ_Analytics.MousePositionMgr.prototype.clear=function(){this.position={}
};
CQ_Analytics.MousePositionMgr=new CQ_Analytics.MousePositionMgr();
CQ_Analytics.CCM.addListener("configloaded",function(){CQ_Analytics.CCM.register(this)
},CQ_Analytics.MousePositionMgr)
}if(!CQ_Analytics.EventDataMgr){CQ_Analytics.EventDataMgr=function(){};
CQ_Analytics.EventDataMgr.prototype=new CQ_Analytics.SessionStore();
CQ_Analytics.EventDataMgr.prototype.STORENAME="eventdata";
CQ_Analytics.EventDataMgr.prototype.init=function(){this.data={};
for(var A in this.initProperty){this.data[A]=this.initProperty[A]
}this.fireEvent("update")
};
CQ_Analytics.EventDataMgr.prototype.getLabel=function(A){return A
};
CQ_Analytics.EventDataMgr.prototype.getLink=function(A){return""
};
CQ_Analytics.EventDataMgr=new CQ_Analytics.EventDataMgr();
CQ_Analytics.CCM.addListener("configloaded",function(){this.loadInitProperties(CQ_Analytics.CCM.getInitialData(this.getName()));
this.init();
CQ_Analytics.ClickstreamcloudUI.register(this.getSessionStore(),CQ_Analytics.CCM.getUIConfig(this.getName()));
CQ_Analytics.CCM.register(this)
},CQ_Analytics.EventDataMgr)
}if(CQ_Analytics.SegmentMgr&&!CQ_Analytics.SegmentMgr.isResolvedRegistered){CQ_Analytics.SegmentMgr.isResolvedRegistered=true;
CQ_Analytics.CCM.addListener("configloaded",function(){CQ_Analytics.ClickstreamcloudUI.register(this.getSessionStore(),CQ_Analytics.CCM.getUIConfig(this.getName()))
},CQ_Analytics.SegmentMgr)
}if(!window.CQ_Context){window.CQ_Context=function(){};
window.CQ_Context.prototype=new CQ_Analytics.Observable();
window.CQ_Context.prototype.getProfile=function(){return(function(){return{getUserId:function(){return this.getProperty("authorizableId")
},getDisplayName:function(){var A=this.getProperty("formattedName");
if(A){return A
}A=this.getProperty("displayName");
if(A){return A
}return this.getUserId()
},getFirstname:function(){return this.getProperty("givenName")
},getLastname:function(){return this.getProperty("familyName")
},getEmail:function(){return this.getProperty("email")
},getProperty:function(A){if(CQ_Analytics&&CQ_Analytics.ProfileDataMgr){return CQ_Analytics.ProfileDataMgr.getProperty(A)
}return""
},getProperties:function(){if(CQ_Analytics&&CQ_Analytics.ProfileDataMgr){return CQ_Analytics.ProfileDataMgr.getData()
}return{}
},getAvatar:function(){return this.getProperty("avatar")
},onUpdate:function(A,B){if(A&&CQ_Analytics&&CQ_Analytics.ProfileDataMgr){CQ_Analytics.ProfileDataMgr.addListener("update",A,B||this)
}}}
})()
};
window.CQ_Context=new window.CQ_Context()
}window.CQ_trackTeasersStats=true;
function initializeTeaserLoader(B,E,F,D,A){D=CQ.Ext&&(D=="true"||D===true);
if(window.CQ_Analytics){var C=function(){var K="/_jcr_content/par.html";
var J=function(M){var O="";
var Q=new Array();
if(CQ_Analytics.SegmentMgr){var P=0;
for(var N=0;
N<B.length;
N++){if(!B[N]["segments"]||B[N]["segments"].length==0||CQ_Analytics.SegmentMgr.resolveArray(B[N]["segments"])===true){var L=CQ_Analytics.SegmentMgr.getMaxBoost(B[N]["segments"]);
if(M==B[N].path){O+=CQ.I18n.getMessage("<b>Teaser {0} is resolved ( boost = {1} )</b><br>",[B[N]["name"],L])
}else{O+=CQ.I18n.getMessage("Teaser {0} is resolved with ( boost = {1} )<br>",[B[N]["name"],L])
}if(L==P){Q.push(B[N])
}else{if(L>P){Q=new Array();
Q.push(B[N]);
P=L
}}}else{O+=CQ.I18n.getMessage("Teaser {0} is not resolved<br>",B[N]["name"])
}}}O+=CQ.I18n.getMessage("<br>Strategy <b>{0}</b> selected current teaser.<br>",E);
return O
};
var I=null;
var G=null;
var H=function(){var S=new Array();
if(CQ_Analytics.SegmentMgr){var Q=0;
for(var N=0;
N<B.length;
N++){if(!B[N]["segments"]||B[N]["segments"].length==0||CQ_Analytics.SegmentMgr.resolveArray(B[N]["segments"])===true){var M=CQ_Analytics.SegmentMgr.getMaxBoost(B[N]["segments"]);
if(M==Q){S.push(B[N])
}else{if(M>Q){S=new Array();
S.push(B[N]);
Q=M
}}}}}if(S.length>0){var R=S[0];
if(CQ_Analytics.StrategyMgr){var P=CQ_Analytics.StrategyMgr.choose(E,S);
if(P!=null){R=P
}}if(!I||I.path!=R.path){I=R;
CQ_Analytics.Utils.loadElement(R.path+K,F);
if(window.CQ_trackTeasersStats&&A){if(!CQ_Analytics.loadedTeasersStack){CQ_Analytics.loadedTeasersStack=[];
$CQ(window).unload(function(){try{var T=CQ_Analytics.loadedTeasersStack;
if(T){delete CQ_Analytics.loadedTeasersStack;
var V=A;
for(var W=0;
W<T.length;
W++){V=CQ.shared.HTTP.addParameter(V,"path",T[W])
}CQ.shared.HTTP.get(V,function(){})
}}catch(U){}})
}CQ_Analytics.loadedTeasersStack.push(R.path)
}if(D){if(L){L.remove()
}var O=CQ.Ext.get(F);
if(O){var L=new CQ.Ext.ToolTip({target:O,html:J(I.path),title:CQ.I18n.getMessage("Selection decision"),width:420})
}}}}else{if(D&&L){L.remove()
}CQ_Analytics.Utils.clearElement(F);
I=null
}};
H.call();
if(CQ_Analytics.SegmentMgr){CQ_Analytics.SegmentMgr.addListener("update",H)
}};
if(CQ_Analytics.ClickstreamcloudMgr){if(CQ_Analytics.ClickstreamcloudMgr.areStoresLoaded){C.call(this)
}else{CQ_Analytics.ClickstreamcloudMgr.addListener("storesloaded",C)
}}}};