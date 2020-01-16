/*
 * jQuery UI 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(A,D){A.ui=A.ui||{};
if(A.ui.version){return 
}A.extend(A.ui,{version:"1.8.16",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});
A.fn.extend({propAttr:A.fn.prop||A.fn.attr,_focus:A.fn.focus,focus:function(E,F){return typeof E==="number"?this.each(function(){var G=this;
setTimeout(function(){A(G).focus();
if(F){F.call(G)
}},E)
}):this._focus.apply(this,arguments)
},scrollParent:function(){var E;
if((A.browser.msie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){E=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test(A.curCSS(this,"position",1))&&(/(auto|scroll)/).test(A.curCSS(this,"overflow",1)+A.curCSS(this,"overflow-y",1)+A.curCSS(this,"overflow-x",1))
}).eq(0)
}else{E=this.parents().filter(function(){return(/(auto|scroll)/).test(A.curCSS(this,"overflow",1)+A.curCSS(this,"overflow-y",1)+A.curCSS(this,"overflow-x",1))
}).eq(0)
}return(/fixed/).test(this.css("position"))||!E.length?A(document):E
},zIndex:function(H){if(H!==D){return this.css("zIndex",H)
}if(this.length){var F=A(this[0]),E,G;
while(F.length&&F[0]!==document){E=F.css("position");
if(E==="absolute"||E==="relative"||E==="fixed"){G=parseInt(F.css("zIndex"),10);
if(!isNaN(G)&&G!==0){return G
}}F=F.parent()
}}return 0
},disableSelection:function(){return this.bind((A.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(E){E.preventDefault()
})
},enableSelection:function(){return this.unbind(".ui-disableSelection")
}});
A.each(["Width","Height"],function(G,E){var F=E==="Width"?["Left","Right"]:["Top","Bottom"],H=E.toLowerCase(),J={innerWidth:A.fn.innerWidth,innerHeight:A.fn.innerHeight,outerWidth:A.fn.outerWidth,outerHeight:A.fn.outerHeight};
function I(M,L,K,N){A.each(F,function(){L-=parseFloat(A.curCSS(M,"padding"+this,true))||0;
if(K){L-=parseFloat(A.curCSS(M,"border"+this+"Width",true))||0
}if(N){L-=parseFloat(A.curCSS(M,"margin"+this,true))||0
}});
return L
}A.fn["inner"+E]=function(K){if(K===D){return J["inner"+E].call(this)
}return this.each(function(){A(this).css(H,I(this,K)+"px")
})
};
A.fn["outer"+E]=function(K,L){if(typeof K!=="number"){return J["outer"+E].call(this,K)
}return this.each(function(){A(this).css(H,I(this,K,true,L)+"px")
})
}
});
function C(G,E){var J=G.nodeName.toLowerCase();
if("area"===J){var I=G.parentNode,H=I.name,F;
if(!G.href||!H||I.nodeName.toLowerCase()!=="map"){return false
}F=A("img[usemap=#"+H+"]")[0];
return !!F&&B(F)
}return(/input|select|textarea|button|object/.test(J)?!G.disabled:"a"==J?G.href||E:E)&&B(G)
}function B(E){return !A(E).parents().andSelf().filter(function(){return A.curCSS(this,"visibility")==="hidden"||A.expr.filters.hidden(this)
}).length
}A.extend(A.expr[":"],{data:function(G,F,E){return !!A.data(G,E[3])
},focusable:function(E){return C(E,!isNaN(A.attr(E,"tabindex")))
},tabbable:function(G){var E=A.attr(G,"tabindex"),F=isNaN(E);
return(F||E>=0)&&C(G,!F)
}});
A(function(){var E=document.body,F=E.appendChild(F=document.createElement("div"));
A.extend(F.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});
A.support.minHeight=F.offsetHeight===100;
A.support.selectstart="onselectstart" in F;
E.removeChild(F).style.display="none"
});
A.extend(A.ui,{plugin:{add:function(F,G,I){var H=A.ui[F].prototype;
for(var E in I){H.plugins[E]=H.plugins[E]||[];
H.plugins[E].push([G,I[E]])
}},call:function(E,G,F){var I=E.plugins[G];
if(!I||!E.element[0].parentNode){return 
}for(var H=0;
H<I.length;
H++){if(E.options[I[H][0]]){I[H][1].apply(E.element,F)
}}}},contains:function(F,E){return document.compareDocumentPosition?F.compareDocumentPosition(E)&16:F!==E&&F.contains(E)
},hasScroll:function(H,F){if(A(H).css("overflow")==="hidden"){return false
}var E=(F&&F==="left")?"scrollLeft":"scrollTop",G=false;
if(H[E]>0){return true
}H[E]=1;
G=(H[E]>0);
H[E]=0;
return G
},isOverAxis:function(F,E,G){return(F>E)&&(F<(E+G))
},isOver:function(J,F,I,H,E,G){return A.ui.isOverAxis(J,I,E)&&A.ui.isOverAxis(F,H,G)
}})
})(jQuery);
/*
 * jQuery UI Widget 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(B,D){if(B.cleanData){var C=B.cleanData;
B.cleanData=function(E){for(var F=0,G;
(G=E[F])!=null;
F++){try{B(G).triggerHandler("remove")
}catch(H){}}C(E)
}
}else{var A=B.fn.remove;
B.fn.remove=function(E,F){return this.each(function(){if(!F){if(!E||B.filter(E,[this]).length){B("*",this).add([this]).each(function(){try{B(this).triggerHandler("remove")
}catch(G){}})
}}return A.call(B(this),E,F)
})
}
}B.widget=function(F,H,E){var G=F.split(".")[0],J;
F=F.split(".")[1];
J=G+"-"+F;
if(!E){E=H;
H=B.Widget
}B.expr[":"][J]=function(K){return !!B.data(K,F)
};
B[G]=B[G]||{};
B[G][F]=function(K,L){if(arguments.length){this._createWidget(K,L)
}};
var I=new H();
I.options=B.extend(true,{},I.options);
B[G][F].prototype=B.extend(true,I,{namespace:G,widgetName:F,widgetEventPrefix:B[G][F].prototype.widgetEventPrefix||F,widgetBaseClass:J},E);
B.widget.bridge(F,B[G][F])
};
B.widget.bridge=function(F,E){B.fn[F]=function(I){var G=typeof I==="string",H=Array.prototype.slice.call(arguments,1),J=this;
I=!G&&H.length?B.extend.apply(null,[true,I].concat(H)):I;
if(G&&I.charAt(0)==="_"){return J
}if(G){this.each(function(){var K=B.data(this,F),L=K&&B.isFunction(K[I])?K[I].apply(K,H):K;
if(L!==K&&L!==D){J=L;
return false
}})
}else{this.each(function(){var K=B.data(this,F);
if(K){K.option(I||{})._init()
}else{B.data(this,F,new E(I,this))
}})
}return J
}
};
B.Widget=function(E,F){if(arguments.length){this._createWidget(E,F)
}};
B.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(F,G){B.data(G,this.widgetName,this);
this.element=B(G);
this.options=B.extend(true,{},this.options,this._getCreateOptions(),F);
var E=this;
this.element.bind("remove."+this.widgetName,function(){E.destroy()
});
this._create();
this._trigger("create");
this._init()
},_getCreateOptions:function(){return B.metadata&&B.metadata.get(this.element[0])[this.widgetName]
},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);
this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")
},widget:function(){return this.element
},option:function(F,G){var E=F;
if(arguments.length===0){return B.extend({},this.options)
}if(typeof F==="string"){if(G===D){return this.options[F]
}E={};
E[F]=G
}this._setOptions(E);
return this
},_setOptions:function(F){var E=this;
B.each(F,function(G,H){E._setOption(G,H)
});
return this
},_setOption:function(E,F){this.options[E]=F;
if(E==="disabled"){this.widget()[F?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",F)
}return this
},enable:function(){return this._setOption("disabled",false)
},disable:function(){return this._setOption("disabled",true)
},_trigger:function(F,G,H){var J=this.options[F];
G=B.Event(G);
G.type=(F===this.widgetEventPrefix?F:this.widgetEventPrefix+F).toLowerCase();
H=H||{};
if(G.originalEvent){for(var E=B.event.props.length,I;
E;
){I=B.event.props[--E];
G[I]=G.originalEvent[I]
}}this.element.trigger(G,H);
return !(B.isFunction(J)&&J.call(this.element[0],G,H)===false||G.isDefaultPrevented())
}}
})(jQuery);
/*
 * jQuery UI Mouse 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *    jquery.ui.widget.js
 */
(function(B,C){var A=false;
B(document).mouseup(function(D){A=false
});
B.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var D=this;
this.element.bind("mousedown."+this.widgetName,function(E){return D._mouseDown(E)
}).bind("click."+this.widgetName,function(E){if(true===B.data(E.target,D.widgetName+".preventClickEvent")){B.removeData(E.target,D.widgetName+".preventClickEvent");
E.stopImmediatePropagation();
return false
}});
this.started=false
},_mouseDestroy:function(){this.element.unbind("."+this.widgetName)
},_mouseDown:function(F){if(A){return 
}(this._mouseStarted&&this._mouseUp(F));
this._mouseDownEvent=F;
var E=this,G=(F.which==1),D=(typeof this.options.cancel=="string"&&F.target.nodeName?B(F.target).closest(this.options.cancel).length:false);
if(!G||D||!this._mouseCapture(F)){return true
}this.mouseDelayMet=!this.options.delay;
if(!this.mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){E.mouseDelayMet=true
},this.options.delay)
}if(this._mouseDistanceMet(F)&&this._mouseDelayMet(F)){this._mouseStarted=(this._mouseStart(F)!==false);
if(!this._mouseStarted){F.preventDefault();
return true
}}if(true===B.data(F.target,this.widgetName+".preventClickEvent")){B.removeData(F.target,this.widgetName+".preventClickEvent")
}this._mouseMoveDelegate=function(H){return E._mouseMove(H)
};
this._mouseUpDelegate=function(H){return E._mouseUp(H)
};
B(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);
F.preventDefault();
A=true;
return true
},_mouseMove:function(D){if(B.browser.msie&&!(document.documentMode>=9)&&!D.button){return this._mouseUp(D)
}if(this._mouseStarted){this._mouseDrag(D);
return D.preventDefault()
}if(this._mouseDistanceMet(D)&&this._mouseDelayMet(D)){this._mouseStarted=(this._mouseStart(this._mouseDownEvent,D)!==false);
(this._mouseStarted?this._mouseDrag(D):this._mouseUp(D))
}return !this._mouseStarted
},_mouseUp:function(D){B(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
if(this._mouseStarted){this._mouseStarted=false;
if(D.target==this._mouseDownEvent.target){B.data(D.target,this.widgetName+".preventClickEvent",true)
}this._mouseStop(D)
}return false
},_mouseDistanceMet:function(D){return(Math.max(Math.abs(this._mouseDownEvent.pageX-D.pageX),Math.abs(this._mouseDownEvent.pageY-D.pageY))>=this.options.distance)
},_mouseDelayMet:function(D){return this.mouseDelayMet
},_mouseStart:function(D){},_mouseDrag:function(D){},_mouseStop:function(D){},_mouseCapture:function(D){return true
}})
})(jQuery);
(function(A,B){A.widget("ui.draggable",A.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:true,appendTo:"parent",axis:false,connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false},_create:function(){if(this.options.helper=="original"&&!(/^(?:r|a|f)/).test(this.element.css("position"))){this.element[0].style.position="relative"
}(this.options.addClasses&&this.element.addClass("ui-draggable"));
(this.options.disabled&&this.element.addClass("ui-draggable-disabled"));
this._mouseInit()
},destroy:function(){if(!this.element.data("draggable")){return 
}this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
this._mouseDestroy();
return this
},_mouseCapture:function(C){var D=this.options;
if(this.helper||D.disabled||A(C.target).is(".ui-resizable-handle")){return false
}this.handle=this._getHandle(C);
if(!this.handle){return false
}if(D.iframeFix){A(D.iframeFix===true?"iframe":D.iframeFix).each(function(){A('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1000}).css(A(this).offset()).appendTo("body")
})
}return true
},_mouseStart:function(C){var D=this.options;
this.helper=this._createHelper(C);
this._cacheHelperProportions();
if(A.ui.ddmanager){A.ui.ddmanager.current=this
}this._cacheMargins();
this.cssPosition=this.helper.css("position");
this.scrollParent=this.helper.scrollParent();
this.offset=this.positionAbs=this.element.offset();
this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};
A.extend(this.offset,{click:{left:C.pageX-this.offset.left,top:C.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.originalPosition=this.position=this._generatePosition(C);
this.originalPageX=C.pageX;
this.originalPageY=C.pageY;
(D.cursorAt&&this._adjustOffsetFromHelper(D.cursorAt));
if(D.containment){this._setContainment()
}if(this._trigger("start",C)===false){this._clear();
return false
}this._cacheHelperProportions();
if(A.ui.ddmanager&&!D.dropBehaviour){A.ui.ddmanager.prepareOffsets(this,C)
}this.helper.addClass("ui-draggable-dragging");
this._mouseDrag(C,true);
if(A.ui.ddmanager){A.ui.ddmanager.dragStart(this,C)
}return true
},_mouseDrag:function(C,E){this.position=this._generatePosition(C);
this.positionAbs=this._convertPositionTo("absolute");
if(!E){var D=this._uiHash();
if(this._trigger("drag",C,D)===false){this._mouseUp({});
return false
}this.position=D.position
}if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"
}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"
}if(A.ui.ddmanager){A.ui.ddmanager.drag(this,C)
}return false
},_mouseStop:function(D){var E=false;
if(A.ui.ddmanager&&!this.options.dropBehaviour){E=A.ui.ddmanager.drop(this,D)
}if(this.dropped){E=this.dropped;
this.dropped=false
}if((!this.element[0]||!this.element[0].parentNode)&&this.options.helper=="original"){return false
}if((this.options.revert=="invalid"&&!E)||(this.options.revert=="valid"&&E)||this.options.revert===true||(A.isFunction(this.options.revert)&&this.options.revert.call(this.element,E))){var C=this;
A(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){if(C._trigger("stop",D)!==false){C._clear()
}})
}else{if(this._trigger("stop",D)!==false){this._clear()
}}return false
},_mouseUp:function(C){if(this.options.iframeFix===true){A("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)
})
}if(A.ui.ddmanager){A.ui.ddmanager.dragStop(this,C)
}return A.ui.mouse.prototype._mouseUp.call(this,C)
},cancel:function(){if(this.helper.is(".ui-draggable-dragging")){this._mouseUp({})
}else{this._clear()
}return this
},_getHandle:function(C){var D=!this.options.handle||!A(this.options.handle,this.element).length?true:false;
A(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==C.target){D=true
}});
return D
},_createHelper:function(D){var E=this.options;
var C=A.isFunction(E.helper)?A(E.helper.apply(this.element[0],[D])):(E.helper=="clone"?this.element.clone().removeAttr("id"):this.element);
if(!C.parents("body").length){C.appendTo((E.appendTo=="parent"?this.element[0].parentNode:E.appendTo))
}if(C[0]!=this.element[0]&&!(/(fixed|absolute)/).test(C.css("position"))){C.css("position","absolute")
}return C
},_adjustOffsetFromHelper:function(C){if(typeof C=="string"){C=C.split(" ")
}if(A.isArray(C)){C={left:+C[0],top:+C[1]||0}
}if("left" in C){this.offset.click.left=C.left+this.margins.left
}if("right" in C){this.offset.click.left=this.helperProportions.width-C.right+this.margins.left
}if("top" in C){this.offset.click.top=C.top+this.margins.top
}if("bottom" in C){this.offset.click.top=this.helperProportions.height-C.bottom+this.margins.top
}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();
var C=this.offsetParent.offset();
if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&A.ui.contains(this.scrollParent[0],this.offsetParent[0])){C.left+=this.scrollParent.scrollLeft();
C.top+=this.scrollParent.scrollTop()
}if((this.offsetParent[0]==document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&A.browser.msie)){C={top:0,left:0}
}return{top:C.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:C.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}
},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var C=this.element.position();
return{top:C.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:C.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}
}else{return{top:0,left:0}
}},_cacheMargins:function(){this.margins={left:(parseInt(this.element.css("marginLeft"),10)||0),top:(parseInt(this.element.css("marginTop"),10)||0),right:(parseInt(this.element.css("marginRight"),10)||0),bottom:(parseInt(this.element.css("marginBottom"),10)||0)}
},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}
},_setContainment:function(){var F=this.options;
if(F.containment=="parent"){F.containment=this.helper[0].parentNode
}if(F.containment=="document"||F.containment=="window"){this.containment=[F.containment=="document"?0:A(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,F.containment=="document"?0:A(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,(F.containment=="document"?0:A(window).scrollLeft())+A(F.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(F.containment=="document"?0:A(window).scrollTop())+(A(F.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]
}if(!(/^(document|window|parent)$/).test(F.containment)&&F.containment.constructor!=Array){var G=A(F.containment);
var D=G[0];
if(!D){return 
}var E=G.offset();
var C=(A(D).css("overflow")!="hidden");
this.containment=[(parseInt(A(D).css("borderLeftWidth"),10)||0)+(parseInt(A(D).css("paddingLeft"),10)||0),(parseInt(A(D).css("borderTopWidth"),10)||0)+(parseInt(A(D).css("paddingTop"),10)||0),(C?Math.max(D.scrollWidth,D.offsetWidth):D.offsetWidth)-(parseInt(A(D).css("borderLeftWidth"),10)||0)-(parseInt(A(D).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(C?Math.max(D.scrollHeight,D.offsetHeight):D.offsetHeight)-(parseInt(A(D).css("borderTopWidth"),10)||0)-(parseInt(A(D).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom];
this.relative_container=G
}else{if(F.containment.constructor==Array){this.containment=F.containment
}}},_convertPositionTo:function(F,H){if(!H){H=this.position
}var D=F=="absolute"?1:-1;
var E=this.options,C=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&A.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,G=(/(html|body)/i).test(C[0].tagName);
return{top:(H.top+this.offset.relative.top*D+this.offset.parent.top*D-(A.browser.safari&&A.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(G?0:C.scrollTop()))*D)),left:(H.left+this.offset.relative.left*D+this.offset.parent.left*D-(A.browser.safari&&A.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():G?0:C.scrollLeft())*D))}
},_generatePosition:function(D){var E=this.options,L=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&A.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,I=(/(html|body)/i).test(L[0].tagName);
var H=D.pageX;
var G=D.pageY;
if(this.originalPosition){var C;
if(this.containment){if(this.relative_container){var K=this.relative_container.offset();
C=[this.containment[0]+K.left,this.containment[1]+K.top,this.containment[2]+K.left,this.containment[3]+K.top]
}else{C=this.containment
}if(D.pageX-this.offset.click.left<C[0]){H=C[0]+this.offset.click.left
}if(D.pageY-this.offset.click.top<C[1]){G=C[1]+this.offset.click.top
}if(D.pageX-this.offset.click.left>C[2]){H=C[2]+this.offset.click.left
}if(D.pageY-this.offset.click.top>C[3]){G=C[3]+this.offset.click.top
}}if(E.grid){var J=E.grid[1]?this.originalPageY+Math.round((G-this.originalPageY)/E.grid[1])*E.grid[1]:this.originalPageY;
G=C?(!(J-this.offset.click.top<C[1]||J-this.offset.click.top>C[3])?J:(!(J-this.offset.click.top<C[1])?J-E.grid[1]:J+E.grid[1])):J;
var F=E.grid[0]?this.originalPageX+Math.round((H-this.originalPageX)/E.grid[0])*E.grid[0]:this.originalPageX;
H=C?(!(F-this.offset.click.left<C[0]||F-this.offset.click.left>C[2])?F:(!(F-this.offset.click.left<C[0])?F-E.grid[0]:F+E.grid[0])):F
}}return{top:(G-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(A.browser.safari&&A.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(I?0:L.scrollTop())))),left:(H-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(A.browser.safari&&A.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():I?0:L.scrollLeft())))}
},_clear:function(){this.helper.removeClass("ui-draggable-dragging");
if(this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval){this.helper.remove()
}this.helper=null;
this.cancelHelperRemoval=false
},_trigger:function(C,D,E){E=E||this._uiHash();
A.ui.plugin.call(this,C,[D,E]);
if(C=="drag"){this.positionAbs=this._convertPositionTo("absolute")
}return A.Widget.prototype._trigger.call(this,C,D,E)
},plugins:{},_uiHash:function(C){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}
}});
A.extend(A.ui.draggable,{version:"1.8.16"});
A.ui.plugin.add("draggable","connectToSortable",{start:function(D,F){var E=A(this).data("draggable"),G=E.options,C=A.extend({},F,{item:E.element});
E.sortables=[];
A(G.connectToSortable).each(function(){var H=A.data(this,"sortable");
if(H&&!H.options.disabled){E.sortables.push({instance:H,shouldRevert:H.options.revert});
H.refreshPositions();
H._trigger("activate",D,C)
}})
},stop:function(D,F){var E=A(this).data("draggable"),C=A.extend({},F,{item:E.element});
A.each(E.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;
E.cancelHelperRemoval=true;
this.instance.cancelHelperRemoval=false;
if(this.shouldRevert){this.instance.options.revert=true
}this.instance._mouseStop(D);
this.instance.options.helper=this.instance.options._helper;
if(E.options.helper=="original"){this.instance.currentItem.css({top:"auto",left:"auto"})
}}else{this.instance.cancelHelperRemoval=false;
this.instance._trigger("deactivate",D,C)
}})
},drag:function(D,G){var F=A(this).data("draggable"),C=this;
var E=function(J){var O=this.offset.click.top,N=this.offset.click.left;
var H=this.positionAbs.top,L=this.positionAbs.left;
var K=J.height,M=J.width;
var P=J.top,I=J.left;
return A.ui.isOver(H+O,L+N,P,I,K,M)
};
A.each(F.sortables,function(H){this.instance.positionAbs=F.positionAbs;
this.instance.helperProportions=F.helperProportions;
this.instance.offset.click=F.offset.click;
if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;
this.instance.currentItem=A(C).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",true);
this.instance.options._helper=this.instance.options.helper;
this.instance.options.helper=function(){return G.helper[0]
};
D.target=this.instance.currentItem[0];
this.instance._mouseCapture(D,true);
this.instance._mouseStart(D,true,true);
this.instance.offset.click.top=F.offset.click.top;
this.instance.offset.click.left=F.offset.click.left;
this.instance.offset.parent.left-=F.offset.parent.left-this.instance.offset.parent.left;
this.instance.offset.parent.top-=F.offset.parent.top-this.instance.offset.parent.top;
F._trigger("toSortable",D);
F.dropped=this.instance.element;
F.currentItem=F.element;
this.instance.fromOutside=F
}if(this.instance.currentItem){this.instance._mouseDrag(D)
}}else{if(this.instance.isOver){this.instance.isOver=0;
this.instance.cancelHelperRemoval=true;
this.instance.options.revert=false;
this.instance._trigger("out",D,this.instance._uiHash(this.instance));
this.instance._mouseStop(D,true);
this.instance.options.helper=this.instance.options._helper;
this.instance.currentItem.remove();
if(this.instance.placeholder){this.instance.placeholder.remove()
}F._trigger("fromSortable",D);
F.dropped=false
}}})
}});
A.ui.plugin.add("draggable","cursor",{start:function(D,E){var C=A("body"),F=A(this).data("draggable").options;
if(C.css("cursor")){F._cursor=C.css("cursor")
}C.css("cursor",F.cursor)
},stop:function(C,D){var E=A(this).data("draggable").options;
if(E._cursor){A("body").css("cursor",E._cursor)
}}});
A.ui.plugin.add("draggable","opacity",{start:function(D,E){var C=A(E.helper),F=A(this).data("draggable").options;
if(C.css("opacity")){F._opacity=C.css("opacity")
}C.css("opacity",F.opacity)
},stop:function(C,D){var E=A(this).data("draggable").options;
if(E._opacity){A(D.helper).css("opacity",E._opacity)
}}});
A.ui.plugin.add("draggable","scroll",{start:function(D,E){var C=A(this).data("draggable");
if(C.scrollParent[0]!=document&&C.scrollParent[0].tagName!="HTML"){C.overflowOffset=C.scrollParent.offset()
}},drag:function(E,F){var D=A(this).data("draggable"),G=D.options,C=false;
if(D.scrollParent[0]!=document&&D.scrollParent[0].tagName!="HTML"){if(!G.axis||G.axis!="x"){if((D.overflowOffset.top+D.scrollParent[0].offsetHeight)-E.pageY<G.scrollSensitivity){D.scrollParent[0].scrollTop=C=D.scrollParent[0].scrollTop+G.scrollSpeed
}else{if(E.pageY-D.overflowOffset.top<G.scrollSensitivity){D.scrollParent[0].scrollTop=C=D.scrollParent[0].scrollTop-G.scrollSpeed
}}}if(!G.axis||G.axis!="y"){if((D.overflowOffset.left+D.scrollParent[0].offsetWidth)-E.pageX<G.scrollSensitivity){D.scrollParent[0].scrollLeft=C=D.scrollParent[0].scrollLeft+G.scrollSpeed
}else{if(E.pageX-D.overflowOffset.left<G.scrollSensitivity){D.scrollParent[0].scrollLeft=C=D.scrollParent[0].scrollLeft-G.scrollSpeed
}}}}else{if(!G.axis||G.axis!="x"){if(E.pageY-A(document).scrollTop()<G.scrollSensitivity){C=A(document).scrollTop(A(document).scrollTop()-G.scrollSpeed)
}else{if(A(window).height()-(E.pageY-A(document).scrollTop())<G.scrollSensitivity){C=A(document).scrollTop(A(document).scrollTop()+G.scrollSpeed)
}}}if(!G.axis||G.axis!="y"){if(E.pageX-A(document).scrollLeft()<G.scrollSensitivity){C=A(document).scrollLeft(A(document).scrollLeft()-G.scrollSpeed)
}else{if(A(window).width()-(E.pageX-A(document).scrollLeft())<G.scrollSensitivity){C=A(document).scrollLeft(A(document).scrollLeft()+G.scrollSpeed)
}}}}if(C!==false&&A.ui.ddmanager&&!G.dropBehaviour){A.ui.ddmanager.prepareOffsets(D,E)
}}});
A.ui.plugin.add("draggable","snap",{start:function(D,E){var C=A(this).data("draggable"),F=C.options;
C.snapElements=[];
A(F.snap.constructor!=String?(F.snap.items||":data(draggable)"):F.snap).each(function(){var H=A(this);
var G=H.offset();
if(this!=C.element[0]){C.snapElements.push({item:this,width:H.outerWidth(),height:H.outerHeight(),top:G.top,left:G.left})
}})
},drag:function(O,L){var F=A(this).data("draggable"),M=F.options;
var S=M.snapTolerance;
var R=L.offset.left,Q=R+F.helperProportions.width,E=L.offset.top,D=E+F.helperProportions.height;
for(var P=F.snapElements.length-1;
P>=0;
P--){var N=F.snapElements[P].left,K=N+F.snapElements[P].width,J=F.snapElements[P].top,U=J+F.snapElements[P].height;
if(!((N-S<R&&R<K+S&&J-S<E&&E<U+S)||(N-S<R&&R<K+S&&J-S<D&&D<U+S)||(N-S<Q&&Q<K+S&&J-S<E&&E<U+S)||(N-S<Q&&Q<K+S&&J-S<D&&D<U+S))){if(F.snapElements[P].snapping){(F.options.snap.release&&F.options.snap.release.call(F.element,O,A.extend(F._uiHash(),{snapItem:F.snapElements[P].item})))
}F.snapElements[P].snapping=false;
continue
}if(M.snapMode!="inner"){var C=Math.abs(J-D)<=S;
var T=Math.abs(U-E)<=S;
var H=Math.abs(N-Q)<=S;
var I=Math.abs(K-R)<=S;
if(C){L.position.top=F._convertPositionTo("relative",{top:J-F.helperProportions.height,left:0}).top-F.margins.top
}if(T){L.position.top=F._convertPositionTo("relative",{top:U,left:0}).top-F.margins.top
}if(H){L.position.left=F._convertPositionTo("relative",{top:0,left:N-F.helperProportions.width}).left-F.margins.left
}if(I){L.position.left=F._convertPositionTo("relative",{top:0,left:K}).left-F.margins.left
}}var G=(C||T||H||I);
if(M.snapMode!="outer"){var C=Math.abs(J-E)<=S;
var T=Math.abs(U-D)<=S;
var H=Math.abs(N-R)<=S;
var I=Math.abs(K-Q)<=S;
if(C){L.position.top=F._convertPositionTo("relative",{top:J,left:0}).top-F.margins.top
}if(T){L.position.top=F._convertPositionTo("relative",{top:U-F.helperProportions.height,left:0}).top-F.margins.top
}if(H){L.position.left=F._convertPositionTo("relative",{top:0,left:N}).left-F.margins.left
}if(I){L.position.left=F._convertPositionTo("relative",{top:0,left:K-F.helperProportions.width}).left-F.margins.left
}}if(!F.snapElements[P].snapping&&(C||T||H||I||G)){(F.options.snap.snap&&F.options.snap.snap.call(F.element,O,A.extend(F._uiHash(),{snapItem:F.snapElements[P].item})))
}F.snapElements[P].snapping=(C||T||H||I||G)
}}});
A.ui.plugin.add("draggable","stack",{start:function(D,E){var G=A(this).data("draggable").options;
var F=A.makeArray(A(G.stack)).sort(function(I,H){return(parseInt(A(I).css("zIndex"),10)||0)-(parseInt(A(H).css("zIndex"),10)||0)
});
if(!F.length){return 
}var C=parseInt(F[0].style.zIndex)||0;
A(F).each(function(H){this.style.zIndex=C+H
});
this[0].style.zIndex=C+F.length
}});
A.ui.plugin.add("draggable","zIndex",{start:function(D,E){var C=A(E.helper),F=A(this).data("draggable").options;
if(C.css("zIndex")){F._zIndex=C.css("zIndex")
}C.css("zIndex",F.zIndex)
},stop:function(C,D){var E=A(this).data("draggable").options;
if(E._zIndex){A(D.helper).css("zIndex",E._zIndex)
}}})
})(jQuery);
(function(A,B){A.widget("ui.droppable",{widgetEventPrefix:"drop",options:{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect"},_create:function(){var D=this.options,C=D.accept;
this.isover=0;
this.isout=1;
this.accept=A.isFunction(C)?C:function(E){return E.is(C)
};
this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};
A.ui.ddmanager.droppables[D.scope]=A.ui.ddmanager.droppables[D.scope]||[];
A.ui.ddmanager.droppables[D.scope].push(this);
(D.addClasses&&this.element.addClass("ui-droppable"))
},destroy:function(){var C=A.ui.ddmanager.droppables[this.options.scope];
for(var D=0;
D<C.length;
D++){if(C[D]==this){C.splice(D,1)
}}this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");
return this
},_setOption:function(C,D){if(C=="accept"){this.accept=A.isFunction(D)?D:function(E){return E.is(D)
}
}A.Widget.prototype._setOption.apply(this,arguments)
},_activate:function(D){var C=A.ui.ddmanager.current;
if(this.options.activeClass){this.element.addClass(this.options.activeClass)
}(C&&this._trigger("activate",D,this.ui(C)))
},_deactivate:function(D){var C=A.ui.ddmanager.current;
if(this.options.activeClass){this.element.removeClass(this.options.activeClass)
}(C&&this._trigger("deactivate",D,this.ui(C)))
},_over:function(D){var C=A.ui.ddmanager.current;
if(!C||(C.currentItem||C.element)[0]==this.element[0]){return 
}if(this.accept.call(this.element[0],(C.currentItem||C.element))){if(this.options.hoverClass){this.element.addClass(this.options.hoverClass)
}this._trigger("over",D,this.ui(C))
}},_out:function(D){var C=A.ui.ddmanager.current;
if(!C||(C.currentItem||C.element)[0]==this.element[0]){return 
}if(this.accept.call(this.element[0],(C.currentItem||C.element))){if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)
}this._trigger("out",D,this.ui(C))
}},_drop:function(D,E){var C=E||A.ui.ddmanager.current;
if(!C||(C.currentItem||C.element)[0]==this.element[0]){return false
}var F=false;
this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var G=A.data(this,"droppable");
if(G.options.greedy&&!G.options.disabled&&G.options.scope==C.options.scope&&G.accept.call(G.element[0],(C.currentItem||C.element))&&A.ui.intersect(C,A.extend(G,{offset:G.element.offset()}),G.options.tolerance)){F=true;
return false
}});
if(F){return false
}if(this.accept.call(this.element[0],(C.currentItem||C.element))){if(this.options.activeClass){this.element.removeClass(this.options.activeClass)
}if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)
}this._trigger("drop",D,this.ui(C));
return this.element
}return false
},ui:function(C){return{draggable:(C.currentItem||C.element),helper:C.helper,position:C.position,offset:C.positionAbs}
}});
A.extend(A.ui.droppable,{version:"1.8.16"});
A.ui.intersect=function(P,J,N){if(!J.offset){return false
}var E=(P.positionAbs||P.position.absolute).left,D=E+P.helperProportions.width,M=(P.positionAbs||P.position.absolute).top,L=M+P.helperProportions.height;
var G=J.offset.left,C=G+J.proportions.width,O=J.offset.top,K=O+J.proportions.height;
switch(N){case"fit":return(G<=E&&D<=C&&O<=M&&L<=K);
break;
case"intersect":return(G<E+(P.helperProportions.width/2)&&D-(P.helperProportions.width/2)<C&&O<M+(P.helperProportions.height/2)&&L-(P.helperProportions.height/2)<K);
break;
case"pointer":var H=((P.positionAbs||P.position.absolute).left+(P.clickOffset||P.offset.click).left),I=((P.positionAbs||P.position.absolute).top+(P.clickOffset||P.offset.click).top),F=A.ui.isOver(I,H,O,G,J.proportions.height,J.proportions.width);
return F;
break;
case"touch":return((M>=O&&M<=K)||(L>=O&&L<=K)||(M<O&&L>K))&&((E>=G&&E<=C)||(D>=G&&D<=C)||(E<G&&D>C));
break;
default:return false;
break
}};
A.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(F,H){var C=A.ui.ddmanager.droppables[F.options.scope]||[];
var G=H?H.type:null;
var I=(F.currentItem||F.element).find(":data(droppable)").andSelf();
droppablesLoop:for(var E=0;
E<C.length;
E++){if(C[E].options.disabled||(F&&!C[E].accept.call(C[E].element[0],(F.currentItem||F.element)))){continue
}for(var D=0;
D<I.length;
D++){if(I[D]==C[E].element[0]){C[E].proportions.height=0;
continue droppablesLoop
}}C[E].visible=C[E].element.css("display")!="none";
if(!C[E].visible){continue
}if(G=="mousedown"){C[E]._activate.call(C[E],H)
}C[E].offset=C[E].element.offset();
C[E].proportions={width:C[E].element[0].offsetWidth,height:C[E].element[0].offsetHeight}
}},drop:function(C,D){var E=false;
A.each(A.ui.ddmanager.droppables[C.options.scope]||[],function(){if(!this.options){return 
}if(!this.options.disabled&&this.visible&&A.ui.intersect(C,this,this.options.tolerance)){E=E||this._drop.call(this,D)
}if(!this.options.disabled&&this.visible&&this.accept.call(this.element[0],(C.currentItem||C.element))){this.isout=1;
this.isover=0;
this._deactivate.call(this,D)
}});
return E
},dragStart:function(C,D){C.element.parents(":not(body,html)").bind("scroll.droppable",function(){if(!C.options.refreshPositions){A.ui.ddmanager.prepareOffsets(C,D)
}})
},drag:function(C,D){if(C.options.refreshPositions){A.ui.ddmanager.prepareOffsets(C,D)
}A.each(A.ui.ddmanager.droppables[C.options.scope]||[],function(){if(this.options.disabled||this.greedyChild||!this.visible){return 
}var F=A.ui.intersect(C,this,this.options.tolerance);
var H=!F&&this.isover==1?"isout":(F&&this.isover==0?"isover":null);
if(!H){return 
}var G;
if(this.options.greedy){var E=this.element.parents(":data(droppable):eq(0)");
if(E.length){G=A.data(E[0],"droppable");
G.greedyChild=(H=="isover"?1:0)
}}if(G&&H=="isover"){G.isover=0;
G.isout=1;
G._out.call(G,D)
}this[H]=1;
this[H=="isout"?"isover":"isout"]=0;
this[H=="isover"?"_over":"_out"].call(this,D);
if(G&&H=="isout"){G.isout=0;
G.isover=1;
G._over.call(G,D)
}})
},dragStop:function(C,D){C.element.parents(":not(body,html)").unbind("scroll.droppable");
if(!C.options.refreshPositions){A.ui.ddmanager.prepareOffsets(C,D)
}}}
})(jQuery);
(function(C,D){C.widget("ui.resizable",C.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,containment:false,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1000},_create:function(){var F=this,J=this.options;
this.element.addClass("ui-resizable");
C.extend(this,{_aspectRatio:!!(J.aspectRatio),aspectRatio:J.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:J.helper||J.ghost||J.animate?J.helper||"ui-resizable-helper":null});
if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){if(/relative/.test(this.element.css("position"))&&C.browser.opera){this.element.css({position:"relative",top:"auto",left:"auto"})
}this.element.wrap(C('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")}));
this.element=this.element.parent().data("resizable",this.element.data("resizable"));
this.elementIsWrapper=true;
this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});
this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});
this.originalResizeStyle=this.originalElement.css("resize");
this.originalElement.css("resize","none");
this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));
this.originalElement.css({margin:this.originalElement.css("margin")});
this._proportionallyResize()
}this.handles=J.handles||(!C(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"});
if(this.handles.constructor==String){if(this.handles=="all"){this.handles="n,e,s,w,se,sw,ne,nw"
}var K=this.handles.split(",");
this.handles={};
for(var G=0;
G<K.length;
G++){var I=C.trim(K[G]),E="ui-resizable-"+I;
var H=C('<div class="ui-resizable-handle '+E+'"></div>');
if(/sw|se|ne|nw/.test(I)){H.css({zIndex:++J.zIndex})
}if("se"==I){H.addClass("ui-icon ui-icon-gripsmall-diagonal-se")
}this.handles[I]=".ui-resizable-"+I;
this.element.append(H)
}}this._renderAxis=function(P){P=P||this.element;
for(var M in this.handles){if(this.handles[M].constructor==String){this.handles[M]=C(this.handles[M],this.element).show()
}if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var N=C(this.handles[M],this.element),O=0;
O=/sw|ne|nw|se|n|s/.test(M)?N.outerHeight():N.outerWidth();
var L=["padding",/ne|nw|n/.test(M)?"Top":/se|sw|s/.test(M)?"Bottom":/^e$/.test(M)?"Right":"Left"].join("");
P.css(L,O);
this._proportionallyResize()
}if(!C(this.handles[M]).length){continue
}}};
this._renderAxis(this.element);
this._handles=C(".ui-resizable-handle",this.element).disableSelection();
this._handles.mouseover(function(){if(!F.resizing){if(this.className){var L=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
}F.axis=L&&L[1]?L[1]:"se"
}});
if(J.autoHide){this._handles.hide();
C(this.element).addClass("ui-resizable-autohide").hover(function(){if(J.disabled){return 
}C(this).removeClass("ui-resizable-autohide");
F._handles.show()
},function(){if(J.disabled){return 
}if(!F.resizing){C(this).addClass("ui-resizable-autohide");
F._handles.hide()
}})
}this._mouseInit()
},destroy:function(){this._mouseDestroy();
var E=function(G){C(G).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
};
if(this.elementIsWrapper){E(this.element);
var F=this.element;
F.after(this.originalElement.css({position:F.css("position"),width:F.outerWidth(),height:F.outerHeight(),top:F.css("top"),left:F.css("left")})).remove()
}this.originalElement.css("resize",this.originalResizeStyle);
E(this.originalElement);
return this
},_mouseCapture:function(F){var G=false;
for(var E in this.handles){if(C(this.handles[E])[0]==F.target){G=true
}}return !this.options.disabled&&G
},_mouseStart:function(G){var J=this.options,F=this.element.position(),E=this.element;
this.resizing=true;
this.documentScroll={top:C(document).scrollTop(),left:C(document).scrollLeft()};
if(E.is(".ui-draggable")||(/absolute/).test(E.css("position"))){E.css({position:"absolute",top:F.top,left:F.left})
}if(C.browser.opera&&(/relative/).test(E.css("position"))){E.css({position:"relative",top:"auto",left:"auto"})
}this._renderProxy();
var K=B(this.helper.css("left")),H=B(this.helper.css("top"));
if(J.containment){K+=C(J.containment).scrollLeft()||0;
H+=C(J.containment).scrollTop()||0
}this.offset=this.helper.offset();
this.position={left:K,top:H};
this.size=this._helper?{width:E.outerWidth(),height:E.outerHeight()}:{width:E.width(),height:E.height()};
this.originalSize=this._helper?{width:E.outerWidth(),height:E.outerHeight()}:{width:E.width(),height:E.height()};
this.originalPosition={left:K,top:H};
this.sizeDiff={width:E.outerWidth()-E.width(),height:E.outerHeight()-E.height()};
this.originalMousePosition={left:G.pageX,top:G.pageY};
this.aspectRatio=(typeof J.aspectRatio=="number")?J.aspectRatio:((this.originalSize.width/this.originalSize.height)||1);
var I=C(".ui-resizable-"+this.axis).css("cursor");
C("body").css("cursor",I=="auto"?this.axis+"-resize":I);
E.addClass("ui-resizable-resizing");
this._propagate("start",G);
return true
},_mouseDrag:function(E){var H=this.helper,G=this.options,M={},P=this,J=this.originalMousePosition,N=this.axis;
var Q=(E.pageX-J.left)||0,O=(E.pageY-J.top)||0;
var I=this._change[N];
if(!I){return false
}var L=I.apply(this,[E,Q,O]),K=C.browser.msie&&C.browser.version<7,F=this.sizeDiff;
this._updateVirtualBoundaries(E.shiftKey);
if(this._aspectRatio||E.shiftKey){L=this._updateRatio(L,E)
}L=this._respectSize(L,E);
this._propagate("resize",E);
H.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});
if(!this._helper&&this._proportionallyResizeElements.length){this._proportionallyResize()
}this._updateCache(L);
this._trigger("resize",E,this.ui());
return false
},_mouseStop:function(H){this.resizing=false;
var I=this.options,M=this;
if(this._helper){var G=this._proportionallyResizeElements,E=G.length&&(/textarea/i).test(G[0].nodeName),F=E&&C.ui.hasScroll(G[0],"left")?0:M.sizeDiff.height,K=E?0:M.sizeDiff.width;
var N={width:(M.helper.width()-K),height:(M.helper.height()-F)},J=(parseInt(M.element.css("left"),10)+(M.position.left-M.originalPosition.left))||null,L=(parseInt(M.element.css("top"),10)+(M.position.top-M.originalPosition.top))||null;
if(!I.animate){this.element.css(C.extend(N,{top:L,left:J}))
}M.helper.height(M.size.height);
M.helper.width(M.size.width);
if(this._helper&&!I.animate){this._proportionallyResize()
}}C("body").css("cursor","auto");
this.element.removeClass("ui-resizable-resizing");
this._propagate("stop",H);
if(this._helper){this.helper.remove()
}return false
},_updateVirtualBoundaries:function(G){var J=this.options,I,H,F,K,E;
E={minWidth:A(J.minWidth)?J.minWidth:0,maxWidth:A(J.maxWidth)?J.maxWidth:Infinity,minHeight:A(J.minHeight)?J.minHeight:0,maxHeight:A(J.maxHeight)?J.maxHeight:Infinity};
if(this._aspectRatio||G){I=E.minHeight*this.aspectRatio;
F=E.minWidth/this.aspectRatio;
H=E.maxHeight*this.aspectRatio;
K=E.maxWidth/this.aspectRatio;
if(I>E.minWidth){E.minWidth=I
}if(F>E.minHeight){E.minHeight=F
}if(H<E.maxWidth){E.maxWidth=H
}if(K<E.maxHeight){E.maxHeight=K
}}this._vBoundaries=E
},_updateCache:function(E){var F=this.options;
this.offset=this.helper.offset();
if(A(E.left)){this.position.left=E.left
}if(A(E.top)){this.position.top=E.top
}if(A(E.height)){this.size.height=E.height
}if(A(E.width)){this.size.width=E.width
}},_updateRatio:function(H,G){var I=this.options,J=this.position,F=this.size,E=this.axis;
if(A(H.height)){H.width=(H.height*this.aspectRatio)
}else{if(A(H.width)){H.height=(H.width/this.aspectRatio)
}}if(E=="sw"){H.left=J.left+(F.width-H.width);
H.top=null
}if(E=="nw"){H.top=J.top+(F.height-H.height);
H.left=J.left+(F.width-H.width)
}return H
},_respectSize:function(L,G){var J=this.helper,I=this._vBoundaries,Q=this._aspectRatio||G.shiftKey,P=this.axis,S=A(L.width)&&I.maxWidth&&(I.maxWidth<L.width),M=A(L.height)&&I.maxHeight&&(I.maxHeight<L.height),H=A(L.width)&&I.minWidth&&(I.minWidth>L.width),R=A(L.height)&&I.minHeight&&(I.minHeight>L.height);
if(H){L.width=I.minWidth
}if(R){L.height=I.minHeight
}if(S){L.width=I.maxWidth
}if(M){L.height=I.maxHeight
}var F=this.originalPosition.left+this.originalSize.width,O=this.position.top+this.size.height;
var K=/sw|nw|w/.test(P),E=/nw|ne|n/.test(P);
if(H&&K){L.left=F-I.minWidth
}if(S&&K){L.left=F-I.maxWidth
}if(R&&E){L.top=O-I.minHeight
}if(M&&E){L.top=O-I.maxHeight
}var N=!L.width&&!L.height;
if(N&&!L.left&&L.top){L.top=null
}else{if(N&&!L.top&&L.left){L.left=null
}}return L
},_proportionallyResize:function(){var J=this.options;
if(!this._proportionallyResizeElements.length){return 
}var G=this.helper||this.element;
for(var F=0;
F<this._proportionallyResizeElements.length;
F++){var H=this._proportionallyResizeElements[F];
if(!this.borderDif){var E=[H.css("borderTopWidth"),H.css("borderRightWidth"),H.css("borderBottomWidth"),H.css("borderLeftWidth")],I=[H.css("paddingTop"),H.css("paddingRight"),H.css("paddingBottom"),H.css("paddingLeft")];
this.borderDif=C.map(E,function(K,M){var L=parseInt(K,10)||0,N=parseInt(I[M],10)||0;
return L+N
})
}if(C.browser.msie&&!(!(C(G).is(":hidden")||C(G).parents(":hidden").length))){continue
}H.css({height:(G.height()-this.borderDif[0]-this.borderDif[2])||0,width:(G.width()-this.borderDif[1]-this.borderDif[3])||0})
}},_renderProxy:function(){var F=this.element,I=this.options;
this.elementOffset=F.offset();
if(this._helper){this.helper=this.helper||C('<div style="overflow:hidden;"></div>');
var E=C.browser.msie&&C.browser.version<7,G=(E?1:0),H=(E?2:-1);
this.helper.addClass(this._helper).css({width:this.element.outerWidth()+H,height:this.element.outerHeight()+H,position:"absolute",left:this.elementOffset.left-G+"px",top:this.elementOffset.top-G+"px",zIndex:++I.zIndex});
this.helper.appendTo("body").disableSelection()
}else{this.helper=this.element
}},_change:{e:function(G,F,E){return{width:this.originalSize.width+F}
},w:function(H,F,E){var J=this.options,G=this.originalSize,I=this.originalPosition;
return{left:I.left+F,width:G.width-F}
},n:function(H,F,E){var J=this.options,G=this.originalSize,I=this.originalPosition;
return{top:I.top+E,height:G.height-E}
},s:function(G,F,E){return{height:this.originalSize.height+E}
},se:function(G,F,E){return C.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[G,F,E]))
},sw:function(G,F,E){return C.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[G,F,E]))
},ne:function(G,F,E){return C.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[G,F,E]))
},nw:function(G,F,E){return C.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[G,F,E]))
}},_propagate:function(F,E){C.ui.plugin.call(this,F,[E,this.ui()]);
(F!="resize"&&this._trigger(F,E,this.ui()))
},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}
}});
C.extend(C.ui.resizable,{version:"1.8.16"});
C.ui.plugin.add("resizable","alsoResize",{start:function(F,G){var E=C(this).data("resizable"),I=E.options;
var H=function(J){C(J).each(function(){var K=C(this);
K.data("resizable-alsoresize",{width:parseInt(K.width(),10),height:parseInt(K.height(),10),left:parseInt(K.css("left"),10),top:parseInt(K.css("top"),10),position:K.css("position")})
})
};
if(typeof (I.alsoResize)=="object"&&!I.alsoResize.parentNode){if(I.alsoResize.length){I.alsoResize=I.alsoResize[0];
H(I.alsoResize)
}else{C.each(I.alsoResize,function(J){H(J)
})
}}else{H(I.alsoResize)
}},resize:function(G,I){var F=C(this).data("resizable"),J=F.options,H=F.originalSize,L=F.originalPosition;
var K={height:(F.size.height-H.height)||0,width:(F.size.width-H.width)||0,top:(F.position.top-L.top)||0,left:(F.position.left-L.left)||0},E=function(M,N){C(M).each(function(){var Q=C(this),R=C(this).data("resizable-alsoresize"),P={},O=N&&N.length?N:Q.parents(I.originalElement[0]).length?["width","height"]:["width","height","top","left"];
C.each(O,function(S,U){var T=(R[U]||0)+(K[U]||0);
if(T&&T>=0){P[U]=T||null
}});
if(C.browser.opera&&/relative/.test(Q.css("position"))){F._revertToRelativePosition=true;
Q.css({position:"absolute",top:"auto",left:"auto"})
}Q.css(P)
})
};
if(typeof (J.alsoResize)=="object"&&!J.alsoResize.nodeType){C.each(J.alsoResize,function(M,N){E(M,N)
})
}else{E(J.alsoResize)
}},stop:function(G,H){var F=C(this).data("resizable"),I=F.options;
var E=function(J){C(J).each(function(){var K=C(this);
K.css({position:K.data("resizable-alsoresize").position})
})
};
if(F._revertToRelativePosition){F._revertToRelativePosition=false;
if(typeof (I.alsoResize)=="object"&&!I.alsoResize.nodeType){C.each(I.alsoResize,function(J){E(J)
})
}else{E(I.alsoResize)
}}C(this).removeData("resizable-alsoresize")
}});
C.ui.plugin.add("resizable","animate",{stop:function(I,N){var O=C(this).data("resizable"),J=O.options;
var H=O._proportionallyResizeElements,E=H.length&&(/textarea/i).test(H[0].nodeName),F=E&&C.ui.hasScroll(H[0],"left")?0:O.sizeDiff.height,L=E?0:O.sizeDiff.width;
var G={width:(O.size.width-L),height:(O.size.height-F)},K=(parseInt(O.element.css("left"),10)+(O.position.left-O.originalPosition.left))||null,M=(parseInt(O.element.css("top"),10)+(O.position.top-O.originalPosition.top))||null;
O.element.animate(C.extend(G,M&&K?{top:M,left:K}:{}),{duration:J.animateDuration,easing:J.animateEasing,step:function(){var P={width:parseInt(O.element.css("width"),10),height:parseInt(O.element.css("height"),10),top:parseInt(O.element.css("top"),10),left:parseInt(O.element.css("left"),10)};
if(H&&H.length){C(H[0]).css({width:P.width,height:P.height})
}O._updateCache(P);
O._propagate("resize",I)
}})
}});
C.ui.plugin.add("resizable","containment",{start:function(F,P){var R=C(this).data("resizable"),J=R.options,L=R.element;
var G=J.containment,K=(G instanceof C)?G.get(0):(/parent/.test(G))?L.parent().get(0):G;
if(!K){return 
}R.containerElement=C(K);
if(/document/.test(G)||G==document){R.containerOffset={left:0,top:0};
R.containerPosition={left:0,top:0};
R.parentData={element:C(document),left:0,top:0,width:C(document).width(),height:C(document).height()||document.body.parentNode.scrollHeight}
}else{var N=C(K),I=[];
C(["Top","Right","Left","Bottom"]).each(function(T,S){I[T]=B(N.css("padding"+S))
});
R.containerOffset=N.offset();
R.containerPosition=N.position();
R.containerSize={height:(N.innerHeight()-I[3]),width:(N.innerWidth()-I[1])};
var O=R.containerOffset,E=R.containerSize.height,M=R.containerSize.width,H=(C.ui.hasScroll(K,"left")?K.scrollWidth:M),Q=(C.ui.hasScroll(K)?K.scrollHeight:E);
R.parentData={element:K,left:O.left,top:O.top,width:H,height:Q}
}},resize:function(G,P){var S=C(this).data("resizable"),I=S.options,F=S.containerSize,O=S.containerOffset,M=S.size,N=S.position,Q=S._aspectRatio||G.shiftKey,E={top:0,left:0},H=S.containerElement;
if(H[0]!=document&&(/static/).test(H.css("position"))){E=O
}if(N.left<(S._helper?O.left:0)){S.size.width=S.size.width+(S._helper?(S.position.left-O.left):(S.position.left-E.left));
if(Q){S.size.height=S.size.width/I.aspectRatio
}S.position.left=I.helper?O.left:0
}if(N.top<(S._helper?O.top:0)){S.size.height=S.size.height+(S._helper?(S.position.top-O.top):S.position.top);
if(Q){S.size.width=S.size.height*I.aspectRatio
}S.position.top=S._helper?O.top:0
}S.offset.left=S.parentData.left+S.position.left;
S.offset.top=S.parentData.top+S.position.top;
var L=Math.abs((S._helper?S.offset.left-E.left:(S.offset.left-E.left))+S.sizeDiff.width),R=Math.abs((S._helper?S.offset.top-E.top:(S.offset.top-O.top))+S.sizeDiff.height);
var K=S.containerElement.get(0)==S.element.parent().get(0),J=/relative|absolute/.test(S.containerElement.css("position"));
if(K&&J){L-=S.parentData.left
}if(L+S.size.width>=S.parentData.width){S.size.width=S.parentData.width-L;
if(Q){S.size.height=S.size.width/S.aspectRatio
}}if(R+S.size.height>=S.parentData.height){S.size.height=S.parentData.height-R;
if(Q){S.size.width=S.size.height*S.aspectRatio
}}},stop:function(F,M){var O=C(this).data("resizable"),G=O.options,K=O.position,L=O.containerOffset,E=O.containerPosition,H=O.containerElement;
var I=C(O.helper),P=I.offset(),N=I.outerWidth()-O.sizeDiff.width,J=I.outerHeight()-O.sizeDiff.height;
if(O._helper&&!G.animate&&(/relative/).test(H.css("position"))){C(this).css({left:P.left-E.left-L.left,width:N,height:J})
}if(O._helper&&!G.animate&&(/static/).test(H.css("position"))){C(this).css({left:P.left-E.left-L.left,width:N,height:J})
}}});
C.ui.plugin.add("resizable","ghost",{start:function(G,H){var E=C(this).data("resizable"),I=E.options,F=E.size;
E.ghost=E.originalElement.clone();
E.ghost.css({opacity:0.25,display:"block",position:"relative",height:F.height,width:F.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof I.ghost=="string"?I.ghost:"");
E.ghost.appendTo(E.helper)
},resize:function(F,G){var E=C(this).data("resizable"),H=E.options;
if(E.ghost){E.ghost.css({position:"relative",height:E.size.height,width:E.size.width})
}},stop:function(F,G){var E=C(this).data("resizable"),H=E.options;
if(E.ghost&&E.helper){E.helper.get(0).removeChild(E.ghost.get(0))
}}});
C.ui.plugin.add("resizable","grid",{resize:function(E,M){var O=C(this).data("resizable"),H=O.options,K=O.size,I=O.originalSize,J=O.originalPosition,N=O.axis,L=H._aspectRatio||E.shiftKey;
H.grid=typeof H.grid=="number"?[H.grid,H.grid]:H.grid;
var G=Math.round((K.width-I.width)/(H.grid[0]||1))*(H.grid[0]||1),F=Math.round((K.height-I.height)/(H.grid[1]||1))*(H.grid[1]||1);
if(/^(se|s|e)$/.test(N)){O.size.width=I.width+G;
O.size.height=I.height+F
}else{if(/^(ne)$/.test(N)){O.size.width=I.width+G;
O.size.height=I.height+F;
O.position.top=J.top-F
}else{if(/^(sw)$/.test(N)){O.size.width=I.width+G;
O.size.height=I.height+F;
O.position.left=J.left-G
}else{O.size.width=I.width+G;
O.size.height=I.height+F;
O.position.top=J.top-F;
O.position.left=J.left-G
}}}}});
var B=function(E){return parseInt(E,10)||0
};
var A=function(E){return !isNaN(parseInt(E,10))
}
})(jQuery);
(function(A,B){A.widget("ui.selectable",A.ui.mouse,{options:{appendTo:"body",autoRefresh:true,distance:0,filter:"*",tolerance:"touch"},_create:function(){var C=this;
this.element.addClass("ui-selectable");
this.dragged=false;
var D;
this.refresh=function(){D=A(C.options.filter,C.element[0]);
D.each(function(){var E=A(this);
var F=E.offset();
A.data(this,"selectable-item",{element:this,$element:E,left:F.left,top:F.top,right:F.left+E.outerWidth(),bottom:F.top+E.outerHeight(),startselected:false,selected:E.hasClass("ui-selected"),selecting:E.hasClass("ui-selecting"),unselecting:E.hasClass("ui-unselecting")})
})
};
this.refresh();
this.selectees=D.addClass("ui-selectee");
this._mouseInit();
this.helper=A("<div class='ui-selectable-helper'></div>")
},destroy:function(){this.selectees.removeClass("ui-selectee").removeData("selectable-item");
this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
this._mouseDestroy();
return this
},_mouseStart:function(E){var C=this;
this.opos=[E.pageX,E.pageY];
if(this.options.disabled){return 
}var D=this.options;
this.selectees=A(D.filter,this.element[0]);
this._trigger("start",E);
A(D.appendTo).append(this.helper);
this.helper.css({left:E.clientX,top:E.clientY,width:0,height:0});
if(D.autoRefresh){this.refresh()
}this.selectees.filter(".ui-selected").each(function(){var F=A.data(this,"selectable-item");
F.startselected=true;
if(!E.metaKey){F.$element.removeClass("ui-selected");
F.selected=false;
F.$element.addClass("ui-unselecting");
F.unselecting=true;
C._trigger("unselecting",E,{unselecting:F.element})
}});
A(E.target).parents().andSelf().each(function(){var G=A.data(this,"selectable-item");
if(G){var F=!E.metaKey||!G.$element.hasClass("ui-selected");
G.$element.removeClass(F?"ui-unselecting":"ui-selected").addClass(F?"ui-selecting":"ui-unselecting");
G.unselecting=!F;
G.selecting=F;
G.selected=F;
if(F){C._trigger("selecting",E,{selecting:G.element})
}else{C._trigger("unselecting",E,{unselecting:G.element})
}return false
}})
},_mouseDrag:function(J){var D=this;
this.dragged=true;
if(this.options.disabled){return 
}var F=this.options;
var E=this.opos[0],I=this.opos[1],C=J.pageX,H=J.pageY;
if(E>C){var G=C;
C=E;
E=G
}if(I>H){var G=H;
H=I;
I=G
}this.helper.css({left:E,top:I,width:C-E,height:H-I});
this.selectees.each(function(){var K=A.data(this,"selectable-item");
if(!K||K.element==D.element[0]){return 
}var L=false;
if(F.tolerance=="touch"){L=(!(K.left>C||K.right<E||K.top>H||K.bottom<I))
}else{if(F.tolerance=="fit"){L=(K.left>E&&K.right<C&&K.top>I&&K.bottom<H)
}}if(L){if(K.selected){K.$element.removeClass("ui-selected");
K.selected=false
}if(K.unselecting){K.$element.removeClass("ui-unselecting");
K.unselecting=false
}if(!K.selecting){K.$element.addClass("ui-selecting");
K.selecting=true;
D._trigger("selecting",J,{selecting:K.element})
}}else{if(K.selecting){if(J.metaKey&&K.startselected){K.$element.removeClass("ui-selecting");
K.selecting=false;
K.$element.addClass("ui-selected");
K.selected=true
}else{K.$element.removeClass("ui-selecting");
K.selecting=false;
if(K.startselected){K.$element.addClass("ui-unselecting");
K.unselecting=true
}D._trigger("unselecting",J,{unselecting:K.element})
}}if(K.selected){if(!J.metaKey&&!K.startselected){K.$element.removeClass("ui-selected");
K.selected=false;
K.$element.addClass("ui-unselecting");
K.unselecting=true;
D._trigger("unselecting",J,{unselecting:K.element})
}}}});
return false
},_mouseStop:function(E){var C=this;
this.dragged=false;
var D=this.options;
A(".ui-unselecting",this.element[0]).each(function(){var F=A.data(this,"selectable-item");
F.$element.removeClass("ui-unselecting");
F.unselecting=false;
F.startselected=false;
C._trigger("unselected",E,{unselected:F.element})
});
A(".ui-selecting",this.element[0]).each(function(){var F=A.data(this,"selectable-item");
F.$element.removeClass("ui-selecting").addClass("ui-selected");
F.selecting=false;
F.selected=true;
F.startselected=true;
C._trigger("selected",E,{selected:F.element})
});
this._trigger("stop",E);
this.helper.remove();
return false
}});
A.extend(A.ui.selectable,{version:"1.8.16"})
})(jQuery);
(function(A,B){A.widget("ui.sortable",A.ui.mouse,{widgetEventPrefix:"sort",options:{appendTo:"parent",axis:false,connectWith:false,containment:false,cursor:"auto",cursorAt:false,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1000},_create:function(){var C=this.options;
this.containerCache={};
this.element.addClass("ui-sortable");
this.refresh();
this.floating=this.items.length?C.axis==="x"||(/left|right/).test(this.items[0].item.css("float"))||(/inline|table-cell/).test(this.items[0].item.css("display")):false;
this.offset=this.element.offset();
this._mouseInit()
},destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
this._mouseDestroy();
for(var C=this.items.length-1;
C>=0;
C--){this.items[C].item.removeData("sortable-item")
}return this
},_setOption:function(C,D){if(C==="disabled"){this.options[C]=D;
this.widget()[D?"addClass":"removeClass"]("ui-sortable-disabled")
}else{A.Widget.prototype._setOption.apply(this,arguments)
}},_mouseCapture:function(F,G){if(this.reverting){return false
}if(this.options.disabled||this.options.type=="static"){return false
}this._refreshItems(F);
var E=null,D=this,C=A(F.target).parents().each(function(){if(A.data(this,"sortable-item")==D){E=A(this);
return false
}});
if(A.data(F.target,"sortable-item")==D){E=A(F.target)
}if(!E){return false
}if(this.options.handle&&!G){var H=false;
A(this.options.handle,E).find("*").andSelf().each(function(){if(this==F.target){H=true
}});
if(!H){return false
}}this.currentItem=E;
this._removeCurrentsFromItems();
return true
},_mouseStart:function(F,G,C){var H=this.options,D=this;
this.currentContainer=this;
this.refreshPositions();
this.helper=this._createHelper(F);
this._cacheHelperProportions();
this._cacheMargins();
this.scrollParent=this.helper.scrollParent();
this.offset=this.currentItem.offset();
this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};
this.helper.css("position","absolute");
this.cssPosition=this.helper.css("position");
A.extend(this.offset,{click:{left:F.pageX-this.offset.left,top:F.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.originalPosition=this._generatePosition(F);
this.originalPageX=F.pageX;
this.originalPageY=F.pageY;
(H.cursorAt&&this._adjustOffsetFromHelper(H.cursorAt));
this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};
if(this.helper[0]!=this.currentItem[0]){this.currentItem.hide()
}this._createPlaceholder();
if(H.containment){this._setContainment()
}if(H.cursor){if(A("body").css("cursor")){this._storedCursor=A("body").css("cursor")
}A("body").css("cursor",H.cursor)
}if(H.opacity){if(this.helper.css("opacity")){this._storedOpacity=this.helper.css("opacity")
}this.helper.css("opacity",H.opacity)
}if(H.zIndex){if(this.helper.css("zIndex")){this._storedZIndex=this.helper.css("zIndex")
}this.helper.css("zIndex",H.zIndex)
}if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){this.overflowOffset=this.scrollParent.offset()
}this._trigger("start",F,this._uiHash());
if(!this._preserveHelperProportions){this._cacheHelperProportions()
}if(!C){for(var E=this.containers.length-1;
E>=0;
E--){this.containers[E]._trigger("activate",F,D._uiHash(this))
}}if(A.ui.ddmanager){A.ui.ddmanager.current=this
}if(A.ui.ddmanager&&!H.dropBehaviour){A.ui.ddmanager.prepareOffsets(this,F)
}this.dragging=true;
this.helper.addClass("ui-sortable-helper");
this._mouseDrag(F);
return true
},_mouseDrag:function(G){this.position=this._generatePosition(G);
this.positionAbs=this._convertPositionTo("absolute");
if(!this.lastPositionAbs){this.lastPositionAbs=this.positionAbs
}if(this.options.scroll){var H=this.options,C=false;
if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){if((this.overflowOffset.top+this.scrollParent[0].offsetHeight)-G.pageY<H.scrollSensitivity){this.scrollParent[0].scrollTop=C=this.scrollParent[0].scrollTop+H.scrollSpeed
}else{if(G.pageY-this.overflowOffset.top<H.scrollSensitivity){this.scrollParent[0].scrollTop=C=this.scrollParent[0].scrollTop-H.scrollSpeed
}}if((this.overflowOffset.left+this.scrollParent[0].offsetWidth)-G.pageX<H.scrollSensitivity){this.scrollParent[0].scrollLeft=C=this.scrollParent[0].scrollLeft+H.scrollSpeed
}else{if(G.pageX-this.overflowOffset.left<H.scrollSensitivity){this.scrollParent[0].scrollLeft=C=this.scrollParent[0].scrollLeft-H.scrollSpeed
}}}else{if(G.pageY-A(document).scrollTop()<H.scrollSensitivity){C=A(document).scrollTop(A(document).scrollTop()-H.scrollSpeed)
}else{if(A(window).height()-(G.pageY-A(document).scrollTop())<H.scrollSensitivity){C=A(document).scrollTop(A(document).scrollTop()+H.scrollSpeed)
}}if(G.pageX-A(document).scrollLeft()<H.scrollSensitivity){C=A(document).scrollLeft(A(document).scrollLeft()-H.scrollSpeed)
}else{if(A(window).width()-(G.pageX-A(document).scrollLeft())<H.scrollSensitivity){C=A(document).scrollLeft(A(document).scrollLeft()+H.scrollSpeed)
}}}if(C!==false&&A.ui.ddmanager&&!H.dropBehaviour){A.ui.ddmanager.prepareOffsets(this,G)
}}this.positionAbs=this._convertPositionTo("absolute");
if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"
}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"
}for(var E=this.items.length-1;
E>=0;
E--){var F=this.items[E],D=F.item[0],I=this._intersectsWithPointer(F);
if(!I){continue
}if(D!=this.currentItem[0]&&this.placeholder[I==1?"next":"prev"]()[0]!=D&&!A.ui.contains(this.placeholder[0],D)&&(this.options.type=="semi-dynamic"?!A.ui.contains(this.element[0],D):true)){this.direction=I==1?"down":"up";
if(this.options.tolerance=="pointer"||this._intersectsWithSides(F)){this._rearrange(G,F)
}else{break
}this._trigger("change",G,this._uiHash());
break
}}this._contactContainers(G);
if(A.ui.ddmanager){A.ui.ddmanager.drag(this,G)
}this._trigger("sort",G,this._uiHash());
this.lastPositionAbs=this.positionAbs;
return false
},_mouseStop:function(D,E){if(!D){return 
}if(A.ui.ddmanager&&!this.options.dropBehaviour){A.ui.ddmanager.drop(this,D)
}if(this.options.revert){var C=this;
var F=C.placeholder.offset();
C.reverting=true;
A(this.helper).animate({left:F.left-this.offset.parent.left-C.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:F.top-this.offset.parent.top-C.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){C._clear(D)
})
}else{this._clear(D,E)
}return false
},cancel:function(){var C=this;
if(this.dragging){this._mouseUp({target:null});
if(this.options.helper=="original"){this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
}else{this.currentItem.show()
}for(var D=this.containers.length-1;
D>=0;
D--){this.containers[D]._trigger("deactivate",null,C._uiHash(this));
if(this.containers[D].containerCache.over){this.containers[D]._trigger("out",null,C._uiHash(this));
this.containers[D].containerCache.over=0
}}}if(this.placeholder){if(this.placeholder[0].parentNode){this.placeholder[0].parentNode.removeChild(this.placeholder[0])
}if(this.options.helper!="original"&&this.helper&&this.helper[0].parentNode){this.helper.remove()
}A.extend(this,{helper:null,dragging:false,reverting:false,_noFinalSort:null});
if(this.domPosition.prev){A(this.domPosition.prev).after(this.currentItem)
}else{A(this.domPosition.parent).prepend(this.currentItem)
}}return this
},serialize:function(E){var C=this._getItemsAsjQuery(E&&E.connected);
var D=[];
E=E||{};
A(C).each(function(){var F=(A(E.item||this).attr(E.attribute||"id")||"").match(E.expression||(/(.+)[-=_](.+)/));
if(F){D.push((E.key||F[1]+"[]")+"="+(E.key&&E.expression?F[1]:F[2]))
}});
if(!D.length&&E.key){D.push(E.key+"=")
}return D.join("&")
},toArray:function(E){var C=this._getItemsAsjQuery(E&&E.connected);
var D=[];
E=E||{};
C.each(function(){D.push(A(E.item||this).attr(E.attribute||"id")||"")
});
return D
},_intersectsWith:function(L){var E=this.positionAbs.left,D=E+this.helperProportions.width,K=this.positionAbs.top,J=K+this.helperProportions.height;
var F=L.left,C=F+L.width,M=L.top,I=M+L.height;
var N=this.offset.click.top,H=this.offset.click.left;
var G=(K+N)>M&&(K+N)<I&&(E+H)>F&&(E+H)<C;
if(this.options.tolerance=="pointer"||this.options.forcePointerForContainers||(this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>L[this.floating?"width":"height"])){return G
}else{return(F<E+(this.helperProportions.width/2)&&D-(this.helperProportions.width/2)<C&&M<K+(this.helperProportions.height/2)&&J-(this.helperProportions.height/2)<I)
}},_intersectsWithPointer:function(E){var F=A.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,E.top,E.height),D=A.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,E.left,E.width),H=F&&D,C=this._getDragVerticalDirection(),G=this._getDragHorizontalDirection();
if(!H){return false
}return this.floating?(((G&&G=="right")||C=="down")?2:1):(C&&(C=="down"?2:1))
},_intersectsWithSides:function(F){var D=A.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,F.top+(F.height/2),F.height),E=A.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,F.left+(F.width/2),F.width),C=this._getDragVerticalDirection(),G=this._getDragHorizontalDirection();
if(this.floating&&G){return((G=="right"&&E)||(G=="left"&&!E))
}else{return C&&((C=="down"&&D)||(C=="up"&&!D))
}},_getDragVerticalDirection:function(){var C=this.positionAbs.top-this.lastPositionAbs.top;
return C!=0&&(C>0?"down":"up")
},_getDragHorizontalDirection:function(){var C=this.positionAbs.left-this.lastPositionAbs.left;
return C!=0&&(C>0?"right":"left")
},refresh:function(C){this._refreshItems(C);
this.refreshPositions();
return this
},_connectWith:function(){var C=this.options;
return C.connectWith.constructor==String?[C.connectWith]:C.connectWith
},_getItemsAsjQuery:function(C){var K=this;
var H=[];
var F=[];
var I=this._connectWith();
if(I&&C){for(var E=I.length-1;
E>=0;
E--){var J=A(I[E]);
for(var D=J.length-1;
D>=0;
D--){var G=A.data(J[D],"sortable");
if(G&&G!=this&&!G.options.disabled){F.push([A.isFunction(G.options.items)?G.options.items.call(G.element):A(G.options.items,G.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),G])
}}}}F.push([A.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):A(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);
for(var E=F.length-1;
E>=0;
E--){F[E][0].each(function(){H.push(this)
})
}return A(H)
},_removeCurrentsFromItems:function(){var E=this.currentItem.find(":data(sortable-item)");
for(var D=0;
D<this.items.length;
D++){for(var C=0;
C<E.length;
C++){if(E[C]==this.items[D].item[0]){this.items.splice(D,1)
}}}},_refreshItems:function(C){this.items=[];
this.containers=[this];
var I=this.items;
var O=this;
var G=[[A.isFunction(this.options.items)?this.options.items.call(this.element[0],C,{item:this.currentItem}):A(this.options.items,this.element),this]];
var K=this._connectWith();
if(K){for(var F=K.length-1;
F>=0;
F--){var L=A(K[F]);
for(var E=L.length-1;
E>=0;
E--){var H=A.data(L[E],"sortable");
if(H&&H!=this&&!H.options.disabled){G.push([A.isFunction(H.options.items)?H.options.items.call(H.element[0],C,{item:this.currentItem}):A(H.options.items,H.element),H]);
this.containers.push(H)
}}}}for(var F=G.length-1;
F>=0;
F--){var J=G[F][1];
var D=G[F][0];
for(var E=0,M=D.length;
E<M;
E++){var N=A(D[E]);
N.data("sortable-item",J);
I.push({item:N,instance:J,width:0,height:0,left:0,top:0})
}}},refreshPositions:function(C){if(this.offsetParent&&this.helper){this.offset.parent=this._getParentOffset()
}for(var E=this.items.length-1;
E>=0;
E--){var F=this.items[E];
if(F.instance!=this.currentContainer&&this.currentContainer&&F.item[0]!=this.currentItem[0]){continue
}var D=this.options.toleranceElement?A(this.options.toleranceElement,F.item):F.item;
if(!C){F.width=D.outerWidth();
F.height=D.outerHeight()
}var G=D.offset();
F.left=G.left;
F.top=G.top
}if(this.options.custom&&this.options.custom.refreshContainers){this.options.custom.refreshContainers.call(this)
}else{for(var E=this.containers.length-1;
E>=0;
E--){var G=this.containers[E].element.offset();
this.containers[E].containerCache.left=G.left;
this.containers[E].containerCache.top=G.top;
this.containers[E].containerCache.width=this.containers[E].element.outerWidth();
this.containers[E].containerCache.height=this.containers[E].element.outerHeight()
}}return this
},_createPlaceholder:function(E){var C=E||this,F=C.options;
if(!F.placeholder||F.placeholder.constructor==String){var D=F.placeholder;
F.placeholder={element:function(){var G=A(document.createElement(C.currentItem[0].nodeName)).addClass(D||C.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
if(!D){G.style.visibility="hidden"
}return G
},update:function(G,H){if(D&&!F.forcePlaceholderSize){return 
}if(!H.height()){H.height(C.currentItem.innerHeight()-parseInt(C.currentItem.css("paddingTop")||0,10)-parseInt(C.currentItem.css("paddingBottom")||0,10))
}if(!H.width()){H.width(C.currentItem.innerWidth()-parseInt(C.currentItem.css("paddingLeft")||0,10)-parseInt(C.currentItem.css("paddingRight")||0,10))
}}}
}C.placeholder=A(F.placeholder.element.call(C.element,C.currentItem));
C.currentItem.after(C.placeholder);
F.placeholder.update(C,C.placeholder)
},_contactContainers:function(C){var E=null,J=null;
for(var G=this.containers.length-1;
G>=0;
G--){if(A.ui.contains(this.currentItem[0],this.containers[G].element[0])){continue
}if(this._intersectsWith(this.containers[G].containerCache)){if(E&&A.ui.contains(this.containers[G].element[0],E.element[0])){continue
}E=this.containers[G];
J=G
}else{if(this.containers[G].containerCache.over){this.containers[G]._trigger("out",C,this._uiHash(this));
this.containers[G].containerCache.over=0
}}}if(!E){return 
}if(this.containers.length===1){this.containers[J]._trigger("over",C,this._uiHash(this));
this.containers[J].containerCache.over=1
}else{if(this.currentContainer!=this.containers[J]){var I=10000;
var H=null;
var D=this.positionAbs[this.containers[J].floating?"left":"top"];
for(var F=this.items.length-1;
F>=0;
F--){if(!A.ui.contains(this.containers[J].element[0],this.items[F].item[0])){continue
}var K=this.items[F][this.containers[J].floating?"left":"top"];
if(Math.abs(K-D)<I){I=Math.abs(K-D);
H=this.items[F]
}}if(!H&&!this.options.dropOnEmpty){return 
}this.currentContainer=this.containers[J];
H?this._rearrange(C,H,null,true):this._rearrange(C,null,this.containers[J].element,true);
this._trigger("change",C,this._uiHash());
this.containers[J]._trigger("change",C,this._uiHash(this));
this.options.placeholder.update(this.currentContainer,this.placeholder);
this.containers[J]._trigger("over",C,this._uiHash(this));
this.containers[J].containerCache.over=1
}}},_createHelper:function(D){var E=this.options;
var C=A.isFunction(E.helper)?A(E.helper.apply(this.element[0],[D,this.currentItem])):(E.helper=="clone"?this.currentItem.clone():this.currentItem);
if(!C.parents("body").length){A(E.appendTo!="parent"?E.appendTo:this.currentItem[0].parentNode)[0].appendChild(C[0])
}if(C[0]==this.currentItem[0]){this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}
}if(C[0].style.width==""||E.forceHelperSize){C.width(this.currentItem.width())
}if(C[0].style.height==""||E.forceHelperSize){C.height(this.currentItem.height())
}return C
},_adjustOffsetFromHelper:function(C){if(typeof C=="string"){C=C.split(" ")
}if(A.isArray(C)){C={left:+C[0],top:+C[1]||0}
}if("left" in C){this.offset.click.left=C.left+this.margins.left
}if("right" in C){this.offset.click.left=this.helperProportions.width-C.right+this.margins.left
}if("top" in C){this.offset.click.top=C.top+this.margins.top
}if("bottom" in C){this.offset.click.top=this.helperProportions.height-C.bottom+this.margins.top
}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();
var C=this.offsetParent.offset();
if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&A.ui.contains(this.scrollParent[0],this.offsetParent[0])){C.left+=this.scrollParent.scrollLeft();
C.top+=this.scrollParent.scrollTop()
}if((this.offsetParent[0]==document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&A.browser.msie)){C={top:0,left:0}
}return{top:C.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:C.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}
},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var C=this.currentItem.position();
return{top:C.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:C.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}
}else{return{top:0,left:0}
}},_cacheMargins:function(){this.margins={left:(parseInt(this.currentItem.css("marginLeft"),10)||0),top:(parseInt(this.currentItem.css("marginTop"),10)||0)}
},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}
},_setContainment:function(){var F=this.options;
if(F.containment=="parent"){F.containment=this.helper[0].parentNode
}if(F.containment=="document"||F.containment=="window"){this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,A(F.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(A(F.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]
}if(!(/^(document|window|parent)$/).test(F.containment)){var D=A(F.containment)[0];
var E=A(F.containment).offset();
var C=(A(D).css("overflow")!="hidden");
this.containment=[E.left+(parseInt(A(D).css("borderLeftWidth"),10)||0)+(parseInt(A(D).css("paddingLeft"),10)||0)-this.margins.left,E.top+(parseInt(A(D).css("borderTopWidth"),10)||0)+(parseInt(A(D).css("paddingTop"),10)||0)-this.margins.top,E.left+(C?Math.max(D.scrollWidth,D.offsetWidth):D.offsetWidth)-(parseInt(A(D).css("borderLeftWidth"),10)||0)-(parseInt(A(D).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,E.top+(C?Math.max(D.scrollHeight,D.offsetHeight):D.offsetHeight)-(parseInt(A(D).css("borderTopWidth"),10)||0)-(parseInt(A(D).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]
}},_convertPositionTo:function(F,H){if(!H){H=this.position
}var D=F=="absolute"?1:-1;
var E=this.options,C=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&A.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,G=(/(html|body)/i).test(C[0].tagName);
return{top:(H.top+this.offset.relative.top*D+this.offset.parent.top*D-(A.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(G?0:C.scrollTop()))*D)),left:(H.left+this.offset.relative.left*D+this.offset.parent.left*D-(A.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():G?0:C.scrollLeft())*D))}
},_generatePosition:function(F){var I=this.options,C=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&A.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,J=(/(html|body)/i).test(C[0].tagName);
if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0])){this.offset.relative=this._getRelativeOffset()
}var E=F.pageX;
var D=F.pageY;
if(this.originalPosition){if(this.containment){if(F.pageX-this.offset.click.left<this.containment[0]){E=this.containment[0]+this.offset.click.left
}if(F.pageY-this.offset.click.top<this.containment[1]){D=this.containment[1]+this.offset.click.top
}if(F.pageX-this.offset.click.left>this.containment[2]){E=this.containment[2]+this.offset.click.left
}if(F.pageY-this.offset.click.top>this.containment[3]){D=this.containment[3]+this.offset.click.top
}}if(I.grid){var H=this.originalPageY+Math.round((D-this.originalPageY)/I.grid[1])*I.grid[1];
D=this.containment?(!(H-this.offset.click.top<this.containment[1]||H-this.offset.click.top>this.containment[3])?H:(!(H-this.offset.click.top<this.containment[1])?H-I.grid[1]:H+I.grid[1])):H;
var G=this.originalPageX+Math.round((E-this.originalPageX)/I.grid[0])*I.grid[0];
E=this.containment?(!(G-this.offset.click.left<this.containment[0]||G-this.offset.click.left>this.containment[2])?G:(!(G-this.offset.click.left<this.containment[0])?G-I.grid[0]:G+I.grid[0])):G
}}return{top:(D-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(A.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(J?0:C.scrollTop())))),left:(E-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(A.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():J?0:C.scrollLeft())))}
},_rearrange:function(H,G,D,F){D?D[0].appendChild(this.placeholder[0]):G.item[0].parentNode.insertBefore(this.placeholder[0],(this.direction=="down"?G.item[0]:G.item[0].nextSibling));
this.counter=this.counter?++this.counter:1;
var E=this,C=this.counter;
window.setTimeout(function(){if(C==E.counter){E.refreshPositions(!F)
}},0)
},_clear:function(E,F){this.reverting=false;
var G=[],C=this;
if(!this._noFinalSort&&this.currentItem.parent().length){this.placeholder.before(this.currentItem)
}this._noFinalSort=null;
if(this.helper[0]==this.currentItem[0]){for(var D in this._storedCSS){if(this._storedCSS[D]=="auto"||this._storedCSS[D]=="static"){this._storedCSS[D]=""
}}this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
}else{this.currentItem.show()
}if(this.fromOutside&&!F){G.push(function(H){this._trigger("receive",H,this._uiHash(this.fromOutside))
})
}if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!F){G.push(function(H){this._trigger("update",H,this._uiHash())
})
}if(!A.ui.contains(this.element[0],this.currentItem[0])){if(!F){G.push(function(H){this._trigger("remove",H,this._uiHash())
})
}for(var D=this.containers.length-1;
D>=0;
D--){if(A.ui.contains(this.containers[D].element[0],this.currentItem[0])&&!F){G.push((function(H){return function(I){H._trigger("receive",I,this._uiHash(this))
}
}).call(this,this.containers[D]));
G.push((function(H){return function(I){H._trigger("update",I,this._uiHash(this))
}
}).call(this,this.containers[D]))
}}}for(var D=this.containers.length-1;
D>=0;
D--){if(!F){G.push((function(H){return function(I){H._trigger("deactivate",I,this._uiHash(this))
}
}).call(this,this.containers[D]))
}if(this.containers[D].containerCache.over){G.push((function(H){return function(I){H._trigger("out",I,this._uiHash(this))
}
}).call(this,this.containers[D]));
this.containers[D].containerCache.over=0
}}if(this._storedCursor){A("body").css("cursor",this._storedCursor)
}if(this._storedOpacity){this.helper.css("opacity",this._storedOpacity)
}if(this._storedZIndex){this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex)
}this.dragging=false;
if(this.cancelHelperRemoval){if(!F){this._trigger("beforeStop",E,this._uiHash());
for(var D=0;
D<G.length;
D++){G[D].call(this,E)
}this._trigger("stop",E,this._uiHash())
}return false
}if(!F){this._trigger("beforeStop",E,this._uiHash())
}this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
if(this.helper[0]!=this.currentItem[0]){this.helper.remove()
}this.helper=null;
if(!F){for(var D=0;
D<G.length;
D++){G[D].call(this,E)
}this._trigger("stop",E,this._uiHash())
}this.fromOutside=false;
return true
},_trigger:function(){if(A.Widget.prototype._trigger.apply(this,arguments)===false){this.cancel()
}},_uiHash:function(D){var C=D||this;
return{helper:C.helper,placeholder:C.placeholder||A([]),position:C.position,originalPosition:C.originalPosition,offset:C.positionAbs,item:C.currentItem,sender:D?D.element:null}
}});
A.extend(A.ui.sortable,{version:"1.8.16"})
})(jQuery);
jQuery.effects||(function(H,E){H.effects={};
H.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","borderColor","color","outlineColor"],function(N,M){H.fx.step[M]=function(O){if(!O.colorInit){O.start=L(O.elem,M);
O.end=J(O.end);
O.colorInit=true
}O.elem.style[M]="rgb("+Math.max(Math.min(parseInt((O.pos*(O.end[0]-O.start[0]))+O.start[0],10),255),0)+","+Math.max(Math.min(parseInt((O.pos*(O.end[1]-O.start[1]))+O.start[1],10),255),0)+","+Math.max(Math.min(parseInt((O.pos*(O.end[2]-O.start[2]))+O.start[2],10),255),0)+")"
}
});
function J(N){var M;
if(N&&N.constructor==Array&&N.length==3){return N
}if(M=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(N)){return[parseInt(M[1],10),parseInt(M[2],10),parseInt(M[3],10)]
}if(M=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(N)){return[parseFloat(M[1])*2.55,parseFloat(M[2])*2.55,parseFloat(M[3])*2.55]
}if(M=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(N)){return[parseInt(M[1],16),parseInt(M[2],16),parseInt(M[3],16)]
}if(M=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(N)){return[parseInt(M[1]+M[1],16),parseInt(M[2]+M[2],16),parseInt(M[3]+M[3],16)]
}if(M=/rgba\(0, 0, 0, 0\)/.exec(N)){return A.transparent
}return A[H.trim(N).toLowerCase()]
}function L(O,M){var N;
do{N=H.curCSS(O,M);
if(N!=""&&N!="transparent"||H.nodeName(O,"body")){break
}M="backgroundColor"
}while(O=O.parentNode);
return J(N)
}var A={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]};
var F=["add","remove","toggle"],C={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};
function G(){var P=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,Q={},N,O;
if(P&&P.length&&P[0]&&P[P[0]]){var M=P.length;
while(M--){N=P[M];
if(typeof P[N]=="string"){O=N.replace(/\-(\w)/g,function(R,S){return S.toUpperCase()
});
Q[O]=P[N]
}}}else{for(N in P){if(typeof P[N]==="string"){Q[N]=P[N]
}}}return Q
}function B(N){var M,O;
for(M in N){O=N[M];
if(O==null||H.isFunction(O)||M in C||(/scrollbar/).test(M)||(!(/color/i).test(M)&&isNaN(parseFloat(O)))){delete N[M]
}}return N
}function I(M,O){var P={_:0},N;
for(N in O){if(M[N]!=O[N]){P[N]=O[N]
}}return P
}H.effects.animateClass=function(M,N,P,O){if(H.isFunction(P)){O=P;
P=null
}return this.queue(function(){var T=H(this),Q=T.attr("style")||" ",U=B(G.call(this)),S,R=T.attr("class");
H.each(F,function(V,W){if(M[W]){T[W+"Class"](M[W])
}});
S=B(G.call(this));
T.attr("class",R);
T.animate(I(U,S),{queue:false,duration:N,easing:P,complete:function(){H.each(F,function(V,W){if(M[W]){T[W+"Class"](M[W])
}});
if(typeof T.attr("style")=="object"){T.attr("style").cssText="";
T.attr("style").cssText=Q
}else{T.attr("style",Q)
}if(O){O.apply(this,arguments)
}H.dequeue(this)
}})
})
};
H.fn.extend({_addClass:H.fn.addClass,addClass:function(N,M,P,O){return M?H.effects.animateClass.apply(this,[{add:N},M,P,O]):this._addClass(N)
},_removeClass:H.fn.removeClass,removeClass:function(N,M,P,O){return M?H.effects.animateClass.apply(this,[{remove:N},M,P,O]):this._removeClass(N)
},_toggleClass:H.fn.toggleClass,toggleClass:function(O,N,M,Q,P){if(typeof N=="boolean"||N===E){if(!M){return this._toggleClass(O,N)
}else{return H.effects.animateClass.apply(this,[(N?{add:O}:{remove:O}),M,Q,P])
}}else{return H.effects.animateClass.apply(this,[{toggle:O},N,M,Q])
}},switchClass:function(M,O,N,Q,P){return H.effects.animateClass.apply(this,[{add:O,remove:M},N,Q,P])
}});
H.extend(H.effects,{version:"1.8.16",save:function(N,O){for(var M=0;
M<O.length;
M++){if(O[M]!==null){N.data("ec.storage."+O[M],N[0].style[O[M]])
}}},restore:function(N,O){for(var M=0;
M<O.length;
M++){if(O[M]!==null){N.css(O[M],N.data("ec.storage."+O[M]))
}}},setMode:function(M,N){if(N=="toggle"){N=M.is(":hidden")?"show":"hide"
}return N
},getBaseline:function(N,O){var P,M;
switch(N[0]){case"top":P=0;
break;
case"middle":P=0.5;
break;
case"bottom":P=1;
break;
default:P=N[0]/O.height
}switch(N[1]){case"left":M=0;
break;
case"center":M=0.5;
break;
case"right":M=1;
break;
default:M=N[1]/O.width
}return{x:M,y:P}
},createWrapper:function(M){if(M.parent().is(".ui-effects-wrapper")){return M.parent()
}var N={width:M.outerWidth(true),height:M.outerHeight(true),"float":M.css("float")},P=H("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),O=document.activeElement;
M.wrap(P);
if(M[0]===O||H.contains(M[0],O)){H(O).focus()
}P=M.parent();
if(M.css("position")=="static"){P.css({position:"relative"});
M.css({position:"relative"})
}else{H.extend(N,{position:M.css("position"),zIndex:M.css("z-index")});
H.each(["top","left","bottom","right"],function(Q,R){N[R]=M.css(R);
if(isNaN(parseInt(N[R],10))){N[R]="auto"
}});
M.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})
}return P.css(N).show()
},removeWrapper:function(M){var N,O=document.activeElement;
if(M.parent().is(".ui-effects-wrapper")){N=M.parent().replaceWith(M);
if(M[0]===O||H.contains(M[0],O)){H(O).focus()
}return N
}return M
},setTransition:function(N,P,M,O){O=O||{};
H.each(P,function(R,Q){unit=N.cssUnit(Q);
if(unit[0]>0){O[Q]=unit[0]*M+unit[1]
}});
return O
}});
function D(N,M,O,P){if(typeof N=="object"){P=M;
O=null;
M=N;
N=M.effect
}if(H.isFunction(M)){P=M;
O=null;
M={}
}if(typeof M=="number"||H.fx.speeds[M]){P=O;
O=M;
M={}
}if(H.isFunction(O)){P=O;
O=null
}M=M||{};
O=O||M.duration;
O=H.fx.off?0:typeof O=="number"?O:O in H.fx.speeds?H.fx.speeds[O]:H.fx.speeds._default;
P=P||M.complete;
return[N,M,O,P]
}function K(M){if(!M||typeof M==="number"||H.fx.speeds[M]){return true
}if(typeof M==="string"&&!H.effects[M]){return true
}return false
}H.fn.extend({effect:function(P,O,R,T){var N=D.apply(this,arguments),Q={options:N[1],duration:N[2],callback:N[3]},S=Q.options.mode,M=H.effects[P];
if(H.fx.off||!M){if(S){return this[S](Q.duration,Q.callback)
}else{return this.each(function(){if(Q.callback){Q.callback.call(this)
}})
}}return M.call(this,Q)
},_show:H.fn.show,show:function(N){if(K(N)){return this._show.apply(this,arguments)
}else{var M=D.apply(this,arguments);
M[1].mode="show";
return this.effect.apply(this,M)
}},_hide:H.fn.hide,hide:function(N){if(K(N)){return this._hide.apply(this,arguments)
}else{var M=D.apply(this,arguments);
M[1].mode="hide";
return this.effect.apply(this,M)
}},__toggle:H.fn.toggle,toggle:function(N){if(K(N)||typeof N==="boolean"||H.isFunction(N)){return this.__toggle.apply(this,arguments)
}else{var M=D.apply(this,arguments);
M[1].mode="toggle";
return this.effect.apply(this,M)
}},cssUnit:function(M){var N=this.css(M),O=[];
H.each(["em","px","%","pt"],function(P,Q){if(N.indexOf(Q)>0){O=[parseFloat(N),Q]
}});
return O
}});
H.easing.jswing=H.easing.swing;
H.extend(H.easing,{def:"easeOutQuad",swing:function(N,O,M,Q,P){return H.easing[H.easing.def](N,O,M,Q,P)
},easeInQuad:function(N,O,M,Q,P){return Q*(O/=P)*O+M
},easeOutQuad:function(N,O,M,Q,P){return -Q*(O/=P)*(O-2)+M
},easeInOutQuad:function(N,O,M,Q,P){if((O/=P/2)<1){return Q/2*O*O+M
}return -Q/2*((--O)*(O-2)-1)+M
},easeInCubic:function(N,O,M,Q,P){return Q*(O/=P)*O*O+M
},easeOutCubic:function(N,O,M,Q,P){return Q*((O=O/P-1)*O*O+1)+M
},easeInOutCubic:function(N,O,M,Q,P){if((O/=P/2)<1){return Q/2*O*O*O+M
}return Q/2*((O-=2)*O*O+2)+M
},easeInQuart:function(N,O,M,Q,P){return Q*(O/=P)*O*O*O+M
},easeOutQuart:function(N,O,M,Q,P){return -Q*((O=O/P-1)*O*O*O-1)+M
},easeInOutQuart:function(N,O,M,Q,P){if((O/=P/2)<1){return Q/2*O*O*O*O+M
}return -Q/2*((O-=2)*O*O*O-2)+M
},easeInQuint:function(N,O,M,Q,P){return Q*(O/=P)*O*O*O*O+M
},easeOutQuint:function(N,O,M,Q,P){return Q*((O=O/P-1)*O*O*O*O+1)+M
},easeInOutQuint:function(N,O,M,Q,P){if((O/=P/2)<1){return Q/2*O*O*O*O*O+M
}return Q/2*((O-=2)*O*O*O*O+2)+M
},easeInSine:function(N,O,M,Q,P){return -Q*Math.cos(O/P*(Math.PI/2))+Q+M
},easeOutSine:function(N,O,M,Q,P){return Q*Math.sin(O/P*(Math.PI/2))+M
},easeInOutSine:function(N,O,M,Q,P){return -Q/2*(Math.cos(Math.PI*O/P)-1)+M
},easeInExpo:function(N,O,M,Q,P){return(O==0)?M:Q*Math.pow(2,10*(O/P-1))+M
},easeOutExpo:function(N,O,M,Q,P){return(O==P)?M+Q:Q*(-Math.pow(2,-10*O/P)+1)+M
},easeInOutExpo:function(N,O,M,Q,P){if(O==0){return M
}if(O==P){return M+Q
}if((O/=P/2)<1){return Q/2*Math.pow(2,10*(O-1))+M
}return Q/2*(-Math.pow(2,-10*--O)+2)+M
},easeInCirc:function(N,O,M,Q,P){return -Q*(Math.sqrt(1-(O/=P)*O)-1)+M
},easeOutCirc:function(N,O,M,Q,P){return Q*Math.sqrt(1-(O=O/P-1)*O)+M
},easeInOutCirc:function(N,O,M,Q,P){if((O/=P/2)<1){return -Q/2*(Math.sqrt(1-O*O)-1)+M
}return Q/2*(Math.sqrt(1-(O-=2)*O)+1)+M
},easeInElastic:function(N,P,M,T,S){var Q=1.70158;
var R=0;
var O=T;
if(P==0){return M
}if((P/=S)==1){return M+T
}if(!R){R=S*0.3
}if(O<Math.abs(T)){O=T;
var Q=R/4
}else{var Q=R/(2*Math.PI)*Math.asin(T/O)
}return -(O*Math.pow(2,10*(P-=1))*Math.sin((P*S-Q)*(2*Math.PI)/R))+M
},easeOutElastic:function(N,P,M,T,S){var Q=1.70158;
var R=0;
var O=T;
if(P==0){return M
}if((P/=S)==1){return M+T
}if(!R){R=S*0.3
}if(O<Math.abs(T)){O=T;
var Q=R/4
}else{var Q=R/(2*Math.PI)*Math.asin(T/O)
}return O*Math.pow(2,-10*P)*Math.sin((P*S-Q)*(2*Math.PI)/R)+T+M
},easeInOutElastic:function(N,P,M,T,S){var Q=1.70158;
var R=0;
var O=T;
if(P==0){return M
}if((P/=S/2)==2){return M+T
}if(!R){R=S*(0.3*1.5)
}if(O<Math.abs(T)){O=T;
var Q=R/4
}else{var Q=R/(2*Math.PI)*Math.asin(T/O)
}if(P<1){return -0.5*(O*Math.pow(2,10*(P-=1))*Math.sin((P*S-Q)*(2*Math.PI)/R))+M
}return O*Math.pow(2,-10*(P-=1))*Math.sin((P*S-Q)*(2*Math.PI)/R)*0.5+T+M
},easeInBack:function(N,O,M,R,Q,P){if(P==E){P=1.70158
}return R*(O/=Q)*O*((P+1)*O-P)+M
},easeOutBack:function(N,O,M,R,Q,P){if(P==E){P=1.70158
}return R*((O=O/Q-1)*O*((P+1)*O+P)+1)+M
},easeInOutBack:function(N,O,M,R,Q,P){if(P==E){P=1.70158
}if((O/=Q/2)<1){return R/2*(O*O*(((P*=(1.525))+1)*O-P))+M
}return R/2*((O-=2)*O*(((P*=(1.525))+1)*O+P)+2)+M
},easeInBounce:function(N,O,M,Q,P){return Q-H.easing.easeOutBounce(N,P-O,0,Q,P)+M
},easeOutBounce:function(N,O,M,Q,P){if((O/=P)<(1/2.75)){return Q*(7.5625*O*O)+M
}else{if(O<(2/2.75)){return Q*(7.5625*(O-=(1.5/2.75))*O+0.75)+M
}else{if(O<(2.5/2.75)){return Q*(7.5625*(O-=(2.25/2.75))*O+0.9375)+M
}else{return Q*(7.5625*(O-=(2.625/2.75))*O+0.984375)+M
}}}},easeInOutBounce:function(N,O,M,Q,P){if(O<P/2){return H.easing.easeInBounce(N,O*2,0,Q,P)*0.5+M
}return H.easing.easeOutBounce(N,O*2-P,0,Q,P)*0.5+Q*0.5+M
}})
})(jQuery);
(function(A,B){A.effects.blind=function(C){return this.queue(function(){var E=A(this),D=["position","top","bottom","left","right"];
var I=A.effects.setMode(E,C.options.mode||"hide");
var H=C.options.direction||"vertical";
A.effects.save(E,D);
E.show();
var K=A.effects.createWrapper(E).css({overflow:"hidden"});
var F=(H=="vertical")?"height":"width";
var J=(H=="vertical")?K.height():K.width();
if(I=="show"){K.css(F,0)
}var G={};
G[F]=I=="show"?J:0;
K.animate(G,C.duration,C.options.easing,function(){if(I=="hide"){E.hide()
}A.effects.restore(E,D);
A.effects.removeWrapper(E);
if(C.callback){C.callback.apply(E[0],arguments)
}E.dequeue()
})
})
}
})(jQuery);
(function(A,B){A.effects.bounce=function(C){return this.queue(function(){var F=A(this),L=["position","top","bottom","left","right"];
var K=A.effects.setMode(F,C.options.mode||"effect");
var N=C.options.direction||"up";
var D=C.options.distance||20;
var E=C.options.times||5;
var H=C.duration||250;
if(/show|hide/.test(K)){L.push("opacity")
}A.effects.save(F,L);
F.show();
A.effects.createWrapper(F);
var G=(N=="up"||N=="down")?"top":"left";
var P=(N=="up"||N=="left")?"pos":"neg";
var D=C.options.distance||(G=="top"?F.outerHeight({margin:true})/3:F.outerWidth({margin:true})/3);
if(K=="show"){F.css("opacity",0).css(G,P=="pos"?-D:D)
}if(K=="hide"){D=D/(E*2)
}if(K!="hide"){E--
}if(K=="show"){var I={opacity:1};
I[G]=(P=="pos"?"+=":"-=")+D;
F.animate(I,H/2,C.options.easing);
D=D/2;
E--
}for(var J=0;
J<E;
J++){var O={},M={};
O[G]=(P=="pos"?"-=":"+=")+D;
M[G]=(P=="pos"?"+=":"-=")+D;
F.animate(O,H/2,C.options.easing).animate(M,H/2,C.options.easing);
D=(K=="hide")?D*2:D/2
}if(K=="hide"){var I={opacity:0};
I[G]=(P=="pos"?"-=":"+=")+D;
F.animate(I,H/2,C.options.easing,function(){F.hide();
A.effects.restore(F,L);
A.effects.removeWrapper(F);
if(C.callback){C.callback.apply(this,arguments)
}})
}else{var O={},M={};
O[G]=(P=="pos"?"-=":"+=")+D;
M[G]=(P=="pos"?"+=":"-=")+D;
F.animate(O,H/2,C.options.easing).animate(M,H/2,C.options.easing,function(){A.effects.restore(F,L);
A.effects.removeWrapper(F);
if(C.callback){C.callback.apply(this,arguments)
}})
}F.queue("fx",function(){F.dequeue()
});
F.dequeue()
})
}
})(jQuery);
(function(A,B){A.effects.clip=function(C){return this.queue(function(){var G=A(this),K=["position","top","bottom","left","right","height","width"];
var J=A.effects.setMode(G,C.options.mode||"hide");
var L=C.options.direction||"vertical";
A.effects.save(G,K);
G.show();
var D=A.effects.createWrapper(G).css({overflow:"hidden"});
var F=G[0].tagName=="IMG"?D:G;
var H={size:(L=="vertical")?"height":"width",position:(L=="vertical")?"top":"left"};
var E=(L=="vertical")?F.height():F.width();
if(J=="show"){F.css(H.size,0);
F.css(H.position,E/2)
}var I={};
I[H.size]=J=="show"?E:0;
I[H.position]=J=="show"?0:E/2;
F.animate(I,{queue:false,duration:C.duration,easing:C.options.easing,complete:function(){if(J=="hide"){G.hide()
}A.effects.restore(G,K);
A.effects.removeWrapper(G);
if(C.callback){C.callback.apply(G[0],arguments)
}G.dequeue()
}})
})
}
})(jQuery);
(function(A,B){A.effects.drop=function(C){return this.queue(function(){var F=A(this),E=["position","top","bottom","left","right","opacity"];
var J=A.effects.setMode(F,C.options.mode||"hide");
var I=C.options.direction||"left";
A.effects.save(F,E);
F.show();
A.effects.createWrapper(F);
var G=(I=="up"||I=="down")?"top":"left";
var D=(I=="up"||I=="left")?"pos":"neg";
var K=C.options.distance||(G=="top"?F.outerHeight({margin:true})/2:F.outerWidth({margin:true})/2);
if(J=="show"){F.css("opacity",0).css(G,D=="pos"?-K:K)
}var H={opacity:J=="show"?1:0};
H[G]=(J=="show"?(D=="pos"?"+=":"-="):(D=="pos"?"-=":"+="))+K;
F.animate(H,{queue:false,duration:C.duration,easing:C.options.easing,complete:function(){if(J=="hide"){F.hide()
}A.effects.restore(F,E);
A.effects.removeWrapper(F);
if(C.callback){C.callback.apply(this,arguments)
}F.dequeue()
}})
})
}
})(jQuery);
(function(A,B){A.effects.explode=function(C){return this.queue(function(){var J=C.options.pieces?Math.round(Math.sqrt(C.options.pieces)):3;
var F=C.options.pieces?Math.round(Math.sqrt(C.options.pieces)):3;
C.options.mode=C.options.mode=="toggle"?(A(this).is(":visible")?"hide":"show"):C.options.mode;
var I=A(this).show().css("visibility","hidden");
var K=I.offset();
K.top-=parseInt(I.css("marginTop"),10)||0;
K.left-=parseInt(I.css("marginLeft"),10)||0;
var H=I.outerWidth(true);
var D=I.outerHeight(true);
for(var G=0;
G<J;
G++){for(var E=0;
E<F;
E++){I.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-E*(H/F),top:-G*(D/J)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:H/F,height:D/J,left:K.left+E*(H/F)+(C.options.mode=="show"?(E-Math.floor(F/2))*(H/F):0),top:K.top+G*(D/J)+(C.options.mode=="show"?(G-Math.floor(J/2))*(D/J):0),opacity:C.options.mode=="show"?0:1}).animate({left:K.left+E*(H/F)+(C.options.mode=="show"?0:(E-Math.floor(F/2))*(H/F)),top:K.top+G*(D/J)+(C.options.mode=="show"?0:(G-Math.floor(J/2))*(D/J)),opacity:C.options.mode=="show"?1:0},C.duration||500)
}}setTimeout(function(){C.options.mode=="show"?I.css({visibility:"visible"}):I.css({visibility:"visible"}).hide();
if(C.callback){C.callback.apply(I[0])
}I.dequeue();
A("div.ui-effects-explode").remove()
},C.duration||500)
})
}
})(jQuery);
(function(A,B){A.effects.fade=function(C){return this.queue(function(){var D=A(this),E=A.effects.setMode(D,C.options.mode||"hide");
D.animate({opacity:E},{queue:false,duration:C.duration,easing:C.options.easing,complete:function(){(C.callback&&C.callback.apply(this,arguments));
D.dequeue()
}})
})
}
})(jQuery);
(function(A,B){A.effects.fold=function(C){return this.queue(function(){var F=A(this),L=["position","top","bottom","left","right"];
var I=A.effects.setMode(F,C.options.mode||"hide");
var P=C.options.size||15;
var O=!(!C.options.horizFirst);
var H=C.duration?C.duration/2:A.fx.speeds._default/2;
A.effects.save(F,L);
F.show();
var E=A.effects.createWrapper(F).css({overflow:"hidden"});
var J=((I=="show")!=O);
var G=J?["width","height"]:["height","width"];
var D=J?[E.width(),E.height()]:[E.height(),E.width()];
var K=/([0-9]+)%/.exec(P);
if(K){P=parseInt(K[1],10)/100*D[I=="hide"?0:1]
}if(I=="show"){E.css(O?{height:0,width:P}:{height:P,width:0})
}var N={},M={};
N[G[0]]=I=="show"?D[0]:P;
M[G[1]]=I=="show"?D[1]:0;
E.animate(N,H,C.options.easing).animate(M,H,C.options.easing,function(){if(I=="hide"){F.hide()
}A.effects.restore(F,L);
A.effects.removeWrapper(F);
if(C.callback){C.callback.apply(F[0],arguments)
}F.dequeue()
})
})
}
})(jQuery);
(function(A,B){A.effects.highlight=function(C){return this.queue(function(){var E=A(this),D=["backgroundImage","backgroundColor","opacity"],G=A.effects.setMode(E,C.options.mode||"show"),F={backgroundColor:E.css("backgroundColor")};
if(G=="hide"){F.opacity=0
}A.effects.save(E,D);
E.show().css({backgroundImage:"none",backgroundColor:C.options.color||"#ffff99"}).animate(F,{queue:false,duration:C.duration,easing:C.options.easing,complete:function(){(G=="hide"&&E.hide());
A.effects.restore(E,D);
(G=="show"&&!A.support.opacity&&this.style.removeAttribute("filter"));
(C.callback&&C.callback.apply(this,arguments));
E.dequeue()
}})
})
}
})(jQuery);
(function(A,B){A.effects.pulsate=function(C){return this.queue(function(){var E=A(this),F=A.effects.setMode(E,C.options.mode||"show");
times=((C.options.times||5)*2)-1;
duration=C.duration?C.duration/2:A.fx.speeds._default/2,isVisible=E.is(":visible"),animateTo=0;
if(!isVisible){E.css("opacity",0).show();
animateTo=1
}if((F=="hide"&&isVisible)||(F=="show"&&!isVisible)){times--
}for(var D=0;
D<times;
D++){E.animate({opacity:animateTo},duration,C.options.easing);
animateTo=(animateTo+1)%2
}E.animate({opacity:animateTo},duration,C.options.easing,function(){if(animateTo==0){E.hide()
}(C.callback&&C.callback.apply(this,arguments))
});
E.queue("fx",function(){E.dequeue()
}).dequeue()
})
}
})(jQuery);
(function(A,B){A.effects.puff=function(C){return this.queue(function(){var G=A(this),H=A.effects.setMode(G,C.options.mode||"hide"),F=parseInt(C.options.percent,10)||150,E=F/100,D={height:G.height(),width:G.width()};
A.extend(C.options,{fade:true,mode:H,percent:H=="hide"?F:100,from:H=="hide"?D:{height:D.height*E,width:D.width*E}});
G.effect("scale",C.options,C.duration,C.callback);
G.dequeue()
})
};
A.effects.scale=function(C){return this.queue(function(){var H=A(this);
var E=A.extend(true,{},C.options);
var K=A.effects.setMode(H,C.options.mode||"effect");
var I=parseInt(C.options.percent,10)||(parseInt(C.options.percent,10)==0?0:(K=="hide"?0:100));
var J=C.options.direction||"both";
var D=C.options.origin;
if(K!="effect"){E.origin=D||["middle","center"];
E.restore=true
}var G={height:H.height(),width:H.width()};
H.from=C.options.from||(K=="show"?{height:0,width:0}:G);
var F={y:J!="horizontal"?(I/100):1,x:J!="vertical"?(I/100):1};
H.to={height:G.height*F.y,width:G.width*F.x};
if(C.options.fade){if(K=="show"){H.from.opacity=0;
H.to.opacity=1
}if(K=="hide"){H.from.opacity=1;
H.to.opacity=0
}}E.from=H.from;
E.to=H.to;
E.mode=K;
H.effect("size",E,C.duration,C.callback);
H.dequeue()
})
};
A.effects.size=function(C){return this.queue(function(){var D=A(this),O=["position","top","bottom","left","right","width","height","overflow","opacity"];
var N=["position","top","bottom","left","right","overflow","opacity"];
var K=["width","height","overflow"];
var Q=["fontSize"];
var L=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"];
var G=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"];
var H=A.effects.setMode(D,C.options.mode||"effect");
var J=C.options.restore||false;
var F=C.options.scale||"both";
var P=C.options.origin;
var E={height:D.height(),width:D.width()};
D.from=C.options.from||E;
D.to=C.options.to||E;
if(P){var I=A.effects.getBaseline(P,E);
D.from.top=(E.height-D.from.height)*I.y;
D.from.left=(E.width-D.from.width)*I.x;
D.to.top=(E.height-D.to.height)*I.y;
D.to.left=(E.width-D.to.width)*I.x
}var M={from:{y:D.from.height/E.height,x:D.from.width/E.width},to:{y:D.to.height/E.height,x:D.to.width/E.width}};
if(F=="box"||F=="both"){if(M.from.y!=M.to.y){O=O.concat(L);
D.from=A.effects.setTransition(D,L,M.from.y,D.from);
D.to=A.effects.setTransition(D,L,M.to.y,D.to)
}if(M.from.x!=M.to.x){O=O.concat(G);
D.from=A.effects.setTransition(D,G,M.from.x,D.from);
D.to=A.effects.setTransition(D,G,M.to.x,D.to)
}}if(F=="content"||F=="both"){if(M.from.y!=M.to.y){O=O.concat(Q);
D.from=A.effects.setTransition(D,Q,M.from.y,D.from);
D.to=A.effects.setTransition(D,Q,M.to.y,D.to)
}}A.effects.save(D,J?O:N);
D.show();
A.effects.createWrapper(D);
D.css("overflow","hidden").css(D.from);
if(F=="content"||F=="both"){L=L.concat(["marginTop","marginBottom"]).concat(Q);
G=G.concat(["marginLeft","marginRight"]);
K=O.concat(L).concat(G);
D.find("*[width]").each(function(){child=A(this);
if(J){A.effects.save(child,K)
}var R={height:child.height(),width:child.width()};
child.from={height:R.height*M.from.y,width:R.width*M.from.x};
child.to={height:R.height*M.to.y,width:R.width*M.to.x};
if(M.from.y!=M.to.y){child.from=A.effects.setTransition(child,L,M.from.y,child.from);
child.to=A.effects.setTransition(child,L,M.to.y,child.to)
}if(M.from.x!=M.to.x){child.from=A.effects.setTransition(child,G,M.from.x,child.from);
child.to=A.effects.setTransition(child,G,M.to.x,child.to)
}child.css(child.from);
child.animate(child.to,C.duration,C.options.easing,function(){if(J){A.effects.restore(child,K)
}})
})
}D.animate(D.to,{queue:false,duration:C.duration,easing:C.options.easing,complete:function(){if(D.to.opacity===0){D.css("opacity",D.from.opacity)
}if(H=="hide"){D.hide()
}A.effects.restore(D,J?O:N);
A.effects.removeWrapper(D);
if(C.callback){C.callback.apply(this,arguments)
}D.dequeue()
}})
})
}
})(jQuery);
(function(A,B){A.effects.shake=function(C){return this.queue(function(){var F=A(this),L=["position","top","bottom","left","right"];
var K=A.effects.setMode(F,C.options.mode||"effect");
var N=C.options.direction||"left";
var D=C.options.distance||20;
var E=C.options.times||3;
var H=C.duration||C.options.duration||140;
A.effects.save(F,L);
F.show();
A.effects.createWrapper(F);
var G=(N=="up"||N=="down")?"top":"left";
var P=(N=="up"||N=="left")?"pos":"neg";
var I={},O={},M={};
I[G]=(P=="pos"?"-=":"+=")+D;
O[G]=(P=="pos"?"+=":"-=")+D*2;
M[G]=(P=="pos"?"-=":"+=")+D*2;
F.animate(I,H,C.options.easing);
for(var J=1;
J<E;
J++){F.animate(O,H,C.options.easing).animate(M,H,C.options.easing)
}F.animate(O,H,C.options.easing).animate(I,H/2,C.options.easing,function(){A.effects.restore(F,L);
A.effects.removeWrapper(F);
if(C.callback){C.callback.apply(this,arguments)
}});
F.queue("fx",function(){F.dequeue()
});
F.dequeue()
})
}
})(jQuery);
(function(A,B){A.effects.slide=function(C){return this.queue(function(){var F=A(this),E=["position","top","bottom","left","right"];
var J=A.effects.setMode(F,C.options.mode||"show");
var I=C.options.direction||"left";
A.effects.save(F,E);
F.show();
A.effects.createWrapper(F).css({overflow:"hidden"});
var G=(I=="up"||I=="down")?"top":"left";
var D=(I=="up"||I=="left")?"pos":"neg";
var K=C.options.distance||(G=="top"?F.outerHeight({margin:true}):F.outerWidth({margin:true}));
if(J=="show"){F.css(G,D=="pos"?(isNaN(K)?"-"+K:-K):K)
}var H={};
H[G]=(J=="show"?(D=="pos"?"+=":"-="):(D=="pos"?"-=":"+="))+K;
F.animate(H,{queue:false,duration:C.duration,easing:C.options.easing,complete:function(){if(J=="hide"){F.hide()
}A.effects.restore(F,E);
A.effects.removeWrapper(F);
if(C.callback){C.callback.apply(this,arguments)
}F.dequeue()
}})
})
}
})(jQuery);
(function(A,B){A.effects.transfer=function(C){return this.queue(function(){var G=A(this),I=A(C.options.to),F=I.offset(),H={top:F.top,left:F.left,height:I.innerHeight(),width:I.innerWidth()},E=G.offset(),D=A('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(C.options.className).css({top:E.top,left:E.left,height:G.innerHeight(),width:G.innerWidth(),position:"absolute"}).animate(H,C.duration,C.options.easing,function(){D.remove();
(C.callback&&C.callback.apply(G[0],arguments));
G.dequeue()
})
})
}
})(jQuery);
(function(A,B){A.widget("ui.accordion",{options:{active:0,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:false,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()
}},_create:function(){var C=this,D=C.options;
C.running=0;
C.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");
C.headers=C.element.find(D.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){if(D.disabled){return 
}A(this).addClass("ui-state-hover")
}).bind("mouseleave.accordion",function(){if(D.disabled){return 
}A(this).removeClass("ui-state-hover")
}).bind("focus.accordion",function(){if(D.disabled){return 
}A(this).addClass("ui-state-focus")
}).bind("blur.accordion",function(){if(D.disabled){return 
}A(this).removeClass("ui-state-focus")
});
C.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
if(D.navigation){var E=C.element.find("a").filter(D.navigationFilter).eq(0);
if(E.length){var F=E.closest(".ui-accordion-header");
if(F.length){C.active=F
}else{C.active=E.closest(".ui-accordion-content").prev()
}}}C.active=C._findActive(C.active||D.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
C.active.next().addClass("ui-accordion-content-active");
C._createIcons();
C.resize();
C.element.attr("role","tablist");
C.headers.attr("role","tab").bind("keydown.accordion",function(G){return C._keydown(G)
}).next().attr("role","tabpanel");
C.headers.not(C.active||"").attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).next().hide();
if(!C.active.length){C.headers.eq(0).attr("tabIndex",0)
}else{C.active.attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0})
}if(!A.browser.safari){C.headers.find("a").attr("tabIndex",-1)
}if(D.event){C.headers.bind(D.event.split(" ").join(".accordion ")+".accordion",function(G){C._clickHandler.call(C,G,this);
G.preventDefault()
})
}},_createIcons:function(){var C=this.options;
if(C.icons){A("<span></span>").addClass("ui-icon "+C.icons.header).prependTo(this.headers);
this.active.children(".ui-icon").toggleClass(C.icons.header).toggleClass(C.icons.headerSelected);
this.element.addClass("ui-accordion-icons")
}},_destroyIcons:function(){this.headers.children(".ui-icon").remove();
this.element.removeClass("ui-accordion-icons")
},destroy:function(){var C=this.options;
this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");
this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex");
this.headers.find("a").removeAttr("tabIndex");
this._destroyIcons();
var D=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
if(C.autoHeight||C.fillHeight){D.css("height","")
}return A.Widget.prototype.destroy.call(this)
},_setOption:function(C,D){A.Widget.prototype._setOption.apply(this,arguments);
if(C=="active"){this.activate(D)
}if(C=="icons"){this._destroyIcons();
if(D){this._createIcons()
}}if(C=="disabled"){this.headers.add(this.headers.next())[D?"addClass":"removeClass"]("ui-accordion-disabled ui-state-disabled")
}},_keydown:function(F){if(this.options.disabled||F.altKey||F.ctrlKey){return 
}var G=A.ui.keyCode,E=this.headers.length,C=this.headers.index(F.target),D=false;
switch(F.keyCode){case G.RIGHT:case G.DOWN:D=this.headers[(C+1)%E];
break;
case G.LEFT:case G.UP:D=this.headers[(C-1+E)%E];
break;
case G.SPACE:case G.ENTER:this._clickHandler({target:F.target},F.target);
F.preventDefault()
}if(D){A(F.target).attr("tabIndex",-1);
A(D).attr("tabIndex",0);
D.focus();
return false
}return true
},resize:function(){var C=this.options,E;
if(C.fillSpace){if(A.browser.msie){var D=this.element.parent().css("overflow");
this.element.parent().css("overflow","hidden")
}E=this.element.parent().height();
if(A.browser.msie){this.element.parent().css("overflow",D)
}this.headers.each(function(){E-=A(this).outerHeight(true)
});
this.headers.next().each(function(){A(this).height(Math.max(0,E-A(this).innerHeight()+A(this).height()))
}).css("overflow","auto")
}else{if(C.autoHeight){E=0;
this.headers.next().each(function(){E=Math.max(E,A(this).height("").height())
}).height(E)
}}return this
},activate:function(C){this.options.active=C;
var D=this._findActive(C)[0];
this._clickHandler({target:D},D);
return this
},_findActive:function(C){return C?typeof C==="number"?this.headers.filter(":eq("+C+")"):this.headers.not(this.headers.not(C)):C===false?A([]):this.headers.filter(":eq(0)")
},_clickHandler:function(C,G){var L=this.options;
if(L.disabled){return 
}if(!C.target){if(!L.collapsible){return 
}this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(L.icons.headerSelected).addClass(L.icons.header);
this.active.next().addClass("ui-accordion-content-active");
var I=this.active.next(),F={options:L,newHeader:A([]),oldHeader:L.active,newContent:A([]),oldContent:I},D=(this.active=A([]));
this._toggle(D,I,F);
return 
}var H=A(C.currentTarget||G),J=H[0]===this.active[0];
L.active=L.collapsible&&J?false:this.headers.index(H);
if(this.running||(!L.collapsible&&J)){return 
}var E=this.active,D=H.next(),I=this.active.next(),F={options:L,newHeader:J&&L.collapsible?A([]):H,oldHeader:this.active,newContent:J&&L.collapsible?A([]):D,oldContent:I},K=this.headers.index(this.active[0])>this.headers.index(H[0]);
this.active=J?A([]):H;
this._toggle(D,I,F,J,K);
E.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(L.icons.headerSelected).addClass(L.icons.header);
if(!J){H.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(L.icons.header).addClass(L.icons.headerSelected);
H.next().addClass("ui-accordion-content-active")
}return 
},_toggle:function(C,I,G,J,K){var M=this,N=M.options;
M.toShow=C;
M.toHide=I;
M.data=G;
var D=function(){if(!M){return 
}return M._completed.apply(M,arguments)
};
M._trigger("changestart",null,M.data);
M.running=I.size()===0?C.size():I.size();
if(N.animated){var F={};
if(N.collapsible&&J){F={toShow:A([]),toHide:I,complete:D,down:K,autoHeight:N.autoHeight||N.fillSpace}
}else{F={toShow:C,toHide:I,complete:D,down:K,autoHeight:N.autoHeight||N.fillSpace}
}if(!N.proxied){N.proxied=N.animated
}if(!N.proxiedDuration){N.proxiedDuration=N.duration
}N.animated=A.isFunction(N.proxied)?N.proxied(F):N.proxied;
N.duration=A.isFunction(N.proxiedDuration)?N.proxiedDuration(F):N.proxiedDuration;
var L=A.ui.accordion.animations,E=N.duration,H=N.animated;
if(H&&!L[H]&&!A.easing[H]){H="slide"
}if(!L[H]){L[H]=function(O){this.slide(O,{easing:H,duration:E||700})
}
}L[H](F)
}else{if(N.collapsible&&J){C.toggle()
}else{I.hide();
C.show()
}D(true)
}I.prev().attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).blur();
C.prev().attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}).focus()
},_completed:function(C){this.running=C?0:--this.running;
if(this.running){return 
}if(this.options.clearStyle){this.toShow.add(this.toHide).css({height:"",overflow:""})
}this.toHide.removeClass("ui-accordion-content-active");
if(this.toHide.length){this.toHide.parent()[0].className=this.toHide.parent()[0].className
}this._trigger("change",null,this.data)
}});
A.extend(A.ui.accordion,{version:"1.8.16",animations:{slide:function(K,I){K=A.extend({easing:"swing",duration:300},K,I);
if(!K.toHide.size()){K.toShow.animate({height:"show",paddingTop:"show",paddingBottom:"show"},K);
return 
}if(!K.toShow.size()){K.toHide.animate({height:"hide",paddingTop:"hide",paddingBottom:"hide"},K);
return 
}var D=K.toShow.css("overflow"),H=0,E={},G={},F=["height","paddingTop","paddingBottom"],C;
var J=K.toShow;
C=J[0].style.width;
J.width(parseInt(J.parent().width(),10)-parseInt(J.css("paddingLeft"),10)-parseInt(J.css("paddingRight"),10)-(parseInt(J.css("borderLeftWidth"),10)||0)-(parseInt(J.css("borderRightWidth"),10)||0));
A.each(F,function(L,N){G[N]="hide";
var M=(""+A.css(K.toShow[0],N)).match(/^([\d+-.]+)(.*)$/);
E[N]={value:M[1],unit:M[2]||"px"}
});
K.toShow.css({height:0,overflow:"hidden"}).show();
K.toHide.filter(":hidden").each(K.complete).end().filter(":visible").animate(G,{step:function(L,M){if(M.prop=="height"){H=(M.end-M.start===0)?0:(M.now-M.start)/(M.end-M.start)
}K.toShow[0].style[M.prop]=(H*E[M.prop].value)+E[M.prop].unit
},duration:K.duration,easing:K.easing,complete:function(){if(!K.autoHeight){K.toShow.css("height","")
}K.toShow.css({width:C,overflow:D});
K.complete()
}})
},bounceslide:function(C){this.slide(C,{easing:C.down?"easeOutBounce":"swing",duration:C.down?1000:200})
}}})
})(jQuery);
(function(A,B){var C=0;
A.widget("ui.autocomplete",{options:{appendTo:"body",autoFocus:false,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null},pending:0,_create:function(){var D=this,F=this.element[0].ownerDocument,E;
this.element.addClass("ui-autocomplete-input").attr("autocomplete","off").attr({role:"textbox","aria-autocomplete":"list","aria-haspopup":"true"}).bind("keydown.autocomplete",function(G){if(D.options.disabled||D.element.propAttr("readOnly")){return 
}E=false;
var H=A.ui.keyCode;
switch(G.keyCode){case H.PAGE_UP:D._move("previousPage",G);
break;
case H.PAGE_DOWN:D._move("nextPage",G);
break;
case H.UP:D._move("previous",G);
G.preventDefault();
break;
case H.DOWN:D._move("next",G);
G.preventDefault();
break;
case H.ENTER:case H.NUMPAD_ENTER:if(D.menu.active){E=true;
G.preventDefault()
}case H.TAB:if(!D.menu.active){return 
}D.menu.select(G);
break;
case H.ESCAPE:D.element.val(D.term);
D.close(G);
break;
default:clearTimeout(D.searching);
D.searching=setTimeout(function(){if(D.term!=D.element.val()){D.selectedItem=null;
D.search(null,G)
}},D.options.delay);
break
}}).bind("keypress.autocomplete",function(G){if(E){E=false;
G.preventDefault()
}}).bind("focus.autocomplete",function(){if(D.options.disabled){return 
}D.selectedItem=null;
D.previous=D.element.val()
}).bind("blur.autocomplete",function(G){if(D.options.disabled){return 
}clearTimeout(D.searching);
D.closing=setTimeout(function(){D.close(G);
D._change(G)
},150)
});
this._initSource();
this.response=function(){return D._response.apply(D,arguments)
};
this.menu=A("<ul></ul>").addClass("ui-autocomplete").appendTo(A(this.options.appendTo||"body",F)[0]).mousedown(function(G){var H=D.menu.element[0];
if(!A(G.target).closest(".ui-menu-item").length){setTimeout(function(){A(document).one("mousedown",function(I){if(I.target!==D.element[0]&&I.target!==H&&!A.ui.contains(H,I.target)){D.close()
}})
},1)
}setTimeout(function(){clearTimeout(D.closing)
},13)
}).menu({focus:function(H,I){var G=I.item.data("item.autocomplete");
if(false!==D._trigger("focus",H,{item:G})){if(/^key/.test(H.originalEvent.type)){D.element.val(G.value)
}}},selected:function(I,J){var H=J.item.data("item.autocomplete"),G=D.previous;
if(D.element[0]!==F.activeElement){D.element.focus();
D.previous=G;
setTimeout(function(){D.previous=G;
D.selectedItem=H
},1)
}if(false!==D._trigger("select",I,{item:H})){D.element.val(H.value)
}D.term=D.element.val();
D.close(I);
D.selectedItem=H
},blur:function(G,H){if(D.menu.element.is(":visible")&&(D.element.val()!==D.term)){D.element.val(D.term)
}}}).zIndex(this.element.zIndex()+1).css({top:0,left:0}).hide().data("menu");
if(A.fn.bgiframe){this.menu.element.bgiframe()
}},destroy:function(){this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");
this.menu.element.remove();
A.Widget.prototype.destroy.call(this)
},_setOption:function(D,E){A.Widget.prototype._setOption.apply(this,arguments);
if(D==="source"){this._initSource()
}if(D==="appendTo"){this.menu.element.appendTo(A(E||"body",this.element[0].ownerDocument)[0])
}if(D==="disabled"&&E&&this.xhr){this.xhr.abort()
}},_initSource:function(){var D=this,F,E;
if(A.isArray(this.options.source)){F=this.options.source;
this.source=function(H,G){G(A.ui.autocomplete.filter(F,H.term))
}
}else{if(typeof this.options.source==="string"){E=this.options.source;
this.source=function(H,G){if(D.xhr){D.xhr.abort()
}D.xhr=A.ajax({url:E,data:H,dataType:"json",autocompleteRequest:++C,success:function(J,I){if(this.autocompleteRequest===C){G(J)
}},error:function(){if(this.autocompleteRequest===C){G([])
}}})
}
}else{this.source=this.options.source
}}},search:function(E,D){E=E!=null?E:this.element.val();
this.term=this.element.val();
if(E.length<this.options.minLength){return this.close(D)
}clearTimeout(this.closing);
if(this._trigger("search",D)===false){return 
}return this._search(E)
},_search:function(D){this.pending++;
this.element.addClass("ui-autocomplete-loading");
this.source({term:D},this.response)
},_response:function(D){if(!this.options.disabled&&D&&D.length){D=this._normalize(D);
this._suggest(D);
this._trigger("open")
}else{this.close()
}this.pending--;
if(!this.pending){this.element.removeClass("ui-autocomplete-loading")
}},close:function(D){clearTimeout(this.closing);
if(this.menu.element.is(":visible")){this.menu.element.hide();
this.menu.deactivate();
this._trigger("close",D)
}},_change:function(D){if(this.previous!==this.element.val()){this._trigger("change",D,{item:this.selectedItem})
}},_normalize:function(D){if(D.length&&D[0].label&&D[0].value){return D
}return A.map(D,function(E){if(typeof E==="string"){return{label:E,value:E}
}return A.extend({label:E.label||E.value,value:E.value||E.label},E)
})
},_suggest:function(D){var E=this.menu.element.empty().zIndex(this.element.zIndex()+1);
this._renderMenu(E,D);
this.menu.deactivate();
this.menu.refresh();
E.show();
this._resizeMenu();
E.position(A.extend({of:this.element},this.options.position));
if(this.options.autoFocus){this.menu.next(new A.Event("mouseover"))
}},_resizeMenu:function(){var D=this.menu.element;
D.outerWidth(Math.max(D.width("").outerWidth(),this.element.outerWidth()))
},_renderMenu:function(F,E){var D=this;
A.each(E,function(G,H){D._renderItem(F,H)
})
},_renderItem:function(D,E){return A("<li></li>").data("item.autocomplete",E).append(A("<a></a>").text(E.label)).appendTo(D)
},_move:function(E,D){if(!this.menu.element.is(":visible")){this.search(null,D);
return 
}if(this.menu.first()&&/^previous/.test(E)||this.menu.last()&&/^next/.test(E)){this.element.val(this.term);
this.menu.deactivate();
return 
}this.menu[E](D)
},widget:function(){return this.menu.element
}});
A.extend(A.ui.autocomplete,{escapeRegex:function(D){return D.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")
},filter:function(F,D){var E=new RegExp(A.ui.autocomplete.escapeRegex(D),"i");
return A.grep(F,function(G){return E.test(G.label||G.value||G)
})
}})
}(jQuery));
(function(A){A.widget("ui.menu",{_create:function(){var B=this;
this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role:"listbox","aria-activedescendant":"ui-active-menuitem"}).click(function(C){if(!A(C.target).closest(".ui-menu-item a").length){return 
}C.preventDefault();
B.select(C)
});
this.refresh()
},refresh:function(){var C=this;
var B=this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","menuitem");
B.children("a").addClass("ui-corner-all").attr("tabindex",-1).mouseenter(function(D){C.activate(D,A(this).parent())
}).mouseleave(function(){C.deactivate()
})
},activate:function(E,D){this.deactivate();
if(this.hasScroll()){var F=D.offset().top-this.element.offset().top,B=this.element.scrollTop(),C=this.element.height();
if(F<0){this.element.scrollTop(B+F)
}else{if(F>=C){this.element.scrollTop(B+F-C+D.height())
}}}this.active=D.eq(0).children("a").addClass("ui-state-hover").attr("id","ui-active-menuitem").end();
this._trigger("focus",E,{item:D})
},deactivate:function(){if(!this.active){return 
}this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
this._trigger("blur");
this.active=null
},next:function(B){this.move("next",".ui-menu-item:first",B)
},previous:function(B){this.move("prev",".ui-menu-item:last",B)
},first:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length
},last:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length
},move:function(E,D,C){if(!this.active){this.activate(C,this.element.children(D));
return 
}var B=this.active[E+"All"](".ui-menu-item").eq(0);
if(B.length){this.activate(C,B)
}else{this.activate(C,this.element.children(D))
}},nextPage:function(D){if(this.hasScroll()){if(!this.active||this.last()){this.activate(D,this.element.children(".ui-menu-item:first"));
return 
}var E=this.active.offset().top,C=this.element.height(),B=this.element.children(".ui-menu-item").filter(function(){var F=A(this).offset().top-E-C+A(this).height();
return F<10&&F>-10
});
if(!B.length){B=this.element.children(".ui-menu-item:last")
}this.activate(D,B)
}else{this.activate(D,this.element.children(".ui-menu-item").filter(!this.active||this.last()?":first":":last"))
}},previousPage:function(C){if(this.hasScroll()){if(!this.active||this.first()){this.activate(C,this.element.children(".ui-menu-item:last"));
return 
}var D=this.active.offset().top,B=this.element.height();
result=this.element.children(".ui-menu-item").filter(function(){var E=A(this).offset().top-D+B-A(this).height();
return E<10&&E>-10
});
if(!result.length){result=this.element.children(".ui-menu-item:first")
}this.activate(C,result)
}else{this.activate(C,this.element.children(".ui-menu-item").filter(!this.active||this.first()?":last":":first"))
}},hasScroll:function(){return this.element.height()<this.element[A.fn.prop?"prop":"attr"]("scrollHeight")
},select:function(B){this._trigger("selected",B,{item:this.active})
}})
}(jQuery));
(function(F,B){var K,E,A,H,I="ui-button ui-widget ui-state-default ui-corner-all",C="ui-state-hover ui-state-active ",G="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",J=function(){var L=F(this).find(":ui-button");
setTimeout(function(){L.button("refresh")
},1)
},D=function(M){var L=M.name,N=M.form,O=F([]);
if(L){if(N){O=F(N).find("[name='"+L+"']")
}else{O=F("[name='"+L+"']",M.ownerDocument).filter(function(){return !this.form
})
}}return O
};
F.widget("ui.button",{options:{disabled:null,text:true,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",J);
if(typeof this.options.disabled!=="boolean"){this.options.disabled=this.element.propAttr("disabled")
}this._determineButtonType();
this.hasTitle=!!this.buttonElement.attr("title");
var L=this,N=this.options,O=this.type==="checkbox"||this.type==="radio",P="ui-state-hover"+(!O?" ui-state-active":""),M="ui-state-focus";
if(N.label===null){N.label=this.buttonElement.html()
}if(this.element.is(":disabled")){N.disabled=true
}this.buttonElement.addClass(I).attr("role","button").bind("mouseenter.button",function(){if(N.disabled){return 
}F(this).addClass("ui-state-hover");
if(this===K){F(this).addClass("ui-state-active")
}}).bind("mouseleave.button",function(){if(N.disabled){return 
}F(this).removeClass(P)
}).bind("click.button",function(Q){if(N.disabled){Q.preventDefault();
Q.stopImmediatePropagation()
}});
this.element.bind("focus.button",function(){L.buttonElement.addClass(M)
}).bind("blur.button",function(){L.buttonElement.removeClass(M)
});
if(O){this.element.bind("change.button",function(){if(H){return 
}L.refresh()
});
this.buttonElement.bind("mousedown.button",function(Q){if(N.disabled){return 
}H=false;
E=Q.pageX;
A=Q.pageY
}).bind("mouseup.button",function(Q){if(N.disabled){return 
}if(E!==Q.pageX||A!==Q.pageY){H=true
}})
}if(this.type==="checkbox"){this.buttonElement.bind("click.button",function(){if(N.disabled||H){return false
}F(this).toggleClass("ui-state-active");
L.buttonElement.attr("aria-pressed",L.element[0].checked)
})
}else{if(this.type==="radio"){this.buttonElement.bind("click.button",function(){if(N.disabled||H){return false
}F(this).addClass("ui-state-active");
L.buttonElement.attr("aria-pressed","true");
var Q=L.element[0];
D(Q).not(Q).map(function(){return F(this).button("widget")[0]
}).removeClass("ui-state-active").attr("aria-pressed","false")
})
}else{this.buttonElement.bind("mousedown.button",function(){if(N.disabled){return false
}F(this).addClass("ui-state-active");
K=this;
F(document).one("mouseup",function(){K=null
})
}).bind("mouseup.button",function(){if(N.disabled){return false
}F(this).removeClass("ui-state-active")
}).bind("keydown.button",function(Q){if(N.disabled){return false
}if(Q.keyCode==F.ui.keyCode.SPACE||Q.keyCode==F.ui.keyCode.ENTER){F(this).addClass("ui-state-active")
}}).bind("keyup.button",function(){F(this).removeClass("ui-state-active")
});
if(this.buttonElement.is("a")){this.buttonElement.keyup(function(Q){if(Q.keyCode===F.ui.keyCode.SPACE){F(this).click()
}})
}}}this._setOption("disabled",N.disabled);
this._resetButton()
},_determineButtonType:function(){if(this.element.is(":checkbox")){this.type="checkbox"
}else{if(this.element.is(":radio")){this.type="radio"
}else{if(this.element.is("input")){this.type="input"
}else{this.type="button"
}}}if(this.type==="checkbox"||this.type==="radio"){var L=this.element.parents().filter(":last"),N="label[for='"+this.element.attr("id")+"']";
this.buttonElement=L.find(N);
if(!this.buttonElement.length){L=L.length?L.siblings():this.element.siblings();
this.buttonElement=L.filter(N);
if(!this.buttonElement.length){this.buttonElement=L.find(N)
}}this.element.addClass("ui-helper-hidden-accessible");
var M=this.element.is(":checked");
if(M){this.buttonElement.addClass("ui-state-active")
}this.buttonElement.attr("aria-pressed",M)
}else{this.buttonElement=this.element
}},widget:function(){return this.buttonElement
},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible");
this.buttonElement.removeClass(I+" "+C+" "+G).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
if(!this.hasTitle){this.buttonElement.removeAttr("title")
}F.Widget.prototype.destroy.call(this)
},_setOption:function(L,M){F.Widget.prototype._setOption.apply(this,arguments);
if(L==="disabled"){if(M){this.element.propAttr("disabled",true)
}else{this.element.propAttr("disabled",false)
}return 
}this._resetButton()
},refresh:function(){var L=this.element.is(":disabled");
if(L!==this.options.disabled){this._setOption("disabled",L)
}if(this.type==="radio"){D(this.element[0]).each(function(){if(F(this).is(":checked")){F(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true")
}else{F(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")
}})
}else{if(this.type==="checkbox"){if(this.element.is(":checked")){this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true")
}else{this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false")
}}}},_resetButton:function(){if(this.type==="input"){if(this.options.label){this.element.val(this.options.label)
}return 
}var P=this.buttonElement.removeClass(G),N=F("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(P.empty()).text(),M=this.options.icons,L=M.primary&&M.secondary,O=[];
if(M.primary||M.secondary){if(this.options.text){O.push("ui-button-text-icon"+(L?"s":(M.primary?"-primary":"-secondary")))
}if(M.primary){P.prepend("<span class='ui-button-icon-primary ui-icon "+M.primary+"'></span>")
}if(M.secondary){P.append("<span class='ui-button-icon-secondary ui-icon "+M.secondary+"'></span>")
}if(!this.options.text){O.push(L?"ui-button-icons-only":"ui-button-icon-only");
if(!this.hasTitle){P.attr("title",N)
}}}else{O.push("ui-button-text-only")
}P.addClass(O.join(" "))
}});
F.widget("ui.buttonset",{options:{items:":button, :submit, :reset, :checkbox, :radio, a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")
},_init:function(){this.refresh()
},_setOption:function(L,M){if(L==="disabled"){this.buttons.button("option",L,M)
}F.Widget.prototype._setOption.apply(this,arguments)
},refresh:function(){var L=this.element.css("direction")==="ltr";
this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return F(this).button("widget")[0]
}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(L?"ui-corner-left":"ui-corner-right").end().filter(":last").addClass(L?"ui-corner-right":"ui-corner-left").end().end()
},destroy:function(){this.element.removeClass("ui-buttonset");
this.buttons.map(function(){return F(this).button("widget")[0]
}).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
F.Widget.prototype.destroy.call(this)
}})
}(jQuery));
(function($,undefined){$.extend($.ui,{datepicker:{version:"1.8.16"}});
var PROP_NAME="datepicker";
var dpuuid=new Date().getTime();
var instActive;
function Datepicker(){this.debug=false;
this._curInst=null;
this._keyEvent=false;
this._disabledInputs=[];
this._datepickerShowing=false;
this._inDialog=false;
this._mainDivId="ui-datepicker-div";
this._inlineClass="ui-datepicker-inline";
this._appendClass="ui-datepicker-append";
this._triggerClass="ui-datepicker-trigger";
this._dialogClass="ui-datepicker-dialog";
this._disableClass="ui-datepicker-disabled";
this._unselectableClass="ui-datepicker-unselectable";
this._currentClass="ui-datepicker-current-day";
this._dayOverClass="ui-datepicker-days-cell-over";
this.regional=[];
this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:false,showMonthAfterYear:false,yearSuffix:""};
this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,gotoCurrent:false,changeMonth:false,changeYear:false,yearRange:"c-10:c+10",showOtherMonths:false,selectOtherMonths:false,showWeek:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:true,showButtonPanel:false,autoSize:false,disabled:false};
$.extend(this._defaults,this.regional[""]);
this.dpDiv=bindHover($('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
}$.extend(Datepicker.prototype,{markerClassName:"hasDatepicker",maxRows:4,log:function(){if(this.debug){console.log.apply("",arguments)
}},_widgetDatepicker:function(){return this.dpDiv
},setDefaults:function(settings){extendRemove(this._defaults,settings||{});
return this
},_attachDatepicker:function(target,settings){var inlineSettings=null;
for(var attrName in this._defaults){var attrValue=target.getAttribute("date:"+attrName);
if(attrValue){inlineSettings=inlineSettings||{};
try{inlineSettings[attrName]=eval(attrValue)
}catch(err){inlineSettings[attrName]=attrValue
}}}var nodeName=target.nodeName.toLowerCase();
var inline=(nodeName=="div"||nodeName=="span");
if(!target.id){this.uuid+=1;
target.id="dp"+this.uuid
}var inst=this._newInst($(target),inline);
inst.settings=$.extend({},settings||{},inlineSettings||{});
if(nodeName=="input"){this._connectDatepicker(target,inst)
}else{if(inline){this._inlineDatepicker(target,inst)
}}},_newInst:function(target,inline){var id=target[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1");
return{id:id,input:target,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:inline,dpDiv:(!inline?this.dpDiv:bindHover($('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')))}
},_connectDatepicker:function(target,inst){var input=$(target);
inst.append=$([]);
inst.trigger=$([]);
if(input.hasClass(this.markerClassName)){return 
}this._attachments(input,inst);
input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(event,key,value){inst.settings[key]=value
}).bind("getData.datepicker",function(event,key){return this._get(inst,key)
});
this._autoSize(inst);
$.data(target,PROP_NAME,inst);
if(inst.settings.disabled){this._disableDatepicker(target)
}},_attachments:function(input,inst){var appendText=this._get(inst,"appendText");
var isRTL=this._get(inst,"isRTL");
if(inst.append){inst.append.remove()
}if(appendText){inst.append=$('<span class="'+this._appendClass+'">'+appendText+"</span>");
input[isRTL?"before":"after"](inst.append)
}input.unbind("focus",this._showDatepicker);
if(inst.trigger){inst.trigger.remove()
}var showOn=this._get(inst,"showOn");
if(showOn=="focus"||showOn=="both"){input.focus(this._showDatepicker)
}if(showOn=="button"||showOn=="both"){var buttonText=this._get(inst,"buttonText");
var buttonImage=this._get(inst,"buttonImage");
inst.trigger=$(this._get(inst,"buttonImageOnly")?$("<img/>").addClass(this._triggerClass).attr({src:buttonImage,alt:buttonText,title:buttonText}):$('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage==""?buttonText:$("<img/>").attr({src:buttonImage,alt:buttonText,title:buttonText})));
input[isRTL?"before":"after"](inst.trigger);
inst.trigger.click(function(){if($.datepicker._datepickerShowing&&$.datepicker._lastInput==input[0]){$.datepicker._hideDatepicker()
}else{$.datepicker._showDatepicker(input[0])
}return false
})
}},_autoSize:function(inst){if(this._get(inst,"autoSize")&&!inst.inline){var date=new Date(2009,12-1,20);
var dateFormat=this._get(inst,"dateFormat");
if(dateFormat.match(/[DM]/)){var findMax=function(names){var max=0;
var maxI=0;
for(var i=0;
i<names.length;
i++){if(names[i].length>max){max=names[i].length;
maxI=i
}}return maxI
};
date.setMonth(findMax(this._get(inst,(dateFormat.match(/MM/)?"monthNames":"monthNamesShort"))));
date.setDate(findMax(this._get(inst,(dateFormat.match(/DD/)?"dayNames":"dayNamesShort")))+20-date.getDay())
}inst.input.attr("size",this._formatDate(inst,date).length)
}},_inlineDatepicker:function(target,inst){var divSpan=$(target);
if(divSpan.hasClass(this.markerClassName)){return 
}divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker",function(event,key,value){inst.settings[key]=value
}).bind("getData.datepicker",function(event,key){return this._get(inst,key)
});
$.data(target,PROP_NAME,inst);
this._setDate(inst,this._getDefaultDate(inst),true);
this._updateDatepicker(inst);
this._updateAlternate(inst);
if(inst.settings.disabled){this._disableDatepicker(target)
}inst.dpDiv.css("display","block")
},_dialogDatepicker:function(input,date,onSelect,settings,pos){var inst=this._dialogInst;
if(!inst){this.uuid+=1;
var id="dp"+this.uuid;
this._dialogInput=$('<input type="text" id="'+id+'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
this._dialogInput.keydown(this._doKeyDown);
$("body").append(this._dialogInput);
inst=this._dialogInst=this._newInst(this._dialogInput,false);
inst.settings={};
$.data(this._dialogInput[0],PROP_NAME,inst)
}extendRemove(inst.settings,settings||{});
date=(date&&date.constructor==Date?this._formatDate(inst,date):date);
this._dialogInput.val(date);
this._pos=(pos?(pos.length?pos:[pos.pageX,pos.pageY]):null);
if(!this._pos){var browserWidth=document.documentElement.clientWidth;
var browserHeight=document.documentElement.clientHeight;
var scrollX=document.documentElement.scrollLeft||document.body.scrollLeft;
var scrollY=document.documentElement.scrollTop||document.body.scrollTop;
this._pos=[(browserWidth/2)-100+scrollX,(browserHeight/2)-150+scrollY]
}this._dialogInput.css("left",(this._pos[0]+20)+"px").css("top",this._pos[1]+"px");
inst.settings.onSelect=onSelect;
this._inDialog=true;
this.dpDiv.addClass(this._dialogClass);
this._showDatepicker(this._dialogInput[0]);
if($.blockUI){$.blockUI(this.dpDiv)
}$.data(this._dialogInput[0],PROP_NAME,inst);
return this
},_destroyDatepicker:function(target){var $target=$(target);
var inst=$.data(target,PROP_NAME);
if(!$target.hasClass(this.markerClassName)){return 
}var nodeName=target.nodeName.toLowerCase();
$.removeData(target,PROP_NAME);
if(nodeName=="input"){inst.append.remove();
inst.trigger.remove();
$target.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)
}else{if(nodeName=="div"||nodeName=="span"){$target.removeClass(this.markerClassName).empty()
}}},_enableDatepicker:function(target){var $target=$(target);
var inst=$.data(target,PROP_NAME);
if(!$target.hasClass(this.markerClassName)){return 
}var nodeName=target.nodeName.toLowerCase();
if(nodeName=="input"){target.disabled=false;
inst.trigger.filter("button").each(function(){this.disabled=false
}).end().filter("img").css({opacity:"1.0",cursor:""})
}else{if(nodeName=="div"||nodeName=="span"){var inline=$target.children("."+this._inlineClass);
inline.children().removeClass("ui-state-disabled");
inline.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")
}}this._disabledInputs=$.map(this._disabledInputs,function(value){return(value==target?null:value)
})
},_disableDatepicker:function(target){var $target=$(target);
var inst=$.data(target,PROP_NAME);
if(!$target.hasClass(this.markerClassName)){return 
}var nodeName=target.nodeName.toLowerCase();
if(nodeName=="input"){target.disabled=true;
inst.trigger.filter("button").each(function(){this.disabled=true
}).end().filter("img").css({opacity:"0.5",cursor:"default"})
}else{if(nodeName=="div"||nodeName=="span"){var inline=$target.children("."+this._inlineClass);
inline.children().addClass("ui-state-disabled");
inline.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled","disabled")
}}this._disabledInputs=$.map(this._disabledInputs,function(value){return(value==target?null:value)
});
this._disabledInputs[this._disabledInputs.length]=target
},_isDisabledDatepicker:function(target){if(!target){return false
}for(var i=0;
i<this._disabledInputs.length;
i++){if(this._disabledInputs[i]==target){return true
}}return false
},_getInst:function(target){try{return $.data(target,PROP_NAME)
}catch(err){throw"Missing instance data for this datepicker"
}},_optionDatepicker:function(target,name,value){var inst=this._getInst(target);
if(arguments.length==2&&typeof name=="string"){return(name=="defaults"?$.extend({},$.datepicker._defaults):(inst?(name=="all"?$.extend({},inst.settings):this._get(inst,name)):null))
}var settings=name||{};
if(typeof name=="string"){settings={};
settings[name]=value
}if(inst){if(this._curInst==inst){this._hideDatepicker()
}var date=this._getDateDatepicker(target,true);
var minDate=this._getMinMaxDate(inst,"min");
var maxDate=this._getMinMaxDate(inst,"max");
extendRemove(inst.settings,settings);
if(minDate!==null&&settings.dateFormat!==undefined&&settings.minDate===undefined){inst.settings.minDate=this._formatDate(inst,minDate)
}if(maxDate!==null&&settings.dateFormat!==undefined&&settings.maxDate===undefined){inst.settings.maxDate=this._formatDate(inst,maxDate)
}this._attachments($(target),inst);
this._autoSize(inst);
this._setDate(inst,date);
this._updateAlternate(inst);
this._updateDatepicker(inst)
}},_changeDatepicker:function(target,name,value){this._optionDatepicker(target,name,value)
},_refreshDatepicker:function(target){var inst=this._getInst(target);
if(inst){this._updateDatepicker(inst)
}},_setDateDatepicker:function(target,date){var inst=this._getInst(target);
if(inst){this._setDate(inst,date);
this._updateDatepicker(inst);
this._updateAlternate(inst)
}},_getDateDatepicker:function(target,noDefault){var inst=this._getInst(target);
if(inst&&!inst.inline){this._setDateFromField(inst,noDefault)
}return(inst?this._getDate(inst):null)
},_doKeyDown:function(event){var inst=$.datepicker._getInst(event.target);
var handled=true;
var isRTL=inst.dpDiv.is(".ui-datepicker-rtl");
inst._keyEvent=true;
if($.datepicker._datepickerShowing){switch(event.keyCode){case 9:$.datepicker._hideDatepicker();
handled=false;
break;
case 13:var sel=$("td."+$.datepicker._dayOverClass+":not(."+$.datepicker._currentClass+")",inst.dpDiv);
if(sel[0]){$.datepicker._selectDay(event.target,inst.selectedMonth,inst.selectedYear,sel[0])
}var onSelect=$.datepicker._get(inst,"onSelect");
if(onSelect){var dateStr=$.datepicker._formatDate(inst);
onSelect.apply((inst.input?inst.input[0]:null),[dateStr,inst])
}else{$.datepicker._hideDatepicker()
}return false;
break;
case 27:$.datepicker._hideDatepicker();
break;
case 33:$.datepicker._adjustDate(event.target,(event.ctrlKey?-$.datepicker._get(inst,"stepBigMonths"):-$.datepicker._get(inst,"stepMonths")),"M");
break;
case 34:$.datepicker._adjustDate(event.target,(event.ctrlKey?+$.datepicker._get(inst,"stepBigMonths"):+$.datepicker._get(inst,"stepMonths")),"M");
break;
case 35:if(event.ctrlKey||event.metaKey){$.datepicker._clearDate(event.target)
}handled=event.ctrlKey||event.metaKey;
break;
case 36:if(event.ctrlKey||event.metaKey){$.datepicker._gotoToday(event.target)
}handled=event.ctrlKey||event.metaKey;
break;
case 37:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,(isRTL?+1:-1),"D")
}handled=event.ctrlKey||event.metaKey;
if(event.originalEvent.altKey){$.datepicker._adjustDate(event.target,(event.ctrlKey?-$.datepicker._get(inst,"stepBigMonths"):-$.datepicker._get(inst,"stepMonths")),"M")
}break;
case 38:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,-7,"D")
}handled=event.ctrlKey||event.metaKey;
break;
case 39:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,(isRTL?-1:+1),"D")
}handled=event.ctrlKey||event.metaKey;
if(event.originalEvent.altKey){$.datepicker._adjustDate(event.target,(event.ctrlKey?+$.datepicker._get(inst,"stepBigMonths"):+$.datepicker._get(inst,"stepMonths")),"M")
}break;
case 40:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,+7,"D")
}handled=event.ctrlKey||event.metaKey;
break;
default:handled=false
}}else{if(event.keyCode==36&&event.ctrlKey){$.datepicker._showDatepicker(this)
}else{handled=false
}}if(handled){event.preventDefault();
event.stopPropagation()
}},_doKeyPress:function(event){var inst=$.datepicker._getInst(event.target);
if($.datepicker._get(inst,"constrainInput")){var chars=$.datepicker._possibleChars($.datepicker._get(inst,"dateFormat"));
var chr=String.fromCharCode(event.charCode==undefined?event.keyCode:event.charCode);
return event.ctrlKey||event.metaKey||(chr<" "||!chars||chars.indexOf(chr)>-1)
}},_doKeyUp:function(event){var inst=$.datepicker._getInst(event.target);
if(inst.input.val()!=inst.lastVal){try{var date=$.datepicker.parseDate($.datepicker._get(inst,"dateFormat"),(inst.input?inst.input.val():null),$.datepicker._getFormatConfig(inst));
if(date){$.datepicker._setDateFromField(inst);
$.datepicker._updateAlternate(inst);
$.datepicker._updateDatepicker(inst)
}}catch(event){$.datepicker.log(event)
}}return true
},_showDatepicker:function(input){input=input.target||input;
if(input.nodeName.toLowerCase()!="input"){input=$("input",input.parentNode)[0]
}if($.datepicker._isDisabledDatepicker(input)||$.datepicker._lastInput==input){return 
}var inst=$.datepicker._getInst(input);
if($.datepicker._curInst&&$.datepicker._curInst!=inst){if($.datepicker._datepickerShowing){$.datepicker._triggerOnClose($.datepicker._curInst)
}$.datepicker._curInst.dpDiv.stop(true,true)
}var beforeShow=$.datepicker._get(inst,"beforeShow");
var beforeShowSettings=beforeShow?beforeShow.apply(input,[input,inst]):{};
if(beforeShowSettings===false){return 
}extendRemove(inst.settings,beforeShowSettings);
inst.lastVal=null;
$.datepicker._lastInput=input;
$.datepicker._setDateFromField(inst);
if($.datepicker._inDialog){input.value=""
}if(!$.datepicker._pos){$.datepicker._pos=$.datepicker._findPos(input);
$.datepicker._pos[1]+=input.offsetHeight
}var isFixed=false;
$(input).parents().each(function(){isFixed|=$(this).css("position")=="fixed";
return !isFixed
});
if(isFixed&&$.browser.opera){$.datepicker._pos[0]-=document.documentElement.scrollLeft;
$.datepicker._pos[1]-=document.documentElement.scrollTop
}var offset={left:$.datepicker._pos[0],top:$.datepicker._pos[1]};
$.datepicker._pos=null;
inst.dpDiv.empty();
inst.dpDiv.css({position:"absolute",display:"block",top:"-1000px"});
$.datepicker._updateDatepicker(inst);
offset=$.datepicker._checkOffset(inst,offset,isFixed);
inst.dpDiv.css({position:($.datepicker._inDialog&&$.blockUI?"static":(isFixed?"fixed":"absolute")),display:"none",left:offset.left+"px",top:offset.top+"px"});
if(!inst.inline){var showAnim=$.datepicker._get(inst,"showAnim");
var duration=$.datepicker._get(inst,"duration");
var postProcess=function(){var cover=inst.dpDiv.find("iframe.ui-datepicker-cover");
if(!!cover.length){var borders=$.datepicker._getBorders(inst.dpDiv);
cover.css({left:-borders[0],top:-borders[1],width:inst.dpDiv.outerWidth(),height:inst.dpDiv.outerHeight()})
}};
inst.dpDiv.zIndex($(input).zIndex()+1);
$.datepicker._datepickerShowing=true;
if($.effects&&$.effects[showAnim]){inst.dpDiv.show(showAnim,$.datepicker._get(inst,"showOptions"),duration,postProcess)
}else{inst.dpDiv[showAnim||"show"]((showAnim?duration:null),postProcess)
}if(!showAnim||!duration){postProcess()
}if(inst.input.is(":visible")&&!inst.input.is(":disabled")){inst.input.focus()
}$.datepicker._curInst=inst
}},_updateDatepicker:function(inst){var self=this;
self.maxRows=4;
var borders=$.datepicker._getBorders(inst.dpDiv);
instActive=inst;
inst.dpDiv.empty().append(this._generateHTML(inst));
var cover=inst.dpDiv.find("iframe.ui-datepicker-cover");
if(!!cover.length){cover.css({left:-borders[0],top:-borders[1],width:inst.dpDiv.outerWidth(),height:inst.dpDiv.outerHeight()})
}inst.dpDiv.find("."+this._dayOverClass+" a").mouseover();
var numMonths=this._getNumberOfMonths(inst);
var cols=numMonths[1];
var width=17;
inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
if(cols>1){inst.dpDiv.addClass("ui-datepicker-multi-"+cols).css("width",(width*cols)+"em")
}inst.dpDiv[(numMonths[0]!=1||numMonths[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi");
inst.dpDiv[(this._get(inst,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl");
if(inst==$.datepicker._curInst&&$.datepicker._datepickerShowing&&inst.input&&inst.input.is(":visible")&&!inst.input.is(":disabled")&&inst.input[0]!=document.activeElement){inst.input.focus()
}if(inst.yearshtml){var origyearshtml=inst.yearshtml;
setTimeout(function(){if(origyearshtml===inst.yearshtml&&inst.yearshtml){inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml)
}origyearshtml=inst.yearshtml=null
},0)
}},_getBorders:function(elem){var convert=function(value){return{thin:1,medium:2,thick:3}[value]||value
};
return[parseFloat(convert(elem.css("border-left-width"))),parseFloat(convert(elem.css("border-top-width")))]
},_checkOffset:function(inst,offset,isFixed){var dpWidth=inst.dpDiv.outerWidth();
var dpHeight=inst.dpDiv.outerHeight();
var inputWidth=inst.input?inst.input.outerWidth():0;
var inputHeight=inst.input?inst.input.outerHeight():0;
var viewWidth=document.documentElement.clientWidth+$(document).scrollLeft();
var viewHeight=document.documentElement.clientHeight+$(document).scrollTop();
offset.left-=(this._get(inst,"isRTL")?(dpWidth-inputWidth):0);
offset.left-=(isFixed&&offset.left==inst.input.offset().left)?$(document).scrollLeft():0;
offset.top-=(isFixed&&offset.top==(inst.input.offset().top+inputHeight))?$(document).scrollTop():0;
offset.left-=Math.min(offset.left,(offset.left+dpWidth>viewWidth&&viewWidth>dpWidth)?Math.abs(offset.left+dpWidth-viewWidth):0);
offset.top-=Math.min(offset.top,(offset.top+dpHeight>viewHeight&&viewHeight>dpHeight)?Math.abs(dpHeight+inputHeight):0);
return offset
},_findPos:function(obj){var inst=this._getInst(obj);
var isRTL=this._get(inst,"isRTL");
while(obj&&(obj.type=="hidden"||obj.nodeType!=1||$.expr.filters.hidden(obj))){obj=obj[isRTL?"previousSibling":"nextSibling"]
}var position=$(obj).offset();
return[position.left,position.top]
},_triggerOnClose:function(inst){var onClose=this._get(inst,"onClose");
if(onClose){onClose.apply((inst.input?inst.input[0]:null),[(inst.input?inst.input.val():""),inst])
}},_hideDatepicker:function(input){var inst=this._curInst;
if(!inst||(input&&inst!=$.data(input,PROP_NAME))){return 
}if(this._datepickerShowing){var showAnim=this._get(inst,"showAnim");
var duration=this._get(inst,"duration");
var postProcess=function(){$.datepicker._tidyDialog(inst);
this._curInst=null
};
if($.effects&&$.effects[showAnim]){inst.dpDiv.hide(showAnim,$.datepicker._get(inst,"showOptions"),duration,postProcess)
}else{inst.dpDiv[(showAnim=="slideDown"?"slideUp":(showAnim=="fadeIn"?"fadeOut":"hide"))]((showAnim?duration:null),postProcess)
}if(!showAnim){postProcess()
}$.datepicker._triggerOnClose(inst);
this._datepickerShowing=false;
this._lastInput=null;
if(this._inDialog){this._dialogInput.css({position:"absolute",left:"0",top:"-100px"});
if($.blockUI){$.unblockUI();
$("body").append(this.dpDiv)
}}this._inDialog=false
}},_tidyDialog:function(inst){inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
},_checkExternalClick:function(event){if(!$.datepicker._curInst){return 
}var $target=$(event.target);
if($target[0].id!=$.datepicker._mainDivId&&$target.parents("#"+$.datepicker._mainDivId).length==0&&!$target.hasClass($.datepicker.markerClassName)&&!$target.hasClass($.datepicker._triggerClass)&&$.datepicker._datepickerShowing&&!($.datepicker._inDialog&&$.blockUI)){$.datepicker._hideDatepicker()
}},_adjustDate:function(id,offset,period){var target=$(id);
var inst=this._getInst(target[0]);
if(this._isDisabledDatepicker(target[0])){return 
}this._adjustInstDate(inst,offset+(period=="M"?this._get(inst,"showCurrentAtPos"):0),period);
this._updateDatepicker(inst)
},_gotoToday:function(id){var target=$(id);
var inst=this._getInst(target[0]);
if(this._get(inst,"gotoCurrent")&&inst.currentDay){inst.selectedDay=inst.currentDay;
inst.drawMonth=inst.selectedMonth=inst.currentMonth;
inst.drawYear=inst.selectedYear=inst.currentYear
}else{var date=new Date();
inst.selectedDay=date.getDate();
inst.drawMonth=inst.selectedMonth=date.getMonth();
inst.drawYear=inst.selectedYear=date.getFullYear()
}this._notifyChange(inst);
this._adjustDate(target)
},_selectMonthYear:function(id,select,period){var target=$(id);
var inst=this._getInst(target[0]);
inst["selected"+(period=="M"?"Month":"Year")]=inst["draw"+(period=="M"?"Month":"Year")]=parseInt(select.options[select.selectedIndex].value,10);
this._notifyChange(inst);
this._adjustDate(target)
},_selectDay:function(id,month,year,td){var target=$(id);
if($(td).hasClass(this._unselectableClass)||this._isDisabledDatepicker(target[0])){return 
}var inst=this._getInst(target[0]);
inst.selectedDay=inst.currentDay=$("a",td).html();
inst.selectedMonth=inst.currentMonth=month;
inst.selectedYear=inst.currentYear=year;
this._selectDate(id,this._formatDate(inst,inst.currentDay,inst.currentMonth,inst.currentYear))
},_clearDate:function(id){var target=$(id);
var inst=this._getInst(target[0]);
this._selectDate(target,"")
},_selectDate:function(id,dateStr){var target=$(id);
var inst=this._getInst(target[0]);
dateStr=(dateStr!=null?dateStr:this._formatDate(inst));
if(inst.input){inst.input.val(dateStr)
}this._updateAlternate(inst);
var onSelect=this._get(inst,"onSelect");
if(onSelect){onSelect.apply((inst.input?inst.input[0]:null),[dateStr,inst])
}else{if(inst.input){inst.input.trigger("change")
}}if(inst.inline){this._updateDatepicker(inst)
}else{this._hideDatepicker();
this._lastInput=inst.input[0];
if(typeof (inst.input[0])!="object"){inst.input.focus()
}this._lastInput=null
}},_updateAlternate:function(inst){var altField=this._get(inst,"altField");
if(altField){var altFormat=this._get(inst,"altFormat")||this._get(inst,"dateFormat");
var date=this._getDate(inst);
var dateStr=this.formatDate(altFormat,date,this._getFormatConfig(inst));
$(altField).each(function(){$(this).val(dateStr)
})
}},noWeekends:function(date){var day=date.getDay();
return[(day>0&&day<6),""]
},iso8601Week:function(date){var checkDate=new Date(date.getTime());
checkDate.setDate(checkDate.getDate()+4-(checkDate.getDay()||7));
var time=checkDate.getTime();
checkDate.setMonth(0);
checkDate.setDate(1);
return Math.floor(Math.round((time-checkDate)/86400000)/7)+1
},parseDate:function(format,value,settings){if(format==null||value==null){throw"Invalid arguments"
}value=(typeof value=="object"?value.toString():value+"");
if(value==""){return null
}var shortYearCutoff=(settings?settings.shortYearCutoff:null)||this._defaults.shortYearCutoff;
shortYearCutoff=(typeof shortYearCutoff!="string"?shortYearCutoff:new Date().getFullYear()%100+parseInt(shortYearCutoff,10));
var dayNamesShort=(settings?settings.dayNamesShort:null)||this._defaults.dayNamesShort;
var dayNames=(settings?settings.dayNames:null)||this._defaults.dayNames;
var monthNamesShort=(settings?settings.monthNamesShort:null)||this._defaults.monthNamesShort;
var monthNames=(settings?settings.monthNames:null)||this._defaults.monthNames;
var year=-1;
var month=-1;
var day=-1;
var doy=-1;
var literal=false;
var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);
if(matches){iFormat++
}return matches
};
var getNumber=function(match){var isDoubled=lookAhead(match);
var size=(match=="@"?14:(match=="!"?20:(match=="y"&&isDoubled?4:(match=="o"?3:2))));
var digits=new RegExp("^\\d{1,"+size+"}");
var num=value.substring(iValue).match(digits);
if(!num){throw"Missing number at position "+iValue
}iValue+=num[0].length;
return parseInt(num[0],10)
};
var getName=function(match,shortNames,longNames){var names=$.map(lookAhead(match)?longNames:shortNames,function(v,k){return[[k,v]]
}).sort(function(a,b){return -(a[1].length-b[1].length)
});
var index=-1;
$.each(names,function(i,pair){var name=pair[1];
if(value.substr(iValue,name.length).toLowerCase()==name.toLowerCase()){index=pair[0];
iValue+=name.length;
return false
}});
if(index!=-1){return index+1
}else{throw"Unknown name at position "+iValue
}};
var checkLiteral=function(){if(value.charAt(iValue)!=format.charAt(iFormat)){throw"Unexpected literal at position "+iValue
}iValue++
};
var iValue=0;
for(var iFormat=0;
iFormat<format.length;
iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false
}else{checkLiteral()
}}else{switch(format.charAt(iFormat)){case"d":day=getNumber("d");
break;
case"D":getName("D",dayNamesShort,dayNames);
break;
case"o":doy=getNumber("o");
break;
case"m":month=getNumber("m");
break;
case"M":month=getName("M",monthNamesShort,monthNames);
break;
case"y":year=getNumber("y");
break;
case"@":var date=new Date(getNumber("@"));
year=date.getFullYear();
month=date.getMonth()+1;
day=date.getDate();
break;
case"!":var date=new Date((getNumber("!")-this._ticksTo1970)/10000);
year=date.getFullYear();
month=date.getMonth()+1;
day=date.getDate();
break;
case"'":if(lookAhead("'")){checkLiteral()
}else{literal=true
}break;
default:checkLiteral()
}}}if(iValue<value.length){throw"Extra/unparsed characters found in date: "+value.substring(iValue)
}if(year==-1){year=new Date().getFullYear()
}else{if(year<100){year+=new Date().getFullYear()-new Date().getFullYear()%100+(year<=shortYearCutoff?0:-100)
}}if(doy>-1){month=1;
day=doy;
do{var dim=this._getDaysInMonth(year,month-1);
if(day<=dim){break
}month++;
day-=dim
}while(true)
}var date=this._daylightSavingAdjust(new Date(year,month-1,day));
if(date.getFullYear()!=year||date.getMonth()+1!=month||date.getDate()!=day){throw"Invalid date"
}return date
},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(((1970-1)*365+Math.floor(1970/4)-Math.floor(1970/100)+Math.floor(1970/400))*24*60*60*10000000),formatDate:function(format,date,settings){if(!date){return""
}var dayNamesShort=(settings?settings.dayNamesShort:null)||this._defaults.dayNamesShort;
var dayNames=(settings?settings.dayNames:null)||this._defaults.dayNames;
var monthNamesShort=(settings?settings.monthNamesShort:null)||this._defaults.monthNamesShort;
var monthNames=(settings?settings.monthNames:null)||this._defaults.monthNames;
var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);
if(matches){iFormat++
}return matches
};
var formatNumber=function(match,value,len){var num=""+value;
if(lookAhead(match)){while(num.length<len){num="0"+num
}}return num
};
var formatName=function(match,value,shortNames,longNames){return(lookAhead(match)?longNames[value]:shortNames[value])
};
var output="";
var literal=false;
if(date){for(var iFormat=0;
iFormat<format.length;
iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false
}else{output+=format.charAt(iFormat)
}}else{switch(format.charAt(iFormat)){case"d":output+=formatNumber("d",date.getDate(),2);
break;
case"D":output+=formatName("D",date.getDay(),dayNamesShort,dayNames);
break;
case"o":output+=formatNumber("o",Math.round((new Date(date.getFullYear(),date.getMonth(),date.getDate()).getTime()-new Date(date.getFullYear(),0,0).getTime())/86400000),3);
break;
case"m":output+=formatNumber("m",date.getMonth()+1,2);
break;
case"M":output+=formatName("M",date.getMonth(),monthNamesShort,monthNames);
break;
case"y":output+=(lookAhead("y")?date.getFullYear():(date.getYear()%100<10?"0":"")+date.getYear()%100);
break;
case"@":output+=date.getTime();
break;
case"!":output+=date.getTime()*10000+this._ticksTo1970;
break;
case"'":if(lookAhead("'")){output+="'"
}else{literal=true
}break;
default:output+=format.charAt(iFormat)
}}}}return output
},_possibleChars:function(format){var chars="";
var literal=false;
var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);
if(matches){iFormat++
}return matches
};
for(var iFormat=0;
iFormat<format.length;
iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false
}else{chars+=format.charAt(iFormat)
}}else{switch(format.charAt(iFormat)){case"d":case"m":case"y":case"@":chars+="0123456789";
break;
case"D":case"M":return null;
case"'":if(lookAhead("'")){chars+="'"
}else{literal=true
}break;
default:chars+=format.charAt(iFormat)
}}}return chars
},_get:function(inst,name){return inst.settings[name]!==undefined?inst.settings[name]:this._defaults[name]
},_setDateFromField:function(inst,noDefault){if(inst.input.val()==inst.lastVal){return 
}var dateFormat=this._get(inst,"dateFormat");
var dates=inst.lastVal=inst.input?inst.input.val():null;
var date,defaultDate;
date=defaultDate=this._getDefaultDate(inst);
var settings=this._getFormatConfig(inst);
try{date=this.parseDate(dateFormat,dates,settings)||defaultDate
}catch(event){this.log(event);
dates=(noDefault?"":dates)
}inst.selectedDay=date.getDate();
inst.drawMonth=inst.selectedMonth=date.getMonth();
inst.drawYear=inst.selectedYear=date.getFullYear();
inst.currentDay=(dates?date.getDate():0);
inst.currentMonth=(dates?date.getMonth():0);
inst.currentYear=(dates?date.getFullYear():0);
this._adjustInstDate(inst)
},_getDefaultDate:function(inst){return this._restrictMinMax(inst,this._determineDate(inst,this._get(inst,"defaultDate"),new Date()))
},_determineDate:function(inst,date,defaultDate){var offsetNumeric=function(offset){var date=new Date();
date.setDate(date.getDate()+offset);
return date
};
var offsetString=function(offset){try{return $.datepicker.parseDate($.datepicker._get(inst,"dateFormat"),offset,$.datepicker._getFormatConfig(inst))
}catch(e){}var date=(offset.toLowerCase().match(/^c/)?$.datepicker._getDate(inst):null)||new Date();
var year=date.getFullYear();
var month=date.getMonth();
var day=date.getDate();
var pattern=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
var matches=pattern.exec(offset);
while(matches){switch(matches[2]||"d"){case"d":case"D":day+=parseInt(matches[1],10);
break;
case"w":case"W":day+=parseInt(matches[1],10)*7;
break;
case"m":case"M":month+=parseInt(matches[1],10);
day=Math.min(day,$.datepicker._getDaysInMonth(year,month));
break;
case"y":case"Y":year+=parseInt(matches[1],10);
day=Math.min(day,$.datepicker._getDaysInMonth(year,month));
break
}matches=pattern.exec(offset)
}return new Date(year,month,day)
};
var newDate=(date==null||date===""?defaultDate:(typeof date=="string"?offsetString(date):(typeof date=="number"?(isNaN(date)?defaultDate:offsetNumeric(date)):new Date(date.getTime()))));
newDate=(newDate&&newDate.toString()=="Invalid Date"?defaultDate:newDate);
if(newDate){newDate.setHours(0);
newDate.setMinutes(0);
newDate.setSeconds(0);
newDate.setMilliseconds(0)
}return this._daylightSavingAdjust(newDate)
},_daylightSavingAdjust:function(date){if(!date){return null
}date.setHours(date.getHours()>12?date.getHours()+2:0);
return date
},_setDate:function(inst,date,noChange){var clear=!date;
var origMonth=inst.selectedMonth;
var origYear=inst.selectedYear;
var newDate=this._restrictMinMax(inst,this._determineDate(inst,date,new Date()));
inst.selectedDay=inst.currentDay=newDate.getDate();
inst.drawMonth=inst.selectedMonth=inst.currentMonth=newDate.getMonth();
inst.drawYear=inst.selectedYear=inst.currentYear=newDate.getFullYear();
if((origMonth!=inst.selectedMonth||origYear!=inst.selectedYear)&&!noChange){this._notifyChange(inst)
}this._adjustInstDate(inst);
if(inst.input){inst.input.val(clear?"":this._formatDate(inst))
}},_getDate:function(inst){var startDate=(!inst.currentYear||(inst.input&&inst.input.val()=="")?null:this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));
return startDate
},_generateHTML:function(inst){var today=new Date();
today=this._daylightSavingAdjust(new Date(today.getFullYear(),today.getMonth(),today.getDate()));
var isRTL=this._get(inst,"isRTL");
var showButtonPanel=this._get(inst,"showButtonPanel");
var hideIfNoPrevNext=this._get(inst,"hideIfNoPrevNext");
var navigationAsDateFormat=this._get(inst,"navigationAsDateFormat");
var numMonths=this._getNumberOfMonths(inst);
var showCurrentAtPos=this._get(inst,"showCurrentAtPos");
var stepMonths=this._get(inst,"stepMonths");
var isMultiMonth=(numMonths[0]!=1||numMonths[1]!=1);
var currentDate=this._daylightSavingAdjust((!inst.currentDay?new Date(9999,9,9):new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));
var minDate=this._getMinMaxDate(inst,"min");
var maxDate=this._getMinMaxDate(inst,"max");
var drawMonth=inst.drawMonth-showCurrentAtPos;
var drawYear=inst.drawYear;
if(drawMonth<0){drawMonth+=12;
drawYear--
}if(maxDate){var maxDraw=this._daylightSavingAdjust(new Date(maxDate.getFullYear(),maxDate.getMonth()-(numMonths[0]*numMonths[1])+1,maxDate.getDate()));
maxDraw=(minDate&&maxDraw<minDate?minDate:maxDraw);
while(this._daylightSavingAdjust(new Date(drawYear,drawMonth,1))>maxDraw){drawMonth--;
if(drawMonth<0){drawMonth=11;
drawYear--
}}}inst.drawMonth=drawMonth;
inst.drawYear=drawYear;
var prevText=this._get(inst,"prevText");
prevText=(!navigationAsDateFormat?prevText:this.formatDate(prevText,this._daylightSavingAdjust(new Date(drawYear,drawMonth-stepMonths,1)),this._getFormatConfig(inst)));
var prev=(this._canAdjustMonth(inst,-1,drawYear,drawMonth)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_'+dpuuid+".datepicker._adjustDate('#"+inst.id+"', -"+stepMonths+", 'M');\" title=\""+prevText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"e":"w")+'">'+prevText+"</span></a>":(hideIfNoPrevNext?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+prevText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"e":"w")+'">'+prevText+"</span></a>"));
var nextText=this._get(inst,"nextText");
nextText=(!navigationAsDateFormat?nextText:this.formatDate(nextText,this._daylightSavingAdjust(new Date(drawYear,drawMonth+stepMonths,1)),this._getFormatConfig(inst)));
var next=(this._canAdjustMonth(inst,+1,drawYear,drawMonth)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_'+dpuuid+".datepicker._adjustDate('#"+inst.id+"', +"+stepMonths+", 'M');\" title=\""+nextText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"w":"e")+'">'+nextText+"</span></a>":(hideIfNoPrevNext?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+nextText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"w":"e")+'">'+nextText+"</span></a>"));
var currentText=this._get(inst,"currentText");
var gotoDate=(this._get(inst,"gotoCurrent")&&inst.currentDay?currentDate:today);
currentText=(!navigationAsDateFormat?currentText:this.formatDate(currentText,gotoDate,this._getFormatConfig(inst)));
var controls=(!inst.inline?'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_'+dpuuid+'.datepicker._hideDatepicker();">'+this._get(inst,"closeText")+"</button>":"");
var buttonPanel=(showButtonPanel)?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(isRTL?controls:"")+(this._isInRange(inst,gotoDate)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_'+dpuuid+".datepicker._gotoToday('#"+inst.id+"');\">"+currentText+"</button>":"")+(isRTL?"":controls)+"</div>":"";
var firstDay=parseInt(this._get(inst,"firstDay"),10);
firstDay=(isNaN(firstDay)?0:firstDay);
var showWeek=this._get(inst,"showWeek");
var dayNames=this._get(inst,"dayNames");
var dayNamesShort=this._get(inst,"dayNamesShort");
var dayNamesMin=this._get(inst,"dayNamesMin");
var monthNames=this._get(inst,"monthNames");
var monthNamesShort=this._get(inst,"monthNamesShort");
var beforeShowDay=this._get(inst,"beforeShowDay");
var showOtherMonths=this._get(inst,"showOtherMonths");
var selectOtherMonths=this._get(inst,"selectOtherMonths");
var calculateWeek=this._get(inst,"calculateWeek")||this.iso8601Week;
var defaultDate=this._getDefaultDate(inst);
var html="";
for(var row=0;
row<numMonths[0];
row++){var group="";
this.maxRows=4;
for(var col=0;
col<numMonths[1];
col++){var selectedDate=this._daylightSavingAdjust(new Date(drawYear,drawMonth,inst.selectedDay));
var cornerClass=" ui-corner-all";
var calender="";
if(isMultiMonth){calender+='<div class="ui-datepicker-group';
if(numMonths[1]>1){switch(col){case 0:calender+=" ui-datepicker-group-first";
cornerClass=" ui-corner-"+(isRTL?"right":"left");
break;
case numMonths[1]-1:calender+=" ui-datepicker-group-last";
cornerClass=" ui-corner-"+(isRTL?"left":"right");
break;
default:calender+=" ui-datepicker-group-middle";
cornerClass="";
break
}}calender+='">'
}calender+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+cornerClass+'">'+(/all|left/.test(cornerClass)&&row==0?(isRTL?next:prev):"")+(/all|right/.test(cornerClass)&&row==0?(isRTL?prev:next):"")+this._generateMonthYearHeader(inst,drawMonth,drawYear,minDate,maxDate,row>0||col>0,monthNames,monthNamesShort)+'</div><table class="ui-datepicker-calendar"><thead><tr>';
var thead=(showWeek?'<th class="ui-datepicker-week-col">'+this._get(inst,"weekHeader")+"</th>":"");
for(var dow=0;
dow<7;
dow++){var day=(dow+firstDay)%7;
thead+="<th"+((dow+firstDay+6)%7>=5?' class="ui-datepicker-week-end"':"")+'><span title="'+dayNames[day]+'">'+dayNamesMin[day]+"</span></th>"
}calender+=thead+"</tr></thead><tbody>";
var daysInMonth=this._getDaysInMonth(drawYear,drawMonth);
if(drawYear==inst.selectedYear&&drawMonth==inst.selectedMonth){inst.selectedDay=Math.min(inst.selectedDay,daysInMonth)
}var leadDays=(this._getFirstDayOfMonth(drawYear,drawMonth)-firstDay+7)%7;
var curRows=Math.ceil((leadDays+daysInMonth)/7);
var numRows=(isMultiMonth?this.maxRows>curRows?this.maxRows:curRows:curRows);
this.maxRows=numRows;
var printDate=this._daylightSavingAdjust(new Date(drawYear,drawMonth,1-leadDays));
for(var dRow=0;
dRow<numRows;
dRow++){calender+="<tr>";
var tbody=(!showWeek?"":'<td class="ui-datepicker-week-col">'+this._get(inst,"calculateWeek")(printDate)+"</td>");
for(var dow=0;
dow<7;
dow++){var daySettings=(beforeShowDay?beforeShowDay.apply((inst.input?inst.input[0]:null),[printDate]):[true,""]);
var otherMonth=(printDate.getMonth()!=drawMonth);
var unselectable=(otherMonth&&!selectOtherMonths)||!daySettings[0]||(minDate&&printDate<minDate)||(maxDate&&printDate>maxDate);
tbody+='<td class="'+((dow+firstDay+6)%7>=5?" ui-datepicker-week-end":"")+(otherMonth?" ui-datepicker-other-month":"")+((printDate.getTime()==selectedDate.getTime()&&drawMonth==inst.selectedMonth&&inst._keyEvent)||(defaultDate.getTime()==printDate.getTime()&&defaultDate.getTime()==selectedDate.getTime())?" "+this._dayOverClass:"")+(unselectable?" "+this._unselectableClass+" ui-state-disabled":"")+(otherMonth&&!showOtherMonths?"":" "+daySettings[1]+(printDate.getTime()==currentDate.getTime()?" "+this._currentClass:"")+(printDate.getTime()==today.getTime()?" ui-datepicker-today":""))+'"'+((!otherMonth||showOtherMonths)&&daySettings[2]?' title="'+daySettings[2]+'"':"")+(unselectable?"":' onclick="DP_jQuery_'+dpuuid+".datepicker._selectDay('#"+inst.id+"',"+printDate.getMonth()+","+printDate.getFullYear()+', this);return false;"')+">"+(otherMonth&&!showOtherMonths?"&#xa0;":(unselectable?'<span class="ui-state-default">'+printDate.getDate()+"</span>":'<a class="ui-state-default'+(printDate.getTime()==today.getTime()?" ui-state-highlight":"")+(printDate.getTime()==currentDate.getTime()?" ui-state-active":"")+(otherMonth?" ui-priority-secondary":"")+'" href="#">'+printDate.getDate()+"</a>"))+"</td>";
printDate.setDate(printDate.getDate()+1);
printDate=this._daylightSavingAdjust(printDate)
}calender+=tbody+"</tr>"
}drawMonth++;
if(drawMonth>11){drawMonth=0;
drawYear++
}calender+="</tbody></table>"+(isMultiMonth?"</div>"+((numMonths[0]>0&&col==numMonths[1]-1)?'<div class="ui-datepicker-row-break"></div>':""):"");
group+=calender
}html+=group
}html+=buttonPanel+($.browser.msie&&parseInt($.browser.version,10)<7&&!inst.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':"");
inst._keyEvent=false;
return html
},_generateMonthYearHeader:function(inst,drawMonth,drawYear,minDate,maxDate,secondary,monthNames,monthNamesShort){var changeMonth=this._get(inst,"changeMonth");
var changeYear=this._get(inst,"changeYear");
var showMonthAfterYear=this._get(inst,"showMonthAfterYear");
var html='<div class="ui-datepicker-title">';
var monthHtml="";
if(secondary||!changeMonth){monthHtml+='<span class="ui-datepicker-month">'+monthNames[drawMonth]+"</span>"
}else{var inMinYear=(minDate&&minDate.getFullYear()==drawYear);
var inMaxYear=(maxDate&&maxDate.getFullYear()==drawYear);
monthHtml+='<select class="ui-datepicker-month" onchange="DP_jQuery_'+dpuuid+".datepicker._selectMonthYear('#"+inst.id+"', this, 'M');\" >";
for(var month=0;
month<12;
month++){if((!inMinYear||month>=minDate.getMonth())&&(!inMaxYear||month<=maxDate.getMonth())){monthHtml+='<option value="'+month+'"'+(month==drawMonth?' selected="selected"':"")+">"+monthNamesShort[month]+"</option>"
}}monthHtml+="</select>"
}if(!showMonthAfterYear){html+=monthHtml+(secondary||!(changeMonth&&changeYear)?"&#xa0;":"")
}if(!inst.yearshtml){inst.yearshtml="";
if(secondary||!changeYear){html+='<span class="ui-datepicker-year">'+drawYear+"</span>"
}else{var years=this._get(inst,"yearRange").split(":");
var thisYear=new Date().getFullYear();
var determineYear=function(value){var year=(value.match(/c[+-].*/)?drawYear+parseInt(value.substring(1),10):(value.match(/[+-].*/)?thisYear+parseInt(value,10):parseInt(value,10)));
return(isNaN(year)?thisYear:year)
};
var year=determineYear(years[0]);
var endYear=Math.max(year,determineYear(years[1]||""));
year=(minDate?Math.max(year,minDate.getFullYear()):year);
endYear=(maxDate?Math.min(endYear,maxDate.getFullYear()):endYear);
inst.yearshtml+='<select class="ui-datepicker-year" onchange="DP_jQuery_'+dpuuid+".datepicker._selectMonthYear('#"+inst.id+"', this, 'Y');\" >";
for(;
year<=endYear;
year++){inst.yearshtml+='<option value="'+year+'"'+(year==drawYear?' selected="selected"':"")+">"+year+"</option>"
}inst.yearshtml+="</select>";
html+=inst.yearshtml;
inst.yearshtml=null
}}html+=this._get(inst,"yearSuffix");
if(showMonthAfterYear){html+=(secondary||!(changeMonth&&changeYear)?"&#xa0;":"")+monthHtml
}html+="</div>";
return html
},_adjustInstDate:function(inst,offset,period){var year=inst.drawYear+(period=="Y"?offset:0);
var month=inst.drawMonth+(period=="M"?offset:0);
var day=Math.min(inst.selectedDay,this._getDaysInMonth(year,month))+(period=="D"?offset:0);
var date=this._restrictMinMax(inst,this._daylightSavingAdjust(new Date(year,month,day)));
inst.selectedDay=date.getDate();
inst.drawMonth=inst.selectedMonth=date.getMonth();
inst.drawYear=inst.selectedYear=date.getFullYear();
if(period=="M"||period=="Y"){this._notifyChange(inst)
}},_restrictMinMax:function(inst,date){var minDate=this._getMinMaxDate(inst,"min");
var maxDate=this._getMinMaxDate(inst,"max");
var newDate=(minDate&&date<minDate?minDate:date);
newDate=(maxDate&&newDate>maxDate?maxDate:newDate);
return newDate
},_notifyChange:function(inst){var onChange=this._get(inst,"onChangeMonthYear");
if(onChange){onChange.apply((inst.input?inst.input[0]:null),[inst.selectedYear,inst.selectedMonth+1,inst])
}},_getNumberOfMonths:function(inst){var numMonths=this._get(inst,"numberOfMonths");
return(numMonths==null?[1,1]:(typeof numMonths=="number"?[1,numMonths]:numMonths))
},_getMinMaxDate:function(inst,minMax){return this._determineDate(inst,this._get(inst,minMax+"Date"),null)
},_getDaysInMonth:function(year,month){return 32-this._daylightSavingAdjust(new Date(year,month,32)).getDate()
},_getFirstDayOfMonth:function(year,month){return new Date(year,month,1).getDay()
},_canAdjustMonth:function(inst,offset,curYear,curMonth){var numMonths=this._getNumberOfMonths(inst);
var date=this._daylightSavingAdjust(new Date(curYear,curMonth+(offset<0?offset:numMonths[0]*numMonths[1]),1));
if(offset<0){date.setDate(this._getDaysInMonth(date.getFullYear(),date.getMonth()))
}return this._isInRange(inst,date)
},_isInRange:function(inst,date){var minDate=this._getMinMaxDate(inst,"min");
var maxDate=this._getMinMaxDate(inst,"max");
return((!minDate||date.getTime()>=minDate.getTime())&&(!maxDate||date.getTime()<=maxDate.getTime()))
},_getFormatConfig:function(inst){var shortYearCutoff=this._get(inst,"shortYearCutoff");
shortYearCutoff=(typeof shortYearCutoff!="string"?shortYearCutoff:new Date().getFullYear()%100+parseInt(shortYearCutoff,10));
return{shortYearCutoff:shortYearCutoff,dayNamesShort:this._get(inst,"dayNamesShort"),dayNames:this._get(inst,"dayNames"),monthNamesShort:this._get(inst,"monthNamesShort"),monthNames:this._get(inst,"monthNames")}
},_formatDate:function(inst,day,month,year){if(!day){inst.currentDay=inst.selectedDay;
inst.currentMonth=inst.selectedMonth;
inst.currentYear=inst.selectedYear
}var date=(day?(typeof day=="object"?day:this._daylightSavingAdjust(new Date(year,month,day))):this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));
return this.formatDate(this._get(inst,"dateFormat"),date,this._getFormatConfig(inst))
}});
function bindHover(dpDiv){var selector="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
return dpDiv.bind("mouseout",function(event){var elem=$(event.target).closest(selector);
if(!elem.length){return 
}elem.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")
}).bind("mouseover",function(event){var elem=$(event.target).closest(selector);
if($.datepicker._isDisabledDatepicker(instActive.inline?dpDiv.parent()[0]:instActive.input[0])||!elem.length){return 
}elem.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
elem.addClass("ui-state-hover");
if(elem.hasClass("ui-datepicker-prev")){elem.addClass("ui-datepicker-prev-hover")
}if(elem.hasClass("ui-datepicker-next")){elem.addClass("ui-datepicker-next-hover")
}})
}function extendRemove(target,props){$.extend(target,props);
for(var name in props){if(props[name]==null||props[name]==undefined){target[name]=props[name]
}}return target
}function isArray(a){return(a&&(($.browser.safari&&typeof a=="object"&&a.length)||(a.constructor&&a.constructor.toString().match(/\Array\(\)/))))
}$.fn.datepicker=function(options){if(!this.length){return this
}if(!$.datepicker.initialized){$(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv);
$.datepicker.initialized=true
}var otherArgs=Array.prototype.slice.call(arguments,1);
if(typeof options=="string"&&(options=="isDisabled"||options=="getDate"||options=="widget")){return $.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this[0]].concat(otherArgs))
}if(options=="option"&&arguments.length==2&&typeof arguments[1]=="string"){return $.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this[0]].concat(otherArgs))
}return this.each(function(){typeof options=="string"?$.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this].concat(otherArgs)):$.datepicker._attachDatepicker(this,options)
})
};
$.datepicker=new Datepicker();
$.datepicker.initialized=false;
$.datepicker.uuid=new Date().getTime();
$.datepicker.version="1.8.16";
window["DP_jQuery_"+dpuuid]=$
})(jQuery);
(function(E,F){var C="ui-dialog ui-widget ui-widget-content ui-corner-all ",B={buttons:true,height:true,maxHeight:true,maxWidth:true,minHeight:true,minWidth:true,width:true},D={maxHeight:true,maxWidth:true,minHeight:true,minWidth:true},A=E.attrFn||{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true,click:true};
E.widget("ui.dialog",{options:{autoOpen:true,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:{my:"center",at:"center",collision:"fit",using:function(H){var G=E(this).css(H).offset().top;
if(G<0){E(this).css("top",H.top-G)
}}},resizable:true,show:null,stack:true,title:"",width:300,zIndex:1000},_create:function(){this.originalTitle=this.element.attr("title");
if(typeof this.originalTitle!=="string"){this.originalTitle=""
}this.options.title=this.options.title||this.originalTitle;
var O=this,P=O.options,M=P.title||"&#160;",H=E.ui.dialog.getTitleId(O.element),N=(O.uiDialog=E("<div></div>")).appendTo(document.body).hide().addClass(C+P.dialogClass).css({zIndex:P.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(Q){if(P.closeOnEscape&&!Q.isDefaultPrevented()&&Q.keyCode&&Q.keyCode===E.ui.keyCode.ESCAPE){O.close(Q);
Q.preventDefault()
}}).attr({role:"dialog","aria-labelledby":H}).mousedown(function(Q){O.moveToTop(false,Q)
}),J=O.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(N),I=(O.uiDialogTitlebar=E("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(N),L=E('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){L.addClass("ui-state-hover")
},function(){L.removeClass("ui-state-hover")
}).focus(function(){L.addClass("ui-state-focus")
}).blur(function(){L.removeClass("ui-state-focus")
}).click(function(Q){O.close(Q);
return false
}).appendTo(I),K=(O.uiDialogTitlebarCloseText=E("<span></span>")).addClass("ui-icon ui-icon-closethick").text(P.closeText).appendTo(L),G=E("<span></span>").addClass("ui-dialog-title").attr("id",H).html(M).prependTo(I);
if(E.isFunction(P.beforeclose)&&!E.isFunction(P.beforeClose)){P.beforeClose=P.beforeclose
}I.find("*").add(I).disableSelection();
if(P.draggable&&E.fn.draggable){O._makeDraggable()
}if(P.resizable&&E.fn.resizable){O._makeResizable()
}O._createButtons(P.buttons);
O._isOpen=false;
if(E.fn.bgiframe){N.bgiframe()
}},_init:function(){if(this.options.autoOpen){this.open()
}},destroy:function(){var G=this;
if(G.overlay){G.overlay.destroy()
}G.uiDialog.hide();
G.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
G.uiDialog.remove();
if(G.originalTitle){G.element.attr("title",G.originalTitle)
}return G
},widget:function(){return this.uiDialog
},close:function(J){var G=this,I,H;
if(false===G._trigger("beforeClose",J)){return 
}if(G.overlay){G.overlay.destroy()
}G.uiDialog.unbind("keypress.ui-dialog");
G._isOpen=false;
if(G.options.hide){G.uiDialog.hide(G.options.hide,function(){G._trigger("close",J)
})
}else{G.uiDialog.hide();
G._trigger("close",J)
}E.ui.dialog.overlay.resize();
if(G.options.modal){I=0;
E(".ui-dialog").each(function(){if(this!==G.uiDialog[0]){H=E(this).css("z-index");
if(!isNaN(H)){I=Math.max(I,H)
}}});
E.ui.dialog.maxZ=I
}return G
},isOpen:function(){return this._isOpen
},moveToTop:function(K,J){var G=this,I=G.options,H;
if((I.modal&&!K)||(!I.stack&&!I.modal)){return G._trigger("focus",J)
}if(I.zIndex>E.ui.dialog.maxZ){E.ui.dialog.maxZ=I.zIndex
}if(G.overlay){E.ui.dialog.maxZ+=1;
G.overlay.$el.css("z-index",E.ui.dialog.overlay.maxZ=E.ui.dialog.maxZ)
}H={scrollTop:G.element.scrollTop(),scrollLeft:G.element.scrollLeft()};
E.ui.dialog.maxZ+=1;
G.uiDialog.css("z-index",E.ui.dialog.maxZ);
G.element.attr(H);
G._trigger("focus",J);
return G
},open:function(){if(this._isOpen){return 
}var H=this,I=H.options,G=H.uiDialog;
H.overlay=I.modal?new E.ui.dialog.overlay(H):null;
H._size();
H._position(I.position);
G.show(I.show);
H.moveToTop(true);
if(I.modal){G.bind("keypress.ui-dialog",function(L){if(L.keyCode!==E.ui.keyCode.TAB){return 
}var K=E(":tabbable",this),M=K.filter(":first"),J=K.filter(":last");
if(L.target===J[0]&&!L.shiftKey){M.focus(1);
return false
}else{if(L.target===M[0]&&L.shiftKey){J.focus(1);
return false
}}})
}E(H.element.find(":tabbable").get().concat(G.find(".ui-dialog-buttonpane :tabbable").get().concat(G.get()))).eq(0).focus();
H._isOpen=true;
H._trigger("open");
return H
},_createButtons:function(J){var I=this,G=false,H=E("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),K=E("<div></div>").addClass("ui-dialog-buttonset").appendTo(H);
I.uiDialog.find(".ui-dialog-buttonpane").remove();
if(typeof J==="object"&&J!==null){E.each(J,function(){return !(G=true)
})
}if(G){E.each(J,function(L,N){N=E.isFunction(N)?{click:N,text:L}:N;
var M=E('<button type="button"></button>').click(function(){N.click.apply(I.element[0],arguments)
}).appendTo(K);
E.each(N,function(O,P){if(O==="click"){return 
}if(O in A){M[O](P)
}else{M.attr(O,P)
}});
if(E.fn.button){M.button()
}});
H.appendTo(I.uiDialog)
}},_makeDraggable:function(){var G=this,J=G.options,K=E(document),I;
function H(L){return{position:L.position,offset:L.offset}
}G.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(L,M){I=J.height==="auto"?"auto":E(this).height();
E(this).height(E(this).height()).addClass("ui-dialog-dragging");
G._trigger("dragStart",L,H(M))
},drag:function(L,M){G._trigger("drag",L,H(M))
},stop:function(L,M){J.position=[M.position.left-K.scrollLeft(),M.position.top-K.scrollTop()];
E(this).removeClass("ui-dialog-dragging").height(I);
G._trigger("dragStop",L,H(M));
E.ui.dialog.overlay.resize()
}})
},_makeResizable:function(L){L=(L===F?this.options.resizable:L);
var H=this,K=H.options,G=H.uiDialog.css("position"),J=(typeof L==="string"?L:"n,e,s,w,se,sw,ne,nw");
function I(M){return{originalPosition:M.originalPosition,originalSize:M.originalSize,position:M.position,size:M.size}
}H.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:H.element,maxWidth:K.maxWidth,maxHeight:K.maxHeight,minWidth:K.minWidth,minHeight:H._minHeight(),handles:J,start:function(M,N){E(this).addClass("ui-dialog-resizing");
H._trigger("resizeStart",M,I(N))
},resize:function(M,N){H._trigger("resize",M,I(N))
},stop:function(M,N){E(this).removeClass("ui-dialog-resizing");
K.height=E(this).height();
K.width=E(this).width();
H._trigger("resizeStop",M,I(N));
E.ui.dialog.overlay.resize()
}}).css("position",G).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
},_minHeight:function(){var G=this.options;
if(G.height==="auto"){return G.minHeight
}else{return Math.min(G.minHeight,G.height)
}},_position:function(H){var I=[],J=[0,0],G;
if(H){if(typeof H==="string"||(typeof H==="object"&&"0" in H)){I=H.split?H.split(" "):[H[0],H[1]];
if(I.length===1){I[1]=I[0]
}E.each(["left","top"],function(L,K){if(+I[L]===I[L]){J[L]=I[L];
I[L]=K
}});
H={my:I.join(" "),at:I.join(" "),offset:J.join(" ")}
}H=E.extend({},E.ui.dialog.prototype.options.position,H)
}else{H=E.ui.dialog.prototype.options.position
}G=this.uiDialog.is(":visible");
if(!G){this.uiDialog.show()
}this.uiDialog.css({top:0,left:0}).position(E.extend({of:window},H));
if(!G){this.uiDialog.hide()
}},_setOptions:function(J){var H=this,G={},I=false;
E.each(J,function(K,L){H._setOption(K,L);
if(K in B){I=true
}if(K in D){G[K]=L
}});
if(I){this._size()
}if(this.uiDialog.is(":data(resizable)")){this.uiDialog.resizable("option",G)
}},_setOption:function(J,K){var H=this,G=H.uiDialog;
switch(J){case"beforeclose":J="beforeClose";
break;
case"buttons":H._createButtons(K);
break;
case"closeText":H.uiDialogTitlebarCloseText.text(""+K);
break;
case"dialogClass":G.removeClass(H.options.dialogClass).addClass(C+K);
break;
case"disabled":if(K){G.addClass("ui-dialog-disabled")
}else{G.removeClass("ui-dialog-disabled")
}break;
case"draggable":var I=G.is(":data(draggable)");
if(I&&!K){G.draggable("destroy")
}if(!I&&K){H._makeDraggable()
}break;
case"position":H._position(K);
break;
case"resizable":var L=G.is(":data(resizable)");
if(L&&!K){G.resizable("destroy")
}if(L&&typeof K==="string"){G.resizable("option","handles",K)
}if(!L&&K!==false){H._makeResizable(K)
}break;
case"title":E(".ui-dialog-title",H.uiDialogTitlebar).html(""+(K||"&#160;"));
break
}E.Widget.prototype._setOption.apply(H,arguments)
},_size:function(){var K=this.options,H,J,G=this.uiDialog.is(":visible");
this.element.show().css({width:"auto",minHeight:0,height:0});
if(K.minWidth>K.width){K.width=K.minWidth
}H=this.uiDialog.css({height:"auto",width:K.width}).height();
J=Math.max(0,K.minHeight-H);
if(K.height==="auto"){if(E.support.minHeight){this.element.css({minHeight:J,height:"auto"})
}else{this.uiDialog.show();
var I=this.element.css("height","auto").height();
if(!G){this.uiDialog.hide()
}this.element.height(Math.max(I,J))
}}else{this.element.height(Math.max(K.height-H,0))
}if(this.uiDialog.is(":data(resizable)")){this.uiDialog.resizable("option","minHeight",this._minHeight())
}}});
E.extend(E.ui.dialog,{version:"1.8.16",uuid:0,maxZ:0,getTitleId:function(G){var H=G.attr("id");
if(!H){this.uuid+=1;
H=this.uuid
}return"ui-dialog-title-"+H
},overlay:function(G){this.$el=E.ui.dialog.overlay.create(G)
}});
E.extend(E.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:E.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(G){return G+".dialog-overlay"
}).join(" "),create:function(H){if(this.instances.length===0){setTimeout(function(){if(E.ui.dialog.overlay.instances.length){E(document).bind(E.ui.dialog.overlay.events,function(I){if(E(I.target).zIndex()<E.ui.dialog.overlay.maxZ){return false
}})
}},1);
E(document).bind("keydown.dialog-overlay",function(I){if(H.options.closeOnEscape&&!I.isDefaultPrevented()&&I.keyCode&&I.keyCode===E.ui.keyCode.ESCAPE){H.close(I);
I.preventDefault()
}});
E(window).bind("resize.dialog-overlay",E.ui.dialog.overlay.resize)
}var G=(this.oldInstances.pop()||E("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),height:this.height()});
if(E.fn.bgiframe){G.bgiframe()
}this.instances.push(G);
return G
},destroy:function(G){var H=E.inArray(G,this.instances);
if(H!=-1){this.oldInstances.push(this.instances.splice(H,1)[0])
}if(this.instances.length===0){E([document,window]).unbind(".dialog-overlay")
}G.remove();
var I=0;
E.each(this.instances,function(){I=Math.max(I,this.css("z-index"))
});
this.maxZ=I
},height:function(){var H,G;
if(E.browser.msie&&E.browser.version<7){H=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
G=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);
if(H<G){return E(window).height()+"px"
}else{return H+"px"
}}else{return E(document).height()+"px"
}},width:function(){var G,H;
if(E.browser.msie){G=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);
H=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);
if(G<H){return E(window).width()+"px"
}else{return G+"px"
}}else{return E(document).width()+"px"
}},resize:function(){var G=E([]);
E.each(E.ui.dialog.overlay.instances,function(){G=G.add(this)
});
G.css({width:0,height:0}).css({width:E.ui.dialog.overlay.width(),height:E.ui.dialog.overlay.height()})
}});
E.extend(E.ui.dialog.overlay.prototype,{destroy:function(){E.ui.dialog.overlay.destroy(this.$el)
}})
}(jQuery));
(function(F,G){F.ui=F.ui||{};
var D=/left|center|right/,E=/top|center|bottom/,A="center",B=F.fn.position,C=F.fn.offset;
F.fn.position=function(I){if(!I||!I.of){return B.apply(this,arguments)
}I=F.extend({},I);
var M=F(I.of),L=M[0],O=(I.collision||"flip").split(" "),N=I.offset?I.offset.split(" "):[0,0],K,H,J;
if(L.nodeType===9){K=M.width();
H=M.height();
J={top:0,left:0}
}else{if(L.setTimeout){K=M.width();
H=M.height();
J={top:M.scrollTop(),left:M.scrollLeft()}
}else{if(L.preventDefault){I.at="left top";
K=H=0;
J={top:I.of.pageY,left:I.of.pageX}
}else{K=M.outerWidth();
H=M.outerHeight();
J=M.offset()
}}}F.each(["my","at"],function(){var P=(I[this]||"").split(" ");
if(P.length===1){P=D.test(P[0])?P.concat([A]):E.test(P[0])?[A].concat(P):[A,A]
}P[0]=D.test(P[0])?P[0]:A;
P[1]=E.test(P[1])?P[1]:A;
I[this]=P
});
if(O.length===1){O[1]=O[0]
}N[0]=parseInt(N[0],10)||0;
if(N.length===1){N[1]=N[0]
}N[1]=parseInt(N[1],10)||0;
if(I.at[0]==="right"){J.left+=K
}else{if(I.at[0]===A){J.left+=K/2
}}if(I.at[1]==="bottom"){J.top+=H
}else{if(I.at[1]===A){J.top+=H/2
}}J.left+=N[0];
J.top+=N[1];
return this.each(function(){var S=F(this),U=S.outerWidth(),R=S.outerHeight(),T=parseInt(F.curCSS(this,"marginLeft",true))||0,Q=parseInt(F.curCSS(this,"marginTop",true))||0,W=U+T+(parseInt(F.curCSS(this,"marginRight",true))||0),X=R+Q+(parseInt(F.curCSS(this,"marginBottom",true))||0),V=F.extend({},J),P;
if(I.my[0]==="right"){V.left-=U
}else{if(I.my[0]===A){V.left-=U/2
}}if(I.my[1]==="bottom"){V.top-=R
}else{if(I.my[1]===A){V.top-=R/2
}}V.left=Math.round(V.left);
V.top=Math.round(V.top);
P={left:V.left-T,top:V.top-Q};
F.each(["left","top"],function(Z,Y){if(F.ui.position[O[Z]]){F.ui.position[O[Z]][Y](V,{targetWidth:K,targetHeight:H,elemWidth:U,elemHeight:R,collisionPosition:P,collisionWidth:W,collisionHeight:X,offset:N,my:I.my,at:I.at})
}});
if(F.fn.bgiframe){S.bgiframe()
}S.offset(F.extend(V,{using:I.using}))
})
};
F.ui.position={fit:{left:function(H,I){var K=F(window),J=I.collisionPosition.left+I.collisionWidth-K.width()-K.scrollLeft();
H.left=J>0?H.left-J:Math.max(H.left-I.collisionPosition.left,H.left)
},top:function(H,I){var K=F(window),J=I.collisionPosition.top+I.collisionHeight-K.height()-K.scrollTop();
H.top=J>0?H.top-J:Math.max(H.top-I.collisionPosition.top,H.top)
}},flip:{left:function(I,K){if(K.at[0]===A){return 
}var M=F(window),L=K.collisionPosition.left+K.collisionWidth-M.width()-M.scrollLeft(),H=K.my[0]==="left"?-K.elemWidth:K.my[0]==="right"?K.elemWidth:0,J=K.at[0]==="left"?K.targetWidth:-K.targetWidth,N=-2*K.offset[0];
I.left+=K.collisionPosition.left<0?H+J+N:L>0?H+J+N:0
},top:function(I,K){if(K.at[1]===A){return 
}var M=F(window),L=K.collisionPosition.top+K.collisionHeight-M.height()-M.scrollTop(),H=K.my[1]==="top"?-K.elemHeight:K.my[1]==="bottom"?K.elemHeight:0,J=K.at[1]==="top"?K.targetHeight:-K.targetHeight,N=-2*K.offset[1];
I.top+=K.collisionPosition.top<0?H+J+N:L>0?H+J+N:0
}}};
if(!F.offset.setOffset){F.offset.setOffset=function(L,I){if(/static/.test(F.curCSS(L,"position"))){L.style.position="relative"
}var K=F(L),N=K.offset(),H=parseInt(F.curCSS(L,"top",true),10)||0,M=parseInt(F.curCSS(L,"left",true),10)||0,J={top:(I.top-N.top)+H,left:(I.left-N.left)+M};
if("using" in I){I.using.call(L,J)
}else{K.css(J)
}};
F.fn.offset=function(H){var I=this[0];
if(!I||!I.ownerDocument){return null
}if(H){return this.each(function(){F.offset.setOffset(this,H)
})
}return C.call(this)
}
}}(jQuery));
(function(A,B){A.widget("ui.progressbar",{options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()});
this.valueDiv=A("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
this.oldValue=this._value();
this._refreshValue()
},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
this.valueDiv.remove();
A.Widget.prototype.destroy.apply(this,arguments)
},value:function(C){if(C===B){return this._value()
}this._setOption("value",C);
return this
},_setOption:function(C,D){if(C==="value"){this.options.value=D;
this._refreshValue();
if(this._value()===this.options.max){this._trigger("complete")
}}A.Widget.prototype._setOption.apply(this,arguments)
},_value:function(){var C=this.options.value;
if(typeof C!=="number"){C=0
}return Math.min(this.options.max,Math.max(this.min,C))
},_percentage:function(){return 100*this._value()/this.options.max
},_refreshValue:function(){var D=this.value();
var C=this._percentage();
if(this.oldValue!==D){this.oldValue=D;
this._trigger("change")
}this.valueDiv.toggle(D>this.min).toggleClass("ui-corner-right",D===this.options.max).width(C.toFixed(0)+"%");
this.element.attr("aria-valuenow",D)
}});
A.extend(A.ui.progressbar,{version:"1.8.16"})
})(jQuery);
(function(B,C){var A=5;
B.widget("ui.slider",B.ui.mouse,{widgetEventPrefix:"slide",options:{animate:false,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null},_create:function(){var E=this,J=this.options,I=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),H="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",D=(J.values&&J.values.length)||1,G=[];
this._keySliding=false;
this._mouseSliding=false;
this._animateOff=true;
this._handleIndex=null;
this._detectOrientation();
this._mouseInit();
this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all"+(J.disabled?" ui-slider-disabled ui-disabled":""));
this.range=B([]);
if(J.range){if(J.range===true){if(!J.values){J.values=[this._valueMin(),this._valueMin()]
}if(J.values.length&&J.values.length!==2){J.values=[J.values[0],J.values[0]]
}}this.range=B("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+((J.range==="min"||J.range==="max")?" ui-slider-range-"+J.range:""))
}for(var F=I.length;
F<D;
F+=1){G.push(H)
}this.handles=I.add(B(G.join("")).appendTo(E.element));
this.handle=this.handles.eq(0);
this.handles.add(this.range).filter("a").click(function(K){K.preventDefault()
}).hover(function(){if(!J.disabled){B(this).addClass("ui-state-hover")
}},function(){B(this).removeClass("ui-state-hover")
}).focus(function(){if(!J.disabled){B(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
B(this).addClass("ui-state-focus")
}else{B(this).blur()
}}).blur(function(){B(this).removeClass("ui-state-focus")
});
this.handles.each(function(K){B(this).data("index.ui-slider-handle",K)
});
this.handles.keydown(function(P){var M=true,L=B(this).data("index.ui-slider-handle"),Q,N,K,O;
if(E.options.disabled){return 
}switch(P.keyCode){case B.ui.keyCode.HOME:case B.ui.keyCode.END:case B.ui.keyCode.PAGE_UP:case B.ui.keyCode.PAGE_DOWN:case B.ui.keyCode.UP:case B.ui.keyCode.RIGHT:case B.ui.keyCode.DOWN:case B.ui.keyCode.LEFT:M=false;
if(!E._keySliding){E._keySliding=true;
B(this).addClass("ui-state-active");
Q=E._start(P,L);
if(Q===false){return 
}}break
}O=E.options.step;
if(E.options.values&&E.options.values.length){N=K=E.values(L)
}else{N=K=E.value()
}switch(P.keyCode){case B.ui.keyCode.HOME:K=E._valueMin();
break;
case B.ui.keyCode.END:K=E._valueMax();
break;
case B.ui.keyCode.PAGE_UP:K=E._trimAlignValue(N+((E._valueMax()-E._valueMin())/A));
break;
case B.ui.keyCode.PAGE_DOWN:K=E._trimAlignValue(N-((E._valueMax()-E._valueMin())/A));
break;
case B.ui.keyCode.UP:case B.ui.keyCode.RIGHT:if(N===E._valueMax()){return 
}K=E._trimAlignValue(N+O);
break;
case B.ui.keyCode.DOWN:case B.ui.keyCode.LEFT:if(N===E._valueMin()){return 
}K=E._trimAlignValue(N-O);
break
}E._slide(P,L,K);
return M
}).keyup(function(L){var K=B(this).data("index.ui-slider-handle");
if(E._keySliding){E._keySliding=false;
E._stop(L,K);
E._change(L,K);
B(this).removeClass("ui-state-active")
}});
this._refreshValue();
this._animateOff=false
},destroy:function(){this.handles.remove();
this.range.remove();
this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
this._mouseDestroy();
return this
},_mouseCapture:function(F){var G=this.options,J,L,E,H,N,K,M,I,D;
if(G.disabled){return false
}this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};
this.elementOffset=this.element.offset();
J={x:F.pageX,y:F.pageY};
L=this._normValueFromMouse(J);
E=this._valueMax()-this._valueMin()+1;
N=this;
this.handles.each(function(O){var P=Math.abs(L-N.values(O));
if(E>P){E=P;
H=B(this);
K=O
}});
if(G.range===true&&this.values(1)===G.min){K+=1;
H=B(this.handles[K])
}M=this._start(F,K);
if(M===false){return false
}this._mouseSliding=true;
N._handleIndex=K;
H.addClass("ui-state-active").focus();
I=H.offset();
D=!B(F.target).parents().andSelf().is(".ui-slider-handle");
this._clickOffset=D?{left:0,top:0}:{left:F.pageX-I.left-(H.width()/2),top:F.pageY-I.top-(H.height()/2)-(parseInt(H.css("borderTopWidth"),10)||0)-(parseInt(H.css("borderBottomWidth"),10)||0)+(parseInt(H.css("marginTop"),10)||0)};
if(!this.handles.hasClass("ui-state-hover")){this._slide(F,K,L)
}this._animateOff=true;
return true
},_mouseStart:function(D){return true
},_mouseDrag:function(F){var D={x:F.pageX,y:F.pageY},E=this._normValueFromMouse(D);
this._slide(F,this._handleIndex,E);
return false
},_mouseStop:function(D){this.handles.removeClass("ui-state-active");
this._mouseSliding=false;
this._stop(D,this._handleIndex);
this._change(D,this._handleIndex);
this._handleIndex=null;
this._clickOffset=null;
this._animateOff=false;
return false
},_detectOrientation:function(){this.orientation=(this.options.orientation==="vertical")?"vertical":"horizontal"
},_normValueFromMouse:function(E){var D,H,G,F,I;
if(this.orientation==="horizontal"){D=this.elementSize.width;
H=E.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)
}else{D=this.elementSize.height;
H=E.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)
}G=(H/D);
if(G>1){G=1
}if(G<0){G=0
}if(this.orientation==="vertical"){G=1-G
}F=this._valueMax()-this._valueMin();
I=this._valueMin()+G*F;
return this._trimAlignValue(I)
},_start:function(F,E){var D={handle:this.handles[E],value:this.value()};
if(this.options.values&&this.options.values.length){D.value=this.values(E);
D.values=this.values()
}return this._trigger("start",F,D)
},_slide:function(H,G,F){var D,E,I;
if(this.options.values&&this.options.values.length){D=this.values(G?0:1);
if((this.options.values.length===2&&this.options.range===true)&&((G===0&&F>D)||(G===1&&F<D))){F=D
}if(F!==this.values(G)){E=this.values();
E[G]=F;
I=this._trigger("slide",H,{handle:this.handles[G],value:F,values:E});
D=this.values(G?0:1);
if(I!==false){this.values(G,F,true)
}}}else{if(F!==this.value()){I=this._trigger("slide",H,{handle:this.handles[G],value:F});
if(I!==false){this.value(F)
}}}},_stop:function(F,E){var D={handle:this.handles[E],value:this.value()};
if(this.options.values&&this.options.values.length){D.value=this.values(E);
D.values=this.values()
}this._trigger("stop",F,D)
},_change:function(F,E){if(!this._keySliding&&!this._mouseSliding){var D={handle:this.handles[E],value:this.value()};
if(this.options.values&&this.options.values.length){D.value=this.values(E);
D.values=this.values()
}this._trigger("change",F,D)
}},value:function(D){if(arguments.length){this.options.value=this._trimAlignValue(D);
this._refreshValue();
this._change(null,0);
return 
}return this._value()
},values:function(E,H){var G,D,F;
if(arguments.length>1){this.options.values[E]=this._trimAlignValue(H);
this._refreshValue();
this._change(null,E);
return 
}if(arguments.length){if(B.isArray(arguments[0])){G=this.options.values;
D=arguments[0];
for(F=0;
F<G.length;
F+=1){G[F]=this._trimAlignValue(D[F]);
this._change(null,F)
}this._refreshValue()
}else{if(this.options.values&&this.options.values.length){return this._values(E)
}else{return this.value()
}}}else{return this._values()
}},_setOption:function(E,F){var D,G=0;
if(B.isArray(this.options.values)){G=this.options.values.length
}B.Widget.prototype._setOption.apply(this,arguments);
switch(E){case"disabled":if(F){this.handles.filter(".ui-state-focus").blur();
this.handles.removeClass("ui-state-hover");
this.handles.propAttr("disabled",true);
this.element.addClass("ui-disabled")
}else{this.handles.propAttr("disabled",false);
this.element.removeClass("ui-disabled")
}break;
case"orientation":this._detectOrientation();
this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);
this._refreshValue();
break;
case"value":this._animateOff=true;
this._refreshValue();
this._change(null,0);
this._animateOff=false;
break;
case"values":this._animateOff=true;
this._refreshValue();
for(D=0;
D<G;
D+=1){this._change(null,D)
}this._animateOff=false;
break
}},_value:function(){var D=this.options.value;
D=this._trimAlignValue(D);
return D
},_values:function(D){var G,F,E;
if(arguments.length){G=this.options.values[D];
G=this._trimAlignValue(G);
return G
}else{F=this.options.values.slice();
for(E=0;
E<F.length;
E+=1){F[E]=this._trimAlignValue(F[E])
}return F
}},_trimAlignValue:function(G){if(G<=this._valueMin()){return this._valueMin()
}if(G>=this._valueMax()){return this._valueMax()
}var D=(this.options.step>0)?this.options.step:1,F=(G-this._valueMin())%D,E=G-F;
if(Math.abs(F)*2>=D){E+=(F>0)?D:(-D)
}return parseFloat(E.toFixed(5))
},_valueMin:function(){return this.options.min
},_valueMax:function(){return this.options.max
},_refreshValue:function(){var G=this.options.range,F=this.options,M=this,E=(!this._animateOff)?F.animate:false,H,D={},I,K,J,L;
if(this.options.values&&this.options.values.length){this.handles.each(function(O,N){H=(M.values(O)-M._valueMin())/(M._valueMax()-M._valueMin())*100;
D[M.orientation==="horizontal"?"left":"bottom"]=H+"%";
B(this).stop(1,1)[E?"animate":"css"](D,F.animate);
if(M.options.range===true){if(M.orientation==="horizontal"){if(O===0){M.range.stop(1,1)[E?"animate":"css"]({left:H+"%"},F.animate)
}if(O===1){M.range[E?"animate":"css"]({width:(H-I)+"%"},{queue:false,duration:F.animate})
}}else{if(O===0){M.range.stop(1,1)[E?"animate":"css"]({bottom:(H)+"%"},F.animate)
}if(O===1){M.range[E?"animate":"css"]({height:(H-I)+"%"},{queue:false,duration:F.animate})
}}}I=H
})
}else{K=this.value();
J=this._valueMin();
L=this._valueMax();
H=(L!==J)?(K-J)/(L-J)*100:0;
D[M.orientation==="horizontal"?"left":"bottom"]=H+"%";
this.handle.stop(1,1)[E?"animate":"css"](D,F.animate);
if(G==="min"&&this.orientation==="horizontal"){this.range.stop(1,1)[E?"animate":"css"]({width:H+"%"},F.animate)
}if(G==="max"&&this.orientation==="horizontal"){this.range[E?"animate":"css"]({width:(100-H)+"%"},{queue:false,duration:F.animate})
}if(G==="min"&&this.orientation==="vertical"){this.range.stop(1,1)[E?"animate":"css"]({height:H+"%"},F.animate)
}if(G==="max"&&this.orientation==="vertical"){this.range[E?"animate":"css"]({height:(100-H)+"%"},{queue:false,duration:F.animate})
}}}});
B.extend(B.ui.slider,{version:"1.8.16"})
}(jQuery));
(function(D,F){var C=0,B=0;
function E(){return ++C
}function A(){return ++B
}D.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:false,cookie:null,collapsible:false,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function(){this._tabify(true)
},_setOption:function(G,H){if(G=="selected"){if(this.options.collapsible&&H==this.options.selected){return 
}this.select(H)
}else{this.options[G]=H;
this._tabify()
}},_tabId:function(G){return G.title&&G.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF-]/g,"")||this.options.idPrefix+E()
},_sanitizeSelector:function(G){return G.replace(/:/g,"\\:")
},_cookie:function(){var G=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+A());
return D.cookie.apply(null,[G].concat(D.makeArray(arguments)))
},_ui:function(H,G){return{tab:H,panel:G,index:this.anchors.index(H)}
},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var G=D(this);
G.html(G.data("label.tabs")).removeData("label.tabs")
})
},_tabify:function(R){var S=this,I=this.options,H=/^#.+/;
this.list=this.element.find("ol,ul").eq(0);
this.lis=D(" > li:has(a[href])",this.list);
this.anchors=this.lis.map(function(){return D("a",this)[0]
});
this.panels=D([]);
this.anchors.each(function(V,T){var U=D(T).attr("href");
var W=U.split("#")[0],X;
if(W&&(W===location.toString().split("#")[0]||(X=D("base")[0])&&W===X.href)){U=T.hash;
T.href=U
}if(H.test(U)){S.panels=S.panels.add(S.element.find(S._sanitizeSelector(U)))
}else{if(U&&U!=="#"){D.data(T,"href.tabs",U);
D.data(T,"load.tabs",U.replace(/#.*$/,""));
var Z=S._tabId(T);
T.href="#"+Z;
var Y=S.element.find("#"+Z);
if(!Y.length){Y=D(I.panelTemplate).attr("id",Z).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(S.panels[V-1]||S.list);
Y.data("destroy.tabs",true)
}S.panels=S.panels.add(Y)
}else{I.disabled.push(V)
}}});
if(R){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
this.lis.addClass("ui-state-default ui-corner-top");
this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
if(I.selected===F){if(location.hash){this.anchors.each(function(U,T){if(T.hash==location.hash){I.selected=U;
return false
}})
}if(typeof I.selected!=="number"&&I.cookie){I.selected=parseInt(S._cookie(),10)
}if(typeof I.selected!=="number"&&this.lis.filter(".ui-tabs-selected").length){I.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))
}I.selected=I.selected||(this.lis.length?0:-1)
}else{if(I.selected===null){I.selected=-1
}}I.selected=((I.selected>=0&&this.anchors[I.selected])||I.selected<0)?I.selected:0;
I.disabled=D.unique(I.disabled.concat(D.map(this.lis.filter(".ui-state-disabled"),function(U,T){return S.lis.index(U)
}))).sort();
if(D.inArray(I.selected,I.disabled)!=-1){I.disabled.splice(D.inArray(I.selected,I.disabled),1)
}this.panels.addClass("ui-tabs-hide");
this.lis.removeClass("ui-tabs-selected ui-state-active");
if(I.selected>=0&&this.anchors.length){S.element.find(S._sanitizeSelector(S.anchors[I.selected].hash)).removeClass("ui-tabs-hide");
this.lis.eq(I.selected).addClass("ui-tabs-selected ui-state-active");
S.element.queue("tabs",function(){S._trigger("show",null,S._ui(S.anchors[I.selected],S.element.find(S._sanitizeSelector(S.anchors[I.selected].hash))[0]))
});
this.load(I.selected)
}D(window).bind("unload",function(){S.lis.add(S.anchors).unbind(".tabs");
S.lis=S.anchors=S.panels=null
})
}else{I.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))
}this.element[I.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible");
if(I.cookie){this._cookie(I.selected,I.cookie)
}for(var L=0,Q;
(Q=this.lis[L]);
L++){D(Q)[D.inArray(L,I.disabled)!=-1&&!D(Q).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled")
}if(I.cache===false){this.anchors.removeData("cache.tabs")
}this.lis.add(this.anchors).unbind(".tabs");
if(I.event!=="mouseover"){var K=function(U,T){if(T.is(":not(.ui-state-disabled)")){T.addClass("ui-state-"+U)
}};
var N=function(U,T){T.removeClass("ui-state-"+U)
};
this.lis.bind("mouseover.tabs",function(){K("hover",D(this))
});
this.lis.bind("mouseout.tabs",function(){N("hover",D(this))
});
this.anchors.bind("focus.tabs",function(){K("focus",D(this).closest("li"))
});
this.anchors.bind("blur.tabs",function(){N("focus",D(this).closest("li"))
})
}var G,M;
if(I.fx){if(D.isArray(I.fx)){G=I.fx[0];
M=I.fx[1]
}else{G=M=I.fx
}}function J(T,U){T.css("display","");
if(!D.support.opacity&&U.opacity){T[0].style.removeAttribute("filter")
}}var O=M?function(T,U){D(T).closest("li").addClass("ui-tabs-selected ui-state-active");
U.hide().removeClass("ui-tabs-hide").animate(M,M.duration||"normal",function(){J(U,M);
S._trigger("show",null,S._ui(T,U[0]))
})
}:function(T,U){D(T).closest("li").addClass("ui-tabs-selected ui-state-active");
U.removeClass("ui-tabs-hide");
S._trigger("show",null,S._ui(T,U[0]))
};
var P=G?function(U,T){T.animate(G,G.duration||"normal",function(){S.lis.removeClass("ui-tabs-selected ui-state-active");
T.addClass("ui-tabs-hide");
J(T,G);
S.element.dequeue("tabs")
})
}:function(U,T,V){S.lis.removeClass("ui-tabs-selected ui-state-active");
T.addClass("ui-tabs-hide");
S.element.dequeue("tabs")
};
this.anchors.bind(I.event+".tabs",function(){var U=this,W=D(U).closest("li"),T=S.panels.filter(":not(.ui-tabs-hide)"),V=S.element.find(S._sanitizeSelector(U.hash));
if((W.hasClass("ui-tabs-selected")&&!I.collapsible)||W.hasClass("ui-state-disabled")||W.hasClass("ui-state-processing")||S.panels.filter(":animated").length||S._trigger("select",null,S._ui(this,V[0]))===false){this.blur();
return false
}I.selected=S.anchors.index(this);
S.abort();
if(I.collapsible){if(W.hasClass("ui-tabs-selected")){I.selected=-1;
if(I.cookie){S._cookie(I.selected,I.cookie)
}S.element.queue("tabs",function(){P(U,T)
}).dequeue("tabs");
this.blur();
return false
}else{if(!T.length){if(I.cookie){S._cookie(I.selected,I.cookie)
}S.element.queue("tabs",function(){O(U,V)
});
S.load(S.anchors.index(this));
this.blur();
return false
}}}if(I.cookie){S._cookie(I.selected,I.cookie)
}if(V.length){if(T.length){S.element.queue("tabs",function(){P(U,T)
})
}S.element.queue("tabs",function(){O(U,V)
});
S.load(S.anchors.index(this))
}else{throw"jQuery UI Tabs: Mismatching fragment identifier."
}if(D.browser.msie){this.blur()
}});
this.anchors.bind("click.tabs",function(){return false
})
},_getIndex:function(G){if(typeof G=="string"){G=this.anchors.index(this.anchors.filter("[href$="+G+"]"))
}return G
},destroy:function(){var G=this.options;
this.abort();
this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
this.anchors.each(function(){var H=D.data(this,"href.tabs");
if(H){this.href=H
}var I=D(this).unbind(".tabs");
D.each(["href","load","cache"],function(J,K){I.removeData(K+".tabs")
})
});
this.lis.unbind(".tabs").add(this.panels).each(function(){if(D.data(this,"destroy.tabs")){D(this).remove()
}else{D(this).removeClass(["ui-state-default","ui-corner-top","ui-tabs-selected","ui-state-active","ui-state-hover","ui-state-focus","ui-state-disabled","ui-tabs-panel","ui-widget-content","ui-corner-bottom","ui-tabs-hide"].join(" "))
}});
if(G.cookie){this._cookie(null,G.cookie)
}return this
},add:function(J,I,H){if(H===F){H=this.anchors.length
}var G=this,L=this.options,N=D(L.tabTemplate.replace(/#\{href\}/g,J).replace(/#\{label\}/g,I)),M=!J.indexOf("#")?J.replace("#",""):this._tabId(D("a",N)[0]);
N.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);
var K=G.element.find("#"+M);
if(!K.length){K=D(L.panelTemplate).attr("id",M).data("destroy.tabs",true)
}K.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
if(H>=this.lis.length){N.appendTo(this.list);
K.appendTo(this.list[0].parentNode)
}else{N.insertBefore(this.lis[H]);
K.insertBefore(this.panels[H])
}L.disabled=D.map(L.disabled,function(P,O){return P>=H?++P:P
});
this._tabify();
if(this.anchors.length==1){L.selected=0;
N.addClass("ui-tabs-selected ui-state-active");
K.removeClass("ui-tabs-hide");
this.element.queue("tabs",function(){G._trigger("show",null,G._ui(G.anchors[0],G.panels[0]))
});
this.load(0)
}this._trigger("add",null,this._ui(this.anchors[H],this.panels[H]));
return this
},remove:function(G){G=this._getIndex(G);
var I=this.options,J=this.lis.eq(G).remove(),H=this.panels.eq(G).remove();
if(J.hasClass("ui-tabs-selected")&&this.anchors.length>1){this.select(G+(G+1<this.anchors.length?1:-1))
}I.disabled=D.map(D.grep(I.disabled,function(L,K){return L!=G
}),function(L,K){return L>=G?--L:L
});
this._tabify();
this._trigger("remove",null,this._ui(J.find("a")[0],H[0]));
return this
},enable:function(G){G=this._getIndex(G);
var H=this.options;
if(D.inArray(G,H.disabled)==-1){return 
}this.lis.eq(G).removeClass("ui-state-disabled");
H.disabled=D.grep(H.disabled,function(J,I){return J!=G
});
this._trigger("enable",null,this._ui(this.anchors[G],this.panels[G]));
return this
},disable:function(H){H=this._getIndex(H);
var G=this,I=this.options;
if(H!=I.selected){this.lis.eq(H).addClass("ui-state-disabled");
I.disabled.push(H);
I.disabled.sort();
this._trigger("disable",null,this._ui(this.anchors[H],this.panels[H]))
}return this
},select:function(G){G=this._getIndex(G);
if(G==-1){if(this.options.collapsible&&this.options.selected!=-1){G=this.options.selected
}else{return this
}}this.anchors.eq(G).trigger(this.options.event+".tabs");
return this
},load:function(J){J=this._getIndex(J);
var H=this,L=this.options,G=this.anchors.eq(J)[0],I=D.data(G,"load.tabs");
this.abort();
if(!I||this.element.queue("tabs").length!==0&&D.data(G,"cache.tabs")){this.element.dequeue("tabs");
return 
}this.lis.eq(J).addClass("ui-state-processing");
if(L.spinner){var K=D("span",G);
K.data("label.tabs",K.html()).html(L.spinner)
}this.xhr=D.ajax(D.extend({},L.ajaxOptions,{url:I,success:function(N,M){H.element.find(H._sanitizeSelector(G.hash)).html(N);
H._cleanup();
if(L.cache){D.data(G,"cache.tabs",true)
}H._trigger("load",null,H._ui(H.anchors[J],H.panels[J]));
try{L.ajaxOptions.success(N,M)
}catch(O){}},error:function(O,M,N){H._cleanup();
H._trigger("load",null,H._ui(H.anchors[J],H.panels[J]));
try{L.ajaxOptions.error(O,M,J,G)
}catch(N){}}}));
H.element.dequeue("tabs");
return this
},abort:function(){this.element.queue([]);
this.panels.stop(false,true);
this.element.queue("tabs",this.element.queue("tabs").splice(-2,2));
if(this.xhr){this.xhr.abort();
delete this.xhr
}this._cleanup();
return this
},url:function(H,G){this.anchors.eq(H).removeData("cache.tabs").data("load.tabs",G);
return this
},length:function(){return this.anchors.length
}});
D.extend(D.ui.tabs,{version:"1.8.16"});
D.extend(D.ui.tabs.prototype,{rotation:null,rotate:function(I,K){var G=this,L=this.options;
var H=G._rotate||(G._rotate=function(M){clearTimeout(G.rotation);
G.rotation=setTimeout(function(){var N=L.selected;
G.select(++N<G.anchors.length?N:0)
},I);
if(M){M.stopPropagation()
}});
var J=G._unrotate||(G._unrotate=!K?function(M){if(M.clientX){G.rotate(null)
}}:function(M){t=L.selected;
H()
});
if(I){this.element.bind("tabsshow",H);
this.anchors.bind(L.event+".tabs",J);
H()
}else{clearTimeout(G.rotation);
this.element.unbind("tabsshow",H);
this.anchors.unbind(L.event+".tabs",J);
delete this._rotate;
delete this._unrotate
}return this
}})
})(jQuery);
(function(B){var A=1;
B.fn.tab=function(D,C){if(typeof D==="object"){C=D
}C=B.extend({defaultOpen:(D&&typeof D==="number"&&D>0)?--D:0,tabKeyword:"tab",tabHiddenClass:"tab-hidden",tabListClass:"tab-list",tabActiveClass:"tab-active",tabEvent:"click",timer:0,animateUserAction:true,paginate:false,pause:false,cloneHeading:false,maintainPosition:false,fx:{change:"standard",duration:"normal"},container:""},C||{});
return this.each(function(H){var M=null,N,Q,L,I,E,T,U,J,O,R,K,S,F,V,G,P,W;
I=B('<div class="cn-tabs-anchor">');
E=B(this).find("."+C.tabKeyword);
T=B("<ul>");
T.addClass(C.tabListClass);
if(C.paginate===true){U=B('<li class="'+C.tabKeyword+"-paginate "+C.tabKeyword+'-back">Back</li>').bind(C.tabEvent,function(X){clearInterval(K);
S(-1,X)
});
J=B('<li class="'+C.tabKeyword+"-paginate "+C.tabKeyword+'-forward">Forward</li>').bind(C.tabEvent,function(X){clearInterval(K);
S(1,X)
});
T.append(U)
}O=[];
V=function(Y){var X=B(Y.target);
clearInterval(K);
X.unbind().text("Play").attr("class","tab-play");
X.bind(C.tabEvent,function(Z){G(Z);
return false
})
};
E.each(function(c){var f=B(this),h=f.html(),d,b,X,g,a,e,Y,Z;
if(c===0&&C.maintainPosition===true){if(C.container!==""){d=B(f).parents(C.container).get()[0];
B(d).before(I)
}else{B(f).before(I)
}}if(f[0].nodeName==="HEADER"){h=f.find("h1,h2,h3,h4").html()
}b=f.attr("id");
if(b===""){b="cnTabs"+A++
}X=B('<li id="'+C.tabKeyword+"-"+b+'"><a href="#'+b+'">'+h+"</a></li>");
X.find("a").bind(C.tabEvent,function(j){clearInterval(K);
S(this,j)
});
T.append(X);
g=B("<div>");
a=f.get()[0];
if(C.cloneHeading===true){e=B(f).clone().attr("id",function(){return this.id+"-tab-heading"
});
g.append(e)
}if(C.container===""){while(a.nextSibling&&a.nextSibling.nodeName!==a.nodeName){g.append(B(a.nextSibling))
}}else{Y=B(a).parents(C.container).find("script").remove().end().get()[0];
f.remove();
g.append(Y)
}f.remove();
g.attr("id",b).addClass(C.tabKeyword);
O.push(g)
});
if(C.paginate===true){T.append(J)
}if(C.pause===true){R=B('<li class="'+C.tabKeyword+'-pause">Pause</li>').bind(C.tabEvent,function(X){V(X)
});
T.append(R)
}if(C.maintainPosition){B(I).append(T)
}else{B(this).append(T)
}for(Q=0,L=O.length;
Q<L;
Q++){if(C.defaultOpen!==Q){O[Q].addClass(C.tabHiddenClass)
}if(C.maintainPosition){B(I).append(O[Q])
}else{B(this).append(O[Q])
}}T.find("li[id*="+C.tabKeyword+"-]").each(function(X){if(X===C.defaultOpen){M=CN.dom.storage.activateElement(B(this).get()[0],M,C.tabActiveClass)
}});
K=null;
if(C.timer>0){K=setInterval(function(){S(1)
},C.timer*1000)
}N=I.width()?I.width()+"px":"1000px";
S=function(Y,g){var h,a,Z,d,f,j,c,b,X;
if(typeof Y==="number"){F=T.find("li."+C.tabActiveClass).eq(0);
switch(Y){case -1:Y=B(F).prev().find("a").attr("href");
if(typeof Y==="undefined"){Y=B(T).find("li[id*="+C.tabKeyword+"-]").filter(":last").find("a").attr("href")
}break;
case 1:Y=B(F).next().find("a").attr("href");
if(typeof Y==="undefined"){Y=B(T).find("li[id*="+C.tabKeyword+"-]").filter(":first").find("a").attr("href")
}break;
default:console.log("jQuery.tab: theLink is a number, but it is not -1 or 1, which are the only two allowed values.");
break
}}d=(typeof Y!=="undefined")?Y.toString().split("#"):"";
f=(d.length>0)?d[1]:0;
if(!f){return false
}j=B("#"+f);
c=(typeof M!=="undefined")?M.toString().split("#"):"";
b=(c.length>0)?c[1]:"";
X=(function(){var l=B(".rotator.rotator-initialized").find('.tab[id!="'+b+'"]'),n=l.length+1,m=n-1,k=parseInt(b.match(/(\d+)$/g)[0],10),e=parseInt(d[1].match(/(\d+)$/g)[0],10);
return{otherTabs:l,tabsLength:n,maxTrans:m,cIdx:k,aIdx:e}
}());
if(W.hasOwnProperty(C.fx.change)){if(!g||(g&&C.animateUserAction===true)){W[C.fx.change](b,j,X)
}else{W.standard(b,j)
}}else{W.standard(b,j)
}h=null;
T.find("li[id*="+C.tabKeyword+"-]").each(function(e,k){if(B(k).hasClass(C.tabActiveClass)){h=k
}});
CN.dom.storage.deactivateElement(h,M,C.tabActiveClass);
a=C.tabKeyword+"-"+j.attr("id");
Z=document.getElementById(a);
M=CN.dom.storage.activateElement(Z,M,C.tabActiveClass);
if(g){g.preventDefault();
g.stopPropagation()
}};
G=function(Y){var X=B(Y.target);
K=null;
S(1);
if(C.timer>0){K=setInterval(function(){S(1)
},C.timer*1000)
}X.unbind().text("Pause").attr("class","tab-pause");
X.bind(C.tabEvent,function(Z){V(Z);
return false
})
};
W={standard:function(X,Y){B("div."+C.tabKeyword).attr("style","");
B("#"+X).addClass(C.tabHiddenClass);
Y.removeClass(C.tabHiddenClass)
},crossfade:function(X,Y){B("#"+X).animate({opacity:0},C.fx.duration,function(){B(this).addClass(C.tabHiddenClass)
});
Y.animate({opacity:1},C.fx.duration,function(){B(this).removeClass(C.tabHiddenClass)
})
},horizontalSlide:function(a,g,Z){var X=B("#"+a),b=g,f=(((Z.aIdx-Z.cIdx)===1)||((Z.cIdx-Z.aIdx)===Z.maxTrans))?"left":"right",e=(f==="left")?"right":"left",Y={},d={},c={};
Y[f]=N;
d[f]="-"+N;
c[f]="0";
Z.otherTabs.css(e,"").css(Y).removeClass(C.tabHiddenClass);
X.css(e,"").stop().animate(d,C.fx.duration);
b.stop().animate(c,C.fx.duration)
},textfade:function(Y,Z){var X=["rubric","feature-header","feature-blurb-text","byline"];
Z.addClass(C.tabHiddenClass).fadeIn(C.fx.duration,function(){B.each(X,function(a,b){setTimeout(function(){B(".rotator-content ."+X[a],Z).fadeIn("slow")
},600*a)
})
}).removeClass(C.tabHiddenClass);
B("#"+Y).fadeOut(C.fx.duration,function(){B(".rotator-content",B(this)).children().css("display","none")
})
}}
})
}
}(jQuery));
(function(C){var D=[];
C.tools=C.tools||{};
C.tools.tooltip={version:"1.1.3",conf:{effect:"toggle",fadeOutSpeed:"fast",tip:null,predelay:0,delay:30,opacity:1,lazy:undefined,position:["top","center"],offset:[0,0],cancelDefault:true,relative:false,oneInstance:true,events:{def:"mouseover,mouseout",input:"focus,blur",widget:"focus mouseover,blur mouseout",tooltip:"mouseover,mouseout"},api:false},addEffect:function(E,G,F){B[E]=[G,F]
}};
var B={toggle:[function(E){var F=this.getConf(),G=this.getTip(),H=F.opacity;
if(H<1){G.css({opacity:H})
}G.show();
E.call()
},function(E){this.getTip().hide();
E.call()
}],fade:[function(E){this.getTip().fadeIn(this.getConf().fadeInSpeed,E)
},function(E){this.getTip().fadeOut(this.getConf().fadeOutSpeed,E)
}]};
function A(F,G){var P=this,K=C(this);
F.data("tooltip",P);
var L=F.next();
if(G.tip){L=C(G.tip);
if(L.length>1){L=F.nextAll(G.tip).eq(0);
if(!L.length){L=F.parent().nextAll(G.tip).eq(0)
}}}function O(U){var T=G.relative?F.position().top:F.offset().top,S=G.relative?F.position().left:F.offset().left,V=G.position[0];
T-=L.outerHeight()-G.offset[0];
S+=F.outerWidth()+G.offset[1];
var Q=L.outerHeight()+F.outerHeight();
if(V=="center"){T+=Q/2
}if(V=="bottom"){T+=Q
}V=G.position[1];
var R=L.outerWidth()+F.outerWidth();
if(V=="center"){S-=R/2
}if(V=="left"){S-=R
}return{top:T,left:S}
}var I=F.is(":input"),E=I&&F.is(":checkbox, :radio, select, :button"),H=F.attr("type"),N=G.events[H]||G.events[I?(E?"widget":"input"):"def"];
N=N.split(/,\s*/);
if(N.length!=2){throw"Tooltip: bad events configuration for "+H
}F.bind(N[0],function(R){if(G.oneInstance){C.each(D,function(){this.hide()
})
}var Q=L.data("trigger");
if(Q&&Q[0]!=this){L.hide().stop(true,true)
}R.target=this;
P.show(R);
N=G.events.tooltip.split(/,\s*/);
L.bind(N[0],function(){P.show(R)
});
if(N[1]){L.bind(N[1],function(){P.hide(R)
})
}});
F.bind(N[1],function(Q){P.hide(Q)
});
if(!C.browser.msie&&!I&&!G.predelay){F.mousemove(function(){if(!P.isShown()){F.triggerHandler("mouseover")
}})
}if(G.opacity<1){L.css("opacity",G.opacity)
}var M=0,J=F.attr("title");
if(J&&G.cancelDefault){F.removeAttr("title");
F.data("title",J)
}C.extend(P,{show:function(R){if(R){F=C(R.target)
}clearTimeout(L.data("timer"));
if(L.is(":animated")||L.is(":visible")){return P
}function Q(){L.data("trigger",F);
var T=O(R);
if(G.tip&&J){L.html(F.data("title"))
}R=R||C.Event();
R.type="onBeforeShow";
K.trigger(R,[T]);
if(R.isDefaultPrevented()){return P
}T=O(R);
L.css({position:"absolute",top:T.top,left:T.left});
var S=B[G.effect];
if(!S){throw'Nonexistent effect "'+G.effect+'"'
}S[0].call(P,function(){R.type="onShow";
K.trigger(R)
})
}if(G.predelay){clearTimeout(M);
M=setTimeout(Q,G.predelay)
}else{Q()
}return P
},hide:function(R){clearTimeout(L.data("timer"));
clearTimeout(M);
if(!L.is(":visible")){return 
}function Q(){R=R||C.Event();
R.type="onBeforeHide";
K.trigger(R);
if(R.isDefaultPrevented()){return 
}B[G.effect][1].call(P,function(){R.type="onHide";
K.trigger(R)
})
}if(G.delay&&R){L.data("timer",setTimeout(Q,G.delay))
}else{Q()
}return P
},isShown:function(){return L.is(":visible, :animated")
},getConf:function(){return G
},getTip:function(){return L
},getTrigger:function(){return F
},bind:function(Q,R){K.bind(Q,R);
return P
},onHide:function(Q){return this.bind("onHide",Q)
},onBeforeShow:function(Q){return this.bind("onBeforeShow",Q)
},onShow:function(Q){return this.bind("onShow",Q)
},onBeforeHide:function(Q){return this.bind("onBeforeHide",Q)
},unbind:function(Q){K.unbind(Q);
return P
}});
C.each(G,function(Q,R){if(C.isFunction(R)){P.bind(Q,R)
}})
}C.prototype.tooltip=function(E){var F=this.eq(typeof E=="number"?E:0).data("tooltip");
if(F){return F
}var G=C.extend(true,{},C.tools.tooltip.conf);
if(C.isFunction(E)){E={onBeforeShow:E}
}else{if(typeof E=="string"){E={tip:E}
}}E=C.extend(true,G,E);
if(typeof E.position=="string"){E.position=E.position.split(/,?\s/)
}if(E.lazy!==false&&(E.lazy===true||this.length>20)){this.one("mouseover",function(H){F=new A(C(this),E);
F.show(H);
D.push(F)
})
}else{this.each(function(){F=new A(C(this),E);
D.push(F)
})
}return E.api?F:this
}
})(jQuery);
(function(D){var C=D.tools.tooltip;
C.plugins=C.plugins||{};
C.plugins.dynamic={version:"1.1.0",conf:{api:false,classNames:"top right bottom left"}};
function B(I,E){var F=E?D(E):D("body");
var H=F.width()+F.offset().left;
var G=F.height()+F.offset().top;
return[I.offset().top<=F.offset().top,H<=I.offset().left+I.width(),G<=I.offset().top+I.height(),I.offset().left<=F.offset().left]
}function A(F){var E=F.length;
while(E--){if(F[E]){return false
}}return true
}D.fn.dynamic=function(G){var H=D.extend({},C.plugins.dynamic.conf),F;
if(typeof G=="number"){G={speed:G}
}G=D.extend(H,G);
var E=G.classNames.split(/\s/),I;
this.each(function(){if(D(this).tooltip().jquery){throw"Lazy feature not supported by dynamic plugin. set lazy: false for tooltip"
}var J=D(this).tooltip().onBeforeShow(function(N,O){var M=this.getTip(),L=this.getConf();
if(!I){I=[L.position[0],L.position[1],L.offset[0],L.offset[1],D.extend({},L)]
}D.extend(L,I[4]);
L.position=[I[0],I[1]];
L.offset=[I[2],I[3]];
M.css({position:"absolute",top:O.top,left:O.left}).show();
var K=B(M,G.viewport||null);
if(!A(K)){if(K[2]){if(G.top){L.offset[0]=G.top.offset
}L.position[0]="top";
M.addClass(E[0])
}if(K[3]){if(G.right){L.offset[1]=G.right.offset
}L.position[1]="right";
M.addClass(E[1])
}if(K[0]){if(G.bottom){L.offset[0]=G.bottom.offset
}L.position[0]="bottom";
M.addClass(E[2])
}if(K[1]){if(G.left){L.offset[1]=G.left.offset
}L.position[1]="left";
M.addClass(E[3])
}if((K[0]||K[2])&&this.weChangedZero){L.offset[0]*=-1;
this.weChangedZero=true
}if((K[1]||K[3])&&this.weChangedOne){L.offset[1]*=-1;
this.weChangedOne=true
}}M.css({visibility:"visible"}).hide()
});
J.onShow(function(){var L=this.getConf(),K=this.getTip();
L.position=[I[0],I[1]];
L.offset=[I[2],I[3]]
});
J.onHide(function(){var K=this.getTip();
K.removeClass(G.classNames)
});
F=J
});
return G.api?F:this
}
})(jQuery);
(function(B){var A=B.tools.tooltip;
A.effects=A.effects||{};
A.effects.slide={version:"1.0.0"};
B.extend(A.conf,{direction:"up",bounce:false,slideOffset:10,slideInSpeed:200,slideOutSpeed:200,slideFade:!B.browser.msie});
var C={up:["-","top"],down:["+","top"],left:["-","left"],right:["+","left"]};
B.tools.tooltip.addEffect("slide",function(D){var F=this.getConf(),G=this.getTip(),H=F.slideFade?{opacity:F.opacity}:{},E=C[F.direction]||C.up;
H[E[1]]=E[0]+"="+F.slideOffset;
if(F.slideFade){G.css({opacity:0})
}G.show().animate(H,F.slideInSpeed,D)
},function(E){var G=this.getConf(),I=G.slideOffset,H=G.slideFade?{opacity:0}:{},F=C[G.direction]||C.up;
var D=""+F[0];
if(G.bounce){D=D=="+"?"-":"+"
}H[F[1]]=D+"="+I;
this.getTip().animate(H,G.slideOutSpeed,function(){B(this).hide();
E.call()
})
})
})(jQuery);
(function(B){B.tools=B.tools||{};
B.tools.scrollable={version:"1.1.2",conf:{size:5,vertical:false,speed:400,keyboard:true,keyboardSteps:null,disabledClass:"disabled",hoverClass:null,clickable:true,activeClass:"active",easing:"swing",loop:false,items:".items",item:null,prev:".prev",next:".next",prevPage:".prevPage",nextPage:".nextPage",api:false}};
var C;
function A(O,M){var R=this,P=B(this),D=!M.vertical,E=O.children(),K=0,I;
if(!C){C=R
}B.each(M,function(S,T){if(B.isFunction(T)){P.bind(S,T)
}});
if(E.length>1){E=B(M.items,O)
}function L(T){var S=B(T);
return M.globalNav?S:O.parent().find(T)
}O.data("finder",L);
var F=L(M.prev),H=L(M.next),G=L(M.prevPage),N=L(M.nextPage);
B.extend(R,{getIndex:function(){return K
},getClickIndex:function(){var S=R.getItems();
return S.index(S.filter("."+M.activeClass))
},getConf:function(){return M
},getSize:function(){return R.getItems().size()
},getPageAmount:function(){return Math.ceil(this.getSize()/M.size)
},getPageIndex:function(){return Math.ceil(K/M.size)
},getNaviButtons:function(){return F.add(H).add(G).add(N)
},getRoot:function(){return O
},getItemWrap:function(){return E
},getItems:function(){return E.children(M.item)
},getVisibleItems:function(){return R.getItems().slice(K,K+M.size)
},seekTo:function(S,W,T){if(S<0){S=0
}if(K===S){return R
}if(B.isFunction(W)){T=W
}if(S>R.getSize()-M.size){return M.loop?R.begin():this.end()
}var U=R.getItems().eq(S);
if(!U.length){return R
}var V=B.Event("onBeforeSeek");
P.trigger(V,[S]);
if(V.isDefaultPrevented()){return R
}if(W===undefined||B.isFunction(W)){W=M.speed
}function X(){if(T){T.call(R,S)
}P.trigger("onSeek",[S])
}if(D){E.animate({left:-U.position().left},W,M.easing,X)
}else{E.animate({top:-U.position().top},W,M.easing,X)
}C=R;
K=S;
V=B.Event("onStart");
P.trigger(V,[S]);
if(V.isDefaultPrevented()){return R
}F.add(G).toggleClass(M.disabledClass,S===0);
H.add(N).toggleClass(M.disabledClass,S>=R.getSize()-M.size);
return R
},move:function(U,T,S){I=U>0;
return this.seekTo(K+U,T,S)
},next:function(T,S){return this.move(1,T,S)
},prev:function(T,S){return this.move(-1,T,S)
},movePage:function(W,V,U){I=W>0;
var S=M.size*W;
var T=K%M.size;
if(T>0){S+=(W>0?-T:M.size-T)
}return this.move(S,V,U)
},prevPage:function(T,S){return this.movePage(-1,T,S)
},nextPage:function(T,S){return this.movePage(1,T,S)
},setPage:function(T,U,S){return this.seekTo(T*M.size,U,S)
},begin:function(T,S){I=false;
return this.seekTo(0,T,S)
},end:function(T,S){I=true;
var U=this.getSize()-M.size;
return U>0?this.seekTo(U,T,S):R
},reload:function(){P.trigger("onReload");
return R
},focus:function(){C=R;
return R
},click:function(U){var V=R.getItems().eq(U),S=M.activeClass,T=M.size;
if(U<0||U>=R.getSize()){return R
}if(T==1){if(M.loop){return R.next()
}if(U===0||U==R.getSize()-1){I=(I===undefined)?true:!I
}return I===false?R.prev():R.next()
}if(T==2){if(U==K){U--
}R.getItems().removeClass(S);
V.addClass(S);
return R.seekTo(U,time,fn)
}if(!V.hasClass(S)){R.getItems().removeClass(S);
V.addClass(S);
var X=Math.floor(T/2);
var W=U-X;
if(W>R.getSize()-T){W=R.getSize()-T
}if(W!==U){return R.seekTo(W)
}}return R
},bind:function(S,T){P.bind(S,T);
return R
},unbind:function(S){P.unbind(S);
return R
}});
B.each("onBeforeSeek,onStart,onSeek,onReload".split(","),function(S,T){R[T]=function(U){return R.bind(T,U)
}
});
F.addClass(M.disabledClass).click(function(){R.prev()
});
H.click(function(){R.next()
});
N.click(function(){R.nextPage()
});
if(R.getSize()<=M.size){H.add(N).addClass(M.disabledClass)
}G.addClass(M.disabledClass).click(function(){R.prevPage()
});
var J=M.hoverClass,Q="keydown."+Math.random().toString().substring(10);
R.onReload(function(){if(J){R.getItems().hover(function(){B(this).addClass(J)
},function(){B(this).removeClass(J)
})
}if(M.clickable){R.getItems().each(function(S){B(this).unbind("click.scrollable").bind("click.scrollable",function(T){if(B(T.target).is("a")){return 
}return R.click(S)
})
})
}if(M.keyboard){B(document).unbind(Q).bind(Q,function(S){if(S.altKey||S.ctrlKey){return 
}if(M.keyboard!="static"&&C!=R){return 
}var T=M.keyboardSteps;
if(D&&(S.keyCode==37||S.keyCode==39)){R.move(S.keyCode==37?-T:T);
return S.stopImmediatePropagation()
}if(!D&&(S.keyCode==38||S.keyCode==40)){R.move(S.keyCode==38?-T:T);
return S.stopImmediatePropagation()
}return true
})
}else{B(document).unbind(Q)
}});
R.reload()
}B.fn.scrollable=function(D){var E=this.eq(typeof D=="number"?D:0).data("scrollable");
if(E){return E
}var F=B.extend({},B.tools.scrollable.conf);
D=B.extend(F,D);
D.keyboardSteps=D.keyboardSteps||D.size;
this.each(function(){E=new A(B(this),D);
B(this).data("scrollable",E)
});
return D.api?E:this
}
})(jQuery);
(function(B){var A=B.tools.scrollable;
A.plugins=A.plugins||{};
A.plugins.autoscroll={version:"1.0.1",conf:{autoplay:true,interval:3000,autopause:true,steps:1,api:false}};
B.fn.autoscroll=function(D){if(typeof D=="number"){D={interval:D}
}var E=B.extend({},A.plugins.autoscroll.conf),C;
B.extend(E,D);
this.each(function(){var G=B(this).scrollable();
if(G){C=G
}var I,F,H=true;
G.play=function(){if(I){return 
}H=false;
I=setInterval(function(){G.move(E.steps)
},E.interval);
G.move(E.steps)
};
G.pause=function(){I=clearInterval(I)
};
G.stop=function(){G.pause();
H=true
};
if(E.autopause){G.getRoot().add(G.getNaviButtons()).hover(function(){G.pause();
clearInterval(F)
},function(){if(!H){F=setTimeout(G.play,E.interval)
}})
}if(E.autoplay){setTimeout(G.play,E.interval)
}});
return E.api?C:this
}
})(jQuery);
(function(B){var A=B.tools.scrollable;
A.plugins=A.plugins||{};
A.plugins.circular={version:"0.5.1",conf:{api:false,clonedClass:"cloned"}};
B.fn.circular=function(E){var D=B.extend({},A.plugins.circular.conf),C;
B.extend(D,E);
this.each(function(){var I=B(this).scrollable(),N=I.getItems(),K=I.getConf(),F=I.getItemWrap(),J=0;
if(I){C=I
}if(N.length<K.size){return false
}N.slice(0,K.size).each(function(O){B(this).clone().appendTo(F).click(function(){I.click(N.length+O)
}).addClass(D.clonedClass)
});
var L=B.makeArray(N.slice(-K.size)).reverse();
B(L).each(function(O){B(this).clone().prependTo(F).click(function(){I.click(-O-1)
}).addClass(D.clonedClass)
});
var M=F.children(K.item);
var H=K.hoverClass;
if(H){M.hover(function(){B(this).addClass(H)
},function(){B(this).removeClass(H)
})
}function G(O){var P=M.eq(O);
if(K.vertical){F.css({top:-P.position().top})
}else{F.css({left:-P.position().left})
}}G(K.size);
B.extend(I,{move:function(S,R,P,Q){var U=J+S+K.size;
var T=U>I.getSize()-K.size;
if(U<=0||T){var O=J+K.size+(T?-N.length:N.length);
G(O);
U=O+S
}if(Q){M.removeClass(K.activeClass).eq(U+Math.floor(K.size/2)).addClass(K.activeClass)
}if(U===J+K.size){return self
}return I.seekTo(U,R,P)
},begin:function(P,O){return this.seekTo(K.size,P,O)
},end:function(P,O){return this.seekTo(N.length,P,O)
},click:function(P,R,Q){if(!K.clickable){return self
}if(K.size==1){return this.next()
}var S=P-J,O=K.activeClass;
S-=Math.floor(K.size/2);
return this.move(S,R,Q,true)
},getIndex:function(){return J
},setPage:function(P,Q,O){return this.seekTo(P*K.size+K.size,Q,O)
},getPageAmount:function(){return Math.ceil(N.length/K.size)
},getPageIndex:function(){if(J<0){return this.getPageAmount()-1
}if(J>=N.length){return 0
}var O=(J+K.size)/K.size-1;
return O
},getVisibleItems:function(){var O=J+K.size;
return M.slice(O,O+K.size)
}});
I.onStart(function(P,O){J=O-K.size;
return false
});
I.getNaviButtons().removeClass(K.disabledClass)
});
return D.api?C:this
}
})(jQuery);
(function(B){B.fn.wheel=function(E){return this[E?"bind":"trigger"]("wheel",E)
};
B.event.special.wheel={setup:function(){B.event.add(this,D,C,{})
},teardown:function(){B.event.remove(this,D,C)
}};
var D=!B.browser.mozilla?"mousewheel":"DOMMouseScroll"+(B.browser.version<"1.9"?" mousemove":"");
function C(E){switch(E.type){case"mousemove":return B.extend(E.data,{clientX:E.clientX,clientY:E.clientY,pageX:E.pageX,pageY:E.pageY});
case"DOMMouseScroll":B.extend(E,E.data);
E.delta=-E.detail/3;
break;
case"mousewheel":E.delta=E.wheelDelta/120;
break
}E.type="wheel";
return B.event.handle.call(this,E,E.delta)
}var A=B.tools.scrollable;
A.plugins=A.plugins||{};
A.plugins.mousewheel={version:"1.0.1",conf:{api:false,speed:50}};
B.fn.mousewheel=function(F){var G=B.extend({},A.plugins.mousewheel.conf),E;
if(typeof F=="number"){F={speed:F}
}F=B.extend(G,F);
this.each(function(){var H=B(this).scrollable();
if(H){E=H
}H.getRoot().wheel(function(I,J){H.move(J<0?1:-1,F.speed||50);
return false
})
});
return F.api?E:this
}
})(jQuery);
(function(B){var A=B.tools.scrollable;
A.plugins=A.plugins||{};
A.plugins.navigator={version:"1.0.2",conf:{navi:".navi",naviItem:null,activeClass:"active",indexed:false,api:false,idPrefix:null}};
B.fn.navigator=function(D){var E=B.extend({},A.plugins.navigator.conf),C;
if(typeof D=="string"){D={navi:D}
}D=B.extend(E,D);
this.each(function(){var I=B(this).scrollable(),F=I.getRoot(),L=F.data("finder").call(null,D.navi),G=null,K=I.getNaviButtons();
if(I){C=I
}I.getNaviButtons=function(){return K.add(L)
};
function J(){if(!L.children().length||L.data("navi")==I){L.empty();
L.data("navi",I);
for(var M=0;
M<I.getPageAmount();
M++){L.append(B("<"+(D.naviItem||"a")+" href='#' />"))
}G=L.children().each(function(N){var O=B(this);
O.click(function(P){I.setPage(N);
return P.preventDefault()
});
if(D.indexed){O.text(N)
}if(D.idPrefix){O.attr("id",D.idPrefix+N)
}})
}else{G=D.naviItem?L.find(D.naviItem):L.children();
G.each(function(N){var O=B(this);
O.click(function(P){I.setPage(N);
return P.preventDefault()
})
})
}G.eq(0).addClass(D.activeClass)
}I.onStart(function(O,N){var M=D.activeClass;
G.removeClass(M).eq(I.getPageIndex()).addClass(M)
});
I.onReload(function(){J()
});
J();
var H=G.filter("[href="+location.hash+"]");
if(H.length){I.move(G.index(H))
}});
return D.api?C:this
}
})(jQuery);
/*
* @file cn.most.js
* @version 1.0.5
* @author Paul Bronshteyn
* @comment Built by a geek loaded on caffeine ...
* @copyright (c) Conde Nast Digital
*
* jquery.ajax issue in jquery-1.4.2-require.js: the call back is not able to access the properties other the context
*/
if(typeof CN==="undefined"||!CN||typeof jQuery==="undefined"||!jQuery){throw ("CN and/or jQuery library is missing!")
}CN.most=(function(D){var A=function(L){this.global=L===true;
this.enabled=true;
this.env=CN.site.env;
this.site=CN.site.code;
this.url="";
this.urlPath="/spring/event/most.go";
this.count=10;
this.days=5;
this.hours=0;
this.type="all";
this.container="";
this.timeout=30
},K=new A(true),J,B={viewed:new A(),emailed:new A(),favorited:new A()},H=function(N){var P,T,O=0,S=0,Q="",M=this.container,L=M||this.context.container,R=[],U=false;
D.each(N,function(){T=this.contentTitle.replace(/&amp;/gi,"&").replace(/&lt;/gi,"<").replace(/&gt;/gi,">");
P=this.imgUrl;
if(T&&this.contentUrl&&this.contentId!==true){if(CN.site&&CN.site.allowedDomains){R=CN.site.allowedDomains.split(",");
S=R.length
}for(O=0;
O<S;
O++){if(this.contentUrl.indexOf(R[O])>=0){U=true
}}if(U){Q+="<li>";
if(P&&P!==null){Q+='<a href="'+this.contentUrl+'" class="img"><img src="'+P+'" alt="'+T+'" /></a>'
}Q+='<a href="'+this.contentUrl+'" class="title">'+T+"</a></li>"
}else{Q+="<li>";
if(P&&P!==null){Q+='<a href="'+this.contentUrl+'" class="img"><img src="'+P+'" alt="'+T+'" /></a>'
}Q+='<a href="'+this.contentUrl.replace(/^.*\.\w+\/+/g,"/")+'" class="title">'+T+"</a></li>"
}}});
if(Q){D(L).html("<ol>"+Q+"</ol>").find("li:first").addClass("first").end().find("li:last").addClass("last");
if(D(L).hasClass("most-favorited")){D(window).trigger("CN.customEvents.mostfavorited")
}}},E=function(){},C=function(M,L){CN.debug.info("CN.most request",[M,L]);
var N={env:(L.env==="MIG1")?"STAG":L.env,site:L.site,type:L.type,event:"most_"+M,num:L.count,day:L.days};
if(L.hour){N.hour=L.hour;
N.day=Math.ceil(N.hour/24)
}D.ajax({type:"GET",cache:true,dataType:"jsonp",jsonpCallback:"cn_most"+M,global:false,url:(L.url||"http://"+((L.env!=="PROD")?"stag-":"")+"result."+CN.site.tld)+L.urlPath,context:{container:L.container},data:N,timeout:L.timeout,success:H,error:E})
},G=function(L){return{setEnabled:function(M){L.set("enabled",M===true);
return this
},setTimeout:function(M){L.set("timeout",CN.utils.intval(M)||30);
return this
},setEnv:function(M){L.set("env",M);
return this
},setUrl:function(M){L.set("url",M);
return this
},setUrlPath:function(M){L.set("urlPath",M);
return this
},setSite:function(M){L.set("site",M);
return this
},setType:function(M){L.set("type",M);
return this
},setCount:function(M){L.set("count",CN.utils.intval(M)||5);
return this
},setDays:function(M){L.set("days",CN.utils.intval(M)||0);
return this
},setHours:function(M){L.set("hours",CN.utils.intval(M)||0);
return this
}}
},F=(G(K)),I=function(N,L){var M=(G(L));
M.init=function(O){L=D.extend(L,O||{});
if(!L.container){this.setContainer()
}if(L.enabled){if(D(L.container).length){C(N,L)
}}return this
};
M.setContainer=function(O){L.set("container",O||"#most-"+N);
return this
};
M.end=function(){return F
};
return M
};
A.prototype.set=function(L,N){var M;
this[L]=N||this[L];
if(this.global){for(M in B){if(B.hasOwnProperty(M)){B[M].set(L,N)
}}}};
F.init=function(M){var L;
M=M||{};
K=D.extend(K,M);
if(K.enabled){for(L in B){if(B.hasOwnProperty(L)){this[L].init(M[L]||B[L])
}}}return this
};
for(J in B){if(B.hasOwnProperty(J)){F[J]=I(J,B[J])
}}return F
}(jQuery));
/*
* @file cn.mainnav.js
* @author Vincent Lim Show Chen, Dennis Pierce
* @copyright (c) Conde Nast Digital
*/
if(typeof CN==="undefined"||!CN||typeof jQuery==="undefined"||!jQuery){throw ("CN and/or jQuery library is missing!")
}CN.mainnav=(function(E){var C={hasFade:true,scrollDuration:500,scrollDistance:100},K=E('<div class="snav-nav-prev"></div>'),L=E('<div class="snav-nav-next" ></div>'),H=function(N){var M=N.position();
return M
},D=function(R,Q,T){var P=H(R),S=P.left,M=S+T,N=(M>=Q?true:false),O=(S===0?true:false);
if(N){L.removeClass("disabled");
if(C.hasFade){E(".fade.fwd").removeClass("disabled")
}}else{L.addClass("disabled");
K.removeClass("disabled");
if(C.hasFade){E(".fade.fwd").addClass("disabled");
E(".fade.back").removeClass("disabled")
}}if(O){L.removeClass("disabled");
K.addClass("disabled");
if(C.hasFade){E(".fade.fwd").removeClass("disabled");
E(".fade.back").addClass("disabled")
}}else{K.removeClass("disabled");
if(C.hasFade){E(".fade.back").removeClass("disabled")
}}return this
},F=function(O,N,T,R,P){var Q=H(O),M=Q.left,S=M+R,U=(S>=T?true:false);
if(N==="right"&&U){O.animate({left:"-="+P+"px"},{queue:false,duration:C.scrollDuration,complete:function(){D(O,T,R)
}})
}if(N==="left"&&M<0){if(Math.abs(M)<P){P=Math.abs(M)
}O.animate({left:"+="+P+"px"},{queue:false,duration:C.scrollDuration,complete:function(){D(O,T,R)
}})
}},J=function(M,Q,P){var N=jQuery(M).find(".current"),O;
if(N.length>0){O=N.position().left-35;
F(M,"right",Q,P,O)
}},B=function(O,N,Q){O.wrap('<div class="snav-scrollable '+N+'"></div>');
O.wrap('<div class="snav-mask"></div>');
var M=O.parent().parent(),P=M.width();
K.prependTo(M).bind("click",{scrollDirection:"left",parentWidth:P},function(R){F(O,R.data.scrollDirection,R.data.parentWidth,Q,C.scrollDistance)
});
L.appendTo(M).bind("click",{scrollDirection:"right",parentWidth:P},function(R){F(O,R.data.scrollDirection,R.data.parentWidth,Q,C.scrollDistance)
});
if(C.hasFade===true){E('<div class="fade back"></div><div class="fade fwd"></div>').appendTo(M)
}O.width(Q+25);
J(O,P,Q);
D(O,P,Q)
},A=function(M){jQuery(M+" ul.gnav-list li").hover(function(){var O=jQuery(this).attr("class"),N=O.split("-")[1].split(" ")[0];
jQuery(".snav-list, .snav-scrollable").removeClass("active").removeClass("current");
jQuery(".snav-"+N).addClass("active")
},function(){})
},G=function(M,N){jQuery(M).mouseleave(function(){jQuery(".snav-list").removeClass("active");
jQuery(".snav-"+N).addClass("current")
})
},I=function(T){var S,W,V,M=0,O,Q,N,P,X=["sections","video"],R,Y=false,U;
jQuery('.gnav-list li[class*="gnav"]').each(function(Z){N=jQuery(this).attr("class");
P=N.split("-")[1].split(" ")[0];
N=T+P;
O=E("."+N);
Q=E("."+N+" li");
M=0;
if(jQuery(this).text().toLowerCase()==="trending"){U={el:this,navIndex:P}
}if(jQuery(this).hasClass("current")){N+=" current";
Y=true;
R=P
}for(S=0,W=Q.length;
S<W;
S++){M=M+E(Q[S]).width();
if(E(Q[S]).hasClass("current")){if(jQuery.inArray(jQuery(this).text().toLowerCase(),X)!==-1){jQuery(this).addClass("current");
jQuery(Q[S]).parent().addClass("active");
Y=true;
R=P
}}}if(M>O.width()){B(O,N,M)
}});
if(Y===false){jQuery(U.el).addClass("current");
jQuery(".snav-"+U.navIndex).addClass("active");
Y=true;
R=U.navIndex
}return R
};
return{render:function(){var M=jQuery(".cn_main_nav"),N;
if(jQuery(M).hasClass("rollover-scroll-subnav")){N=I("snav-");
A(".cn_main_nav");
G(".cn_page_header",N)
}}}
}(jQuery));
CN.pluck.legacy=(function(E,C,B,D){var A=function(G,J,H){var F=this,I='<a href="'+G+'" class="lnkLogin reglayer-login" title="Login">Log in</a> <a href="'+J+'" class="lnkRegister reglayer-register" title="Register">register</a>';
this.boxWidth="";
this.aLoginMessages=(!H)?{log:I+" Log in or Register to log this tip.",rating:I+"Log in or Register to post your rating.",comment:I+" to post your comment.",favorites:'<h4>Start your stickers</h4><p>Sign in to start stickering everything you need to have want and need...</p><a href="'+G+'" class="lnkLogin reglayer-login" title="Login">Log in</a><a href="'+J+'" class="lnkRegister reglayer-register" title="Register">register</a>',favorites_generic:I+" to save this to your list of favorites.",product_page:"We can't save products to your list if we don't know who you are! "+I+" to save and share your favorite finds now.",recommendation:I+" to recommend this tip.",abuse:I+" to report this comment.",review:I+" to post your review","default":I+" to use this program."}:H;
this.signinUrl=G;
this.gatewayUrl=J;
this.createRegisterDiv()
};
A.prototype.init=function(){this.createRegisterDiv()
};
A.prototype.createRegisterDiv=function(){if(!E("#reglayer").length){E('<div id="reglayer"/>').addClass("regblurb").append(E('<a href="#"/>').addClass("closebtn").html("&times;").bind("click",function(){E(this).parent().hide();
return false
}),E('<p id="regtxt"/>')).appendTo("body");
E(".closebtn").trigger("click")
}CN.debug.info("firing CN.customEvents.pluckRegLayer event");
E(window).trigger("CN.customEvents.pluckRegLayer")
};
A.prototype.getGatewayUrl=function(){return this.gatewayUrl
};
A.prototype.setLoginText=function(F){return E("#regtxt").html(F).length>0?true:false
};
A.prototype.loginHandler=function(F,K){var L=E(K),G=E("#reglayer"),J=E(window),I,H;
E(window).bind("resize",{layer:G,target:L},this.onResize);
I=L.offset().top;
H=L.offset().left+(L.width()/2)-(G.width()/2);
if(C.site.mobilecompatible){if((C.mobile.detectIPad()||C.mobile.detectIPhone())){I=J.scrollTop()+(J.height()/4);
H=J.width()/2-(E("div.regblurb").width()*2)
}}G.css({top:I,left:H}).find("#regtxt").html(this.aLoginMessages[F]).end().show();
return false
};
A.prototype.onResize=function(G){var F=E(window);
G.data.layer.css({top:F.scrollTop()+(F.height()/4),left:F.width()/2-(E("div.regblurb").width()*2)})
};
E(window).bind("CN.customEvents.pluckRegLayerHide",function(){E("#reglayer").hide()
});
return{RegisteredGateway:A}
}(jQuery,CN,CN.pluck,PluckSDK));
CN.pluck.components=(function(D,C,B,E){var A=function(J){var I,F,K=[],G,H;
for(I=0,F=J.length;
I<F;
I++){K.push(new E.CommentsPageRequest({CommentedOnKey:new E.ExternalResourceKey({Key:J[I]})}))
}E.SendRequests(K,function(L){for(G=0,H=L.length;
G<H;
G++){D(".share.comments-count").find("span[data-uid='"+L[G].CommentedOnKey.Key+"'] a span").html(L[G].TotalItems)
}})
};
return{commentCountsComponent:A}
}(jQuery,CN,CN.pluck,PluckSDK));
CN.pluck.components.rating=(function(H,B,Q,M,N){var K=window.document,F=null,A=null,D=function(U,S){var R=U,T=this;
jQuery(R).click(function(V){if(V.preventDefault){V.preventDefault()
}else{V.returnValue=false
}T.submitRating(S+1,this);
return false
});
R.onmouseout=function(){T.resetRatings()
};
R.onmouseover=function(){T.fillRatings(S)
}
},O=function(T){var S=0,V=this,R=0,W,U;
this.config=T;
this.config.ratingDiv=jQuery(".pluck-rating-group")[0];
this.config.avgRatingDiv=jQuery(".pluck-average-rating")[0];
this.config.rating=0;
this.config.id=T.articleId;
this.config.aAnchors=[];
A=new Q.legacy.RegisteredGateway(B.page.config.reg.urls.login,B.page.config.reg.urls.reg);
U=(this.config.ratingDiv)?this.config.ratingDiv.childNodes:[];
for(S=0;
S<U.length;
S++){if(U[S].nodeType===1){this.config.aAnchors.push(U[S]);
D.call(this,U[S],R);
R++
}}W=new N.ArticleRequest({ArticleKey:new N.ExternalResourceKey({Key:T.articleId})});
N.SendRequests([W],function(X){V.renderComponent(X)
})
},C=function(T){var R=this.config,S;
R.rating=T;
if(isNaN(R.rating)){R.rating=0
}if(R.rating>R.numberItems){R.rating=0
}for(S=0;
S<R.numberItems;
S++){if(S+1<=T){H(R.aAnchors[S]).removeClass("inactive").addClass("active")
}else{H(R.aAnchors[S]).removeClass("active").addClass("inactive")
}}},L=function(T){var R=this.config,S;
for(S=0;
S<R.numberItems;
S++){if(T>=S){H(R.aAnchors[S]).removeClass("inactive").removeClass("active").addClass("hover")
}else{H(R.aAnchors[S]).removeClass("hover").removeClass("active").addClass("inactive")
}}},J=function(){var R=this.config,T=R.rating-1,S;
for(S=0;
S<R.numberItems;
S++){if(T>=0&&S<=T){H(R.aAnchors[S]).removeClass("inactive").removeClass("hover").addClass("active")
}else{H(R.aAnchors[S]).removeClass("active").removeClass("hover").addClass("inactive")
}}},P=function(X){var S=this,Y=S.config,R=0,Z={},U=0,W,T={},V={};
V=(X.length>1)?X[1]:X[0];
if(!M.responseHasErrors(V)){Z=V.Article.Ratings;
W=Y.articleId;
U=(Z.AverageRating!==null?Math.round(Z.AverageRating*10)/10:0);
T=H('.cn_reactions_ratings *[data-id="'+W+'"]');
if(U>=0){T.find(".ratingtxt").html("(Average rating <span>"+U+"</span> stars)");
H(".cn_reactions_ratings").each(function(a){if(Z.CurrentUserRating!==null){S.setRating(Z.CurrentUserRating)
}else{S.setRating(U)
}})
}}},E=function(X,a){var V=this,Y=V.config,e=new N.ExternalResourceKey({Key:Y.articleId}),b=B.url.section(),d=Y.kw,U=Y.title,c=Y.url,Z={},T={},W=new N.RateActionRequest(),S=new N.ArticleRequest(),R=[];
if(Q.user.isLoggedIn){if(typeof CN!=="undefined"&&CN.stats){CN.stats.trackAction("rating",a)
}W.RateOnKey=e;
W.Rating=X;
W.UserKey=new PluckSDK.UserKey({Key:Q.user.userId});
S.ArticleKey=e;
R.push(W);
R.push(S);
N.SendRequests(R,function(f){V.renderComponent(f)
})
}else{A.loginHandler("rating",a)
}},I=function(S){var R=this,T;
H("#averageRatingWidget").hide();
T=new N.ArticleRequest({ArticleKey:new N.ExternalResourceKey({Key:S})});
N.SendRequests([T],R.renderAverageRating)
},G=function(T){var S,R=5,X,W=0,Y,U,V;
if(!M.responseHasErrors(T[0])){W=T[0].Article.Reviews.AverageReviewRating
}Y=W*100/R;
U=Y%20;
V=Y/20;
if(U>0){X=(V===4)?2:3;
Y=Y-U+(U*12/20)+X
}S='<div class="pluck-rating-description">Average Reader Rating:</div> <div class="pluck-review-output-stars">     <div class="pluck-review-starsOutput">         <span class="pluck-review-starsOutput-color"> <em style="left: '+Y+'px;">'+W+'</em> </span>         <span class="pluck-review-starsOutput-overlay"> </span>     </div> <!-- span is 100px wide, so each percent is 1px, therefore % = px --> </div>';
H("#averageRatingWidget").html(S).show()
};
return{config:F,init:O,setRating:C,fillRatings:L,resetRatings:J,submitRating:E,renderComponent:P,averageRating:I,renderAverageRating:G}
}(jQuery,CN,CN.pluck,CN.pluck.utils,PluckSDK));
CN.pluck.components.mostcommented=(function(C,A,I,H,F,G){var D=null,B=function(K){var L=this,J=K.resultAge||15,M=K.numResults||10,N=G.DiscoveryActivity.Commented,P=G.ContentType.Article,O=[];
D=K.element;
O.push(new G.DiscoverContentActionRequest({Activity:N,Type:P,Age:J,MaximumNumberOfDiscoveries:M,FilterBySiteOfOrigin:true}));
G.SendRequests(O,L.renderCommentedRail)
},E=function(O){var M="<ol>",S=0,Q,P=O.length||0,L=0,J=0,R=0,K=[],N=[],U=[],T=false;
if(D){if(A.site&&A.site.allowedDomains){N=A.site.allowedDomains.split(",");
J=N.length
}for(S=0;
S<P;
S++){K=O[S].DiscoveredContent;
R=K.length;
Q=0;
for(Q=0;
Q<R;
Q++){L=0;
U=K[Q];
T=false;
for(L=0;
L<J;
L++){if(U.Url.indexOf(N[L])>=0){T=true
}}if(!T){U.Url=(U.Url||"").replace(/https?:\/\/[^\/]*/,"")
}if(U.Title&&/\w+/.test(U.Title)){M+='<li><a href="'+U.Url+'">'+U.Title.replace(/&amp;/gi,"&").replace(/&lt;/gi,"<").replace(/&gt;/gi,">")+"</a></li>"
}else{M+="<!-- "+U.ArticleKey.Key+" : has a null title -->"
}}}M+="</ol>";
C(D).html(M).show()
}else{return false
}};
return{renderCommentedRail:E,mostCommentedRequest:B}
}(jQuery,CN,CN.pluck,CN.pluck.user,CN.pluck.utils,PluckSDK));
if(typeof CN==="undefined"||!CN){CN={}
}CN.pluck=CN.pluck||{};
CN.pluck.app=(function(C,I,F,N,P){var K=N.hostUrl,J=K+"/Direct/SocialProxy?sid="+N.domain,R="/Content/ua/scripts/pluckApps.js",D,Q=C(),A={comments:["CommentsRendered","CommentCreate"],reviews:["ReviewListRendered","ReviewListSort","ReviewCreate","ReviewEdit","ReviewDelete"],persona:["PersonaRendered"]},O=function(){var T=C('script[src*="cn.pluck.app.js"]').attr("src"),S=function(a){var W={},V,Z,Y,X=0,U;
if(!a){return false
}else{if(a){return{skipcss:false}
}}V=a.indexOf("?");
if(V>-1){Z=a.substr(V+1).split("&");
U=Z.length;
for(X=0;
X<U;
X++){Y=Z[X].split("=");
if(Y[1]==="false"){W[Y[0].toLowerCase()]=false
}else{if(Y[1]==="true"){W[Y[0].toLowerCase()]=true
}else{W[Y[0].toLowerCase()]=decodeURIComponent(Y[1])
}}}}else{W=false
}return W
};
return S(T)
},H=function(S){if(S.toggle==="enable"){Q=(Q.hasClass("pluck-enabled"))?Q:Q.addClass("pluck-enabled")
}else{Q=(Q.hasClass("pluck-enabled"))?Q.removeClass("pluck-enabled"):Q
}},B={queue:[],register:function(S){if(!S||!S.init){P.info("Pluck App Proxy",["Plugin failed validation and was not installed",S]);
return false
}this.queue.push(S);
F.app.loaded[S.name]=false;
P.info("Pluck App Proxy",["Plugin installed",S]);
return true
},run:function(){var U=0,T=this.queue.length,V,S;
for(U=0;
U<T;
U++){S=this.queue[U];
P.info("Pluck App Proxy",["Running plugin",S.name]);
V=S.init.call();
F.app.loaded[S.name]=true
}}},G=function(){B.run()
},M=function(){if(!window.pluckAppProxy){P.warn("Pluck App Proxy",["The pluckAppProxy object was not created.  Exiting init()."]);
return false
}D=window.pluckAppProxy;
P.info("Pluck App Proxy",["pluckApps.js loaded from "+K,D]);
if(typeof D.callApp!=="undefined"){(function(){var S=D.callApp;
D.callApp=function(T,V,W){var U=W;
if(T==="pluck_user_persona"){U=function(X){W.call(this,X);
D.executeActivityCallbacks("PersonaRendered",{params:V})
}
}S.apply(this,[T,V,U]);
D.executeActivityCallbacks("CallApp",{app:T,params:V})
};
D.registerActivityCallback("CallApp",function(T){P.info("Pluck App Proxy",["App Called",T])
})
}())
}D.onInit(function(){var T,V,S,U=function(W){return function(X){P.info("Pluck App Event",[W,X])
}
};
Q=(C(".pluck-app-container").length>0)?C(".pluck-app-container"):C("#blogs_body + .comments");
F.app.$pluckApp=Q;
if(Q.length===0){H({toggle:"disable"});
P.info("Pluck App Proxy",["No pluck apps present on the page"]);
return false
}else{H({toggle:"enable"})
}for(V in A){if(A.hasOwnProperty(V)){for(T=0;
T<A[V].length;
T++){D.registerActivityCallback(A[V][T],U(A[V][T]))
}}}C.ajax({url:J,dataType:"script",success:function(X,Y,W){P.info("Pluck App Proxy",["Loaded "+J,W,Y])
},error:function(W,Y,X){P.warn("Pluck App Proxy",["Failed to load "+J,W,Y,X])
}});
G();
return true
})
},E=function(T){var S=document.createElement("script");
if(typeof T!=="string"){P.warn("loadScript failed to load file",[T]);
return false
}S.src=T;
C("head",document)[0].appendChild(S);
return true
},L=function(){var U="",T,S;
if(!K){P.warn("Pluck App Proxy",["No url found for pluck server.  Pluck Apps not loaded.",F]);
return false
}if(typeof CQ!=="undefined"&&CQ.WCM&&(CQ.WCM.isEditMode()||CQ.WCM.isDesignMode())){P.info("Pluck App Proxy",["Pluck Apps disabled in edit mode.",F]);
return false
}T=O();
if(!T){U=K+R+"?skipCss=false"
}else{S=(typeof T.skipcss==="undefined")?false:T.skipcss;
U=K+R+"?skipCss="+S
}if(E(U)){C(function(){var W=3500,V=M;
if(typeof window.pluckAppProxy==="undefined"){P.warn("Pluck App Proxy",["pluckAppProxy object not ready yet.  Setting timeout of "+W+"ms to init or fail."]);
V=function(){setTimeout(M,W)
}
}V()
})
}else{P.warn("Pluck App Proxy",["Could not load Pluck Apps script.  Pluck Apps not loaded.",U]);
return false
}return{"Pluck App Proxy":true}
};
return{host:K,loaded:L(),toggleApp:H,runPlugins:G,EVENTS:A,register:function(U){var T=0,S;
if(!U){return this
}if(!this.loaded){P.warn("Pluck App Proxy",["Pluck Apps not loaded.  Plugin will not install.",U]);
return this
}U=[].concat(U);
S=U.length;
for(T=0;
T<S;
T++){B.register(U[T])
}return this
}}
}(jQuery,CN,CN.pluck,CN.pluck.config,CN.debug));
if(typeof CN==="undefined"||!CN){throw ("CN library is missing!")
}CN.pluck=CN.pluck||{};
CN.pluck.app.callbacks=(function(C,A,K,F,E){var H,G,B=function(M){var L={setArticleId:function(Q){if(Q.group==="reviews"){F.callbacks.articleId=Q.data.reviewOnKey
}else{F.callbacks.articleId=Q.data.commentOnKey
}},redrawZebra:function(){var R=1,Q=G.find(".pluck-comm-single-comment-top");
Q.each(function(){var S=C(this);
if(!S.hasClass(".pluck-user-isHidden")){S=(R%2===0)?S.removeClass(".pluck-comm-isOdd").addClass(".pluck-comm-isEven"):S.removeClass(".pluck-comm-isEven").addClass(".pluck-comm-isOdd");
R++
}})
},swapCountDisplay:function(S){var R=(S.group==="reviews")?".pluck-review-full-subheader-headline":".pluck-comm-commenttext",Q=C(R);
Q.each(function(){var V=C(this),T=V.find("span"),U;
if(!V.hasClass("swapped")){T.detach();
U=C.trim(V.text());
V.text(U+":").addClass("swapped");
T.appendTo(V)
}})
},disableFriends:function(){C(".pluck-review-full-header-sorting").find("[value=FriendDescending]").remove()
},disablePersonaLink:function(){C(".pluck-comm-username-url").each(function(){C(this).find("a").attr("href","").click(function(){return false
})
})
},disableMiniPersona:function(){pluckAppProxy.pluck_user_miniPersona_show=null
},clickableAvatar:function(){var Q="<a class='pluck-avatar-link' href='/community/persona'>";
C(".pluck-user-isMe .pluck-avatar").wrap(Q);
C(".pluck-user-isMe .pluck-comm-avatarimg").wrap(Q)
},hideAbused:function(){var Q=G.find(".pluck-user-isHidden"),R=(Q.length>0);
if(R){Q.hide();
this.redrawZebra()
}},toggleIcons:function(Q){if(Q.data.toggle==="enable"){H=(H.hasClass("reactions-enabled"))?H:H.addClass("reactions-enabled")
}else{H=(H.hasClass("reactions-enabled"))?H.removeClass("reactions-enabled"):H
}},countComponent:function(){if(typeof K.components.commentCountsComponent==="function"){K.components.commentCountsComponent([F.callbacks.articleId])
}},personaSetup:function(){jQuery(".pluck-persona-first-settings-info-headerbar").each(function(){var Q=jQuery(this);
if(Q.find("p.pluck-persona-first-settings-info-headerbar").text()==="Interests"){Q.css({display:"none"})
}});
jQuery(".pluck-persona-first-settings-info-basic-info-label").html("My Photo");
jQuery("span.pluck-persona-first-settings-info-actions-cancel>a").attr("href",window.location.href)
},useSlauth:function(R){var Q={init:function(){G.append("<div class='pluckSlauth' id='pluckSlauthContainer'></div>");
G.resetDialog=function(S){C(".dialog-form-pleasewait",S).hide();
C(".dialog-form-message",S).hide();
C(".dialog-form-form",S).show()
};
G.pluckLoginHandler=function(){var S=C("#dialog-form-login");
G.resetDialog(S);
C("#dialog-form-register").dialog("close");
S.dialog("open");
return false
};
G.pluckRegisterHandler=function(){var S=C("#dialog-form-register");
G.resetDialog(S);
C("#dialog-form-login").dialog("close");
S.dialog("open");
return false
};
window.PluckAuthCommon.$pluckApp=G;
PluckSlauth.RenderWidget(F.host,false,"pluckSlauthContainer");
PluckSlauth.RegisterCallback("SlauthLogin",F.refresh);
PluckSlauth.RegisterCallback("SlauthRegister",F.refresh);
PluckSlauth.RegisterCallback("SlauthLogout",F.refresh)
},reviews:function(){C(".pluck-login-review-submit-button").click(G.pluckLoginHandler);
C(".pluck-login-review-signup-button").click(G.pluckRegisterHandler)
},comments:function(){C(".pluck-login-comment-submit-button").click(G.pluckLoginHandler);
C(".pluck-login-comment-signup-button").click(G.pluckRegisterHandler)
}};
if(R.group&&Q[R.group]){Q[R.group]()
}},useOmniture:function(S){var R=[],Q={comments:function(U){var T=G.find(".pluck-comment-input-box");
if(U.event==="CommentCreate"){if(typeof CN!==undefined&&CN.stats){A.stats.trackAction("comment",F.$pluckApp.find(".pluck-comment-input-box").get(0))
}}else{if(U.evemt==="CommentsRendered"){T.each(function(){var W=0,Y=jQuery(this),V=R.length,X;
X=Y.parentsUntil(".pluck-comm-posting-form").parent(".pluck-comm-posting-form");
for(W=0;
W<V;
W++){if(R[W]===X.attr("id")){return true
}}R.push(X.attr("id"));
Y.one("focus",function(){if(A.stats){A.stats.trackActionEvar("commentFocus",this,"eVar39","comment on focus")
}})
})
}}},reviews:function(T){if(typeof A!=="undefined"&&A.stats&&T.event==="ReviewCreate"){A.stats.trackAction("rating",G.get(0))
}}}
}},O={init:["toggleIcons","useSlauth"],comments:["swapCountDisplay","disableFriends","disableMiniPersona","clickableAvatar","hideAbused","redrawZebra","countComponent","useSlauth","useOmniture","disablePersonaLink"],reviews:["swapCountDisplay","disableFriends","disableMiniPersona","clickableAvatar","hideAbused","redrawZebra","useSlauth","useOmniture","disablePersonaLink"],persona:["personaSetup"]},P={swapCountDisplay:false,disableFriends:true,disableMiniPersona:true,clickableAvatar:false,hideAbused:true,countComponent:true,personaSetup:true,useSlauth:false,disablePersonaLink:false,useOmniture:true},N;
this.config=P;
if(M){for(N in M){if(M.hasOwnProperty(N)){this.config[N]=M[N]
}}}this.handle=function(V){var U="",S={},R=null,Q=0,T=0;
if(V&&V.group&&O.hasOwnProperty(V.group)){U=V.group;
S.group={};
S.group[U]={};
R=O[U];
Q=R.length;
for(T=0;
T<Q;
T++){if(this.config[R[T]]){S.group[U][R[T]]=L[R[T]](V)
}}}return S
}
},J=function(){var N=A.config.get("pluckApps"),M=new B(N),R=F.toggleApp,Q=window.pluckAppProxy,O,S,L,P=function(T,U){return function(V){M.handle({group:U,event:T,data:V})
}
};
G=F.$pluckApp;
H=C(".reactions-icons-container");
F.toggleApp=function(T){R(T);
M.handle({group:"init",data:T})
};
F.refresh=function(){Q.pluck_comments_refresh("#"+G.find(".pluck-app").get(0).id,null,null,null,null,null,false,true,"Please wait while we process the request.")
};
M.handle({group:"init"});
for(S in F.EVENTS){if(F.EVENTS.hasOwnProperty(S)){for(O=0;
O<F.EVENTS[S].length;
O++){Q.registerActivityCallback(F.EVENTS[S][O],P(F.EVENTS[S][O],S))
}}}},D={init:J,name:"CN Pluck App - "+CN.site.name},I=function(){F.register(D)
};
I();
return{articleId:null}
}(jQuery,CN,CN.pluck,CN.pluck.app,CN.debug));
if(typeof CN==="undefined"||!CN){throw ("CN library is missing!")
}CN.pluck=CN.pluck||{};
CN.pluck.app.slideshow=(function(G,C,A,F,B){var H=function(){var K,J,I=function(M){if(M.toggle==="enable"){M.container.show()
}else{M.container.hide()
}},L=function(){if(J.slide.getLabel()==="slide"){F.slideshow.refresh(J.slides[J.currentSlideIndex])
}else{if(J.slide.getLabel()==="domslide"){I({container:G(".cr-item .pluck-reviews, .cr-item .pluck-comments, .cr-item .pluck-ratings"),toggle:"disable"})
}}};
pluckAppProxy.registerActivityCallback("SlideshowRefresh",function(M){B.info("Pluck App Event",["SlideshowRefresh",M])
});
pluckAppProxy.pluck_comments_slideshow_refresh=function(O){var N=G(".cr-item .pluck-comm"),M;
if(typeof O==="undefined"){N.hide();
B.error("Pluck App Proxy",["Unable to load slide comments","'params' is undefined"]);
return false
}N=(!O.parent)?N:G(O.parent);
if(!N.get(0)){B.error("Pluck App Proxy",["Unable to load slide comments","List container div not found",O]);
return false
}O.plckOnPage=(!O.plckOnPage)?"1":O.plckOnPage;
O.plckItemsPerPage=(!O.plckItemsPerPage)?"10":O.plckItemsPerPage;
O.plckSort=(!O.plckSort)?"TimeStampDescending":O.plckSort;
O.plckFilter=(!O.plckFilter)?"":O.plckFilter;
O.plckFindCommentKey=(!O.plckFindCommentKey)?"":O.plckFindCommentKey;
O.contentType="Html";
O.plckCommentOnKeyType="article";
O.plckCommentOnKey=(!O.plckCommentOnKey)?false:O.plckCommentOnKey;
O.plckLevel="1";
O.plckParentHtmlId="";
O.waitMsg=(!O.waitMsg)?"Please wait...":O.waitMsg;
O.clientUrl=(!O.clientUrl)?document.location.href:O.clientUrl;
O.plckArticleUrl=(!O.plckArticleUrl)?document.location.href:O.plckArticleUrl;
O.plckCommentListType=(!O.plckCommentListType)?"full":O.plckCommentListType;
pluckAppProxy.pluck_comments_submit_current="";
M=G(".pluck-comm-reply-input",N);
M.hide();
M.appendTo(N);
N.attr("onpage",O.plckOnPage);
N.attr("itemsperpage",O.plckItemsPerPage);
N.attr("sort",O.plckSort);
N.attr("filter",O.plckFilter);
pluckAppProxy.callApp("pluck/comments",O,function(P){N.html(" ");
N.append(P);
if(G.browser.msie){setTimeout(function(){G(".pluck-comments-wait",N).hide()
},500)
}else{G(".pluck-comments-wait",N).hide()
}})
};
pluckAppProxy.pluck_reviews_slideshow_refresh=function(N){var M=G(".cr-item .pluck-review-list");
if(typeof N==="undefined"){B.error("Pluck App Proxy",["Unable to load slide reviews","'params' is undefined"]);
return false
}N.plckReviewOnPage=(!N.plckReviewOnPage)?"1":N.plckReviewOnPage;
N.plckReviewItemsPerPage=(!N.plckReviewItemsPerPage)?"5":N.plckReviewItemsPerPage;
N.plckReviewSort=(!N.plckReviewSort)?"TimeStampDescending":N.plckReviewSort;
N.plckReviewFilter=(!N.plckReviewFilter)?"":N.plckReviewFilter;
N.plckReviewFeaturedUserBadgeFamilyId=(!N.plckReviewFeaturedUserBadgeFamilyId)?"":N.plckReviewFeaturedUserBadgeFamilyId;
N.plckReviewFeaturedUserBadgeId=(!N.plckReviewFeaturedUserBadgeId)?"":N.plckReviewFeaturedUserBadgeId;
N.plckReviewKey=(!N.plckReviewKey)?"":N.plckReviewKey;
N.plckReviewOnKeyType=(!N.plckReviewOnKeyType)?"article":N.plckReviewOnKeyType;
N.plckReviewOnKey=(!N.plckReviewOnKey)?false:N.plckReviewOnKey;
N.plckReviewListType=(!N.plckReviewListType)?"article":N.plckReviewListType;
N.plckReviewCreate=(!N.plckReviewCreate)?"false":N.plckReviewCreate;
N.plckReviews=(!N.plckReviews)?"false":N.plckReviews;
N.clientUrl=(!N.clientUrl)?document.location.href:N.clientUrl;
N.plckArticleUrl=(!N.plckArticleUrl)?document.location.href:N.plckArticleUrl;
if(!N.plckReviewOnKey){B.error("Pluck App Proxy",["Unable to load slide reviews","You must provide an article id",N]);
return false
}N.contentType="Html";
M=(!N.list)?(M.length===0)?G(".pluck-review-create"):M:G(N.list);
if(!M.get(0)){B.warn("Pluck App Proxy",["Pluck app not yet loaded","List container div not found.  Will attempt to fetch within callback function.",N])
}pluckAppProxy.closeDialogs();
pluckAppProxy.displayWait(G(".pluck-reviews-working",M));
pluckAppProxy.callApp("pluck/reviews/list.app",N,function(O){pluckAppProxy.pluck_reviews_old_item=null;
if(!M.get(0)){M=(G(".pluck-review-list").length===0)?G(".pluck-review-create"):G(".pluck-review-list")
}M.before(O);
M.remove();
A.components.rating.averageRating(N.plckReviewOnKey)
})
};
if(G(".cn_slideshow").find("#items-container .cr-item").length>0){F.slideshow.refresh=function(R){var Q,S={},O,N,M,P;
if(!R){B.error("Pluck App Proxy",["You must provide a slideshow item object"]);
return false
}F.slideshow.currentSlide=R;
if(R.comments||R.ratings||R.reviews){O=R.pixieId||R.contentId;
N=C.site.name+"_"+O;
M=location.protocol+"//"+location.host+"/services/lookup/"+((R.pixieId)?F.callbacks.articleId+"?slide="+O:O);
if(R.comments&&G(".cr-item .pluck-comm").length>0){Q="pluck_comments_slideshow_refresh";
S.plckCommentOnKey=N;
S.clientUrl=M;
S.plckArticleUrl=M;
S.icon="comments";
S.iconText="Post Your Comment";
S.toggle="enable";
S.container=G(".cr-item .pluck-comments");
F.slideshow.slideLevelReactions=true;
I(S);
pluckAppProxy[Q](S)
}else{if(!R.comments){I({container:G(".cr-item .pluck-comments"),toggle:"disable"})
}}if(R.reviews&&G(".cr-item .pluck-review-list").length>0){Q="pluck_reviews_slideshow_refresh";
S.plckReviewOnKey=N;
S.clientUrl=M;
S.plckArticleUrl=M;
S.icon="reviews";
S.iconText="Post Your Review";
S.toggle="enable";
S.container=G(".cr-item .pluck-reviews");
F.slideshow.slideLevelReactions=true;
I(S);
pluckAppProxy[Q](S)
}else{if(!R.reviews){I({container:G(".cr-item .pluck-reviews"),toggle:"disable"})
}}if(R.ratings&&G(".cr-item .pluck-ratings")){A.components.rating.init({articleId:N,numberItems:5,title:"",kw:"",url:true,redirect:M})
}else{if(!R.reviews){I({container:G(".cr-item .pluck-ratings"),toggle:"disable"})
}}}pluckAppProxy.executeActivityCallbacks("SlideshowRefresh",{params:S,item:R})
};
K=G(".cn_slideshow #items-container").slideshow();
J=K.slideshow;
J.onForwardComplete.subscribe(function(){L()
});
J.onBackwardComplete.subscribe(function(){L()
});
J.onJumpToSlideComplete.subscribe(function(){L()
});
if(C.Observer.haveFired.indexOf("onSlideshowReady")===-1){J.onSlideshowReady.subscribe(function(){L()
})
}else{L()
}}else{F.slideshow=undefined
}},E={init:H,name:"CN Pluck App - Slideshow"},D=function(){F.register(E)
};
D();
return{currentSlide:{},slideLevelReactions:false}
}(jQuery,CN,CN.pluck,CN.pluck.app,CN.debug));
var PluckAuthCommon=PkC=function(A){return{InjectWidgetCode:function(B){var C=new Array();
C.push('<div class="slauthDialogs">');
C.push('    <div id="dialog-form-login" title="LOGIN">');
C.push('        <div class="dialog-form-pleasewait" style="display:none;"><img src="images/lightbox-ico-loading.gif" /><p class="dialog-form-pleasewait-waitMessage">Please wait...</p></div>');
C.push('        <div class="dialog-form-message" style="display:none;"><span class="dialog-form-message-content">Success</span></div>');
C.push('        <div class="dialog-form-form">');
C.push('            <p class="validateTips">Please login below to continue.</p>');
C.push("            <fieldset>");
C.push('                <label for="email">Email</label>');
C.push('                <input type="text" name="email" id="loginEmail" value="" class="text ui-widget-content ui-corner-all" />');
C.push('                <label for="password">Password</label>');
C.push('                <input type="password" name="password" id="loginPassword" value="" class="text ui-widget-content ui-corner-all" />');
C.push("            </fieldset>");
C.push("        </div>");
C.push("    </div>");
C.push('    <div id="dialog-form-register" title="SIGN UP FOR COMMENTING">');
C.push('        <div class="dialog-form-pleasewait" style="display:none;"><img src="images/lightbox-ico-loading.gif" /><p class="dialog-form-pleasewait-waitMessage">Please wait...</p></div>');
C.push('        <div class="dialog-form-message" style="display:none;"><span class="dialog-form-message-content">Success</span></div>');
C.push('        <div class="dialog-form-form">');
C.push('            <p class="ModalDescription">Please fill out the registration form below.</p>');
C.push('            <div class="validateTips"><span>(<span class="requireField">*</span>) Required Fields</span></div>');
C.push("            <fieldset>");
C.push('                <label for="name"><span class="requireField">*</span> Display Name</label>');
C.push('                <input type="text" name="name" id="registerName" class="text ui-widget-content ui-corner-all" />');
C.push('                <label for="email"><span class="requireField">*</span> E-mail address</label>');
C.push('                <input type="text" name="email" id="registerEmail" value="" class="text ui-widget-content ui-corner-all" />');
C.push('                <label for="emailVerify"><span class="requireField">*</span> Confirm e-mail address</label>');
C.push('                <input type="text" name="emailVerify" id="registerEmailVerify" value="" class="text ui-widget-content ui-corner-all" />');
C.push('                <label for="password"><span class="requireField">*</span> Password</label>');
C.push('                <input type="password" name="password" id="registerPassword" value="" class="text ui-widget-content ui-corner-all" />');
C.push('                <label for="passwordVerify"><span class="requireField">*</span> Confirm password</label>');
C.push('                <input type="password" name="passwordVerify" id="registerPasswordVerify" value="" class="text ui-widget-content ui-corner-all" />');
C.push('                <input type="checkbox" name="tosCheckbox" id="registerTos" value="accepted"  class="text ui-widget-content ui-corner-all" />');
C.push('                <label for="tosCheckbox" class="tos-label"><span class="requireField">*</span> Registration on or use of this site constitutes acceptance of our <a href="#" class="user-agreement-link">User Agreement</a> and <a href="#" class="privacy-policy-link">Privacy Policy</a>.</label>');
C.push("            </fieldset>");
C.push("        </div>");
C.push("    </div>");
C.push('    <div id="dialog-form-password" title="CHANGE PASSWORD">');
C.push('        <div class="dialog-form-pleasewait" style="display:none;"><img src="images/lightbox-ico-loading.gif" /><p class="dialog-form-pleasewait-waitMessage">Please wait...</p></div>');
C.push('        <div class="dialog-form-message" style="display:none;"><span class="dialog-form-message-content">Success</span></div>');
C.push('        <div class="dialog-form-form">');
C.push('            <p class="validateTips">Enter your existing and new password below.</p>');
C.push("            <fieldset>");
C.push('                <label for="currentPassword"><span class="requireField">*</span>Current Password</label>');
C.push('                <input type="password" name="currentPassword" id="changePasswordCurrent" value="" class="text ui-widget-content ui-corner-all" />');
C.push('                <label for="newPassword"><span class="requireField">*</span>New Password</label>');
C.push('                <input type="password" name="newPassword" id="changePasswordNew" value="" class="text ui-widget-content ui-corner-all" />');
C.push('                <label for="newPasswordVerify"><span class="requireField">*</span>New Password Verfiy</label>');
C.push('                <input type="password" name="newPasswordVerify" id="changePasswordNewVerify" value="" class="text ui-widget-content ui-corner-all" />');
C.push("            </fieldset>");
C.push("        </div>");
C.push("    </div>");
C.push('    <div id="dialog-form-update" title="UPDATE INFORMATION">');
C.push('        <div class="dialog-form-pleasewait" style="display:none;"><img src="images/lightbox-ico-loading.gif" /><p class="dialog-form-pleasewait-waitMessage">Please wait...</p></div>');
C.push('        <div class="dialog-form-message" style="display:none;"><span class="dialog-form-message-content">Success</span></div>');
C.push('        <div class="dialog-form-form">');
C.push('            <p class="validateTips">Update your email and display name below.</p>');
C.push("            <fieldset>");
C.push('                <label for="displayName"><span class="requireField">*</span>Display Name</label>');
C.push('                <input type="text" name="displayName" id="updateDisplayName" value="" class="text ui-widget-content ui-corner-all" />');
C.push('                <label for="email"><span class="requireField">*</span>E-mail</label>');
C.push('                <input type="text" name="email" id="updateEmail" value="" class="text ui-widget-content ui-corner-all" />');
C.push('                <label for="emailVerify"><span class="requireField">*</span>Confirm e-mail</label>');
C.push('                <input type="text" name="emailVerify" id="updateEmailVerify" value="" class="text ui-widget-content ui-corner-all" />');
C.push("            </fieldset>");
C.push("        </div>");
C.push("    </div>");
C.push("</div><!-- End slauthDialogs -->");
A("#"+B).html(C.join(""));
A(PluckAuthCommon.ActivateWidget())
},ActivateWidget:function(){A("#dialog:ui-dialog").dialog("destroy");
var C=A("#registerName"),f=A("#registerEmail"),m=A("#registerEmailVerify"),X=A("#registerPassword"),R=A("#registerPasswordVerify"),D=A("#registerTos"),F=A("#loginEmail"),U=A("#loginPassword"),W=A("#changePasswordCurrent"),c=A("#changePasswordNew"),v=A("#changePasswordNewVerify"),L=A("#updateDisplayName"),Q=A("#updateEmail"),z=A("#updateEmailVerify"),h=A([]).add(C).add(f).add(X).add(m).add(R).add(D).add(F).add(U).add(W).add(c).add(v).add(L).add(Q).add(z),n=A(".validateTips"),AB=A("#dialog-form-login"),M=A("#dialog-form-register"),a=A("#dialog-form-password"),o=A("#dialog-form-update"),O=null,N="",H="",s="",e=new AA();
function AA(){var AC=[];
this.clear=function(){AC=[]
};
this.push=function(AD){return(AD.msg)?AC.push(AD):false
};
this.dump=function(){var AF=0,AE="<div class='pluck-slauth-validation-errors error-container'>",AD=AC.length;
for(;
AF<AD;
AF++){AE+="<div class='pluck-slauth-error'>"+AC[AF].msg+"</div>"
}AE+="</div>";
this.clear();
return(AD>0)?AE:""
}
}function w(AC){n.html(AC).addClass("ui-state-highlight");
setTimeout(function(){n.removeClass("ui-state-highlight",1500)
},500)
}function q(AD,AC){if(AD.val()!=AC.val()){AD.addClass("ui-state-error");
AC.addClass("ui-state-error");
e.push({msg:"E-mails must match."});
return false
}else{return true
}}function j(AD,AC){if(AD.val()!=AC.val()){AD.addClass("ui-state-error");
AC.addClass("ui-state-error");
e.push({msg:"Passwords must match."});
return false
}else{return true
}}function S(AC){if(AC.get(0).checked!=true){AC.addClass("ui-state-error");
e.push({msg:"You must accept the User Agreement and Privacy Policy."});
return false
}else{return true
}}function p(AE,AF,AD,AC){if(AE.val().length>AC||AE.val().length<AD){AE.addClass("ui-state-error");
e.push({msg:"Length of "+AF+" must be between "+AD+" and "+AC+"."});
return false
}else{return true
}}function r(AD,AC,AE){if(!(AC.test(AD.val()))){AD.addClass("ui-state-error");
e.push({msg:AE});
return false
}else{return true
}}function V(AE,AD,AC){A(".dialog-form-message-content",AE).html(AD);
A(".dialog-form-message",AE).show();
A(".dialog-form-pleasewait",AE).hide();
A(".dialog-form-form",AE).hide();
O=AE;
setTimeout(function(){O.dialog("close");
PluckAuthCommon.$pluckApp.resetDialog(O)
},AC)
}function E(AD,AC){A(".dialog-form-pleasewait-waitMessage",AD).html(AC);
A(".dialog-form-pleasewait",AD).show();
A(".dialog-form-message",AD).hide();
A(".dialog-form-form",AD).hide()
}function x(AC){if(typeof window.pluckSlauthCallbacks!="undefined"){for(var AD=0;
AD<window.pluckSlauthCallbacks.length;
AD++){if(window.pluckSlauthCallbacks[AD][0].toLowerCase()==AC.toLowerCase()){window.pluckSlauthCallbacks[AD][1]()
}}}}function P(AC){A(".pluck-slauthsdkwidget-signedin").hide();
A(".pluck-slauthsdkwidget-signedout").hide();
A(".pluck-slauthsdkwidget-"+AC).show()
}function K(){if(typeof window.pluckUseCookie!="undefined"){if(window.pluckUseCookie==true){N=PluckAuthCommon.GetPluckCookieValue("uid");
H=PluckAuthCommon.GetPluckCookieValue("name");
s=PluckAuthCommon.GetPluckCookieValue("email");
if(N!=null){A(".pluck-slauthsdkwidget-welcome-name").html(H);
P("signedin")
}else{P("signedout")
}x("SlauthLoaded")
}else{var AC=new PluckSDK.UserRequest();
AC.UserKey=new PluckSDK.UserKey();
AC.UserKey.Key="";
PluckSDK.SendRequests([AC],B)
}}}function B(AC){CN.debug.info("Pluck App Proxy",["Pluck Slauth",AC]);
if(AC[0].ResponseStatus.StatusCode==PluckSDK.ResponseStatusCode.OK){if(AC[0].User!=null){if(AC[0].User.UserKey.Key=="anonymous"){N="";
H="";
P("signedout")
}else{N=AC[0].User.UserKey.Key;
H=AC[0].User.DisplayName;
A(".pluck-slauthsdkwidget-welcome-name").html(H);
P("signedin")
}}else{P("signedout")
}}else{P("signedout")
}x("SlauthLoaded")
}function k(AF,AE,AD){E(M,"Please wait while we register your account...");
var AG=new PluckSDK.CreateSlauthUserActionRequest();
AG.DisplayName=AF.val();
AG.Email=AE.val();
AG.Password=AD.val();
var AC=new PluckSDK.AuthenticateSlauthUserRequest();
AC.Email=AE.val();
AC.Password=AD.val();
PluckSDK.SendRequests([AG,AC],b)
}function b(AC){CN.debug.info("Pluck App Proxy",["Pluck Slauth",AC]);
if(AC[0].ResponseStatus.StatusCode==PluckSDK.ResponseStatusCode.OK){if(AC[0].LiteUser!=null){N=AC[0].LiteUser.UserKey.Key;
H=AC[0].LiteUser.DisplayName;
if(AC[0].LiteUser.Email!=null){s=AC[0].LiteUser.Email
}A(".pluck-slauthsdkwidget-welcome-name").html(H)
}V(M,"You have successfully been registered and logged in.",1000);
P("signedin");
x("SlauthRegister")
}else{w("There was an error registering.");
PluckAuthCommon.$pluckApp.resetDialog(M)
}}function l(AD,AC){E(AB,"Please wait while we authenticate...");
var AE=new PluckSDK.AuthenticateSlauthUserRequest();
AE.Email=AD.val();
AE.Password=AC.val();
PluckSDK.SendRequests([AE],Z)
}function Z(AC){CN.debug.info("Pluck App Proxy",["Pluck Slauth",AC]);
if(AC[0].ResponseStatus.StatusCode==PluckSDK.ResponseStatusCode.OK){if(AC[0].LiteUser!=null){N=AC[0].LiteUser.UserKey.Key;
H=AC[0].LiteUser.DisplayName;
if(AC[0].LiteUser.Email!=null){s=AC[0].LiteUser.Email
}A(".pluck-slauthsdkwidget-welcome-name").html(H)
}V(AB,"You have successfully been logged in.",1000);
P("signedin");
x("SlauthLogin")
}else{w("There was an error logging in.");
PluckAuthCommon.$pluckApp.resetDialog(AB)
}}function u(AC){E(AB,"Please wait while we reset your password...");
var AD=new PluckSDK.ResetSlauthUserPasswordActionRequest();
AD.Email=AC.val();
PluckSDK.SendRequests([AD],g)
}function g(AC){CN.debug.info("Pluck App Proxy",["Pluck Slauth",AC]);
if(AC[0].ResponseStatus.StatusCode==PluckSDK.ResponseStatusCode.OK){V(AB,"Your new password has been emailed to you.",2000);
x("SlauthResetPassword")
}else{w("Email could not be found or there was an error.");
PluckAuthCommon.$pluckApp.resetDialog(AB)
}}function y(AD,AE){E(a,"Please wait while we change your password...");
var AC=new PluckSDK.ChangeSlauthUserPasswordActionRequest();
AC.OldPassword=AD.val();
AC.NewPassword=AE.val();
AC.UserKey=new PluckSDK.UserKey();
AC.UserKey.Key=N;
PluckSDK.SendRequests([AC],T)
}function T(AC){CN.debug.info("Pluck App Proxy",["Pluck Slauth",AC]);
if(AC[0].ResponseStatus.StatusCode==PluckSDK.ResponseStatusCode.OK){V(a,"Your password has been changed.",1500);
x("SlauthChangePassword")
}else{w("There was an error changing your password.");
PluckAuthCommon.$pluckApp.resetDialog(a)
}}function Y(AE,AD){E(o,"Please wait while we update your account...");
var AF=new PluckSDK.ChangeSlauthUserDisplayNameActionRequest();
AF.DisplayName=AE.val();
AF.UserKey=new PluckSDK.UserKey();
AF.UserKey.Key=N;
var AC=new PluckSDK.ChangeSlauthUserEmailActionRequest();
AC.Email=AD.val();
AC.UserKey=new PluckSDK.UserKey();
AC.UserKey.Key=N;
var AG=[];
AG.push(AF);
if(AD!=""){AG.push(AC)
}PluckSDK.SendRequests(AG,d)
}function d(AC){CN.debug.info("Pluck App Proxy",["Pluck Slauth",AC]);
if(AC[0].ResponseStatus.StatusCode==PluckSDK.ResponseStatusCode.OK){if(AC.length>1){if(AC[1].ResponseStatus.StatusCode==PluckSDK.ResponseStatusCode.OK){if(AC[1].LiteUser!=null){N=AC[0].LiteUser.UserKey.Key;
H=AC[0].LiteUser.DisplayName;
A(".pluck-slauthsdkwidget-welcome-name").html(H)
}V(o,"Your account information has been updated.",1500);
x("SlauthUpdate")
}else{w("There was an error updating your email.");
PluckAuthCommon.$pluckApp.resetDialog(o)
}}else{if(AC[0].LiteUser!=null){N=AC[0].LiteUser.UserKey.Key;
H=AC[0].LiteUser.DisplayName;
A(".pluck-slauthsdkwidget-welcome-name").html(H)
}V(o,"Your account information has been updated.",1500);
x("SlauthUpdate")
}}else{w("There was an error updating your displayname.");
PluckAuthCommon.$pluckApp.resetDialog(o)
}}function J(){PluckAuthCommon.setCookie("at","",-1,"/","."+CN.pluck.config.domain);
PluckAuthCommon.setCookie("AT","",-1,"/","."+CN.pluck.config.domain);
PluckAuthCommon.setCookie("hd","",-1,"/","."+CN.pluck.config.domain);
PluckAuthCommon.setCookie("HD","",-1,"/","."+CN.pluck.config.domain);
P("signedout");
x("SlauthLogout")
}AB.dialog({autoOpen:false,height:220,width:400,modal:true,buttons:{LOGIN:function(){var AC=true;
e=new AA();
h.removeClass("ui-state-error");
AC=p(F,"email",6,80)&&AC;
AC=p(U,"password",6,32)&&AC;
if(AC){l(F,U)
}else{w(e.dump())
}},CANCEL:function(){A(this).dialog("close")
},"FORGOT PASSWORD":function(){var AC=true;
e=new AA();
h.removeClass("ui-state-error");
AC=p(F,"email",6,80)&&AC;
if(AC){u(F)
}else{w(e.dump())
}}},close:function(){h.val("").removeClass("ui-state-error")
}});
M.dialog({autoOpen:false,height:350,width:450,modal:true,buttons:{REGISTER:function(){var AC=true;
e=new AA();
h.removeClass("ui-state-error");
AC=p(C,"display name",3,32)&&AC;
AC=r(C,/^([0-9a-zA-Z_])+$/i,"Username may consist of letters, numerals, and underscores, and it must begin with a letter.")&&AC;
AC=p(f,"email",6,80)&&AC;
AC=r(f,/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,"Please enter a valid email addres (eg. you@example.com)")&&AC;
AC=q(f,m)&&AC;
AC=p(X,"password",6,32)&&AC;
AC=j(X,R)&&AC;
AC=S(D)&&AC;
if(AC){k(C,f,X)
}else{w(e.dump())
}},CANCEL:function(){A(this).dialog("close")
}},close:function(){h.val("").removeClass("ui-state-error")
}});
a.dialog({autoOpen:false,height:220,width:400,modal:true,buttons:{CHANGE:function(){var AC=true;
e=new AA();
h.removeClass("ui-state-error");
AC=p(W,"current password",6,80)&&AC;
AC=p(c,"new password",6,32)&&AC;
AC=p(v,"new password confirm",6,32)&&AC;
AC=j(c,v)&&AC;
if(AC){y(W,c)
}else{w(e.dump())
}},CANCEL:function(){A(this).dialog("close")
}},close:function(){h.val("").removeClass("ui-state-error")
}});
o.dialog({autoOpen:false,height:220,width:400,modal:true,buttons:{UPDATE:function(){var AC=true;
e=new AA();
h.removeClass("ui-state-error");
AC=AC&&p(L,"display name",3,80);
if((Q!="")||(z!="")){AC=p(Q,"email",6,32)&&AC;
AC=p(z,"email confirm",6,32)&&AC;
AC=q(Q,z)&&AC
}if(AC){Y(L,Q)
}else{w(e.dump())
}},CANCEL:function(){A(this).dialog("close")
}},close:function(){h.val("").removeClass("ui-state-error")
}});
var G=[AB,M,a,o],I=A(G);
I.each(function(){A(this).parent('.ui-dialog[role="dialog"]').addClass("centered-dialog")
});
A(".pluck-slauthsdkwidget-signedout-login a").click(function(){PluckAuthCommon.$pluckApp.resetDialog(AB);
AB.dialog("open");
return false
});
A(".pluck-slauthsdkwidget-signedout-register a").click(function(){PluckAuthCommon.$pluckApp.resetDialog(M);
M.dialog("open");
return false
});
A(".pluck-slauthsdkwidget-signedin-changepassword a").click(function(){PluckAuthCommon.$pluckApp.resetDialog(a);
a.dialog("open");
return false
});
A(".pluck-slauthsdkwidget-signedin-update a").click(function(){PluckAuthCommon.$pluckApp.resetDialog(o);
if(typeof H!="undefined"){L.val(H)
}if(typeof s!="undefined"){Q.val(s);
z.val(s)
}o.dialog("open");
return false
});
A(".pluck-slauthsdkwidget-signedin-logout a").click(function(){J();
return false
});
K()
},isDefined:function(B){return(!(!(B||false)))
},querySt:function(B){qs=window.location.search.substring(1);
gy=qs.split("&");
for(i=0;
i<gy.length;
i++){ft=gy[i].split("=");
if(ft[0]==B){return ft[1]
}}return""
},trimIt:function(D){var D=D.replace(/^\s\s*/,""),B=/\s/,C=D.length;
while(B.test(D.charAt(--C))){}return D.slice(0,C+1)
},getCookieValue:function(B){var G=document.cookie.split(";");
var C="";
var E="";
var F="";
var D=false;
for(i=0;
i<G.length;
i++){C=G[i].split("=");
E=C[0].replace(/^\s+|\s+$/g,"");
if(E.toLowerCase()==B.toLowerCase()){D=true;
if(C.length>1){F=G[i].substring(G[i].indexOf("=")+1,G[i].length)
}return unescape(F);
break
}C=null;
E=""
}if(!D){return null
}},setCookie:function(D,F,B,I,E,H){var C=new Date();
C.setTime(C.getTime());
if(B){B=B*1000*60*60*24
}var G=new Date(C.getTime()+(B));
document.cookie=D+"="+escape(F)+((B)?";expires="+G.toGMTString():"")+((I)?";path="+I:"")+((E)?";domain="+E:"")+((H)?";secure":"")
},GetPluckCookieValue:function(E){if((PluckAuthCommon.getCookieValue("at")!=null)||(PluckAuthCommon.getCookieValue("AT")!=null)){var B=PluckAuthCommon.getCookieValue("at");
if(B==null){B=PluckAuthCommon.getCookieValue("AT")
}var F=B.split("&");
var C=0;
for(C=0;
C<F.length;
C++){var D=F[C].split("=");
switch(E){case"uid":if((D[0]=="u")&&(D.length>1)){return decodeURIComponent(D[1])
}break;
case"name":if((D[0]=="a")&&(D.length>1)){return decodeURIComponent(D[1])
}break;
case"email":if((D[0]=="e")&&(D.length>1)){return decodeURIComponent(D[1])
}break;
default:if((D[0]=="u")&&(D.length>1)){return decodeURIComponent(D[1])
}break
}}return null
}else{if((PluckAuthCommon.getCookieValue("hd")!=null)||(PluckAuthCommon.getCookieValue("HD")!=null)){var B=PluckAuthCommon.getCookieValue("hd");
if(B==null){B=PluckAuthCommon.getCookieValue("HD")
}var F=B.split("|");
switch(E){case"uid":return decodeURIComponent(F[0]);
break;
case"name":return decodeURIComponent(F[1]);
break;
case"email":return decodeURIComponent(F[3]);
break;
default:return decodeURIComponent(F[0]);
break
}return F[0]
}else{return null
}}}}
}(jQuery);
var PluckSlauth=function(A){return{RegisterCallback:function(C,B){if(typeof window.pluckSlauthCallbacks=="undefined"){window.pluckSlauthCallbacks=new Array()
}var D=[C,B];
window.pluckSlauthCallbacks.push(D)
},RenderWidget:function(C,F,D,B){if(typeof C=="undefined"){alert("You must provide the Server URL");
return 
}if(C.substr(-1)=="/"){C=C.substr(0,C.length-1)
}window.serverUrl=C;
var E=C.split(".");
if(E.length>=2){window.pluckBaseDomain=E[E.length-2]+"."+E[E.length-1]
}else{alert("Issue setting the domain from:"+C)
}if(typeof F=="undefined"){F=true
}window.pluckUseCookie=F;
if(typeof B=="undefined"){window.pluckPersonaPath=""
}else{window.pluckPersonaPath=B
}PluckSlauth.LoadSlauth(D)
},LoadSlauth:function(B){if((!(!document.getElementById(B)))&&(typeof PluckAuthCommon!="undefined")&&(typeof A!="undefined")){if((typeof A.ui!="undefined")){PluckAuthCommon.InjectWidgetCode(B)
}else{setTimeout('PluckSlauth.LoadSlauth("'+B+'");',150)
}}else{setTimeout('PluckSlauth.LoadSlauth("'+B+'");',150)
}}}
}(jQuery);
if(typeof CN==="undefined"||!CN){throw ("CN library is missing!")
}CN.mobile=CN.mobile||{};
CN.mobile=(function(F){var D={},B=navigator.userAgent.toLowerCase(),G={bcBlogObject:'object[id^=flashObj]:has(param[value*="brightcove"])',bcBlogEmbed:'embed[base*="brightcove"]'},A=function(I,H){return F("<audio/>").attr({controls:"controls",src:I}).addClass("audio")
},E=function(K){var M,I,J=F("file",F(K).find("song")[0]).text(),P='<div class="caption">'+F("name",F(K).find("song")[0]).text()+"</div>",N,L,O,H;
if(this.config){M=this.config
}else{M=this.context.config
}I=M.index;
N=A(J,M);
L=D[I];
H=L.parentNode;
if(!O.length){F(N).appendTo(D[I]).wrap('<div class="audio-container" />').parent().prepend(P)
}else{F(N).insertBefore(D[I]).wrap('<div class="audio-container" />').parent().prepend(P)
}return this
},C=function(H){if(!H.xml){return 
}F.ajax({url:H.xml,cache:true,context:{config:H},success:E})
};
return{init:function(){if(CN.mobile.detectDevicesSupported()){F("body").addClass("mobile")
}return this
},createHtml5Audios:function(M,K){var I=F("#"+M),L=I.next(),H=I.parent(),J={xml:K.flashvars.replace("xmlFile=",""),width:K.width,height:K.height,index:M};
D[M]=(!L.length)?H:L;
C(J);
return this
},removeFlashContent:function(){F("body.mobile  embed[type=application/x-shockwave-flash],body.mobile  object[type=application/x-shockwave-flash]").not(G.bcBlogObject+","+G.bcBlogEmbed).parent().remove();
return this
},removeSwf:function(I,H){I.remove();
F(window).trigger("CN.customEvents.swfRemoved");
CN.debug.info("swf object is removed",[H.src]);
return this
},removeIframeFlashContent:function(){F("body.mobile iframe[src^='/sandbox']").each(function(){var I=F(this)[0],H=I.contentWindow.document.body;
F(window).bind("CN.customEvents.swfRemoved",function(){CN.frame.resize(I);
F(window).unbind("CN.customEvents.swfRemoved")
});
CN.mobile.removeSwf(F(H.getElementsByTagName("embed"),H.getElementsByTagName("object")),I)
});
return this
},removeBlogVideos:function(){F(G.bcBlogObject).each(function(H){var I=jQuery(this).attr("id");
jQuery(this).attr("id",I+H);
CN.brightcove.mobile.init(jQuery(this).attr("id"))
});
F(G.bcBlogEmbed).each(function(H){CN.brightcove.mobile.embedBlogVideos(jQuery(this))
});
return this
},detectIPad:function(){return(B.search("ipad")>-1?true:false)
},detectIPhone:function(){return(B.search("iphone")>-1?true:false)
},detectBlackBerry:function(){return(B.search("blackberry")>-1?true:false)
},detectAndroid:function(){return((B.search("android")>-1||B.search("droid")>-1)?true:false)
},detectDevicesSupported:function(){return(CN.mobile.detectIPhone()||CN.mobile.detectIPad()||CN.mobile.detectBlackBerry()||CN.mobile.detectAndroid())
},updateOrientation:function(){F("body").removeClass((window.orientation===0)?"landscape":"portrait").addClass((window.orientation===0)?"portrait":"landscape")
}}
}(jQuery));
jQuery(document).ready(function(){CN.mobile.init().removeBlogVideos().removeFlashContent().removeIframeFlashContent()
});
CN.brightcove=CN.brightcove||{};
CN.brightcove.player=function(C){var Q="brightcovePlayer",H="videoscreen",N=document.location.href,O=(CN.page.config.reg.urls.base==="/")?"":CN.page.config.reg.urls.base,P="http://"+document.location.host+O+"/video.html",R={},J={},G={},D={},E={},B={},K="",U=jQuery,M={vid:C.videoId||"",pid:C.playerId||"",type:C.type||"",lineupId:C.lineupId||"",divID:C.id||"",width:C.width||"",height:C.height||"",publisherId:C.publisherId,token:C.token,continuousPlay:C.continuousPlay},F=function(Z){var V={},X,Y,W;
if(M.pid){X={bgcolor:"#FFFFFF",width:M.width,height:M.height,playerID:M.pid,publisherID:M.publisherId,wmode:"opaque",isVid:true,linkBaseURL:N,token:M.token,continuousPlay:M.continuousPlay};
W=(M.type==="single")?"myExperience"+M.divID:"myExperienceChannel"+M.divID;
Y="";
if(M.type==="single"){Y+='<object id="'+W+'" class="BrightcoveExperience"><param name="bgcolor" value="#FFFFFF" /><param name="width" value="'+X.width+'" /><param name="height" value="'+X.height+'" /><param name="playerID" value="'+M.pid+'" /><param name="publisherID" value="'+X.publisherID+'"/><param name="wmode" value="opaque" /><param name="isUI" value="true" /><param name="isVid" value="true" /><param name="dynamicStreaming" value="true" /><param name="videoSmoothing" value="true" /><param name="@videoPlayer" value="'+M.vid+'" /><param name="dynamicStreaming" value="true" /><param name="videoSmoothing" value="true" /><param name="linkBaseURL" value="'+N+'" /></object>'
}else{Y='<object id="'+W+'" class="BrightcoveExperience"><param name="bgcolor" value="'+X.bgcolor+'" /><param name="width" value="'+X.width+'" /><param name="height" value="'+X.height+'" /><param name="playerID" value="'+M.pid+'" /><param name="publisherID" value="'+X.publisherID+'"/><param name="wmode" value="opaque" /><param name="isUI" value="true" /><param name="isVid" value="true" /><param name="isUI" value="true" /><param name="linkBaseURL" value="'+N+'" /><param name="videoSmoothing" value="true" />';
if(Z!==""){Y+='<param name="@playlistTabs.featured" value="'+Z+'" />'
}if(M.vid!==""){Y+='<param name="@videoList.featured" value="'+M.vid+'" />'
}Y+="</object>"
}U("#"+M.divID).find("."+Q).html(Y);
if(CN.brightcove.mobile&&M.type!=="single"){CN.brightcove.mobile.init(W)
}CN.labjsBrightcove.wait(function(){brightcove.createExperiences()
})
}},T=function(V){E.setLink((M.type==="multi")?P+"?videoID="+J.getCurrentVideo().id:N)
},S=function(V){if(M.continuousPlay&&(Math.floor(V.duration)===Math.floor(V.position))){U(window).trigger("CN.customEvents.videoEnd")
}},L=function(V){var W=J.getCurrentVideo();
D.getVideoAsynch(W.id);
T(null)
},A=function(Y){var V,X,W;
V=Y.items;
for(X=V.length-1;
X>=0;
X--){for(W=0;
W<V[X].videoIds.length;
W++){if(V[X].videoIds[W].toString()===M.vid){K=V[X].id
}}}F(K)
},I=function(V){var W="http://api.brightcove.com/services/library?command=find_playlists_for_player_id&token="+encodeURIComponent(V.token||"")+"&player_id="+V.playerID+"&fields=videoIds,id,name&page_size=10&callback=?";
U.getJSON(W,A)
};
this.create=function(V){jQuery("#"+M.divID).find("."+Q).remove();
jQuery('<div class="'+Q+'"></div>').appendTo("#"+M.divID);
if(M.type==="multi"){I({playerID:M.pid,token:M.token})
}else{F(M.lineupId)
}};
this.initTemplate=function(V){R=brightcove.getExperience(V);
J=R.getModule(APIModules.VIDEO_PLAYER);
G=R.getModule(APIModules.EXPERIENCE);
D=R.getModule(APIModules.CONTENT);
E=R.getModule(APIModules.SOCIAL);
B=R.getModule(APIModules.MENU);
G.addEventListener(BCExperienceEvent.CONTENT_LOAD,L);
D.addEventListener(BCContentEvent.VIDEO_LOAD,T);
J.addEventListener(BCVideoEvent.VIDEO_LOAD,T);
J.addEventListener(BCVideoEvent.VIDEO_STOP,S)
}
};
CN.brightcove.manager=(function(B){var A={};
return{stack:A,render:function(E){var D=B("#"+E),C={publisherId:D.attr("data-publisherId"),token:D.attr("data-token"),videoId:D.attr("data-videoId"),playerId:D.attr("data-playerId"),type:D.attr("data-type"),lineupId:D.attr("data-lineupId"),width:D.attr("data-width"),height:D.attr("data-height"),id:E};
CN.brightcove.manager.stack[E]=new CN.brightcove.player(C);
CN.brightcove.manager.stack[E].create()
}}
}(jQuery));
function onTemplateLoaded(A){CN.brightcove.manager.stack[A].initTemplate(A)
}
/*
* @file cn.brightcove.list.js
* @author Vincent Lim Show Chen
* @copyright (c) Conde Nast Digital
*/
if(typeof CN==="undefined"||!CN||typeof jQuery==="undefined"||!jQuery){throw ("CN and/or jQuery library is missing!")
}CN.brightcove.list=(function(D){var B={hasFade:true,scrollDuration:500,scrollDistance:250},I=D('<div class="bc-list-nav-prev bc-list-nav"></div>'),J=D('<div class="bc-list-nav-next bc-list-nav" ></div>'),C=function(L){var K=L.position();
return K
},F=function(P,O,R){var N=C(P),Q=N.left,K=Q+R,L=(K>=O?true:false),M=(Q===0?true:false);
if(L){J.removeClass("disabled");
if(B.hasFade){D(".fade.fwd").removeClass("disabled")
}}else{J.addClass("disabled");
I.removeClass("disabled");
if(B.hasFade){D(".fade.fwd").addClass("disabled");
D(".fade.back").removeClass("disabled")
}}if(M){J.removeClass("disabled");
I.addClass("disabled");
if(B.hasFade){D(".fade.fwd").removeClass("disabled");
D(".fade.back").addClass("disabled")
}}else{I.removeClass("disabled");
if(B.hasFade){D(".fade.back").removeClass("disabled")
}}return this
},E=function(M,L,R,P,N){var O=C(M),K=O.left,Q=K+P,S=(Q>=R?true:false);
if(L==="right"&&S){M.animate({left:"-="+N+"px"},{queue:false,duration:B.scrollDuration,complete:function(){F(M,R,P)
}})
}if(L==="left"&&K<0){if(Math.abs(K)<N){N=Math.abs(K)
}M.animate({left:"+="+N+"px"},{queue:false,duration:B.scrollDuration,complete:function(){F(M,R,P)
}})
}},H=function(L,K,O){var M=jQuery(L).find(".active"),N;
if(M.length>0){N=M.position().left;
E(L,"right",K,O,N)
}},A=function(N,M,O){N.wrap('<div class="bc-list-scrollable"></div>');
N.wrap('<div class="bc-list-mask"></div>');
var K=N.parent().parent(),L=K.width();
I.prependTo(K).bind("click",{scrollDirection:"left",parentWidth:L},function(P){E(N,P.data.scrollDirection,P.data.parentWidth,O,B.scrollDistance)
});
J.appendTo(K).bind("click",{scrollDirection:"right",parentWidth:L},function(P){E(N,P.data.scrollDirection,P.data.parentWidth,O,B.scrollDistance)
});
if(B.hasFade===true){D('<div class="fade back"></div><div class="fade fwd"></div>').appendTo(K)
}N.width(O+25);
H(N,L,O);
F(N,L,O);
K.addClass("bc-list-scrollable-initialized")
},G=function(K){var P,S,R,M,O,Q,L,N;
jQuery(".cn_brightcove_list ul").each(function(T){jQuery(this).attr("class","cn_brightcove_list-"+T);
L=jQuery(this).attr("class");
O=D("."+L);
Q=D("."+L+" li");
M=0;
for(P=0,S=Q.length;
P<S;
P++){M=M+D(Q[P]).width()
}if(M>O.width()){A(O,L,M)
}});
return N
};
return{render:function(){var K=jQuery(".cn_brightcove_list"),L;
if(jQuery(K)){L=G("ul")
}}}
}(jQuery));
if(typeof CN==="undefined"||!CN||typeof jQuery==="undefined"||!jQuery){throw ("CN and/or jQuery library is missing!")
}CN.brightcove.carousel=(function(F){var E=CN.url.path()[CN.url.path().length-1].replace(".html",""),A=F(".cn_brightcove_carousel section"),G={},C,D=function(I){if(G.length>=1){var H=G.next();
H=(H.length>0)?H:A.first();
window.location=H.find(".headline a").attr("href")
}},B=function(){G=F(".cn_brightcove_carousel section.feature[data-videoid="+E+"]");
C=G.parent().parent().parent().attr("id");
G.find("img").addClass("active-thumb");
if(typeof C!=="undefined"&&C!==""){CN.features.types.carousel.getInstance(C).data("scrollable").seekTo(A.index(G))
}};
return{init:function(){if(F(".cn_brightcove_carousel").length>0){F(window).bind("CN.customEvents.videoEnd",D);
B()
}}}
}(jQuery));
if(typeof CN==="undefined"||!CN||typeof jQuery==="undefined"||!jQuery){throw ("CN and/or jQuery library is missing!")
}CN.brightcove=CN.brightcove||{};
CN.brightcove.mobile=(function(e){var a=true,O=0,T="http://api.brightcove.com/services/library",y={},x={},n={},o={},b={activetab:1},p="",w=(!CN.mobile.detectIPad())?3:6,l=5,q={},X=["email","link","add"],s=false,U={},S=0,h=0,W=0,H="standard",Q=(window.location.href.search("mobify.me")>-1||window.location.href.search("http://m.")>-1),D=(CN.page.config.reg.urls.base==="/")?"":CN.page.config.reg.urls.base,G=function(AA,z){return AA.children("param[name|="+z+"]").attr("value")
},u=function(AC,AB,AA,AF){var AE,z,AD,AG="handleJSONResponseForID"+new Date().getTime();
if(AF.indexOf("cplayer")===-1&&AF.indexOf("myExperienceChannel")===-1){if(AF.indexOf("videoplayer")>-1){S=300;
h=260
}else{S=460;
h=390
}AE=(AB.indexOf("ref:")!==-1)?T+"?command=find_video_by_reference_id&media_delivery=http&reference_id="+AB.substring(4)+"&fields=name,renditions&token="+encodeURIComponent(AA):T+"?command=find_video_by_id&media_delivery=http&video_id="+AB+"&token="+encodeURIComponent(AA)+"&callback=?";
e.ajax({type:"GET",cache:false,dataType:"jsonp",glabal:false,url:AE,context:{playerID:AC,strObjID:AF,videoWidth:S,videoHeight:h},success:c})
}else{if(!CN.mobile.detectIPad()){e("#videoscreen").hide()
}S=(CN.brightcove.mobilechannelwidth!==undefined)?CN.brightcove.mobilechannelwidth:640;
h=(CN.brightcove.mobilechannelheight!==undefined)?CN.brightcove.mobilechannelheight:360;
e(window).bind("CN.customEvents.playlistCreated",function(AI,AH){d(AH)
});
AE=T+"?command=find_playlists_for_player_id&sort_by=publish_date&sort_order=ASC&media_delivery=http&player_id="+AC+"&token="+encodeURIComponent(AA)+"&callback=?";
e.getJSON(AE,function(AH){v(AH,AC,AF,AB)
});
if(H==="custom"){V(AB)
}CN.dart.refresh()
}O=S
},P=function(AA){var AB="",AC=e("#"+AA),z="";
if(AA.indexOf("myExperience")>-1){AB=G(AC,"playerID")
}else{if(AA.indexOf("flashObj")>-1){AB=CN.utils.parseStr(G(AC,"flashVars"),"query")["playerID"]
}else{if(AA.indexOf("cplayer")>-1){AB=CN.site.channelplayerId
}else{AB=CN.site.oneclipplayerId
}}}if(AA.indexOf("myExperience")>-1){if(AA.indexOf("myExperienceChannel")>-1){if(G(AC,"@videoList.featured")){z=G(AC,"@videoList.featured")
}else{z=""
}}else{z=G(AC,"@videoPlayer")
}}else{if(AA.indexOf("flashObj")>-1){z=CN.utils.parseStr(G(AC,"flashVars"),"query")["@videoPlayer"]
}else{if(AA.indexOf("cplayer")>-1){z=e("div").filter("div.video-content").attr("id").replace("content_","")
}else{z=AA.split("_")[AA.split("_").length-1]||""
}}}H=(AA.indexOf("cplayer")>-1)?"custom":"standard";
BCReadAPIToken=CN.site.videoReadToken;
G(AC,"flashvars");
if(AB===null||typeof AB==="undefined"){return false
}n=AC.next();
o=AC.parent();
y[AA]=(!n.length)?o:n;
AC.remove();
u(AB,z,BCReadAPIToken,AA)
},r=function(z){e("<img/>").attr({src:"images/videos/channel/images/share.png",width:53,height:16,border:0,id:"share"}).appendTo(e("<div/>").attr("id","share").appendTo(".video-utilities"))
},c=function(AA){var z=(this.playerID)?this:this.context;
g(AA,z.playerID,z.strObjID,z.videoWidth,z.videoHeight)
},N=function(z){var AC=[],AA=[],AB;
if(z&&z.keywords){if(e.isArray(z.keywords.keyword)){AC=z.keywords.keyword
}else{AC.push(z.keywords.keyword)
}for(AB=0;
AB<AC.length;
AB++){if(AC[AB].visible==="Y"){AA.push(AC[AB].word)
}}}return AA||[]
},V=function(z){var AA="/services/ajax?videoId="+z;
e.ajax({url:AA,type:"GET",dataType:"json",success:function(AM){if(AM.mainContent.video_v2===undefined){CN.brightcove.updateMetaData(U.name||"","","","","",U.longDescription||"","","",(U.tags.length>0)?U.tags:[],"",{})
}else{s=true;
var AD=AM.mainContent.video_v2,AE=CN.schemaParser.getInstance().parse(AD),AG=(AD.header&&AD.header.html)?AD.html.text:"",AH=AE.subHeaders()||"",AB=AE.rubric()||"",AN=AD.videoFile.caption||"",AJ=AE.bodyLead()||"",AL=AE.bodyText()||"",AC=(AD.footer&&AD.footer.text)?AD.footer.text:"",AK=AD.videoFile.credit||"",AF=N(AD.metaData),AI=AE.bodyIntroduction()||"",AO=AD.unitMetaData||{};
CN.brightcove.updateMetaData(AG,AH,AB,AN,AJ,AL,AC,AK,AF,AI,AO)
}}})
},d=function(z){e("#features-tab-"+z.tab+" li.see-more a.next").live("click",function(){L(z);
return false
})
},K=function(z){var AA=e("#features-tab-"+z+" li.see-more");
AA.siblings().not(".firstten").toggle(400);
e("a",AA).text((e("#features-tab-"+z+" li.see-more a").text().indexOf("see more")>-1)?"x close":"see more")
},M=function(AE,AA,AD,z){var AC,AB;
for(AC=0;
AC<AE.items.length;
AC++){for(AB=0;
AB<AE.items[AC].videos.length;
AB++){if(parseInt(z,10)===parseInt(AE.items[AC].videos[AB].id,10)){b.activetab=AC+1;
b.dto=AE.items[AC].videos[AB];
U=b.dto;
break
}}}g(b.dto,AA,AD);
C(AE,z);
if(!s&&H==="custom"){CN.brightcove.updateMetaData(U.name||"","","","","",U.longDescription||"","","",(U.tags.length>0)?U.tags:[],"",{})
}},v=function(AC,AA,AB,z){if(z===""){g(AC.items[0].videos[0],AA,AB);
C(AC,z);
U=AC.items[0].videos[0]
}else{M(AC,AA,AB,z)
}},Y=function(AB,z,AC){var AA;
for(AA=0;
AA<AB.length;
AA++){if(parseInt(z,10)===parseInt(AB[AA].id,10)){W=(AA%l>0)?parseInt(AA/l,10)+1:0
}}},m=function(AC,AB,AA){var AH="",AD,AI=2,AJ=1,AG=(AC.length<=l?AC.length:l),z={tab:AA,id:AB,dto:AC,start:0,end:parseInt(AG-1,10)},AE,AF;
for(AE=0;
AE<AG;
AE++){AF=(parseInt(AB,10)===parseInt(AC[AE].id,10))?"active":"";
AD=(Q)?(CN.mobile.detectIPad())?D+"/video.html?videoID="+AC[AE].id:A(AC[AE]):D+"/video.html?videoID="+AC[AE].id;
AF=(AE<=parseInt(l-1,10))?((AF!=="")?AF+" firstten":"firstten"):AF;
AH=AH+((AE===0?"<ol>":"")+'<li class="'+AF+"\"><a href='"+AD+"'><img src=\""+AC[AE].thumbnailURL+'" width="120" height="67" border="0" /></a><a href=\''+AD+"'>"+AC[AE].name+"</a></li>");
if(AE===parseInt(AG-1,10)){AH=(AC.length>parseInt(AG,10))?AH+"<li class='see-more'><a href='#' class='previous'>< previous</a><a href='#' class='next'>next ></a></li></ol>":AH+"</ol>"
}}if(AC.length>l){e(window).trigger("CN.customEvents.playlistCreated",[z])
}return AH
},R=function(AD,AG,z,AE,AF){var AA=e("#features-tab-"+AD+" li.see-more"),AB=(AE>z+l?z+l:AE),AC=AA.siblings().length;
AA.siblings().css("display","none").slice(AG,z).css("display","block");
e("a.previous",AA).unbind("click");
if(AG===0){e("a.previous",AA).css("display","none");
e("a.next",AA).css("display","block")
}else{if(z===AE){e("a.previous",AA).css("display","block").bind("click",function(){j(AD,AG-l,AG,AE,AF);
return false
});
e("a.next",AA).css("display","none")
}else{e("a.previous",AA).css("display","block").bind("click",function(){j(AD,AG-l,AG,AE,AF);
return false
});
e("a.next",AA).css("display","block")
}}if(AC>=AB){e("a.next",AA).unbind("click").bind("click",function(){j(AD,AG+l,AB,AE,AF);
return false
})
}else{e("a.next",AA).unbind("click");
e("#features-tab-"+AD+" li.see-more a.next").bind("click",function(){L(AF);
return false
})
}},j=R,L=function(AC){var AF=AC.end,AG,AH,AI="",AE,AD=AC.dto,AA=AC.id,AB=AC.tab,z=parseInt(AC.end+1,10),AJ=(AD.length-1>parseInt(z+l-1,10)?parseInt(z+l-1,10):AD.length-1);
for(AG=AF+1;
AG<=AJ;
AG++){AH=(parseInt(AA,10)===parseInt(AD[AG].id,10))?" class=active":"";
AE=(Q)?(CN.mobile.detectIPad())?D+"/video.html?videoID="+AD[AG].id:A(AD[AG]):D+"/video.html?videoID="+AD[AG].id;
AI=AI+((AG===0?"<ol>":"")+"<li"+AH+"><a href='"+AE+"'><img src=\""+AD[AG].thumbnailURL+'" width="120" height="67" border="0" /></a><a href=\''+AE+"'>"+AD[AG].name+"</a></li>")
}e(AI).insertBefore(e("#features-tab-"+AC.tab+" div.tab-content ol li.see-more"));
AC.start=z;
AC.end=AJ;
R(AC.tab,z,AJ+1,AD.length,AC)
},k=function(AC,z){var AA,AB;
e('<div class="feature share-module"/>').appendTo(e(".player"));
for(AA=0;
AA<AC.length;
AA++){AB=parseInt(AA+1,10).toString();
e('<h3 class="tab" id="tab-'+AC[AA]+'">'+AC[AA]+'</h3><div id="'+AC[AA]+'">my content</div>').appendTo(e(".feature.share-module"))
}e("div.share-module").tab().addClass("sharemodule-ready");
e(window).trigger("CN.customEvents.shareModuleCreated")
},C=function(AC,z){var AD=e('<div class="features tabs playlist"><div class="feature feature-tabs"></div></div>').insertAfter(e(".player")),AA,AB;
for(AA=0;
AA<AC.items.length;
AA++){AB=parseInt(AA+1,10).toString();
e('<h2 class="tab" id="features-tab-'+AB+'">'+AC.items[AA].name+'</h2><div class="tab-content">'+m(AC.items[AA].videos,z,AB)+"</div>").appendTo(e(".playlist .feature-tabs"));
if(b.activetab===AB){Y(AC.items[AA].videos,z,AB)
}}e(function(){try{e("div.tabs.playlist").addClass("tabs-initialized");
e("div.features.playlist").find("div.feature-tabs").tab(b.activetab);
var AF=e(".playlist > div.feature-tabs > ul > li"),AE=e(".playlist > div.feature-tabs > ul").width()-parseInt(e(AF[0]).css("margin-right"),10)*AF.length,AH=AE/AF.length;
AF.each(function(AI){if(AI>w-1){e(this).addClass("hidetab")
}});
if(AC.items.length>w){F(AC,z);
I(AC)
}for(AA=1;
AA<W;
AA++){e("#features-tab-"+b.activetab+" li.see-more a.next").trigger("click")
}e(window).trigger("CN.customEvents.channelPlayerCreated")
}catch(AG){CN.debug.error("Error setting up tabs features. Perhaps the defaultTab index is not 1-based, or the jQuery tab plugin is not available.")
}})
},J=function(){e("div#more-list").removeClass("showtab").addClass("hidetab")
},Z=function(){e("div#more-list").removeClass("hidetab").addClass("showtab")
},F=function(AC,z){var AB='<li id="closemenu"><a href="#">x close</a></li>',AA;
for(AA=0;
AA<AC.items.length;
AA++){AB=AB+'<li class="more-'+parseInt(AA+1,10)+'"><a href="#">'+AC.items[AA].name+"</a></li>"
}e('<div id="more-list"><ol>'+AB+"</ol>").appendTo(".playlist .feature.feature-tabs").addClass("hidetab");
e('<li id="more-menu"><a href="#">more videos</a></li>').appendTo(".playlist .tab-list");
e("li#more-menu").bind("mouseover click",function(){Z();
e("div#more-list, li#more-menu").live("mouseover",function(){Z();
e("li#more-menu").unbind("mouseover click");
e("div#more-list").live("mouseout",function(){J();
e("li#more-menu").bind("mouseover click",Z)
})
})
});
e("ul.tab-list li").not("ul.tab-list li#more-menu").bind("mouseover",J);
e("div#more-list a").not("#closemenu a").click(function(){b.activetab=e(this).parent().attr("class").split("-")[1];
e("li#tab-features-tab-"+b.activetab+" a").trigger("click");
I(AC);
return false
});
e(".playlist a").not(".playlist #more-menu a").click(J);
e(".playlist #closemenu a").click(function(){J();
return false
})
},I=function(AB){var AA=0,z;
e("ul.tab-list li[id^=tab-features-tab]").removeClass("showtab").addClass("hidetab");
for(z=b.activetab;
z>=1;
z--){if(AA<w){e("li#tab-features-tab-"+z).removeClass("hidetab").addClass("showtab");
AA++
}}for(z=b.activetab;
z<=AB.items.length;
z++){if(AA<w){e("li#tab-features-tab-"+z).removeClass("hidetab").addClass("showtab");
AA++
}}return this
},f=function(z){return(CN.mobile.detectBlackBerry())?e(e("<a href='"+z.bestRenditionURL+"'></a>")).append(e(e("<img/>").attr({src:z.vidStillURL,width:z.vidWidth,height:z.vidHeight,border:0}))):e("<video/>").attr({poster:z.vidStillURL,width:z.vidWidth,height:z.vidHeight,controls:"controls",src:z.bestRenditionURL})
},E=function(){e("#videoscreen").show()
},A=function(AD){var AC=AD.renditions,AB=-1,z=-1,AA;
for(AA=0;
AA<AC.length;
AA=AA+1){if(AC[AA].videoCodec==="H264"){if(AB===-1){AB=AA;
z=AC[AA].encodingRate
}else{if(((Math.abs(AC[AA].encodingRate-256000)<=Math.abs(z-256000))?AC[AA].encodingRate:z)===AC[AA].encodingRate){AB=AA;
z=AC[AA].encodingRate
}}}}return(AB===-1)?AD.videoFullLength.url:AC[AB].url
},B=function(AA,z){return(Math.abs(AA-O)>0&&(Math.abs(AA-O)<=Math.abs(z-O))?AA:z)
},g=function(AA,AI,AD){var AG=AA.renditions,AF,AK,AB,z,AH=-1,AJ=-1,AC,AE;
for(AC=0;
AC<AG.length;
AC=AC+1){if(AG[AC].videoCodec==="H264"){if(AH===-1){AH=AC;
AJ=AG[AC].frameWidth
}else{if(B(AG[AC].frameWidth,AJ)===AG[AC].frameWidth){AH=AC;
AJ=AG[AC].frameWidth
}}}}z=(AH===-1)?AA.videoFullLength:AG[AH];
q={bestRenditionURL:z.url,vidName:AA.name,vidHeight:h,vidWidth:S,vidStillURL:AA.videoStillURL};
AF=f(q);
AB=y[AD];
AK=AB.parentNode;
if(!n.length){e(AF).appendTo(y[AD]).wrap('<div class="player-container" />').end().wrap('<div class="player"/>')
}else{e(AF).insertBefore(y[AD]).wrap('<div class="player-container" />').end().wrap('<div class="player"/>')
}if(CN.brightcove.videoheader!==undefined){AE=e("<h1>"+q.vidName+"</h1>");
if(CN.brightcove.videoheader==="top"){AE.insertBefore(e(".player"))
}else{AE.appendTo(e(".player-container"))
}}e(window).bind("CN.customEvents.channelPlayerCreated",E)
};
return{init:function(z){if(!CN.mobile.detectDevicesSupported()){return 
}P(z.id||z)
},embedBlogVideos:function(AC){if(!CN.mobile.detectDevicesSupported()){return 
}var AD=CN.utils.parseStr(AC.attr("flashvars"),"query"),AA=AD["@videoPlayer"]||AD.videoId,AE=460,z=360,AB=AD.playerID||AD.playerId;
p="MyExperience"+AA;
AC.attr("id","MyExperience"+AA);
n=AC.next();
o=AC.parent();
y[p]=(!n.length)?o:n;
AC.remove();
u(AB,AA,CN.site.videoReadToken,p)
}}
}(jQuery));
(function(g,K,w){var h={transition:"elastic",speed:300,width:false,initialWidth:"600",innerWidth:false,maxWidth:false,height:false,initialHeight:"450",innerHeight:false,maxHeight:false,scalePhotos:true,scrolling:true,inline:false,html:false,iframe:false,fastIframe:true,photo:false,href:false,title:false,rel:false,opacity:0.9,preloading:true,current:"image {current} of {total}",previous:"previous",next:"next",close:"close",open:false,returnFocus:true,loop:true,slideshow:false,slideshowAuto:true,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",onOpen:false,onLoad:false,onComplete:false,onCleanup:false,onClosed:false,overlayClose:true,escKey:true,arrowKey:true,top:false,bottom:false,left:false,right:false,fixed:false,data:false},V="colorbox",r="cbox",P=r+"Element",v=r+"_open",E=r+"_load",u=r+"_complete",S=r+"_cleanup",AB=r+"_closed",I=r+"_purge",T=g.browser.msie&&!g.support.opacity,AD=T&&g.browser.version<7,AA=r+"_IE6",p,AE,AF,D,e,O,B,o,C,z,l,J,H,N,R,x,Q,q,X,Z,AC,AG,L,G,A,U,f,M,b,y,k,d,Y,j;
function n(AJ,AH,AI){AI=K.createElement("div");
if(AJ){AI.id=r+AJ
}AI.style.cssText=AH||"";
return g(AI)
}function m(AH,AI){return Math.round((/%/.test(AH)?((AI==="x"?z.width():z.height())/100):1)*parseInt(AH,10))
}function a(AH){return AC.photo||/\.(gif|png|jpg|jpeg|bmp)(?:\?([^#]*))?(?:#(\.*))?$/i.test(AH)
}function s(AH){AC=g.extend({},g.data(U,V));
for(AH in AC){if(g.isFunction(AC[AH])&&AH.substring(0,2)!=="on"){AC[AH]=AC[AH].call(U)
}}AC.rel=AC.rel||U.rel||"nofollow";
AC.href=AC.href||g(U).attr("href");
AC.title=AC.title||U.title;
if(typeof AC.href==="string"){AC.href=g.trim(AC.href)
}}function c(AH,AI){if(AI){AI.call(U)
}g.event.trigger(AH)
}function W(){var AI,AK=r+"Slideshow_",AL="click."+r,AM,AJ,AH;
if(AC.slideshow&&C[1]){AM=function(){x.text(AC.slideshowStop).unbind(AL).bind(u,function(){if(f<C.length-1||AC.loop){AI=setTimeout(j.next,AC.slideshowSpeed)
}}).bind(E,function(){clearTimeout(AI)
}).one(AL+" "+S,AJ);
AE.removeClass(AK+"off").addClass(AK+"on");
AI=setTimeout(j.next,AC.slideshowSpeed)
};
AJ=function(){clearTimeout(AI);
x.text(AC.slideshowStart).unbind([u,E,S,AL].join(" ")).one(AL,AM);
AE.removeClass(AK+"on").addClass(AK+"off")
};
if(AC.slideshowAuto){AM()
}else{AJ()
}}else{AE.removeClass(AK+"off "+AK+"on")
}}function F(AI){if(!k){U=AI;
s();
C=g(U);
f=0;
if(AC.rel!=="nofollow"){C=g("."+P).filter(function(){var AJ=g.data(this,V).rel||this.rel;
return(AJ===AC.rel)
});
f=C.index(U);
if(f===-1){C=C.add(U);
f=C.length-1
}}if(!b){b=y=true;
AE.show();
if(AC.returnFocus){try{U.blur();
g(U).one(AB,function(){try{this.focus()
}catch(AJ){}})
}catch(AH){}}p.css({opacity:+AC.opacity,cursor:AC.overlayClose?"pointer":"auto"}).show();
AC.w=m(AC.initialWidth,"x");
AC.h=m(AC.initialHeight,"y");
j.position();
if(AD){z.bind("resize."+AA+" scroll."+AA,function(){p.css({width:z.width(),height:z.height(),top:z.scrollTop(),left:z.scrollLeft()})
}).trigger("resize."+AA)
}c(v,AC.onOpen);
Z.add(N).hide();
X.html(AC.close).show()
}j.load(true)
}}j=g.fn[V]=g[V]=function(AH,AJ){var AI=this;
AH=AH||{};
if(!AI[0]){if(AI.selector){return AI
}AI=g("<a/>");
AH.open=true
}if(AJ){AH.onComplete=AJ
}AI.each(function(){g.data(this,V,g.extend({},g.data(this,V)||h,AH));
g(this).addClass(P)
});
if((g.isFunction(AH.open)&&AH.open.call(AI))||AH.open){F(AI[0])
}return AI
};
j.init=function(){z=g(w);
AE=n().attr({id:V,"class":T?r+(AD?"IE6":"IE"):""});
p=n("Overlay",AD?"position:absolute":"").hide();
AF=n("Wrapper");
D=n("Content").append(l=n("LoadedContent","width:0; height:0; overflow:hidden"),H=n("LoadingOverlay").add(n("LoadingGraphic")),N=n("Title"),R=n("Current"),Q=n("Next"),q=n("Previous"),x=n("Slideshow").bind(v,W),X=n("Close"));
AF.append(n().append(n("TopLeft"),e=n("TopCenter"),n("TopRight")),n(false,"clear:left").append(O=n("MiddleLeft"),D,B=n("MiddleRight")),n(false,"clear:left").append(n("BottomLeft"),o=n("BottomCenter"),n("BottomRight"))).children().children().css({"float":"left"});
J=n(false,"position:absolute; width:9999px; visibility:hidden; display:none");
g("body").prepend(p,AE.append(AF,J));
D.children().hover(function(){g(this).addClass("hover")
},function(){g(this).removeClass("hover")
}).addClass("hover");
AG=e.height()+o.height()+D.outerHeight(true)-D.height();
L=O.width()+B.width()+D.outerWidth(true)-D.width();
G=l.outerHeight(true);
A=l.outerWidth(true);
AE.css({"padding-bottom":AG,"padding-right":L}).hide();
Q.click(function(){j.next()
});
q.click(function(){j.prev()
});
X.click(function(){j.close()
});
Z=Q.add(q).add(R).add(x);
D.children().removeClass("hover");
p.click(function(){if(AC.overlayClose){j.close()
}});
g(K).bind("keydown."+r,function(AI){var AH=AI.keyCode;
if(b&&AC.escKey&&AH===27){AI.preventDefault();
j.close()
}if(b&&AC.arrowKey&&C[1]){if(AH===37){AI.preventDefault();
q.click()
}else{if(AH===39){AI.preventDefault();
Q.click()
}}}})
};
j.remove=function(){AE.add(p).remove();
g("."+P).removeData(V).removeClass(P)
};
j.position=function(AI,AH){var AK=0,AJ=0;
z.unbind("resize."+r);
AE.hide();
if(AC.fixed&&!AD){AE.css({position:"fixed"})
}else{AK=z.scrollTop();
AJ=z.scrollLeft();
AE.css({position:"absolute"})
}if(AC.right!==false){AJ+=Math.max(z.width()-AC.w-A-L-m(AC.right,"x"),0)
}else{if(AC.left!==false){AJ+=m(AC.left,"x")
}else{AJ+=Math.round(Math.max(z.width()-AC.w-A-L,0)/2)
}}if(AC.bottom!==false){AK+=Math.max(K.documentElement.clientHeight-AC.h-G-AG-m(AC.bottom,"y"),0)
}else{if(AC.top!==false){AK+=m(AC.top,"y")
}else{AK+=Math.round(Math.max(K.documentElement.clientHeight-AC.h-G-AG,0)/2)
}}AE.show();
AI=(AE.width()===AC.w+A&&AE.height()===AC.h+G)?0:AI||0;
AF[0].style.width=AF[0].style.height="9999px";
function AL(AM){e[0].style.width=o[0].style.width=D[0].style.width=AM.style.width;
H[0].style.height=H[1].style.height=D[0].style.height=O[0].style.height=B[0].style.height=AM.style.height
}AE.dequeue().animate({width:AC.w+A,height:AC.h+G,top:AK,left:AJ},{duration:AI,complete:function(){AL(this);
y=false;
AF[0].style.width=(AC.w+A+L)+"px";
AF[0].style.height=(AC.h+G+AG)+"px";
if(AH){AH()
}setTimeout(function(){z.bind("resize."+r,j.position)
},1)
},step:function(){AL(this)
}})
};
j.resize=function(AH){if(b){AH=AH||{};
if(AH.width){AC.w=m(AH.width,"x")-A-L
}if(AH.innerWidth){AC.w=m(AH.innerWidth,"x")
}l.css({width:AC.w});
if(AH.height){AC.h=m(AH.height,"y")-G-AG
}if(AH.innerHeight){AC.h=m(AH.innerHeight,"y")
}if(!AH.innerHeight&&!AH.height){var AI=l.wrapInner("<div style='overflow:auto'></div>").children();
AC.h=AI.height();
AI.replaceWith(AI.children())
}l.css({height:AC.h});
j.position(AC.transition==="none"?0:AC.speed)
}};
j.prep=function(AI){if(!b){return 
}var AL,AJ=AC.transition==="none"?0:AC.speed;
l.remove();
l=n("LoadedContent").append(AI);
function AH(){AC.w=AC.w||l.width();
AC.w=AC.mw&&AC.mw<AC.w?AC.mw:AC.w;
return AC.w
}function AK(){AC.h=AC.h||l.height();
AC.h=AC.mh&&AC.mh<AC.h?AC.mh:AC.h;
return AC.h
}l.hide().appendTo(J.show()).css({width:AH(),overflow:AC.scrolling?"auto":"hidden"}).css({height:AK()}).prependTo(D);
J.hide();
g(M).css({"float":"none"});
if(AD){g("select").not(AE.find("select")).filter(function(){return this.style.visibility!=="hidden"
}).css({visibility:"hidden"}).one(S,function(){this.style.visibility="inherit"
})
}AL=function(){var AR,AT,AP,AO,AQ=C.length,AN,AM;
if(!b){return 
}function AS(){if(T){AE[0].style.removeAttribute("filter")
}}AM=function(){clearTimeout(Y);
H.hide();
c(u,AC.onComplete)
};
if(T){if(M){l.fadeIn(100)
}}N.html(AC.title).add(l).show();
if(AQ>1){if(typeof AC.current==="string"){R.html(AC.current.replace("{current}",f+1).replace("{total}",AQ)).show()
}Q[(AC.loop||f<AQ-1)?"show":"hide"]().html(AC.next);
q[(AC.loop||f)?"show":"hide"]().html(AC.previous);
AR=f?C[f-1]:C[AQ-1];
AP=f<AQ-1?C[f+1]:C[0];
if(AC.slideshow){x.show()
}if(AC.preloading){AO=g.data(AP,V).href||AP.href;
AT=g.data(AR,V).href||AR.href;
AO=g.isFunction(AO)?AO.call(AP):AO;
AT=g.isFunction(AT)?AT.call(AR):AT;
if(a(AO)){g("<img/>")[0].src=AO
}if(a(AT)){g("<img/>")[0].src=AT
}}}else{Z.hide()
}if(AC.iframe){AN=g("<iframe/>").addClass(r+"Iframe")[0];
if(AC.fastIframe){AM()
}else{g(AN).one("load",AM)
}AN.name=r+(+new Date());
AN.src=AC.href;
if(!AC.scrolling){AN.scrolling="no"
}if(T){AN.frameBorder=0;
AN.allowTransparency="true"
}g(AN).appendTo(l).one(I,function(){AN.src="//about:blank"
})
}else{AM()
}if(AC.transition==="fade"){AE.fadeTo(AJ,1,AS)
}else{AS()
}};
if(AC.transition==="fade"){AE.fadeTo(AJ,0,function(){j.position(0,AL)
})
}else{j.position(AJ,AL)
}};
j.load=function(AJ){var AI,AK,AH=j.prep;
y=true;
M=false;
U=C[f];
if(!AJ){s()
}c(I);
c(E,AC.onLoad);
AC.h=AC.height?m(AC.height,"y")-G-AG:AC.innerHeight&&m(AC.innerHeight,"y");
AC.w=AC.width?m(AC.width,"x")-A-L:AC.innerWidth&&m(AC.innerWidth,"x");
AC.mw=AC.w;
AC.mh=AC.h;
if(AC.maxWidth){AC.mw=m(AC.maxWidth,"x")-A-L;
AC.mw=AC.w&&AC.w<AC.mw?AC.w:AC.mw
}if(AC.maxHeight){AC.mh=m(AC.maxHeight,"y")-G-AG;
AC.mh=AC.h&&AC.h<AC.mh?AC.h:AC.mh
}AI=AC.href;
Y=setTimeout(function(){H.show()
},100);
if(AC.inline){n().hide().insertBefore(g(AI)[0]).one(I,function(){g(this).replaceWith(l.children())
});
AH(g(AI))
}else{if(AC.iframe){AH(" ")
}else{if(AC.html){AH(AC.html)
}else{if(a(AI)){g(M=new Image()).addClass(r+"Photo").error(function(){AC.title=false;
AH(n("Error").text("This image could not be loaded"))
}).load(function(){var AL;
M.onload=null;
if(AC.scalePhotos){AK=function(){M.height-=M.height*AL;
M.width-=M.width*AL
};
if(AC.mw&&M.width>AC.mw){AL=(M.width-AC.mw)/M.width;
AK()
}if(AC.mh&&M.height>AC.mh){AL=(M.height-AC.mh)/M.height;
AK()
}}if(AC.h){M.style.marginTop=Math.max(AC.h-M.height,0)/2+"px"
}if(C[1]&&(f<C.length-1||AC.loop)){M.style.cursor="pointer";
M.onclick=function(){j.next()
}
}if(T){M.style.msInterpolationMode="bicubic"
}setTimeout(function(){AH(M)
},1)
});
setTimeout(function(){M.src=AI
},1)
}else{if(AI){J.load(AI,AC.data,function(AM,AL,AN){AH(AL==="error"?n("Error").text("Request unsuccessful: "+AN.statusText):g(this).contents())
})
}}}}}};
j.next=function(){if(!y&&C[1]&&(f<C.length-1||AC.loop)){f=f<C.length-1?f+1:0;
j.load()
}};
j.prev=function(){if(!y&&C[1]&&(f||AC.loop)){f=f?f-1:C.length-1;
j.load()
}};
j.close=function(){if(b&&!k){k=true;
b=false;
c(S,AC.onCleanup);
z.unbind("."+r+" ."+AA);
p.fadeTo(200,0);
AE.stop().fadeTo(300,0,function(){AE.add(p).css({opacity:1,cursor:"auto"}).hide();
c(I);
l.remove();
setTimeout(function(){k=false;
c(AB,AC.onClosed)
},1)
})
}};
j.element=function(){return g(U)
};
j.settings=h;
d=function(AH){if(!((AH.button!==0&&typeof AH.button!=="undefined")||AH.ctrlKey||AH.shiftKey||AH.altKey)){AH.preventDefault();
F(this)
}};
if(g.fn.delegate){g(K).delegate("."+P,"click",d)
}else{g("."+P).live("click",d)
}g(j.init)
}(jQuery,document,this));
/*
* @file cn.features.js
* @author Dennis Pierce
* @copyright (c) Conde Nast Digital
*/
if(typeof CN==="undefined"||!CN||typeof jQuery==="undefined"||!jQuery){throw ("CN and/or jQuery library is missing!")
}CN.features=(function(){var E,D,F,A=".cq-dd-pages",C=[],B;
E=function(G){return jQuery("."+G||jQuery("body")).addClass(G.match(/[^(\.)]*$/)+"-initialized")
};
F=function(){var J,G,H=CN.features.types,I,K=(jQuery("include").attr("script")||"").split(" ");
for(J=0,G=K.length;
J<G;
J++){I=K[J];
if(H.hasOwnProperty(I)){if(H[I].hasOwnProperty("render")){H[I].render()
}}else{if(CN.hasOwnProperty(I)){if(CN[I].hasOwnProperty("init")){CN[I].init()
}}}}};
D=function(I){var J,G,K=null,H=CN.features.types;
if(typeof I!=="undefined"){I.features=I.features||[];
G=I.features.length
}else{return false
}for(J=0;
J<G;
J++){K=I.features[J];
if(H.hasOwnProperty(K)){if(H[K].hasOwnProperty("render")){H[K].render()
}}}F();
B()
};
B=function(){jQuery(".hide_search_feature").parents("div.cn_features_container").addClass("hide_search_feature_container")
};
return{initEl:E,renderFeatures:D,renderDynamic:F,render:D,types:C,hideSearchFeature:B}
}());
/*
* @file cn.carousel.js
* @author Dennis Pierce
* @copyright (c) Conde Nast Digital
*/
if(typeof CN==="undefined"||!CN||typeof jQuery==="undefined"||!jQuery){throw ("CN and/or jQuery library is missing!")
}CN.features.types.carousel=(function(){var B,A={};
B=function(C){try{C.each(function(G){var H=0,I="carousel-"+G,E,F=jQuery(this);
if(F.hasClass("display-1")){E=1
}else{if(F.hasClass("display-2")){E=2
}else{if(F.hasClass("display-3")){E=3
}else{if(F.hasClass("display-4")){E=4
}else{if(F.hasClass("display-5")){E=5
}else{E=4
}}}}}A[I]=jQuery(this).find(".feature").wrapAll('<div class="feature-carousel"><div class="feature-carousel-inner"><div class="feature-container"></div></div></div>').end().find(".feature-carousel").attr("id",I).prepend('<div class="feature-carousel-previous">Previous</div>').append('<div class="feature-carousel-next">Next</div>').find(".feature-carousel-inner").scrollable({items:".feature-container",size:E,nextPage:".feature-carousel-next",prevPage:".feature-carousel-previous"})
})
}catch(D){CN.debug.error("Error setting up carousel features. Perhaps jQuery scrollable  plugin is not available.")
}};
return{render:function(){B(CN.features.initEl("cn_features_container.carousel").find("script").remove().end())
},getInstance:function(C){return A[C]
}}
}());
/*
* @file cn.rotator.js
* @author Dennis Pierce
* @copyright (c) Conde Nast Digital
* @fileOverview Note: This is legacy code to render CN.feature.rotator (to be removed after migration to CN.rotator)
*/
if(typeof CN==="undefined"||!CN||typeof jQuery==="undefined"||!jQuery){throw ("CN and/or jQuery library is missing!")
}CN.features.types.rotator=(function(){var B,A;
A=function(){jQuery(".rotator section.feature").each(function(C){jQuery(this).prepend('<em class="tab">'+parseInt(C+1,10)+"</em>");
if(typeof CQ!=="undefined"&&CQ.WCM){CQ.WCM.onEditableReady(jQuery(this).parent().attr("data-path")+"/*",function(){CQ.WCM.getEditable(this.path).hide()
})
}})
};
B=function(C){try{C.each(function(){var G,E,F=jQuery(this).hasClass("horizontal-slide");
G={pause:true,paginate:true,timer:6,container:"section.feature",maintainPosition:true};
if(F){G.fx={change:"horizontalSlide",duration:500}
}jQuery(this).tab(G);
E=jQuery(this).find("li").length-3;
if(E>0){jQuery(this).find("ul").append('<li class="rotator-count">of <span class="rotator-count-total">'+E+"</span></li>")
}if((typeof CQ!=="undefined"&&CQ.WCM&&(CQ.WCM.isEditMode()||CQ.WCM.isDesignMode()))||(CN.config.get("rotator_autoplay")!=="autoplay")){jQuery(".rotator .tab-pause").trigger("click")
}if((CN.config.get("rotator_refresh_ads")==="refresh_ads")){jQuery(".rotator .tab-pause").trigger("click");
jQuery(".tab-list a, .tab-paginate").bind("click",function(){CN.dart.refresh();
CN.stats.trackAjaxPage()
})
}})
}catch(D){CN.debug.error("Error setting up rotator features. Perhaps the defaultTab index is not 1-based, or the jQuery tab plugin is not available.")
}};
return{render:function(){A();
B(CN.features.initEl("cn_features_container.rotator"))
}}
}());
/*
* @file cn.tabs.js
* @author Dennis Pierce
* @copyright (c) Conde Nast Digital
*/
if(typeof CN==="undefined"||!CN||typeof jQuery==="undefined"||!jQuery){throw ("CN and/or jQuery library is missing!")
}CN.features.types.tabs=(function(){var B,A;
A=function(){jQuery(".tabs .feature").find(".headline").addClass("tab").end().each(function(){if(typeof CQ!=="undefined"&&CQ.WCM){CQ.WCM.onEditableReady(jQuery(this).parent().attr("data-path")+"/*",function(){CQ.WCM.getEditable(this.path).hide()
})
}})
};
B=function(C){try{C.each(function(){jQuery(this).tab(CN.page.config.defaultTab||1,{container:"section.feature",maintainPosition:true})
})
}catch(D){CN.debug.error("Error setting up tabs features. Perhaps the defaultTab index is not 1-based, or the jQuery tab plugin is not available.")
}};
return{render:function(){A();
B(CN.features.initEl("tabs"))
}}
}());
/*
* @file cn.thumbnailgrid.js
* @author Anastasia Melnikova
* @copyright (c) Conde Nast Digital
*/
if(typeof CN==="undefined"||!CN||typeof jQuery==="undefined"||!jQuery){throw ("CN and/or jQuery library is missing!")
}CN.features.types.thumbnailgrid=(function(){var A;
A=function(){if(typeof CQ!=="undefined"&&CQ.WCM&&(CQ.WCM.isEditMode()||CQ.WCM.isDesignMode())){return 
}jQuery(".thumbnail-grid").each(function(){var D=jQuery(this),E=jQuery(D).width(),C=D.find(".cn_manual_feature"),G,F,B;
if(C.length===0){C=D.find(".cn_search_features .feature");
if(C.length===0){return 
}}G=jQuery(C).outerWidth(true);
F=parseInt(E/G,10);
if(F>=C.length){return 
}else{for(B=0;
B<C.length;
B+=F){C.slice(B,B+F).wrapAll('<div class="row"></div>')
}}})
};
return{render:function(){A()
}}
}());
/*
* @file cn.sandbox.js
* @author Yufang Chang
* @copyright (c) Conde Nast Digital
*/
if(typeof CN==="undefined"||!CN||typeof jQuery==="undefined"||!jQuery){throw ("CN and/or jQuery library is missing!")
}CN.features.sandbox=(function(B){var A=function(F,E){var D={callback:{params:[F],scope:CN.features.sandbox}};
CN.frame.refresh("#"+F,E,true,D)
},C=function(){var D=B("iframe.sandbox");
D.filter(".auto").each(function(){var E=B(this);
A(E.attr("id"),E.attr("data-url"))
})
};
return{render:function(){if(typeof CQ==="undefined"||!CQ.WCM.isEditMode()||!CQ.WCM.isDesignMode()){C()
}},refresh:function(E,D){A(E,D)
}}
}(jQuery));
/*
* @file cn.flash.js
* @author Lou Capozzoli
* @copyright (c) Conde Nast Digital
*/
if(typeof CN==="undefined"||!CN||typeof jQuery==="undefined"||!jQuery){throw ("CN and/or jQuery library is missing!")
}CN.features.types.flash=(function(A){var B;
B=function(C){try{C.each(function(){var G,H,F,E=jQuery(this);
if(typeof JSON!=="undefined"){G=JSON.parse(E.attr("data-flash_vars").replace(/'/gi,'"'));
H=JSON.parse(E.attr("data-flash_params").replace(/'/gi,'"'))
}if(window.CQ_swfobject){CQ_swfobject.embedSWF(E.attr("data-flash_url"),E.attr("data-flash_id"),E.attr("data-flash_width"),E.attr("data-flash_height"),E.attr("data-flash_version"),E.attr("data-flash_xi_url"),G,H,"")
}})
}catch(D){CN.debug.error("Error setting up flash feature.")
}};
return{render:function(){B(CN.features.initEl("flash"))
}}
}(jQuery));
/*
* @file cn.mostcommented.js
* @author Dennis Pierce
* @copyright (c) Conde Nast Digital
*/
if(typeof CN==="undefined"||!CN||typeof jQuery==="undefined"||!jQuery){throw ("CN and/or jQuery library is missing!")
}CN.features.types.mostcommented=(function(){var A;
A=function(B){try{B.each(function(){var D=jQuery(this);
CN.pluck.components.mostcommented.mostCommentedRequest({element:this,numResults:D.attr("data-cn_mostpopular-numresults"),resultAge:D.attr("data-cn_mostpopular-age")})
})
}catch(C){CN.debug.error("Error setting up most commented features. Perhaps Pluck is not available.")
}};
return{render:function(){if(typeof CQ==="undefined"||!CQ.WCM.isEditMode()||!CQ.WCM.isDesignMode()){A(CN.features.initEl("most-commented"))
}}}
}());
/*
* @file cn.mostfavorited.js
* @author Anastasia Melnikova
* @copyright (c) Conde Nast Digital
*/
if(typeof CN==="undefined"||!CN||typeof jQuery==="undefined"||!jQuery){throw ("CN and/or jQuery library is missing!")
}CN.features.types.mostfavorited=(function(){var A;
A=function(B){try{B.each(function(){var D=jQuery(this);
CN.most.favorited.setContainer(this).setCount(D.attr("data-cn_mostpopular-numresults")).setDays(D.attr("data-cn_mostpopular-age")).init();
jQuery(window).bind("CN.customEvents.mostfavorited",function(){var E=D.find("ol li:nth-child(2)").addClass("center");
D.find("ol").jcarousel({scroll:1,itemFirstInCallback:function(I,G,F,H){E.removeClass("center");
E=jQuery(G).next().addClass("center")
}})
})
})
}catch(C){CN.debug.error("Error setting up most popular features. Perhaps cn.most.js is not available.")
}};
return{render:function(){if(typeof CQ==="undefined"||!CQ.WCM.isEditMode()||!CQ.WCM.isDesignMode()){A(CN.features.initEl("most-favorited"))
}}}
}());
/*
* @file cn.mostviewed.js
* @author Dennis Pierce
* @copyright (c) Conde Nast Digital
*/
if(typeof CN==="undefined"||!CN||typeof jQuery==="undefined"||!jQuery){throw ("CN and/or jQuery library is missing!")
}CN.features.types.mostviewed=(function(){var A;
A=function(B){try{B.each(function(){var D=jQuery(this);
CN.most.viewed.setContainer(this).setCount(D.attr("data-cn_mostpopular-numresults")).setDays(D.attr("data-cn_mostpopular-age")).init()
})
}catch(C){CN.debug.error("Error setting up most popular features. Perhaps cn.most.js is not available.")
}};
return{render:function(){if(typeof CQ==="undefined"||!CQ.WCM.isEditMode()||!CQ.WCM.isDesignMode()){A(CN.features.initEl("most-viewed"))
}}}
}());
/*
* @file cn.mostemailed.js
* @author Dennis Pierce
* @copyright (c) Conde Nast Digital
*/
if(typeof CN==="undefined"||!CN||typeof jQuery==="undefined"||!jQuery){throw ("CN and/or jQuery library is missing!")
}CN.features.types.mostemailed=(function(){var A;
A=function(B){try{B.each(function(){var D=jQuery(this);
CN.most.emailed.setContainer(this).setCount(D.attr("data-cn_mostpopular-numresults")).setDays(D.attr("data-cn_mostpopular-age")).init()
})
}catch(C){CN.debug.error("Error setting up most emailed features. Perhaps cn.most.js is not available.")
}};
return{render:function(){if(typeof CQ==="undefined"||!CQ.WCM.isEditMode()||!CQ.WCM.isDesignMode()){A(CN.features.initEl("most-emailed"))
}}}
}());
/*
* @file cn.pagination.js
* @author Lou Capozzoli
* @copyright (c) Conde Nast Digital
*/
if(typeof CN==="undefined"||!CN||typeof jQuery==="undefined"||!jQuery){throw ("CN and/or jQuery library is missing!")
}CN.features.types.pagination_controls=(function(C){var B,H=function(K,J){var L='<li id="pageLink'+K+'" class="pageLink page'+K+'" style="'+((J==="hide")?"display:none;":"")+'"><a href="#" class="gotoPage" id="gotoPage'+K+'">'+K+"</a></li>";
return L
},I=function(){var K="",L,J=C(".pageContainers"),M=C(".pagination_controls");
B=J.length;
if(CN.utils.trim(J.last().text())===""){J.last().remove();
B=B-1
}if(B>1){for(L=0;
L<B;
L++){K+=H(L+1);
C("#page-display"+(L+1)).text("Continued (page "+(L+1)+" of "+B+")")
}}else{M.hide()
}M.find("ul").html(K);
C(".gotoPage").click(E);
C(".pagination_controls .prev, .pagination_controls .next").click(D);
C(".pagination-single-page").live("click",A)
},G=function(Q,K){var M,P,L,O,J=C(".pageContainers"),N=C(".pagination_controls");
Q=Q||1;
C(".pageLink").removeClass("current-page").hide();
C(".pageLink:first, .pageLink:last").show();
C("#gotoPage"+Q).parent().addClass("current-page").show();
L=Q-1;
O=C(".current-page");
if(Q===4){O.prev().show().prev().show()
}else{if(Q>4){O.prev().show();
if(B>4){O.prev().before('<span class="pagination-ellipsis">...</span>')
}}else{O.prev().show()
}}if(Q===B-1){O.next().show()
}if(B===4){O.next().show().next().show()
}else{if(Q<(B-2)&&B>3){O.next().show();
O.next().after('<span class="pagination-ellipsis">...</span>')
}else{O.next().show()
}}C(".pageContainers").addClass("hidePage").removeClass("showPage");
if(Q===1){C("#pageContainer"+Q).addClass("showPage").removeClass("hidePage");
N.find(".prev").hide()
}else{C("#pageContainer"+Q).addClass("showPage").removeClass("hidePage");
N.find(".prev").show()
}if(Q===J.length){N.find(".next").hide()
}else{N.find(".next").show()
}if(K!=="init"){_gaq.push(["CNTracker._trackEvent","Pagination","Go to page "+Q,document.location.href]);
CN.dart.refresh();
CN.stats.trackAjaxPage(Q)
}C("html, body").animate({scrollTop:0},"slow")
},F=function(J){try{J.each(function(){I();
G(1,"init")
})
}catch(K){CN.debug.error("Error setting up pagination controls feature.")
}},E=function(){var J;
C(".pagination-ellipsis").remove();
J=C(this).parent().index()+1;
G(J);
return false
},D=function(){var L,J=1,K;
C(".pagination-ellipsis").remove();
L=C(this).text();
J=jQuery("li.current-page").index()+1;
if(L==="next"){if(J<B){K=J+1
}else{K=J
}}else{if(J>1){K=J-1
}else{K=1
}}G(K);
return false
},A=function(){C(".pageContainers").addClass("showPage").removeClass("hidePage");
C(".page-display").hide();
C(".pagination_controls").hide();
C("html, body").animate({scrollTop:0},"slow");
_gaq.push(["CNTracker._trackEvent","Pagination","Show Single Page",document.location.href]);
CN.dart.refresh();
CN.stats.trackAjaxPage("Single Page");
return false
};
return{render:function(){CN.debug.info("Pagination controls feature setup starting.");
F(CN.features.initEl("pagination_controls"));
CN.debug.info("Pagination controls feature setup complete.")
}}
}(jQuery));
/*
 * jScrollPane - v2.0.0beta9 - 2011-02-04
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2010 Kelvin Luck
 * Dual licensed under the MIT and GPL licenses.
 */
(function(B,A,C){B.fn.jScrollPane=function(F){function D(c,n){var AZ,p=this,z,AL,V,AN,u,AA,Y,R,Aa,Af,AV,J,h,I,K,AB,v,AR,y,T,a,AS,AG,AO,f,M,AU,AY,X,AW,Ai,G,k,AK=true,o=true,Ah=false,L=false,AQ=c.clone(false,false).empty(),AD=B.fn.mwheelIntent?"mwheelIntent.jsp":"mousewheel.jsp";
Ai=c.css("paddingTop")+" "+c.css("paddingRight")+" "+c.css("paddingBottom")+" "+c.css("paddingLeft");
G=(parseInt(c.css("paddingLeft"),10)||0)+(parseInt(c.css("paddingRight"),10)||0);
function AT(Ar){var Ap,Aq,Al,An,Am,Ak,Aj,Ao;
AZ=Ar;
if(z===C){Aj=c.scrollTop();
Ao=c.scrollLeft();
c.css({overflow:"hidden",padding:0});
AL=c.innerWidth()+G;
V=c.innerHeight();
c.width(AL);
z=B('<div class="jspPane" />').css("padding",Ai).append(c.children());
AN=B('<div class="jspContainer" />').css({width:AL+"px",height:V+"px"}).append(z).appendTo(c)
}else{c.css("width","");
Ak=c.innerWidth()+G!=AL||c.outerHeight()!=V;
if(Ak){AL=c.innerWidth()+G;
V=c.innerHeight();
AN.css({width:AL+"px",height:V+"px"})
}if(!Ak&&k==u&&z.outerHeight()==AA){c.width(AL);
return 
}k=u;
z.css("width","");
c.width(AL);
AN.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()
}Ap=z.clone(false,false).css("position","absolute");
Aq=B('<div style="width:1px; position: relative;" />').append(Ap);
B("body").append(Aq);
u=Math.max(z.outerWidth(),Ap.outerWidth());
Aq.remove();
AA=z.outerHeight();
Y=u/AL;
R=AA/V;
Aa=R>1;
Af=Y>1;
if(!(Af||Aa)){c.removeClass("jspScrollable");
z.css({top:0,width:AN.width()-G});
O();
d();
q();
W();
AJ()
}else{c.addClass("jspScrollable");
Al=AZ.maintainPosition&&(h||AB);
if(Al){An=Ad();
Am=Ab()
}Ag();
Z();
e();
if(Al){m(An,false);
l(Am,false)
}j();
AH();
AP();
if(AZ.enableKeyboardNavigation){r()
}if(AZ.clickOnTrack){Q()
}b();
if(AZ.hijackInternalLinks){N()
}}if(AZ.autoReinitialise&&!AW){AW=setInterval(function(){AT(AZ)
},AZ.autoReinitialiseDelay)
}else{if(!AZ.autoReinitialise&&AW){clearInterval(AW)
}}Aj&&c.scrollTop(0)&&l(Aj,false);
Ao&&c.scrollLeft(0)&&m(Ao,false);
c.trigger("jsp-initialised",[Af||Aa])
}function Ag(){if(Aa){AN.append(B('<div class="jspVerticalBar" />').append(B('<div class="jspCap jspCapTop" />'),B('<div class="jspTrack" />').append(B('<div class="jspDrag" />').append(B('<div class="jspDragTop" />'),B('<div class="jspDragBottom" />'))),B('<div class="jspCap jspCapBottom" />')));
v=AN.find(">.jspVerticalBar");
AR=v.find(">.jspTrack");
AV=AR.find(">.jspDrag");
if(AZ.showArrows){AS=B('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp",Ae(0,-1)).bind("click.jsp",Ac);
AG=B('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp",Ae(0,1)).bind("click.jsp",Ac);
if(AZ.arrowScrollOnHover){AS.bind("mouseover.jsp",Ae(0,-1,AS));
AG.bind("mouseover.jsp",Ae(0,1,AG))
}AM(AR,AZ.verticalArrowPositions,AS,AG)
}T=V;
AN.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function(){T-=B(this).outerHeight()
});
AV.hover(function(){AV.addClass("jspHover")
},function(){AV.removeClass("jspHover")
}).bind("mousedown.jsp",function(Aj){B("html").bind("dragstart.jsp selectstart.jsp",Ac);
AV.addClass("jspActive");
var s=Aj.pageY-AV.position().top;
B("html").bind("mousemove.jsp",function(Ak){w(Ak.pageY-s,false)
}).bind("mouseup.jsp mouseleave.jsp",AX);
return false
});
P()
}}function P(){AR.height(T+"px");
h=0;
y=AZ.verticalGutter+AR.outerWidth();
z.width(AL-y-G);
if(v.position().left===0){z.css("margin-left",y+"px")
}}function Z(){if(Af){AN.append(B('<div class="jspHorizontalBar" />').append(B('<div class="jspCap jspCapLeft" />'),B('<div class="jspTrack" />').append(B('<div class="jspDrag" />').append(B('<div class="jspDragLeft" />'),B('<div class="jspDragRight" />'))),B('<div class="jspCap jspCapRight" />')));
AO=AN.find(">.jspHorizontalBar");
f=AO.find(">.jspTrack");
I=f.find(">.jspDrag");
if(AZ.showArrows){AY=B('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp",Ae(-1,0)).bind("click.jsp",Ac);
X=B('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp",Ae(1,0)).bind("click.jsp",Ac);
if(AZ.arrowScrollOnHover){AY.bind("mouseover.jsp",Ae(-1,0,AY));
X.bind("mouseover.jsp",Ae(1,0,X))
}AM(f,AZ.horizontalArrowPositions,AY,X)
}I.hover(function(){I.addClass("jspHover")
},function(){I.removeClass("jspHover")
}).bind("mousedown.jsp",function(Aj){B("html").bind("dragstart.jsp selectstart.jsp",Ac);
I.addClass("jspActive");
var s=Aj.pageX-I.position().left;
B("html").bind("mousemove.jsp",function(Ak){x(Ak.pageX-s,false)
}).bind("mouseup.jsp mouseleave.jsp",AX);
return false
});
M=AN.innerWidth();
AI()
}}function AI(){AN.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function(){M-=B(this).outerWidth()
});
f.width(M+"px");
AB=0
}function e(){if(Af&&Aa){var Aj=f.outerHeight(),s=AR.outerWidth();
T-=Aj;
B(AO).find(">.jspCap:visible,>.jspArrow").each(function(){M+=B(this).outerWidth()
});
M-=s;
V-=s;
AL-=Aj;
f.parent().append(B('<div class="jspCorner" />').css("width",Aj+"px"));
P();
AI()
}if(Af){z.width((AN.outerWidth()-G)+"px")
}AA=z.outerHeight();
R=AA/V;
if(Af){AU=Math.ceil(1/Y*M);
if(AU>AZ.horizontalDragMaxWidth){AU=AZ.horizontalDragMaxWidth
}else{if(AU<AZ.horizontalDragMinWidth){AU=AZ.horizontalDragMinWidth
}}I.width(AU+"px");
K=M-AU;
AF(AB)
}if(Aa){a=Math.ceil(1/R*T);
if(a>AZ.verticalDragMaxHeight){a=AZ.verticalDragMaxHeight
}else{if(a<AZ.verticalDragMinHeight){a=AZ.verticalDragMinHeight
}}AV.height(a+"px");
J=T-a;
AE(h)
}}function AM(Ak,Am,Aj,s){var Ao="before",Al="after",An;
if(Am=="os"){Am=/Mac/.test(navigator.platform)?"after":"split"
}if(Am==Ao){Al=Am
}else{if(Am==Al){Ao=Am;
An=Aj;
Aj=s;
s=An
}}Ak[Ao](Aj)[Al](s)
}function Ae(Aj,s,Ak){return function(){g(Aj,s,this,Ak);
this.blur();
return false
}
}function g(Am,Al,Ap,Ao){Ap=B(Ap).addClass("jspActive");
var An,Ak,Aj=true,s=function(){if(Am!==0){p.scrollByX(Am*AZ.arrowButtonSpeed)
}if(Al!==0){p.scrollByY(Al*AZ.arrowButtonSpeed)
}Ak=setTimeout(s,Aj?AZ.initialDelay:AZ.arrowRepeatFreq);
Aj=false
};
s();
An=Ao?"mouseout.jsp":"mouseup.jsp";
Ao=Ao||B("html");
Ao.bind(An,function(){Ap.removeClass("jspActive");
Ak&&clearTimeout(Ak);
Ak=null;
Ao.unbind(An)
})
}function Q(){W();
if(Aa){AR.bind("mousedown.jsp",function(Ao){if(Ao.originalTarget===C||Ao.originalTarget==Ao.currentTarget){var Am=B(this),Ap=Am.offset(),An=Ao.pageY-Ap.top-h,Ak,Aj=true,s=function(){var As=Am.offset(),At=Ao.pageY-As.top-a/2,Aq=V*AZ.scrollPagePercent,Ar=J*Aq/(AA-V);
if(An<0){if(h-Ar>At){p.scrollByY(-Aq)
}else{w(At)
}}else{if(An>0){if(h+Ar<At){p.scrollByY(Aq)
}else{w(At)
}}else{Al();
return 
}}Ak=setTimeout(s,Aj?AZ.initialDelay:AZ.trackClickRepeatFreq);
Aj=false
},Al=function(){Ak&&clearTimeout(Ak);
Ak=null;
B(document).unbind("mouseup.jsp",Al)
};
s();
B(document).bind("mouseup.jsp",Al);
return false
}})
}if(Af){f.bind("mousedown.jsp",function(Ao){if(Ao.originalTarget===C||Ao.originalTarget==Ao.currentTarget){var Am=B(this),Ap=Am.offset(),An=Ao.pageX-Ap.left-AB,Ak,Aj=true,s=function(){var As=Am.offset(),At=Ao.pageX-As.left-AU/2,Aq=AL*AZ.scrollPagePercent,Ar=K*Aq/(u-AL);
if(An<0){if(AB-Ar>At){p.scrollByX(-Aq)
}else{x(At)
}}else{if(An>0){if(AB+Ar<At){p.scrollByX(Aq)
}else{x(At)
}}else{Al();
return 
}}Ak=setTimeout(s,Aj?AZ.initialDelay:AZ.trackClickRepeatFreq);
Aj=false
},Al=function(){Ak&&clearTimeout(Ak);
Ak=null;
B(document).unbind("mouseup.jsp",Al)
};
s();
B(document).bind("mouseup.jsp",Al);
return false
}})
}}function W(){if(f){f.unbind("mousedown.jsp")
}if(AR){AR.unbind("mousedown.jsp")
}}function AX(){B("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp");
if(AV){AV.removeClass("jspActive")
}if(I){I.removeClass("jspActive")
}}function w(s,Aj){if(!Aa){return 
}if(s<0){s=0
}else{if(s>J){s=J
}}if(Aj===C){Aj=AZ.animateScroll
}if(Aj){p.animate(AV,"top",s,AE)
}else{AV.css("top",s);
AE(s)
}}function AE(Aj){if(Aj===C){Aj=AV.position().top
}AN.scrollTop(0);
h=Aj;
var Am=h===0,Ak=h==J,Al=Aj/J,s=-Al*(AA-V);
if(AK!=Am||Ah!=Ak){AK=Am;
Ah=Ak;
c.trigger("jsp-arrow-change",[AK,Ah,o,L])
}U(Am,Ak);
z.css("top",s);
c.trigger("jsp-scroll-y",[-s,Am,Ak]).trigger("scroll")
}function x(Aj,s){if(!Af){return 
}if(Aj<0){Aj=0
}else{if(Aj>K){Aj=K
}}if(s===C){s=AZ.animateScroll
}if(s){p.animate(I,"left",Aj,AF)
}else{I.css("left",Aj);
AF(Aj)
}}function AF(Aj){if(Aj===C){Aj=I.position().left
}AN.scrollTop(0);
AB=Aj;
var Am=AB===0,Al=AB==K,Ak=Aj/K,s=-Ak*(u-AL);
if(o!=Am||L!=Al){o=Am;
L=Al;
c.trigger("jsp-arrow-change",[AK,Ah,o,L])
}S(Am,Al);
z.css("left",s);
c.trigger("jsp-scroll-x",[-s,Am,Al]).trigger("scroll")
}function U(Aj,s){if(AZ.showArrows){AS[Aj?"addClass":"removeClass"]("jspDisabled");
AG[s?"addClass":"removeClass"]("jspDisabled")
}}function S(Aj,s){if(AZ.showArrows){AY[Aj?"addClass":"removeClass"]("jspDisabled");
X[s?"addClass":"removeClass"]("jspDisabled")
}}function l(s,Aj){var Ak=s/(AA-V);
w(Ak*J,Aj)
}function m(Aj,s){var Ak=Aj/(u-AL);
x(Ak*K,s)
}function AC(Av,Aq,Ak){var Ao,Al,Am,s=0,Au=0,Aj,Ap,As,Ar,At;
try{Ao=B(Av)
}catch(An){return 
}Al=Ao.outerHeight();
Am=Ao.outerWidth();
AN.scrollTop(0);
AN.scrollLeft(0);
while(!Ao.is(".jspPane")){s+=Ao.position().top;
Au+=Ao.position().left;
Ao=Ao.offsetParent();
if(/^body|html$/i.test(Ao[0].nodeName)){return 
}}Aj=Ab();
Ap=Aj+V;
if(s<Aj||Aq){Ar=s-AZ.verticalGutter
}else{if(s+Al>Ap){Ar=s-V+Al+AZ.verticalGutter
}}if(Ar){l(Ar,Ak)
}viewportLeft=Ad();
As=viewportLeft+AL;
if(Au<viewportLeft||Aq){At=Au-AZ.horizontalGutter
}else{if(Au+Am>As){At=Au-AL+Am+AZ.horizontalGutter
}}if(At){m(At,Ak)
}}function Ad(){return -z.position().left
}function Ab(){return -z.position().top
}function AH(){AN.unbind(AD).bind(AD,function(Am,An,Al,Aj){var Ak=AB,s=h;
p.scrollBy(Al*AZ.mouseWheelSpeed,-Aj*AZ.mouseWheelSpeed,false);
return Ak==AB&&s==h
})
}function O(){AN.unbind(AD)
}function Ac(){return false
}function j(){z.find(":input,a").unbind("focus.jsp").bind("focus.jsp",function(s){AC(s.target,false)
})
}function d(){z.find(":input,a").unbind("focus.jsp")
}function r(){var s,Aj;
z.focus(function(){c.focus()
});
c.attr("tabindex",0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp",function(An){if(An.target!==this){return 
}var Am=AB,Al=h;
switch(An.keyCode){case 40:case 38:case 34:case 32:case 33:case 39:case 37:s=An.keyCode;
Ak();
break;
case 35:l(AA-V);
s=null;
break;
case 36:l(0);
s=null;
break
}Aj=An.keyCode==s&&Am!=AB||Al!=h;
return !Aj
}).bind("keypress.jsp",function(Al){if(Al.keyCode==s){Ak()
}return !Aj
});
if(AZ.hideFocus){c.css("outline","none");
if("hideFocus" in AN[0]){c.attr("hideFocus",true)
}}else{c.css("outline","");
if("hideFocus" in AN[0]){c.attr("hideFocus",false)
}}function Ak(){var Am=AB,Al=h;
switch(s){case 40:p.scrollByY(AZ.keyboardSpeed,false);
break;
case 38:p.scrollByY(-AZ.keyboardSpeed,false);
break;
case 34:case 32:p.scrollByY(V*AZ.scrollPagePercent,false);
break;
case 33:p.scrollByY(-V*AZ.scrollPagePercent,false);
break;
case 39:p.scrollByX(AZ.keyboardSpeed,false);
break;
case 37:p.scrollByX(-AZ.keyboardSpeed,false);
break
}Aj=Am!=AB||Al!=h;
return Aj
}}function q(){c.attr("tabindex","-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")
}function b(){if(location.hash&&location.hash.length>1){var Ak,Aj;
try{Ak=B(location.hash)
}catch(s){return 
}if(Ak.length&&z.find(location.hash)){if(AN.scrollTop()===0){Aj=setInterval(function(){if(AN.scrollTop()>0){AC(location.hash,true);
B(document).scrollTop(AN.position().top);
clearInterval(Aj)
}},50)
}else{AC(location.hash,true);
B(document).scrollTop(AN.position().top)
}}}}function AJ(){B("a.jspHijack").unbind("click.jsp-hijack").removeClass("jspHijack")
}function N(){AJ();
B("a[href^=#]").addClass("jspHijack").bind("click.jsp-hijack",function(){var s=this.href.split("#"),Aj;
if(s.length>1){Aj=s[1];
if(Aj.length>0&&z.find("#"+Aj).length>0){AC("#"+Aj,true);
return false
}}})
}function AP(){var Ak,Aj,Am,Al,An,s=false;
AN.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp",function(Ao){var Ap=Ao.originalEvent.touches[0];
Ak=Ad();
Aj=Ab();
Am=Ap.pageX;
Al=Ap.pageY;
An=false;
s=true
}).bind("touchmove.jsp",function(Ar){if(!s){return 
}var Aq=Ar.originalEvent.touches[0],Ap=AB,Ao=h;
p.scrollTo(Ak+Am-Aq.pageX,Aj+Al-Aq.pageY);
An=An||Math.abs(Am-Aq.pageX)>5||Math.abs(Al-Aq.pageY)>5;
return Ap==AB&&Ao==h
}).bind("touchend.jsp",function(Ao){s=false
}).bind("click.jsp-touchclick",function(Ao){if(An){An=false;
return false
}})
}function H(){var s=Ab(),Aj=Ad();
c.removeClass("jspScrollable").unbind(".jsp");
c.replaceWith(AQ.append(z.children()));
AQ.scrollTop(s);
AQ.scrollLeft(Aj)
}B.extend(p,{reinitialise:function(Aj){Aj=B.extend({},AZ,Aj);
AT(Aj)
},scrollToElement:function(Ak,Aj,s){AC(Ak,Aj,s)
},scrollTo:function(Ak,s,Aj){m(Ak,Aj);
l(s,Aj)
},scrollToX:function(Aj,s){m(Aj,s)
},scrollToY:function(s,Aj){l(s,Aj)
},scrollToPercentX:function(Aj,s){m(Aj*(u-AL),s)
},scrollToPercentY:function(Aj,s){l(Aj*(AA-V),s)
},scrollBy:function(Aj,s,Ak){p.scrollByX(Aj,Ak);
p.scrollByY(s,Ak)
},scrollByX:function(s,Ak){var Aj=Ad()+s,Al=Aj/(u-AL);
x(Al*K,Ak)
},scrollByY:function(s,Ak){var Aj=Ab()+s,Al=Aj/(AA-V);
w(Al*J,Ak)
},positionDragX:function(s,Aj){x(s,Aj)
},positionDragY:function(Aj,s){x(Aj,s)
},animate:function(Aj,Am,s,Al){var Ak={};
Ak[Am]=s;
Aj.animate(Ak,{duration:AZ.animateDuration,ease:AZ.animateEase,queue:false,step:Al})
},getContentPositionX:function(){return Ad()
},getContentPositionY:function(){return Ab()
},getContentWidth:function(){return u()
},getContentHeight:function(){return AA()
},getPercentScrolledX:function(){return Ad()/(u-AL)
},getPercentScrolledY:function(){return Ab()/(AA-V)
},getIsScrollableH:function(){return Af
},getIsScrollableV:function(){return Aa
},getContentPane:function(){return z
},scrollToBottom:function(s){w(J,s)
},hijackInternalLinks:function(){N()
},destroy:function(){H()
}});
AT(n)
}F=B.extend({},B.fn.jScrollPane.defaults,F);
B.each(["mouseWheelSpeed","arrowButtonSpeed","trackClickSpeed","keyboardSpeed"],function(){F[this]=F[this]||F.speed
});
var E;
this.each(function(){var G=B(this),H=G.data("jsp");
if(H){H.reinitialise(F)
}else{H=new D(G,F);
G.data("jsp",H)
}E=E?E.add(G):G
});
return E
};
B.fn.jScrollPane.defaults={showArrows:false,maintainPosition:true,clickOnTrack:true,autoReinitialise:false,autoReinitialiseDelay:500,verticalDragMinHeight:0,verticalDragMaxHeight:99999,horizontalDragMinWidth:0,horizontalDragMaxWidth:99999,animateScroll:false,animateDuration:300,animateEase:"linear",hijackInternalLinks:false,verticalGutter:4,horizontalGutter:4,mouseWheelSpeed:0,arrowButtonSpeed:0,arrowRepeatFreq:50,arrowScrollOnHover:false,trackClickSpeed:0,trackClickRepeatFreq:70,verticalArrowPositions:"split",horizontalArrowPositions:"split",enableKeyboardNavigation:true,hideFocus:false,keyboardSpeed:0,initialDelay:300,speed:30,scrollPagePercent:0.8}
})(jQuery,this);
window.innerShiv=function(){function B(H,G,F){return/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i.test(F)?H:G+"></"+F+">"
}var E,D=document,A,C="abbr article aside audio canvas datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video".split(" ");
return function(J,H){if(!E&&(E=D.createElement("div"),E.innerHTML="<nav></nav>",A=E.childNodes.length!==1)){for(var F=D.createDocumentFragment(),I=C.length;
I--;
){F.createElement(C[I])
}F.appendChild(E)
}J=J.replace(/^\s\s*/,"").replace(/\s\s*$/,"").replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"").replace(/(<([\w:]+)[^>]*?)\/>/g,B);
E.innerHTML=(F=J.match(/^<(tbody|tr|td|col|colgroup|thead|tfoot)/i))?"<table>"+J+"</table>":J;
F=F?E.getElementsByTagName(F[1])[0].parentNode:E;
if(H===!1){return F.childNodes
}for(var I=D.createDocumentFragment(),G=F.childNodes.length;
G--;
){I.appendChild(F.firstChild)
}return I
}
}();
/*
* @file jquery.history.js
* @description jQuery History Plugin
* @author Paul Bronshteyn
* @comment Built by a geek loaded on caffeine ...
* @copyright (c) Conde Nast Digital
*/
(function(D){var C,J,A,H=300,I=/^.*#/,F=location,E=function(){return F.hash.replace(I,"")
},G={iframe:null,getHash:function(){try{return this.iframe.contentWindow.document.location.hash.replace(I,"")
}catch(K){return""
}},setHash:function(L){D(this.iframe).one("load",{hash:L},this.onSetHash);
try{this.iframe.contentWindow.newdoc()
}catch(K){}},onSetHash:function(K){this.contentWindow.document.location.hash=K.data.hash
}},B=function(){var M=G.iframe?G.getHash():E(),K=E(),L;
if(M!==C){C=M;
if(G.iframe){F.hash=C
}L=C;
D(window).trigger("history",[L,J]);
CN.debug.info("Firing History Change",[L,J]);
J=L
}else{if(G.iframe&&M!==K){D.history.add(K);
L=C;
D(window).trigger("history",[L,J]);
CN.debug.info("Firing Manual History Change",[M,K,L,J]);
J=L
}}};
D.history={add:function(L){L=L.replace(I,"");
if(C!==L){var K=C;
F.hash=C=L;
if(G.iframe){G.setHash(C)
}D(window).trigger("historyadd",[C,K]);
CN.debug.info("History Add",[C,K]);
J=K
}if(!A){A=setInterval(B,H)
}}};
D.fn.history=function(K){D(this).bind("history",K)
};
D.fn.historyadd=function(K){D(this).bind("historyadd",K)
}
}(jQuery));
(function(B){B.fn.jcarousel=function(D){return this.each(function(){new A(this,D)
})
};
var C={vertical:false,start:1,offset:1,size:null,scroll:3,visible:null,animation:"normal",easing:"swing",auto:0,wrap:null,initCallback:null,reloadCallback:null,itemLoadCallback:null,itemFirstInCallback:null,itemFirstOutCallback:null,itemLastInCallback:null,itemLastOutCallback:null,itemVisibleInCallback:null,itemVisibleOutCallback:null,buttonNextHTML:"<div></div>",buttonPrevHTML:"<div></div>",buttonNextEvent:"click",buttonPrevEvent:"click",buttonNextCallback:null,buttonPrevCallback:null};
B.jcarousel=function(G,E){this.options=B.extend({},C,E||{});
this.locked=false;
this.container=null;
this.clip=null;
this.list=null;
this.buttonNext=null;
this.buttonPrev=null;
this.wh=!this.options.vertical?"width":"height";
this.lt=!this.options.vertical?"left":"top";
var K="",I=G.className.split(" ");
for(var F=0;
F<I.length;
F++){if(I[F].indexOf("jcarousel-skin")!=-1){B(G).removeClass(I[F]);
var K=I[F];
break
}}if(G.nodeName=="UL"||G.nodeName=="OL"){this.list=B(G);
this.container=this.list.parent();
if(this.container.hasClass("jcarousel-clip")){if(!this.container.parent().hasClass("jcarousel-container")){this.container=this.container.wrap("<div></div>")
}this.container=this.container.parent()
}else{if(!this.container.hasClass("jcarousel-container")){this.container=this.list.wrap("<div></div>").parent()
}}}else{this.container=B(G);
this.list=B(G).find(">ul,>ol,div>ul,div>ol")
}if(K!=""&&this.container.parent()[0].className.indexOf("jcarousel-skin")==-1){this.container.wrap('<div class=" '+K+'"></div>')
}this.clip=this.list.parent();
if(!this.clip.length||!this.clip.hasClass("jcarousel-clip")){this.clip=this.list.wrap("<div></div>").parent()
}this.buttonPrev=B(".jcarousel-prev",this.container);
if(this.buttonPrev.size()==0&&this.options.buttonPrevHTML!=null){this.buttonPrev=this.clip.before(this.options.buttonPrevHTML).prev()
}this.buttonPrev.addClass(this.className("jcarousel-prev"));
this.buttonNext=B(".jcarousel-next",this.container);
if(this.buttonNext.size()==0&&this.options.buttonNextHTML!=null){this.buttonNext=this.clip.before(this.options.buttonNextHTML).prev()
}this.buttonNext.addClass(this.className("jcarousel-next"));
this.clip.addClass(this.className("jcarousel-clip"));
this.list.addClass(this.className("jcarousel-list"));
this.container.addClass(this.className("jcarousel-container"));
var H=this.options.visible!=null?Math.ceil(this.clipping()/this.options.visible):null;
var J=this.list.children("li");
var L=this;
if(J.size()>0){var D=0,F=this.options.offset;
J.each(function(){L.format(this,F++);
D+=L.dimension(this,H)
});
this.list.css(this.wh,D+"px");
if(!E||E.size===undefined){this.options.size=J.size()
}}this.container.css("display","block");
this.buttonNext.css("display","block");
this.buttonPrev.css("display","block");
this.funcNext=function(){L.next()
};
this.funcPrev=function(){L.prev()
};
this.funcResize=function(){L.reload()
};
if(this.options.initCallback!=null){this.options.initCallback(this,"init")
}if(B.browser.safari&&B.browser.version<500){this.buttons(false,false);
B(window).bind("load",function(){L.setup()
})
}else{this.setup()
}};
var A=B.jcarousel;
A.fn=A.prototype={jcarousel:"0.2.3"};
A.fn.extend=A.extend=B.extend;
A.fn.extend({setup:function(){this.first=null;
this.last=null;
this.prevFirst=null;
this.prevLast=null;
this.animating=false;
this.timer=null;
this.tail=null;
this.inTail=false;
if(this.locked){return 
}this.list.css(this.lt,this.pos(this.options.offset)+"px");
var D=this.pos(this.options.start);
this.prevFirst=this.prevLast=null;
this.animate(D,false);
B(window).unbind("resize",this.funcResize).bind("resize",this.funcResize)
},reset:function(){this.list.empty();
this.list.css(this.lt,"0px");
this.list.css(this.wh,"10px");
if(this.options.initCallback!=null){this.options.initCallback(this,"reset")
}this.setup()
},reload:function(){if(this.tail!=null&&this.inTail){this.list.css(this.lt,A.intval(this.list.css(this.lt))+this.tail)
}this.tail=null;
this.inTail=false;
if(this.options.reloadCallback!=null){this.options.reloadCallback(this)
}if(this.options.visible!=null){var F=this;
var G=Math.ceil(this.clipping()/this.options.visible),E=0,D=0;
B("li",this.list).each(function(H){E+=F.dimension(this,G);
if(H+1<F.first){D=E
}});
this.list.css(this.wh,E+"px");
this.list.css(this.lt,-D+"px")
}this.scroll(this.first,false)
},lock:function(){this.locked=true;
this.buttons()
},unlock:function(){this.locked=false;
this.buttons()
},size:function(D){if(D!=undefined){this.options.size=D;
if(!this.locked){this.buttons()
}}return this.options.size
},has:function(E,F){if(F==undefined||!F){F=E
}if(this.options.size!==null&&F>this.options.size){F=this.options.size
}for(var D=E;
D<=F;
D++){var G=this.get(D);
if(!G.length||G.hasClass("jcarousel-item-placeholder")){return false
}}return true
},get:function(D){return B(".jcarousel-item-"+D,this.list)
},add:function(G,L){var H=this.get(G),E=0,K=0;
var J,H=this.create(G),F=A.intval(G);
while(J=this.get(--F)){if(F<=0||J.length){F<=0?this.list.prepend(H):J.after(H);
break
}}H.removeClass(this.className("jcarousel-item-placeholder"));
typeof L=="string"?H.html(L):H.empty().append(L);
var I=this.options.visible!=null?Math.ceil(this.clipping()/this.options.visible):null;
var D=this.dimension(H,I)-E;
if(G>0&&G<this.first){this.list.css(this.lt,A.intval(this.list.css(this.lt))+"px")
}this.list.css(this.wh,A.intval(this.list.css(this.wh))+D+"px");
this.list.children("li").each(function(M){this.className=this.className.replace(/jcarousel-item-\d+/g,"jcarousel-item-"+(M+1));
this.setAttribute("jcarouselindex",M+1)
});
return H
},remove:function(D){var E=this.get(D);
if(!E.length||(D>=this.first&&D<=this.last)){return 
}var F=this.dimension(E);
if(D<this.first){this.list.css(this.lt,A.intval(this.list.css(this.lt))+F+"px")
}E.remove();
this.list.css(this.wh,A.intval(this.list.css(this.wh))-F+"px")
},next:function(){this.stopAuto();
if(this.tail!=null&&!this.inTail){this.scrollTail(false)
}else{this.scroll(((this.options.wrap=="both"||this.options.wrap=="last")&&this.options.size!=null&&this.last==this.options.size)?1:this.first+this.options.scroll+1)
}},prev:function(){this.stopAuto();
if(this.tail!=null&&this.inTail){this.scrollTail(true)
}else{this.scroll(((this.options.wrap=="both"||this.options.wrap=="first")&&this.options.size!=null&&this.first==1)?this.options.size:this.first-this.options.scroll+1)
}},scrollTail:function(D){if(this.locked||this.animating||!this.tail){return 
}var E=A.intval(this.list.css(this.lt));
!D?E-=this.tail:E+=this.tail;
this.inTail=!D;
this.prevFirst=this.first;
this.prevLast=this.last;
this.animate(E)
},scroll:function(E,D){if(this.locked||this.animating){return 
}this.animate(this.pos(E),D)
},pos:function(Q){if(this.locked||this.animating){return 
}if(this.options.wrap!="circular"){this.options.size=this.list.children().length;
Q=Q<2?1:(this.options.size&&Q>this.options.size?this.options.size:Q-1)
}var N=this.first>Q;
var E=A.intval(this.list.css(this.lt));
var R=this.options.wrap!="circular"&&this.first<=1?1:this.first;
var U=N?this.get(R):this.get(this.last);
var P=N?R:R-1;
var S=null,O=0,L=false,T=0;
while(N?--P>=Q:++P<Q){S=this.get(P);
L=!S.length;
if(S.length==0){S=this.create(P).addClass(this.className("jcarousel-item-placeholder"));
U[N?"before":"after"](S)
}U=S;
T=this.dimension(S);
if(L){O+=T
}if(this.first!=null&&(this.options.wrap=="circular"||(P>=1&&(this.options.size==null||P<=this.options.size)))){E=N?E+T:E-T
}}var I=this.clipping();
var K=[];
var D=0,P=Q,J=0;
var U=this.get(Q-1);
while(++D){S=this.get(P);
L=!S.length;
if(S.length==0){S=this.create(P).addClass(this.className("jcarousel-item-placeholder"));
U.length==0?this.list.prepend(S):U[N?"before":"after"](S)
}U=S;
var T=this.dimension(S);
if(T==0){return 0
}if(this.options.wrap!="circular"&&this.options.size!==null&&P>this.options.size){K.push(S)
}else{if(L){O+=T
}}J+=T;
if(J>=I){break
}P++
}for(var H=0;
H<K.length;
H++){K[H].remove()
}if(O>0){this.list.css(this.wh,this.dimension(this.list)+O+"px");
if(N){E-=O;
this.list.css(this.lt,A.intval(this.list.css(this.lt))-O+"px")
}}var G=Q+D-1;
if(this.options.wrap!="circular"&&this.options.size&&G>this.options.size){G=this.options.size
}if(P>G){D=0,P=G,J=0;
while(++D){var S=this.get(P--);
if(!S.length){break
}J+=this.dimension(S);
if(J>=I){break
}}}var F=G-D+1;
if(this.options.wrap!="circular"&&F<1){F=1
}if(this.inTail&&N){E+=this.tail;
this.inTail=false
}this.tail=null;
if(this.options.wrap!="circular"&&G==this.options.size&&(G-D+1)>=1){var M=A.margin(this.get(G),!this.options.vertical?"marginRight":"marginBottom");
if((J-M)>I){this.tail=J-I-M
}}while(Q-->F){E+=this.dimension(this.get(Q))
}this.prevFirst=this.first;
this.prevLast=this.last;
this.first=F;
this.last=G;
return E
},animate:function(G,D){if(this.locked||this.animating){return 
}this.animating=true;
var E=this;
var F=function(){E.animating=false;
if(G==0){E.list.css(E.lt,0)
}if(E.options.wrap=="both"||E.options.wrap=="last"||E.options.size==null||E.last<E.options.size){E.startAuto()
}E.buttons();
E.notify("onAfterAnimation")
};
this.notify("onBeforeAnimation");
if(!this.options.animation||D==false){this.list.css(this.lt,G+"px");
F()
}else{var H=!this.options.vertical?{left:G}:{top:G};
this.list.animate(H,this.options.animation,this.options.easing,F)
}},startAuto:function(E){if(E!=undefined){this.options.auto=E
}if(this.options.auto==0){return this.stopAuto()
}if(this.timer!=null){return 
}var D=this;
this.timer=setTimeout(function(){D.next()
},this.options.auto*1000)
},stopAuto:function(){if(this.timer==null){return 
}clearTimeout(this.timer);
this.timer=null
},buttons:function(F,E){if(F==undefined||F==null){var F=!this.locked&&this.options.size!==0&&((this.options.wrap&&this.options.wrap!="first")||this.options.size==null||this.last<this.options.size);
if(!this.locked&&(!this.options.wrap||this.options.wrap=="first")&&this.options.size!=null&&this.last>=this.options.size){F=this.tail!=null&&!this.inTail
}}if(E==undefined||E==null){var E=!this.locked&&this.options.size!==0&&((this.options.wrap&&this.options.wrap!="last")||this.first>1);
if(!this.locked&&(!this.options.wrap||this.options.wrap=="last")&&this.options.size!=null&&this.first==1){E=this.tail!=null&&this.inTail
}}var D=this;
this.buttonNext[F?"bind":"unbind"](this.options.buttonNextEvent,this.funcNext)[F?"removeClass":"addClass"](this.className("jcarousel-next-disabled")).attr("disabled",F?false:true);
this.buttonPrev[E?"bind":"unbind"](this.options.buttonPrevEvent,this.funcPrev)[E?"removeClass":"addClass"](this.className("jcarousel-prev-disabled")).attr("disabled",E?false:true);
if(this.buttonNext.length>0&&(this.buttonNext[0].jcarouselstate==undefined||this.buttonNext[0].jcarouselstate!=F)&&this.options.buttonNextCallback!=null){this.buttonNext.each(function(){D.options.buttonNextCallback(D,this,F)
});
this.buttonNext[0].jcarouselstate=F
}if(this.buttonPrev.length>0&&(this.buttonPrev[0].jcarouselstate==undefined||this.buttonPrev[0].jcarouselstate!=E)&&this.options.buttonPrevCallback!=null){this.buttonPrev.each(function(){D.options.buttonPrevCallback(D,this,E)
});
this.buttonPrev[0].jcarouselstate=E
}},notify:function(D){var E=this.prevFirst==null?"init":(this.prevFirst<this.first?"next":"prev");
this.callback("itemLoadCallback",D,E);
if(this.prevFirst!==this.first){this.callback("itemFirstInCallback",D,E,this.first);
this.callback("itemFirstOutCallback",D,E,this.prevFirst)
}if(this.prevLast!==this.last){this.callback("itemLastInCallback",D,E,this.last);
this.callback("itemLastOutCallback",D,E,this.prevLast)
}this.callback("itemVisibleInCallback",D,E,this.first,this.last,this.prevFirst,this.prevLast);
this.callback("itemVisibleOutCallback",D,E,this.prevFirst,this.prevLast,this.first,this.last)
},callback:function(H,K,D,I,G,F,E){if(this.options[H]==undefined||(typeof this.options[H]!="object"&&K!="onAfterAnimation")){return 
}var L=typeof this.options[H]=="object"?this.options[H][K]:this.options[H];
if(!B.isFunction(L)){return 
}var M=this;
if(I===undefined){L(M,D,K)
}else{if(G===undefined){this.get(I).each(function(){L(M,this,I,D,K)
})
}else{for(var J=I;
J<=G;
J++){if(J!==null&&!(J>=F&&J<=E)){this.get(J).each(function(){L(M,this,J,D,K)
})
}}}}},create:function(D){return this.format("<li></li>",D)
},format:function(F,E){var D=B(F).addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-"+E));
D.attr("jcarouselindex",E);
return D
},className:function(D){return D+" "+D+(!this.options.vertical?"-horizontal":"-vertical")
},dimension:function(G,H){var F=G.jquery!=undefined?G[0]:G;
var E=!this.options.vertical?F.offsetWidth+A.margin(F,"marginLeft")+A.margin(F,"marginRight"):F.offsetHeight+A.margin(F,"marginTop")+A.margin(F,"marginBottom");
if(H==undefined||E==H){return E
}var D=!this.options.vertical?H-A.margin(F,"marginLeft")-A.margin(F,"marginRight"):H-A.margin(F,"marginTop")-A.margin(F,"marginBottom");
B(F).css(this.wh,D+"px");
return this.dimension(F)
},clipping:function(){return !this.options.vertical?this.clip[0].offsetWidth-A.intval(this.clip.css("borderLeftWidth"))-A.intval(this.clip.css("borderRightWidth")):this.clip[0].offsetHeight-A.intval(this.clip.css("borderTopWidth"))-A.intval(this.clip.css("borderBottomWidth"))
},index:function(D,E){if(E==undefined){E=this.options.size
}return Math.round((((D-1)/E)-Math.floor((D-1)/E))*E)+1
}});
A.extend({defaults:function(D){return B.extend(C,D||{})
},margin:function(H,G){if(!H){return 0
}var F=H.jquery!=undefined?H[0]:H;
if(G=="marginRight"&&B.browser.safari){var E={display:"block","float":"none",width:"auto"},D,I;
B.swap(F,E,function(){D=F.offsetWidth
});
E.marginRight=0;
B.swap(F,E,function(){I=F.offsetWidth
});
return I-D
}return A.intval(B.css(F,G))
},intval:function(D){D=parseInt(D);
return isNaN(D)?0:D
}})
})(jQuery);
CN.schemaParser=(function(D){var C,E,B={},A,F={};
E=function(){return{data:F,parse:function(G,H){var I=G.id;
if(!F[I]||typeof CN.Author!=="undefined"){if(CN.isNumber(G)){return false
}else{F[I]=G;
B[I]=CN.schemaParser.factory(G,H)
}}else{return B[I]
}B[I].renderedHtml=function(J){J=J||"item";
if(CN.schemaParser.templates&&CN.schemaParser.templates[J]){return CN.schemaParser.templates[J](B[I],CN.config.get("templateParams"))
}else{return'No renderedHtml template is available for the "'+J+'" template.'
}};
B[I].renderedHtml=B[I].renderedHtml.memoize();
return B[I]
}}
};
return{getInstance:function(){if(!C){C=E()
}return C
},templates:D}
}((CN.schemaParser&&CN.schemaParser.templates)?CN.schemaParser.templates:null));
CN.schemaParser.factory=function(A,C){var B={},D;
for(D in A){if(A.hasOwnProperty(D)&&CN.schemaParser.schemas.hasOwnProperty(D)){B=CN.schemaParser.schemas[D](A,B,C)
}}return B
};
CN.schemaParser.schemas={metaData:function(A,B){B.pageType=function(){return"A"
};
return B
},unitMetaData:function(A,B){if(A.unitMetaData.rubric){B=this.rubric(A.unitMetaData,B)
}if(A.unitMetaData.byline){B=this.byline(A.unitMetaData,B)
}if(A.unitMetaData.displayDate){B=this.displayDate(A.unitMetaData,B)
}return B
},header:function(A,C){if(A.header){var D="",E="",B="";
if(A.headerUrl){D+='<a href="'+A.headerUrl+'">'+A.header+"</a>"
}else{D+=A.header
}C.header=function(){return D
}
}return C
},subHeader:function(A,B){B.subHeader=function(){return A.subHeader||""
};
return B
},body:function(A,B){var C="";
C=A.body||"";
B.body=function(){return C
};
return B
},footer:function(A,B){B.footer=function(){return A.footer||""
};
return B
},layout:function(A,B){var C="";
C=A.layout||"";
B.layout=function(){return C
};
return B
},fileReference:function(F,C,B){C.photo={};
var E,I,J,D,G=this,H=F.fileReference.replace(/^\/.+\//g,""),A=CN.schemaParser.templates&&CN.schemaParser.templates.annotations?CN.schemaParser.templates.annotations:CN.schemaParser.defaultTemplates.annotations;
C.photo.main=function(){if(F.layout==="vertical"){return B+".rendition.slideshowVertical."+H
}else{return B+".rendition.slideshowHorizontal."+H
}};
C.photo.enlargedItem=function(){return B+".size.0.0."+H
};
C.photo.variableItem=function(L){var M=F.layout||"default",K=".size.0.0.";
if(L[M]){K=".rendition."+L[M]+"."
}return B+K+H
};
C.photo.thumbnail=function(){return B+".rendition.slideshowThumb."+H
};
C.photo.url=function(){return F.imageUrl
};
C.photo.caption=function(){return F.caption
};
C.photo.alt=function(){return""
};
return C
},rubric:function(A,B){var C=A.rubric||"";
B.rubric=function(){return C
};
return B
},byline:function(A,B){var C="";
B.contributors=function(){return C
};
return B
},displayDate:function(A,B){var C="";
B.displayDate=function(){return C
};
return B
},credit:function(A,B){var C=A.credit||"";
B.photoCredits=function(){return C
};
return B
},favorites:function(A,B){var C=A.favorites||false;
B.favorites=function(){return C
};
return B
},ecom:function(A,B){B.brand=function(){return A.ecom.brand||""
};
B.price=function(){return A.ecom.price||""
};
B.productName=function(){return A.ecom.productName||""
};
B.purchaseUrl=function(){return A.ecom.purchaseUrl||""
};
return B
}};
CN.schemaParser.defaultTemplates={annotations:function(A){var D,B,C="",E;
if(A.annotations){C+='<ul class="annotations">';
if(Object.prototype.toString.call(A.annotations.annotation)==="[object Array]"){for(D=0,B=A.annotations.annotation.length;
D<B;
D++){E=CN.utils.mapPropertyArray(A.annotations.annotation[D].properties.property);
C+='<li class="annotation" data-left="';
C+=E.left;
C+='" data-top="';
C+=E.top;
C+='">';
C+='<a href="#" class="annotation-trigger">Note:</a>';
C+='<div class="annotation-content">';
C+=A.annotations.annotation[D].body.text;
C+="</div>";
C+="</li>"
}}else{E=CN.utils.mapPropertyArray(A.annotations.annotation.properties.property);
C+='<li class="annotation" data-left="';
C+=E.left;
C+='" data-top="';
C+=E.top;
C+='">';
C+='<a href="#" class="annotation-trigger">Note:</a>';
C+='<div class="annotation-content">';
C+=A.annotations.annotation.body.text;
C+="</div>";
C+="</li>"
}C+="</ul>"
}return C
},contributors:function(B){var E,C,D="",A=function(F){var G=B[F];
D+='<p><span class="contributor">';
D+=G.label?'<span class="label">'+G.label+"</span> ":"";
D+=G.name?'<span class="name">'+G.name+"</span>":"";
D+="</span></p>"
};
D+='<div class="contributors">';
if(Object.prototype.toString.call(B)==="[object Array]"){for(E=0,C=B.length;
E<C;
E++){A(E)
}}else{D+='<p><span class="contributor">';
D+=B.label?'<span class="label">'+B.label+"</span> ":"";
D+=B.name?'<span class="name">'+B.name+"</span>":"";
D+="</span></p>"
}D+="</div>";
return D
}};
CN.slideshow={};
CN.slideshow.plugin=CN.slideshow.plugin||{};
CN.slideshow.config=CN.slideshow.config||{countSeparator:" / ",forwardBtn:"Next",backwardBtn:"Previous",playBtn:"Play Slideshow",pauseBtn:"Pause",continueNote:"Slideshow will continue in ",continueLink:"Click to skip",adNote:"Advertisement",backToIntroBtn:"Back to slideshow intro",viewSlideshowBtn:"View Slideshow",introSelector:".cn_slideshow_intro",introTextSelector:".cn_slideshow_intro .body.introduction",viewAllCloseBtn:"Close",viewLargerCloseBtn:"Close",viewLargerWidth:990,viewLargerInstructionsNote:"<strong>Press ESC to close</strong><b>Right Arrow</b> moves forward.<br /><b>Left Arrow</b> moves backward.<br /><b>Space Bar</b> starts and stops play.",viewLargerInstructionsCloseBtn:"Close",viewLargerInstructionsTrigger:"? <span>Help</span>",hideMe:{position:"absolute",top:"-9999px"},showMe:{position:"relative",top:"0"},defaultThumbnail:"/etc/designs/"+CN.site.siteRoot+"/images/slideshow/default-thumbnail.gif"};
CN.slideshow.api=(function(){var A,B;
A=function(H,E){E=E||{};
var D,G,F;
try{E.slideshow=E.slideshow||CN.page.slideshow
}catch(I){CN.debug.error("CN.slideshow.api.addSlide: Error in setting the slideshow. Make sure that you pass in an existing slideshow or that CN.page.slideshow (the default) exists: "+I.message)
}E.slideType=E.slideType||"InlineAd";
E.thumbnailUrl=E.thumbnailUrl||CN.slideshow.config.defaultThumbnail;
E.placement=E.placement||-1;
F=E.placement===-1?E.slideshow.slides.length:E.placement-1;
try{D=new CN.slideshow[E.slideType]().setHtml(H).setPlacement(E.placement);
CN.Interface.ensureImplements(D,CN.slideshow.ISlide);
E.slideshow.slides.splice(F,0,D);
for(G in E.slideshow.navigationItems){if(E.slideshow.navigationItems.hasOwnProperty(G)){E.slideshow.navigationItems[G].appendThumbnail(E.thumbnailUrl,F)
}}E.slideshow.onSlideAppended.fire(F)
}catch(C){CN.debug.error("CN.slideshow.api.addSlide: Error in adding slide: "+C.message)
}};
B=function(E,D){D=D||{};
var C;
try{D.slideshow=D.slideshow||CN.page.slideshow
}catch(G){CN.debug.error("CN.slideshow.api.addInterstitial: Error in setting the slideshow. Make sure that you pass in an existing slideshow or that CN.page.slideshow (the default) exists: "+G.message)
}D.slideType=D.slideType||"Interstitial";
D.thumbnailUrl=D.thumbnailUrl||CN.slideshow.config.defaultThumbnail;
try{C=new CN.slideshow[D.slideType]().setHtml(E);
CN.Interface.ensureImplements(C,CN.slideshow.ISlide);
D.slideshow.interstitialManager.slides.push(C)
}catch(F){CN.debug.error("CN.slideshow.api.addInterstitial: Error in adding slide: "+F.message)
}};
return{addSlide:A,addInterstitial:B}
}());
CN.slideshow.util=(function(){var C,B,H,G,D,E,A,F;
C=function(){var I=CN.url.params().slide||1,J=location.toString().split("#");
if(J[1]&&J[1].match(/slide=\d+/)){I=J[1].split("=")[1]
}return I
};
H=function(N,L,K){var M=N.data.useIntro,J=N.data.commands,I=0;
if(L!==""&&L!=="intro"){I=L.split("=")[1]||0;
if(isNaN(parseInt(I,10))){I=0
}if(M===true&&CN.page.config.hasIntro!=="false"){CN.slideshow.view.toggleIntro(false)
}J.jumpToSlideCommand.execute(I)
}if((L===""||L==="intro")&&CN.page.config.hasIntro==="true"&&M===true){CN.slideshow.view.toggleIntro(true)
}return false
};
B=function(J){var I=J.slides.length,K=J.interstitialManager.originalFrequency;
if(I<10||K===0||J.config.useInterstitial===false){J.interstitialManager.setFrequency(0)
}else{J.interstitialManager.setFrequency(K)
}};
G=function(I){if(I.isAlreadyPlaying()){I.timer.stop()
}if(I.timer){I.timer=null
}};
D=function(J){var I;
for(I in J.navigationItems){if(J.navigationItems.hasOwnProperty(I)){J.navigationItems[I].list.remove();
if(J.navigationItems[I].wrapper){J.navigationItems[I].wrapper.remove()
}}}};
E=function(K,J){J=J||{};
var L=J.start||null,I=J.end||null;
K.$el.addClass("slideshow-enabled");
A(K,L,I);
K.postDataSetup()
};
F=function(K,I,J){CN.debug.info("Preloading images for slide number "+J);
K.preloadedSlides.push(J);
jQuery(K.slides[J-1].getHtml()).find("img").each(function(){I.src=this.src
})
};
A=function(L,O,M){var N=L.slides.length,K=0,J=O&&(O>0)?O:1,I=new Image();
M=M&&(M<=N)?M:N;
CN.debug.info('Image preloading has begun for slideshow with selector "#'+L.$el.attr("id")+'".');
for(K=J;
K<=M;
K++){F(L,I,K)
}};
return{getSlideFromUrl:C,calculateInterstitialFrequency:B,destroyTimer:G,removeNavigations:D,dataReady:E,bindHistory:H,preloadImages:A}
}());
CN.slideshow.controller=(function(){var A;
A=function(L,E){E=E||{};
var C={},F,J=L.showInterstitialTimer,D,G,K,H,B;
B=function(N){var M,O;
M=jQuery(N.target).parents("li")[0];
O=jQuery(M).prevAll().length;
C.jumpToSlideCommand.execute(O+1);
return false
};
H=function(M){if(!C[M+"Command"]){F=M.substr(0,1).toUpperCase()+M.substr(1,M.length);
C[M+"Command"]=new CN.slideshow[F](L)
}};
H("showInterstitial");
H("hideInterstitial");
K={goForward:function(M){H("goForward");
if(!M.trigger){var N=jQuery('<div class="slideshow-control-forward">'+CN.slideshow.config.forwardBtn+"</div>");
jQuery(M.container).append(N);
M.trigger=N.get(0)
}jQuery(M.trigger).click(function(){C.goForwardCommand.execute();
return false
})
},goBackward:function(M){H("goBackward");
if(!M.trigger){var N=jQuery('<div class="slideshow-control-backward">'+CN.slideshow.config.backwardBtn+"</div>");
jQuery(M.container).append(N);
M.trigger=N.get(0)
}jQuery(M.trigger).click(function(){C.goBackwardCommand.execute();
return false
})
},playSlideshow:function(N){L.sliderEl=N.sliderEl||".stop";
H("playSlideshow");
if(!N.trigger){var M=jQuery('<div class="slideshow-control-play start">'+CN.slideshow.config.playBtn+"</div>");
jQuery(N.container).append(M);
N.trigger=M.get(0)
}jQuery(N.trigger).click(function(){C.playSlideshowCommand.execute();
return false
})
},stopSlideshow:function(N){H("stopSlideshow");
if(!N.trigger){var M=jQuery('<div class="slideshow-control-stop stop">'+CN.slideshow.config.pauseBtn+"</div>");
jQuery(N.container).append(M);
N.trigger=M.get(0)
}jQuery(N.trigger).click(function(){C.stopSlideshowCommand.execute();
return false
})
},viewAllNavigation:function(M){var N=null;
H("jumpToSlide");
H("stopSlideshow");
CN.slideshow.view.buildNavigationItems.viewAllNavigation(L,M.container?jQuery(M.container):L.$el);
L.$el.addClass("slideshow-has-navigation-viewall");
jQuery(M.trigger).click(function(){C.stopSlideshowCommand.execute();
if(L.navigationItems.hasOwnProperty("navigationViewAll")){N=L.navigationItems.navigationViewAll;
if(N.hidden===true){N.show()
}else{N.hide()
}}return false
});
L.navigationItems.navigationViewAll.onHide.subscribe(function(){jQuery(M.trigger).removeClass("slideshow-navigation-viewall-visible")
});
L.navigationItems.navigationViewAll.onShow.subscribe(function(){jQuery(M.trigger).addClass("slideshow-navigation-viewall-visible")
});
L.onStateChange.subscribe(function(){if(L.navigationItems.hasOwnProperty("navigationViewAll")){L.navigationItems.navigationViewAll.hide()
}})
},numberNavigation:function(M){H("jumpToSlide");
CN.slideshow.view.buildNavigationItems.numberNavigation(L,M.container?jQuery(M.container):L.$el);
L.$el.addClass("slideshow-has-navigation-number")
},listNavigation:function(M){H("jumpToSlide");
CN.slideshow.view.buildNavigationItems.listNavigation(L,M.container?jQuery(M.container):L.$el);
L.$el.addClass("slideshow-has-navigation-list")
},numberedHoverNavigation:function(M){H("jumpToSlide");
CN.slideshow.view.buildNavigationItems.numberedHoverNavigation(L,M.container?jQuery(M.container):L.$el);
L.$el.addClass("slideshow-has-navigation-numberedhover")
},imageHoverNavigation:function(M){H("jumpToSlide");
CN.slideshow.view.buildNavigationItems.imageHoverNavigation(L,M.container?jQuery(M.container):L.$el);
L.$el.addClass("slideshow-has-navigation-imagehover")
},carouselNavigation:function(M){H("jumpToSlide");
CN.slideshow.view.buildNavigationItems.carouselNavigation(L,M.container?jQuery(M.container):L.$el);
L.$el.addClass("slideshow-has-navigation-carousel")
},overlayNavigation:function(M){H("jumpToSlide");
CN.slideshow.view.buildNavigationItems.overlayNavigation(L,M.container?jQuery(M.container):L.$el);
L.$el.addClass("slideshow-has-navigation-overlay")
},viewLarger:function(M){var N=C;
jQuery(M.trigger).click(function(){if(CN.slideshow.plugin.viewLarger){CN.slideshow.plugin.viewLarger.create(L,M,N)
}return false
})
}};
for(G in E){if(E.hasOwnProperty(G)){try{K[G](E[G])
}catch(I){CN.debug.warn('Feature setup: You tried to set up a slideshow feature "'+G+'". This feature may not exist, or the feature setup may have failed: '+I.message)
}}}L.onInterstitialShow.subscribe(function(){var M;
CN.slideshow.view.toggleNavigationItems(L);
L.$el.addClass("slideshow-controls-disabled");
jQuery(".slideshow-loading").show();
if(L.queuedAction.length>0){D=setInterval(function(){L.$el.find(".slideshow-continue-countdown").html((--J).toString())
},1000);
M=jQuery('<div class="slideshow-continue">'+CN.slideshow.config.continueNote+'<span class="slideshow-continue-countdown">'+L.showInterstitialTimer+'</span> seconds. <a class="slideshow-continue-link" href="#">'+CN.slideshow.config.continueLink+"</a></div>");
L.$el.find(L.itemsSelector).append(M);
L.$el.find(".slideshow-continue-link").click(function(){C.hideInterstitialCommand.execute();
return false
});
L.$el.find(L.itemsSelector).prepend('<div class="slideshow-advertisement-note">'+CN.slideshow.config.adNote+"</div>")
}});
L.onInterstitialHide.subscribe(function(){clearInterval(D);
J=L.showInterstitialTimer;
CN.slideshow.view.toggleNavigationItems(L);
L.$el.find(".slideshow-continue, .slideshow-advertisement-note").remove();
L.$el.removeClass("slideshow-controls-disabled");
jQuery(".slideshow-loading").fadeOut("fast")
});
L.onSlideAppended.subscribe(function(){CN.slideshow.view.updateCount(L);
CN.slideshow.util.calculateInterstitialFrequency(L)
});
L.onStateChange.subscribe(function(){CN.slideshow.view.renderSlide(L)
});
L.onSlideChangeComplete.subscribe(function(){CN.slideshow.view.updateNavigationItems(L);
CN.slideshow.view.updateCount(L);
if(L.isAlreadyPlaying()&&L.currentSlideIndex===L.slides.length-1){C.stopSlideshowCommand.execute()
}});
L.onSlideshowReady.subscribe(function(){var N,M,O;
for(N in L.navigationItems){if(L.navigationItems.hasOwnProperty(N)){L.navigationItems[N].list.click(B)
}}L.$el.find(L.itemsSelector).click(function(){if(L.isAlreadyPlaying()&&L.slide.getLabel()!=="slide"){C.stopSlideshowCommand.execute()
}})
});
if(L.useHistory){H("jumpToSlide");
jQuery(window).bind("history",{useIntro:L.useIntro,commands:C},CN.slideshow.util.bindHistory);
L.onSlideshowReady.subscribe(function(){if((L.hasIntro==="false"&&CN.url.getFragment()===false)||(CN.url.getFragment()===false&&CN.url.params().slide)){jQuery.history.add("slide="+(L.currentSlideIndex+1))
}if(L.hasIntro==="true"&&CN.url.getFragment()===false){jQuery.history.add("intro")
}});
L.onForwardComplete.subscribe(function(){jQuery.history.add("slide="+(L.currentSlideIndex+1))
});
L.onBackwardComplete.subscribe(function(){jQuery.history.add("slide="+(L.currentSlideIndex+1))
});
L.onJumpToSlideComplete.subscribe(function(){jQuery.history.add("slide="+(L.currentSlideIndex+1))
})
}L.onSlideshowReady.subscribe(function(){if(L.hasIntro==="true"&&L.useIntro===true&&((CN.url.getFragment()!==false&&CN.url.getFragment()!=="intro")||CN.url.params().slide)){CN.slideshow.view.toggleIntro(false)
}CN.slideshow.view.updateNavigationItems(L)
});
if(L.hasIntro==="true"&&jQuery(".list-backto").length<1){jQuery('<div class="list-backto">'+CN.slideshow.config.backToIntroBtn+"<div>").click(function(){CN.slideshow.view.toggleIntro(true);
if(L.useHistory){jQuery.history.add("intro")
}}).prependTo("#items-container").hide();
jQuery('<a href="#" class="list-view-slideshow" id="list-view-slideshow-start">'+CN.slideshow.config.viewSlideshowBtn+"</a>").prependTo(CN.slideshow.config.introTextSelector);
jQuery('<a href="#" class="list-view-slideshow" id="list-view-slideshow-end">'+CN.slideshow.config.viewSlideshowBtn+"</a>").appendTo(CN.slideshow.config.introTextSelector);
jQuery(".list-view-slideshow").click(function(){CN.slideshow.view.toggleIntro(false);
if(L.useHistory){jQuery.history.add("slide="+(L.currentSlideIndex+1))
}return false
})
}if(L.useHistory&&jQuery("html").hasClass("slideshow-showinitial-false")){L.onSlideshowReady.subscribe(function(){if(CN.url.getFragment()!=="intro"){L.$el.find(L.itemSelector).remove();
C.jumpToSlideCommand.execute(CN.url.getFragment().split("=")[1]||0)
}})
}return C
};
return{init:A}
}());
CN.slideshow.view=(function(){var C,N,A,F,H,E=false,B,D,L,J,M,I,G,K;
C=function(O){return(typeof O==="string"&&(O.charAt(0)==="#"||O.charAt(0)==="."))?O:innerShiv(O,false)
};
N={standard:function(Q,P){var R=P.$el,S=R.find(P.itemsSelector).children(),O=jQuery(C(Q)).addClass("slideshow-"+P.slide.getLabel());
A(S);
R.find(P.itemsSelector).append(O);
O.css("display","block")
},fade:function(Q,P){var R=P.$el,S=R.find(P.itemsSelector).children(":not(script)"),O=jQuery(C(Q)).addClass("slideshow-"+P.slide.getLabel());
S.css("display","block");
R.find(P.itemsSelector).prepend(O);
O.show().css("visibility","hidden");
S.fadeOut(300,function(){A(jQuery(this));
O.css("visibility","visible").hide().fadeIn(400)
})
},crossfade:function(Q,P){var R=P.$el,S=R.find(P.itemsSelector).children(),O=jQuery(C(Q)).addClass("slideshow-"+P.slide.getLabel());
R.find(P.itemsSelector).prepend(O);
O.css("display","block");
S.fadeOut("slow",function(){A(jQuery(this))
})
},drop:function(Q,P){var R=P.$el,S=R.find(P.itemsSelector).children(),O=jQuery(C(Q)).addClass("slideshow-"+P.slide.getLabel());
R.find(P.itemsSelector).prepend(O);
O.css("display","block");
S.toggle("drop",{direction:"left"},800,function(){A(jQuery(this))
})
},slide:function(Q,P){var R=P.$el,S=R.find(P.itemsSelector).children(),O=jQuery(C(Q)).addClass("slideshow-"+P.slide.getLabel());
R.find(P.itemsSelector).prepend(O);
O.css("display","block");
S.toggle("slide",{direction:"left"},1100,function(){A(jQuery(this))
})
},slidefade:function(Q,P){var R=P.$el,S=R.find(P.itemsSelector).children(),O=jQuery(C(Q)).hide().addClass("slideshow-"+P.slide.getLabel());
R.find(P.itemsSelector).prepend(O);
O.hide().fadeIn("slow");
S.toggle("slide",{direction:"left"},400,function(){A(jQuery(this))
})
},photoflash:function(Q,P){var R=P.$el,S=R.find(".slideshow-items").children(),O=jQuery(C(Q)).hide().addClass("slideshow-"+P.slide.getLabel());
A(S);
R.find(P.itemsSelector).css("backgroundColor","#fff").prepend(O);
O.show().css("visibility","hidden");
setTimeout(function(){O.css("visibility","visible").hide().fadeIn(1110)
},150)
}};
A=function(O){if(O.hasClass("slideshow-domslide")){jQuery("body").append(O);
O.removeAttr("style")
}else{O.remove()
}};
F=function(Z,T,Y){var W,Q,R=Z.$el,S=T.sliderEl||T.trigger,U,V,O,X=false,P;
U=function(b){var a;
for(a=0;
a<Q.length;
a++){jQuery(Q[a]).slider("value",b)
}};
P=function(){X=false
};
if(R.find(".slideshow-play-slider-container").length>0){R.find(".slideshow-play-slider-container").show("blind",{direction:"horizontal"},500,function(){if(typeof Y==="function"){Y()
}})
}else{W=jQuery('<div class="slideshow-play-slider-container"><div class="slideshow-play-time"><span>'+Z.playTimer+'</span> seconds</div><div class="slideshow-play-slider"></div></div>');
jQuery(S).after(W);
R.find(".slideshow-play-slider-container").hide().show("blind",{direction:"horizontal"},500,function(){if(typeof Y==="function"){Y()
}});
if(Z.playTimer>12){V=parseInt(Z.playTimer,10)-6;
O=parseInt(Z.playTimer,10)+6
}else{V=Z.playTimer>3?parseInt(Z.playTimer,10)-3:1;
O=parseInt(Z.playTimer,10)+3
}Q=R.find(".slideshow-play-slider").slider({min:V,max:O,value:parseInt(Z.playTimer,10),step:(Z.playTimer>12)?2:1,change:function(c,b){if(X===false){X=true;
var a=parseInt(b.value,10);
if(Z.isAlreadyPlaying()){Z.timer.getSetInterval(a*1000);
Z.playTimer=a;
R.find(".slideshow-play-time span").html(a.toString());
U(a)
}P()
}},slide:function(b,a){R.find(".slideshow-play-time span").html(parseInt(a.value,10).toString())
}});
Z.onInterstitialShow.subscribe(function(){Q.slider("disable")
});
Z.onInterstitialHide.subscribe(function(){Q.slider("enable")
})
}E=true
};
H=function(O,Q){var P=O.$el.find(".slideshow-play-slider-container");
if(E===true){P.hide("blind",{direction:"horizontal"},500,function(){if(typeof Q==="function"){Q()
}});
E=false
}};
B=function(O){O.$el.find(".start").css("display","none");
O.$el.find(".stop").css("display","block")
};
D=function(O){O.$el.find(".stop").css("display","none");
O.$el.find(".start").css("display","block")
};
L={create:function(Q,U,V,R){var O,P="slideshowNavigation"+V,S="navigation"+V;
try{O=Object.make(CN.slideshow[P]);
O.thumbnails=[];
O.currentSelection=Q.currentSlideIndex;
O.render(jQuery(R),U);
O.init();
Q.navigationItems[S]=O
}catch(T){CN.debug.warn('Tried to create navigation object "'+V+'" but failed; probably the navigation object does not exist or you spelled the name incorrectly: '+T.message)
}},numberNavigation:function(O,P){this.create(O,P,"Numbers",'<ul class="slideshow-navigation-numbers">')
},listNavigation:function(O,P){this.create(O,P,"List",'<ol class="slideshow-navigation-list">')
},numberedHoverNavigation:function(O,P){this.create(O,P,"NumberedHover",'<ul class="slideshow-navigation-numbered-hover">')
},imageHoverNavigation:function(O,P){this.create(O,P,"ImageHover",'<ul class="slideshow-navigation-image-hover">')
},carouselNavigation:function(O,P){this.create(O,P,"Carousel",'<ul class="slideshow-navigation-carousel">')
},overlayNavigation:function(O,P){this.create(O,P,"Overlay",'<ul class="slideshow-navigation-overlay">')
},viewAllNavigation:function(O,P){this.create(O,P,"ViewAll",'<ol class="slideshow-navigation-viewall">')
}};
J=function(P){var O;
for(O in P.navigationItems){if(P.navigationItems.hasOwnProperty(O)){P.navigationItems[O].updateDisplay(P)
}}};
M=function(P){var O;
for(O in P.navigationItems){if(P.navigationItems.hasOwnProperty(O)){if(P.navigationItems[O].carousel){if(P.navigationItems[O].carousel.locked){P.navigationItems[O].carousel.unlock();
P.navigationItems[O].updateDisplay(P)
}else{P.navigationItems[O].carousel.lock()
}}jQuery(P.navigationItems[O].list).toggleClass("disabled")
}}};
I=function(O){O.$el.find(".count").html((O.currentSlideIndex+1)+CN.slideshow.config.countSeparator+O.slides.length)
};
G=function(O){var Q=O.showingInterstitial===true?"standard":O.transition.toLowerCase();
try{if(N.hasOwnProperty(Q)){N[Q](O.slide.getHtml(),O)
}else{N.standard(O.slide.getHtml(),O);
CN.debug.warn('Attempted to use transition "'+Q+'" that does not exist, defaulted to standard transition.')
}}catch(P){CN.debug.error("CN.slideshow.view.renderSlide(): Attempted to change slides, but slide requested is invalid or does not exist: "+P.message)
}};
K=function(O){if(O===true){jQuery("#items-container, .cr-item").css(CN.slideshow.config.hideMe);
jQuery(CN.slideshow.config.introSelector).css(CN.slideshow.config.showMe);
jQuery(".list-view-slideshow").css(CN.slideshow.config.showMe);
jQuery(".list-backto").hide();
try{CN.page.config.slideshowIntroShowCallback()
}catch(P){CN.debug.info("Attempted callback, perhaps no function exists at CN.page.config.slideshowIntroShowCallback : "+P.message)
}}else{jQuery("#items-container, .cr-item").css(CN.slideshow.config.showMe);
jQuery(CN.slideshow.config.introSelector).css(CN.slideshow.config.hideMe);
jQuery(".list-backto").show();
var R=jQuery("html,body").scrollTop()-jQuery("#items-container").offset().top;
if(R>0){jQuery("html,body").animate({scrollTop:jQuery("html,body").scrollTop()-R},500)
}try{CN.page.config.slideshowIntroHideCallback()
}catch(Q){CN.debug.info("Attempted callback, perhaps no function exists at CN.page.config.slideshowIntroHideCallback : "+Q.message)
}}};
return{transitions:N,removeSlide:A,showSlider:F,hideSlider:H,hidePlayButton:B,hideStopButton:D,buildNavigationItems:L,updateNavigationItems:J,toggleNavigationItems:M,updateCount:I,renderSlide:G,toggleIntro:K}
}());
CN.slideshow.Slides=function(B,A){A=A||{};
this.thumbnailType=A.thumbnailType||"thumbnail";
this.imageType=A.imageType||"main";
this.currentSlideIndex=(A.useHistory)?CN.slideshow.util.getSlideFromUrl()-1:(CN.url.params().slide?CN.url.params().slide-1:0);
this.slides=[];
this.slide=null;
this.queuedAction=[];
this.showingInterstitial=false;
this.$el=jQuery(B);
this.itemsSelector=A.itemsClassSuffix?".slideshow-"+A.itemsClassSuffix:".slideshow-items";
this.itemSelector=A.itemClassSuffix?".slideshow-"+A.itemClassSuffix:".slideshow-item";
this.data=null;
this.playTimer=A.playTimer||5;
this.showInterstitialTimer=A.showInterstitialTimer||5;
this.transition=A.transition||"standard";
this.preloadedSlides=[];
this.useHistory=A.useHistory||false;
this.useIntro=A.useIntro||false;
this.useInterstitial=A.useInterstitial||true;
this.countSeparator=A.countSeparator||" / ";
this.onStateChange=new CN.Observer();
this.onSlideChangeComplete=new CN.Observer();
this.onBackwardComplete=new CN.Observer();
this.onForwardComplete=new CN.Observer();
this.onJumpToSlideComplete=new CN.Observer();
this.onInterstitialShow=new CN.Observer();
this.onInterstitialHide=new CN.Observer();
this.onSlideAppended=new CN.Observer();
this.onSlideshowReady=new CN.Observer("onSlideshowReady");
this.interstitialManager=new CN.slideshow.InterstitialManager({frequency:A.interstitialFrequency,useInterstitial:A.useInterstitial});
this.navigationItems={}
};
CN.slideshow.Slides.prototype={goForwardAction:function(){var A=null;
if(this.currentSlideIndex>=(this.slides.length-1)){this.currentSlideIndex=0;
A=this.slides[0]
}else{A=this.slides[(++this.currentSlideIndex)]
}if(this.isAlreadyPlaying()){this.timer.restart()
}this.slide=A;
this.onStateChange.fire();
this.onForwardComplete.fire();
this.onSlideChangeComplete.fire()
},goBackwardAction:function(){var A=null;
if(this.currentSlideIndex<=0){this.currentSlideIndex=(this.slides.length-1);
A=this.slides[this.currentSlideIndex]
}else{A=this.slides[--this.currentSlideIndex]
}if(this.isAlreadyPlaying()){this.timer.restart()
}this.slide=A;
this.onStateChange.fire();
this.onBackwardComplete.fire();
this.onSlideChangeComplete.fire()
},jumpToSlideAction:function(B){var A=null;
B=(B<=0||B>=this.slides.length+1)?1:B;
this.currentSlideIndex=B-1;
A=this.slides[this.currentSlideIndex];
if(this.isAlreadyPlaying()){this.timer.restart()
}this.slide=A;
this.onStateChange.fire();
this.onJumpToSlideComplete.fire();
this.onSlideChangeComplete.fire()
},showInterstitialAction:function(A){if(this.isAlreadyPlaying()){this.timer.stoppedForAd=true;
this.timer.stop()
}this.slide=A;
this.showingInterstitial=true;
this.onStateChange.fire();
this.onInterstitialShow.fire()
},hideInterstitialAction:function(){var A=this;
this.showingInterstitial=false;
if(this.timer&&this.timer.stoppedForAd){this.timer.stoppedForAd=false;
this.timer.start()
}if(A.queuedAction[0]){A.queuedAction[0].apply(A,[A.queuedAction[1]]);
A.queuedAction=[]
}else{A.jumpToSlideAction(A.currentSlideIndex+1)
}if(A.interstitialManager.timer){clearTimeout(A.interstitialManager.timer)
}this.onInterstitialHide.fire()
},append:function(A){var B;
CN.Interface.ensureImplements(A,CN.slideshow.ISlide);
this.slides.push(A);
B=this.slides.length-1;
this.addSlideToNavigations(A,B);
this.onSlideAppended.fire(B)
},addSlideToNavigations:function(B,F){var C,A,E;
for(C in this.navigationItems){if(this.navigationItems.hasOwnProperty(C)){if(B.getThumbnail()){E=B.getThumbnail()
}else{try{A=CN.schemaParser.getInstance().parse(this.data[F].item).photo;
E=(typeof A[this.thumbnailType]==="function")?A[this.thumbnailType]():CN.slideshow.config.defaultThumbnail
}catch(D){CN.debug.info("Tried to load thumbnail from the schema but failed; if using schema other than photo you must provide a thumbnail image when building your slides: "+D.message)
}}this.navigationItems[C].appendThumbnail(E,F)
}}},setConfig:function(A){var B;
this.config=A||this.config;
for(B in A){if(A.hasOwnProperty(B)){this[B]=A[B]
}}CN.config.set({hasIntro:this["hasIntro"]||"false"})
},setData:function(A){this.data=A
},isAlreadyPlaying:function(){return(this.timer&&this.timer.timer)||false
},postDataSetup:function(){this.currentSlideIndex=this.currentSlideIndex>=this.slides.length+1?0:this.currentSlideIndex;
this.slide=this.slides[this.currentSlideIndex];
this.onSlideshowReady.fire();
CN.debug.info("Slideshow ready fired.")
}};
CN.slideshow.ISlide=new CN.Interface("ISlide",["getHtml","getLabel"]);
CN.slideshow.Slide=function(C,B,A){B=B||"item";
this.id=C.id;
this.html=CN.schemaParser.getInstance().parse(C,A).renderedHtml(B);
this.ratings=(C.ratings)?true:false;
this.comments=(C.comments)?true:false;
this.favorites=C.favorites||false;
this.reviews=(C.reviews)?true:false;
this.title="";
this.keywords="";
this.label="slide";
this.thumbnail=null;
this.contentId=C.contentId||"";
this.pixieId=(C.pixieId&&C.pixieId.length>0)?C.pixieId[0]:""
};
CN.slideshow.Slide.prototype={getHtml:function(){return this.html
},getLabel:function(){return this.label
},getThumbnail:function(){return this.thumbnail
},setThumbnail:function(A){this.thumbnail=A;
return this
},getId:function(){return this.id
},hasRatings:function(){return this.ratings
},hasComments:function(){return this.comments
},getTitle:function(){return this.title
},getKeywords:function(){return this.keywords
},getDocType:function(){return""
}};
CN.slideshow.Interstitial=function(){this.html="";
this.label="interstitial"
};
CN.slideshow.Interstitial.prototype={getHtml:function(){CN.debug.info("This is an interstitial getHtml() method");
return this.html
},setHtml:function(A){this.html=A;
return this
},getLabel:function(){return this.label
}};
CN.slideshow.DartInterstitial=function(){this.html="";
this.id="slideshow-dart-"+parseInt((Math.random()*10000000000),10);
this.label="dartinterstitial"
};
CN.slideshow.DartInterstitial.prototype={getHtml:function(){CN.debug.info("DartInterstitial getHtml method called");
return this.html||'<iframe id="'+this.id+'" name="'+this.id+'" src="#" scrolling="no" width="300" height="250" frameborder="0"></iframe>'
},setHtml:function(A){this.html=A;
return this
},getLabel:function(){return this.label
},getId:function(){return this.id
}};
CN.slideshow.InlineAd=function(){this.html="";
this.label="inlinead";
this.placement=-1
};
CN.slideshow.InlineAd.prototype={getHtml:function(){CN.debug.info("InlineAd getHtml method called");
return this.html
},setHtml:function(A){this.html=A;
return this
},setPlacement:function(A){this.placement=A;
return this
},getLabel:function(){return this.label
}};
CN.slideshow.DomSlide=function(){this.label="domslide";
this.placement=-1;
this.domId=null;
this.html=""
};
CN.slideshow.DomSlide.prototype={getHtml:function(){CN.debug.info("DomSlide getHtml method called");
if(this.html){return this.html
}else{return"#"+this.domId
}},setHtml:function(A){if(typeof A==="string"){this.domId=A
}else{this.html=A
}return this
},setPlacement:function(A){this.placement=A;
return this
},getLabel:function(){return this.label
}};
CN.slideshow.LightSlide=function(A){this.html=A||"";
this.label="lightslide";
this.thumbnail=null
};
CN.slideshow.LightSlide.prototype={getHtml:function(){return this.html
},getLabel:function(){return this.label
},setHtml:function(A){this.html=A;
return this
},getThumbnail:function(){return this.thumbnail
},setThumbnail:function(A){this.thumbnail=A;
return this
}};
CN.slideshow.InterstitialManager=function(A){A=A||{};
this.clickCount=0;
this.slides=[];
this.slideCount=0;
if(A.frequency||A.frequency===0||A.useInterstitial===false){this.frequency=A.frequency;
this.originalFrequency=A.frequency
}else{this.frequency=10;
this.originalFrequency=10
}};
CN.slideshow.InterstitialManager.prototype={getSlide:function(){var A=null;
this.clickCount++;
if((this.clickCount%this.frequency)===0&&this.slides[this.slideCount]){A=this.slides[this.slideCount];
this.slideCount=(this.slideCount===(this.slides.length-1))?0:this.slideCount+1
}return A||false
},getSlideWithoutIncrementing:function(){var A=null;
A=this.slides[this.slideCount];
return A||false
},append:function(A){this.slides.push(A)
},getFrequency:function(){return this.frequency
},setFrequency:function(A){this.frequency=A
}};
CN.slideshow.ICommand=new CN.Interface("ICommand",["execute"]);
CN.slideshow.GoForward=function(A){this.slides=A
};
CN.slideshow.GoForward.prototype={execute:function(){var A,B=this;
if(this.slides.showingInterstitial===false){A=this.slides.interstitialManager.getSlide();
if(A!==false){this.slides.queuedAction=[this.slides.goForwardAction,null];
this.slides.showInterstitialAction(A);
if(!B.slides.timer||!B.slides.timer.timer){B.slides.interstitialManager.timer=setTimeout(function(){B.slides.hideInterstitialAction()
},(B.slides.showInterstitialTimer*1000))
}}else{this.slides.goForwardAction()
}}}};
CN.slideshow.GoBackward=function(A){this.slides=A
};
CN.slideshow.GoBackward.prototype={execute:function(){var A,B=this;
if(this.slides.showingInterstitial===false){A=this.slides.interstitialManager.getSlide();
if(A!==false){this.slides.queuedAction=[this.slides.goBackwardAction,null];
this.slides.showInterstitialAction(A);
if(!B.slides.timer||!B.slides.timer.timer){B.slides.interstitialManager.timer=setTimeout(function(){B.slides.hideInterstitialAction()
},(B.slides.showInterstitialTimer*1000))
}}else{this.slides.goBackwardAction()
}}}};
CN.slideshow.PlaySlideshow=function(A){this.slides=A
};
CN.slideshow.PlaySlideshow.prototype={execute:function(){if(!this.slides.isAlreadyPlaying()&&this.slides.showingInterstitial===false){this.advance(this,this.slides.sliderEl)
}},advance:function(A,B){CN.slideshow.view.hidePlayButton(A.slides);
CN.slideshow.view.showSlider(A.slides,{sliderEl:B});
A.slides.timer=new CN.Timer((A.slides.playTimer*1000),function(){var C=A.slides.interstitialManager.getSlide();
if(C!==false){A.slides.queuedAction=[A.slides.goForwardAction,null];
A.slides.showInterstitialAction(C);
A.slides.interstitialManager.timer=setTimeout(function(){A.slides.hideInterstitialAction()
},(A.slides.showInterstitialTimer*1000))
}else{if(A.slides.showingInterstitial===true){A.slides.hideInterstitialAction()
}else{A.slides.goForwardAction()
}}}).start()
}};
CN.slideshow.StopSlideshow=function(A){this.slides=A
};
CN.slideshow.StopSlideshow.prototype={execute:function(){var A=this;
if(this.slides.isAlreadyPlaying()&&this.slides.showingInterstitial===false){CN.slideshow.view.hideSlider(this.slides,function(){CN.slideshow.view.hideStopButton(A.slides)
});
this.slides.timer.stop();
this.slides.timer=null
}}};
CN.slideshow.JumpToSlide=function(A){this.slides=A
};
CN.slideshow.JumpToSlide.prototype={execute:function(C){var A,B=this;
if((C!==this.slides.currentSlideIndex+1)&&(this.slides.showingInterstitial===false)){A=this.slides.interstitialManager.getSlide();
if(A!==false){this.slides.queuedAction=[this.slides.jumpToSlideAction,C];
this.slides.showInterstitialAction(A);
if(!B.slides.timer||!B.slides.timer.timer){B.slides.interstitialManager.timer=setTimeout(function(){B.slides.hideInterstitialAction()
},(B.slides.showInterstitialTimer*1000))
}}else{this.slides.jumpToSlideAction(C)
}}else{if(this.slides.slide.getLabel()==="domslide"){this.slides.jumpToSlideAction(C)
}}}};
CN.slideshow.ShowInterstitial=function(A){this.slides=A
};
CN.slideshow.ShowInterstitial.prototype={execute:function(A){if(A){this.slides.showInterstitialAction(A)
}else{CN.debug.warn("Tried to show interstitial, but there was no interstitial to show.")
}}};
CN.slideshow.HideInterstitial=function(A){this.slides=A
};
CN.slideshow.HideInterstitial.prototype={execute:function(){this.slides.hideInterstitialAction()
}};
CN.slideshow.slideshowNavigation={container:jQuery("body"),init:function(){CN.debug.info("CN.slideshow.slideshowNavigation.init() called directly; make sure you did not intend to override in the child class.")
},getThumbnails:function(){return this.thumbnails
},getCurrentSelection:function(){return this.currentSelection
},appendThumbnail:function(B,C){var A=jQuery('<li><a href="#"><img src="'+B+'" alt="" /></a></li>');
if(C>=this.list.children("li").length){this.list.append(A)
}else{A.insertAfter(this.list.children("li").eq(C-1))
}},render:function(B,A){if(B){this.list=B;
this.container=A||this.container;
this.container.append(B)
}else{CN.debug.error("Error: the render() method requires a list element, and none was passed in")
}},updateDisplay:function(B){var A=this.list.find("li");
A.removeClass("active");
A.each(function(C){if(C===B.currentSlideIndex){jQuery(this).addClass("active")
}})
}};
CN.slideshow.slideshowNavigationNumbers=Object.make(CN.slideshow.slideshowNavigation);
CN.slideshow.slideshowNavigationNumbers.appendThumbnail=function(B){var A,C;
C=this.list.children("li").length+1;
A=jQuery('<li><a href="#">'+C+"</a></li>");
this.list.append(A)
};
CN.slideshow.slideshowNavigationNumberedHover=Object.make(CN.slideshow.slideshowNavigation);
CN.slideshow.slideshowNavigationNumberedHover.init=function(){var A=jQuery(this.list);
A.click(function(){A.find("img.slideshow-thumb-expand").css({position:"absolute",width:100,height:100,display:"none"})
});
A.hover(function(D,C){var B=jQuery(D.target).is("li")?jQuery(D.target):jQuery(D.target).parents("li")[0];
A.find("img.slideshow-thumb-expand").css({position:"absolute",width:100,height:100,display:"none"});
jQuery(B).find("img.slideshow-thumb-expand").effect("size",{from:{width:80,height:80},to:{width:100,height:100},origin:["bottom","center"],scale:"content"},300,function(){A.find("img.slideshow-thumb-expand").not(this).css({position:"absolute",width:100,height:100,display:"none"})
});
D.stopPropagation()
},function(B){A.find("img.slideshow-thumb-expand").css({position:"absolute",width:100,height:100,display:"none"});
B.stopPropagation()
})
};
CN.slideshow.slideshowNavigationNumberedHover.appendThumbnail=function(B,C){var A=jQuery('<li><a href="#">'+(C+1)+'</a><img class="slideshow-thumb-expand" src="'+B+'" alt="" /></li>');
if(C>=this.list.children("li").length){this.list.append(A)
}else{A.insertAfter(this.list.children("li").eq(C-1));
this.list.children("li").each(function(D){jQuery(this).find("a").text(D+1)
})
}};
CN.slideshow.slideshowNavigationImageHover=Object.make(CN.slideshow.slideshowNavigationNumberedHover);
CN.slideshow.slideshowNavigationImageHover.appendThumbnail=function(B,C){var A=jQuery('<li><a href="#"><img src="'+B+'" alt="" /></a><img class="slideshow-thumb-expand" src="'+B+'" alt="" /></li>');
if(C>=this.list.children("li").length){this.list.append(A)
}else{A.insertAfter(this.list.children("li").eq(C-1))
}};
CN.slideshow.slideshowNavigationList=Object.make(CN.slideshow.slideshowNavigation);
CN.slideshow.slideshowNavigationViewAll=Object.make(CN.slideshow.slideshowNavigation);
CN.slideshow.slideshowNavigationViewAll.render=function(D,B){var F=jQuery('<div class="slideshow-viewall-container">'),A=jQuery('<div class="slideshow-viewall-content">'),E=jQuery('<div class="slideshow-viewall-close">'+CN.slideshow.config.viewAllCloseBtn+"</div>"),C=this;
this.wrapper=F;
this.contentBox=A;
this.hidden=true;
this.onShow=new CN.Observer();
this.onHide=new CN.Observer();
if(D){this.list=D;
this.container=B||this.container;
this.contentBox.append(this.list);
F.prepend(E);
F.append(this.contentBox);
this.container.append(F);
E.click(function(){C.hide()
})
}else{CN.debug.error("Error: the render() method requires a list element, and none was passed in")
}};
CN.slideshow.slideshowNavigationViewAll.show=function(){this.wrapper.css("bottom",jQuery("#show-footer").outerHeight(true)+jQuery("#items-container .cr-item").outerHeight(true));
this.wrapper.css("height",jQuery("#items-container .slideshow-items").outerHeight(true)+jQuery("#items-container .item-navigation").outerHeight(true)-(jQuery(this.wrapper).innerHeight()-jQuery(this.wrapper).height()));
this.wrapper.hide().css("left",0);
this.wrapper.slideDown();
try{this.contentBox[0].scrollTo("li.active")
}catch(A){}this.onShow.fire();
this.hidden=false
};
CN.slideshow.slideshowNavigationViewAll.hide=function(){var A=this;
this.wrapper.slideUp("fast",function(){A.wrapper.css("left","-9999px").show()
});
this.onHide.fire();
this.hidden=true
};
CN.slideshow.slideshowNavigationViewAll.appendThumbnail=function(D,E){var A,C,B;
this.wrapper.css("left","-9999px").show();
A=jQuery('<li><a href="#"><img src="'+D+'" alt="" /></a><span>'+(E+1)+"</span></li>");
C=this.list.children("li");
if(E>=C.length){this.list.append(A)
}else{A.insertAfter(C.eq(E-1));
this.list.children("li").each(function(F){jQuery(this).find("span").text(F+1)
})
}if(jQuery.browser.msie&&jQuery.browser.version<7&&this.wrapper.css("position")==="absolute"){this.wrapper.css("position","relative");
this.wrapper.css("position","absolute")
}B=this;
setTimeout(function(){try{B.contentBox.jScrollPane({showArrows:true,scrollbarWidth:14})
}catch(F){}},5000)
};
CN.slideshow.slideshowNavigationCarousel=Object.make(CN.slideshow.slideshowNavigation);
CN.slideshow.slideshowNavigationCarousel.skin="default";
CN.slideshow.slideshowNavigationCarousel.carousel=null;
CN.slideshow.slideshowNavigationCarousel.init=function(){CN.slideshow.slideshowNavigationCarousel.tempContainer=this.list.parent();
this.tempContainer.hide();
this.list.addClass("jcarousel-skin-"+this.skin);
this.list.jcarousel({scroll:3,initCallback:this.initCallback})
};
CN.slideshow.slideshowNavigationCarousel.appendThumbnail=function(B,C){var A='<a href="#"><img src="'+B+'" alt="" /></a><span>'+(C+1)+"</span>";
this.carousel.add((C+1),A);
this.list.children("li").each(function(D){jQuery(this).find("span").text(D+1)
})
};
CN.slideshow.slideshowNavigationCarousel.updateDisplay=function(B){this.initialLoad=this.initialLoad===false?false:true;
var A=this.list.find("li");
A.removeClass("active");
A.each(function(C){if(C===B.currentSlideIndex){jQuery(this).addClass("active")
}});
this.carousel.scroll(B.currentSlideIndex+1,function(){})
};
CN.slideshow.slideshowNavigationCarousel.initCallback=function(A){if(jQuery.browser.msie){CN.slideshow.slideshowNavigationCarousel.tempContainer.show()
}else{CN.slideshow.slideshowNavigationCarousel.tempContainer.slideDown(1250)
}CN.slideshow.slideshowNavigationCarousel.carousel=A
};
CN.slideshow.slideshowNavigationOverlay=Object.make(CN.slideshow.slideshowNavigation);
CN.slideshow.slideshowNavigationOverlay.init=function(){var B=this.list,A=this.container,C;
C=setTimeout(function(){B.slideUp()
},2000);
A.hover(function(){clearTimeout(C);
B.slideDown()
},function(){B.slideUp()
})
};
(function(H){var A,G,J,C,D,F,K,E,B,I=[];
H.slideshow={version:"1.2.8",conf:{contentId:CN.site.contentId,initClass:"slideshow-initialized",itemsClassSuffix:"items",itemClassSuffix:"item",itemsElement:".items",transition:"photoflash",template:"item",showInterstitialTimer:5,playTimer:5,useHistory:false,useIntro:false,plugins:[],api:false,global:false,onlyPreload:false,notify:false,useInterstitial:true,countSeparator:" / ",contentPath:""}};
B=function(M,L){this.slideshow=null;
this.commands=null;
var N=this;
A(M,L);
this.slideshow=new CN.slideshow.Slides(M);
jQuery.ajax({type:"GET",url:L.contentPath,dataType:"json",success:function(O){C(N,O,M,L)
},error:function(O,P){jQuery(".slideshow-loading").fadeOut("slow");
jQuery(".slideshow-loading-message").fadeOut("slow");
CN.debug.error("Data load failed for slideshow, probably 404 or malformed data: "+P)
}})
};
H.prototype.slideshow=function(L){var M=H(this).data("slideshow"),N;
if(M){return M
}N=H.extend(true,{},H.slideshow.conf);
L=H.extend(true,N,L);
this.each(function(){H(this).data("slideshow",M=new B(H(this),L))
});
return L.api?M:this
};
A=function(M,L){if(M.find(L.itemsElement).length){M.find(L.itemsElement).addClass("slideshow-"+L.itemsClassSuffix)
}else{M.children().wrapAll('<div class="slideshow-'+L.itemsClassSuffix+'">')
}};
G=function(M,L){if(L.viewLarger==="true"){jQuery.getScript("/etc/designs/foundation/js/libraries/cn.slideshow/cn.slideshow.viewlarger.js",function(){I.push("viewlarger")
})
}};
J=function(M){var L=new CN.slideshow.plugin.PluckHelper(M,"#content");
M.onSlideChangeComplete.subscribe(function(){L.initNewSlide()
});
M.onSlideshowReady.subscribe(function(){L.initNewSlide()
})
};
D=function(L,M){var N=jQuery("#page .control-bar"),O={goForward:{trigger:N.find(".next a")},goBackward:{trigger:N.find(".previous a")},playSlideshow:{trigger:N.find(".start a"),sliderEl:N.find(".stop")},stopSlideshow:{trigger:N.find(".stop a")}};
if(M.viewLarger==="true"){O.viewLarger={trigger:N.find(".viewlarger a"),transition:"fade"}
}if(M.thumbNav==="carousel"){O.carouselNavigation={container:L.find("#item-navigation-container")}
}if(M.viewAll==="true"){O.viewAllNavigation={trigger:N.find(".viewall a")}
}if(M.thumbNav==="imageList"){O.listNavigation={container:L.find("#item-navigation-container")}
}return O
};
F=function(R,N,P){var Q,M,S,O,L=P.contentPath.match(/(^\/.+\/)/)[0]+"cn_slideshow/";
for(Q=0,M=N.length;
Q<M;
Q++){O=CN.schemaParser.getInstance().parse(N[Q],L+N[Q].id).photo;
S=CN.isUndefined(O.thumbnail)?"/images/default-thumbnail.gif":O.thumbnail();
R.append(new CN.slideshow.Slide(N[Q],P.template,L+N[Q].id).setThumbnail(S))
}};
E=function(M,L){if(jQuery("html").hasClass("slideshow-showinitial-true")){M.onSlideshowReady.subscribe(function(){try{L.find(".item-inner").jScrollPane({scrollbarWidth:14,showArrows:true})
}catch(N){}})
}M.onSlideChangeComplete.subscribe(function(){try{L.find(".item-inner").jScrollPane({scrollbarWidth:14,showArrows:true})
}catch(N){}})
};
K=function(M,L){var N;
for(N in M){if(M.hasOwnProperty(N)&&N.indexOf("jcr:")===-1&&typeof M[N]==="string"){L[N]=M[N]
}}return L
};
C=function(Q,P,O,N){var S,R,L,M=[];
N=K(P,N);
Q.slideshow.setConfig(N);
R=D(O,N);
Q.commands=CN.slideshow.controller.init(Q.slideshow,R);
G(Q.slideshow,N);
if(N.global){CN.page.slideshow=Q.slideshow
}for(S in P){if(P.hasOwnProperty(S)&&S.match(/^item/)){P[S].id=S;
M.push(P[S])
}}M.sort(function(V,U){var T=parseInt(V.id.match(/[0-9]+$/)[0],10),W=parseInt(U.id.match(/[0-9]+$/)[0],10);
return(T-W)
});
Q.slideshow.setData(M);
F(Q.slideshow,M,N);
if(N.displayAs!=="wideslideshow"){E(Q.slideshow,O)
}CN.slideshow.util.dataReady(Q.slideshow,{start:N.onlyPreload?Q.slideshow.currentSlideIndex+1:null,end:N.onlyPreload?Q.slideshow.currentSlideIndex+N.onlyPreload:null});
jQuery(".slideshow-replay").click(function(){L.jumpToSlideCommand.execute(1);
return false
});
if(N.onlyPreload){Q.slideshow.onForwardComplete.subscribe(function(){if(Q.slideshow.preloadedSlides.indexOf(Q.slideshow.currentSlideIndex+2)===-1){CN.slideshow.util.preloadImages(Q.slideshow,Q.slideshow.currentSlideIndex+2,Q.slideshow.currentSlideIndex+1+N.onlyPreload)
}});
Q.slideshow.onBackwardComplete.subscribe(function(){if(Q.slideshow.preloadedSlides.indexOf(Q.slideshow.currentSlideIndex)===-1){CN.slideshow.util.preloadImages(Q.slideshow,Q.slideshow.currentSlideIndex+1-N.onlyPreload,Q.slideshow.currentSlideIndex)
}});
Q.slideshow.onJumpToSlideComplete.subscribe(function(){if(Q.slideshow.preloadedSlides.indexOf(Q.slideshow.currentSlideIndex)===-1||Q.slideshow.preloadedSlides.indexOf(Q.slideshow.currentSlideIndex+2)===-1){CN.slideshow.util.preloadImages(Q.slideshow,Q.slideshow.currentSlideIndex+1-(parseInt(N.onlyPreload/2,10)),Q.slideshow.currentSlideIndex+1+(parseInt(N.onlyPreload/2,10)))
}})
}if(N.notify){H(window).trigger(N.notify)
}}
}(jQuery));
CN.schemaParser=CN.schemaParser||{};
CN.schemaParser.templates={baseItem:function(B,C,D){var A="";
A+='<article class="item">';
A+=this.figure(B,C,D);
A+=this.text(B);
A+="</article>";
return A
},item:function(B){var A=this.baseItem(B,"main");
return A
},photoItem:function(B){var A="";
A+='<article class="item">';
A+=this.figure(B);
A+="</article>";
return A
},figure:function(B,D,E){try{B.photo[D](E)
}catch(C){D="main"
}var A="";
if(B.photo){A+='<figure class="media">';
if(B.photo.url()){A+='<a href="'+B.photo.url()+'">'
}A+='<img class="photo" src="'+B.photo[D](E)+'" alt="'+(B.photo.alt()||"")+'" />';
if(B.photo.url()){A+="</a>"
}if(B.photo.caption()){A+='<figcaption class="caption">'+B.photo.caption()+"</figcaption>"
}if(B.photoCredits&&E&&(E.horizontal==="slideshowWideHorizontal"||E.vertical==="slideshowWideVertical")){A+='<p class="photo-credits">'+B.photoCredits()+"</p>"
}A+="</figure>"
}return A
},text:function(B){var A="";
if(B&&(B.rubric||B.header||B.subHeader||(B.body&&B.body().length>0)||B.embeddedList||(B.contributors&&B.contributors()!=='<div class="contributors"><p><span class="contributor"></span></p></div>')||B.photoCredits||B.footer||B.footerLegalCopy||(B.favorites&&B.favorites())||(B.purchaseUrl&&B.purchaseUrl().length>0))){A+='<div class="item-inner">';
A+='<header class="item-header">';
A+=B.rubric?'<h5 class="rubric">'+B.rubric()+"</h5>":"";
A+=B.header?'<h2 class="header">'+B.header()+"</h2>":"";
A+=B.subHeader?'<h3 class="sub-header">'+B.subHeader()+"</h3>":"";
A+="</header>";
A+='<div id = "slideshow-description-outer" class="body">';
A+=B.body&&B.body().length>0?B.body():"";
A+=B.contributors?'<div class="byline">'+B.contributors()+"</div>":"";
A+=B.photoCredits||B.footer?'<footer class="item-footer">':"";
A+=B.footer?'<div class="footer-text">'+B.footer()+"</div>":"";
A+=B.photoCredits?'<p class="photo-credits">'+B.photoCredits()+"</p>":"";
A+=B.photoCredits||B.footer?"</footer>":"";
A+=B.purchaseUrl&&B.purchaseUrl().length>0?'<a class="buy" target="_blank" href="'+B.purchaseUrl()+'">buy it now</a>':"";
A+=B.favorites&&B.favorites()?this.favoritesControls(B):"";
A+="</div>";
A+="</div>"
}return A
},enlargedItem:function(B){var A=this.baseItem(B,"enlargedItem");
return A
},variableItem:function(B,C){var A=this.baseItem(B,"variableItem",C);
return A
},favoritesControls:function(B){var A='<div class="cn_favorites_control parbase _cq_template"><div data-favorites-contentid="" class="favorites-controls">';
A+='<a href="#" title="CHANGE/REMOVE">favorite it</a></div></div>';
return A
}};
CN.page.config.slideshowIntroShowCallback=function(A){CN.dart.refresh();
if(CN.stats){CN.stats.trackAjaxPage("intro_show")
}if(CN.slideshow.remote.components.controls&&!jQuery.isEmptyObject(CN.slideshow.remote.components.controls)){CN.slideshow.controls.api.container.parent().hide()
}};
CN.page.config.slideshowIntroHideCallback=function(A){CN.dart.refresh();
if(CN.stats){CN.stats.trackAjaxPage("intro_hide")
}if(CN.slideshow.remote.components.controls&&!jQuery.isEmptyObject(CN.slideshow.remote.components.controls)){CN.slideshow.controls.api.container.parent().show()
}};
CN.page.config.slideshowViewLargerCallback=function(B,A){var C;
C=function(){if(B.slides[B.currentSlideIndex].getLabel()==="slide"){B.$el.find(".item").each(function(){if(jQuery(this).find(".item-inner").length<1){CN.debug.warn("Empty block in cn.slideshow.config that should be cleaned up")
}else{if(CN.schemaParser.getInstance().parse(B.data[B.currentSlideIndex]).layout){jQuery(this).addClass(CN.schemaParser.getInstance().parse(B.data[B.currentSlideIndex]).layout())
}}})
}try{B.$el.find(".item-inner").jScrollPane({scrollbarWidth:14,showArrows:true})
}catch(D){}};
B.onInterstitialShow.subscribe(function(){if(B.slide.getLabel()==="dartinterstitial"){try{CN.dart.call(CN.page.config.slideshowDartConfig.name,CN.page.config.slideshowDartConfig);
if(CN.stats){CN.stats.trackAjaxPage("slideshow_ad")
}}catch(D){CN.debug.warn("Tried to perform dart request but failed. Perhaps no interstitial exists")
}CN.dart.refresh()
}});
B.onSlideChangeComplete.subscribe(function(){C();
if(B.slide.getLabel()==="slide"){if(CN.stats){CN.stats.trackAjaxPage("slide"+(B.currentSlideIndex+1));
_gaq.push(["CNTracker._trackEvent","Slideshow","slide"+(B.currentSlideIndex+1)],document.location.href)
}}else{if(B.slide.getLabel()==="domslide"){if(CN.stats){CN.stats.trackAjaxPage("slideshow_offer");
_gaq.push(["CNTracker._trackEvent","Slidesow","slideshow_offer",document.location.href])
}}}});
C();
jQuery('<div id="slideshow-cm-replay-larger" class="slideshow-replay-larger"><a href="#">Replay</a></div>').insertAfter("#ss_cm_last_slide .share.slideshow-replay").click(function(){A.jumpToSlideCommand.execute(1);
return false
})
};
CN.page.config.slideshowViewLargerCloseCallback=function(A){jQuery("#slideshow-cm-replay-larger").remove()
};
CN.page.config.slideshowDartConfig={name:"slideshowInterstitial",sz:"300x250",kws:["interstitial","top"],store:false,ssready:false};
CN.slideshow.render=function(A,B){var E,G,J={},D=[],I,H,F,C;
CN.Observer.haveFired=jQuery.grep(CN.Observer.haveFired,function(L,K){return L==="onSlideshowReady"
},true);
if(CN.page.config.viewLarger){D.push("viewlarger")
}H=CN.url.getFragment();
F=CN.url.params().slide;
if(CN.page.config.hasIntro==="true"&&((H===false||H==="intro")&&!F)){jQuery("html").addClass("slideshow-hasintro-true")
}if(CN.page.config.hasIntro==="false"){jQuery("html").addClass("slideshow-showintro-false")
}if(H===false||H==="slide=1"||H==="intro"||(H===false&&F)){jQuery("html").addClass("slideshow-showinitial-true")
}else{jQuery("html").addClass("slideshow-showinitial-false")
}jQuery(A).slideshow({useIntro:true,useHistory:true,useInterstitial:CN.config.get("useInterstitial"),template:CN.config.get("template")||"item",plugins:D,onlyPreload:4,contentPath:B,showInterstitialTimer:CN.config.get("showInterstitialTimer")});
G=jQuery(A).slideshow();
J=G.slideshow;
I=function(){var K=(CN.dart.get?'<div id="'+CN.page.config.slideshowDartConfig.name+CN.page.config.slideshowDartConfig.sz+CN.dart.get("container")+'"></div>':""),L=jQuery(A).siblings(".last-slide");
if(J.slide){jQuery(".cn_favorites_control").find(".favorites-controls").attr("data-favorites-contentid",J.slide.contentId)
}if(jQuery(".cn_favorites_control").length>0&&!jQuery(".cn_favorites_control").hasClass("initialized")){CN.favorites.control.initFavoriteControl()
}jQuery(L).attr("id","ss_cm_last_slide");
jQuery(".slideshow-loading").fadeOut("slow");
jQuery(".slideshow-loading-message").fadeOut("slow",function(){jQuery(this).remove()
});
if(L){CN.slideshow.api.addSlide("ss_cm_last_slide",{slideType:"DomSlide",slideshow:J})
}CN.slideshow.api.addInterstitial(K,{slideType:"DartInterstitial",slideshow:J});
if(J.navigationItems.navigationViewAll){J.navigationItems.navigationViewAll.onShow.subscribe(function(){if(CN.stats){CN.stats.trackAjaxPage("slideshow_viewthumb")
}})
}if(jQuery("html").hasClass("slideshow-showinitial-true")){E()
}};
if(CN.Observer.haveFired.indexOf("onSlideshowReady")===-1){J.onSlideshowReady.subscribe(function(){I()
})
}else{I()
}jQuery(".slideshow-replay a").bind("click",function(){G.commands.jumpToSlideCommand.execute(1);
return false
});
jQuery("#slideshow-cm-subsoffer a").bind("click",function(){window.open(this.href);
return false
});
jQuery("#items-container .viewlarger a").bind("click",function(){if(CN.stats){CN.stats.trackAjaxPage("slideshow_enlarge")
}});
E=function(){if(CN.isUndefined(J.slide)){return this
}if(J.slide.getLabel()==="slide"){J.$el.find(".item").each(function(){if(jQuery(this).find(".item-inner").length<1){CN.debug.warn("Empty block in cn.slideshow.config that should be cleaned up.")
}else{if(CN.schemaParser.getInstance().parse(J.data[J.currentSlideIndex]).layout){jQuery(this).addClass(CN.schemaParser.getInstance().parse(J.data[J.currentSlideIndex]).layout())
}}});
if(CN.stats){CN.stats.trackAjaxPage("slide"+(J.currentSlideIndex+1));
_gaq.push(["CNTracker._trackEvent","Slideshow","slide"+(J.currentSlideIndex+1),document.location.href])
}}if(J.slide.getLabel()==="domslide"){if(CN.stats){CN.stats.trackAjaxPage("slideshow_offer")
}}if(J.slide.favorites&&CN.favorites){jQuery(".favorites-controls").attr("data-favorites-contentid",J.slide.contentId);
CN.favorites.control.initFavoriteControl()
}};
J.onForwardComplete.subscribe(function(){E()
});
J.onBackwardComplete.subscribe(function(){E()
});
J.onJumpToSlideComplete.subscribe(function(){E()
});
J.onSlideChangeComplete.subscribe(function(){var K=(jQuery("link[rel=canonical]").attr("href")||(location.protocol+"//"+location.host+location.pathname))+"?slide="+(J.currentSlideIndex+1);
CN.dart.refresh();
CN.facebook.refresh({url:K});
CN.twitter.refresh({url:K})
});
J.onInterstitialShow.subscribe(function(){if(J.slide.getLabel()==="dartinterstitial"){try{CN.dart.call(CN.page.config.slideshowDartConfig.name,CN.page.config.slideshowDartConfig);
if(CN.stats){CN.stats.trackAjaxPage("slideshow_ad")
}}catch(K){CN.debug.warn("Tried to perform dart request but failed. Perhaps no interstitial exists")
}}CN.dart.refresh()
});
CN.slideshow.remote.register({type:"slideshow",api:G})
};
if(typeof CN==="undefined"||!CN){throw ("CN and/or jQuery library is missing!")
}CN.dailyitem=CN.dailyitem||{};
CN.dailyitem=(function(F,H){var J,G,E,D,K,I=function(M){var L='<li class="dailyitem-carousel-item"><a href="?slide='+(M.pos+1)+'"><img src="'+M.thumb+'" alt="" /></a><span>'+(M.text||"")+"</span></li>";
G.append(L)
},B=function(L){D=L
},C=function(O){var P=0,M,R,Q,L,N=K.match(/(^\/.+\/)/)[0]+"cn_slideshow/";
for(Q in O){if(O.hasOwnProperty(Q)&&Q.match(/^item/)){L=N+Q;
if(O[Q].onTime&&O[Q].onTime.length>0){M=new Date(O[Q].onTime);
R=(M.getMonth)?M.getMonth()+"/"+M.getDate()+"/"+M.getFullYear():null
}else{R=null
}I({thumb:CN.schemaParser.schemas.fileReference(O[Q],{},L).photo.thumbnail(),pos:P,text:R});
P+=1
}}G.addClass("jcarousel-skin-default").appendTo(E).jcarousel({scroll:3,start:J,initCallback:B})
},A=function(L,N,M){K=N;
J=M;
E=F(L);
G=F("<ul class='dailyitem-navigation-carousel'>");
jQuery.ajax({type:"GET",url:K,dataType:"json",success:function(O){C(O)
},error:function(O,P){H.error("Data load failed for CN.dailyitem, probably 404 or malformed data: "+P)
}})
};
return{render:A}
}(jQuery,CN.debug));
CN.slideshow.remote=(function(){var C={text:{},controls:{},slideshow:{}},D=function(){var E;
for(E in C){if(C.hasOwnProperty(E)){if(typeof C[E].install==="function"){C[E].install(C)
}}}},B=function(){if(CN.slideshow.text&&CN.slideshow.text.updateContent){CN.slideshow.text.updateContent(C.slideshow.api.slideshow)
}if(CN.slideshow.controls&&CN.slideshow.controls.updateCount){CN.slideshow.controls.updateCount(C.slideshow.api.slideshow)
}},A=function(E){if(!E||!E.type){return false
}C[E.type]=E;
D()
};
return{refresh:B,install:D,register:A,components:C}
}());
CN.slideshow.controls=(function(){var E={},D=function(G){var F=G.slideshow.api;
if(F){E.buttons.next.click(function(){F.commands.goForwardCommand.execute();
return false
});
E.buttons.previous.click(function(){F.commands.goBackwardCommand.execute();
return false
});
F.slideshow.onSlideChangeComplete.subscribe(function(){CN.slideshow.controls.updateCount(F.slideshow)
});
F.slideshow.onSlideshowReady.subscribe(function(){CN.slideshow.controls.updateCount(F.slideshow)
});
F.slideshow.onSlideshowReady.subscribe(function(){if(CN.config.get("hasIntro")==="true"){CN.slideshow.controls.api.container.parent().hide()
}});
B.installed=true
}},C=function(F){E.container=jQuery(F);
E.buttons={next:E.container.find(".next"),previous:E.container.find(".previous")};
E.count=E.container.find(".count");
CN.slideshow.remote.register({type:"controls",api:E,install:D})
},A=function(F){E.count.html((F.currentSlideIndex+1)+CN.slideshow.config.countSeparator+F.slides.length)
},B={render:C,updateCount:A,installed:false,api:E};
return B
}());
CN.slideshow.text=(function(){var E={},D=function(G){var F=G.slideshow.api;
if(F){F.slideshow.onSlideshowReady.subscribe(function(){CN.slideshow.text.updateContent(F.slideshow)
});
F.slideshow.onSlideChangeComplete.subscribe(function(){CN.slideshow.text.updateContent(F.slideshow)
});
A.installed=true
}},B=function(F){E.container=jQuery(F);
CN.slideshow.remote.register({type:"text",api:E,install:D})
},C=function(G){var I,H=G.currentSlideIndex,F=(G.data&&G.data[H])?G.data[H]:false;
E.container.html(CN.schemaParser.getInstance().parse(F,G.config.contentPath).renderedHtml("text"))
},A={render:B,updateContent:C,installed:false,api:E};
return A
}());
/*
 * @filename userInfo.js
 * @description CN Toolkit User Service Handler
 * @author Russell Munson
 */
var CN=CN||{};
CN.toolkit=CN.toolkit||{};
CN.toolkit.userService=(function(){if(typeof jQuery==="undefined"){jQuery=function(){return false
}
}var jQ=jQuery,formObj=false,passField=false,passConfirm=false,activeUserField=false,errIdSuffix="_err",toggleEls={email:{free:"#regSection,#rememberMeSection",taken:"#loginSection,#rememberMeSection"}},accountStatus=jQ("#accountStatus"),responseCodes={email:{"-1":{val:"UNKN"},"100":{val:"AUTH",action:"taken"},"101":{val:"REG",action:"free"},"302":{val:"DIS"},"303":{val:"UNCONF"},"413":{val:"REG"}},user:{"-1":{action:""},"110":{action:"taken"},"111":{action:""},"411":{action:"invalid"}}},messages={email:{invalid:"Email address is invalid.",taken:"Email address already in use."},user:{taken:"Username is already taken.<br /> Here are some suggestions:<br />",invalid:"Username is invalid.",length:"Username is invalid (minimum six characters)",suggest:""},pass:{invalid:"Password is invalid.",length:"Password is invalid (minimum six characters)",nomatch:"Passwords do not match."}},errors={};
function takeAction(type,action){action=action||false;
jQ(toggleEls[type].free+","+toggleEls[type].taken).addClass("hidden");
if(action){jQ(toggleEls[type][action]).removeClass("hidden")
}return false
}jQ("a.suggestedusername").live("click",function(){activeUserField.value=this.innerHTML;
CN.toolkit.userService.checkUser(activeUserField);
return false
});
function accountStatusCheck(){var emails=responseCodes.email,v;
for(v in emails){if(emails.hasOwnProperty(v)){if(emails[v].val===accountStatus.val()){return takeAction("email",emails[v].action)
}}}return false
}function emailResponse(resp){resp+="";
accountStatus.val((responseCodes.email[resp].val||""));
takeAction("email",(responseCodes.email[resp].action||false));
return false
}function drawError(el,code,clear,type,append){if((!el.value||el.value.length<1)&&code!=="nomatch"){clear=true
}var errElId=(el.id||el.name)+errIdSuffix,errEl=jQ("#"+errElId.replace(/\./g,"\\.")),errMsg="";
if(clear===true){errEl.remove();
return false
}if(errEl.length===0&&formObj){errEl=jQ('<p id="'+errElId+'" class="errMsg">');
errEl.insertAfter(el)
}errMsg=messages[type][code];
if(append){errEl.append(errMsg)
}else{errEl.html(errMsg)
}return false
}function userResponse(resp){var result=resp.split(":"),action=responseCodes.user[result[0]].action||"",aStr="",suggestions="";
result[0]+="";
drawError(activeUserField,action,(action==="taken"?false:true),"user");
if(action==="taken"){aStr='<a href="#" class="suggestedusername">';
suggestions=aStr+result[1].replace(/\|/g,"</a><br />"+aStr)+"</a>";
messages.user.suggest=suggestions;
drawError(activeUserField,"suggest",false,"user",true)
}return false
}function isValidEmail(val){if(CN.reg&&CN.reg.email){return CN.reg.email(val)
}var pat=/^[\w\.\-\+!#\$%\&'\*\/=\?\^`\{\|\}~]{1,64}@[\w\+\-]+\.[\w\.]{2,6}$/;
return(val.match(pat)===null?false:true)
}function isValidPass(val){if(CN.reg&&CN.reg.password){return CN.reg.password(val)
}var pat=/^.{6,80}$/;
return(val.match(pat)===null?false:true)
}function isMatch(val,val2){return(val===val2?true:false)
}function isValidUsername(val){if(CN.reg&&CN.reg.username){return CN.reg.username(val)
}return(/^[\w\d_]{3,50}$/).test(val)
}function bindEvents(){var me=CN.toolkit.userService;
jQ("#userEntry\\.email").bind("blur",function(){me.checkEmail(this)
});
jQ("#registerUsername").bind("blur",function(){me.checkUser(this)
});
jQ("#registerPassword, #authPassword").bind("blur",function(){me.checkPass(this)
});
jQ("#registerPasswordConfirm").bind("blur",function(){me.checkPass2(this)
})
}function errorMsgs(str){var msg;
switch(str){case"username":msg="Username must be between 3  to 50  alpha-numeric characters and have no spaces";
break;
case"email":msg="Please check email format.";
break;
case"password-mismatch":msg="Password and Confirm Password do not match.";
break;
case"password":msg="must be 6 or more alpha-numeric characters and have no spaces";
break;
case"newsletter":msg="Please select your Newsletter Preferences.";
break;
case"subscription":msg="Subscription selection required.";
break;
case"required":msg=" is required.";
break;
default:msg="";
break
}return msg
}function errorTracker(key,value){errors[key]=value
}function formatErrors(formatArray){var temp=[],i;
for(i=0;
i<formatArray.length;
i++){if(errors[formatArray[i]]!==undefined){temp.push(errors[formatArray[i]])
}}return temp.join("")
}function displayError(container,str,classname){var errorBox=container.find("."+classname);
if(errorBox.length>0){errorBox.html(str)
}else{container.prepend('<div class="'+classname+'">'+str+"</div>")
}}function getLabel(obj){return obj.find("label").text().replace("*","").replace(":","")
}function resetErrorFields(container,classname){var errorFields=container.find("."+classname),i;
if(errorFields.length>0){for(i=0;
i<errorFields.length;
i++){errorFields.eq(i).removeClass(classname)
}}errors={}
}function isEmpty(str){if(str===""||str===null){return true
}else{return false
}}function basicValidation(prop){var requiredFields,formContainer=prop.formContainer,errorClassName=prop.errorClass,subscriptionFields=formContainer.find("form").find(".cn_ecom_placement:visible"),newsletterFields=formContainer.find(".newsletter:visible"),subscriptionDependencies=formContainer.find(".address1:visible, .city:visible"),stateField=formContainer.find(".state:visible"),zipField=formContainer.find(".zip:visible"),countryVal=formContainer.find(".country:visible").find("option:selected").val(),tempObj,subscriptionError,newsletterError,i;
if(subscriptionFields.length>0&&subscriptionFields.find("input:radio").length>0){subscriptionError=false;
for(i=0;
i<subscriptionFields.length;
i++){tempObj=subscriptionFields.eq(i);
if(tempObj.find("input:checked").val()===undefined){if(!subscriptionError){errorTracker("subscription",'<li>* <span class="error">'+errorMsgs("subscription")+"</span></li>")
}newsletterError=true;
tempObj.addClass(errorClassName)
}else{if(tempObj.find("input:checked").val()!=="0"){if(subscriptionDependencies.find("em").length===0){subscriptionDependencies.addClass("required").find("label").prepend("<em>*</em>")
}}else{subscriptionDependencies.removeClass("required");
subscriptionDependencies.find("label").children().remove()
}}}}if(countryVal!=="US"&&countryVal!=="CA"){stateField.removeClass("required").find("label").children().remove();
zipField.removeClass("required").find("label").children().remove()
}else{if(stateField.find("em").length===0){stateField.addClass("required").find("label").prepend("<em>*</em>")
}if(zipField.find("em").length===0){zipField.addClass("required").find("label").prepend("<em>*</em>")
}}requiredFields=formContainer.find(".required:visible");
if(requiredFields.length>0){for(i=0;
i<requiredFields.length;
i++){tempObj=requiredFields.eq(i);
if(!tempObj.hasClass("password")&&!tempObj.hasClass("newsletter")&&!tempObj.hasClass("username")&&!tempObj.hasClass("tip")){if(tempObj.hasClass("email")){if(!isEmpty(tempObj.find("input").val())){if(!isValidEmail(tempObj.find("input").val())){errorTracker("email",'<li>* <span class="error">'+errorMsgs("email")+"</span></li>");
tempObj.addClass(errorClassName)
}}else{errorTracker("email",'<li>* <span class="error">'+getLabel(tempObj)+errorMsgs("required")+"</span></li>");
tempObj.addClass(errorClassName)
}}else{if(tempObj.find("select").length>0){if(isEmpty(tempObj.find("option:selected").val())){errorTracker(getLabel(tempObj).toLowerCase(),'<li>* <span class="error">'+getLabel(tempObj)+errorMsgs("required")+"</span></li>");
tempObj.addClass(errorClassName)
}}else{if(tempObj.find("input").length>0){if(isEmpty(tempObj.find("input").val())){errorTracker(getLabel(tempObj).toLowerCase(),'<li>* <span class="error">'+getLabel(tempObj)+errorMsgs("required")+"</span></li>");
tempObj.addClass(errorClassName)
}}}}}}}if(newsletterFields.length>0){newsletterError=false;
for(i=0;
i<newsletterFields.length;
i++){tempObj=newsletterFields.eq(i);
if(tempObj.find("input:radio").length>0){if(tempObj.find("input:checked").val()===undefined){if(!newsletterError){errorTracker("newsletter",'<li>* <span class="error">'+errorMsgs("newsletter")+"</span></li>")
}newsletterError=true;
tempObj.addClass(errorClassName)
}}}}}return{init:function(formId,elList,manBind){formObj=jQ(formId);
toggleEls=elList||toggleEls;
if(!manBind){jQ(function(){bindEvents()
})
}accountStatusCheck();
return false
},checkEmail:function(el){var isvalid=(el&&isValidEmail(el.value));
drawError(el,"invalid",isvalid,"email");
if(isvalid&&accountStatus[0].value!=="IN"){userService.checkEmailStatus(el.value,emailResponse)
}return false
},checkUser:function(el){if(el.value.length<6){drawError(el,"length",false,"user");
return 
}var isvalid=isValidUsername(el.value),firstname="userEntry.firstName",lastname="userEntry.lastName";
drawError(el,"invalid",isvalid,"user");
if(isvalid){activeUserField=el;
userService.checkUsernameStatus(el.value,true,formObj[0][firstname].value,formObj[0][lastname].value,userResponse)
}return false
},checkPass:function(el){if(el&&el.value.length<4){drawError(el,"length",false,"pass");
return 
}var isvalid=el&&isValidPass(el.value);
passField=el;
drawError(el,"invalid",isvalid,"pass");
return false
},checkPass2:function(el){if(!passField){return false
}var ismatch=(passField&&isMatch(el.value,passField.value));
passConfirm=el;
drawError(el,"nomatch",ismatch,"pass");
return false
},registration:function(){var msg="",formContainer=jQuery("article.registration"),errorClassName="form-element-error",errorOrder=["email","password","confirm-password","password-mismatch","username","address 1","city","state","zip/postal code","country","subscription","newsletter"],usernameField=formContainer.find(".username:visible"),usernameValue=usernameField.find("input").val(),passwordFields=formContainer.find(".password:visible"),initialPasswordField="",confirmPasswordField="";
resetErrorFields(formContainer,errorClassName);
basicValidation({formContainer:formContainer,errorClass:errorClassName});
if(!isValidUsername(usernameValue)){errorTracker("username",'<li>* <span class="error">'+errorMsgs("username")+"</span></li>");
usernameField.addClass(errorClassName)
}if(passwordFields.length>1){initialPasswordField=passwordFields.eq(0);
confirmPasswordField=passwordFields.eq(1);
if(!isValidPass(initialPasswordField.find("input").val())){errorTracker("password",'<li>* <span class="error">'+getLabel(initialPasswordField)+" "+errorMsgs("password")+"</span></li>");
initialPasswordField.addClass(errorClassName)
}if(!isValidPass(confirmPasswordField.find("input").val())){errorTracker("confirm-password",'<li>* <span class="error">'+getLabel(confirmPasswordField)+" "+errorMsgs("password")+"</span></li>");
confirmPasswordField.addClass(errorClassName)
}if(initialPasswordField.find("input").val()!==confirmPasswordField.find("input").val()){errorTracker("password-mismatch",'<li>* <span class="error">'+errorMsgs("password-mismatch")+"</span></li>");
initialPasswordField.addClass(errorClassName);
confirmPasswordField.addClass(errorClassName)
}}msg=formatErrors(errorOrder);
if(!isEmpty(msg)){msg="<h3>Please correct the information highlighted below and resubmit.  Required fields are noted with an asterisk.</h3><ul>"+msg+"</ul>";
displayError(formContainer,msg,"errors");
jQuery(window).scrollTop(0);
return false
}else{return true
}},subscription:function(){var msg="",formContainer=jQuery("article.registration"),errorClassName="form-element-error",errorOrder=["email","address","city","state","zip/postal code","country","subscription","username","password","confirm-password","password-mismatch","newsletter"],usernameField=formContainer.find(".username:visible"),usernameValue=usernameField.find("input").val(),passwordFields=formContainer.find(".password:visible"),initialPasswordField="",confirmPasswordField="";
resetErrorFields(formContainer,errorClassName);
basicValidation({formContainer:formContainer,errorClass:errorClassName});
usernameField.removeClass("required").find("label").children().remove();
passwordFields.removeClass("required").find("label").children().remove();
if(!isEmpty(usernameValue)){if(!isValidUsername(usernameValue)){errorTracker("username",'<li>* <span class="error">'+errorMsgs("username")+"</span></li>");
usernameField.addClass(errorClassName);
usernameField.addClass("required").find("label").prepend("<em>*</em>")
}if(passwordFields.length>1){initialPasswordField=passwordFields.eq(0);
confirmPasswordField=passwordFields.eq(1);
if(!isValidPass(initialPasswordField.find("input").val())){errorTracker("password",'<li>* <span class="error">'+getLabel(initialPasswordField)+" "+errorMsgs("password")+"</span></li>");
initialPasswordField.addClass(errorClassName);
initialPasswordField.addClass("required").find("label").prepend("<em>*</em>")
}if(!isValidPass(confirmPasswordField.find("input").val())){errorTracker("confirm-password",'<li>* <span class="error">'+getLabel(confirmPasswordField)+" "+errorMsgs("password")+"</span></li>");
confirmPasswordField.addClass(errorClassName);
confirmPasswordField.addClass("required").find("label").prepend("<em>*</em>")
}if(initialPasswordField.find("input").val()!==confirmPasswordField.find("input").val()){errorTracker("password-mismatch",'<li>* <span class="error">'+errorMsgs("password-mismatch")+"</span></li>");
passwordFields.addClass(errorClassName);
if(initialPasswordField.find("em").length===0){initialPasswordField.addClass("required").find("label").prepend("<em>*</em>")
}if(confirmPasswordField.find("em").length===0){confirmPasswordField.addClass("required").find("label").prepend("<em>*</em>")
}}}}msg=formatErrors(errorOrder);
if(!isEmpty(msg)){msg="<h3>Please correct the information highlighted below and resubmit.  Required fields are noted with an asterisk.</h3><ul>"+msg+"</ul>";
displayError(formContainer,msg,"errors");
jQuery(window).scrollTop(0);
return false
}else{return true
}},login:function(){var msg="",formContainer=jQuery("div.login"),errorClassName="form-element-error",username=formContainer.find(".username"),password=formContainer.find(".password"),i;
resetErrorFields(formContainer,errorClassName);
if(username.length>0){if(isEmpty(username.eq(0).find("input").val())||!isValidEmail(username.eq(0).find("input").val())){msg+="* "+errorMsgs("email")+"<br />";
username.eq(0).addClass(errorClassName)
}}if(password.length>0){if(isEmpty(password.eq(0).find("input").val())||!isValidPass(password.eq(0).find("input").val())){msg+="* Password "+errorMsgs("password")+"<br />";
password.eq(0).addClass(errorClassName)
}}if(!isEmpty(msg)){displayError(formContainer.find(".cn_global_error").eq(0),"<p>"+msg+"</p>","error");
return false
}else{return true
}},forgotPwd:function(){var msg=[],formContainer=jQuery("div.login"),errorClassName="form-element-error",username=formContainer.find(".username"),email=formContainer.find(".email"),usernameVal,emailVal,emailError="",i=0;
resetErrorFields(formContainer,errorClassName);
if(email.length>0&&username.length>0){usernameVal=username.eq(0).find("input").val();
emailVal=email.eq(0).find("input").val();
if(isValidEmail(emailVal)){if(isEmpty(usernameVal)||isValidUsername(usernameVal)){return true
}}else{msg[i]="<li>"+errorMsgs("email")+"</li>";
i++;
emailError="email.eq(0).addClass(errorClassName)"
}if(isValidUsername(usernameVal)){if(isEmpty(emailVal)||isValidEmail(emailVal)){return true
}}else{msg[i]="<li>"+errorMsgs("username")+"</li>";
username.eq(0).addClass(errorClassName)
}}if(msg.length!==0){eval(emailError);
displayError(formContainer.find(".cn_global_error").eq(0),"<ul>"+msg.join("")+"</ul>","error");
return false
}}}
}());
CN.regInit=(function(P,B){var F="#userProfileForm",I="basic",K="",D=1,E="",R=true,M={},A=".sampleNL",O=".cn_user_registration_option_container .section-offer",G=O+" input",N=function(){B(A,P.reg.getForm()).bind("click",function(S){this.target="_new"
})
},Q=function(V,U){var S=B(".cn_user_registration_option_demographic div.mod-info"),T=V||B(G)[0];
if(U.value==="SUBSCRIBED"){S.css("position","relative").slideDown()
}else{S.slideUp()
}},L=function(T,S,U){if(S){T.slideDown(function(){B(this).removeClass("hidden").removeAttr("style")
}).children("input").removeAttr("disabled")
}else{if(U.filter(":checked").length===0){T.slideUp().children("input").attr("disabled","disabled")
}}},J=function(){P.reg.setForm(F).setBirthday();
if(I==="newsletter"){N()
}B("#country").bind("change",P.world.setState);
B("#birthYear").bind("focus blur",function(U){if(this.value===""&&U.type==="blur"){this.value="YYYY";
return 
}if(this.value==="YYYY"&&U.type==="focus"){this.value=""
}});
P.reg.getForm().bind("submit",function(){var U=P.utils.intval(B(G+":checked").val())||0,V="subOffer=";
B.each([this["ecomErrorView"],this["cdsErrorView"]],function(){if(this.value&&this.value.indexOf(V)!==-1){this.value=this.value.split(V).join(V+U)
}})
});
if(D===2){B(G).live("click",function(U){Q(U,this);
U.stopPropagation()
}).filter(":checked").triggerHandler("click")
}var T=B(".phoneOpt input",P.reg.getForm().selector+" .mod-preferences").add(".wrlsOpt input:checkbox",P.reg.getForm()),S=B(".phone",P.reg.getForm());
T.bind("click",function(){var U=this;
L(S,(this.type==="checkbox"?(this.checked):(this.value==="SUBSCRIBED")),T.filter(function(){return B.unique([this,U]).length>1
}))
}).filter(":checked,input:checkbox").triggerHandler("click")
},C=function(){var T=B("#suggestions a.suggestedusername"),S=B("#username").val();
B("#suggestions a.suggestedusername",P.reg.getForm()).live("click",function(){B("#username",P.reg.getForm()).val(this.id).parents(".row").removeClass("error");
B("#suggestions",P.reg.getForm()).remove();
return false
});
B.each(T,function(U,V){var W=B(V).html();
B(V).html(W.replace(S,S+"<i>")+"</i>")
})
},H=function(){J();
CN.debug.info("CN.regInit.load() is firing CN.customEvents.RegInit.SetEvents");
B(window).triggerHandler("CN.customEvents.RegInit.SetEvents");
if(I==="newsletter"){return this
}C();
return this
};
return{init:function(){H()
},setForm:function(S){F=S;
return B(F)
},setProgramData:function(V,U,T,S){R=false;
I=V||I;
K=U||K;
E=T||E;
D=S||D
},setOfferVisibility:function(){P.regInit.offerEvents()
},offerEvents:function(){if(B(G).length>0){B(O).css("display","block")
}Q()
},getProgram:function(){return I
},getProgramTrack:function(){return K
},getRegstatus:function(){return E
},getPage:function(){return D
}}
}(CN,jQuery));
CN.dropdown=CN.dropdown||{};
CN.dropdown=(function(B){var A=function(){var C=B(".cn-dropdown");
C.each(function(J){var F,L,K,G,N,E,M,I,D,H;
F=B(this);
L=F.find("h3");
K=B("ul",F);
D=false;
F.hover(function(){D=true
},function(){D=false
});
B("body").mouseup(function(){if(!D){K.hide()
}});
G=function(){K.toggle();
L.toggleClass("collapse")
};
L.bind("click",G);
if(F.hasClass("cn-dropdown-button")){E=B("li",K);
M=function(){var Q,R,O,P;
Q=B(this);
R=B("a",Q);
O=B("span.cn-dropdown-item",Q);
P=B("div.cn-dropdown-button-container a.cn-dropdown-button-button",F);
L.text(O.text());
P.attr("href",R.attr("href"));
K.hide()
};
E.each(function(){B(this).bind("click",M)
})
}})
};
return{init:function(){A()
}}
}(jQuery));
/*
* @file cn.myFavoriteList.js
* @copyright (c) Conde Nast Digital
*/
if(typeof CN==="undefined"||!CN||typeof jQuery==="undefined"||!jQuery){throw ("CN and/or jQuery library is missing!")
}CN.mySavedProducts=(function(h){var a=[],o=[],Z=h("#save-for-later"),T,d,U,O,l,P,j,k,S,K,p,Y,n,e,I="list",b=0,C,W,F,B,Q=CN.config.get("collectionNames")?CN.config.get("collectionNames").split(","):"",q="off",E=(CN.site.env==="DEV")?"newspaperUserId":"userId",f=(CN.url.params(E)==="")?CN.pluck.user.userId:CN.url.params(E),L=(f!==CN.pluck.user.userId)?"third":"first",M=f+"_favoriteList_",V=f+"_item_key",g=f+"_item_key_date",X=function(u){d=new PluckSDK.UpdateCustomItemActionRequest();
d.Content=a[u];
d.CustomItemKey=new PluckSDK.CustomItemKey({Key:V+u.substring(u.lastIndexOf("_"))});
d.DisplayText="Saved Favorites IDs";
d.IncludeInRecentActivity=false;
d.MimeType="saved_favorites_ids";
d.Name="Saved Favorites List";
T=new PluckSDK.UpdateCustomItemActionRequest();
T.Content=o[u];
T.CustomItemKey=new PluckSDK.CustomItemKey({Key:g+u.substring(u.lastIndexOf("_"))});
T.DisplayText="Saved Favorites Dates";
T.IncludeInRecentActivity=false;
T.MimeType="saved_favorites_dates";
T.Name="Saved Favorites Dates";
O=new PluckSDK.AddCustomCollectionActionRequest();
O.CustomCollectionKey=new PluckSDK.CustomCollectionKey({Key:u});
O.CustomCollectionName="Saved Favorites List Collection";
j=new PluckSDK.InsertIntoCollectionActionRequest();
j.CustomCollectionKey=new PluckSDK.CustomCollectionKey({Key:u});
j.Position=0;
j.TargetKey=new PluckSDK.CustomItemKey({Key:V+u.substring(u.lastIndexOf("_"))});
l=new PluckSDK.InsertIntoCollectionActionRequest();
l.CustomCollectionKey=new PluckSDK.CustomCollectionKey({Key:u});
l.Position=0;
l.TargetKey=new PluckSDK.CustomItemKey({Key:g+u.substring(u.lastIndexOf("_"))});
Y=[];
Y.push(d);
Y.push(T);
Y.push(O);
Y.push(j);
Y.push(l);
PluckSDK.SendRequests(Y,function(v){})
},H=function(u,v){v=M+v;
if(typeof a[v]==="undefined"){a[v]=u
}else{a[v]=a[v]+","+u
}C=new Date();
W=C.getDate();
B=C.getMonth()+1;
F=C.getFullYear();
C=B+"/"+W+"/"+F;
if(typeof o[v]==="undefined"){o[v]=C
}else{o[v]=o[v]+","+C
}X(v);
return false
},r=function(u){S=new PluckSDK.RemoveFromCollectionActionRequest();
S.CustomCollectionKey=new PluckSDK.CustomCollectionKey({Key:u});
S.TargetKey=new PluckSDK.CustomItemKey({Key:V+u.substring(u.lastIndexOf("_"))});
K=new PluckSDK.RemoveFromCollectionActionRequest();
K.CustomCollectionKey=new PluckSDK.CustomCollectionKey({Key:u});
K.TargetKey=new PluckSDK.CustomItemKey({Key:g+u.substring(u.lastIndexOf("_"))});
Y=[];
Y.push(S);
Y.push(K);
PluckSDK.SendRequests(Y,function(v){})
},m=function(u){q=u;
U=new PluckSDK.UpdateCustomItemActionRequest();
U.Content=q;
U.CustomItemKey=new PluckSDK.CustomItemKey({Key:f+"PrivicySetting"});
U.DisplayText="Saved Favorites Privicy Setting";
U.IncludeInRecentActivity=false;
U.MimeType="privicy_setting";
U.Name="Saved Favorites Privicy";
P=new PluckSDK.AddCustomCollectionActionRequest();
P.CustomCollectionKey=new PluckSDK.CustomCollectionKey({Key:f+"PrivicySettingCollection"});
P.CustomCollectionName="Saved Favorites List Collection";
k=new PluckSDK.InsertIntoCollectionActionRequest();
k.CustomCollectionKey=new PluckSDK.CustomCollectionKey({Key:f+"PrivicySettingCollection"});
k.Position=0;
k.TargetKey=new PluckSDK.CustomItemKey({Key:f+"PrivicySetting"});
Y=[];
Y.push(U);
Y.push(P);
Y.push(k);
PluckSDK.SendRequests(Y,function(v){})
},R=function(AA,z){z=M+z;
var w=a[z].split(","),y=a.all.split(","),x=o[z].split(","),AB=o.all.split(","),u,v;
u=h.inArray(AA,w);
v=h.inArray(AA,y);
if(u!==-1){w.splice(u,1);
x.splice(u,1)
}if(v!==-1){y.splice(v,1);
AB.splice(v,1)
}a.all=y.toString();
a[z]=w.toString();
o.all=AB.toString();
o[z]=x.toString();
if(a[z]===""){r(z)
}else{X(z)
}h("[data-content-id = "+AA+"]").remove()
},D=function(){var w,v,u;
h(".my-saved-favorites-list .search-result").each(function(){var x=0,y;
h(this).find(".delete").click(function(){var z=0,AA;
w=h(this).parent().attr("data-content-id");
for(z in Q){if(Q.hasOwnProperty(z)){AA=M+Q[z];
if(a[AA]&&a[AA].indexOf(w)!==-1){R(w,Q[z]);
break
}}}return false
});
w=h(this).attr("data-content-id");
for(x in Q){if(Q.hasOwnProperty(x)){y=M+Q[x];
if(typeof a[y]!=="undefined"){if(a[y].split(",").indexOf(w)!==-1){v=a[y].split(",").indexOf(w);
u=o[y].split(",")[v];
h(this).find(".favorites-date").html(u)
}}}}})
},s=function(w,y,AB,v){var x=h(".my-saved-favorites-list."+I).attr("data-favorite-data-path"),u=(w===""||w===null)?"score desc":w,AA="/apps/foundation/components/cn_favorite_list.results.html",z;
if(y===""||y===null){z="&page=1&rows="+v
}else{z="&page="+y+"&rows="+v
}h.ajax({url:"/bin/content/lookup",data:"ids="+AB+"&site="+CN.site.siteRoot+"&sort="+u+z+"&path="+AA+"&dataPath="+x,type:"POST",async:false,cache:false,error:function(AE,AC,AD){h(".my-saved-favorites-list."+I+" .favorites-result").html("<p>There are no items saved in this book.</p>")
},success:function(AC){h(".my-saved-favorites-list."+I+" .favorites-result").empty();
h(".my-saved-favorites-list."+I+" .favorites-result").append(innerShiv(AC,false));
h(".my-saved-favorites-list.active").removeClass("active");
h(".my-saved-favorites-list."+I).addClass("active");
D();
return true
}})
},A=function(){var u;
for(u in Q){if(Q.hasOwnProperty(u)&&Q[u]!=="all"&&a[M+Q[u]]&&a[M+Q[u]].indexOf(e)!==-1){return Q[u]
}}return false
},c=function(y){var w,v,u="",z,x;
if(typeof a.all==="undefined"){a.all=""
}if(typeof o.all==="undefined"){o.all=""
}if(y===null){y=[]
}for(w=0;
w<y.length;
w++){if(y[w].TotalItems>0){u=y[w].CustomCollectionKey.Key;
for(x in y[w].Items){if(y[w].Items.hasOwnProperty(x)){if(y[w].Items[x].MimeType==="saved_favorites_dates"){o[u]=y[w].Items[x].Content;
o[u]=o[u].split(",")
}else{a[u]=y[w].Items[x].Content;
a[u]=a[u].split(",")
}}}for(v=0;
v<a[u].length;
v++){if(a.all.indexOf(a[u][v])===-1){if(a.all===""){a.all=a[u][v];
o.all=o[u][v]
}else{a.all=a.all+","+a[u][v];
o.all=o.all+","+o[u][v]
}}}a[u]=a[u].toString();
o[u]=o[u].toString()
}}if(y.length>1){u="all"
}if(p==="display"){if(u!==""&&a[u]!==""){s("","",a[u],b)
}else{h(".my-saved-favorites-list."+I+" .favorites-result").html("<p>There are no items saved in this book.</p>")
}}else{if(p==="validate"){z=A();
if(z){h(".favorites-controls").attr("class","favorites-controls initialized").addClass(z);
h(".favorites-items a.favorites-collection").removeClass("selected");
h("[data-favorites-collection-name="+z+"]").addClass("selected")
}}}},J=function(w,v){var u=0;
Y=[];
if(typeof v!=="undefined"){I=v
}b=h(".my-saved-favorites-list."+I).attr("data-favorite-number-results");
if(w==="all"){for(u in Q){if(Q.hasOwnProperty(u)){w=M+Q[u];
O=new PluckSDK.CustomCollectionsPageRequest();
O.CustomCollectionKey=new PluckSDK.CustomCollectionKey({Key:w});
O.ItemsPerPage=10;
O.OneBasedOnPage=1;
Y.push(O)
}}PluckSDK.SendRequests(Y,c)
}else{w=M+w;
O=new PluckSDK.CustomCollectionsPageRequest();
O.CustomCollectionKey=new PluckSDK.CustomCollectionKey({Key:w});
O.ItemsPerPage=10;
O.OneBasedOnPage=1;
Y.push(O);
PluckSDK.SendRequests(Y,c)
}},N=function(w){var u=(q==="on")?"off":"on",v=jQuery(".my-saved-favorites-list.list");
P=new PluckSDK.CustomCollectionsPageRequest();
P.CustomCollectionKey=new PluckSDK.CustomCollectionKey({Key:f+"PrivicySettingCollection"});
P.ItemsPerPage=10;
P.OneBasedOnPage=1;
Y=[];
Y.push(P);
PluckSDK.SendRequests(Y,function(x){if(typeof x[0].Items!=="undefined"){q=x[0].Items[0].Content
}if(L==="first"){J(w,I);
jQuery(".cn_favorites_nav").show();
v.addClass("active");
v.prev().show()
}else{if(q==="off"){J(w,I);
jQuery("li[data-favorite-view-type='cart'], .my-saved-favorites-list.cart").remove();
jQuery(".cn_favorites_nav, .cn_favorite_list").show()
}}jQuery(".cn_favorite_list .favorites-privacy-settings a."+u).addClass("active")
})
},G=function(u,v){var y=h("a.paginationNext"),w=h("a.paginationPrevious"),AA=h(".paginatorForm"),AC=u.split(","),x=Math.ceil(AC.length/v),AB,z=1;
AA.live("submit",function(){AB=h(".forumPaginator").val();
if(AB<=x&&AB>0){s("",h(".forumPaginator").val(),u,v);
window.scrollTo(0,0)
}return false
});
y.attr("href","#").live("click",function(){if(z<x){z=z+1;
s("",z,u,v);
window.scrollTo(0,0)
}return false
});
w.attr("href","#").live("click",function(){if(z>1){z=z-1;
s("",z,u,v);
window.scrollTo(0,0)
}return false
})
};
return{initProductPage:function(u){p="display";
if(L==="third"){jQuery(".cn_favorite_list .favorites-privacy-settings").hide()
}else{jQuery(".cn_favorite_list .favorites-privacy-settings a").each(function(){var v=jQuery(this),w=jQuery(".cn_favorite_list .favorites-privacy-settings");
v.click(function(){if(v.hasClass("on")){m("on");
v.removeClass("active");
w.find("a.off").addClass("active");
return false
}else{if(v.hasClass("off")){v.removeClass("active");
m("off");
w.find("a.on").addClass("active");
return false
}}})
})
}N(u)
},checkFavorite:function(u){p="validate";
e=u;
J("all")
},initSavedProductsPage:function(u){p="display";
J(u)
},saveFavorite:H,getFavorites:J,deleteFavorite:R}
}(jQuery));
/*
* @file cn.favorite_control.js
* @copyright (c) Conde Nast Digital
*/
if(typeof CN==="undefined"||!CN||typeof jQuery==="undefined"||!jQuery){throw ("CN and/or jQuery library is missing!")
}if(!CN.favorites){CN.favorites={}
}CN.favorites.control=(function(F){var B="",D=false,C,E,K=function(){var L=F(".favorites-controls");
C=F(L).offset().top+F(L).height()/2;
E=F(L).offset().left-F(".favorites-items").width();
F(".favorites-items").css({top:C,left:E});
F(".favorites-items").addClass("active")
},A=function(){var T=CN,O=0,S=0,Q=location.pathname+location.hash,R=[],V=false,N=location.protocol+"//"+location.host,W=(CN.site.env==="PROD")?"http://event."+CN.site.name+".com/":"http://stag-event."+CN.site.name+".com/",M=F(".cn_contentwell figure.media img").attr("src"),U,P=CN.slideshow.util.getSlideFromUrl(),L=jQuery("#items-container").slideshow().slideshow.data;
if(CN.site&&CN.site.allowedDomains){R=CN.site.allowedDomains.split(",");
S=R.length
}for(O=0;
O<S;
O++){if(N.indexOf(R[O])>=0){V=true
}}if(typeof L==="undefined"){U=CN.utils.trim(document.title)
}else{U=L[P-1].ecom.productName;
if(typeof U==="undefined"){U=L[P-1].header
}}if(V){Q=N+Q;
T.site=T.site||{};
T.site.eventTrackingList=new EventList("eventListHolder");
T.site.eventTrackingList.setBaseUrl(W);
T.site.eventTrackingEvent=new EventObject(CN.site.code,"most_favorited");
T.site.eventTrackingEvent.setEnvironment(CN.site.env);
T.site.eventTrackingEvent.setContentId(B);
T.site.eventTrackingEvent.setImgUrl(M);
T.site.eventTrackingEvent.setFullUrl(Q);
T.site.eventTrackingEvent.setContentTitle(U);
T.site.eventTrackingList.addEvent(T.site.eventTrackingEvent);
T.site.eventTrackingList.writeImageTags()
}},G=function(P){var O=F(P).attr("data-favorites-collection-name"),N="favorites-controls initialized",M=F(".favorites-items ul a.selected"),Q=F(M).attr("data-favorites-collection-name"),L=F(P).get(0)===F(M).get(0),R=F(".favorites-controls");
if(F(M).length>0){CN.mySavedProducts.deleteFavorite(B,Q);
F(M).removeClass("selected");
R.removeClass(Q)
}if(!L){CN.mySavedProducts.saveFavorite(B,O);
F(P).addClass("selected");
R.attr("class",N+" "+O)
}A();
F(".favorites-items").removeClass("active");
return false
},J=function(){var L=F(".favorites-controls");
B=F(L).attr("data-favorites-contentid").toString();
F(L).addClass("initialized");
F(".favorites-controls > a").bind("click",function(){K();
return false
});
if(F("body > .favorites-items").length===0){F(".favorites-items").appendTo("body");
F(".favorites-items ul a").bind("click",function(){G(this);
return false
})
}F(".favorites-items .close").bind("click",function(){F("favorites-items").hide();
return false
})
},H=function(){CN.mySavedProducts.checkFavorite(B)
},I=function(){F(".close").bind("click",function(){F(".favorites-items").removeClass("active")
})
};
return{initFavoriteControl:function(){var L;
if(CN.user.isLoggedIn()===""){L=new CN.pluck.legacy.RegisteredGateway(CN.page.config.reg.urls.login,CN.page.config.reg.urls.reg);
jQuery(".favorites-controls").click(function(){L.loginHandler("favorites",this);
return false
})
}else{J();
I();
H()
}}}
}(jQuery));
/*
* @file cn.favoritesnav.js
* @copyright (c) Conde Nast Digital
*/
if(typeof CN==="undefined"||!CN||typeof jQuery==="undefined"||!jQuery){throw ("CN and/or jQuery library is missing!")
}CN.favoritesnav=(function(D){var B,C,A=function(){D(".fnav-view-type").each(function(){var E=D(this);
E.click(function(){B=E.find("li").attr("data-favorite-view-type");
C="all";
D(".fnav-view-type").find("li a").removeClass("active");
E.find("li.[data-favorite-view-type] > a").addClass("active");
CN.mySavedProducts.getFavorites(C,B);
return false
});
E.find(".fnav-collection-names li").each(function(){E.click(function(){B=E.parents(".fnav-view-type li").attr("data-favorite-view-type");
C=E.attr("data-favorite-collection-name");
D(".fnav-view-type li a ").removeClass("active");
E.find("a").addClass("active");
CN.mySavedProducts.getFavorites(C,B);
return false
})
})
});
D("li.[data-favorite-view-type = list] > a").addClass("active")
};
return{initNav:function(){A()
}}
}(jQuery));
CN.login=CN.login||{};
CN.login=(function(E){var C="cn_user_record",D="update.html",B="",F=function(){var H=CN.cookie.get(C),I=H?H.replace(/.*username=([^|]*).*/,"$1"):"";
return(I!=="")
},G=function(){var I=CN.cookie.get(C),J=I?I.replace(/.*username=([^|]*).*/,"$1"):"",H=J.length;
if(H>25){return J.substring(0,H+22)+"..."
}return J
},A=function(){if(F()){B+='<span class="loginbar loggedin"><span class="welcome">Welcome, '+G()+'</span> <span id="opts"><a href="'+CN.page.config.reg.urls.base+'bin/user/logout" class="first">Logout</a> &#124; <a href="'+CN.page.config.reg.urls.profile+'">Profile</a></span></span>'
}else{B+='<span class="loginbar loggedout"><span class="welcome">Welcome to '+CN.site.name+'</span> <span id="opts"><a href="'+CN.page.config.reg.urls.login+"?returnTo="+location.href+'" class="first">Log in</a> | <a href="'+CN.page.config.reg.urls.reg+'">Register</a></span></span>'
}E(B).appendTo("#login")
};
return{init:function(){A()
},isLoggedIn:function(){return F()
}}
}(jQuery));
/*
* @file cn.lookbook.js
* @author Om Shankar
* @copyright (c) Conde Nast Digital
*/
if(typeof CN==="undefined"||!CN||typeof jQuery==="undefined"||!jQuery){throw ("CN and/or jQuery library is missing!")
}CN.lookbook=(function(D){var B,J,G,F,K={},E,A=D("#lookbook-photo-library"),C=parseInt(A.attr("data-results_per_page"),10)||6,H=A.attr("data-rendition_name")||"slideshowThumb",I=D(".headline.lookbook-more","#main").find("a");
G=function(){D(".lookbook-parent").each(function(L){D(this).find(".lookbook-index").find(".snav-list").hide();
if(typeof CQ!=="undefined"&&CQ.WCM){CQ.WCM.onEditableReady(D(this).parent().attr("data-path")+"/*",function(){CQ.WCM.getEditable(this.path).hide()
})
}});
I.hide()
};
F=function(N,M,L){if(N&&N!==""){if(typeof K[L]==="object"&&K[L].lookbookResults.length>0){J(K[L],M);
return 
}D.ajax({type:"GET",url:"/bin/content/lookbook",data:"lookbook-feed="+N,dataType:"json",success:function(O){K[L]=O;
J(O,M)
},statusCode:{404:function(){CN.debug.error('The URL you are trying to fetch is "Not Found" on the server')
},500:function(){CN.debug.error("Internal Server Error")
}},error:function(P,O){if(P.status===404){CN.debug.error("The URL you are trying to fetch is Not Found on the server",P);
return 
}if(P.status===500){CN.debug.error("Internal Server Error",P);
return 
}}})
}};
J=function(O,L){var Q=0,R=O.lookbookResults,T=R[0],M,S,P,N;
I.hide();
I.unbind("click");
if(T.noResults==="true"||T.resultsCount==="0"){N='<div class="lookbook-child-header title cn_title"><h2 class="headline lookbook-child-header"> Sorry, there are no Slideshows for '+L+" </h2></div>";
A.empty().html(N);
return 
}A.empty().css("opacity","0");
for(E=0;
E<R.length;
E++){S="<a href="+R[E]["linkurl"]+"> <img src="+R[E]["imagepath"]+".rendition."+H+"."+R[E]["imageName"]+" alt='Photo Library Item-"+E+"' /></a>";
S=D(S);
if(R[E].hasOwnProperty("title")){S.append("<h2 class='headline'>"+R[E]["title"]+"</h2>")
}if(E%C===1){Q++;
M=D(document.createElement("div")).addClass("pageContainers").attr("id","pageContainer"+Q).appendTo(A)
}D(document.createElement("div")).addClass("lookbook-result").append(S).appendTo(M)
}A.animate({opacity:1},300);
A.find(".pageContainers").eq(0).show().siblings().hide();
if(Q>1){P=A.find(".pageContainers");
I.fadeIn(300);
I.bind("click",function(){P.not(":hidden").last().next().fadeIn(500);
if(P.last().is(":visible")){D(this).unbind("click").fadeOut(300)
}})
}};
B=function(T){var M=T.find(".lookbook-index"),N=M.find("> li").addClass("gnav-parent"),U=M.find("a"),L=D(".lookbook-parent-header","#main").find("h2"),S=D(".lookbook-child-header","#main").find("h2"),R,P,Q,O;
N.unbind("click").click(function(V){V.preventDefault();
O=D(this).find(".snav-list");
D(this).siblings().removeClass("open").find(".snav-list").slideUp(300);
P=D(this).find("> a").text();
L.text(P);
if(O.length>0){O.slideDown(300);
D(this).addClass("open")
}});
U.each(function(V){D(this).attr("data-req-url-count","req"+V)
});
U.unbind("click").click(function(V){V.preventDefault();
U.removeClass("active");
D(this).addClass("active");
Q=D(this).parent().hasClass("gnav-parent")?"All Slideshows":D(this).text();
S.text(Q);
R=D(this).attr("href");
F(R,D(this).text(),D(this).attr("data-req-url-count"))
});
N.eq(0).find("> a").trigger("click")
};
return{render:function(){if(D(".lookbook-parent").length===0){CN.debug.error("Cannot Render Lookbook - cn_list component not present");
return 
}if(D(".lookbook-photo-library").length===0){CN.debug.error("Cannot Render Lookbook - cn_image_viewer component not present");
return 
}G();
B(D("#lookbook-navigation"));
this.rendered=true
}}
}(jQuery));
CN.newsletter=(function(E){var A=function(){this.value=(this.value===this.defaultValue)?"":CN.isEmpty(this.value)?this.defaultValue:this.value
},C=function(G){var F=/^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return F.test(G)
},B=function(){window.open(this.href,"sample","width=700,height=800,scrollbars=1,top=100,left=100");
return false
},D=function(){var F=E(".newsletter-email"),G=E("form[name=newslettersForm]").attr("data-form-url");
if(!C(F.val())){F.val("Please check email format.");
return false
}E.ajax({type:"POST",data:"email="+F,url:G,error:function(J,H,I){F.val("error on subscription newsletter")
},success:function(H){F.val("successfully subscribed to the newsletter")
}});
return false
};
return{render:function(){E(".newsletter-form").find('input[name="email"]').bind("focus blur",A).end().find(".sample").bind("click",B);
E("form[name=newslettersForm]").bind("submit",D)
}}
}(jQuery));
/*
* @file cn.newsletters.js
* @author Zameer Mohamad
* @copyright (c) Conde Nast Digital
*/
if(typeof CN==="undefined"||!CN||typeof jQuery==="undefined"||!jQuery){throw ("CN and/or jQuery library is missing!")
}CN.newsletters=(function(D){var B=D("#secondaryAction"),C=D("form#demographicsForm input#email"),F=C.val(),E="";
function A(G){E="/bin/user/isregistered?email=";
F=encodeURIComponent(G);
E=E+F;
D.ajax({type:"GET",url:E,dataType:"text",success:function(I,J,H){if(D.trim(H.responseText)==="YES"){if(!CN.login.isLoggedIn()){D("section.login.member").show();
D("section.login.new-user").hide();
B.val("LOGIN")
}else{B.val("NONE")
}}else{D("section.login.new-user").show();
D("section.login.member").hide();
B.val("REGISTRATION")
}}})
}if(!((typeof F==="undefined")||(F===""))){A(F)
}C.change(function(){A(D(this).val())
})
}(jQuery));
/*
* @file cn.rss.js
* @version 0.1
* @author Zameer
* @comment First attempt at drawing RSS feed links for Summary Page
* @copyright (c) Conde Nast Digital
*
*/
if(typeof CN==="undefined"||!CN||typeof jQuery==="undefined"||!jQuery){throw ("CN and/or jQuery library is missing!")
}CN.feed=(function(A){A(".feed h5 a").bind("click",function(){var D=A(this).parent(),C=A(D).parent("section.feed").attr("data-feed-path"),B=A(D).siblings("ul.rss-items"),F=A(D).parent("section.feed").attr("data-feed-links")||3,E;
if(A(B).attr("style")==="display:none"){E=function(G){A(G).find("item").each(function(I){var H=A(this);
if(I<F){A(B).append('<li><ul class="rss"><li class="title"><a href="'+H.find("link").text()+'">'+H.find("title").text()+'</a></li><li class="date">'+CN.date.format(new Date(Date.parse(H.find("pubDate").text())),"h:mm a")+'</li><li class="description">'+H.find("description").text()+'</li><li class="link"><a href="'+H.find("link").text()+'">More</a></li></ul></li>')
}})
};
A.ajax({type:"GET",url:C,dataType:"xml",success:E});
A(B).show()
}else{A(B).toggle()
}return false
});
return this
}(jQuery));
CN.facebook=CN.facebook||{};
CN.facebook=(function(D){var C={status:true,cookie:true,xfbml:true},G={},E={},B=function(L){if(L.url!==""&&typeof L.url!=="undefined"){return L.url
}var M;
if(L.target==="site"){if(L.targetpath!==""){M=L.targetpath
}else{M=CN.pluck.config.siteUrl
}}else{M=D("link[rel='canonical']").attr("href")
}return M
},H=function(M){var O={},L=D("#"+M.id),N=M;
O.create=function(){L.empty();
D('<fb:like href="'+B(N)+'" font="'+N.font+'" colorscheme="'+N.colorscheme+'" width="'+N.width+'" height="'+N.height+'" show_faces="'+N.showfaces+'" layout="'+N.layout+'" action="'+N.action+'" ref="social_fblike"></fb:like>').appendTo(L)
};
return O
},I=function(N){var L=N.o,O=L.attr("id"),M=N.spec||{id:O,url:L.attr("data-fburl"),colorscheme:L.attr("data-fbcolorscheme"),font:L.attr("data-fbfont"),height:L.attr("data-fbheight"),target:L.attr("data-fblink"),layout:L.attr("data-fblayout"),width:L.attr("data-fbwidth"),action:L.attr("data-fbaction"),showfaces:L.attr("data-fbshowfaces"),targetpath:L.attr("data-fbtargetpath")};
E=M;
if(G.hasOwnProperty(O)){D("#"+O).empty();
delete G[O]
}G[O]=H(M);
G[O].create();
return this
},F=function(){var L={},M="";
D(".utilities .share.utility-like").each(function(){I({o:D(this)})
});
return this
},K=function(N){var M=window.CN||window.CNP,L;
M.site=M.site||{};
M.site.eventTrackingList=new EventList("eventListHolder");
M.site.eventTrackingList.setBaseUrl(CN.socialMediaData.collectorBaseURL);
M.site.eventTrackingEvent=new EventObject(CN.site.code,N);
M.site.eventTrackingEvent.setEnvironment(CN.site.env);
M.site.eventTrackingEvent.setContentId(CN.site.pageId);
M.site.eventTrackingEvent.setContentType(CN.socialMediaData.pageContentType);
M.site.eventTrackingEvent.setFullUrl(CN.socialMediaData.trackingURL);
M.site.eventTrackingEvent.setContentTitle(document.title);
M.site.eventTrackingEvent.setProperty(CN.socialMediaData.formattedDate);
L=CN.socialMediaData.trackingURL.substring(0,8);
if((L.indexOf("http")===-1&&L.indexOf("https")===-1)){M.site.eventTrackingList.addEvent(M.site.eventTrackingEvent);
M.site.eventTrackingList.writeImageTags()
}},A=function(){D(window).trigger("CN.customEvents.FDBSDKLoaded");
if(CN.stats){FB.Event.subscribe("edge.create",function(L){CN.stats.trackAction("facebook-like",this);
K("fb_like")
});
FB.Event.subscribe("edge.remove",function(L){CN.stats.trackAction("facebook-unlike",this)
})
}return this
},J=function(){if(typeof FB==="undefined"){if(D("#fb-root").length===0){D("body").prepend('<div id="fb-root"></div>')
}window.fbAsyncInit=function(){if(typeof CN.page.config.facebook.appId!=="undefined"){D.extend(true,C,{appId:CN.page.config.facebook.appId})
}FB.init(C);
A();
F()
};
(function(){var L=document.createElement("script");
L.async=true;
L.src=document.location.protocol+"//connect.facebook.net/en_US/all.js";
document.getElementById("fb-root").appendChild(L)
}())
}return this
};
return{init:function(){J()
},getButtons:function(){return G
},refresh:function(L){D(".share.utility-like").each(function(){var M,N;
M=D(this);
N={id:M.attr("id"),colorscheme:M.attr("data-fbcolorscheme"),font:M.attr("data-fbfont"),height:M.attr("data-fbheight"),target:M.attr("data-fblink"),layout:M.attr("data-fblayout"),width:M.attr("data-fbwidth"),action:M.attr("data-fbaction"),showfaces:M.attr("data-fbshowfaces"),url:M.attr("data-fburl")};
if(M.attr("data-fblink")==="site"){N.targetpath=M.attr("data-fbtargetpath");
N.url=N.targetpath
}D.extend(true,E,N,L||{});
if(M.attr("id")!==undefined){E.id=M.attr("id");
E.layout=M.attr("data-fblayout")
}I({o:D(this),spec:E})
});
if(typeof FB!=="undefined"){FB.XFBML.parse()
}}}
}(jQuery));
CN.twitter=CN.twitter||{};
CN.twitter=(function(E){var C={},L={},I={},O=["mbid=social_retweet"],F,J=function(P){return(P!=="")?'data-via="'+P+'"':""
},D=function(P){var Q;
if(P&&P.title&&P.title!==""){Q=P.title.replace(/(<.+?>)/g,"")
}else{Q=document.title.replace(/(<.+?>)/g,"")
}return Q.slice(0,95)
},H=function(P){if(P&&P.url&&P.url!==""){return P.url
}return E("link[rel='canonical']").attr("href")
},B=function(P){var Q=H(P);
for(F=0;
F<O.length;
F++){Q=(F===0)?(Q.indexOf("?")>-1)?Q+"&"+O[F]:Q+"?"+O[F]:Q+"&"+O[F]
}return Q
},A=function(Q){var S={},P=E("#"+Q.id),R=Q;
S.create=function(){P.empty();
E('<a href="http://twitter.com/share" class="twitter-share-button"'+J(Q.via)+'data-text= "'+D(Q)+'" data-url= "'+B(Q)+'" data-count= "'+Q.layout+'" data-counturl = "'+H(Q)+'">Tweet</a>').appendTo(P)
};
return S
},N=function(R){var Q=window.CN||window.CNP,P;
Q.site=Q.site||{};
Q.site.eventTrackingList=new EventList("eventListHolder");
Q.site.eventTrackingList.setBaseUrl(CN.socialMediaData.collectorBaseURL);
Q.site.eventTrackingEvent=new EventObject(CN.site.code,R);
Q.site.eventTrackingEvent.setEnvironment(CN.site.env);
Q.site.eventTrackingEvent.setContentId(CN.site.pageId);
Q.site.eventTrackingEvent.setContentType(CN.socialMediaData.pageContentType);
Q.site.eventTrackingEvent.setFullUrl(CN.socialMediaData.trackingURL);
Q.site.eventTrackingEvent.setContentTitle(document.title);
Q.site.eventTrackingEvent.setProperty(CN.socialMediaData.formattedDate);
P=CN.socialMediaData.trackingURL.substring(0,8);
if((P.indexOf("http")===-1&&P.indexOf("https")===-1)){Q.site.eventTrackingList.addEvent(Q.site.eventTrackingEvent);
Q.site.eventTrackingList.writeImageTags()
}},G=function(Q){var S={},P=E("#"+Q.id),R=Q;
S.create=function(){P.empty();
E('<a href="http://twitter.com/'+Q.via+'" class="twitter-follow-button" data-show-count="'+Q.dataShowCount+'">Follow @'+Q.via+"</a>").appendTo(P);
E.getScript("http://platform.twitter.com/widgets.js")
};
return S
},M=function(R){var P=R.o,S=P.attr("id"),Q=R.spec||{id:S,url:P.attr("data-twurl"),title:P.attr("data-twtitle"),action:P.attr("data-twaction"),layout:P.attr("data-twlayout"),via:P.attr("data-twvia"),dataShowCount:P.attr("data-show-count")||"false"};
I=Q;
if(L.hasOwnProperty(S)){E("#"+S).empty();
delete L[S]
}if(Q.action==="tweet"){L[S]=A(Q)
}else{L[S]=G(Q)
}L[S].create();
return this
},K=function(){E(".utilities .share.utility-tweet").each(function(){M({o:E(this)})
});
return this
};
return{init:function(){K();
E.getScript("http://platform.twitter.com/widgets.js",function(){if(twttr){twttr.events.bind("tweet",function(){N("twittered")
})
}})
},refresh:function(P){E(".utilities .share.utility-tweet").each(function(){var Q=E(this);
E.extend(true,I,{id:Q.attr("id"),url:Q.attr("data-twurl"),title:Q.attr("data-twtitle"),action:Q.attr("data-twaction"),layout:Q.attr("data-twlayout"),via:Q.attr("data-twvia")||""},P||{});
if(Q.attr("id")!==undefined){I.id=Q.attr("id");
I.action=Q.attr("data-twaction");
I.layout=Q.attr("data-twlayout")
}M({o:E(this),spec:I});
E.getScript("http://platform.twitter.com/widgets.js",function(){if(twttr){twttr.events.bind("tweet",function(){N("twittered")
})
}})
})
}}
}(jQuery));
CN.reg.option=(function(B){var A;
A=function(){if(jQuery(".cn_user_registration_option_container #regForm_subscribe_page2").length>0&&CN.url.params("ecomupsell")==="true"){B(".section-offer").hide()
}};
return{init:function(){A()
}}
}(jQuery));
CN.sweeps=CN.sweeps||{};
CN.sweeps=(function(C){var D=".iframeSweep iframe",B=function(){var G=jQuery.browser,F=(G.mozilla&&G.version.slice(0,3)==="1.9");
window.scrollTo(0,-10);
if(F===false){CN.dart.refresh()
}CN.stats.trackAjaxPage("sweepsFrame_reloaded")
},A=function(){var G=jQuery.browser,F=location.toString();
if((G.mozilla&&G.version.slice(0,3)==="1.9")&&F.indexOf("sweeps")!==-1){return true
}else{return false
}},E=function(){CN.frame.bindResize(D);
C(D).bind("load",B)
};
return{init:function(){E()
}}
}(jQuery));
function toggleFieldSet(D,C){var A=D.findParentByType("panel"),B=A.findByType("fieldset")[0];
if(C==="true"){B.show()
}else{B.hide()
}}CN.polls=CN.polls||{};
CN.polls=(function(B){var C=".iframe-quizpoll iframe",A=function(){window.scrollTo(0,-10)
},D=function(){CN.frame.bindResize(C);
B(C).bind("load",A)
};
return{init:function(){D()
}}
}(jQuery));
/*
* @file cn.rotator.js
* @author Dennis Pierce
* @copyright (c) Conde Nast Digital
*/
if(typeof CN==="undefined"||!CN||typeof jQuery==="undefined"||!jQuery){throw ("CN and/or jQuery library is missing!")
}CN.rotator=(function(){var B,A;
A=function(C){C.each(function(E,F){var D=jQuery(F);
D.find(".rotator > section.item").each(function(G,H){jQuery(H).prepend('<em class="tab">'+parseInt(G+1,10)+"</em>");
if(typeof CQ!=="undefined"&&CQ.WCM){CQ.WCM.onEditableReady(D.attr("data-path")+"/*",function(){CQ.WCM.getEditable(this.path).hide()
})
}})
})
};
B=function(G){var C,F={pause:true,paginate:true,timer:6,container:"section.item",maintainPosition:true},E,D;
G.each(function(H,I){D=jQuery(I);
E=D.find(".rotator");
if(E.length<1){return 
}if(D.hasClass("horizontal-slide")){F.fx={change:"horizontalSlide",duration:500}
}E.tab(F);
C=E.find("li").length-3;
if(C>0){E.find("ul").append('<li class="rotator-count">of <span class="rotator-count-total">'+C+"</span></li>")
}if((typeof CQ!=="undefined"&&CQ.WCM&&(CQ.WCM.isEditMode()||CQ.WCM.isDesignMode()))||(!E.hasClass("autoplay"))){E.find(".tab-pause").trigger("click")
}if(E.hasClass("refresh-ads")){E.find(".tab-pause").trigger("click");
E.find(".tab-list a, .tab-paginate").bind("click",function(){CN.dart.refresh();
CN.stats.trackAjaxPage()
})
}E.addClass("rotator-initialized")
})
};
return{render:function(){var C=jQuery(".cn_rotator");
A(C);
B(C)
}}
}());
CN.foursquare=(function(){var A=function(){var C=document.createElement("script"),D=document.getElementsByTagName("script")[0];
C.type="text/javascript";
C.src="http://platform.foursquare.com/js/widgets.js";
C.async=true;
D.parentNode.insertBefore(C,D)
},B=function(){window.___fourSq={};
A()
};
return{init:B}
}());
/*
* @file cn.carousel.js
* @author Dennis Pierce
* @copyright (c) Conde Nast Digital
*/
if(typeof CN==="undefined"||!CN||typeof jQuery==="undefined"||!jQuery){throw ("CN and/or jQuery library is missing!")
}CN.carousel=(function(){var A,B={};
A=function(C){try{C.each(function(F,G){var H=0,I="carousel-"+F,E;
if(jQuery(G).hasClass("display-1")){E=1
}else{if(jQuery(G).hasClass("display-2")){E=2
}else{if(jQuery(G).hasClass("display-3")){E=3
}else{if(jQuery(G).hasClass("display-4")){E=4
}else{if(jQuery(G).hasClass("display-5")){E=5
}else{E=4
}}}}}B[I]=jQuery(G).find(".item").wrapAll('<div class="feature-carousel"><div class="feature-carousel-inner"><div class="feature-container"></div></div></div>').end().find(".feature-carousel").attr("id",I).prepend('<div class="feature-carousel-previous">Previous</div>').append('<div class="feature-carousel-next">Next</div>').find(".feature-carousel-inner").scrollable({items:".feature-container",size:E,nextPage:".feature-carousel-next",prevPage:".feature-carousel-previous"})
})
}catch(D){CN.debug.error("Error setting up carousel features. Perhaps jQuery scrollable  plugin is not available.")
}};
return{render:function(){var C=jQuery(".cn_rotator .carousel");
A(C)
},getInstance:function(C){return B[C]
}}
}());