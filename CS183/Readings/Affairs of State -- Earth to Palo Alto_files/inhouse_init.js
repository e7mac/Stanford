locked = false;
loaded = false;

function catchPreLoad(msg,url,line) {
//	if((msg.indexOf("layer_main") >= 0) && (msg.indexOf("undefined") >= 0)) {
	if((msg.indexOf("layer_main") >= 0) || (msg.indexOf("layer_sidenav") >= 0)){
	       window.status = line;
		return true;
		}
	else {return false;}
}

window.onerror = catchPreLoad;	

function init(page) {

	if(is_major < 4) {this.location="/law/bad_browser.html";}

	document.cookie="cookiecheck=truevalue"
	var temp = document.cookie;
	if(temp=="")
	{
		document.location="/law/bad_cookie.html" ;
  	}
    initAll();
//	layer_realForm.extend("trueForm");
//	layer_keyword1.extend("storeSearch");
//	layer_keyword2.extend("siteSearch");
//	hideSiteSearch();
//	hideStoreSearch();
//	showSiteSearch();
//	popFooter();
//	if(hrefStr){layer_ads.overwrite(hrefStr);}
//       if (page != 1)
//	{
//	        switchRadio2(1,layer_searchSite);
//       }

}

window.onresize = screenReload;
