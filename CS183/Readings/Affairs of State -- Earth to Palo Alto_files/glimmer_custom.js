var agt=navigator.userAgent.toLowerCase();  
var is_major = parseInt(navigator.appVersion); 
var is_minor = parseFloat(navigator.appVersion); 
var is_nav  = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1) 
            && (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1) 
            && (agt.indexOf('webtv')==-1)); 
var is_nav2 = (is_nav && (is_major == 2)); 
var is_nav3 = (is_nav && (is_major == 3)); 
var is_nav4 = (is_nav && (is_major == 4)); 
var is_nav4up = (is_nav && (is_major >= 4)); 
var is_navonly      = (is_nav && ((agt.indexOf(";nav") != -1) || 
                          (agt.indexOf("; nav") != -1)) ); 
var is_nav5 = (is_nav && (is_major == 5)); 
var is_nav5up = (is_nav && (is_major >= 5)); 
var is_ie   = (agt.indexOf("msie") != -1); 
var is_ie3  = (is_ie && (is_major < 4)); 
var is_ie4  = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.0")==-1) ); 
var is_ie4up  = (is_ie  && (is_major >= 4)); 
var is_ie5  = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.0")!=-1) ); 
var is_ie5up  = (is_ie  && !is_ie3 && !is_ie4); 
	
layer_refer = "";
browser_version = "";
layer_name = new Array();
layer_obj = new Array();
end = "";
pause = "pause";
jump = "jump";
var pi = Math.PI;
current_draggable = "";
modules_names = new Array();
modules_values = new Array();
addMod("nothing",layer_report);

function checkVer() {
browser = navigator.appName;
    browser_version = parseInt(navigator.appVersion);
    return browser_version;
}

function voidOut() {
	}

function readAll() {
	if (document.all) {
		j = 0;
		for ( zz = 0; zz < document.all.tags('DIV').length; zz++ )
		{    
		if (document.all.tags('DIV')[zz].id != "") {
			layer_name[j] = "layer_"+document.all.tags('DIV')[zz].id;
			layer_obj[j] = document.all.tags('DIV')[zz].id;
			j = j+1;
			loaded = false;
			}
		}
	}
	if (document.layers) {
		j = 0;
		for ( zz = 0; zz < document.layers.length; zz++ )
		{    
		if (document.layers[zz].name != "") {
			layer_name[j] = "layer_"+document.layers[zz].name;
			layer_obj[j] = document.layers[zz].name;
			j = j+1;
			loaded = false;
			}
		}
	}
	loaded = true;
}

function initAll() {
	var q;
	readAll();
	for ( q = 0; q < layer_obj.length; q++ ){
		eval(layer_name[q] +"= new layer('"+layer_obj[q]+"'\)");
		}
	}	

function addMod(name,value) {
	var l = modules_names.length;
	modules_names[l]=name;
	modules_values[l]=value;
	}
	
function addNew(i) {
	var qq;
	for (qq = 0; qq < modules_names.length; qq++) {
		eval('i.'+modules_names[qq]+' = '+modules_values[qq]);
		}
	}
	
	
	
function runMe(codette){
	if(codette && codette != "undefined" && codette != "end"){
		voidOut();
		}
	}
	
function layer(name) {
	this.name = name;
	this.layer = name_layer(name);
	this.obj_name = 'layer_' + name;
	this.refresh = layer_refresh;
	this.refresh();
	}

