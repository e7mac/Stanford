/**
 * Copyright (C) 2005 Brightcove, Inc.  All Rights Reserved.  No
 * use, copying or distribution of this work may be made except in
 * accordance with a valid license agreement from Brightcove, Inc.
 * This notice must be included on all copies, modifications and
 * derivatives of this work.
 *
 * Brightcove, Inc MAKES NO REPRESENTATIONS OR WARRANTIES ABOUT
 * THE SUITABILITY OF THE SOFTWARE, EITHER EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
 * NON-INFRINGEMENT. BRIGHTCOVE SHALL NOT BE LIABLE FOR ANY DAMAGES SUFFERED
 * BY LICENSEE AS A RESULT OF USING, MODIFYING OR DISTRIBUTING THIS
 * SOFTWARE OR ITS DERIVATIVES.
 *
 * "Brightcove" is a trademark of Brightcove, Inc.
 **/

/*********************************************** CONFIGURATION ************************************************/

/**
 * This is the API Token assigned to each Brightcove customer that allows for the use of Brightcove's Media Read API.
 * Fill in your read API token (there are two versions, but you want the one that includes URL responses) here.
 */
var BCReadAPIToken = "z5sgwpPEzEhUQ-Q6pJzd73AeUwfGRpm3DoBXM_xNb2c.";

/**
 * This value indicates whether or not your account is set-up for UDS. HTML5 requires that the files be delivered
 * over HTTP.  This is accomplished by having an account that is configured for HTTP (PD) delivery or that is set-up
 * for UDS. 
 */
var isUDS = true;

/* This variable is a dictionary that contains information about the location of each
 * Brightcove video object within the DOM of the page. Specifically, it is an associative array
 * where, for each stored mapping, the keys is the playerID of a given video, and the value is
 * the next sibling of that video object in the DOM. Keeping track of this sibling will allow
 * us to re-insert the mobile compatible video tag into the correct place (before this sibling)
 * in the DOM of the original page.
 */
var pagePlacementInfo = new Object();

/**********************************************************************************************************************/
/*********************************************** DOM MODIFICATION CODE ************************************************/
/**********************************************************************************************************************/

/* This is the main entry function. It goes through the list of all video objects that need to be removed,
 * and one by one, initiates a request that causes that object to be removed and replaced by the
 * appropriate video tag (if the JS detects that the browser is on a smartphone).
 */
function runMobileCompatibilityScript(bcExperienceID, videoTagID){
	//detect if this is a smartphone or not
	var thisIsSmartPhone = DetectSmartphone();

	if (!thisIsSmartPhone) {
	    return;
	}
	
	makeMobileCompatible(bcExperienceID, videoTagID);
}

/* This method works on a specific object, represented by id "strObjID". The method retrieves the
 * element with the given ID from the DOM, and then extracts the player ID from the video
 * object. Then, it removes the video object from the page's DOM and stores its location in the page
 * in a global dictionary variable (this will be useful when we want to add the corresponding
 * video tag back in the page in the appropriate place).
 *
 * Finally, the method submits an API Read request to the Brightcove server through the initiateMobileVideoRetrieval()
 * method in order to retrieve the sepcific Video URL corresponding to the given object.
 */
function makeMobileCompatible(strObjID, videoTagID){
	//our video object (which we need to remove)
	var vidObj = document.getElementById(strObjID);
	
	//extract the playerID of this video object before deleting it
	var vidPlayerID = getParamValueForVidObject(vidObj, 'playerID');
	var programmedVideo = getParamValueForVidObject(vidObj, '@videoPlayer');

	//if the video player ID could not be extracted from the Source Code, for some reason,
	//then refer to the dictionary provided by the user
	if (vidPlayerID == null || typeof vidPlayerID == 'undefined'){
			vidPlayerID = BCVidObjects[strObjID];
	}

	//store the parent of the node we wish to remove
	var parentObj = vidObj.parentNode;
	
	//this is the object before which our vidObj element occurs in the parent element's DOM.
	//likewise, when we insert our video tag, we will insert it BEFORE this element,
	//in order to maintain the look of the page (this is the best that we can do...)
	var nextAdjacentNode = vidObj.nextSibling;
	
	//if there are no nodes after this node that was removed, then store 'null' to indicate that this was the last
	//child.
	if (nextAdjacentNode == null){
		pagePlacementInfo[""+strObjID] = null;
	}
	//otherwise store the next sibling
	else {
		pagePlacementInfo[""+strObjID] = nextAdjacentNode;	
	}
	
	//now, dynamically remove the video object from the DOM
	parentObj.removeChild(vidObj);

	//this procedure will make the appropriate API calls to get the first video corresponding to the player ID 
	//of the object we just removed.
	
	initiateMobileVideoRetrieval(vidPlayerID, programmedVideo, BCReadAPIToken, videoTagID, strObjID);
}


