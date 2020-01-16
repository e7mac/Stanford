

/* SiteCatalyst code version: H.22.1.
Copyright 1996-2010 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */

function record(event, values, collect) {
    if (collect) {
        return [event, values];
    } else if (record.callbacks) { 
		if (event) {
			//record data to clickStreamCloud
			CQ_Analytics.EventDataMgr.reset();

			if (typeof event == "string") {
				CQ_Analytics.EventDataMgr.setProperty("events",event);
			} else {
				CQ_Analytics.EventDataMgr.setProperty("events",event.join("\u2026"));
			}
			if (values) {
				for (var j in values) {
					CQ_Analytics.EventDataMgr.setProperty(j, values[j]);
				}
			}

			CQ_Analytics.Sitecatalyst.updateEvars();
			
			//run callbacks for omniture tracking
			for (var i=record.callbacks.length-1;i>=0;i--) {
				if (record.callbacks[i].call(this, event, values)) {
					//clear events cache
            		CQ_Analytics.Sitecatalyst.events = [];
					return;
				}
			}
		}
    }
}

record.callbacks = [];
record.callbacks.push(function(event, values) {   
	 s=s_gi("conde-vanityfair");
	 s.linkTrackVars="events"; 
	 var s_code=s.tl("", "o", "");
	 if(s_code) document.write(s_code);
	 return true; 
});

CQ_Analytics.Sitecatalyst = {
    
    events: [],
        
    getBaseMappings: function() {
        s['eVar28'] = CQ_Analytics.SurferInfoMgr.data['userName'];
        s['eVar3'] = CQ_Analytics.PageDataMgr.data['title'];
        s['eVar1'] = CQ_Analytics.PageDataMgr.data['searchTerms'];
        s['eVar2'] = CQ_Analytics.PageDataMgr.data['pageName'];
        s['eVar7'] = CQ_Analytics.PageDataMgr.data['subSection'];
        s['eVar8'] = CQ_Analytics.PageDataMgr.data['subSection2'];
        s['eVar6'] = CQ_Analytics.PageDataMgr.data['section'];
        s['prop10'] = CQ_Analytics.PageDataMgr.data['searchTermsSplit'];
        s['prop11'] = CQ_Analytics.PageDataMgr.data['hour'];
        s['prop12'] = CQ_Analytics.PageDataMgr.data['day'];
        s['prop13'] = CQ_Analytics.PageDataMgr.data['weekday'];
        s['prop32'] = CQ_Analytics.PageDataMgr.data['paginationValue'];
        s['prop14'] = CQ_Analytics.SurferInfoMgr.data['jsessionId'];
        s['prop1'] = CQ_Analytics.PageDataMgr.data['searchTerms'];
        s['prop16'] = CQ_Analytics.SurferInfoMgr.data['loginStatus'];
        s['prop17'] = CQ_Analytics.SurferInfoMgr.data['monthlyVisitors'];
        s['prop19'] = CQ_Analytics.SurferInfoMgr.data['userId'];
        s['prop9'] = CQ_Analytics.PageDataMgr.data['subSection3'];
        s['eVar20'] = s.campaign || '';
        s['prop8'] = CQ_Analytics.PageDataMgr.data['subSection2'];
        s['prop7'] = CQ_Analytics.PageDataMgr.data['subSection'];
        s['pageName'] = CQ_Analytics.PageDataMgr.data['pageName'];
        s['prop6'] = CQ_Analytics.PageDataMgr.data['section'];
        s['prop5'] = CQ_Analytics.PageDataMgr.data['contentType'];
        s['eVar23'] = CQ_Analytics.SurferInfoMgr.data['newvsrepeatVisitors'];
        s['prop4'] = CQ_Analytics.PageDataMgr.data['contentId'];
        s['prop3'] = CQ_Analytics.PageDataMgr.data['title'];
        s['prop2'] = CQ_Analytics.PageDataMgr.data['numSearchResults'];
        s['eVar19'] = CQ_Analytics.SurferInfoMgr.data['userId'];
        s['eVar17'] = CQ_Analytics.SurferInfoMgr.data['monthlyVisitors'];
        s['channel'] = CQ_Analytics.PageDataMgr.data['sitesection'];
        s['eVar16'] = CQ_Analytics.SurferInfoMgr.data['loginStatus'];
        s['prop23'] = CQ_Analytics.SurferInfoMgr.data['newvsrepeatVisitors'];
        s['hier1'] = CQ_Analytics.PageDataMgr.data['hierarchy'];
        s['prop28'] = CQ_Analytics.SurferInfoMgr.data['userName'];
        s['eVar10'] = CN.stats.setInternalCampaignId();
        s['eVar9'] = CQ_Analytics.PageDataMgr.data['subSection3'];
        s['eVar11'] = CQ_Analytics.PageDataMgr.data['hour'];
        s['eVar32'] = CQ_Analytics.PageDataMgr.data['paginationValue'];
        s['eVar14'] = CQ_Analytics.SurferInfoMgr.data['jsessionId'];
        s['eVar15'] = s.campaign || '';
        s['eVar12'] = CQ_Analytics.PageDataMgr.data['day'];
        s['eVar13'] = CQ_Analytics.PageDataMgr.data['weekday'];
        
    },
    
    hasEvent: function(event) {
    	var a = CQ_Analytics.EventDataMgr.getProperty("events").split("\u2026");
			var i = a.length;
			while (i--) {
				if (a[i] === event) {
					return true;
				}
			}
			return false;
	},
		    
    setEvar: function(evar, value) {
        if(evar.match(/^eventdata\.events\./)) {
			if (this.hasEvent(evar.replace(/.+\./,""))) {
				this.events.push(value);
			}
            s.events = this.events.join(",");
            s.linkTrackEvents=s.events;
        } else if(value != '') {
            var tmp = value.split(".");
            var mgr = tmp[0];
            var key = tmp[1];
            var manager = {
                'profile': 'ProfileDataMgr',
                'pagedata': 'PageDataMgr',
                'tagcloud': 'TagCloudMgr',
                'surferinfo': 'SurferInfoMgr',
                'eventdata': 'EventDataMgr'
            };
            if(CQ_Analytics[manager[mgr]] != undefined) {
                 s[evar]= CQ_Analytics[manager[mgr]].data[key];
                 if (mgr=="eventdata") {
                 	 s.linkTrackVars = s.linkTrackVars + "," + evar;
                 }
            }
        }
    },

    collect: function() {
    	var elements = document.getElementsByTagName("*");
		var evnts = {};
		var alldata = {};
		for (var i=0;i<elements.length;i++) {
			if (elements[i].getAttribute("record")) {
				var trackres = eval("record(" + elements[i].getAttribute("record") + ",true)");
				var event = trackres[0];
				evnts[event] = event;
				var data = trackres[1];
				for (var j in data) {
					CQ_Analytics.EventDataMgr.setProperty(j, data[j]);
				}
			}
		}
		var myevents = [];
		for (i in evnts) {
			myevents.push(i);
		}
		CQ_Analytics.EventDataMgr.setProperty("events", myevents.join("\u2026"));
    }
};

var s_account="conde-vanityfair"
var s=s_gi(s_account)
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
s.charSet="UTF-8"
s.fpCookieDomainPeriods="0"
/* Conversion Config */
s.currencyCode="USD"
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls"
s.linkInternalFilters="javascript:"
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.visitorNamespace="condenast"
s.trackingServer="stats2.vanityfair.com"
s.trackingServerSecure="sstats.vanityfair.com"

 





