/*
 * Copyright (C) 2012 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @constructor
 * @extends {WebInspector.Panel}
 */
WebInspector.AuditsPanel = function()
{
    WebInspector.Panel.call(this, "audits");
    this.registerRequiredCSS("panelEnablerView.css");
    this.registerRequiredCSS("auditsPanel.css");

    this.createSplitViewWithSidebarTree();
    this.auditsTreeElement = new WebInspector.SidebarSectionTreeElement("", {}, true);
    this.sidebarTree.appendChild(this.auditsTreeElement);
    this.auditsTreeElement.listItemElement.addStyleClass("hidden");

    this.auditsItemTreeElement = new WebInspector.AuditsSidebarTreeElement(this);
    this.auditsTreeElement.appendChild(this.auditsItemTreeElement);

    this.auditResultsTreeElement = new WebInspector.SidebarSectionTreeElement(WebInspector.UIString("RESULTS"), {}, true);
    this.sidebarTree.appendChild(this.auditResultsTreeElement);
    this.auditResultsTreeElement.expand();

    this.clearResultsButton = new WebInspector.StatusBarButton(WebInspector.UIString("Clear audit results."), "clear-status-bar-item");
    this.clearResultsButton.addEventListener("click", this._clearButtonClicked, this);

    this.viewsContainerElement = this.splitView.mainElement;

    this._constructCategories();

    this._launcherView = new WebInspector.AuditLauncherView(this.initiateAudit.bind(this), this.terminateAudit.bind(this));
    for (var id in this.categoriesById)
        this._launcherView.addCategory(this.categoriesById[id]);

    WebInspector.resourceTreeModel.addEventListener(WebInspector.ResourceTreeModel.EventTypes.OnLoad, this._didMainResourceLoad, this);
}

WebInspector.AuditsPanel.prototype = {
    get statusBarItems()
    {
        return [this.clearResultsButton.element];
    },

    get categoriesById()
    {
        return this._auditCategoriesById;
    },

    addCategory: function(category)
    {
        this.categoriesById[category.id] = category;
        this._launcherView.addCategory(category);
    },

    getCategory: function(id)
    {
        return this.categoriesById[id];
    },

    _constructCategories: function()
    {
        this._auditCategoriesById = {};
        for (var categoryCtorID in WebInspector.AuditCategories) {
            var auditCategory = new WebInspector.AuditCategories[categoryCtorID]();
            auditCategory._id = categoryCtorID;
            this.categoriesById[categoryCtorID] = auditCategory;
        }
    },

    _executeAudit: function(categories, resultCallback)
    {
        var requests = WebInspector.networkLog.requests;

        var rulesRemaining = 0;
        for (var i = 0; i < categories.length; ++i)
            rulesRemaining += categories[i].ruleCount;

        this._progressMonitor.setTotalWork(rulesRemaining);

        var results = [];
        var mainResourceURL = WebInspector.inspectedPageURL;

        function ruleResultReadyCallback(categoryResult, ruleResult)
        {
            if (this._progressMonitor.canceled)
                return;

            if (ruleResult && ruleResult.children)
                categoryResult.addRuleResult(ruleResult);

            --rulesRemaining;
            this._progressMonitor.worked(1);

            if (this._progressMonitor.done() && resultCallback)
                resultCallback(mainResourceURL, results);
        }

        if (this._progressMonitor.done()) {
            resultCallback(mainResourceURL, results);
            return;
        }

        for (var i = 0; i < categories.length; ++i) {
            var category = categories[i];
            var result = new WebInspector.AuditCategoryResult(category);
            results.push(result);
            category.run(requests, ruleResultReadyCallback.bind(this, result), this._progressMonitor);
        }
    },

    _auditFinishedCallback: function(launcherCallback, mainResourceURL, results)
    {
        var children = this.auditResultsTreeElement.children;
        var ordinal = 1;
        for (var i = 0; i < children.length; ++i) {
            if (children[i].mainResourceURL === mainResourceURL)
                ordinal++;
        }

        var resultTreeElement = new WebInspector.AuditResultSidebarTreeElement(this, results, mainResourceURL, ordinal);
        this.auditResultsTreeElement.appendChild(resultTreeElement);
        resultTreeElement.revealAndSelect();
        if (!this._progressMonitor.canceled && launcherCallback)
            launcherCallback();
    },

    initiateAudit: function(categoryIds, progressElement, runImmediately, launcherCallback)
    {
        if (!categoryIds || !categoryIds.length)
            return;

        this._progressMonitor = new WebInspector.AuditProgressMonitor(progressElement);

        var categories = [];
        for (var i = 0; i < categoryIds.length; ++i)
            categories.push(this.categoriesById[categoryIds[i]]);

        function initiateAuditCallback(categories, launcherCallback)
        {
            this._executeAudit(categories, this._auditFinishedCallback.bind(this, launcherCallback));
        }

        if (runImmediately)
            initiateAuditCallback.call(this, categories, launcherCallback);
        else
            this._reloadResources(initiateAuditCallback.bind(this, categories, launcherCallback));

        WebInspector.userMetrics.AuditsStarted.record();
    },

    terminateAudit: function(launcherCallback)
    {
        this._progressMonitor.canceled = true;
        launcherCallback();
    },

    _reloadResources: function(callback)
    {
        this._pageReloadCallback = callback;
        PageAgent.reload(false);
    },

    _didMainResourceLoad: function()
    {
        if (this._pageReloadCallback) {
            var callback = this._pageReloadCallback;
            delete this._pageReloadCallback;
            callback();
        }
    },

    showResults: function(categoryResults)
    {
        if (!categoryResults._resultView)
            categoryResults._resultView = new WebInspector.AuditResultView(categoryResults);

        this.visibleView = categoryResults._resultView;
    },

    showLauncherView: function()
    {
        this.visibleView = this._launcherView;
    },

    get visibleView()
    {
        return this._visibleView;
    },

    set visibleView(x)
    {
        if (this._visibleView === x)
            return;

        if (this._visibleView)
            this._visibleView.detach();

        this._visibleView = x;

        if (x)
            x.show(this.viewsContainerElement);
    },

    wasShown: function()
    {
        WebInspector.Panel.prototype.wasShown.call(this);
        if (!this._visibleView)
            this.auditsItemTreeElement.select();
    },

    _clearButtonClicked: function()
    {
        this.auditsItemTreeElement.revealAndSelect();
        this.auditResultsTreeElement.removeChildren();
    }
}

WebInspector.AuditsPanel.prototype.__proto__ = WebInspector.Panel.prototype;

/**
 * @constructor
 */
WebInspector.AuditCategory = function(displayName)
{
    this._displayName = displayName;
    this._rules = [];
}

WebInspector.AuditCategory.prototype = {
    get id()
    {
        // this._id value is injected at construction time.
        return this._id;
    },

    get displayName()
    {
        return this._displayName;
    },

    get ruleCount()
    {
        this._ensureInitialized();
        return this._rules.length;
    },

    addRule: function(rule, severity)
    {
        rule.severity = severity;
        this._rules.push(rule);
    },

    /**
     * @param {Array.<WebInspector.NetworkRequest>} requests
     */
    run: function(requests, callback, progressMonitor)
    {
        this._ensureInitialized();
        for (var i = 0; i < this._rules.length; ++i)
            this._rules[i].run(requests, callback, progressMonitor);
    },

    _ensureInitialized: function()
    {
        if (!this._initialized) {
            if ("initialize" in this)
                this.initialize();
            this._initialized = true;
        }
    }
}

/**
 * @constructor
 */
WebInspector.AuditRule = function(id, displayName)
{
    this._id = id;
    this._displayName = displayName;
}

WebInspector.AuditRule.Severity = {
    Info: "info",
    Warning: "warning",
    Severe: "severe"
}

WebInspector.AuditRule.SeverityOrder = {
    "info": 3,
    "warning": 2,
    "severe": 1
}

WebInspector.AuditRule.prototype = {
    get id()
    {
        return this._id;
    },

    get displayName()
    {
        return this._displayName;
    },

    set severity(severity)
    {
        this._severity = severity;
    },

    /**
     * @param {Array.<WebInspector.NetworkRequest>} requests
     */
    run: function(requests, callback, progressMonitor)
    {
        if (progressMonitor.canceled)
            return;

        var result = new WebInspector.AuditRuleResult(this.displayName);
        result.severity = this._severity;
        this.doRun(requests, result, callback, progressMonitor);
    },

    /**
     * @param {Array.<WebInspector.NetworkRequest>} requests
     */
    doRun: function(requests, result, callback, progressMonitor)
    {
        throw new Error("doRun() not implemented");
    }
}

/**
 * @constructor
 */
WebInspector.AuditCategoryResult = function(category)
{
    this.title = category.displayName;
    this.ruleResults = [];
}

WebInspector.AuditCategoryResult.prototype = {
    addRuleResult: function(ruleResult)
    {
        this.ruleResults.push(ruleResult);
    }
}

/**
 * @constructor
 * @param {boolean=} expanded
 * @param {string=} className
 */
WebInspector.AuditRuleResult = function(value, expanded, className)
{
    this.value = value;
    this.className = className;
    this.expanded = expanded;
    this.violationCount = 0;
    this._formatters = {
        r: WebInspector.AuditRuleResult.linkifyDisplayName
    };
    var standardFormatters = Object.keys(String.standardFormatters);
    for (var i = 0; i < standardFormatters.length; ++i)
        this._formatters[standardFormatters[i]] = String.standardFormatters[standardFormatters[i]];
}

WebInspector.AuditRuleResult.linkifyDisplayName = function(url)
{
    return WebInspector.linkifyURLAsNode(url, WebInspector.displayNameForURL(url));
}

WebInspector.AuditRuleResult.resourceDomain = function(domain)
{
    return domain || WebInspector.UIString("[empty domain]");
}

