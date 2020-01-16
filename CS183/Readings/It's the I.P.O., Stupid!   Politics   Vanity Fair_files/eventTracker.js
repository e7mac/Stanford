// This is the definition for a collection of JavaScript objects
function EventList(divId) {
    this.divId = divId;
    this.maxURLLength = 2000;
    this.cacheBusterLength = 20;
    this.baseUrl = "/";
    this.imageUrl = "images/event.gif";
    this.jsUrl = "js/event.js";
    this.eventList = new Array();

    this.addEvent = function (event) {
        this.eventList.push(event);
    };

    this.setBaseUrl = function (baseUrl) {
        this.baseUrl = baseUrl;
    };

    this.setImageUrl = function (imageUrl) {
        this.imageUrl = imageUrl;
    };

    this.setJsUrl = function (jsUrl) {
        this.jsUrl = jsUrl;
    };

    this.writeImageTags = function () {
        this.clearOldTags();
        this.writeTags(this.imageUrl, this.writeIndividualImageTag);
    };

    this.writeJavaScriptTags = function () {
        this.clearOldTags();
        this.writeTags(this.jsUrl, this.writeIndividualJavaScriptTag);
    };

    this.clearOldTags = function () {
        var eventTagHolder = document.getElementById(divId);
        while (eventTagHolder.firstChild) {
            eventTagHolder.removeChild(eventTagHolder.firstChild);
        }
    };

    this.writeTags = function (tagUrl, tagFunc) {
        if (this.eventList.length == 0) {
            return;
        }
        var fullUrl = this.baseUrl + tagUrl + "?" + this.eventList[0].getQueryString("e0_");
        for (var i = 1; i < this.eventList.length; ++i) {
            var eventQueryString = this.eventList[i].getQueryString("e" + i + "_");
            var tmpFullUrl = fullUrl + eventQueryString;
            if (tmpFullUrl.length + this.cacheBusterLength < this.maxURLLength) {
                // Tack it on to the current url
                fullUrl = tmpFullUrl;
            } else {
                // Overflow.  Write out what we have and start a new URL.
                tagFunc(fullUrl);
                fullUrl = this.baseUrl + tagUrl + "?" + eventQueryString;
            }
        }
        // Flush whatever we have
        tagFunc(fullUrl);
    };

    this.writeIndividualImageTag = function (url) {
        if (url.length + this.cacheBusterLength > this.maxURLLength) {
            throw ("URL for event is longer than max URL length of " + this.maxURLLength);
        }
        url = url + "rnd=" + Math.random() * 10000000000000000; // Append a cache buster
        var node = document.createElement("img");
        node.src = url;
        document.getElementById(divId).appendChild(node);
    };

    this.writeIndividualJavaScriptTag = function (url) {
        if (url.length + this.cacheBusterLength > this.maxURLLength) {
            throw ("URL for event is longer than max URL length of " + this.maxURLLength);
        }
        url = url + "rnd=" + Math.random() * 10000000000000000; // Append a cache buster
        var node = document.createElement("script");
        node.type = "text/javascript";
        node.src = url;
        document.getElementById(divId).appendChild(node);
    };
}

// This is the definition for a JavaScript object to capture events.
// The three globally required parameters -- site code, event code, and content id -- are included.
function EventObject(siteCode, eventCode) {
    // prototype.js keeps you from using Array() as a hash.  Use Object for associative arrays.
    this.properties = new Object();
    this.properties["sc"] = siteCode;
    this.properties["ec"] = eventCode;

    // Generic set property function (can also be used to add properties beyond the standard set)
    this.setProperty = function (name, value) {
        this.properties[name] = value;
    };

    // Generic get property function
    this.getProperty = function (name) {
        return this.properties[name];
    };

    // Set environment
    this.setEnvironment = function (environment) {
        this.setProperty("env", environment);
    };

    // Set action code
    this.setActionCode = function (actionCode) {
        this.setProperty("ac", actionCode);
    };

    // Set content id (most viewed)
    this.setContentId = function (contentId) {
        this.properties["id"] = contentId;
    };

    // Set content type (most viewed)
    this.setContentType = function (contentType) {
        this.setProperty("ct", contentType);
    };

    // Set full URL (most viewed)
    this.setFullUrl = function (fullUrl) {
        this.setProperty("url", fullUrl);
    };

    // Set content title (most viewed)
    this.setContentTitle = function (contentTitle) {
        this.setProperty("tit", contentTitle);
    };

    // Set location (brides affiliate)
    this.setLocation = function (location) {
        this.setProperty("loc", location);
    };

    // Set search results count (brides affiliate)
    this.setSearchResultCount = function (searchResultCount) {
        this.setProperty("rc", searchResultCount);
    };

    // Set asset ID (flip affiliate)
    this.setAssetId = function (assetId) {
        this.setProperty("asid", assetId);
    };

    // Set application ID (application tracking)
    this.setApplicationId = function (applicationId) {
        this.setProperty("apid", applicationId);
    };

    // Set image url (for Sidekick and Lucky stickers)
    this.setImgUrl = function (imgUrl) {
        this.setProperty("imgurl", imgUrl);
    };
    // Set tags (for Sidekick)
    this.setEvTags = function (evTags) {
        this.setProperty("etags", evTags);
    };

    // Override user ID (overrides whatever is set by the amg user cookie
    this.overrideUserId = function (userId) {
        this.setProperty("uid", userId);
    };

    // Returns a query string containing all of the properties of the event
    this.getQueryString = function (paramPrefix) {
        var queryString = "";
        for (var p in this.properties) {
            queryString += paramPrefix + p + "=" + encodeURIComponent(this.getProperty(p)) + "&";
        }
        return queryString;
    };
}
