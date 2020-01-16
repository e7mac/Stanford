function autoResize(id){
  var newheight;
  var newwidth;
  document.getElementById(id).height= 1+"px";
  document.getElementById(id).width= 1+"px";
  if(document.getElementById){
    newwidth=document.getElementById(id).contentWindow.document .body.scrollWidth;
    newheight = 250;
  }
  document.getElementById(id).height= (newheight) + "px";
  document.getElementById(id).width= (newwidth) + "px";
}
function refreshUnit() {
  $('#unit-sidebar').empty().append("<iframe id='#Geekosystem_Unit_300x250_ATF' style='border:none;' frameborder='0' scrolling='no' width='300' height='250' onLoad=\"autoResize('#Geekosystem_Unit_300x250_ATF')\" src='/wp-content/plugins/am-unit-manager/html/Geekosystem_Slideshow_300x250_ATF.html'></iframe>");
}