WebInspector.AuditRuleResult.prototype = {
    /**
     * @param {boolean=} expanded
     * @param {string=} className
     */
    addChild: function(value, expanded, className)
    {
        if (!this.children)
            this.children = [];
        var entry = new WebInspector.AuditRuleResult(value, expanded, className);
        this.children.push(entry);
        return entry;
    },

    addURL: function(url)
    {
        return this.addChild(WebInspector.AuditRuleResult.linkifyDisplayName(url));
    },

    addURLs: function(urls)
    {
        for (var i = 0; i < urls.length; ++i)
            this.addURL(urls[i]);
    },

    addSnippet: function(snippet)
    {
        return this.addChild(snippet, false, "source-code");
    },

    /**
     * @param {string} format
     * @param {...*} vararg
     */
    addFormatted: function(format, vararg)
    {
        var substitutions = Array.prototype.slice.call(arguments, 1);
        var fragment = document.createDocumentFragment();

        var formattedResult = String.format(format, substitutions, this._formatters, fragment, this._append).formattedResult;
        if (formattedResult instanceof Node)
            formattedResult.normalize();
        return this.addChild(formattedResult);
    },

    _append: function(a, b)
    {
        if (!(b instanceof Node))
            b = document.createTextNode(b);
        a.appendChild(b);
        return a;
    }
}

/**
 * @constructor
 * @param {Element} progressElement
 */
WebInspector.AuditProgressMonitor = function(progressElement)
{
    this._element = progressElement;
    this.setTotalWork(WebInspector.AuditProgressMonitor.INDETERMINATE);
}

WebInspector.AuditProgressMonitor.INDETERMINATE = -1;

WebInspector.AuditProgressMonitor.prototype = {
    setTotalWork: function(total)
    {
        if (this.canceled || this._total === total)
            return;
        this._total = total;
        this._value = 0;
        this._element.max = total;
        if (total === WebInspector.AuditProgressMonitor.INDETERMINATE)
            this._element.removeAttribute("value");
        else
            this._element.value = 0;
    },

    worked: function(items)
    {
        if (this.canceled || this.indeterminate || this.done())
            return;
        this._value += items;
        if (this._value > this._total)
            this._value = this._total;
        this._element.value = this._value;
    },

    get indeterminate()
    {
        return this._total === WebInspector.AuditProgressMonitor.INDETERMINATE;
    },

    done: function()
    {
        return !this.indeterminate && (this.canceled || this._value === this._total);
    },

    get canceled()
    {
        return !!this._canceled;
    },

    set canceled(x)
    {
        if (this._canceled === x)
            return;
        if (x)
            this.setTotalWork(WebInspector.AuditProgressMonitor.INDETERMINATE);
        this._canceled = x;
    }
}

/**
 * @constructor
 * @extends {WebInspector.SidebarTreeElement}
 * @param {WebInspector.AuditsPanel} panel
 */
WebInspector.AuditsSidebarTreeElement = function(panel)
{
    this._panel = panel;
    this.small = false;
    WebInspector.SidebarTreeElement.call(this, "audits-sidebar-tree-item", WebInspector.UIString("Audits"), "", null, false);
}

WebInspector.AuditsSidebarTreeElement.prototype = {
    onattach: function()
    {
        WebInspector.SidebarTreeElement.prototype.onattach.call(this);
    },

    onselect: function()
    {
        this._panel.showLauncherView();
    },

    get selectable()
    {
        return true;
    },

    refresh: function()
    {
        this.refreshTitles();
    }
}

WebInspector.AuditsSidebarTreeElement.prototype.__proto__ = WebInspector.SidebarTreeElement.prototype;

/**
 * @constructor
 * @extends {WebInspector.SidebarTreeElement}
 * @param {WebInspector.AuditsPanel} panel
 */
WebInspector.AuditResultSidebarTreeElement = function(panel, results, mainResourceURL, ordinal)
{
    this._panel = panel;
    this.results = results;
    this.mainResourceURL = mainResourceURL;
    WebInspector.SidebarTreeElement.call(this, "audit-result-sidebar-tree-item", String.sprintf("%s (%d)", mainResourceURL, ordinal), "", {}, false);
}

WebInspector.AuditResultSidebarTreeElement.prototype = {
    onselect: function()
    {
        this._panel.showResults(this.results);
    },

    get selectable()
    {
        return true;
    }
}

WebInspector.AuditResultSidebarTreeElement.prototype.__proto__ = WebInspector.SidebarTreeElement.prototype;

// Contributed audit rules should go into this namespace.
WebInspector.AuditRules = {};

// Contributed audit categories should go into this namespace.
WebInspector.AuditCategories = {};

/*
 * Copyright (C) 2010 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @constructor
 * @extends {WebInspector.AuditCategory}
 */
WebInspector.AuditCategories.PagePerformance = function() {
    WebInspector.AuditCategory.call(this, WebInspector.AuditCategories.PagePerformance.AuditCategoryName);
}

WebInspector.AuditCategories.PagePerformance.AuditCategoryName = "Web Page Performance";

WebInspector.AuditCategories.PagePerformance.prototype = {
    initialize: function()
    {
        this.addRule(new WebInspector.AuditRules.UnusedCssRule(), WebInspector.AuditRule.Severity.Warning);
        this.addRule(new WebInspector.AuditRules.CssInHeadRule(), WebInspector.AuditRule.Severity.Severe);
        this.addRule(new WebInspector.AuditRules.StylesScriptsOrderRule(), WebInspector.AuditRule.Severity.Severe);
        this.addRule(new WebInspector.AuditRules.VendorPrefixedCSSProperties(), WebInspector.AuditRule.Severity.Warning);
    }
}

WebInspector.AuditCategories.PagePerformance.prototype.__proto__ = WebInspector.AuditCategory.prototype;

/**
 * @constructor
 * @extends {WebInspector.AuditCategory}
 */
WebInspector.AuditCategories.NetworkUtilization = function() {
    WebInspector.AuditCategory.call(this, WebInspector.AuditCategories.NetworkUtilization.AuditCategoryName);
}

WebInspector.AuditCategories.NetworkUtilization.AuditCategoryName = "Network Utilization";

WebInspector.AuditCategories.NetworkUtilization.prototype = {
    initialize: function()
    {
        this.addRule(new WebInspector.AuditRules.GzipRule(), WebInspector.AuditRule.Severity.Severe);
        this.addRule(new WebInspector.AuditRules.ImageDimensionsRule(), WebInspector.AuditRule.Severity.Warning);
        this.addRule(new WebInspector.AuditRules.CookieSizeRule(400), WebInspector.AuditRule.Severity.Warning);
        this.addRule(new WebInspector.AuditRules.StaticCookielessRule(5), WebInspector.AuditRule.Severity.Warning);
        this.addRule(new WebInspector.AuditRules.CombineJsResourcesRule(2), WebInspector.AuditRule.Severity.Severe);
        this.addRule(new WebInspector.AuditRules.CombineCssResourcesRule(2), WebInspector.AuditRule.Severity.Severe);
        this.addRule(new WebInspector.AuditRules.MinimizeDnsLookupsRule(4), WebInspector.AuditRule.Severity.Warning);
        this.addRule(new WebInspector.AuditRules.ParallelizeDownloadRule(4, 10, 0.5), WebInspector.AuditRule.Severity.Warning);
        this.addRule(new WebInspector.AuditRules.BrowserCacheControlRule(), WebInspector.AuditRule.Severity.Severe);
        this.addRule(new WebInspector.AuditRules.ProxyCacheControlRule(), WebInspector.AuditRule.Severity.Warning);
    }
}

WebInspector.AuditCategories.NetworkUtilization.prototype.__proto__ = WebInspector.AuditCategory.prototype;
;
/*
 * Copyright (C) 2012 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @constructor
 */
WebInspector.AuditFormatters = function()
{
}

WebInspector.AuditFormatters.Registry = {
    text: function(text)
    {
        return document.createTextNode(text);
    },

    snippet: function(snippetText)
    {
        var div = document.createElement("div");
        div.textContent = snippetText;
        div.className = "source-code";
        return div;
    },

    concat: function()
    {
        var parent = document.createElement("span");
        for (var arg = 0; arg < arguments.length; ++arg)
            parent.appendChild(WebInspector.auditFormatters.apply(arguments[arg]));
        return parent;
    },

    url: function(url, displayText, allowExternalNavigation)
    {
        var a = document.createElement("a");
        a.href = url;
        a.title = url;
        a.textContent = displayText || url;
        if (allowExternalNavigation)
            a.target = "_blank";
        return a;
    },

    resourceLink: function(url, line)
    {
        // FIXME: use WebInspector.Linkifier
        return WebInspector.linkifyResourceAsNode(url, line, "console-message-url webkit-html-resource-link");
    }
};

WebInspector.AuditFormatters.prototype = {
    /**
     * @param {string|boolean|number|Object} value
     */
    apply: function(value)
    {
        var formatter;
        var type = typeof value;
        var args;

        switch (type) {
        case "string":
        case "boolean":
        case "number":
            formatter = WebInspector.AuditFormatters.Registry.text;
        args = [ value.toString() ];
        break;

        case "object":
            if (value instanceof Node)
                return value;
            if (value instanceof Array) {
                formatter = WebInspector.AuditFormatters.Registry.concat;
                args = value;
            } else if (value.type && value.arguments) {
                formatter = WebInspector.AuditFormatters.Registry[value.type];
                args = value.arguments;
            }
        }
        if (!formatter)
            throw "Invalid value or formatter: " + type + JSON.stringify(value);

        return formatter.apply(null, args);
    },

    /**
     * @param {Object} formatters
     * @param {Object} thisArgument
     * @param {string|boolean|number|Object} value
     */
    partiallyApply: function(formatters, thisArgument, value)
    {
        if (value instanceof Array)
            return value.map(this.partiallyApply.bind(this, formatters, thisArgument));
        if (typeof value === "object" && typeof formatters[value.type] === "function" && value.arguments)
            return formatters[value.type].apply(thisArgument, value.arguments);
        return value;
    }
}

