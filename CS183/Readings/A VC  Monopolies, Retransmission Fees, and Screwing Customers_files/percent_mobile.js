var percent_mobile_cookie="_percent_mobile_c";
var percent_mobile_cookie_path="/";
var percent_mobile_visit_duration=60*60*1000;
var percent_mobile_version="260610_js";
function percent_mobile_track(percent_mobile_id,url){
if(typeof(url)=='undefined'){url=window.location.href;}
var protocol="http";
if (typeof(window.location)!= 'undefined' && typeof(window.location.href)!= 'undefined' && typeof(window.location.href.indexOf)!='undefined' && window.location.href.indexOf('https:')>-1)
{protocol="https";}

var a=new Array(percent_mobile_rand(),"",percent_mobile_rand());
if(typeof(document.cookie)!= 'undefined'){			
var c=percent_mobile_get_cookie(percent_mobile_cookie);
if(c!=""){var a=c.split('_');a[0]=a[0].substring(0,a[0].length-1)+"0";								
if (new Date().getTime()<parseInt(a[1])){a[2]=a[2].substring(0,a[2].length-1)+"0";}else{a[2]=percent_mobile_rand();}}
document.cookie=percent_mobile_cookie+'='+a[0]+"_"+(new Date().getTime()+percent_mobile_visit_duration)+"_"+a[2]+";expires="+new Date(new Date().getTime()+(60*60*24*365*1000)).toGMTString()+';path='+percent_mobile_cookie_path;			
}		
if (typeof(document.images)!= 'undefined'){	var m="";	
	if (navigator.userAgent.indexOf('(iPhone;')!=-1){		
		var s=document.createElement('style');var d=document.createElement('div');d.id="pm_IS_"+percent_mobile_id;
	    s.innerText='@media (-webkit-min-device-pixel-ratio:2) {#'+d.id+'{display:none !important;}}';
	    document.documentElement.appendChild(s).appendChild(d);
	    var r=getComputedStyle(d,null).getPropertyValue('display')=='none';
	    s.parentNode.removeChild(s);d.parentNode.removeChild(d);
		if(r){m="&m=4";}else{r=new Date().getTime();for(var s=0;new Date().getTime()-r<20;s++){Math.random();}m = "&m="+((s>1000)?"3":"2");}
	}
new Image().src=protocol+"://tracking.percentmobile.com/pixel/"+percent_mobile_id+"/"+Math.floor(Math.random()*(new Date().getTime()))+".gif?v="+percent_mobile_version+"&us="+a[0]+"&vi="+a[2]+"&url="+escape(url)+"&referer="+escape(document.referrer) + m;
}
else {
	var image_url=protocol+"://tracking.percentmobile.com/pixel/"+percent_mobile_id+"/"+Math.floor(Math.random()*(new Date().getTime()))+".gif?v="+percent_mobile_version+"&amp;us="+a[0]+"&amp;vi="+a[2]+"&amp;url="+escape(url)+"&amp;referer="+escape(document.referrer);	
	document.write("<img src=\""+image_url+"\" width=\"2\" height=\"2\" alt=\"\" />");}
}
function percent_mobile_get_cookie(c_name){
if (document.cookie.length>0){
c_start=document.cookie.indexOf(c_name + "=");
if (c_start!=-1){
c_start=c_start + c_name.length+1;c_end=document.cookie.indexOf(";",c_start); 
return document.cookie.substring(c_start,(c_end==-1)?document.cookie.length:c_end);
}
}
return "";
}
function percent_mobile_rand(){		
for(var r=""+Math.floor(Math.random()*(new Date().getTime()));r.length<15;r+=Math.floor(Math.random()*(new Date().getTime()))){}
return r.substring(0,15)+"1";
}