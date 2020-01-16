/* global definitions, overrides, and functions for PNAS site */

gSiteOptions.suppressDockedSearchNav=false;
gSiteOptions.includeHWCitingTitle=true; //show citing with HW specific title bubble for a and div
gSiteOptions.hasFrameLinkTargetFunction=true;

$(document).ready(function() {
	
    updateFormInput("#col-3 #sidebar-search-label","#col-3 #sidebar-search-input");

    var dslinks = $("a[class^='dslink-']");

    if (dslinks.length) {
	dslinks.attr("target", "_blank");
    }
});

function setFrameLinkTarget(xhtmlLink) {
	var linkClass = new String(xhtmlLink.attr("class"));

	if (linkClass.indexOf("dslink-") == 0) {
		return "_blank";
	} else {
		return "_top";
	}
}