WebInspector.auditFormatters = new WebInspector.AuditFormatters();
;
/*
 * Copyright (C) 2011 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @constructor
 * @extends {WebInspector.View}
 */
WebInspector.AuditLauncherView = function(runnerCallback, stopCallback)
{
    WebInspector.View.call(this);

    this._runnerCallback = runnerCallback;
    this._stopCallback = stopCallback;
    this._categoryIdPrefix = "audit-category-item-";
    this._auditRunning = false;

    this.element.addStyleClass("audit-launcher-view");
    this.element.addStyleClass("panel-enabler-view");

    this._contentElement = document.createElement("div");
    this._contentElement.className = "audit-launcher-view-content";
    this.element.appendChild(this._contentElement);
    this._boundCategoryClickListener = this._categoryClicked.bind(this);

    this._resetResourceCount();

    this._sortedCategories = [];

    this._headerElement = document.createElement("h1");
    this._headerElement.className = "no-audits";
    this._headerElement.textContent = WebInspector.UIString("No audits to run");
    this._contentElement.appendChild(this._headerElement);

    WebInspector.networkManager.addEventListener(WebInspector.NetworkManager.EventTypes.RequestStarted, this._onRequestStarted, this);
    WebInspector.networkManager.addEventListener(WebInspector.NetworkManager.EventTypes.RequestFinished, this._onRequestFinished, this);
}

WebInspector.AuditLauncherView.prototype = {
    _resetResourceCount: function()
    {
        this._loadedResources = 0;
        this._totalResources = 0;
    },

    _onRequestStarted: function(event)
    {
        var request = /** @type {WebInspector.NetworkRequest} */ event.data;
        // Ignore long-living WebSockets for the sake of progress indicator, as we won't be waiting them anyway.
        if (request.type === WebInspector.resourceTypes.WebSocket)
            return;
        ++this._totalResources;
        this._updateResourceProgress();
    },

    _onRequestFinished: function(event)
    {
        var request = /** @type {WebInspector.NetworkRequest} */ event.data;
        // See resorceStarted for details.
        if (request.type === WebInspector.resourceTypes.WebSocket)
            return;
        ++this._loadedResources;
        this._updateResourceProgress();
    },

    addCategory: function(category)
    {
        if (!this._sortedCategories.length)
            this._createLauncherUI();

        var categoryElement = this._createCategoryElement(category.displayName, category.id);
        category._checkboxElement = categoryElement.firstChild;
        if (this._selectAllCheckboxElement.checked) {
            category._checkboxElement.checked = true;
            ++this._currentCategoriesCount;
        }

        function compareCategories(a, b)
        {
            var aTitle = a.displayName || "";
            var bTitle = b.displayName || "";
            return aTitle.localeCompare(bTitle);
        }
        var insertBefore = insertionIndexForObjectInListSortedByFunction(category, this._sortedCategories, compareCategories);
        this._categoriesElement.insertBefore(categoryElement, this._categoriesElement.children[insertBefore]);
        this._sortedCategories.splice(insertBefore, 0, category);
        this._updateButton();
    },

    _setAuditRunning: function(auditRunning)
    {
        if (this._auditRunning === auditRunning)
            return;
        this._auditRunning = auditRunning;
        delete this._stopRequested;
        this._updateButton();
        this._updateResourceProgress();
    },

    _launchButtonClicked: function(event)
    {
        if (!this._auditRunning) {
            var catIds = [];
            for (var category = 0; category < this._sortedCategories.length; ++category) {
                if (this._sortedCategories[category]._checkboxElement.checked)
                    catIds.push(this._sortedCategories[category].id);
            }

            this._setAuditRunning(true);
            this._runnerCallback(catIds, this._resourceProgressElement, this._auditPresentStateElement.checked, this._setAuditRunning.bind(this, false));
        } else {
            this._stopRequested = true;
            this._stopCallback(this._setAuditRunning.bind(this, false));
            this._updateButton();
        }
    },

    _selectAllClicked: function(checkCategories)
    {
        var childNodes = this._categoriesElement.childNodes;
        for (var i = 0, length = childNodes.length; i < length; ++i)
            childNodes[i].firstChild.checked = checkCategories;
        this._currentCategoriesCount = checkCategories ? this._sortedCategories.length : 0;
        this._updateButton();
    },

    _categoryClicked: function(event)
    {
        this._currentCategoriesCount += event.target.checked ? 1 : -1;
        this._selectAllCheckboxElement.checked = this._currentCategoriesCount === this._sortedCategories.length;
        this._updateButton();
    },

    _createCategoryElement: function(title, id)
    {
        var labelElement = document.createElement("label");
        labelElement.id = this._categoryIdPrefix + id;

        var element = document.createElement("input");
        element.type = "checkbox";
        if (id !== "")
            element.addEventListener("click", this._boundCategoryClickListener, false);
        labelElement.appendChild(element);
        labelElement.appendChild(document.createTextNode(title));

        return labelElement;
    },

    _createLauncherUI: function()
    {
        this._headerElement = document.createElement("h1");
        this._headerElement.textContent = WebInspector.UIString("Select audits to run");

        for (var child = 0; child < this._contentElement.children.length; ++child)
            this._contentElement.removeChild(this._contentElement.children[child]);

        this._contentElement.appendChild(this._headerElement);

        function handleSelectAllClick(event)
        {
            this._selectAllClicked(event.target.checked);
        }
        var categoryElement = this._createCategoryElement(WebInspector.UIString("Select All"), "");
        categoryElement.id = "audit-launcher-selectall";
        this._selectAllCheckboxElement = categoryElement.firstChild;
        this._selectAllCheckboxElement.checked = true;
        this._selectAllCheckboxElement.addEventListener("click", handleSelectAllClick.bind(this), false);
        this._contentElement.appendChild(categoryElement);

        this._categoriesElement = this._contentElement.createChild("div", "audit-categories-container");
        this._currentCategoriesCount = 0;

        this._contentElement.createChild("div", "flexible-space");

        this._buttonContainerElement = this._contentElement.createChild("div", "button-container");

        var labelElement = this._buttonContainerElement.createChild("label");
        this._auditPresentStateElement = labelElement.createChild("input");
        this._auditPresentStateElement.name = "audit-mode";
        this._auditPresentStateElement.type = "radio";
        this._auditPresentStateElement.checked = true;
        this._auditPresentStateLabelElement = document.createTextNode(WebInspector.UIString("Audit Present State"));
        labelElement.appendChild(this._auditPresentStateLabelElement);

        labelElement = this._buttonContainerElement.createChild("label");
        this.auditReloadedStateElement = labelElement.createChild("input");
        this.auditReloadedStateElement.name = "audit-mode";
        this.auditReloadedStateElement.type = "radio";
        labelElement.appendChild(document.createTextNode("Reload Page and Audit on Load"));

        this._launchButton = this._buttonContainerElement.createChild("button");
        this._launchButton.textContent = WebInspector.UIString("Run");
        this._launchButton.addEventListener("click", this._launchButtonClicked.bind(this), false);

        this._resourceProgressContainer = this._buttonContainerElement.createChild("span", "resource-progress");
        this._resourceProgressElement = this._resourceProgressContainer.createChild("progress");
        this._resourceProgressContainer.appendChild(document.createTextNode(" "));
        this._resourceProgressTextElement = this._resourceProgressContainer.createChild("span");


        this._selectAllClicked(this._selectAllCheckboxElement.checked);
        this._updateButton();
        this._updateResourceProgress();
    },

    _updateResourceProgress: function()
    {
        if (!this._resourceProgressContainer)
            return;

        if (!this._auditRunning || this._stopRequested) {
            this._resetResourceCount();
            this._resourceProgressContainer.addStyleClass("hidden");
        } else
            this._resourceProgressContainer.removeStyleClass("hidden");
        if (this._loadedResources)
            this._resourceProgressTextElement.textContent = WebInspector.UIString("Loading (%d of %d)", this._loadedResources, this._totalResources);
        else
            this._resourceProgressTextElement.textContent = "";
    },

    _updateButton: function()
    {
        this._launchButton.textContent = this._auditRunning ? WebInspector.UIString("Stop") : WebInspector.UIString("Run");
        this._launchButton.disabled = !this._currentCategoriesCount || (this._auditRunning && this._stopRequested);
    }
}

WebInspector.AuditLauncherView.prototype.__proto__ = WebInspector.View.prototype;
;
/*
 * Copyright (C) 2009 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @constructor
 * @extends {WebInspector.View}
 */
WebInspector.AuditResultView = function(categoryResults)
{
    WebInspector.View.call(this);
    this.element.className = "audit-result-view";

    function categorySorter(a, b) {
        return (a.title || "").localeCompare(b.title || "");
    }
    categoryResults.sort(categorySorter);
    for (var i = 0; i < categoryResults.length; ++i)
        this.element.appendChild(new WebInspector.AuditCategoryResultPane(categoryResults[i]).element);

    this.element.addEventListener("contextmenu", this._contextMenuEventFired.bind(this), true);
}

WebInspector.AuditResultView.prototype = {
    _contextMenuEventFired: function(event)
    {
        var contextMenu = new WebInspector.ContextMenu();
        if (WebInspector.populateHrefContextMenu(contextMenu, null, event))
            contextMenu.show(event);
    }
}

WebInspector.AuditResultView.prototype.__proto__ = WebInspector.View.prototype;

/**
 * @constructor
 * @extends {WebInspector.SidebarPane}
 */
