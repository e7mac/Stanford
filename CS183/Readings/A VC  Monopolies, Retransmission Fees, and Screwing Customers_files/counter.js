// Copyright (c)2006 Site Meter, Inc.
// <![CDATA[
var SiteMeter =
{
	init:function( sCodeName, sServerName, sSecurityCode )
	{
		SiteMeter.CodeName = sCodeName;
		SiteMeter.ServerName = sServerName;
		SiteMeter.SecurityCode = sSecurityCode;
		SiteMeter.IP = "128.12.209.2";
		SiteMeter.trackingImage = new Image();
		SiteMeter.trackingImage2 = new Image();
		SiteMeter.dgOutlinkImage = new Image();

		if (typeof(g_sLastCodeName) != 'undefined')
			if (g_sLastCodeName == sCodeName)
				return;

		SiteMeter.onPageLoad();
//		if (!SiteMeter.addEvent( window, "load", SiteMeter.displayCounter ))
//			SiteMeter.onPageLoad();

		SiteMeter.addEvent( window, "load", SiteMeter.trackOutClicks );

	},

	aimInit:function(sCodeName)
	{
		var sSubDomain = sCodeName.substr(0,3);
		SiteMeter.init( sCodeName, sSubDomain + ".sitemeter.com", "");
	},

	trackOutClicks:function()
	{
		for(var i=0;i<document.links.length;i++)
		{
			SiteMeter.addEvent( document.links[i], "click", SiteMeter.onClick );
			SiteMeter.addEvent( document.links[i], "contextmenu", SiteMeter.onContextClick );
		}

	},

	onPageLoad:function()
	{
		var newImage  = document.createElement("img");
		var newHref   = document.createElement("a")
		var scriptRef = SiteMeter.getScriptElement();

		var newIFrame = document.createElement("iframe");
		newIFrame.frameBorder = 0;
		newIFrame.width = 0;
		newIFrame.height = 0;
		newIFrame.src = "http://dg.specificclick.net/?y=3&t=h&u=" + encodeURIComponent(document.location) + "&r=" + encodeURIComponent(SiteMeter.getReferralURL());

		var today=new Date();
		var sTZO=(typeof(today.getTimezoneOffset)!='undefined') ? today.getTimezoneOffset() : '';

		newHref.target = "_top";
		newHref.href = "http://www.sitemeter.com/stats.asp?site=" + SiteMeter.CodeName;
		newHref.id = "idSiteMeterHREF";

		newImage.border = "0";
		newImage.alt = "Site Meter";

		var sImage = "http://" + SiteMeter.ServerName + "/meter.asp?site=" + SiteMeter.CodeName;
		sImage += "&refer="+SiteMeter.getReferral();
		if (SiteMeter.IP != "")
			sImage += "&ip="+SiteMeter.IP;
		sImage += "&w="+window.screen.width;
		sImage += "&h="+window.screen.height;
		sImage += "&clr="+window.screen.colorDepth;
		sImage += "&tzo=" + sTZO;
		sImage += "&lang="+escape(navigator.language ? navigator.language : navigator.userLanguage);
		if (SiteMeter.SecurityCode != "")
			sImage += "&sc="+escape(SiteMeter.SecurityCode);
		sImage += "&pg="+escape(document.location);
		sImage += "&js=1&rnd="+Math.random();
		sImage += "&zyxver=1.120524";

		newImage.src = sImage;
		newHref.appendChild(newImage);
		var parentOfScript = SiteMeter.getParent( scriptRef );

		if (parentOfScript){
			parentOfScript.insertBefore(newHref,scriptRef);
			parentOfScript.insertBefore(newIFrame,scriptRef); 
		}
		else
			SiteMeter.trackingImage.src = sImage;




		var newImage2  = document.createElement("img");
		var newHref2   = document.createElement("a")
		var scriptRef2 = SiteMeter.getScriptElement();

		var today=new Date();
		var sTZO=(typeof(today.getTimezoneOffset)!='undefined') ? today.getTimezoneOffset() : '';

		newHref2.target = "_top";
		newHref2.href = "http://www.sitemeter.com/stats.asp?site=" + SiteMeter.CodeName;
		newHref2.id = "idSiteMeterHREF";

		newImage2.border = "0";
		newImage2.alt = "Site Meter";

		var sImage2 = "http://" + "tracking.sitemeter.com" + "/meter.asp?site=" + SiteMeter.CodeName;
		sImage2 += "&refer="+SiteMeter.getReferral();
		if (SiteMeter.IP != "")
			sImage2 += "&ip="+SiteMeter.IP;
		sImage2 += "&w="+window.screen.width;
		sImage2 += "&h="+window.screen.height;
		sImage2 += "&clr="+window.screen.colorDepth;
		sImage2 += "&tzo=" + sTZO;
		sImage2 += "&lang="+escape(navigator.language ? navigator.language : navigator.userLanguage);
		if (SiteMeter.SecurityCode != "")
			sImage2 += "&sc="+escape(SiteMeter.SecurityCode);
		sImage2 += "&pg="+escape(document.location);
		sImage2 += "&js=1&rnd="+Math.random();
		sImage2 += "&zyxver=1.120524";

		newImage2.src = sImage2;
		newHref2.appendChild(newImage2);
		var parentOfScript = SiteMeter.getParent( scriptRef );

		if (parentOfScript){
			parentOfScript.insertBefore(newHref,scriptRef);
			
		}
		else
			SiteMeter.trackingImage2.src = sImage2;
	},

	logEvent:function(sEvent, sText, sURL )
	{
		if (document.images && !SiteMeter.isLocalURL(sURL))
		{
			var sImg = "http://" + SiteMeter.ServerName + "/meter.asp?site=" + SiteMeter.CodeName;
			sImg += "&e=" + sEvent;
			sImg += "&l=" + escape(sURL);
			sImg += "&t=" + escape(sText);
			sImg += "&pg="+ escape(document.location);
			if (SiteMeter.SecurityCode != "") sImg += "&sc="+escape(SiteMeter.SecurityCode);
			if (SiteMeter.IP != "")	sImg += "&ip="+SiteMeter.IP;
			sImg += "&rnd="+Math.random();
			if (SiteMeter.trackingImage)
				SiteMeter.trackingImage.src = sImg;


			var dgImg = "http://dg.specificclick.net/?y=3&t=i&u=" + encodeURIComponent(document.location) + "&r=" + encodeURIComponent(SiteMeter.getReferralURL()) + "&c=" + encodeURIComponent(sURL);
			SiteMeter.dgOutlinkImage.src = dgImg;

		}
	},

	trimFragment:function(sString)
	{
		return sString.indexOf("#")>0?sString.substring(0, sString.indexOf("#")):sString;
	},

	isLocalURL:function(sURL)
	{
		return (SiteMeter.trimFragment(document.location.href) == SiteMeter.trimFragment(sURL));
	},

        getReferralURL:function()
        {
                var sRef="";
                var g_d = document;
                if (typeof(g_frames) != "undefined")
                if (g_frames)
                        sRef=top.document.referrer;
                if ((sRef == "") || (sRef == "[unknown origin]") || (sRef == "unknown") || (sRef == "undefined"))
                if (document["parent"] != null)
                        if (parent["document"] != null) // ACCESS ERROR HERE!
                                if (parent.document["referrer"] != null)
                                        if (typeof(parent.document) == "object")
                                                sRef=parent.document.referrer;
                if ((sRef == "") || (sRef == "[unknown origin]") || (sRef == "unknown") || (sRef == "undefined"))
                if (g_d["referrer"] != null)
                        sRef = g_d["referrer"];
                if ((sRef == "[unknown origin]") || (sRef == "unknown") || (sRef == "undefined"))
                        sRef = "";

                return sRef;
        },

	getReferral:function()
	{
		return escape(SiteMeter.getReferralURL());
	},

	getParent:function(e)
	{
		if (!e)
			return null;
		else
			if (e.parentElement)
				return e.parentElement;
			else
				if (e.parentNode)
					return e.parentNode;
				else
					return null;
	},

	getTarget:function(e)
	{
		var targ=null;
		if (!e) var e = window.event;
		if (e.target)
			targ = e.target;
		else if (e.srcElement)
			targ = e.srcElement;
		if (targ.nodeType)
			if (targ.nodeType == 3) // Safari bug
				targ = targ.parentNode;
		return targ;
	},

	getScriptElement:function()
	{
		var refScript=null;
		refScript = document.getElementById( "SiteMeterScript" );
		if (refScript)
			return refScript;

		var pageScripts = document.getElementsByTagName("script");
		for(var i=0;i<pageScripts.length;i++)
		{
			if (pageScripts[i].src)
			{
				var sSource = pageScripts[i].src.toLowerCase();
				if (sSource.indexOf("site=" + SiteMeter.CodeName) > 0)
					return pageScripts[i];
			}
		}

		return null;
	},

	elementText:function(e)
	{
		do
		{
			var sText = (e.text)?e.text:e.innerText;
			if (sText) return sText.substr(0,100);
			if (e.alt) return e.alt;
			if (e.src) return e.src;
			e = SiteMeter.getParent(e);
		}
		while (e);
		return "";
	},

	elementURL:function(e)
	{
		do
		{
			if ((e.href) && (e.nodeName.toUpperCase() == 'A')) return e.href;
			e = SiteMeter.getParent(e);
		}
		while (e);
		return "";
	},

	onClick:function(e)
	{
		var target = SiteMeter.getTarget(e);
		SiteMeter.logEvent( "click", SiteMeter.elementText(target), SiteMeter.elementURL(target) );
	},

	onContextClick:function(e)
	{
		var target = SiteMeter.getTarget(e);
		SiteMeter.logEvent( "context", SiteMeter.elementText(target), SiteMeter.elementURL(target) );
	},

	addEvent:function( obj, sEvent, func )
	{
		if (obj.addEventListener)
		    obj.addEventListener(sEvent, func, false);
		else
			if (obj.attachEvent)
			   obj.attachEvent( "on"+sEvent, func );
			else
				return false;
		return true;
	}

}

SiteMeter.init('s15fredwilson', 's15.sitemeter.com', '');

var g_sLastCodeName = 's15fredwilson';
// ]]>