/** 
 * This function takes an object representing a Brigthcove video embed and a particular 'parameter' that was
 * passed to the Brightcove video object and returns the parameter.
 */
function getParamValueForVidObject(vidObj, paramName) {
	//these are the children nodes of the given object in the DOM
	var childrenNodes = vidObj.childNodes;
	var tagName;
	
	//loop through all children of the video object, searching for param tags.
	//each time we find a param tag, we check whether its name is 'flashVars'.
	//if so, we store the param's value and break from the loop, otherwise we
	//continue
	for (var i = 0; i < childrenNodes.length; i++){
	    if (childrenNodes[i].nodeType != 1) {
		continue;
	    }

	    tagName = childrenNodes[i].tagName.toLowerCase();
	    if (tagName == "param"){
		if (childrenNodes[i].getAttribute("name") == paramName){
		    return childrenNodes[i].getAttribute("value");
		}
	    }
	}

	return null;
}

/**
 * Takes a string 'str' that consists of multiple arguments separated by ampersands (&),
 * and breaks it down so that it can extract and return the paramName from the string.
 */
function parseParamFromString(str, paramName) {
	var params = str.split("&"); //array of strings
	for (var i = 0; i < params.length; i++){
		if (params[i].indexOf(paramName) != -1){
			return params[i].substr(params[i].indexOf("=")+1);
		}
	}
	
	// if we could not find the param then return null
	return null;
}



/**********************************************************************************************************************/
/****************************************** MEDIA API CALLS & VIDEO TAG INSERTION *************************************/
/**********************************************************************************************************************/

/* This method calls the Brightcove Media API to get all playlists included within a particular
 * playerID.
 */
function initiateMobileVideoRetrieval(playerID, programmedVideoID, readAPIToken, videoTagID, strObjID) {
    var APICall;
    var scriptNode;
    var scriptText;
    var callbackMethodName;

    if (programmedVideoID) {
	if (programmedVideoID.indexOf('ref:') != -1) {
	    APICall = "http://api.brightcove.com/services/library?command=find_video_by_reference_id&reference_id="+programmedVideoID.substring(4)+"&token="
		+readAPIToken;
	}
	else {
	    APICall = "http://api.brightcove.com/services/library?command=find_video_by_id&video_id="+programmedVideoID+"&token="
		+readAPIToken;
	}

	//when we make the API call, we specify a response handler (known as a callback method) that will deal with the response from
	//the Brightcove server. However, we create a customized 'callback' method for each playerID, so that when we are 'inside' the
	//callback method (after receiving the server's reponse), we will know which playerID the response corresponds to. This variable
	//stores the name (which includes the playerID) of that callback method.
	callbackMethodName = "handleJSONResponseForID"+new Date().getTime();
	scriptNode = document.createElement("script");
	scriptNode.setAttribute("language", "javascript");
	scriptText = 
		"function "+callbackMethodName+"(JSONResponse){\n" + 
			"\thandleVideoResponse(JSONResponse, '"+playerID+"', '"+videoTagID+"', '"+strObjID+"');\n"+
		"}\n";
    }
    else {
	APICall = "http://api.brightcove.com/services/library?command=find_playlists_for_player_id&player_id="+playerID+"&token="
								+readAPIToken;
	callbackMethodName = "handleJSONResponseForID"+ new Date().getTime();
	scriptNode = document.createElement("script");
	scriptNode.setAttribute("language", "javascript");
	scriptText = 
		"function "+callbackMethodName+"(JSONResponse){\n" + 
			"\thandlePlaylistResponse(JSONResponse, '"+playerID+"', '"+videoTagID+"', '"+strObjID+"');\n"+
		"}\n";
    }

    if (isUDS) {
	APICall += "&media_delivery=http";
    }

	//NOTE: we add to the end of the body, so that we do not disrupt any of the order of the children
	//at the top of the body's DOM tree
	var scriptTextNode = document.createTextNode(scriptText);
	scriptNode.appendChild(scriptTextNode);
	document.body.appendChild(scriptNode);
	
	//make the API call, specifying the unique callback method for this request
	addScriptTag("getMobileRendition",  APICall, callbackMethodName);
}