WebInspector.AuditCategoryResultPane = function(categoryResult)
{
    WebInspector.SidebarPane.call(this, categoryResult.title);
    var treeOutlineElement = document.createElement("ol");
    this.bodyElement.addStyleClass("audit-result-tree");
    this.bodyElement.appendChild(treeOutlineElement);

    this._treeOutline = new TreeOutline(treeOutlineElement);
    this._treeOutline.expandTreeElementsWhenArrowing = true;

    function ruleSorter(a, b)
    {
        var result = WebInspector.AuditRule.SeverityOrder[a.severity || 0] - WebInspector.AuditRule.SeverityOrder[b.severity || 0];
        if (!result)
            result = (a.value || "").localeCompare(b.value || "");
        return result;
    }

    categoryResult.ruleResults.sort(ruleSorter);

    for (var i = 0; i < categoryResult.ruleResults.length; ++i) {
        var ruleResult = categoryResult.ruleResults[i];
        var treeElement = this._appendResult(this._treeOutline, ruleResult);
        treeElement.listItemElement.addStyleClass("audit-result");

        if (ruleResult.severity) {
            var severityElement = document.createElement("img");
            severityElement.className = "severity-" + ruleResult.severity;
            treeElement.listItemElement.appendChild(severityElement);
        }
    }
    this.expand();
}

WebInspector.AuditCategoryResultPane.prototype = {
    _appendResult: function(parentTreeElement, result)
    {
        var title = "";

        if (typeof result.value === "string") {
            title = result.value;
            if (result.violationCount)
                title = String.sprintf("%s (%d)", title, result.violationCount);
        }

        var treeElement = new TreeElement(null, null, !!result.children);
        treeElement.title = title;
        parentTreeElement.appendChild(treeElement);

        if (result.className)
            treeElement.listItemElement.addStyleClass(result.className);
        if (typeof result.value !== "string")
            treeElement.listItemElement.appendChild(WebInspector.auditFormatters.apply(result.value));

        if (result.children) {
            for (var i = 0; i < result.children.length; ++i)
                this._appendResult(treeElement, result.children[i]);
        }
        if (result.expanded) {
            treeElement.listItemElement.removeStyleClass("parent");
            treeElement.listItemElement.addStyleClass("parent-expanded");
            treeElement.expand();
        }
        return treeElement;
    }
}

WebInspector.AuditCategoryResultPane.prototype.__proto__ = WebInspector.SidebarPane.prototype;
;
/*
 * Copyright (C) 2010 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

WebInspector.AuditRules.IPAddressRegexp = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

WebInspector.AuditRules.CacheableResponseCodes =
{
    200: true,
    203: true,
    206: true,
    300: true,
    301: true,
    410: true,

    304: true // Underlying request is cacheable
}

WebInspector.AuditRules.getDomainToResourcesMap = function(requests, types, needFullResources)
{
    var domainToResourcesMap = {};
    for (var i = 0, size = requests.length; i < size; ++i) {
        var request = requests[i];
        if (types && types.indexOf(request.type) === -1)
            continue;
        var parsedURL = request.url.asParsedURL();
        if (!parsedURL)
            continue;
        var domain = parsedURL.host;
        var domainResources = domainToResourcesMap[domain];
        if (domainResources === undefined) {
          domainResources = [];
          domainToResourcesMap[domain] = domainResources;
        }
        domainResources.push(needFullResources ? request : request.url);
    }
    return domainToResourcesMap;
}

/**
 * @constructor
 * @extends {WebInspector.AuditRule}
 */
WebInspector.AuditRules.GzipRule = function()
{
    WebInspector.AuditRule.call(this, "network-gzip", "Enable gzip compression");
}

WebInspector.AuditRules.GzipRule.prototype = {
    /**
     * @param {Array.<WebInspector.NetworkRequest>} requests
     */
    doRun: function(requests, result, callback, progressMonitor)
    {
        var totalSavings = 0;
        var compressedSize = 0;
        var candidateSize = 0;
        var summary = result.addChild("", true);
        for (var i = 0, length = requests.length; i < length; ++i) {
            var request = requests[i];
            if (request.statusCode === 304)
                continue; // Do not test 304 Not Modified requests as their contents are always empty.
            if (this._shouldCompress(request)) {
                var size = request.resourceSize;
                candidateSize += size;
                if (this._isCompressed(request)) {
                    compressedSize += size;
                    continue;
                }
                var savings = 2 * size / 3;
                totalSavings += savings;
                summary.addFormatted("%r could save ~%s", request.url, Number.bytesToString(savings));
                result.violationCount++;
            }
        }
        if (!totalSavings)
            return callback(null);
        summary.value = String.sprintf("Compressing the following resources with gzip could reduce their transfer size by about two thirds (~%s):", Number.bytesToString(totalSavings));
        callback(result);
    },

    _isCompressed: function(request)
    {
        var encodingHeader = request.responseHeaderValue("Content-Encoding");
        if (!encodingHeader)
            return false;

        return /\b(?:gzip|deflate)\b/.test(encodingHeader);
    },

    _shouldCompress: function(request)
    {
        return request.type.isTextType() && request.parsedURL.host && request.resourceSize !== undefined && request.resourceSize > 150;
    }
}

WebInspector.AuditRules.GzipRule.prototype.__proto__ = WebInspector.AuditRule.prototype;

/**
 * @constructor
 * @extends {WebInspector.AuditRule}
 */
WebInspector.AuditRules.CombineExternalResourcesRule = function(id, name, type, resourceTypeName, allowedPerDomain)
{
    WebInspector.AuditRule.call(this, id, name);
    this._type = type;
    this._resourceTypeName = resourceTypeName;
    this._allowedPerDomain = allowedPerDomain;
}

WebInspector.AuditRules.CombineExternalResourcesRule.prototype = {
    doRun: function(requests, result, callback, progressMonitor)
    {
        var domainToResourcesMap = WebInspector.AuditRules.getDomainToResourcesMap(requests, [this._type], false);
        var penalizedResourceCount = 0;
        // TODO: refactor according to the chosen i18n approach
        var summary = result.addChild("", true);
        for (var domain in domainToResourcesMap) {
            var domainResources = domainToResourcesMap[domain];
            var extraResourceCount = domainResources.length - this._allowedPerDomain;
            if (extraResourceCount <= 0)
                continue;
            penalizedResourceCount += extraResourceCount - 1;
            summary.addChild(String.sprintf("%d %s resources served from %s.", domainResources.length, this._resourceTypeName, WebInspector.AuditRuleResult.resourceDomain(domain)));
            result.violationCount += domainResources.length;
        }
        if (!penalizedResourceCount)
            return callback(null);

        summary.value = "There are multiple resources served from same domain. Consider combining them into as few files as possible.";
        callback(result);
    }
}

WebInspector.AuditRules.CombineExternalResourcesRule.prototype.__proto__ = WebInspector.AuditRule.prototype;

/**
 * @constructor
 * @extends {WebInspector.AuditRules.CombineExternalResourcesRule}
 */
WebInspector.AuditRules.CombineJsResourcesRule = function(allowedPerDomain) {
    WebInspector.AuditRules.CombineExternalResourcesRule.call(this, "page-externaljs", "Combine external JavaScript", WebInspector.resourceTypes.Script, "JavaScript", allowedPerDomain);
}

WebInspector.AuditRules.CombineJsResourcesRule.prototype.__proto__ = WebInspector.AuditRules.CombineExternalResourcesRule.prototype;

/**
 * @constructor
 * @extends {WebInspector.AuditRules.CombineExternalResourcesRule}
 */
WebInspector.AuditRules.CombineCssResourcesRule = function(allowedPerDomain) {
    WebInspector.AuditRules.CombineExternalResourcesRule.call(this, "page-externalcss", "Combine external CSS", WebInspector.resourceTypes.Stylesheet, "CSS", allowedPerDomain);
}

WebInspector.AuditRules.CombineCssResourcesRule.prototype.__proto__ = WebInspector.AuditRules.CombineExternalResourcesRule.prototype;

/**
 * @constructor
 * @extends {WebInspector.AuditRule}
 */
WebInspector.AuditRules.MinimizeDnsLookupsRule = function(hostCountThreshold) {
    WebInspector.AuditRule.call(this, "network-minimizelookups", "Minimize DNS lookups");
    this._hostCountThreshold = hostCountThreshold;
}

WebInspector.AuditRules.MinimizeDnsLookupsRule.prototype = {
    doRun: function(requests, result, callback, progressMonitor)
    {
        var summary = result.addChild("");
        var domainToResourcesMap = WebInspector.AuditRules.getDomainToResourcesMap(requests, undefined, false);
        for (var domain in domainToResourcesMap) {
            if (domainToResourcesMap[domain].length > 1)
                continue;
            var parsedURL = domain.asParsedURL();
            if (!parsedURL)
                continue;
            if (!parsedURL.host.search(WebInspector.AuditRules.IPAddressRegexp))
                continue; // an IP address
            summary.addSnippet(domain);
            result.violationCount++;
        }
        if (!summary.children || summary.children.length <= this._hostCountThreshold)
            return callback(null);

        summary.value = "The following domains only serve one resource each. If possible, avoid the extra DNS lookups by serving these resources from existing domains.";
        callback(result);
    }
}

WebInspector.AuditRules.MinimizeDnsLookupsRule.prototype.__proto__ = WebInspector.AuditRule.prototype;

/**
 * @constructor
 * @extends {WebInspector.AuditRule}
 */
WebInspector.AuditRules.ParallelizeDownloadRule = function(optimalHostnameCount, minRequestThreshold, minBalanceThreshold)
{
    WebInspector.AuditRule.call(this, "network-parallelizehosts", "Parallelize downloads across hostnames");
    this._optimalHostnameCount = optimalHostnameCount;
    this._minRequestThreshold = minRequestThreshold;
    this._minBalanceThreshold = minBalanceThreshold;
}

