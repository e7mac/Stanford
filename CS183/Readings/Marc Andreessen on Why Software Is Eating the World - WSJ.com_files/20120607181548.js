gomezGo = {
  init: function() {
    gomez=gomez?gomez:{};gomez.h3=function(d, s){for(var p in s){d[p]=s[p];}return d;};gomez.h3(gomez,{b3:function(r){if(r<=0)return false;return Math.random()<=r&&r;},b0:function(n){var c=document.cookie;var v=c.match(new RegExp(';[ ]*'+n+'=([^;]*)'));if(!v)v=c.match(new RegExp(n+'=([^;]*)'));if(v)return unescape(v[1]);return '';},c2:function(n,v,e,p,d,s){try{var t=this,a=location.hostname;var c=n+'='+escape(v)+(e?';expires='+e.toGMTString():'')+(p?';path='+p:';path=/')+(d?';domain='+d:';domain='+a)+(s?';secure':'');document.cookie=c;}catch(e){}},z0:function(n){var t=this;if(n){var s =t.b0("__g_c");if(!s)return '';var v=s.match(new RegExp(n+':([^\|]*)'));if(v)return unescape(v[1]);return '';}else return '';},z1:function(n,m){var t=this;if(n){var s=t.b0("__g_c");if(s){if(s.indexOf(n+':')!=-1)s=s.replace(new RegExp('('+n+':[^\|]*)'),n+':'+m);else s=s==' '?n+':'+m:s+'|'+n+':'+m;t.c2("__g_c",s);}else t.c2("__g_c",n+':'+m);};}});if(gomez.wrate){gomez.i0=gomez.z0('w');if(gomez.i0){gomez.runFlg=parseInt(gomez.i0)>0?true:false;}else if(gomez.b3(parseFloat(gomez.wrate))){gomez.runFlg=true;gomez.z1('w',1);}else{gomez.runFlg=false;gomez.z1('w',0);}}else if(gomez.wrate==undefined){gomez.runFlg=true;gomez.z1('w',1);}else{gomez.runFlg=false;gomez.z1('w',0);};if(gomez.runFlg){gomez.h1=function(v,d){return v?v:d};gomez.gs=gomez.h1(gomez.gs,new Date().getTime());gomez.acctId=gomez.h1(gomez.acctId,'');gomez.pgId=gomez.h1(gomez.pgId,'');gomez.grpId=gomez.h1(gomez.grpId, '');gomez.E=function(c){this.s=c;};gomez.E.prototype={g1:function(e){var t=gomez,i=t.g6(e);if(i)i.e=t.b5();}};gomez.L=function(m){this.a=m;};gomez.L.prototype={g2:function(m){var t=gomez,n=t.b5();var s=document.getElementsByTagName(m);var e=t.k;if(m=='script')e=t.j;if(m=='iframe')e=t.l;if(s){var l=s.length;for(var i=0;i<l;i++){var u=s[i].src||s[i].href;if(u &&!e[u]){var r =new gomez.E(e);t.grm[u]=r;e[u]=new t.c7(u, n);if(t.gIE&&m=='script')t.e2(s[i],'readystatechange',t.d2,false);else t.e2(s[i],'load',r.g1,false);}}}}};gomez.L.m=new Object;gomez.L.m['script']=new gomez.L();gomez.L.m['link']=new gomez.L();gomez.L.m['iframe']=new gomez.L();gomez.S=function(){var t=this,h=gomez.acctId+".r.axf8.net";t.x=location.protocol+'//'+h+'/mr/b.gif?';t.y=location.protocol+'//'+h+'/mr/a.gif?';};gomez.h2=function(){var t=this;t.gIE=false;t.f=new Object;t._h=0;t.j=new Object;t.k=new Object;t.l=new Object;t.m=location.href;t.p=-1;t.q=-1;t.t=new Array;t.u=new Array;t._w=false;t.gSfr=/KHTML|WebKit/i.test(navigator.userAgent);t.gc={'n':'c'};t.grm=new Object;t.b;t.a=0;t.d=false;t.x=false;t.s=new gomez.S;t._a=false;t.h6=false;};gomez.h3(gomez,{h5:function(u){try{var s=document.createElement('script');s.src=u;s.type='text/javascript';if(document.body)document.body.appendChild(s);else if(document.documentElement.getElementsByTagName('head')[0])document.documentElement.getElementsByTagName('head')[0].appendChild(s);}catch(e){}},a9:function(){var t=gomez,i=t.z0('a'),g=t.b0('__g_u');t.gc.h=t.z0('b');if(!t.gc.h)t.gc.h=1;t.z1('b',parseInt(t.gc.h)+1);if(i){t.a=parseInt(i);if(t.a==1){t._w=true;}else if(t.a==3){t.x=true;t._w=true;};t.d=true;t.gc.c=t.z0('c');t.gc.d=t.z0('d');t.gc.i=t.z0('e');t.gc.j=t.z0('f');if(t._w&&!t._a){t.h7();t._a=true;};}else {if(!t.gc.a)return;var s='v=1';t.c2('__g_u','1',new Date(t.gt()+1000));if(t.b0('__g_u')&&g&&g!='1'&&g.indexOf('NaN')==-1&&g.indexOf('undefined')==-1){s='v=0';var r=g.split('_');t.b2(parseInt(r[0]),parseInt(r[1])+1);if(r[4]&&r[4]!='0'&&t.gt()<parseInt(r[5])&&r[2]&&r[2]!='0'){t.b1(parseFloat(r[2]),parseFloat(r[3]),parseFloat(r[4]),parseInt(r[5]));return;};};t.h6=true;s=t.s.y+'a='+t.gc.a+'&'+s;if(t.gSfr)document.write("<scr"+"ipt src='"+s+"'"+"><\/scr"+"ipt>");else t.h5(s);};t.b=t.z0('g');},h7:function(){var t=gomez,u=t.tloc?t.tloc:location.protocol+'//'+t.acctId+'.t.axf8.net/js/gtag4.js';if(t.gSfr)document.write("<scr"+"ipt src='"+u+"'"+"><\/scr"+"ipt>");else t.h5(u);},b1:function(v,s,q,f){var t=this;if(t._a)return;if(t.b3(v)){t._w=true;t.a=1;var p=parseFloat(s/v);if(t.b3(p)){t.x=true;t.a=3;};};t.d=true;t.z1('a',t.a);t.z1('e',v);t.z1('f',s);t.gc.i=v;t.gc.j=s;t.h4(v,s,q,f);if(t._w){t.h7();t._a=true;};},b2:function(v,s){var t=this,f=new Date(t.gt()+946080000000),g=''+v+'_'+s;if(t._a)return;t.c2('__g_u',g,f);t.gc.c=v;t.gc.d=s;t.z1('c',v);t.z1('d',s);},h4:function(o,p,q,d){var t=this,f=new Date(t.gt()+946080000000),g=t.b0('__g_u');if(g&&g!='1'&&g.indexOf('NaN')==-1&&g.indexOf('undefined')==-1){var r=g.split('_'),s;if(d)s=d;else if(q&&q>=0)s=new Date(t.gt()+parseInt(q*86400000)).getTime();else{q=5;s=new Date(t.gt()+432000000).getTime();};g=''+r[0]+'_'+r[1]+'_'+o+'_'+p+'_'+q+'_'+s;t.c2('__g_u',g,f);};},gt:function(){return new Date().getTime()},b5:function(){return new Date().getTime()-gomez.gs},b6:function(){var t=gomez;t.p=t.b5();},f8:function(){var t=this;if(t.pollId1)clearInterval(t.pollId1);if(t.pollId2)clearInterval(t.pollId2);if(t.pollId3)clearInterval(t.pollId3);if(t.pollId4)clearInterval(t.pollId4);},b7:function(){var t =gomez;t.f8();t.q=t.b5();},c7:function(u, s){var t=this;t.m=u;t.s=s;},c8:function(){var t=gomez,n=t.b5(),l=document.images.length;if(l>t._h){for(var i=t._h;i<l;++i){var u=document.images[i].src;if(u){var r =new gomez.E(t.f);t.grm[u]=r;t.f[u]=new t.c7(u, n);t.e2(document.images[i],'load',t.c4,false);t.e2(document.images[i],'error',t.c5,false);t.e2(document.images[i],'abort',t.c6,false);}}}t._h=l;},c4:function(e){var t=gomez,i=t.g6(e);if(i)i.e=t.b5();},c5:function(e){var t=gomez,i=t.g6(e);if(i){i.e=t.b5();i.b=1;}},c6:function(e){var t=gomez,i=t.g6(e);if(i)i.a=t.b5();},g6:function(e){var t=gomez,e=window.event?window.event:e,a=t.d8(e),i;if(t.grm[a.src||a.href]&&t.grm[a.src||a.href].s)i=t.grm[a.src||a.href].s[a.src||a.href];return i;},d2:function(){var t=gomez;var e=window.event?window.event:e,s=t.d8(e);if(s.readyState=='loaded'||s.readyState=='complete'){var o=t.j[s.src];if(o)o.e=t.b5();}},setPair:function(name,value){var t=this;t.t[t.t.length]={'n':'p','a':name,'b':value};},nameEvent:function(n){var t=this;t.f6(n,1);},startInterval:function(n){var t=this;t.f6(n,2,1);},endInterval:function(n){var t=this;t.f6(n,2,2);},f6:function(n,p,b){if(n&&n.length>20)n=n.substring(0,20);var t=this,f=t.u;f[f.length]={'n':'a','a':n,'b':t.b5(),'e':p,'f':b};},d8:function(e){if(gomez.gIE)return e.srcElement||{};else return e.currentTarget||e.target||{};},e2:function(e,p,f,c){var n='on'+p;if(e.addEventListener)e.addEventListener(p,f,c);else if(e.attachEvent)e.attachEvent(n, f);else{var x=e[n];if(typeof e[n]!='function')e[n]=f;else e[n]=function(a){x(a);f(a);};}},i1:function(){var d =window.document, done=false,i2=function (){if(!done){done=true;gomez.b6();gomez.a9();}};(function (){try{d.documentElement.doScroll('left');}catch(e){setTimeout(arguments.callee, 50);return;}i2();})();d.onreadystatechange=function(){if(d.readyState=='complete'){d.onreadystatechange=null;i2();}};},g7:function(){try{var t=gomez;t.gc.a=t.acctId;/*@cc_on t.gIE=true;@*/if(t.gIE){t.i1();window.attachEvent('onload', t.b7);}else if(t.gSfr){var m=setInterval(function(){if(/loaded|complete/.test(document.readyState)){clearInterval(m);delete m;t.b6();t.b7();}}, 10);}else if(window.addEventListener){window.addEventListener('DOMContentLoaded', t.b6, false);window.addEventListener('load', t.b7, false);}else return;t.c8();t.pollId1=setInterval(t.c8, 1);gomez.L.m['link'].g2('link');t.pollId3=setInterval("gomez.L.m['link'].g2('link')", 1);gomez.L.m['iframe'].g2('iframe');t.pollId4=setInterval("gomez.L.m['iframe'].g2('iframe')", 1);if(!t.gIE)t.a9();}catch(e){return;}}});gomez.h2();gomez.g7();}
  }
};
/*                
  Copyright 2008 Whitepages.com, Inc.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

var Jiffy = function (){
  this.addBulkLoad = function(_eventName, elapsedTime){
  measures.captured[_eventName] = elapsedTime;  
  }
  
  this.getUID = function(){
    return Math.round(Math.random() * 1000000000000000);
  }
  
  this.checkRemoveEvent = function(eventName){
  if(eventsForRemoval[eventName] != null){
    var captureDetails = eventsForRemoval[eventName];
    Jiffy.utils.removeEvent(captureDetails.element_id, captureDetails.browser_event, captureDetails.callback_func, true);
  }
  }
  
  this.addMarksMeasures = function(referenceID, eventName, elapseTime, refTime){
    marks_measures.push({name: referenceID, evt:eventName, et:elapseTime, rt:refTime});
  }
  
  var eventsForRemoval = {};
  var pageTimer = (window.JiffyParams != undefined && JiffyParams.jsStart != undefined) ? JiffyParams.jsStart : (new Date()).getTime();
  
  var pname = (window.JiffyParams != undefined && JiffyParams.pname != undefined) ? JiffyParams.pname : encodeURI(window.location);
  var uid = (window.JiffyParams != undefined && JiffyParams.uid != undefined) ? JiffyParams.uid : getUID();
  
  var cUri = '/rx'
  var cMethod = 'get';

  var markers = [];
  var measures = {
  pn:pname,
  st:pageTimer,
  uid:uid,
  captured:{}
  };
    /* marks_measures
  JSON Obj used for storing all captured marks and measures. This is mainly used by the 
  Jiffy Firebug plugin but we use it for the bulk load operation. sample layout of the 
  object looks like the following:
  {
      "PageStart": { et: 2676, m: [
      {et:2676, evt:"load", rt:1213159816044}
      ]},
        "onLoad": { et: 74, m: [
          {et:7,  evt:"carouselcreated", rt:1213159818722},
          {et:67, evt:"finishedonLoad",  rt:1213159818729}
      ]}
  }
  */
  var marks_measures = [];
  
  return{
    // Creating a mark sets the startTime and lastTime to the curr time
  mark : function(referenceID){
    var currTime = (new Date()).getTime();
    markers[referenceID] = {startTime: currTime, lastTime: currTime}; 
  },
  
  // Creating a measure will calculate 
  // et (elapsed time) as current time - markers[].currTime
  measure : function(eventName, referenceID, doReport){
    if(Jiffy.options.USE_JIFFY == undefined || !Jiffy.options.USE_JIFFY){return};
    /*Check to see if the eventName is a string which we use for wrapping
    around tags or an Event Object being passed by the attachevent
    method for builtin browser events we are tracking.*/
		
		doReport = (typeof doReport === "boolean") ? doReport : false; 

    var _eventName = ((typeof eventName == "string") ? eventName : eventName.type); 
    // -- >

    var currTime = new Date().getTime();
    
    var refStartTime;
    var elapsedTime;
    
    // We want the previous time stamp to measure this event against
    if(referenceID != null && markers[referenceID] != null) {
      refStartTime = markers[referenceID].lastTime;
      elapsedTime = currTime - refStartTime;
      markers[referenceID].lastTime = currTime;
    }
    else
    {
      refStartTime = pageTimer;
      elapsedTime = currTime - refStartTime;
    }
    
    if(referenceID != null) {
      addMarksMeasures(referenceID, _eventName, elapsedTime, refStartTime);
    }
    else{
      markers["PageStart"] = {startTime: refStartTime, lastTime: currTime};
      addMarksMeasures("PageStart", _eventName, elapsedTime, refStartTime); // pageTimer?
    }
        
    if(Jiffy.options.ISBULKLOAD && _eventName != "unload" && !doReport){
      addBulkLoad(_eventName, elapsedTime);
    }
    else{
      var curMeasures = Jiffy.utils.formatMeasure(_eventName,elapsedTime);
      Jiffy.Ajax.report(cMethod,cUri,{uid:uid,st:pageTimer,pn:pname,ets:curMeasures});
    }
    checkRemoveEvent(eventName);
  },

  _bulkLoad: function(){
    var bulkmeasures = Jiffy.getMeasures();
    var bulkmeasuresCount = bulkmeasures.length;
    var measuresStr = "";
    for(x=0;x<bulkmeasuresCount;x++){
    measuresStr += Jiffy.utils.formatMeasure(bulkmeasures[x].evt,bulkmeasures[x].et) +",";
    }
    measuresStr = measuresStr.replace(/\,$/g,'');
    Jiffy.Ajax.report(cMethod,cUri,{uid:uid,st:pageTimer,pn:pname,ets:measuresStr});  
  },

  getMeasures: function(){
    return marks_measures;
  },
  
  clearMeasures: function() {
    marks_measures = [];
    markers = [];
  }
  } 
}();