function layer_refresh() {
	if (document.getElementById) {
	eval('this.top = '+this.layer+'.pixelTop');
	this.top = parseInt(this.top);
	eval('this.left = '+this.layer+'.pixelLeft');
	this.left = parseInt(this.left);
	eval('this.height = document.all["' + this.name + '"].offsetHeight');
	eval('this.width = document.all["' + this.name + '"].offsetWidth');
	eval('myclip = '+this.layer+'.clip');
	clip = getClipping(myclip);
	eval('this.clipTop = '+clip[0]);
	eval('this.clipRight = '+clip[1]);
	eval('this.clipBottom = '+clip[2]);
	eval('this.clipLeft = '+clip[3]);
	eval('this.zIndex = '+this.layer+'.zIndex');
	eval('this.visibility = '+this.layer+'.visibility');
	}
	else if (document.layers) {
	eval('this.top = '+this.layer+'.top');
	eval('this.left = '+this.layer+'.left');
	eval('this.height = '+this.layer+'.clip.height');
	eval('this.width = '+this.layer+'.clip.width');
	eval('this.clipTop = '+this.layer+'.clip.top');
	eval('this.clipLeft = '+this.layer+'.clip.left');
	eval('this.clipBottom = '+this.layer+'.clip.bottom');
	eval('this.clipRight = '+this.layer+'.clip.right');
	eval('this.zIndex = '+this.layer+'.zIndex');
	eval('this.visibility = '+this.layer+'.visibility');
	}
	else if(document.all) {
	eval('this.top = '+this.layer+'.top');
	eval('this.left = '+this.layer+'.left');
	eval('this.height = document.all["' + this.name + '"].offsetHeight');
	eval('this.width = document.all["' + this.name + '"].offsetWidth');
	eval('myclip = '+this.layer+'.clip');
	clip = getClipping(myclip);
	eval('this.clipTop = '+clip[0]);
	eval('this.clipRight = '+clip[1]);
	eval('this.clipBottom = '+clip[2]);
	eval('this.clipLeft = '+clip[3]);
	eval('this.zIndex = '+this.layer+'.zIndex');
	eval('this.visibility = '+this.layer+'.visibility');
	}
	else {
	this.top = 0;
	this.left = 0;
	this.height = 0;
	this.width = 0;
	this.clipTop = 0;
	this.clipRight = 0;
	this.clipLeft = 0;
	this.zIndex = 0;
	this.visibility = null;
	}
	this.speed = 2;
	this.refresh = layer_refresh;
	this.extend = layer_extend;
	this.runMe = runMe;
	this.report = layer_report;
	this.show = layer_show;
	this.hide = layer_hide;
	this.bounce = layer_bounce;
	this.overwrite = layer_write;
	addNew(this); 
}

function layer_extend(layer_element) {
	if (document.all) {
		layer_element_place = 'document.all["'+layer_element+'"]';
		}
	if (document.layers) {
		layer_element_place = this.layer+'.document.'+layer_element;
		}
	else {layer_element_place = layer_element;}
	eval(this.obj_name +'.'+layer_element +'='+ layer_element_place);
	}

function name_layer(name) {
  if (document.getElementById) {
  	return('document.getElementById("'+name+'").style');
	}
  else if (document.layers) {
	return('document.layers["'+name+'"]');
 	}
  else if (document.all) {
	return('document.all["' + name + '"].style');
	}
  else{return("empty");}
}

function screenReload() {
if(is_nav4 && (is_minor > 4.1)) {
if(document.layers){
	 if (document.body) {
           eval("browserWidth = " + document.body.clientWidth);
           eval("browserHeight = " + document.body.clientHeight);     
		   }
    else {
           eval("browserWidth = " + innerWidth);
           eval("browserHeight = " + innerHeight);
           }
	if(browserWidth > 597) {
		this.location.reload();
 		}
	}
}
}

function getClipping(ieclipstr) {
  ieclip = new Array();
  i = ieclipstr.indexOf("(");
  ieclip[0] = parseInt(ieclipstr.substring(i + 1, ieclipstr.length), 10);
  i = ieclipstr.indexOf(" ", i + 1);
  ieclip[1] = parseInt(ieclipstr.substring(i + 1, ieclipstr.length), 10);
  i = ieclipstr.indexOf(" ", i + 1);
  ieclip[2] = parseInt(ieclipstr.substring(i + 1, ieclipstr.length), 10);
  i = ieclipstr.indexOf(" ", i + 1);
  ieclip[3] = parseInt(ieclipstr.substring(i + 1, ieclipstr.length), 10);
  return(ieclip);
}

function layer_report() {
	alert("-REPORT-\nname:"+this.name+"\nobject name:"+this.obj_name+"\nlayer name:"+this.layer+"\ntop:"+this.top+"\nleft:"+this.left);
	alert("height:"+this.height+"\nwidth:"+this.width+"\nvisibility:"+this.visibility+"\nzindex:"+this.zIndex);
	}

function layer_bounce(top,left,codette){
	eval(this.layer+'.top = '+top);
	eval(this.layer+'.left = '+left);
	this.refresh();
	if (codette){runMe(codette);}
	}
	
function layer_show(x,y,codette){
	eval(this.layer+'.visibility = "visible"');
	this.refresh();
	if (codette){runMe(codette);}
	}
	
function layer_hide(x,y,codette){
	eval(this.layer+'.visibility = "hidden"');
	this.refresh();
	if (codette){runMe(codette);}
	}
	 
function layer_write(content,y,codette) {	
	if (!codette){codette = new Array('end');}
	if (document.layers) {
		content = "<body>" + content + "</body>";
		eval(this.layer+'.document.open()');
		eval(this.layer+".document.write('"+content+"')");
		eval(this.layer+".document.close()");
	}
	if (document.all) {
	eval (this.name + ".innerHTML = " + "'" + content + "'");
	}
	if (codette){this.runMe(codette);}
}
	