WebInspector.AuditRules.ParallelizeDownloadRule.prototype = {
    doRun: function(requests, result, callback, progressMonitor)
    {
        function hostSorter(a, b)
        {
            var aCount = domainToResourcesMap[a].length;
            var bCount = domainToResourcesMap[b].length;
            return (aCount < bCount) ? 1 : (aCount == bCount) ? 0 : -1;
        }

        var domainToResourcesMap = WebInspector.AuditRules.getDomainToResourcesMap(
            requests,
            [WebInspector.resourceTypes.Stylesheet, WebInspector.resourceTypes.Image],
            true);

        var hosts = [];
        for (var url in domainToResourcesMap)
            hosts.push(url);

        if (!hosts.length)
            return callback(null); // no hosts (local file or something)

        hosts.sort(hostSorter);

        var optimalHostnameCount = this._optimalHostnameCount;
        if (hosts.length > optimalHostnameCount)
            hosts.splice(optimalHostnameCount);

        var busiestHostResourceCount = domainToResourcesMap[hosts[0]].length;
        var requestCountAboveThreshold = busiestHostResourceCount - this._minRequestThreshold;
        if (requestCountAboveThreshold <= 0)
            return callback(null);

        var avgResourcesPerHost = 0;
        for (var i = 0, size = hosts.length; i < size; ++i)
            avgResourcesPerHost += domainToResourcesMap[hosts[i]].length;

        // Assume optimal parallelization.
        avgResourcesPerHost /= optimalHostnameCount;
        avgResourcesPerHost = Math.max(avgResourcesPerHost, 1);

        var pctAboveAvg = (requestCountAboveThreshold / avgResourcesPerHost) - 1.0;
        var minBalanceThreshold = this._minBalanceThreshold;
        if (pctAboveAvg < minBalanceThreshold)
            return callback(null);

        var requestsOnBusiestHost = domainToResourcesMap[hosts[0]];
        var entry = result.addChild(String.sprintf("This page makes %d parallelizable requests to %s. Increase download parallelization by distributing the following requests across multiple hostnames.", busiestHostResourceCount, hosts[0]), true);
        for (var i = 0; i < requestsOnBusiestHost.length; ++i)
            entry.addURL(requestsOnBusiestHost[i].url);

        result.violationCount = requestsOnBusiestHost.length;
        callback(result);
    }
}

WebInspector.AuditRules.ParallelizeDownloadRule.prototype.__proto__ = WebInspector.AuditRule.prototype;

/**
 * The reported CSS rule size is incorrect (parsed != original in WebKit),
 * so use percentages instead, which gives a better approximation.
 * @constructor
 * @extends {WebInspector.AuditRule}
 */
WebInspector.AuditRules.UnusedCssRule = function()
{
    WebInspector.AuditRule.call(this, "page-unusedcss", "Remove unused CSS rules");
}

WebInspector.AuditRules.UnusedCssRule.prototype = {
    doRun: function(requests, result, callback, progressMonitor)
    {
        var self = this;

        function evalCallback(styleSheets) {
            if (progressMonitor.canceled)
                return;

            if (!styleSheets.length)
                return callback(null);

            var pseudoSelectorRegexp = /:hover|:link|:active|:visited|:focus|:before|:after/;
            var selectors = [];
            var testedSelectors = {};
            for (var i = 0; i < styleSheets.length; ++i) {
                var styleSheet = styleSheets[i];
                for (var curRule = 0; curRule < styleSheet.rules.length; ++curRule) {
                    var selectorText = styleSheet.rules[curRule].selectorText;
                    if (selectorText.match(pseudoSelectorRegexp) || testedSelectors[selectorText])
                        continue;
                    selectors.push(selectorText);
                    testedSelectors[selectorText] = 1;
                }
            }

            function selectorsCallback(callback, styleSheets, testedSelectors, foundSelectors)
            {
                if (progressMonitor.canceled)
                    return;

                var inlineBlockOrdinal = 0;
                var totalStylesheetSize = 0;
                var totalUnusedStylesheetSize = 0;
                var summary;

                for (var i = 0; i < styleSheets.length; ++i) {
                    var styleSheet = styleSheets[i];
                    var stylesheetSize = 0;
                    var unusedStylesheetSize = 0;
                    var unusedRules = [];
                    for (var curRule = 0; curRule < styleSheet.rules.length; ++curRule) {
                        var rule = styleSheet.rules[curRule];
                        // Exact computation whenever source ranges are available.
                        var textLength = (rule.selectorRange && rule.style.range && rule.style.range.end) ? rule.style.range.end - rule.selectorRange.start + 1 : 0;
                        if (!textLength && rule.style.cssText)
                            textLength = rule.style.cssText.length + rule.selectorText.length;
                        stylesheetSize += textLength;
                        if (!testedSelectors[rule.selectorText] || foundSelectors[rule.selectorText])
                            continue;
                        unusedStylesheetSize += textLength;
                        unusedRules.push(rule.selectorText);
                    }
                    totalStylesheetSize += stylesheetSize;
                    totalUnusedStylesheetSize += unusedStylesheetSize;

                    if (!unusedRules.length)
                        continue;

                    var resource = WebInspector.resourceForURL(styleSheet.sourceURL);
                    var isInlineBlock = resource && resource.request && resource.request.type == WebInspector.resourceTypes.Document;
                    var url = !isInlineBlock ? WebInspector.AuditRuleResult.linkifyDisplayName(styleSheet.sourceURL) : String.sprintf("Inline block #%d", ++inlineBlockOrdinal);
                    var pctUnused = Math.round(100 * unusedStylesheetSize / stylesheetSize);
                    if (!summary)
                        summary = result.addChild("", true);
                    var entry = summary.addFormatted("%s: %s (%d%) is not used by the current page.", url, Number.bytesToString(unusedStylesheetSize), pctUnused);

                    for (var j = 0; j < unusedRules.length; ++j)
                        entry.addSnippet(unusedRules[j]);

                    result.violationCount += unusedRules.length;
                }

                if (!totalUnusedStylesheetSize)
                    return callback(null);

                var totalUnusedPercent = Math.round(100 * totalUnusedStylesheetSize / totalStylesheetSize);
                summary.value = String.sprintf("%s (%d%) of CSS is not used by the current page.", Number.bytesToString(totalUnusedStylesheetSize), totalUnusedPercent);

                callback(result);
            }

            var foundSelectors = {};
            function queryCallback(boundSelectorsCallback, selector, styleSheets, testedSelectors, nodeId)
            {
                if (nodeId)
                    foundSelectors[selector] = true;
                if (boundSelectorsCallback)
                    boundSelectorsCallback(foundSelectors);
            }

            function documentLoaded(selectors, document) {
                for (var i = 0; i < selectors.length; ++i) {
                    if (progressMonitor.canceled)
                        return;
                    WebInspector.domAgent.querySelector(document.id, selectors[i], queryCallback.bind(null, i === selectors.length - 1 ? selectorsCallback.bind(null, callback, styleSheets, testedSelectors) : null, selectors[i], styleSheets, testedSelectors));
                }
            }

            WebInspector.domAgent.requestDocument(documentLoaded.bind(null, selectors));
        }

        function styleSheetCallback(styleSheets, sourceURL, continuation, styleSheet)
        {
            if (progressMonitor.canceled)
                return;

            if (styleSheet) {
                styleSheet.sourceURL = sourceURL;
                styleSheets.push(styleSheet);
            }
            if (continuation)
                continuation(styleSheets);
        }

        function allStylesCallback(error, styleSheetInfos)
        {
            if (progressMonitor.canceled)
                return;

            if (error || !styleSheetInfos || !styleSheetInfos.length)
                return evalCallback([]);
            var styleSheets = [];
            for (var i = 0; i < styleSheetInfos.length; ++i) {
                var info = styleSheetInfos[i];
                WebInspector.CSSStyleSheet.createForId(info.styleSheetId, styleSheetCallback.bind(null, styleSheets, info.sourceURL, i == styleSheetInfos.length - 1 ? evalCallback : null));
            }
        }

        CSSAgent.getAllStyleSheets(allStylesCallback);
    }
}

WebInspector.AuditRules.UnusedCssRule.prototype.__proto__ = WebInspector.AuditRule.prototype;

/**
 * @constructor
 * @extends {WebInspector.AuditRule}
 */
WebInspector.AuditRules.CacheControlRule = function(id, name)
{
    WebInspector.AuditRule.call(this, id, name);
}

WebInspector.AuditRules.CacheControlRule.MillisPerMonth = 1000 * 60 * 60 * 24 * 30;