/* Methods needed to make API Calls to the Brightcove server*/
function addScriptTag(id, url, callback) {
	var scriptTag = document.createElement("script");
	var noCacheIE = '&noCacheIE=' + (new Date()).getTime();
   
   // Add script object attributes
   scriptTag.setAttribute("type", "text/javascript");
   scriptTag.setAttribute("charset", "utf-8");
   scriptTag.setAttribute("src", url + "&callback=" + callback + noCacheIE);
   scriptTag.setAttribute("id", id);
	
	var head = document.getElementsByTagName("head").item(0);	
	head.appendChild(scriptTag);
}

/**
 * This is the general response-handler for the JSON response from the Brightcove server for playlist based players.
 * The arguments to the method include the response object, as well as the playerID of the 
 * object which this response pertains to.
 *
 */
function handlePlaylistResponse(JSONResponse, playerID, videoTagID, strObjID) {
	//obtain first playlist in Brightcove Player given corresponding to this playerID
	var firstPlaylist = JSONResponse.items[0];
	
	//obtain the first video from our first playlist
	var firstVideo = firstPlaylist.videos[0];

	embedHTML5PlayerForVideo(firstVideo, playerID, videoTagID, strObjID);
}

/**
 * This is the general response-handler for the JSON response from the Brightcove server for playlist based players.
 * The arguments to the method include the response object, as well as the playerID of the 
 * object which this response pertains to.
 *
 */
function handleVideoResponse(JSONResponse, playerID, videoTagID, strObjID) {
    embedHTML5PlayerForVideo(JSONResponse, playerID, videoTagID, strObjID);
}

/** 
 * For a given video object (from the BC APIs) we will embed an HTML 5 'video' tag.
 * Requires searching through the renditions associated with the video object
 * for a rendition that is a 'best' match and passing the URL to the video
 * tag.
 *
 * In this handler, we explore the JSON object in search of the first video in the
 * first playlist that is returned by the Brightcove server. Then, once we identify
 * this first video, we examine the various renditions of the video and search
 * for the rendition that is most appropriate for a mobile (H.264 encoding 
 * and 256 kbps). 
 */