/**
 * @namespace CN object
 * @description Conde Nast Digital namespace.
 * @function
 */
if (typeof CN === 'undefined' || !CN) {
    var CN = {};
}

/**
 * @namespace CN.stats.omniture object
 * @description Helper functions for stats calls.
 * @requires cn.js, s_code.js
 * @globals s_code,s
 * @function
 * History:
 */

CN.stats = (function() {
     /**
     * Current path array.
     * @memberOf CN.stats
     * @private
     * @type    array
     */
    var directories = CN.url.path(),

    /**
     * URL scrub rules.
     * @memberOf CN.stats
     * @private
     * @type array
     */
    scrubRules = [],

    /**
     * HTTP status.
     * @memberOf CN.stats
     * @private
     * @type number
     */
    httpStatus = 200,

    /**
     * Additional properties to register with custom link tracking. Added to Omniture's s.linkTrackVars.
     * @memberOf CN.stats
     * @private
     * @type array
     */
    savedLinkTrackVars = ['events'];

    platformEnvironment = CN.site.env,

    // TODO: Verify that these values still are valid in CQ5.
    temp_domain_var = document.location.hostname.replace('origin.', '').replace('stag.', '').split('.'),

     /**
     * An object to define valid events.
     */
    sEvents = {
      internalSearch : "event1",
      pageView : "event2",
      siteRegistration : "event3",
      subsConversions : "event4",
      ccUpsellImpressions : "event5",
      paidCreditCard : "event6",
      error : "event9",
      loginOverlayShown : "event10",
      newsletterSignup : "event11",
      newsletterSignup2 : "event12",
      newsletterSignup3 : "event13",
      emailAFriend : "event19",
      forumPost : "event20",
      login : "event21",
      comment : "event22",
      rating : "event23",
      review : "event24",
      photo : "event25",
      commentFocus : "event29",
      commentLayer : "event30",
      lightRegistration : "event31",
      lightLogin : "event32",
      fbcomment : "event34",
      videoPlay : "event35"
    };

    /**
     * If the current location is a subdomain that is not men or www then prepend that subdomain value to the directories variable
     * Used for 3rd party subdomains, ecom and forums tracking mostly
     * Sets the directories var.
     * @memberOf    CN.stats
     * @params dirs array array of directories
     * @private
     */
    function setDirectories(dirs) {
        directories = dirs;
        if ((platformEnvironment !== 'DEV' || document.location.hostname.match('stag-|stag.') !== null) && temp_domain_var.length !== 2 && temp_domain_var[0].match(/^men$|^www$|^magazine$|^stag$|^stag-|^secure|^cms|^carmot/) === null) {
            directories = new Array('sd_' + temp_domain_var[0]).concat(dirs);
            if (directories[directories.length-1] === '') {
                directories.pop();
            }
        }
    };

    function getDirectories() {
        return directories;
    };

    /*
     * Site hierarchy. Comma separated path. Exceptions: / will be set as "homepage".
     * Any error page is set to "error".
     * @memberOf    CN.stats
     * @private
     */
    function getHierarchy() {
        if (httpStatus == 404 || httpStatus == 500) {
            return "error";
        } else if (directories[0] === "") {
            return "homepage";
        } else {
            return directories.join(',');
        }
    };

    /**
     * Gets pagename property.
     * 2 scenarios:
     * 1- Set in js file which will capture the URL up to any parameters.
     * 2- Set explicitly where we want to force the pagename, ex: ""scrubbed"" URLs."
     * @memberOf    CN.stats
     */
    function getPageName() {
        var tempPageName = location.href;

            // Applies site-specific scrubbing rules.
        tempPageName = applyScrubRules(tempPageName);

        if (directories[0] === "") {
            tempPageName="homepage";
        } else if (directories[0].indexOf("search") === 0) {
            // Matches search results url and sets the page name as /search/query
            tempPageName = location.href.split('search')[0].replace(/#.*$/g,'').replace(/\/$/,'/search/query');
        } else {
            // Removes query string, trailing slash, and trailing hash mark.
            tempPageName = tempPageName.split('?')[0].replace(/#.*$/g,'').replace(/\/$/,'');
        }

        // If error page, include error code.
        if (httpStatus !== 200) {
            tempPageName = "error:" + httpStatus + ":" +  tempPageName;
        }

        return tempPageName;
    };

    /**
     * Applies site-specific URL scrubbing logic.
     * Requires that the public method CN.stats.addScrubRule() to populate
     * the scrubRules var.
     * @memberOf    CN.stats
     * @param pageName string starting pageName. Will be returned if none of the scrub rules are applied.
     * @private
     */
    function applyScrubRules(pageName) {
        var i,
            dirs;

        for (i = 0; i < scrubRules.length; i++) {
            if (scrubRules[i].condition) {
                pageName = scrubRules[i].rule;
                dirs = pageName.replace(/http:\/\/.*?\//, '/').match(/([^\/]+)/g) || [''];
                setDirectories(dirs);
                CN.debug.info("SCRUBBING " + pageName);
            }
        }
        return pageName;
    };


    /**
     * @name CN.stats.omniture#addScrubRule
     * @function
     * @description Adds a custom
     * @param {string}  condition Conditions to match before applying url scrub.
     * @param {string}  rule    Regex to scrub the url.
     */
    function addScrubRule(condition, rule) {
        scrubRules.push({
            condition : condition,
            rule : rule
        });
    };

    /**
     * @name CN.stats.omniture#setStatus
     * @function
     * @description Sets the http status. Used for error pages.
     * @param   {integer}    status    http status code
     */
    function setStatus(status) {
        httpStatus = status;
        return this;
    };


    /**
     * @name CN.stats#setEvent
     * @function
     * @description  Sets an event.
     * @param {string} name Name of the event to set.
     */
    function setEvent(name) {
        if (sEvents.hasOwnProperty(name)) {
            s.events=s.apl(s.events,sEvents[name],",",2);
        }
        return this;
    };

    /**
     * @name CN.stats#trackAction
     * @function
     * @description Sets an Omniture event on a user action (onclick).
     * @param (string) eventName    Name of the event. Needs to be a valid event name defined in events object.
     * @param (object)  evtSrc  Source of the event. Is a dom node.
     * @param (object) args config object with optional params.
     * @todo This shouldn't be here. Want to have CQ5 handle event tracking, but their code is not ready for use. Goal is to
     * not have this file access Omniture directly.
     */
    function trackAction(eventName, evtSrc, args) {
        args = args || {};
        args.linkTracking = args.linkTracking || false;
        s=s_gi(s_account);
        if (!args.linkTracking) {
            setEvent(eventName);
            s.linkTrackEvents=sEvents[eventName];
        }
        s.linkTrackVars=savedLinkTrackVars.join(',');
        s.tl(evtSrc,'o',eventName);
        savedLinkTrackVars.splice(1,savedLinkTrackVars.length);
        return this;
    };

    /**
     * @name CN.stats#trackActionEvar
     * @function
     * @description Sets an Omniture event and an evar onn a user action (onclick).
     * @param (string) eventName    Name of the event. Needs to be a valid event name defined in events object.
     * @param (object)  evtSrc  Source of the event. Is a dom node.
     * @param (string) evarName Name of the evar. Needs to be a valid evar name defined in evar object.
     * @param (string) evarVal Value of the evar.
     */
     function trackActionEvar(eventName, evtSrc, evarName, evarVal) {
        setEvent(eventName);
        s=s_gi(s_account);
        s.linkTrackVars=evarName + ',events';
        s.linkTrackEvents=sEvents[eventName];
        s[evarName] = evarVal;
        s.tl(evtSrc,'o',eventName);
        return this;
    };

    /**
     * @name CN.stats#setThirdParty
     * @function
     * @description Allows third party sites without a magazine subdomain to be tracked via omniture 3rd party cookie
     */
     function setThirdParty() {
        var _temp_thirdparty_var = document.location.hostname.replace('www.', '').split('.');
        directories = new Array(_temp_thirdparty_var[0]).concat(directories);
        if (directories[directories.length-1] === '') {directories.pop();}
        return this;
    };

    /**
     * @name CN.stats#trackAjaxPage
     * @function
     * @description Fires an Omniture page view event for AJAX apps.
     * @param (pageName) string Name of the page to track e.g., slide1
     */
     function trackAjaxPage(pageName) {
        if (typeof s === 'undefined') {
            CN.debug.warn("Call to trackAjaxPage, but Omniture s code was not loaded");
            return this;
        }

        if (pageName) {
            s.prop32 = pageName;
            s.eVar32 = s.prop32;
        }

        s.events = "event2";
        if(s.pdvalue === 1) {
            s.events=s.apl(s.events,'event28',',',2);
        }
        s.pdvalue = "";
        s.t();
        return this;
    };

    /**
     * @name CN.stats.omniture#setPaginationValue
     * @function
     * @description Override Pagination Page or Slide Number (prop32)
     * @param {string}  value  page or slide number Default: '' unless param exists ?pageNum=, ?slide=, ?currentPage=, ?page=
     */
    function setPaginationValue(value) {
        s.prop32 = value;
        s.eVar32 = s.prop32;
        return this;
    };

    /**
     * @name CN.stats#setCampaign
     * @function
     * @description Checks for values in query sring and sets campaign prop if they exist.
     */
    function setCampaign() {
        s.campaign="";
        /* External Campaign Tracking */
        if(!s.campaign) {
            s.campaign=s.getQueryParam('mbid,nav,fb_ref',':');
            s.campaign=s.getValOnce(s.campaign,'s_campaign',0);
        }
    };

    /*
     * setInternalCampaignId: Internal Campaign ID
     * where: all pages
     * what:    internal campaign ids
     * @memberOf    CN.stats
     * @private
     */
     function setInternalCampaignId() {
        if(!s.eVar10) {
            s.eVar10=s.getQueryParam('intcid');
            s.eVar10=s.getValOnce(s.eVar10,'s_eVar10',0);
            return s.eVar10;
        }

    };

    /**
     * @name CN.stats.omniture#setEvent
     * @function
     * @description  Sets an event. Need to pass it a valid event name.
     * @param {string} name Name of the event to set.
     */
    function setEvent(name) {
        if (sEvents.hasOwnProperty(name)) {
            s.events=s.apl(s.events,sEvents[name],",",2);
        }
        return this;
    };

    setDirectories(directories);



    return {
        addScrubRule : addScrubRule,
        getDirectories : getDirectories,
        getHierarchy : getHierarchy,
        getPageName : getPageName,
        trackAction : trackAction,
        trackActionEvar : trackActionEvar,
        trackAjaxPage : trackAjaxPage,
        setStatus : setStatus,
        setThirdParty : setThirdParty,
        setPaginationValue : setPaginationValue,
        setCampaign : setCampaign,
        setInternalCampaignId : setInternalCampaignId,
        setEvent : setEvent
    };

})();










/************************** PLUGINS SECTION *************************/
    /* You may insert any plugins you wish to use here.                 */
    /*
     * Plugin: getAndPersistValue 0.3 - get a value on every page
     */
    s.getAndPersistValue=function (v,c,e){
        var s=this,
            a=new Date;
        e=e?e:0;
        a.setTime(a.getTime()+(e*1000*60));
        if(!v&&s.c_r(c)!=''){
            v=s.c_r(c);
        }
        if(v)
            s.c_w(c,v,e?a:0);
        return s.c_r(c);
    }


    /*
     * Plugin Utility: apl v1.1
     */
    s.apl=new Function("L","v","d","u","" +"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
    +"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
    +"e()));}}if(!m)L=L?L+d+v:v;return L");

    /*
     * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
     */
    s.split=new Function("l","d",""+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

    /*
    * Plugin: getValOnce 0.2 - Modified to expire after 30 minutes since last call (Updated provided by Omniture)
    */
    s.getValOnce=new Function("v","c",""
    +"var s=this,k=s.c_r(c),a=new Date;a.setTime(a.getTime()+1800000);if("
    +"v){s.c_w(c,v,a);}else{s.c_w(c,k,a);}return v==k?'':v");

    /*
     * Plugin: getQueryParam 2.3
     */
    s.getQueryParam=new Function("p","d","u",""
    +"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
    +"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
    +".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
    +"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
    +"=p.length?i:i+1)}return v");
    s.p_gpv=new Function("k","u",""
    +"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
    +"=s.pt(q,'&','p_gvf',k)}return v");
    s.p_gvf=new Function("t","k",""
    +"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
    +"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
    +"epa(v)}return ''");

    /*
     * Plugin: getNewRepeat 1.0 - Return whether user is new or repeat
     */
    s.getNewRepeat=new Function(""
    +"var s=this,e=new Date(),cval,ct=e.getTime(),y=e.getYear();e.setTime"
    +"(ct+30*24*60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w("
    +"'s_nr',ct,e);return 'New';}if(cval.length!=0&&ct-cval<30*60*1000){s"
    +".c_w('s_nr',ct,e);return 'New';}if(cval<1123916400001){e.setTime(cv"
    +"al+30*24*60*60*1000);s.c_w('s_nr',ct,e);return 'Repeat';}else retur"
    +"n 'Repeat';");

    /* Plugin: TimeParting 3.0 - Set timeparting values based on time zone - valid through 2014
    * Customized to report in full hours only
    */

    s.TimeParting=new Function("t","z",""
    +"var s=this,d,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T;d=new Date();A"
    +"=d.getFullYear();if(A=='2009'){B='08';C='01'}if(A=='2010'){B='14';C"
    +"='07'}if(A=='2011'){B='13';C='06'}if(A=='2012'){B='11';C='04'}if(A="
    +"='2013'){B='10';C='03'}if(A=='2014'){B='09';C='02'}if(!B||!C){B='08"
    +"';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;D=new Date('1/1/2000');if("
    +"D.getDay()!=6||D.getMonth()!=0){return'Data Not Available'}else{z=p"
    +"arseFloat(z);E=new Date(B);F=new Date(C);G=F;H=new Date();if(H>E&&H"
    +"<G){z=z+1}else{z=z};I=H.getTime()+(H.getTimezoneOffset()*60000);J=n"
    +"ew Date(I+(3600000*z));K=['Sunday','Monday','Tuesday','Wednesday','"
    +"Thursday','Friday','Saturday'];L=J.getHours();M=J.getMinutes();N=J."
    +"getDay();O=K[N];P='AM';Q='Weekday';R='00';if(L>=12){P='PM';L=L-12};"
    +"if(L==0){L=12};if(N==6||N==0){Q='Weekend'}T=L+':'+R+P;if(t=='h'){re"
    +"turn T}if(t=='d'){return O}if(t=='w'){return Q}}");


    /* DynamicObjectIDs config */
    function s_getObjectID(o) {
        var ID=o.href;
            return ID;
    }
    s.getObjectID=s_getObjectID

    /*
    *  * DynamicObjectIDs v1.4: Setup Dynamic Object IDs based on URL
    *   */
    s.setupDynamicObjectIDs=new Function(""
    +"var s=this;if(!s.doi){s.doi=1;if(s.apv>3&&(!s.isie||!s.ismac||s.apv"
    +">=5)){if(s.wd.attachEvent)s.wd.attachEvent('onload',s.setOIDs);else"
    +" if(s.wd.addEventListener)s.wd.addEventListener('load',s.setOIDs,fa"
    +"lse);else{s.doiol=s.wd.onload;s.wd.onload=s.setOIDs}}s.wd.s_semapho"
    +"re=1}");
    s.setOIDs=new Function("e",""
    +"var s=s_c_il["+s._in+"],b=s.eh(s.wd,'onload'),o='onclick',x,l,u,c,i"
    +",a=new Array;if(s.doiol){if(b)s[b]=s.wd[b];s.doiol(e)}if(s.d.links)"
    +"{for(i=0;i<s.d.links.length;i++){l=s.d.links[i];c=l[o]?''+l[o]:'';b"
    +"=s.eh(l,o);z=l[b]?''+l[b]:'';u=s.getObjectID(l);if(u&&c.indexOf('s_"
    +"objectID')<0&&z.indexOf('s_objectID')<0){u=s.repl(u,'\"','');u=s.re"
    +"pl(u,'\\n','').substring(0,97);l.s_oc=l[o];a[u]=a[u]?a[u]+1:1;x='';"
    +"if(c.indexOf('.t(')>=0||c.indexOf('.tl(')>=0||c.indexOf('s_gs(')>=0"
    +")x='var x=\".tl(\";';x+='s_objectID=\"'+u+'_'+a[u]+'\";return this."
    +"s_oc?this.s_oc(e):true';if(s.isns&&s.apv>=5)l.setAttribute(o,x);l[o"
    +"]=new Function('e',x)}}}s.wd.s_semaphore=0;return true");

    /*
     * Plugin Utility: Replace v1.0
     */
    s.repl=new Function("x","o","n",""
    +"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
    +"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

    /*
     * Monthly Visit Number
     */
    s.dimo=new Function ("m","y", "var d=new Date(y,m+1,0); return d.getDate();");
    s.endof=new Function ("x", "var t = new Date(); t.setHours(0); t.setMinutes(0);"
    +"t.setSeconds(0); if(x=='m') d=s.dimo(t.getMonth(),t.getFullYear()) - t.getDate() + 1;"
    +"else if(x=='w') d=7-t.getDay(); else d=1; t.setDate(t.getDate()+d); return t;");
    s.getVisitNumCustom=new Function("tp", ""
    +"var s=this,e=new Date(),cval,cvisit,ct=e.getTime(),c='s_vnum_'+tp,c2='sinvisit_'+tp,eo=s.endof(tp),"
    +"y=eo.getTime();e.setTime(y);cval=s.c_r(c);if(cval){var i=cval.indexOf('&vn='),str=cval.substring(i+4,cval.length),k;}"
    +"cvisit=s.c_r(c2);if(cvisit){if(str){e.setTime(ct+30*60*1000);s.c_w(c2,'true',e);return str;}"
    +"else return 'unknown visit number';}"
    +"else{if(str){str++;k=cval.substring(0,i);e.setTime(k);s.c_w(c,k+'&vn='+str,e);e.setTime(ct+30*60*1000);s.c_w(c2,'true',e);return str;}"
    +"else{s.c_w(c,y+'&vn=1',e);e.setTime(ct+30*60*1000);s.c_w(c2,'true',e);return 1;}}"
    );

    /*
     * Plugin: Visit Depth
     */
    s.getActionDepth=new Function("c",""
    + "var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);"
    + "if(!s.c_r(c)){v=1}if(s.c_r(c)){v=s.c_r(c);v++}"
    + "if(!s.c_w(c,v,t)){s.c_w(c,v,0)}return v;");

    /*
     * Plugin: downloadLinkHandler 0.5 - identify and report download links
     */
    s.downloadLinkHandler=new Function("p",""
    +"var s=this,h=s.p_gh(),n='linkDownloadFileTypes',i,t;if(!h||(s.linkT"
    +"ype&&(h||s.linkName)))return '';i=h.indexOf('?');t=s[n];s[n]=p?p:t;"
    +"if(s.lt(h)=='d')s.linkType='d';else h='';s[n]=t;return h;");

    /*
     * Plugin: linkHandler 0.5 - identify and report custom links
     */
    s.linkHandler=new Function("p","t",""
    +"var s=this,h=s.p_gh(),i,l;t=t?t:'o';if(!h||(s.linkType&&(h||s.linkN"
    +"ame)))return '';i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h."
    +"substring(0,i);l=s.pt(p,'|','p_gn',h.toLowerCase());if(l){s.linkNam"
    +"e=l=='[['?'':l;s.linkType=t;return h;}return '';");
    s.p_gn=new Function("t","h",""
    +"var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x="
    +"t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}"
    +"return 0;");

    /*
     * Utility Function: p_gh
     */
    s.p_gh=new Function(""
    +"var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot("
    +"o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){"
    +"o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s."
    +"ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");

    /*
     * Function - read combined cookies v 0.3
     */
    if(!s.__ccucr){s.c_rr=s.c_r;s.__ccucr = true;
    s.c_r=new Function("k",""
    +"var s=this,d=new Date,v=s.c_rr(k),c=s.c_rr('s_pers'),i,m,e;if(v)ret"
    +"urn v;k=s.ape(k);i=c.indexOf(' '+k+'=');c=i<0?s.c_rr('s_sess'):c;i="
    +"c.indexOf(' '+k+'=');m=i<0?i:c.indexOf('|',i);e=i<0?i:c.indexOf(';'"
    +",i);m=m>0?m:e;v=i<0?'':s.epa(c.substring(i+2+k.length,m<0?c.length:"
    +"m));if(m>0&&m!=e)if(parseInt(c.substring(m+1,e<0?c.length:e))<d.get"
    +"Time()){d.setTime(d.getTime()-60000);s.c_w(s.epa(k),'',d);v='';}ret"
    +"urn v;");}
    /*
     * Function - write combined cookies v 0.3
     */
    if(!s.__ccucw){s.c_wr=s.c_w;s.__ccucw = true;
    s.c_w=new Function("k","v","e",""
    +"this.new2 = true;"
    +"var s=this,d=new Date,ht=0,pn='s_pers',sn='s_sess',pc=0,sc=0,pv,sv,"
    +"c,i,t;d.setTime(d.getTime()-60000);if(s.c_rr(k)) s.c_wr(k,'',d);k=s"
    +".ape(k);pv=s.c_rr(pn);i=pv.indexOf(' '+k+'=');if(i>-1){pv=pv.substr"
    +"ing(0,i)+pv.substring(pv.indexOf(';',i)+1);pc=1;}sv=s.c_rr(sn);i=sv"
    +".indexOf(' '+k+'=');if(i>-1){sv=sv.substring(0,i)+sv.substring(sv.i"
    +"ndexOf(';',i)+1);sc=1;}d=new Date;if(e){if(e.getTime()>d.getTime())"
    +"{pv+=' '+k+'='+s.ape(v)+'|'+e.getTime()+';';pc=1;}}else{sv+=' '+k+'"
    +"='+s.ape(v)+';';sc=1;}if(sc) s.c_wr(sn,sv,0);if(pc){t=pv;while(t&&t"
    +".indexOf(';')!=-1){var t1=parseInt(t.substring(t.indexOf('|')+1,t.i"
    +"ndexOf(';')));t=t.substring(t.indexOf(';')+1);ht=ht<t1?t1:ht;}d.set"
    +"Time(ht);s.c_wr(pn,pv,d);}return v==s.c_r(s.epa(k));");}

    /*
    *  * Plugin: exitLinkHandler 0.5 - identify and report exit links
    *   */
    s.exitLinkHandler=new Function("p",""
    +"var s=this,h=s.p_gh(),n='linkInternalFilters',i,t;if(!h||(s.linkTyp"
    +"e&&(h||s.linkName)))return '';i=h.indexOf('?');t=s[n];s[n]=p?p:t;h="
    +"s.linkLeaveQueryString||i<0?h:h.substring(0,i);if(s.lt(h)=='e')s.li"
    +"nkType='e';else h='';s[n]=t;return h;");

    /*
    *  * Plugin: getPreviousValue_v1.0 - return previous value of designated
    *   *   variable (requires split utility)
    *    */
    s.getPreviousValue=new Function("v","c","el",""
    +"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
    +"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
    +"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
    +":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
    +"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

    /* dedupe referrers */
    s.dedupeReferrers=new Function("c","b",""
    +"var s=this,a,g,i,j,k,l,m,n,o;g=s.referrer?s.referrer:document.refer"
    +"rer;g=g.toLowerCase();if(g){i=g.indexOf('?')>-1?g.indexOf('?'):g.le"
    +"ngth;j=g.substring(0,i);k=s.linkInternalFilters.toLowerCase();k=s.s"
    +"plit(k,',');l=k.length;for(m=0;m<l;m++){n=j.indexOf(k[m])>-1?g:'';i"
    +"f(n)o=n}if(!o){c=c?c:'_dr';b=b?b-1:'1';a=g;a=s.getValOnce(a,c,0);if"
    +"(a){return a}else{return k[b]}}}");

    /*
     *    Search Center Plug-in: manageQueryParam v1.2 - Manages query string parameters
     *    by either encoding, swapping, or both encoding and swapping a value.
     */

    s.manageQueryParam=new Function("p","w","e","u",""
    +"var s=this,x,y,i,qs,qp,qv,f,b;u=u?u:(s.pageURL?s.pageURL:''+s.wd.lo"
    +"cation);u=u=='f'?''+s.gtfs().location:u+'';x=u.indexOf('?');qs=x>-1"
    +"?u.substring(x,u.length):'';u=x>-1?u.substring(0,x):u;x=qs.indexOf("
    +"'?'+p+'=');if(x>-1){y=qs.indexOf('&');f='';if(y>-1){qp=qs.substring"
    +"(x+1,y);b=qs.substring(y+1,qs.length);}else{qp=qs.substring(1,qs.le"
    +"ngth);b='';}}else{x=qs.indexOf('&'+p+'=');if(x>-1){f=qs.substring(1"
    +",x);b=qs.substring(x+1,qs.length);y=b.indexOf('&');if(y>-1){qp=b.su"
    +"bstring(0,y);b=b.substring(y,b.length);}else{qp=b;b='';}}}if(e&&qp)"
    +"{y=qp.indexOf('=');qv=y>-1?qp.substring(y+1,qp.length):'';var eui=0"
    +";while(qv.indexOf('%25')>-1){qv=unescape(qv);eui++;if(eui==10)break"
    +";}qv=s.rep(qv,'+',' ');qv=escape(qv);qv=s.rep(qv,'%25','%');qv=s.re"
    +"p(qv,'%7C','|');qv=s.rep(qv,'%7c','|');qp=qp.substring(0,y+1)+qv;}i"
    +"f(w&&qp){if(f)qs='?'+qp+'&'+f+b;else if(b)qs='?'+qp+'&'+b;else qs='"
    +"?'+qp}else if(f)qs='?'+f+'&'+qp+b;else if(b)qs='?'+qp+'&'+b;else if"
    +"(qp)qs='?'+qp;return u+qs;");

    /*
     * Search Center Plugin: clickThruQuality v1.0 - [one line description of plugin]
     */
        s.clickThruQuality =new Function("scp","tcth_ev","cp_ev","cff_ev","cf_th",""
        +"var s=this;if(s.p_fo('clickThruQuality')==1){var ev=s.events?s.even"
        +"ts+',':'';if(s.getQueryParam&&s.getQueryParam(scp)){s.events=ev+tct"
        +"h_ev;if(s.c_r('cf')){var tct=parseInt(s.c_r('cf'))+1;s.c_w('cf',tct"
        +",0);if(tct==cf_th&&cff_ev){s.events=s.events+','+cff_ev;}}else {s.c"
        +"_w('cf',1,0);}}else {if(s.c_r('cf')>=1){s.c_w('cf',0,0);s.events=ev"
        +"+cp_ev;}}}");
        s.p_fo=new Function("n",""
        +"var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
        +"new Object;return 1;}else {return 0;}");

    /* Configure Modules and Plugins */
    s.loadModule("Media");
    s.Media.autoTrack=false;
    s.Media.trackVars="None";
    s.Media.trackEvents="None";



    /****************************** MODULES *****************************/
    /* Module: Media */
    s.m_Media_c="='s_media_'+m._in+'_~=new Function(~m.ae(mn,l,\"'+p+'\",~;`H~o.'+f~o.Get~=function(~){var m=this~}^9 p');p=tcf(o)~setTimeout(~x,x!=2?p:-1,o)}~=parseInt(~m.s.d.getElementsByTagName~ersion"
    +"Info~'`z_c_il['+m._in+'],~'o','var e,p=~QuickTime~if(~}catch(e){p=~s.wd.addEventListener~m.s.rep(~=new Object~layState~||^D~m.s.wd[f1]~Media~.name~Player '+~s.wd.attachEvent~'a','b',c~;o[f1]~tm.get"
    +"Time()/1~m.s.isie~.current~,tm=new Date,~p<p2||p-p2>5)~m.e(n,1,o^F~m.close~i.lx~=v+',n,~){this.e(n,~MovieName()~);o[f~i.lo~m.ol~o.controls~load',m.as~==3)~script';x.~,t;try{t=~Version()~else~o.id~)"
    +"{mn=~1;o[f7]=~Position~);m.~(x==~)};m.~&&m.l~l[n])~var m=s~!p){tcf~xc=m.s.~Title()~();~7+'~)}};m.a~\"'+v+';~3,p,o);~5000~return~i.lt~';c2='~Change~n==~',f~);i.~==1)~{p='~4+'=n;~()/t;p~.'+n)}~~`z.m_"
    +"i('`P'`uopen`6n,l,p,b`7,i`L`Ya='',x;l`Bl)`3!l)l=1`3n&&p){`H!m.l)m.l`L;n=`Km.s.rep(`Kn,\"\\n\",''),\"\\r\",''),'--**--','')`3m.`y`b(n)`3b&&b.id)a=b.id;for (x in m.l)`Hm.l[x]`x[x].a==a)`b(m.l[x].n^Fn"
    +"=n;i.l=l;i.p=p;i.a=a;i.t=0;i.s`B`V000);`c=0;^A=0;`h=0;i.e='';m.l[n]=i}};`b`6n`e0,-1`wplay`6n,o`7,i;i=`am`1`Ei`3m.l){i=m.l[\"'+`Ki.n,'\"','\\\\\"')+'\"]`3i){`H`c^Gm.e(i.n,3,-1^Fmt=`9i.m,^8)}}'^Fm(`w"
    +"stop`6n,o`e2,o`we`6n,x,o`7,i=n`x&&m.l[n]?m.l[n]:0`Yts`B`V000),d='--**--'`3i){if `v3||(x!=`c&&(x!=2||`c^G)) {`Hx){`Ho<0&&^A>0){o=(ts-^A)+`h;o=o<i.l?o:i.l-1}o`Bo)`3`v2||x`l&&`h<o)i.t+=o-`h`3x!=3){i.e"
    +"+=`v1?'S':'E')+o;`c=x;}`p `H`c!=1)`alt=ts;`h=o;m.s.pe='media';m.s.pev3=i.n+d+i.l+d+i.p+d+i.t+d+i.s+d+i.e+`v3?'E'+o:''`us.t(0,'`P^K`p{m.e(n,2,-1`ul[n]=0;m.s.fbr('`P^K}}^9 i};m.ae`6n,l,p,x,o,b){`Hn&&"
    +"p`7`3!m.l||!m.`ym.open(n,l,p,b`ue(n,x,o^5`6o,t`7,i=`q?`q:o`Q,n=o`Q,p=0,v,c,c1,c2,^1h,x,e,f1,f2`0oc^E3`0t^E4`0s^E5`0l^E6`0m^E7`0c',tcf,w`3!i){`H!m.c)m.c=0;i`0'+m.c;m.c++}`H!`q)`q=i`3!o`Q)o`Q=n=i`3!`"
    +"i)`i`L`3`i[i])^9;`i[i]=o`3!xc)^1b;tcf`1`F0;try{`Ho.v`D&&o`X`P&&`j)p=1`I0`8`3^0`1`F0`n`5`G`o`3t)p=2`I0`8`3^0`1`F0`n`5V`D()`3t)p=3`I0`8}}v=\"`z_c_il[\"+m._in+\"],o=`i['\"+i+\"']\"`3p^G^HWindows `P `R"
    +"o.v`D;c1`dp,l,x=-1,cm,c,mn`3o){cm=o`X`P;c=`j`3cm&&c`rcm`Q?cm`Q:c.URL;l=cm.duration;p=c`X`t;n=o.p`M`3n){`H^D8)x=0`3n`lx=1`3^D1`N2`N4`N5`N6)x=2;}^B`Hx>=0)`2`A}';c=c1+c2`3`W&&xc){x=m.s.d.createElement"
    +"('script');x.language='j`mtype='text/java`mhtmlFor=i;x.event='P`M^C(NewState)';x.defer=true;x.text=c;xc.appendChild(x`g6]`1c1+'`Hn`l{x=3;'+c2+'}`9`46+',^8)'`g6]()}}`Hp==2)^H`G `R(`5Is`GRegistered()"
    +"?'Pro ':'')+`5`G`o;f1=f2;c`dx,t,l,p,p2,mn`3o`r`5`f?`5`f:`5URL^3n=`5Rate^3t=`5TimeScale^3l=`5Duration^J=`5Time^J2=`45+'`3n!=`44+'||`Z{x=2`3n!=0)x=1;`p `Hp>=l)x=0`3`Z`22,p2,o);`2`A`Hn>0&&`4^4>=10){`2"
    +"^7`4^4=0}`4^4++;`4^I`45+'=p;`9^6`42+'(0,0)\",500)}'`U`1`T`g4]=-`s0`U(0,0)}`Hp`l^HReal`R`5V`D^3f1=n+'_OnP`M^C';c1`dx=-1,l,p,mn`3o`r`5^2?`5^2:`5Source^3n=`5P`M^3l=`5Length()/1000;p=`5`t()/1000`3n!=`4"
    +"4+'){`Hn`lx=1`3^D0`N2`N4`N5)x=2`3^D0&&(p>=l||p==0))x=0`3x>=0)`2`A`H^D3&&(`4^4>=10||!`43+')){`2^7`4^4=0}`4^4++;`4^I^B`H`42+')`42+'(o,n)}'`3`O)o[f2]=`O;`O`1`T1+c2)`U`1`T1+'`9^6`41+'(0,0)\",`43+'?500:"
    +"^8);'+c2`g4]=-1`3`W)o[f3]=`s0`U(0,0^5s`1'e',`El,n`3m.autoTrack&&`C){l=`C(`W?\"OBJECT\":\"EMBED\")`3l)for(n=0;n<l.length;n++)m.a(`y;}')`3`S)`S('on`k);`p `H`J)`J('`k,false)";
    s.m_i("Media");



CQ_Analytics.CCM.addListener("configloaded", function() {
    var omnitureFragments = ["section", "subSection", "subSection2", "subSection3"],
        i,
        directories = CN.stats.getDirectories();

    if (jQuery("title").html().indexOf('404') === 0) {
        CN.stats.setStatus('404');
    }

    if (jQuery("title").html().indexOf('500') === 0) {
        CN.stats.setStatus('500');
    }

    for (i=0; i<directories.length && i < omnitureFragments.length; i++) {
        this.setProperty(omnitureFragments[i], directories.slice(0,i+1).join("/"));
    }

    if (directories[0] === "") {
        this.setProperty('section', 'homepage');
    }

    // Search search results values
    if (jQuery(".cn_result_count").length > 0) {
        var t_search,
            term = CN.utils.transliterate(CN.url.params('query')).toLowerCase().replace(/\+/g, " "),
            numResults = isNaN(parseInt(jQuery(".cn_result_count .total").html(), 10)) ? 'zero' : parseInt(jQuery(".cn_result_count .total").html(), 10);
        this.setProperty('numSearchResults', numResults);
        this.setProperty('searchTerms', term);
        this.setProperty('searchTermsSplit', term.replace(/ /g,','));
        // This is a little hacky.
        s.eVar1=term;
        t_search=s.getValOnce(s.eVar1,'ev1',0);
        if(t_search) {
            CN.stats.setEvent("internalSearch");
        }
    }

    // Checking the fragment for slideshow values.
    if (CN.url.getFragment() && (CN.url.getFragment().indexOf('slide') > -1 || CN.url.getFragment().indexOf('intro') > -1)) {
        this.setProperty('paginationValue', CN.url.getFragment().replace(/\=/, ""));
    }

    this.setProperty('title', CN.utils.transliterate(document.title));
    this.setProperty('hierarchy', CN.stats.getHierarchy());
    this.setProperty('pageName', CN.stats.getPageName());
    this.setProperty('hour', s.TimeParting('h','-5') || '');
    this.setProperty('day', s.TimeParting('d','-5') || '');
    this.setProperty('weekday', s.TimeParting('w','-5') || '');
}, CQ_Analytics.PageDataMgr);

CQ_Analytics.CCM.addListener("configloaded", function() {
    this.setProperty('jsessionId', CN.cookie.get('JSESSIONID') || '');
    this.setProperty('loginStatus', CN.utils.parseStr(CN.cookie.get('cn_user_record'), 'usercookie').uid ? 'Logged in' : 'Not Logged in');
    this.setProperty('userId', CN.utils.parseStr(CN.cookie.get('cn_user_record'), 'usercookie').uid || '');
    this.setProperty('userName', CN.utils.parseStr(CN.cookie.get('cn_user_record'), 'usercookie').username || '');
    this.setProperty('monthlyVisitors', s.getVisitNumCustom('m'));
    this.setProperty('newvsrepeatVisitors', s.getNewRepeat());

}, CQ_Analytics.SurferInfoMgr);




// Calling Omniture plugins
/* To setup Dynamic Object IDs */
CN.stats.omniture = (function() {

return {
    doPlugins : function() {
        CN.stats.setCampaign();
        s.linkInternalFilters = "javascript:,vanityfair.com";
        s.setupDynamicObjectIDs();
        s.ActionDepthTest=true;
        CN.stats.setEvent("pageView"); // Page view event.

        // Auto events based on URL patterns.
        // Set newsletter event if we are on thank you page.
        if ( location.href.indexOf("/services/newsletters/demographics") != -1) {
            CN.stats.setEvent("newsletterSignup");
        }

        /* Visit Depth of 5  and New Visit Begun*/
        if(s.ActionDepthTest){
            s.pdvalue=s.getActionDepth("s_depth");
            if(s.pdvalue == 5) s.events=s.apl(s.events,'event26',',',2);
            if(s.pdvalue == 1) s.events=s.apl(s.events,'event28',',',2);
            s.ActionDepthTest=false;
        }

        /* Download Event */
        s.d_url=s.downloadLinkHandler(s.linkDownloadFileTypes);
        if(s.d_url){
            s.events=s.apl(s.events,'event18',',',2);
            s.linkTrackVars="events";
            s.linkTrackEvents="event18,";
        }

        /* dedupe the traffic sources reports */
        s.referrer=s.dedupeReferrers();

        /*Detects if referrer is external*/
        s.isReferrer=s.referrer?s.referrer:document.referrer;
        if(s.isReferrer){
            s.noQReferrer=s.isReferrer.indexOf('?')>-1?s.isReferrer.substring(0,s.isReferrer.indexOf('?')):s.isReferrer;//removes query params
            s.lnkIntFltArray=s.split(s.linkInternalFilters,',');
            s.lnkIntFltArrLen=s.lnkIntFltArray.length-1;
            for(s.qI=0;s.qI<=s.lnkIntFltArrLen;s.qI++){
                if(s.lnkIntFltArray[s.qI]){
                    s.inFilts=s.noQReferrer.indexOf(s.lnkIntFltArray[s.qI])==-1?false:true; //does referrer contain int. filter?  if so, set true, else set false
                    if(s.inFilts) {
                        break;
                    }
                }
            }


            /* If referrer is external, removes 'www' if present, extracts subdomain and populates eVar30 Defaults s.eVar33 with 'Other' if not set by campaign*/
            if(!s.inFilts){
                s.refArr=s.split(s.noQReferrer,"/");
                s.refSub=s.refArr[2].toLowerCase();
                s.eVar30=(s.refSub.substring(0,4)=="www.")?s.refSub.substring(4):s.refSub;
                if(!s.eVar33) {
                    s.eVar33="Other";
                }


                /* Checks for the actual domain
                 * If it is a google domain, grab the full value
                 */
                var periodNum=s.eVar30.split('.').length-1; //Find the number of periods in the string
                if ((periodNum == 1) || (document.referrer.match('google'))) {
                    s.prop39=s.eVar30; //if only one, leave it as it is
                } else {
                // Only grab 2 levels of domain.
                   var d = s.eVar30.split('.'),
                   dl = d.length;
                   s.prop39 = d.slice(dl - 2, dl).join('.');
                }
            }

            /* Detects if referrer is a recognized search engine */
            if(s.refSub){
                s.SEString='.google.|q>.yahoo.|p>.bing.|q>.ask.|q>.aol.|query>.myway.|searchfor>.netscape.|query>.altavista.|q>.lycos.|query>.msn.|q>.live.|q';
                s.SEArray=s.split(s.SEString, ">");
                for(s.qI2=0;s.qI2<s.SEArray.length;s.qI2++){
                    s.ArrSEV=s.split(s.SEArray[s.qI2],'|');
                    if(s.refSub.indexOf(s.ArrSEV[0])>-1){
                        s.kwdP=s.getQueryParam(s.ArrSEV[1],'',s.isReferrer);
                        s.kwdP=s.kwdP.toLowerCase();
                        break;
                    }
                }
            }

            if(s.kwdP){
                s.eVar33=(s.getQueryParam('mbid')||s.getQueryParam('nav')||s.getQueryParam('fb_ref'))?"Marketing":"Natural Search";
            }

            /* Prepends 'organic' or 'paid' depending on presence of search queries */
            s.orgString="organic: ";
            s.paidString="paid: "
            if(s.kwdP){
                s.kwdP=(s.eVar33=="Natural Search")?s.orgString.concat(s.kwdP):s.paidString.concat(s.kwdP);
                if(!s.eVar22&&s.kwdP) s.eVar22=s.kwdP;
            }
        }


        if(!s.isReferrer&&!s.campaign&&s.pdvalue === 1) {
            s.eVar33=('Typed/Bookmarked');
        }

        if(s.campaign){
            s.isSynd=s.campaign.toLowerCase();
            if (s.isSynd.indexOf('synd') != -1) {
                s.eVar33="Syndicated";
            } else if (s.isSynd.indexOf('social_') === 0) {
                s.eVar33="Social Media";
            } else if (s.isSynd.indexOf('cm_') === 0) {
                s.eVar33="Consumer Marketing";
            }
        }

        if(s.eVar22&&!s.prop33) s.prop33=s.eVar22;
        if(s.eVar30&&!s.prop30) s.prop30=s.eVar30;

        s.prop33=s.getAndPersistValue(s.prop33,'s_c33_persist',30);//customized to expire after 30 minutes from last call
        s.prop30=s.getAndPersistValue(s.prop30,'s_c30_persist',30);//customized to expire after 30 minutes from last call
        s.prop39=s.getAndPersistValue(s.prop39,'s_c39_persist',30);//persist referring subdomains

        /*uberEvent setting, the report suite needs to be configured to only record this event once per visit*/
        s.uberArrString = 'event3,event4,event11,event12,event19,event20,event21,event22,event23,event24,event26,event18,purchase';
        s.uberArr = s.uberArrString.split(',');
        s.eventsArr=s.events ? s.events.split(',') : [];
        for(var i=0,il=s.eventsArr.length;i<il;i++){
            for(var f=0,fl=s.uberArr.length;f<fl;f++){
                if(s.eventsArr[i]==s.uberArr[f]){
                    s.uberCheck=true;
                    break;
                }
            }
            if(s.uberCheck){
                s.linkTrackEvents=s.apl(s.linkTrackEvents,'event27',',',2);
                s.events=s.apl(s.events,'event27',',',2);
                break;
            }

        }

        /*Exit Link Previous Value*/
        s.e_url=s.exitLinkHandler();
        s.prevCont=s.getPreviousValue(s.prop5,'gpv_p5','');
        if(s.e_url){
            s.prop34=s.prevCont;
        }

        /*SearchCenter*/
        s.clickThruQuality('s_kwcid','event45','event46');
        if(s.getQueryParam('s_kwcid')) {
            s.pageURL=s.manageQueryParam('s_kwcid',1,1);
        }
    }
}
}());

/* Plugin Config */
s.usePlugins=true;
s.doPlugins=CN.stats.omniture.doPlugins;


/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s._c='s_c';s.wd=window;if(!s.wd.s_c_in){s.wd.s_c_il=new Array;s.wd.s_c_in=0;}s._il=s.wd.s_c_il;s._in=s.wd.s_c_in;s._il[s._in]=s;s.wd.s_c_in++;s"
+".an=s_an;s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=func"
+"tion(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexO"
+"f(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3)"
+"return encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%"
+"16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}return y}else{x=s.rep(escape(''+x),'+','%2B');if(c&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if"
+"(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}}return x};s.epa=function(x){var s=this;if(x){x=''+x;return s.em==3?de"
+"codeURIComponent(x):unescape(s.rep(x,'+',' '))}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z+=y+d.l"
+"ength;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.f"
+"sf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c="
+"s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)=='string')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}"
+"c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var"
+" s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('"
+".',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s."
+"epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NON"
+"E'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()"
+"+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i]."
+"o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv"
+">=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,"
+"'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s"
+".t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs="
+"p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,"
+"l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,0,r.t,r.u)}};s.br=function(id,rs){var s=this;if(s.disableBufferedRequests||!s.c_w('s_br',rs))s.brl=rs};s.flushBufferedReques"
+"ts=function(){this.fbr(0)};s.fbr=function(id){var s=this,br=s.c_r('s_br');if(!br)br=s.brl;if(br){if(!s.disableBufferedRequests)s.c_w('s_br','');s.mr(0,0,br)}s.brl=0};s.mr=function(sess,q,rs,id,ta,u"
+"){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+(un),im,b,e;if(!rs){if"
+"(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s"
+".ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/H.22.1/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047);if(id){s.br(id,rs);return}}if(s.d.images&&s.apv>=3"
+"&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+']."
+"mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im.s_l=0;im.onload=new Function('e',"
+"'this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if((!ta||ta=='_self'||ta="
+"='_top'||(s.wd.name&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0"
+" alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl="
+"function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,l,a,b='',c='',t;if(x){y=''+x;i=y.indexOf('?');if(i>0){a=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase()"
+";i=0;if(h.substring(0,7)=='http://')i+=7;else if(h.substring(0,8)=='https://')i+=8;h=h.substring(i);i=h.indexOf(\"/\");if(i>0){h=h.substring(0,i);if(h.indexOf('google')>=0){a=s.sp(a,'&');if(a.lengt"
+"h>1){l=',q,ie,start,search_key,word,kw,cd,';for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c){y+='?'+b+'&'"
+"+c;if(''+x!=y)x=y}}}}}}return x};s.hav=function(){var s=this,qs='',fv=s.linkTrackVars,fe=s.linkTrackEvents,mn,i;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].tr"
+"ackVars;fe=s[mn].trackEvents}}fv=fv?fv+','+s.vl_l+','+s.vl_l2:'';for(i=0;i<s.va_t.length;i++){var k=s.va_t[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(v&&k!='linkName'&&k!='l"
+"inkType'){if(s.pe||s.lnk||s.eo){if(fv&&(','+fv+',').indexOf(','+k+',')<0)v='';if(k=='events'&&fe)v=s.fs(v,fe)}if(v){if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pa"
+"geURL'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigra"
+"tionServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em="
+"=2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode"
+"')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j"
+"';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp'"
+";else if(k=='plugins')q='p';else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+q+'='+(k.substring(0,3)"
+"!='pev'?s.ape(v):v)}}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t"
+")return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExt"
+"ernalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)"
+"!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t"
+"();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Functi"
+"on(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.inde"
+"xOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'"
+"')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE'"
+")t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p"
+"=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' '"
+",'');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100"
+");o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&"
+"s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,'"
+",','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[u"
+"n]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Ob"
+"ject.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq"
+"[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o"
+".onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie|"
+"|!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=func"
+"tion(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e)"
+")return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.subst"
+"ring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowe"
+"rCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};"
+"s.sa=function(un){var s=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_"
+"l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Ar"
+"ray('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.le"
+"ngth;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0"
+";if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf("
+"\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl."
+"length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexO"
+"f('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadMo"
+"dule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else "
+"g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],"
+"o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!"
+"o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javas"
+"cript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,"
+"f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.vo1=function(t,a){if(a[t]"
+"||a['!'+t])this[t]=a[t]};s.vo2=function(t,a){if(!a[t]){a[t]=this[t];if(!a[t])a['!'+t]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.d"
+"ll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.d"
+"l=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.pt(s.vl_g,',','vo2',vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.t=fun"
+"ction(vo,id){var s=this,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate("
+")+'/'+tm.getMonth()+'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Objec"
+"t;s.gl(s.vl_g);s.uns();s.m_ll();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1'"
+";if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try"
+"{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c="
+"screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWid"
+"th;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp="
+"tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.f"
+"l(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=c"
+"t;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.pt(s.vl_g,',','vo2',vb);s.pt(s.vl_g,',','vo1',vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer"
+";if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return '';var p=s.pageName,w=1,t=s.ot(o)"
+",n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s_oidt}oc=o.onclick?''+o.onclick:''"
+";if((oc.indexOf(\"s_gs(\")>=0&&oc.indexOf(\".s_oc(\")<0)||oc.indexOf(\".tl(\")>=0)return ''}if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName"
+";t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+(t=='d'||t=='e'?s.ape(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');else trk=0;if(s.trackInlineStats){if(!p){p="
+"s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot="
+"'+s.ape(t)+(i?'&oi='+i:'')}}if(!trk&&!qs)return '';s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,id,ta);qs='';s.m_m('t');if(s.p_r)s.p_r("
+");s.referrer=''}s.sq(qs);}else{s.dl(vo);}if(vo)s.pt(s.vl_g,',','vo1',vb);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_link"
+"Name=s.wd.s_linkType='';if(!id&&!s.tc){s.tc=1;s.flushBufferedRequests()}return code};s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};if(pg){s.wd.s_co=function(o)"
+"{var s=s_gi(\"_\",1,1);return s.co(o)};s.wd.s_gs=function(un){var s=s_gi(un,1,1);return s.t()};s.wd.s_dc=function(un){var s=s_gi(un,1);return s.t()}}s.ssl=(s.wd.location.protocol.toLowerCase().inde"
+"xOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var ap"
+"n=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isope"
+"ra=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv="
+"parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=="
+"'%U0100'?1:0))}s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLi"
+"fetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,products,linkName,"
+"linkType';for(var n=1;n<76;n++)s.vl_t+=',prop'+n+',eVar'+n+',hier'+n+',list'+n;s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browse"
+"rHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests"
+",mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadF"
+"ileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,_1_referrer';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);if(!ss)s.wds()",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,s;if(un){un=un.toLowerCase();if(l)for(i=0;i<l.length;i++){s=l[i];if(!s._c||s._c=='s_c'){if(s.oun==un)return s;else if(s.fs&&s.sa&&s.fs(s.oun,un)){s.sa(un);return s}}}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a>=5&&v.indexOf('Opera')<0&&u.indexOf('Opera')<0){w.s_c=new Function("un","pg","ss","var s=this;"+c);return new s_c(un,pg,ss)}else s=new Function("un","pg","ss","var s=new Object;"+s_ft(c)+";return s");return s(un,pg,ss)}