WebInspector.AuditRules.CacheControlRule.prototype = {

    doRun: function(requests, result, callback, progressMonitor)
    {
        var cacheableAndNonCacheableResources = this._cacheableAndNonCacheableResources(requests);
        if (cacheableAndNonCacheableResources[0].length)
            this.runChecks(cacheableAndNonCacheableResources[0], result);
        this.handleNonCacheableResources(cacheableAndNonCacheableResources[1], result);

        callback(result);
    },

    handleNonCacheableResources: function(requests, result)
    {
    },

    _cacheableAndNonCacheableResources: function(requests)
    {
        var processedResources = [[], []];
        for (var i = 0; i < requests.length; ++i) {
            var request = requests[i];
            if (!this.isCacheableResource(request))
                continue;
            if (this._isExplicitlyNonCacheable(request))
                processedResources[1].push(request);
            else
                processedResources[0].push(request);
        }
        return processedResources;
    },

    execCheck: function(messageText, requestCheckFunction, requests, result)
    {
        var requestCount = requests.length;
        var urls = [];
        for (var i = 0; i < requestCount; ++i) {
            if (requestCheckFunction.call(this, requests[i]))
                urls.push(requests[i].url);
        }
        if (urls.length) {
            var entry = result.addChild(messageText, true);
            entry.addURLs(urls);
            result.violationCount += urls.length;
        }
    },

    freshnessLifetimeGreaterThan: function(request, timeMs)
    {
        var dateHeader = this.responseHeader(request, "Date");
        if (!dateHeader)
            return false;

        var dateHeaderMs = Date.parse(dateHeader);
        if (isNaN(dateHeaderMs))
            return false;

        var freshnessLifetimeMs;
        var maxAgeMatch = this.responseHeaderMatch(request, "Cache-Control", "max-age=(\\d+)");

        if (maxAgeMatch)
            freshnessLifetimeMs = (maxAgeMatch[1]) ? 1000 * maxAgeMatch[1] : 0;
        else {
            var expiresHeader = this.responseHeader(request, "Expires");
            if (expiresHeader) {
                var expDate = Date.parse(expiresHeader);
                if (!isNaN(expDate))
                    freshnessLifetimeMs = expDate - dateHeaderMs;
            }
        }

        return (isNaN(freshnessLifetimeMs)) ? false : freshnessLifetimeMs > timeMs;
    },

    responseHeader: function(request, header)
    {
        return request.responseHeaderValue(header);
    },

    hasResponseHeader: function(request, header)
    {
        return request.responseHeaderValue(header) !== undefined;
    },

    isCompressible: function(request)
    {
        return request.type.isTextType();
    },

    isPubliclyCacheable: function(request)
    {
        if (this._isExplicitlyNonCacheable(request))
            return false;

        if (this.responseHeaderMatch(request, "Cache-Control", "public"))
            return true;

        return request.url.indexOf("?") == -1 && !this.responseHeaderMatch(request, "Cache-Control", "private");
    },

    responseHeaderMatch: function(request, header, regexp)
    {
        return request.responseHeaderValue(header)
            ? request.responseHeaderValue(header).match(new RegExp(regexp, "im"))
            : undefined;
    },

    hasExplicitExpiration: function(request)
    {
        return this.hasResponseHeader(request, "Date") &&
            (this.hasResponseHeader(request, "Expires") || this.responseHeaderMatch(request, "Cache-Control", "max-age"));
    },

    _isExplicitlyNonCacheable: function(request)
    {
        var hasExplicitExp = this.hasExplicitExpiration(request);
        return this.responseHeaderMatch(request, "Cache-Control", "(no-cache|no-store|must-revalidate)") ||
            this.responseHeaderMatch(request, "Pragma", "no-cache") ||
            (hasExplicitExp && !this.freshnessLifetimeGreaterThan(request, 0)) ||
            (!hasExplicitExp && request.url && request.url.indexOf("?") >= 0) ||
            (!hasExplicitExp && !this.isCacheableResource(request));
    },

    isCacheableResource: function(request)
    {
        return request.statusCode !== undefined && WebInspector.AuditRules.CacheableResponseCodes[request.statusCode];
    }
}

WebInspector.AuditRules.CacheControlRule.prototype.__proto__ = WebInspector.AuditRule.prototype;

/**
 * @constructor
 * @extends {WebInspector.AuditRules.CacheControlRule}
 */
WebInspector.AuditRules.BrowserCacheControlRule = function()
{
    WebInspector.AuditRules.CacheControlRule.call(this, "http-browsercache", "Leverage browser caching");
}

WebInspector.AuditRules.BrowserCacheControlRule.prototype = {
    handleNonCacheableResources: function(requests, result)
    {
        if (requests.length) {
            var entry = result.addChild("The following resources are explicitly non-cacheable. Consider making them cacheable if possible:", true);
            result.violationCount += requests.length;
            for (var i = 0; i < requests.length; ++i)
                entry.addURL(requests[i].url);
        }
    },

    runChecks: function(requests, result, callback)
    {
        this.execCheck("The following resources are missing a cache expiration. Resources that do not specify an expiration may not be cached by browsers:",
            this._missingExpirationCheck, requests, result);
        this.execCheck("The following resources specify a \"Vary\" header that disables caching in most versions of Internet Explorer:",
            this._varyCheck, requests, result);
        this.execCheck("The following cacheable resources have a short freshness lifetime:",
            this._oneMonthExpirationCheck, requests, result);

        // Unable to implement the favicon check due to the WebKit limitations.
        this.execCheck("To further improve cache hit rate, specify an expiration one year in the future for the following cacheable resources:",
            this._oneYearExpirationCheck, requests, result);
    },

    _missingExpirationCheck: function(request)
    {
        return this.isCacheableResource(request) && !this.hasResponseHeader(request, "Set-Cookie") && !this.hasExplicitExpiration(request);
    },

    _varyCheck: function(request)
    {
        var varyHeader = this.responseHeader(request, "Vary");
        if (varyHeader) {
            varyHeader = varyHeader.replace(/User-Agent/gi, "");
            varyHeader = varyHeader.replace(/Accept-Encoding/gi, "");
            varyHeader = varyHeader.replace(/[, ]*/g, "");
        }
        return varyHeader && varyHeader.length && this.isCacheableResource(request) && this.freshnessLifetimeGreaterThan(request, 0);
    },

    _oneMonthExpirationCheck: function(request)
    {
        return this.isCacheableResource(request) &&
            !this.hasResponseHeader(request, "Set-Cookie") &&
            !this.freshnessLifetimeGreaterThan(request, WebInspector.AuditRules.CacheControlRule.MillisPerMonth) &&
            this.freshnessLifetimeGreaterThan(request, 0);
    },

    _oneYearExpirationCheck: function(request)
    {
        return this.isCacheableResource(request) &&
            !this.hasResponseHeader(request, "Set-Cookie") &&
            !this.freshnessLifetimeGreaterThan(request, 11 * WebInspector.AuditRules.CacheControlRule.MillisPerMonth) &&
            this.freshnessLifetimeGreaterThan(request, WebInspector.AuditRules.CacheControlRule.MillisPerMonth);
    }
}

WebInspector.AuditRules.BrowserCacheControlRule.prototype.__proto__ = WebInspector.AuditRules.CacheControlRule.prototype;

/**
 * @constructor
 * @extends {WebInspector.AuditRules.CacheControlRule}
 */
WebInspector.AuditRules.ProxyCacheControlRule = function() {
    WebInspector.AuditRules.CacheControlRule.call(this, "http-proxycache", "Leverage proxy caching");
}

WebInspector.AuditRules.ProxyCacheControlRule.prototype = {
    runChecks: function(requests, result, callback)
    {
        this.execCheck("Resources with a \"?\" in the URL are not cached by most proxy caching servers:",
            this._questionMarkCheck, requests, result);
        this.execCheck("Consider adding a \"Cache-Control: public\" header to the following resources:",
            this._publicCachingCheck, requests, result);
        this.execCheck("The following publicly cacheable resources contain a Set-Cookie header. This security vulnerability can cause cookies to be shared by multiple users.",
            this._setCookieCacheableCheck, requests, result);
    },

    _questionMarkCheck: function(request)
    {
        return request.url.indexOf("?") >= 0 && !this.hasResponseHeader(request, "Set-Cookie") && this.isPubliclyCacheable(request);
    },

    _publicCachingCheck: function(request)
    {
        return this.isCacheableResource(request) &&
            !this.isCompressible(request) &&
            !this.responseHeaderMatch(request, "Cache-Control", "public") &&
            !this.hasResponseHeader(request, "Set-Cookie");
    },

    _setCookieCacheableCheck: function(request)
    {
        return this.hasResponseHeader(request, "Set-Cookie") && this.isPubliclyCacheable(request);
    }
}

WebInspector.AuditRules.ProxyCacheControlRule.prototype.__proto__ = WebInspector.AuditRules.CacheControlRule.prototype;

/**
 * @constructor
 * @extends {WebInspector.AuditRule}
 */
WebInspector.AuditRules.ImageDimensionsRule = function()
{
    WebInspector.AuditRule.call(this, "page-imagedims", "Specify image dimensions");
}

WebInspector.AuditRules.ImageDimensionsRule.prototype = {
    doRun: function(requests, result, callback, progressMonitor)
    {
        var urlToNoDimensionCount = {};

        function doneCallback()
        {
            for (var url in urlToNoDimensionCount) {
                var entry = entry || result.addChild("A width and height should be specified for all images in order to speed up page display. The following image(s) are missing a width and/or height:", true);
                var format = "%r";
                if (urlToNoDimensionCount[url] > 1)
                    format += " (%d uses)";
                entry.addFormatted(format, url, urlToNoDimensionCount[url]);
                result.violationCount++;
            }
            callback(entry ? result : null);
        }

        function imageStylesReady(imageId, styles, isLastStyle, computedStyle)
        {
            if (progressMonitor.canceled)
                return;

            const node = WebInspector.domAgent.nodeForId(imageId);
            var src = node.getAttribute("src");
            if (!src.asParsedURL()) {
                for (var frameOwnerCandidate = node; frameOwnerCandidate; frameOwnerCandidate = frameOwnerCandidate.parentNode) {
                    if (frameOwnerCandidate.documentURL) {
                        var completeSrc = WebInspector.completeURL(frameOwnerCandidate.documentURL, src);
                        break;
                    }
                }
            }
            if (completeSrc)
                src = completeSrc;

            if (computedStyle.getPropertyValue("position") === "absolute") {
                if (isLastStyle)
                    doneCallback();
                return;
            }

            if (styles.attributesStyle) {
                var widthFound = !!styles.attributesStyle.getLiveProperty("width");
                var heightFound = !!styles.attributesStyle.getLiveProperty("height");
            }

            var inlineStyle = styles.inlineStyle;
            if (inlineStyle) {
                if (inlineStyle.getPropertyValue("width") !== "")
                    widthFound = true;
                if (inlineStyle.getPropertyValue("height") !== "")
                    heightFound = true;
            }

            for (var i = styles.matchedCSSRules.length - 1; i >= 0 && !(widthFound && heightFound); --i) {
                var style = styles.matchedCSSRules[i].style;
                if (style.getPropertyValue("width") !== "")
                    widthFound = true;
                if (style.getPropertyValue("height") !== "")
                    heightFound = true;
            }

            if (!widthFound || !heightFound) {
                if (src in urlToNoDimensionCount)
                    ++urlToNoDimensionCount[src];
                else
                    urlToNoDimensionCount[src] = 1;
            }

            if (isLastStyle)
                doneCallback();
        }

        function getStyles(nodeIds)
        {
            if (progressMonitor.canceled)
                return;
            var targetResult = {};

            function inlineCallback(inlineStyle, attributesStyle)
            {
                targetResult.inlineStyle = inlineStyle;
                targetResult.attributesStyle = attributesStyle;
            }

            function matchedCallback(result)
            {
                if (result)
                    targetResult.matchedCSSRules = result.matchedCSSRules;
            }

            if (!nodeIds || !nodeIds.length)
                doneCallback();

            for (var i = 0; nodeIds && i < nodeIds.length; ++i) {
                WebInspector.cssModel.getMatchedStylesAsync(nodeIds[i], false, false, matchedCallback);
                WebInspector.cssModel.getInlineStylesAsync(nodeIds[i], inlineCallback);
                WebInspector.cssModel.getComputedStyleAsync(nodeIds[i], imageStylesReady.bind(null, nodeIds[i], targetResult, i === nodeIds.length - 1));
            }
        }

        function onDocumentAvailable(root)
        {
            if (progressMonitor.canceled)
                return;
            WebInspector.domAgent.querySelectorAll(root.id, "img[src]", getStyles);
        }

        if (progressMonitor.canceled)
            return;
        WebInspector.domAgent.requestDocument(onDocumentAvailable);
    }
}