function embedHTML5PlayerForVideo(video, playerID, videoTagID, strObjID) {
	//obtain the array of various renditions that exist for this video.
	//NOTE: a rendition, from our perspective, has a certain encoding rate,
	//      and a certain encoding format. We wish to find the best rendition for
	//      a smartphone.
	var renditions = video.renditions;
	
	//In the for-loop that follows, we traverse all renditions of this first video, searching
	//for the H.264 (mobile-compatible) rendition whose encoding rate is closest to 256kbps
	var bestRenditionIndex = -1;
	var bestEncodingRateSoFar = -1;
	for (var i = 0; i < renditions.length; i = i+1){
		//if this rendition is not H264, skip it and move on to the next
		if (renditions[i].videoCodec != "H264"){
			continue;
		}
		
		//if best rendition index variable is uninitialized, then initialize it to
		//this rendition (which is H.264) - we need this because it's possible that
		//there are no H264 renditions at all, and starting our bestRenditionIndex at
		//an invalid value will help us figure out whether we came across any H264 renditions
		//as we were looping.
		if (bestRenditionIndex == -1){
			bestRenditionIndex = i;
			bestEncodingRateSoFar = renditions[i].encodingRate;
		}
		
		//otherwise check to see if this rendition has a better encoding rate than the best one before this
		else if (betterEncodingForMobile(renditions[i].encodingRate, bestEncodingRateSoFar) == renditions[i].encodingRate){
			//if so, then record this rendition as the best one so far
			bestRenditionIndex = i;
			bestEncodingRateSoFar = renditions[i].encodingRate;
		}
	}
	
	//after the for-loop has terminated, if best rendition index still == -1,
	//then that means we don't have ANY H264 renditions. so let the user know,
	//and don't add anything to the page
	if (bestRenditionIndex == -1){
	    bestRendition = video.videoFullLength;
	}
	else {
		bestRendition = renditions[bestRenditionIndex];
	}

	var bestRenditionURL = bestRendition.url;
	
	var vidName = video.name;
	var vidWidth = 300;//bestRendition.frameWidth;
	var vidHeight = 254;//bestRendition.frameHeight;
	var vidStillURL = video.videoStillURL;
	switch(playerID)
    	{
    	case "1716442119":
        	vidWidth = 480;
	    	vidHeight = 320;
      		break;
    	default:
        	vidWidth = 300;
	   	vidHeight = 254;
    	}
	
	//construct the video tag as a DOM element
	var videoScriptTag = formVideoTagFromInfo(videoTagID, vidName, bestRenditionURL, vidWidth, vidHeight, vidStillURL);
	
	//retrieve the component before which this video tag needs to be inserted
	var nextSiblingOfVideo = pagePlacementInfo[strObjID];
	var videoTagParent = nextSiblingOfVideo.parentNode; //the sibling and this video share the same parent node!
		
	//if 'nextSibling' value is null, then we want to add our video as the last child of the parent,
	//so we use the append() method; if 'nextSibling' is defined, then we use insertBefore() to add our video tag
	//into the appropriate location in our page.
	if (nextSiblingOfVideo == null){
		videoTagParent.appendChild(videoScriptTag);
	}
	else{
		videoTagParent.insertBefore(videoScriptTag, nextSiblingOfVideo);
	}
	addLoadEvent(onHTML5TemplateReady);
}

/* This function takes two encoding rates and returns the one that
 * is more apprporiate for mobile phones.
 */
function betterEncodingForMobile(encoding1, encoding2){
	IDEAL_ENCODING_RATE = 256000; //bits per second; equivalent to 256 kbps
	
	diff1 = Math.abs(encoding1 - IDEAL_ENCODING_RATE);
	diff2 = Math.abs(encoding2 - IDEAL_ENCODING_RATE);
	
	return ((diff1 <= diff2) ? encoding1 : encoding2);
}

/**
 * This method takes properties of a video, its dimensions, and its poster (still image),
 * inserts them into an HTML 5.0 video tag. This video object is then returned.
 */
function formVideoTagFromInfo(videoTagID, videoID, videoURL, vidWidth, vidHeight, vidImageURL){
	var videoTag = document.createElement("video");
	if (videoTagID) {
	    videoTag.setAttribute("id", videoTagID);
	}
	else {
	    videoTag.setAttribute("id", videoID);
	}

	videoTag.setAttribute("poster", vidImageURL);
	videoTag.setAttribute("width",""+vidWidth);
	videoTag.setAttribute("height", ""+vidHeight);
	videoTag.setAttribute("controls", "true");
	videoTag.setAttribute("src", videoURL);
	
	return videoTag;
}


/**********************************************************************************************************************/
/****************************************** MOBILE BROWSER DETECTION CODE *********************************************/
/**********************************************************************************************************************/

// JavaScript Document

// Anthony Hand, ahand@hand-interactive.com
// Web: www.hand-interactive.com
// 
// License info: http://creativecommons.org/licenses/by/3.0/us/

//Initialize some initial string variables we'll look for later.
var deviceIphone = "iphone";
var deviceIPad = "ipad";
var deviceIpod = "ipod";
var devicePlaystation = "playstation";
var deviceWap = "wap";

var deviceWinMob = "windows ce";
var enginePie = "wm5 pie";
var deviceIeMob = "iemobile";