/*Default options
  These can be overridden by providing a globally scoped hash named 'JiffyOptions' with
  values for each option you would like to override.
  
  bool USE_JIFFY: This is stop all Jiffy code from executing calls to the server log. This will allow you to have Jiffy mark and measure tags in a page and still turn Jiffy off.
  
  bool ISBULKLOAD: This will enable bulk loading of all Jiffy measures to be sent in one call to the server logger.
  
  object/hash BROWSER_EVENTS: These are builin events such as load and unload events and the object to which we should attach a measure callback to. These will automaticly be mmaeasured against the start time mark.
  
  bool SOFT_ERRORS: In some functions we will use a try catch statement and if these are enabled they will alert with the message or the error. This is meant for ddeveloper debugging only and should left to false in a production enviroment.
  */
Jiffy.options = {
  USE_JIFFY:true,
  ISBULKLOAD: true,
  BROWSER_EVENTS: {"unload":window,"load":window},
  SOFT_ERRORS: false
};

Jiffy.utils = {
  inArray: function(ary,target) {
  for ( var i=0,len=ary.length;i<len;i++ ) {
    if ( target == ary[i] ) {
    return true;
    }
  }
  return false;
  },
  get: function(id) {
  return document.getElementById(id);
  },
  onDOMReady: function(func) {
  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded",func,false);
  }
  if ( /WebKit/i.test(navigator.userAgent)) {
    var _timer = setInterval(function() {
    if ( /loaded|complete/.test(document.readyState)) {
      func;
    }
    },10);
  }
  },
  on: function(elem,evt,func,bubble) {
  bubble = bubble || false;
  if (evt=='DOMReady') {
    this.onDOMReady(func);
    return true;
  }
  else {
    var el = (typeof(elem)=='string') ? this.get(elem) : elem;
    if (window.addEventListener) {
    el.addEventListener(evt,func,bubble); return true;
    }
    else 
    if (window.attachEvent) {
    el.attachEvent('on'+evt,func); return true;
    }
    else {
    return false;
    }
  }
  },
  serialize: function(obj) {
  var str = '';
  if ( typeof(obj) == 'object' ) {
    for (key in obj) { str += key+'='+obj[key]+'&'; }
  }
  return str.replace(/&$/,'');
  },
  formatMeasure: function(name,val) {
  return name + ":" + val;
  },
  hashToJiffyList: function(obj) {
  var str = '';
  if ( typeof(obj) == 'object' ) {
    for (key in obj) {
    if(typeof(obj[key]) == 'object'){Jiffy.utils.hashToJiffyList(obj[key]);}
    else{str += Jiffy.utils.formatMeasure(key,obj[key])+',';}
    }
  }
  return str.replace(/,$/,'');
  },
  removeEvent: function(elem, evt, func, bubble){
  var el = (typeof(elem)=='string') ? this.get(elem) : elem;
  if (window.removeEventListener) {
    el.removeEventListener(evt,func,bubble); return true;
  }
  else 
  if (window.detachEvent) {
    el.detachEvent('on'+evt,func); return true;
  }
  else {
    return false;
  }
  },
  getUID: function(){
    return Math.round(Math.random() * 1000000000000000);
  },
  hashMerge: function(hash1, hash2){
  for (var option in hash1)
  {
    if(hash2[option] != null){
    hash2[option] = hash1[option];
    }
  }
  }
};