WebInspector.AuditRules.ImageDimensionsRule.prototype.__proto__ = WebInspector.AuditRule.prototype;

/**
 * @constructor
 * @extends {WebInspector.AuditRule}
 */
WebInspector.AuditRules.CssInHeadRule = function()
{
    WebInspector.AuditRule.call(this, "page-cssinhead", "Put CSS in the document head");
}

WebInspector.AuditRules.CssInHeadRule.prototype = {
    doRun: function(requests, result, callback, progressMonitor)
    {
        function evalCallback(evalResult)
        {
            if (progressMonitor.canceled)
                return;

            if (!evalResult)
                return callback(null);

            var summary = result.addChild("");

            var outputMessages = [];
            for (var url in evalResult) {
                var urlViolations = evalResult[url];
                if (urlViolations[0]) {
                    result.addFormatted("%s style block(s) in the %r body should be moved to the document head.", urlViolations[0], url);
                    result.violationCount += urlViolations[0];
                }
                for (var i = 0; i < urlViolations[1].length; ++i)
                    result.addFormatted("Link node %r should be moved to the document head in %r", urlViolations[1][i], url);
                result.violationCount += urlViolations[1].length;
            }
            summary.value = String.sprintf("CSS in the document body adversely impacts rendering performance.");
            callback(result);
        }

        function externalStylesheetsReceived(root, inlineStyleNodeIds, nodeIds)
        {
            if (progressMonitor.canceled)
                return;

            if (!nodeIds)
                return;
            var externalStylesheetNodeIds = nodeIds;
            var result = null;
            if (inlineStyleNodeIds.length || externalStylesheetNodeIds.length) {
                var urlToViolationsArray = {};
                var externalStylesheetHrefs = [];
                for (var j = 0; j < externalStylesheetNodeIds.length; ++j) {
                    var linkNode = WebInspector.domAgent.nodeForId(externalStylesheetNodeIds[j]);
                    var completeHref = WebInspector.completeURL(linkNode.ownerDocument.documentURL, linkNode.getAttribute("href"));
                    externalStylesheetHrefs.push(completeHref || "<empty>");
                }
                urlToViolationsArray[root.documentURL] = [inlineStyleNodeIds.length, externalStylesheetHrefs];
                result = urlToViolationsArray;
            }
            evalCallback(result);
        }

        function inlineStylesReceived(root, nodeIds)
        {
            if (progressMonitor.canceled)
                return;

            if (!nodeIds)
                return;
            WebInspector.domAgent.querySelectorAll(root.id, "body link[rel~='stylesheet'][href]", externalStylesheetsReceived.bind(null, root, nodeIds));
        }

        function onDocumentAvailable(root)
        {
            if (progressMonitor.canceled)
                return;

            WebInspector.domAgent.querySelectorAll(root.id, "body style", inlineStylesReceived.bind(null, root));
        }

        WebInspector.domAgent.requestDocument(onDocumentAvailable);
    }
}

WebInspector.AuditRules.CssInHeadRule.prototype.__proto__ = WebInspector.AuditRule.prototype;

/**
 * @constructor
 * @extends {WebInspector.AuditRule}
 */
WebInspector.AuditRules.StylesScriptsOrderRule = function()
{
    WebInspector.AuditRule.call(this, "page-stylescriptorder", "Optimize the order of styles and scripts");
}

WebInspector.AuditRules.StylesScriptsOrderRule.prototype = {
    doRun: function(requests, result, callback, progressMonitor)
    {
        function evalCallback(resultValue)
        {
            if (progressMonitor.canceled)
                return;

            if (!resultValue)
                return callback(null);

            var lateCssUrls = resultValue[0];
            var cssBeforeInlineCount = resultValue[1];

            var entry = result.addChild("The following external CSS files were included after an external JavaScript file in the document head. To ensure CSS files are downloaded in parallel, always include external CSS before external JavaScript.", true);
            entry.addURLs(lateCssUrls);
            result.violationCount += lateCssUrls.length;

            if (cssBeforeInlineCount) {
                result.addChild(String.sprintf(" %d inline script block%s found in the head between an external CSS file and another resource. To allow parallel downloading, move the inline script before the external CSS file, or after the next resource.", cssBeforeInlineCount, cssBeforeInlineCount > 1 ? "s were" : " was"));
                result.violationCount += cssBeforeInlineCount;
            }
            callback(result);
        }

        function cssBeforeInlineReceived(lateStyleIds, nodeIds)
        {
            if (progressMonitor.canceled)
                return;

            if (!nodeIds)
                return;

            var cssBeforeInlineCount = nodeIds.length;
            var result = null;
            if (lateStyleIds.length || cssBeforeInlineCount) {
                var lateStyleUrls = [];
                for (var i = 0; i < lateStyleIds.length; ++i) {
                    var lateStyleNode = WebInspector.domAgent.nodeForId(lateStyleIds[i]);
                    var completeHref = WebInspector.completeURL(lateStyleNode.ownerDocument.documentURL, lateStyleNode.getAttribute("href"));
                    lateStyleUrls.push(completeHref || "<empty>");
                }
                result = [ lateStyleUrls, cssBeforeInlineCount ];
            }

            evalCallback(result);
        }

        function lateStylesReceived(root, nodeIds)
        {
            if (progressMonitor.canceled)
                return;

            if (!nodeIds)
                return;

            WebInspector.domAgent.querySelectorAll(root.id, "head link[rel~='stylesheet'][href] ~ script:not([src])", cssBeforeInlineReceived.bind(null, nodeIds));
        }

        function onDocumentAvailable(root)
        {
            if (progressMonitor.canceled)
                return;

            WebInspector.domAgent.querySelectorAll(root.id, "head script[src] ~ link[rel~='stylesheet'][href]", lateStylesReceived.bind(null, root));
        }

        WebInspector.domAgent.requestDocument(onDocumentAvailable);
    }
}

WebInspector.AuditRules.StylesScriptsOrderRule.prototype.__proto__ = WebInspector.AuditRule.prototype;

/**
 * @constructor
 * @extends {WebInspector.AuditRule}
 */
WebInspector.AuditRules.CSSRuleBase = function(id, name)
{
    WebInspector.AuditRule.call(this, id, name);
}

WebInspector.AuditRules.CSSRuleBase.prototype = {
    doRun: function(requests, result, callback, progressMonitor)
    {
        CSSAgent.getAllStyleSheets(sheetsCallback.bind(this));

        function sheetsCallback(error, headers)
        {
            if (error)
                return callback(null);

            for (var i = 0; i < headers.length; ++i) {
                var header = headers[i];
                if (header.disabled)
                    continue; // Do not check disabled stylesheets.

                this._visitStyleSheet(header.styleSheetId, i === headers.length - 1 ? finishedCallback : null, result, progressMonitor);
            }
        }

        function finishedCallback()
        {
            callback(result);
        }
    },

    _visitStyleSheet: function(styleSheetId, callback, result, progressMonitor)
    {
        WebInspector.CSSStyleSheet.createForId(styleSheetId, sheetCallback.bind(this));

        function sheetCallback(styleSheet)
        {
            if (progressMonitor.canceled)
                return;

            if (!styleSheet) {
                if (callback)
                    callback();
                return;
            }

            this.visitStyleSheet(styleSheet, result);

            for (var i = 0; i < styleSheet.rules.length; ++i)
                this._visitRule(styleSheet, styleSheet.rules[i], result);

            this.didVisitStyleSheet(styleSheet, result);

            if (callback)
                callback();
        }
    },

    _visitRule: function(styleSheet, rule, result)
    {
        this.visitRule(styleSheet, rule, result);
        var allProperties = rule.style.allProperties;
        for (var i = 0; i < allProperties.length; ++i)
            this.visitProperty(styleSheet, allProperties[i], result);
        this.didVisitRule(styleSheet, rule, result);
    },

    visitStyleSheet: function(styleSheet, result)
    {
        // Subclasses can implement.
    },

    didVisitStyleSheet: function(styleSheet, result)
    {
        // Subclasses can implement.
    },
    
    visitRule: function(styleSheet, rule, result)
    {
        // Subclasses can implement.
    },

    didVisitRule: function(styleSheet, rule, result)
    {
        // Subclasses can implement.
    },
    
    visitProperty: function(styleSheet, property, result)
    {
        // Subclasses can implement.
    }
}

WebInspector.AuditRules.CSSRuleBase.prototype.__proto__ = WebInspector.AuditRule.prototype;

/**
 * @constructor
 * @extends {WebInspector.AuditRules.CSSRuleBase}
 */
WebInspector.AuditRules.VendorPrefixedCSSProperties = function()
{
    WebInspector.AuditRules.CSSRuleBase.call(this, "page-vendorprefixedcss", "Use normal CSS property names instead of vendor-prefixed ones");
    this._webkitPrefix = "-webkit-";
}