var deviceS60 = "series60";
var deviceSymbian = "symbian";
var deviceS60 = "series60";
var deviceS70 = "series70";
var deviceS80 = "series80";
var deviceS90 = "series90";

var deviceBB = "blackberry";

var deviceAndroid = "android";

var deviceMidp = "midp";
var deviceWml = "wml";
var deviceBrew = "brew";

var devicePalm = "palm";
var engineXiino = "xiino";
var engineBlazer = "blazer"; //Old Palm

var devicePda = "pda";
var deviceNintendoDs = "nitro";

var engineWebKit = "webkit";
var engineNetfront = "netfront";


var manuSonyEricsson = "sonyericsson";
var manuericsson = "ericsson";
var manuSamsung1 = "sec-sgh";

var svcDocomo = "docomo";
var svcKddi = "kddi";
var svcVodafone = "vodafone";

//Due to the flexibility of the S60 OSSO Browser, 
//   you may wish to let new S60 devices get the regular pages instead.
var s60GetsMobile = true;


//Due to the flexibility of the iPhone/iPod Touch Browser, 
//   you may wish to let new S60 devices get the regular pages instead.
var iphoneIpodGetsMobile = true;


//Initialize our user agent string.
var uagent = navigator.userAgent.toLowerCase();

//**************************
// Detects if the current device is an iPhone.
function DetectIphone()
{
   if (uagent.search(deviceIphone) > -1)
   {
      //The iPod touch says it's an iPhone! So let's disambiguate.
      if (uagent.search(deviceIpod) > -1)
         return false;
      else 
         return true;
   }
   else
      return false;
}

//**************************
// Detects if the current device is an iPhone.
function DetectIPad()
{
    if (uagent.search(deviceIPad) > -1) {
	return true;       
   }
    else {
      return false;
    }
}

//**************************
// Detects if the current device is an iPod Touch.
function DetectIpod()
{
   if (uagent.search(deviceIpod) > -1)
      return true;
   else
      return false;
}

//**************************
// Detects if the current device is an iPhone or iPod Touch.
function DetectIphoneOrIpodOrIPad()
{
   //We repeat the searches here because some iPods 
   //  may report themselves as an iPhone, which is ok.
   if (uagent.search(deviceIphone) > -1 ||
       uagent.search(deviceIpod) > -1 ||
       uagent.search(deviceIPad) > -1)

       return true;
    else
       return false;
}

//**************************
// Detects if the current device is an Android OS-based device.
function DetectAndroid()
{
   if (uagent.search(deviceAndroid) > -1)
      return true;
   else
      return false;
}


//**************************
// Detects if the current device is an Android OS-based device and
//   the browser is based on WebKit.
function DetectAndroidWebKit()
{
   if (DetectAndroid())
   {
     if (DetectWebkit())
        return true;
     else
        return false;
   }
   else
      return false;
}

//**************************
// Detects if the current browser is based on WebKit.
function DetectWebkit()
{
   if (uagent.search(engineWebKit) > -1)
      return true;
   else
      return false;
}

//**************************
// Detects if the current browser is the Nokia S60 Open Source Browser.
function DetectS60OssBrowser()
{
   if (DetectWebkit())
   {
     if ((uagent.search(deviceS60) > -1 || 
          uagent.search(deviceSymbian) > -1))
        return true;
     else
        return false;
   }
   else
      return false;
}

//**************************
// Detects if the current device is any Symbian OS-based device,
//   including older S60, Series 70, Series 80, Series 90, and UIQ, 
//   or other browsers running on these devices.
function DetectSymbianOS()
{
   if (uagent.search(deviceSymbian) > -1 ||
       uagent.search(deviceS60) > -1 ||
       uagent.search(deviceS70) > -1 ||
       uagent.search(deviceS80) > -1 ||
       uagent.search(deviceS90) > -1)
      return true;
   else
      return false;
}


//**************************
// Detects if the current browser is a BlackBerry of some sort.
function DetectBlackBerry()
{
   if (uagent.search(deviceBB) > -1)
      return true;
   else
      return false;
}

