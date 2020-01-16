jQuery(document).ready(function(){var timing=new Date();var ak_js=document.getElementById('ak_js');if(ak_js){ak_js.value=timing.getTime();return;}
var input='<input type="hidden" id="ak_js" name="ak_js" value="'
+timing.getTime()+'"/>';var div=document.createElement('div');div.innerHTML=input
jQuery('#commentform').append(div);jQuery('#replyrow td').append(input);});