WebInspector.AuditRules.VendorPrefixedCSSProperties.supportedProperties = [
    "background-clip", "background-origin", "background-size",
    "border-radius", "border-bottom-left-radius", "border-bottom-right-radius", "border-top-left-radius", "border-top-right-radius",
    "box-shadow", "box-sizing", "opacity", "text-shadow"
].keySet();

WebInspector.AuditRules.VendorPrefixedCSSProperties.prototype = {
    didVisitStyleSheet: function(styleSheet)
    {
        delete this._styleSheetResult;
    },

    visitRule: function(rule)
    {
        this._mentionedProperties = {};
    },

    didVisitRule: function()
    {
        delete this._ruleResult;
        delete this._mentionedProperties;
    },

    visitProperty: function(styleSheet, property, result)
    {
        if (!property.name.startsWith(this._webkitPrefix))
            return;

        var normalPropertyName = property.name.substring(this._webkitPrefix.length).toLowerCase(); // Start just after the "-webkit-" prefix.
        if (WebInspector.AuditRules.VendorPrefixedCSSProperties.supportedProperties[normalPropertyName] && !this._mentionedProperties[normalPropertyName]) {
            var style = property.ownerStyle;
            var liveProperty = style.getLiveProperty(normalPropertyName);
            if (liveProperty && !liveProperty.styleBased)
                return; // WebCore can provide normal versions of prefixed properties automatically, so be careful to skip only normal source-based properties.

            var rule = style.parentRule;
            this._mentionedProperties[normalPropertyName] = true;
            if (!this._styleSheetResult)
                this._styleSheetResult = result.addChild(rule.sourceURL ? WebInspector.linkifyResourceAsNode(rule.sourceURL) : "<unknown>");
            if (!this._ruleResult) {
                var anchor = WebInspector.linkifyURLAsNode(rule.sourceURL, rule.selectorText);
                anchor.preferredPanel = "resources";
                anchor.lineNumber = rule.sourceLine;
                this._ruleResult = this._styleSheetResult.addChild(anchor);
            }
            ++result.violationCount;
            this._ruleResult.addSnippet(String.sprintf("\"" + this._webkitPrefix + "%s\" is used, but \"%s\" is supported.", normalPropertyName, normalPropertyName));
        }
    }
}

WebInspector.AuditRules.VendorPrefixedCSSProperties.prototype.__proto__ = WebInspector.AuditRules.CSSRuleBase.prototype;

/**
 * @constructor
 * @extends {WebInspector.AuditRule}
 */
WebInspector.AuditRules.CookieRuleBase = function(id, name)
{
    WebInspector.AuditRule.call(this, id, name);
}

WebInspector.AuditRules.CookieRuleBase.prototype = {
    doRun: function(requests, result, callback, progressMonitor)
    {
        var self = this;
        function resultCallback(receivedCookies, isAdvanced) {
            if (progressMonitor.canceled)
                return;

            self.processCookies(isAdvanced ? receivedCookies : [], requests, result);
            callback(result);
        }

        WebInspector.Cookies.getCookiesAsync(resultCallback);
    },

    mapResourceCookies: function(requestsByDomain, allCookies, callback)
    {
        for (var i = 0; i < allCookies.length; ++i) {
            for (var requestDomain in requestsByDomain) {
                if (WebInspector.Cookies.cookieDomainMatchesResourceDomain(allCookies[i].domain, requestDomain))
                    this._callbackForResourceCookiePairs(requestsByDomain[requestDomain], allCookies[i], callback);
            }
        }
    },

    _callbackForResourceCookiePairs: function(requests, cookie, callback)
    {
        if (!requests)
            return;
        for (var i = 0; i < requests.length; ++i) {
            if (WebInspector.Cookies.cookieMatchesResourceURL(cookie, requests[i].url))
                callback(requests[i], cookie);
        }
    }
}

WebInspector.AuditRules.CookieRuleBase.prototype.__proto__ = WebInspector.AuditRule.prototype;

/**
 * @constructor
 * @extends {WebInspector.AuditRules.CookieRuleBase}
 */
WebInspector.AuditRules.CookieSizeRule = function(avgBytesThreshold)
{
    WebInspector.AuditRules.CookieRuleBase.call(this, "http-cookiesize", "Minimize cookie size");
    this._avgBytesThreshold = avgBytesThreshold;
    this._maxBytesThreshold = 1000;
}

WebInspector.AuditRules.CookieSizeRule.prototype = {
    _average: function(cookieArray)
    {
        var total = 0;
        for (var i = 0; i < cookieArray.length; ++i)
            total += cookieArray[i].size;
        return cookieArray.length ? Math.round(total / cookieArray.length) : 0;
    },

    _max: function(cookieArray)
    {
        var result = 0;
        for (var i = 0; i < cookieArray.length; ++i)
            result = Math.max(cookieArray[i].size, result);
        return result;
    },

    processCookies: function(allCookies, requests, result)
    {
        function maxSizeSorter(a, b)
        {
            return b.maxCookieSize - a.maxCookieSize;
        }

        function avgSizeSorter(a, b)
        {
            return b.avgCookieSize - a.avgCookieSize;
        }

        var cookiesPerResourceDomain = {};

        function collectorCallback(request, cookie)
        {
            var cookies = cookiesPerResourceDomain[request.parsedURL.host];
            if (!cookies) {
                cookies = [];
                cookiesPerResourceDomain[request.parsedURL.host] = cookies;
            }
            cookies.push(cookie);
        }

        if (!allCookies.length)
            return;

        var sortedCookieSizes = [];

        var domainToResourcesMap = WebInspector.AuditRules.getDomainToResourcesMap(requests,
                null,
                true);
        var matchingResourceData = {};
        this.mapResourceCookies(domainToResourcesMap, allCookies, collectorCallback.bind(this));

        for (var requestDomain in cookiesPerResourceDomain) {
            var cookies = cookiesPerResourceDomain[requestDomain];
            sortedCookieSizes.push({
                domain: requestDomain,
                avgCookieSize: this._average(cookies),
                maxCookieSize: this._max(cookies)
            });
        }
        var avgAllCookiesSize = this._average(allCookies);

        var hugeCookieDomains = [];
        sortedCookieSizes.sort(maxSizeSorter);

        for (var i = 0, len = sortedCookieSizes.length; i < len; ++i) {
            var maxCookieSize = sortedCookieSizes[i].maxCookieSize;
            if (maxCookieSize > this._maxBytesThreshold)
                hugeCookieDomains.push(WebInspector.AuditRuleResult.resourceDomain(sortedCookieSizes[i].domain) + ": " + Number.bytesToString(maxCookieSize));
        }

        var bigAvgCookieDomains = [];
        sortedCookieSizes.sort(avgSizeSorter);
        for (var i = 0, len = sortedCookieSizes.length; i < len; ++i) {
            var domain = sortedCookieSizes[i].domain;
            var avgCookieSize = sortedCookieSizes[i].avgCookieSize;
            if (avgCookieSize > this._avgBytesThreshold && avgCookieSize < this._maxBytesThreshold)
                bigAvgCookieDomains.push(WebInspector.AuditRuleResult.resourceDomain(domain) + ": " + Number.bytesToString(avgCookieSize));
        }
        result.addChild(String.sprintf("The average cookie size for all requests on this page is %s", Number.bytesToString(avgAllCookiesSize)));

        var message;
        if (hugeCookieDomains.length) {
            var entry = result.addChild("The following domains have a cookie size in excess of 1KB. This is harmful because requests with cookies larger than 1KB typically cannot fit into a single network packet.", true);
            entry.addURLs(hugeCookieDomains);
            result.violationCount += hugeCookieDomains.length;
        }

        if (bigAvgCookieDomains.length) {
            var entry = result.addChild(String.sprintf("The following domains have an average cookie size in excess of %d bytes. Reducing the size of cookies for these domains can reduce the time it takes to send requests.", this._avgBytesThreshold), true);
            entry.addURLs(bigAvgCookieDomains);
            result.violationCount += bigAvgCookieDomains.length;
        }
    }
}

WebInspector.AuditRules.CookieSizeRule.prototype.__proto__ = WebInspector.AuditRules.CookieRuleBase.prototype;

/**
 * @constructor
 * @extends {WebInspector.AuditRules.CookieRuleBase}
 */
WebInspector.AuditRules.StaticCookielessRule = function(minResources)
{
    WebInspector.AuditRules.CookieRuleBase.call(this, "http-staticcookieless", "Serve static content from a cookieless domain");
    this._minResources = minResources;
}

WebInspector.AuditRules.StaticCookielessRule.prototype = {
    processCookies: function(allCookies, requests, result)
    {
        var domainToResourcesMap = WebInspector.AuditRules.getDomainToResourcesMap(requests,
                [WebInspector.resourceTypes.Stylesheet,
                 WebInspector.resourceTypes.Image],
                true);
        var totalStaticResources = 0;
        for (var domain in domainToResourcesMap)
            totalStaticResources += domainToResourcesMap[domain].length;
        if (totalStaticResources < this._minResources)
            return;
        var matchingResourceData = {};
        this.mapResourceCookies(domainToResourcesMap, allCookies, this._collectorCallback.bind(this, matchingResourceData));

        var badUrls = [];
        var cookieBytes = 0;
        for (var url in matchingResourceData) {
            badUrls.push(url);
            cookieBytes += matchingResourceData[url]
        }
        if (badUrls.length < this._minResources)
            return;

        var entry = result.addChild(String.sprintf("%s of cookies were sent with the following static resources. Serve these static resources from a domain that does not set cookies:", Number.bytesToString(cookieBytes)), true);
        entry.addURLs(badUrls);
        result.violationCount = badUrls.length;
    },

    _collectorCallback: function(matchingResourceData, request, cookie)
    {
        matchingResourceData[request.url] = (matchingResourceData[request.url] || 0) + cookie.size;
    }
}

WebInspector.AuditRules.StaticCookielessRule.prototype.__proto__ = WebInspector.AuditRules.CookieRuleBase.prototype;
;
