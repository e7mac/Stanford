(function(window,document,undefined){var prefixes=['webkit','Moz','ms','O'];var animations={};var useCssAnimations;function createEl(tag,prop){var el=document.createElement(tag||'div');var n;for(n in prop){el[n]=prop[n];}
return el;}
function ins(parent){for(var i=1,n=arguments.length;i<n;i++){parent.appendChild(arguments[i]);}
return parent;}
var sheet=function(){var el=createEl('style');ins(document.getElementsByTagName('head')[0],el);return el.sheet||el.styleSheet;}();function addAnimation(alpha,trail,i,lines){var name=['opacity',trail,~~(alpha*100),i,lines].join('-');var start=0.01+i/lines*100;var z=Math.max(1-(1-alpha)/trail*(100-start),alpha);var prefix=useCssAnimations.substring(0,useCssAnimations.indexOf('Animation')).toLowerCase();var pre=prefix&&'-'+prefix+'-'||'';if(!animations[name]){sheet.insertRule('@'+pre+'keyframes '+name+'{'+
'0%{opacity:'+z+'}'+
start+'%{opacity:'+alpha+'}'+
(start+0.01)+'%{opacity:1}'+
(start+trail)%100+'%{opacity:'+alpha+'}'+
'100%{opacity:'+z+'}'+
'}',0);animations[name]=1;}
return name;}
function vendor(el,prop){var s=el.style;var pp;var i;if(s[prop]!==undefined)return prop;prop=prop.charAt(0).toUpperCase()+prop.slice(1);for(i=0;i<prefixes.length;i++){pp=prefixes[i]+prop;if(s[pp]!==undefined)return pp;}}
function css(el,prop){for(var n in prop){el.style[vendor(el,n)||n]=prop[n];}
return el;}
function merge(obj){for(var i=1;i<arguments.length;i++){var def=arguments[i];for(var n in def){if(obj[n]===undefined)obj[n]=def[n];}}
return obj;}
function pos(el){var o={x:el.offsetLeft,y:el.offsetTop};while((el=el.offsetParent)){o.x+=el.offsetLeft;o.y+=el.offsetTop;}
return o;}
var defaults={lines:12,length:7,width:5,radius:10,color:'#000',speed:1,trail:100,opacity:1/4,fps:20,zIndex:2e9,className:'spinner',top:'auto',left:'auto'};var Spinner=function Spinner(o){if(!this.spin)return new Spinner(o);this.opts=merge(o||{},Spinner.defaults,defaults);};Spinner.defaults={};Spinner.prototype={spin:function(target){this.stop();var self=this;var o=self.opts;var el=self.el=css(createEl(0,{className:o.className}),{position:'relative',zIndex:o.zIndex});var mid=o.radius+o.length+o.width;var ep;var tp;if(target){target.insertBefore(el,target.firstChild||null);tp=pos(target);ep=pos(el);css(el,{left:(o.left=='auto'?tp.x-ep.x+(target.offsetWidth>>1):o.left+mid)+'px',top:(o.top=='auto'?tp.y-ep.y+(target.offsetHeight>>1):o.top+mid)+'px'});}
el.setAttribute('aria-role','progressbar');self.lines(el,self.opts);if(!useCssAnimations){var i=0;var fps=o.fps;var f=fps/o.speed;var ostep=(1-o.opacity)/(f*o.trail/100);var astep=f/o.lines;!function anim(){i++;for(var s=o.lines;s;s--){var alpha=Math.max(1-(i+s*astep)%f*ostep,o.opacity);self.opacity(el,o.lines-s,alpha,o);}
self.timeout=self.el&&setTimeout(anim,~~(1000/fps));}();}
return self;},stop:function(){var el=this.el;if(el){clearTimeout(this.timeout);if(el.parentNode)el.parentNode.removeChild(el);this.el=undefined;}
return this;},lines:function(el,o){var i=0;var seg;function fill(color,shadow){return css(createEl(),{position:'absolute',width:(o.length+o.width)+'px',height:o.width+'px',background:color,boxShadow:shadow,transformOrigin:'left',transform:'rotate('+~~(360/o.lines*i)+'deg) translate('+o.radius+'px'+',0)',borderRadius:(o.width>>1)+'px'});}
for(;i<o.lines;i++){seg=css(createEl(),{position:'absolute',top:1+~(o.width/2)+'px',transform:o.hwaccel?'translate3d(0,0,0)':'',opacity:o.opacity,animation:useCssAnimations&&addAnimation(o.opacity,o.trail,i,o.lines)+' '+1/o.speed+'s linear infinite'});if(o.shadow)ins(seg,css(fill('#000','0 0 4px '+'#000'),{top:2+'px'}));ins(el,ins(seg,fill(o.color,'0 0 1px rgba(0,0,0,.1)')));}
return el;},opacity:function(el,i,val){if(i<el.childNodes.length)el.childNodes[i].style.opacity=val;}};!function(){var s=css(createEl('group'),{behavior:'url(#default#VML)'});var i;if(!vendor(s,'transform')&&s.adj){for(i=4;i--;)sheet.addRule(['group','roundrect','fill','stroke'][i],'behavior:url(#default#VML)');Spinner.prototype.lines=function(el,o){var r=o.length+o.width;var s=2*r;function grp(){return css(createEl('group',{coordsize:s+' '+s,coordorigin:-r+' '+-r}),{width:s,height:s});}
var margin=-(o.width+o.length)*2+'px';var g=css(grp(),{position:'absolute',top:margin,left:margin});var i;function seg(i,dx,filter){ins(g,ins(css(grp(),{rotation:360/o.lines*i+'deg',left:~~dx}),ins(css(createEl('roundrect',{arcsize:1}),{width:r,height:o.width,left:o.radius,top:-o.width>>1,filter:filter}),createEl('fill',{color:o.color,opacity:o.opacity}),createEl('stroke',{opacity:0}))));}
if(o.shadow){for(i=1;i<=o.lines;i++){seg(i,-2,'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)');}}
for(i=1;i<=o.lines;i++)seg(i);return ins(el,g);};Spinner.prototype.opacity=function(el,i,val,o){var c=el.firstChild;o=o.shadow&&o.lines||0;if(c&&i+o<c.childNodes.length){c=c.childNodes[i+o];c=c&&c.firstChild;c=c&&c.firstChild;if(c)c.opacity=val;}};}
else{useCssAnimations=vendor(s,'animation');}}();window.Spinner=Spinner;})(window,document);