//**************************
// Detects if the current browser is a Windows Mobile device.
function DetectWindowsMobile()
{
   //Most devices use 'Windows CE', but some report 'iemobile' 
   //  and some older ones report as 'PIE' for Pocket IE. 
   if (uagent.search(deviceWinMob) > -1 ||
       uagent.search(deviceIeMob) > -1 ||
       uagent.search(enginePie) > -1)
      return true;
   else
      return false;
}

//**************************
// Detects if the current browser is on a PalmOS device.
function DetectPalmOS()
{
   //Most devices nowadays report as 'Palm', 
   //  but some older ones reported as Blazer or Xiino.
   if (uagent.search(devicePalm) > -1 ||
       uagent.search(engineBlazer) > -1 ||
       uagent.search(engineXiino) > -1)
      return true;
   else
      return false;
}

//**************************
// Sets whether S60 devices running the 
//   Open Source Browser (based on WebKit)
//   should be detected as 'mobile' or not.
//   Set TRUE to be detected as mobile.
//   Set FALSE and it will not be detected as mobile.
function SetS60GetsMobile(setMobile)
{
   s60GetsMobile = setMobile;
};

//**************************
// Sets whether iPhone/iPod Touch devices running the 
//   Open Source Browser (based on WebKit)
//   should be detected as 'mobile' or not.
//   Set TRUE to be detected as mobile.
//   Set FALSE and it will not be detected as mobile.
function SetS60GetsMobile(setMobile)
{
   iphoneIpodGetsMobile = setMobile;
};


//**************************
// Check to see whether the device is a 'smartphone'.
//   You might wish to send smartphones to a more capable web page
//   than a dumbed down WAP page. 
function DetectSmartphone()
{
   //First, look for iPhone and iPod Touch.
   if (DetectIphoneOrIpodOrIPad())
      return true;

   //Now, look for S60 Open Source Browser on S60 release 3 devices.
   if (DetectS60OssBrowser())
      return true;

   //Check for other Symbian devices - older S60, UIQ, other.
   if (DetectSymbianOS())
      return true;

   //Check for Windows Mobile devices.
   if (DetectWindowsMobile())
      return true;

   //Next, look for a BlackBerry
   if (DetectBlackBerry())
      return true;

   //PalmOS.
   if (DetectPalmOS())
      return true;

   //Otherwise, return false.
   return false;
};


//**************************
// Detects if the current device is a mobile device.
//  This method catches most of the popular modern devices.
function DetectMobileQuick()
{
   //Attempt to detect most mobile devices, 
   //   especially mass market feature phones.
   // NOTE: Doesn't usually work reliably...
   if (uagent.search(deviceWap) > -1   || 
	uagent.search(deviceMidp) > -1 ||
	uagent.search(deviceWml) > -1  ||
	uagent.search(deviceBrew) > -1  )
   {
      return true;
   }

   //Detect for most smartphones.
   if (DetectSmartphone())
      return true;

   //Check for a NetFront browser
   if (uagent.search(engineNetfront) > -1)
      return true;

   //Check for a Playstation
   if (uagent.search(devicePlaystation) > -1)
      return true;

   //Check for a generic PDA
   if (uagent.search(devicePda) > -1)
      return true;

   return false;
};


//**************************
// Detects in a more comprehensive way if the current device is a mobile device.
function DetectMobileLonger()
{
   //Run the quick check first.
   if (DetectMobileQuick())
      return true;

   //Check for NTT Docomo
   if (uagent.search(svcDocomo) > -1)
      return true;

   //Check for KDDI
   if (uagent.search(svcKddi) > -1)
      return true;

   //Check for Nintendo DS
   if (uagent.search(deviceNintendoDs) > -1)
      return true;

   //Check for Vodafone 3G
   if (uagent.search(svcVodafone) > -1)
      return true;

   //Finally, detect for certain very old devices with stupid useragent strings.
   if (uagent.search(manuSamsung1) > -1 ||
	uagent.search(manuSonyEricsson) > -1 || 
	uagent.search(manuericsson) > -1)
   {
      return true;
   }

   return false;
};
