// AJAX Functions Start

var http_request = false;
function makePOSTRequest(url, parameters) {
	http_request = false;

	if (window.XMLHttpRequest)
	{ // Mozilla, Safari,...
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType)
		{
			// set type accordingly to anticipated content type
			//http_request.overrideMimeType('text/xml');
			http_request.overrideMimeType('text/html');
		}
	}
	
	else if (window.ActiveXObject)
	{ // IE
		try
		{
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			try
			{
				http_request = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e)
			{}
		}
	}
	if (!http_request)
	{
		//alert('Cannot create XMLHTTP instance');
		return false;
	}

	http_request.onreadystatechange = alertContents;
	http_request.open('POST', url, true);
	http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http_request.setRequestHeader("Content-length", parameters.length);
	http_request.setRequestHeader("Connection", "close");
	http_request.send(parameters);
	
}

function alertContents()
{
	if (http_request.readyState == 4)
	{

		if (http_request.status == 200)
		{
			//alert(http_request.responseText);
			result = http_request.responseText;
			//document.getElementById('myspan').innerHTML = result;            
		}
		else
		{
			//alert('There was a problem with the request.');
		}
	}
}

// User Activity Parameters Start

var FlashDetect = new function(){
	var self = this;
	self.installed = false;
	self.major = -1;
	self.minor = -1;
	self.revision = -1;
	self.revisionStr = "";
	self.activeXVersion = "";
	var activeXDetectRules = [
		{
			"name":"ShockwaveFlash.ShockwaveFlash.7",
			"version":function(obj){
				return getActiveXVersion(obj);
			}
		},
		{
			"name":"ShockwaveFlash.ShockwaveFlash.6",
			"version":function(obj){
				var version = "6,0,21";
				try{
					obj.AllowScriptAccess = "always";
					version = getActiveXVersion(obj);
				}catch(err){}
				return version;
			}
		},
		{
			"name":"ShockwaveFlash.ShockwaveFlash",
			"version":function(obj){
				return getActiveXVersion(obj);
			}
		}
	];
	var getActiveXVersion = function(activeXObj){
		var version = -1;
		try{
			version = activeXObj.GetVariable("$version");
		}catch(err){}
		return version;
	};
	var getActiveXObject = function(name){
		var obj = -1;
		try{
			obj = new ActiveXObject(name);
		}catch(err){}
		return obj;
	};
	var parseActiveXVersion = function(str){
		var versionArray = str.split(",");//replace with regex
		return {
			"major":parseInt(versionArray[0].split(" ")[1], 10),
			"minor":parseInt(versionArray[1], 10),
			"revision":parseInt(versionArray[2], 10),
			"revisionStr":versionArray[2]
		};
	};
	var parseRevisionStrToInt = function(str){
		return parseInt(str.replace(/[a-zA-Z]/g, ""), 10) || self.revision;
	};
	self.majorAtLeast = function(version){
		return self.major >= version;
	};
	self.FlashDetect = function(){
		if(navigator.plugins && navigator.plugins.length>0){
			var type = 'application/x-shockwave-flash';
			var mimeTypes = navigator.mimeTypes;
			if(mimeTypes && mimeTypes[type] && mimeTypes[type].enabledPlugin && mimeTypes[type].enabledPlugin.description){
				var desc = mimeTypes[type].enabledPlugin.description;
				var descParts = desc.split(' ');//replace with regex
				var majorMinor = descParts[2].split('.');
				self.major = parseInt(majorMinor[0], 10);
				self.minor = parseInt(majorMinor[1], 10); 
				self.revisionStr = descParts[3];
				self.revision = parseRevisionStrToInt(self.revisionStr);
				self.installed = true;
			}
		}else if(navigator.appVersion.indexOf("Mac")==-1 && window.execScript){
			var version = -1;
			for(var i=0; i<activeXDetectRules.length && version==-1; i++){
				var obj = getActiveXObject(activeXDetectRules[i].name);
				if(typeof obj == "object"){
					self.installed = true;
					version = activeXDetectRules[i].version(obj);
					if(version!=-1){
						var versionObj = parseActiveXVersion(version);
						self.major = versionObj.major;
						self.minor = versionObj.minor; 
						self.revision = versionObj.revision;
						self.revisionStr = versionObj.revisionStr;
						self.activeXVersion = version;
					}
				}
			}
		}
	}();
};
FlashDetect.release = "1.0.2";

var userActivityFlashPlayer = FlashDetect.installed;
var userActivityFlashPlayerVersion = FlashDetect.major + "." + FlashDetect.minor;
var userActivityURL = document.URL.replace(/&/g, "*am*");
var userActivityReferringURL = document.referrer.replace(/&/g, "*am*");
var userActivityScreenResolution = screen.width + "X" + screen.height;
var userActivityScreenColorDepth = screen.colorDepth;
var userActivityJavaScriptEnabled = navigator.javaEnabled();
var userActivityOperatingSystem = navigator.platform;

var postParameters = "userActivityFlashPlayer=" + encodeURI(userActivityFlashPlayer);
postParameters = postParameters + "&userActivityFlashPlayerVersion=" + encodeURI(userActivityFlashPlayerVersion);
postParameters = postParameters + "&userActivityURL=" + encodeURI(userActivityURL);
postParameters = postParameters + "&userActivityReferringURL=" + encodeURI(userActivityReferringURL);
postParameters = postParameters + "&userActivityScreenResolution=" + encodeURI(userActivityScreenResolution);
postParameters = postParameters + "&userActivityScreenColorDepth=" + encodeURI(userActivityScreenColorDepth);
postParameters = postParameters + "&userActivityJavaScriptEnabled=" + encodeURI(userActivityJavaScriptEnabled);
postParameters = postParameters + "&userActivityOperatingSystem=" + encodeURI(userActivityOperatingSystem);

makePOSTRequest("/activitySettings.cfm",postParameters);