Jiffy.Ajax = {
  connection: function(){
  return ((window.XMLHttpRequest) 
  ? new XMLHttpRequest() : (window.ActiveXObject) 
    ? new ActiveXObject("Microsoft.XMLHTTP") : null);
  },
  report: function(method, url, params, success, failure) {
  var req = this.connection();  
  var strParams = (typeof(params)=='string') ? params : Jiffy.utils.serialize(params);
  url += '?'+strParams;
  req.onreadystatechange = (!success && !failure)
    ? function() { return; }
    : function() {
  if (req.readyState != 4)
    return;

    if (req.status == 200) { if (success){success.call(req);} }
    else { if(failure){failure.call(req);} }
  };

  switch(method) {
    case 'get':
      req.open('GET',url,true);
      req.send(null);
      break;
    case 'post':
      req.open('POST',url,true);
      req.send(strParams);
      break;
    case 'img':
      var image = document.createElement('img');
        image.setAttribute('src',url);
      break;
  }
  }
};

Jiffy.init = function(){
  //Merge the site defined options with the defaults if the site has provided overrides.
  if(window.JiffyOptions != undefined){Jiffy.utils.hashMerge(window.JiffyOptions, Jiffy.options);}
  //insure that we should execute Jiffy by reviewing the options hash
  if(Jiffy.options.USE_JIFFY == undefined || !Jiffy.options.USE_JIFFY){return};
  //Set up built in brower events to fire if they are in the options settings
  var BROWSER_EVENTS = Jiffy.options.BROWSER_EVENTS;
  for (var bEvents in BROWSER_EVENTS)
  {
  var objToBind = BROWSER_EVENTS[bEvents];
  if(objToBind){
    Jiffy.utils.on(objToBind,bEvents, Jiffy.measure);
  }
  }
  if(Jiffy.options.ISBULKLOAD){
  //Attach body onload to call bulk loader sending all data at once.
  Jiffy.utils.on(window, "load", Jiffy._bulkLoad);
  }
};
typeof dojo==="object"&&dojo.provide("dj.util.JSExec");if(typeof dj=="undefined")dj={};if(typeof dj.util=="undefined")dj.util={};if(typeof dj.context=="undefined")dj.context={};if(typeof dj.context.jsexec=="undefined")dj.context.jsexec={};
(function(){var a=0,b=undefined;dj.util.JSExec=function(c){var e=dj.util,f=window.console,g=function(){},h=typeof e.Perf=="object",j=h&&typeof e.Perf.mark=="function"?e.Perf.mark:g,k=h&&typeof e.Perf.measure=="function"?e.Perf.measure:g,m=f&&typeof f.warn=="function";if(h&&(e.Perf.type=="console"||e.Perf.type=="jiffy")){b="JSEXEC: "+a++;j(b);j=g}return function(l,o,p){try{o=l+"-"+o;j(o);p.apply(c);k(o,b)}catch(r){m&&console.warn("JSExec %d: %o",l,r)}}}})();
if(typeof dj=="undefined")dj={};if(typeof dj.util=="undefined")dj.util={};if(typeof gomez=="undefined")this.gomez={};
(function(){var a={init:function(b){this.type=b.type;this.frequency=b.frequency;this.randomNum=Math.floor(Math.random()*100);this.fire=this.randomNum<=this.frequency?true:false;this.lastMark=null;this.fire&&globalPerfTesting&&this._serviceConfig(b)},mark:function(b){if(a.fire&&globalPerfTesting){a.lastMark=b;if(a.type==="jiffy")Jiffy.mark(b);else a.type==="gomez"&&gomez.startInterval(b)}},measure:function(b,c){if(a.fire&&globalPerfTesting){c=c||a.lastMark;if(a.type==="jiffy")Jiffy.measure(b,c);else a.type===
"gomez"&&gomez.endInterval(c)}},_serviceConfig:function(b){if(b.type==="gomez"){gomez.gs=(new Date).getTime();gomez.acctId=b.acctId;gomez.pgId=b.pgId;gomez.grpId=b.grpId;gomezGo.init()}else if(b.type==="jiffy"){JiffyParams.jsStart=(new Date).getTime();JiffyParams.uid=b.uid;JiffyParams.pname=b.pname;JiffyOptions.USE_JIFFY=b.use_jiffy;JiffyOptions.ISBULKLOAD=b.isbulkload;JiffyOptions.BROWSER_EVENTS=b.browser_events;JiffyOptions.SOFT_ERRORS=b.soft_errors;Jiffy.init()}}};dj.util.Perf=a})();djPerf=dj.util.Perf;

