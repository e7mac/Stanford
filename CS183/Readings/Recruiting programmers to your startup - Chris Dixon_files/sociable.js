function more(obj, id){
	
	var button;
	var box;
	var sociable;
	
	box = document.getElementById("sociable-"+id+"");
	button = obj;
	sociable = document.getElementById("sociable");
	//console.log(sociable.style.offsetTop);
	sociable.style.postion = "absloute";
	sociable.style.top = button.offsetTop;
	//alert(button.offsetTop);
	//alert(button.offsetLeft);
	sociable.style.left = button.offsetLeft;
	//console.log(sociable.style.offsetTop);
	box.style.display = "";
}

var t;
function hide_sociable(id,close){
	if (close == null){
	t = setTimeout(function (){
		hide_sociable(id,true)
	},1000);
	}else{
	var box;
	box = document.getElementById("sociable-"+id+"");
	box.style.display = "none";		
	}
}

function get_object(id) {
	var object = null;
	if( document.layers )	{			
		object = document.layers[id];
	} else if( document.all ) {
		object = document.all[id];
	} else if( document.getElementById ) {
		object = document.getElementById(id);
	}
	return object;
}

function is_child_of(parent, child) {
	if( child != null ) {			
		while( child.parentNode ) {
			if( (child = child.parentNode) == parent ) {
				return true;
			}
		}
	}
	return false;
}
function fixOnMouseOut(element, event, id) {
	clearTimeout(t);
	var current_mouse_target = null;
	if( event.toElement ) {				
		current_mouse_target 			 = event.toElement;
	} else if( event.relatedTarget ) {				
		current_mouse_target 			 = event.relatedTarget;
	}
	if( !is_child_of(element, current_mouse_target) && element != current_mouse_target ) {
		
		hide_sociable(id)
	}
}


      window.___gcfg = {
        lang: 'en-US'
      };

      (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/plusone.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
      })();


