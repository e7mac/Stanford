/*
* @file cn.popups.js
* @author Paul Bronshteyn
* @comment Built by a geek loaded on caffeine ...
* @copyright (c) Conde Nast Digital
*/
if(typeof CN==="undefined"||!CN){throw ("CN library is missing!")
}CN.popups=(function(G){var I=false,R=false,a=false,F=false,L=false,Y={scrollbars:0,location:0,directories:0,status:0,menubar:0,toolbar:0,resizable:0},H={name:"arrivalpop",cookie:"ArrivalCookie",path:(CN.page.config.reg.urls.base==="/"?"":CN.page.config.reg.urls.base)+"/nolayout/arrival.html",width:460,height:295,top:-50,left:-50},S={name:"exitingpop",cookie:"ExitingCookie",path:(CN.page.config.reg.urls.base==="/"?"":CN.page.config.reg.urls.base)+"/nolayout/exit.html",width:460,height:295,top:50,left:50},P=24,E=3,T,D=location.pathname,Q=CN.site.domain,M=["/sweeps","/registration","/services/newsletters"],V=[],J=["buysub.com","condenastdirect.com","clk.atdmt.com","magazinestoresubscriptions.com"],O=["mbid"],U={arriving:{},exiting:{}},A=function(e,c){var d,b;
for(d=0,b=c.length;
d<b;
d++){if(e.indexOf(c[d])!==-1){return true
}}return false
},N=function(d,b){var c;
for(c in b){if(b.hasOwnProperty(c)){if(b[c].strict){if(d===c){return b[c].options
}}else{if(d.indexOf(c)!==-1){return b[c].options
}}}}return false
},B=function(e,c){var d,b;
for(d=0,b=e.length;
d<b;
d++){if(G.inArray(e[d],c)===-1){c.push(e[d])
}}},Z=function(f,d){var e=0,b=f.length,c;
for(e=0;
e<b;
e++){c=G.inArray(f[e],d);
if(c>-1){d.remove(c,1)
}}},K=function(c){var d,b="",e;
if(c.cookie){CN.cookie.set(c.cookie,c.cookie,{expires:c.cookieLife||P,path:"/",domain:Q})
}c.args=G.extend({},Y,c.args||{});
for(d in c.args){if(c.args.hasOwnProperty(d)){b+=","+d+"="+c.args[d]
}}e=window.open(c.path,c.name,"height="+(c.height||screen.height)+",width="+(c.width||screen.width)+",top="+parseInt(screen.height/2-(c.height||screen.height)/2+c.top,10)+",left="+parseInt(screen.width/2-(c.width||screen.width)/2+c.left,10)+b);
if(e){e.focus();
return true
}else{return false
}},W=function(){if(a||(!K(H)&&F)){if(CN.ecom&&CN.ecom.floatingAd){CN.cookie.set(H.cookie,H.cookie,{expires:H.cookieLife||P,path:"/",domain:Q});
CN.ecom.floatingAd.init()
}}},C=function(d){var b=N(D,U.exiting),f="",c="";
if(b){G(window).unbind("unload",this);
if(d.type==="click"){f=(d.target.parentNode.pathname||d.target.pathname||"").replace(/(^[^\/])/,"/$1")
}if((b.cookie&&!CN.cookie.get(b.cookie))&&(b.excludePath&&!A(f,b.excludePath))){K(b)
}return 
}if(!R||A(D,V)||CN.cookie.get(S.cookie)){return 
}if(d.type==="click"){G(window).unbind("unload",this);
if(/^(#|javascript:)/.test(this.href)){return 
}c=d.target.hostname||G(d.target).parents("a:eq(0)")[0].hostname||""
}c=(c)?CN.url.domain(c):"";
if(c===Q||A(c,J)){return 
}K(S)
},X=function(b){var c=this.movie||CN.url.domain(this.data);
if(c[0]==="/"||c===Q){G(window).unbind("unload",C)
}};
return{init:function(){var c=0,b=O.length,d=CN.url.params();
for(c=0;
c<b;
c++){if(d[O[c]]){return this
}}G("a,area").live("click",C);
G(window).bind("unload",C);
G(function(){G("form").bind("submit",function(){G(window).unbind("unload",C)
})
});
G("object").live("mousedown",X);
if(CN.site.env==="DEV"){P=1
}if((!I&&!a)||CN.cookie.get(H.cookie)||A(D,M)){return this
}T=setTimeout(W,E*1000);
return this
},setArriving:function(c,b){I=c===true;
G.extend(H,(b||{}));
return this
},setExiting:function(c,b){R=c===true;
G.extend(S,(b||{}));
return this
},setLayer:function(b){a=b===true;
return this
},setForceLayer:function(b){F=b===true;
return this
},isLayer:function(){return true
},setCookieLife:function(b){P=CN.utils.intval(b)||P;
return this
},setPopDelay:function(b){E=CN.utils.intval(b)||E;
return this
},setPopArguments:function(b){G.extend(Y,(b||{}));
return this
},setCustomExitPath:function(d,c,b){if(!d){return this
}if(CN.isBoolean(c)){b=c;
c=S
}U.exiting[d]={strict:b||false,options:c||S};
return this
},excludePath:function(){B(arguments,M);
B(arguments,V);
return this
},excludeArrivalPath:function(){B(arguments,M);
return this
},removeArrivalPath:function(){Z(arguments,M);
return this
},excludeExitPath:function(){B(arguments,V);
return this
},removeExitPath:function(){Z(arguments,V);
return this
},excludeExitDomain:function(){B(arguments,J);
return this
},removeExitDomain:function(){Z(arguments,J);
return this
},excludeUrlParam:function(){B(arguments,O);
return this
},removeUrlParam:function(){Z(arguments,O);
return this
},setATGArriving:function(c,b){if(!L){I=c===true;
if(!I){T=clearTimeout(T)
}else{if(!T){setTimeout(W,E*1000)
}}G.extend(H,(b||{}));
CN.debug.info("ATG set arriving:",[I])
}return this
},setATGExiting:function(c,b){if(!L){R=c===true;
G.extend(S,(b||{}));
CN.debug.info("ATG set exiting:",[R])
}return this
},setATGLayer:function(b){if(!L){a=b===true;
CN.debug.info("ATG set layer:",[a])
}return this
},setSiteOverride:function(b){L=b===true;
return this
}}
}(jQuery));
if(typeof CN==="undefined"||!CN){throw ("CN library is missing!")
}CN.foundry=(function(){var B={loading:function(C){CN.debug.info("CN Foundry Request For Fonts")
},fontloading:function(C,D){CN.debug.info("CN Foundry Loading Font",[C])
},fontactive:function(C,D){CN.debug.info("CN Foundry Activated Font",[C])
},fontinactive:function(C,D){CN.debug.warn("CN Foundry Inactive Font",[C])
},active:function(){CN.debug.info("CN Foundry Successfully Loaded All Fonts")
},inactive:function(){CN.debug.warn("CN Foundry :: Some Fonts May Not Have Loaed")
}},A={};
return{init:function(J,H){var E,I,F,D=(!!H)?H:{},C=function(K,L){return function(){K();
L()
}
};
if(!!J&&!!J.load){A=J
}else{CN.debug.error("CN Foundry :: Font loader is undefined or contains no load() function");
return false
}for(F in H){if(H.hasOwnProperty(F)){if(typeof B[F]==="function"){E=B[F];
I=H[F];
B[F]=C(E,I)
}else{B[F]=H[F]
}}}try{A.load(B);
CN.debug.info("CN Foundry :: Request Loaded")
}catch(G){CN.debug.error("CN Foundry :: Exception Caught While Sending Request :: "+G.message)
}}}
}());