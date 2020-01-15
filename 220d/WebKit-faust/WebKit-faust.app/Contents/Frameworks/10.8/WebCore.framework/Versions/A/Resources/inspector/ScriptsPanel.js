/*
 * Copyright (C) 2008 Apple Inc. All Rights Reserved.
 * Copyright (C) 2011 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE INC. ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE INC. OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*
 * Copyright (C) 2008 Apple Inc. All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE INC. ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE INC. OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @constructor
 * @param {WebInspector.BreakpointManager} breakpointManager
 * @extends {WebInspector.SidebarPane}
 */
WebInspector.JavaScriptBreakpointsSidebarPane = function(breakpointManager, showSourceLineDelegate)
{
    WebInspector.SidebarPane.call(this, WebInspector.UIString("Breakpoints"));

    this._breakpointManager = breakpointManager;
    this._showSourceLineDelegate = showSourceLineDelegate;

    this.listElement = document.createElement("ol");
    this.listElement.className = "breakpoint-list";

    this.emptyElement = document.createElement("div");
    this.emptyElement.className = "info";
    this.emptyElement.textContent = WebInspector.UIString("No Breakpoints");

    this.bodyElement.appendChild(this.emptyElement);

    this._items = new Map();
    this._breakpointManager.addEventListener(WebInspector.BreakpointManager.Events.BreakpointAdded, this._breakpointAdded, this);
    this._breakpointManager.addEventListener(WebInspector.BreakpointManager.Events.BreakpointRemoved, this._breakpointRemoved, this);
}

WebInspector.JavaScriptBreakpointsSidebarPane.prototype = {
    /**
     * @param {WebInspector.Event} event
     */
    _breakpointAdded: function(event)
    {
        this._breakpointRemoved(event);

        var breakpoint = /** @type {WebInspector.BreakpointManager.Breakpoint} */ event.data.breakpoint;
        var uiLocation = /** @type {WebInspector.UILocation} */ event.data.uiLocation;

        var element = document.createElement("li");
        element.addStyleClass("cursor-pointer");
        element.addEventListener("contextmenu", this._breakpointContextMenu.bind(this, breakpoint), true);
        element.addEventListener("click", this._breakpointClicked.bind(this, uiLocation), false);

        var checkbox = document.createElement("input");
        checkbox.className = "checkbox-elem";
        checkbox.type = "checkbox";
        checkbox.checked = breakpoint.enabled();
        checkbox.addEventListener("click", this._breakpointCheckboxClicked.bind(this, breakpoint), false);
        element.appendChild(checkbox);

        var url = uiLocation.uiSourceCode.url;
        var displayName = url ? WebInspector.displayNameForURL(url) : WebInspector.UIString("(program)");
        var labelElement = document.createTextNode(displayName + ":" + (uiLocation.lineNumber + 1));
        element.appendChild(labelElement);

        var snippetElement = document.createElement("div");
        snippetElement.className = "source-text monospace";
        element.appendChild(snippetElement);

        /**
         * @param {?string} content
         * @param {boolean} contentEncoded
         * @param {string} mimeType
         */
        function didRequestContent(content, contentEncoded, mimeType)
        {
            var lineEndings = content.lineEndings();
            if (uiLocation.lineNumber < lineEndings.length)
                snippetElement.textContent = content.substring(lineEndings[uiLocation.lineNumber - 1], lineEndings[uiLocation.lineNumber]);
        }
        uiLocation.uiSourceCode.requestContent(didRequestContent.bind(this));

        element._data = uiLocation;
        var currentElement = this.listElement.firstChild;
        while (currentElement) {
            if (currentElement._data && this._compareBreakpoints(currentElement._data, element._data) > 0)
                break;
            currentElement = currentElement.nextSibling;
        }
        this._addListElement(element, currentElement);

        var breakpointItem = {};
        breakpointItem.element = element;
        breakpointItem.checkbox = checkbox;
        this._items.put(breakpoint, breakpointItem);

        if (!this.expanded)
            this.expanded = true;
    },

    /**
     * @param {WebInspector.Event} event
     */
    _breakpointRemoved: function(event)
    {
        var breakpoint = /** @type {WebInspector.BreakpointManager.Breakpoint} */ event.data.breakpoint;
        var uiLocation = /** @type {WebInspector.UILocation} */ event.data.uiLocation;
        var breakpointItem = this._items.get(breakpoint);
        if (!breakpointItem)
            return;
        this._items.remove(breakpoint);
        this._removeListElement(breakpointItem.element);
    },

    /**
     * @param {WebInspector.BreakpointManager.Breakpoint} breakpoint
     */
    highlightBreakpoint: function(breakpoint)
    {
        var breakpointItem = this._items.get(breakpoint);
        if (!breakpointItem)
            return;
        breakpointItem.element.addStyleClass("breakpoint-hit");
        this._highlightedBreakpointItem = breakpointItem;
    },

    clearBreakpointHighlight: function()
    {
        if (this._highlightedBreakpointItem) {
            this._highlightedBreakpointItem.element.removeStyleClass("breakpoint-hit");
            delete this._highlightedBreakpointItem;
        }
    },

    _breakpointClicked: function(uiLocation, event)
    {
        this._showSourceLineDelegate(uiLocation.uiSourceCode, uiLocation.lineNumber);
    },

    /**
     * @param {WebInspector.BreakpointManager.Breakpoint} breakpoint
     */
    _breakpointCheckboxClicked: function(breakpoint, event)
    {
        // Breakpoint element has it's own click handler.
        event.consume();
        breakpoint.setEnabled(event.target.checked);
    },

    /**
     * @param {WebInspector.BreakpointManager.Breakpoint} breakpoint
     */
    _breakpointContextMenu: function(breakpoint, event)
    {
        var contextMenu = new WebInspector.ContextMenu();
        contextMenu.appendItem(WebInspector.UIString("Remove Breakpoint"), breakpoint.remove.bind(breakpoint));
        var removeAllTitle = WebInspector.UIString(WebInspector.useLowerCaseMenuTitles() ? "Remove all breakpoints" : "Remove All Breakpoints");
        contextMenu.appendItem(removeAllTitle, this._breakpointManager.removeAllBreakpoints.bind(this._breakpointManager));
        
        var breakpointActive = WebInspector.debuggerModel.breakpointsActive();
        var breakpointActiveTitle = WebInspector.UIString(breakpointActive ? "Deactivate All Breakpoints" : "Activate All Breakpoints");
        contextMenu.appendItem(breakpointActiveTitle, WebInspector.debuggerModel.setBreakpointsActive.bind(WebInspector.debuggerModel, !breakpointActive));

        function enabledBreakpointCount(breakpoints)
        {
            var count = 0;
            for (var i = 0; i < breakpoints.length; ++i) {
                if (breakpoints[i].checkbox.checked)
                    count++;
            }
            return count;
        }
        var breakpoints = this._items.values();
        if (breakpoints.length > 1) {
            var enableBreakpointCount = enabledBreakpointCount(breakpoints);
            var enableTitle = WebInspector.UIString(WebInspector.useLowerCaseMenuTitles() ? "Enable all breakpoints" : "Enable All Breakpoints");
            var disableTitle = WebInspector.UIString(WebInspector.useLowerCaseMenuTitles() ? "Disable all breakpoints" : "Disable All Breakpoints");

            contextMenu.appendSeparator();

            contextMenu.appendItem(enableTitle, this._breakpointManager.toggleAllBreakpoints.bind(this._breakpointManager, true), !(enableBreakpointCount != breakpoints.length));
            contextMenu.appendItem(disableTitle, this._breakpointManager.toggleAllBreakpoints.bind(this._breakpointManager, false), !(enableBreakpointCount > 1));
        }

        contextMenu.show(event);
    },

    _addListElement: function(element, beforeElement)
    {
        if (beforeElement)
            this.listElement.insertBefore(element, beforeElement);
        else {
            if (!this.listElement.firstChild) {
                this.bodyElement.removeChild(this.emptyElement);
                this.bodyElement.appendChild(this.listElement);
            }
            this.listElement.appendChild(element);
        }
    },

    _removeListElement: function(element)
    {
        this.listElement.removeChild(element);
        if (!this.listElement.firstChild) {
            this.bodyElement.removeChild(this.listElement);
            this.bodyElement.appendChild(this.emptyElement);
        }
    },

    _compare: function(x, y)
    {
        if (x !== y)
            return x < y ? -1 : 1;
        return 0;
    },

    _compareBreakpoints: function(b1, b2)
    {
        return this._compare(b1.url, b2.url) || this._compare(b1.lineNumber, b2.lineNumber);
    },

    reset: function()
    {
        this.listElement.removeChildren();
        if (this.listElement.parentElement) {
            this.bodyElement.removeChild(this.listElement);
            this.bodyElement.appendChild(this.emptyElement);
        }
        this._items.clear();
    }
}

WebInspector.JavaScriptBreakpointsSidebarPane.prototype.__proto__ = WebInspector.SidebarPane.prototype;

/**
 * @constructor
 * @extends {WebInspector.NativeBreakpointsSidebarPane}
 */
WebInspector.XHRBreakpointsSidebarPane = function()
{
    WebInspector.NativeBreakpointsSidebarPane.call(this, WebInspector.UIString("XHR Breakpoints"));

    this._breakpointElements = {};

    var addButton = document.createElement("button");
    addButton.className = "pane-title-button add";
    addButton.addEventListener("click", this._addButtonClicked.bind(this), false);
    this.titleElement.appendChild(addButton);

    this._restoreBreakpoints();
}

WebInspector.XHRBreakpointsSidebarPane.prototype = {
    _addButtonClicked: function(event)
    {
        event.consume();

        this.expanded = true;

        var inputElementContainer = document.createElement("p");
        inputElementContainer.className = "breakpoint-condition";
        var inputElement = document.createElement("span");
        inputElementContainer.textContent = WebInspector.UIString("Break when URL contains:");
        inputElement.className = "editing";
        inputElement.id = "breakpoint-condition-input";
        inputElementContainer.appendChild(inputElement);
        this._addListElement(inputElementContainer, this.listElement.firstChild);

        function finishEditing(accept, e, text)
        {
            this._removeListElement(inputElementContainer);
            if (accept) {
                this._setBreakpoint(text, true);
                this._saveBreakpoints();
            }
        }

        var config = new WebInspector.EditingConfig(finishEditing.bind(this, true), finishEditing.bind(this, false));
        WebInspector.startEditing(inputElement, config);
    },

    _setBreakpoint: function(url, enabled)
    {
        if (url in this._breakpointElements)
            return;

        var element = document.createElement("li");
        element._url = url;
        element.addEventListener("contextmenu", this._contextMenu.bind(this, url), true);

        var checkboxElement = document.createElement("input");
        checkboxElement.className = "checkbox-elem";
        checkboxElement.type = "checkbox";
        checkboxElement.checked = enabled;
        checkboxElement.addEventListener("click", this._checkboxClicked.bind(this, url), false);
        element._checkboxElement = checkboxElement;
        element.appendChild(checkboxElement);

        var labelElement = document.createElement("span");
        if (!url)
            labelElement.textContent = WebInspector.UIString("Any XHR");
        else
            labelElement.textContent = WebInspector.UIString("URL contains \"%s\"", url);
        labelElement.addStyleClass("cursor-auto");
        labelElement.addEventListener("dblclick", this._labelClicked.bind(this, url), false);
        element.appendChild(labelElement);

        var currentElement = this.listElement.firstChild;
        while (currentElement) {
            if (currentElement._url && currentElement._url < element._url)
                break;
            currentElement = currentElement.nextSibling;
        }
        this._addListElement(element, currentElement);
        this._breakpointElements[url] = element;
        if (enabled)
            DOMDebuggerAgent.setXHRBreakpoint(url);
    },

    _removeBreakpoint: function(url)
    {
        var element = this._breakpointElements[url];
        if (!element)
            return;

        this._removeListElement(element);
        delete this._breakpointElements[url];
        if (element._checkboxElement.checked)
            DOMDebuggerAgent.removeXHRBreakpoint(url);
    },

    _contextMenu: function(url, event)
    {
        var contextMenu = new WebInspector.ContextMenu();
        function removeBreakpoint()
        {
            this._removeBreakpoint(url);
            this._saveBreakpoints();
        }
        contextMenu.appendItem(WebInspector.UIString("Remove Breakpoint"), removeBreakpoint.bind(this));
        contextMenu.show(event);
    },

    _checkboxClicked: function(url, event)
    {
        if (event.target.checked)
            DOMDebuggerAgent.setXHRBreakpoint(url);
        else
            DOMDebuggerAgent.removeXHRBreakpoint(url);
        this._saveBreakpoints();
    },

    _labelClicked: function(url)
    {
        var element = this._breakpointElements[url];
        var inputElement = document.createElement("span");
        inputElement.className = "breakpoint-condition editing";
        inputElement.textContent = url;
        this.listElement.insertBefore(inputElement, element);
        element.addStyleClass("hidden");

        function finishEditing(accept, e, text)
        {
            this._removeListElement(inputElement);
            if (accept) {
                this._removeBreakpoint(url);
                this._setBreakpoint(text, element._checkboxElement.checked);
                this._saveBreakpoints();
            } else
                element.removeStyleClass("hidden");
        }

        WebInspector.startEditing(inputElement, new WebInspector.EditingConfig(finishEditing.bind(this, true), finishEditing.bind(this, false)));
    },

    highlightBreakpoint: function(url)
    {
        var element = this._breakpointElements[url];
        if (!element)
            return;
        this.expanded = true;
        element.addStyleClass("breakpoint-hit");
        this._highlightedElement = element;
    },

    clearBreakpointHighlight: function()
    {
        if (this._highlightedElement) {
            this._highlightedElement.removeStyleClass("breakpoint-hit");
            delete this._highlightedElement;
        }
    },

    _saveBreakpoints: function()
    {
        var breakpoints = [];
        for (var url in this._breakpointElements)
            breakpoints.push({ url: url, enabled: this._breakpointElements[url]._checkboxElement.checked });
        WebInspector.settings.xhrBreakpoints.set(breakpoints);
    },

    _restoreBreakpoints: function()
    {
        var breakpoints = WebInspector.settings.xhrBreakpoints.get();
        for (var i = 0; i < breakpoints.length; ++i) {
            var breakpoint = breakpoints[i];
            if (breakpoint && typeof breakpoint.url === "string")
                this._setBreakpoint(breakpoint.url, breakpoint.enabled);
        }
    }
}

WebInspector.XHRBreakpointsSidebarPane.prototype.__proto__ = WebInspector.NativeBreakpointsSidebarPane.prototype;

/**
 * @constructor
 * @extends {WebInspector.SidebarPane}
 */
WebInspector.EventListenerBreakpointsSidebarPane = function()
{
    WebInspector.SidebarPane.call(this, WebInspector.UIString("Event Listener Breakpoints"));

    this.categoriesElement = document.createElement("ol");
    this.categoriesElement.tabIndex = 0;
    this.categoriesElement.addStyleClass("properties-tree");
    this.categoriesElement.addStyleClass("event-listener-breakpoints");
    this.categoriesTreeOutline = new TreeOutline(this.categoriesElement);
    this.bodyElement.appendChild(this.categoriesElement);

    this._breakpointItems = {};
    // FIXME: uncomment following once inspector stops being drop targer in major ports.
    // Otherwise, inspector page reacts on drop event and tries to load the event data.
    // this._createCategory(WebInspector.UIString("Drag"), true, ["drag", "drop", "dragstart", "dragend", "dragenter", "dragleave", "dragover"]);
    this._createCategory(WebInspector.UIString("Animation"), false, ["requestAnimationFrame", "cancelAnimationFrame", "animationFrameFired"]);
    this._createCategory(WebInspector.UIString("Control"), true, ["resize", "scroll", "zoom", "focus", "blur", "select", "change", "submit", "reset"]);
    this._createCategory(WebInspector.UIString("Clipboard"), true, ["copy", "cut", "paste", "beforecopy", "beforecut", "beforepaste"]);
    this._createCategory(WebInspector.UIString("DOM Mutation"), true, ["DOMActivate", "DOMFocusIn", "DOMFocusOut", "DOMAttrModified", "DOMCharacterDataModified", "DOMNodeInserted", "DOMNodeInsertedIntoDocument", "DOMNodeRemoved", "DOMNodeRemovedFromDocument", "DOMSubtreeModified", "DOMContentLoaded"]);
    this._createCategory(WebInspector.UIString("Device"), true, ["deviceorientation", "devicemotion"]);
    this._createCategory(WebInspector.UIString("Keyboard"), true, ["keydown", "keyup", "keypress", "input"]);
    this._createCategory(WebInspector.UIString("Load"), true, ["load", "unload", "abort", "error"]);
    this._createCategory(WebInspector.UIString("Mouse"), true, ["click", "dblclick", "mousedown", "mouseup", "mouseover", "mousemove", "mouseout", "mousewheel"]);
    this._createCategory(WebInspector.UIString("Timer"), false, ["setTimer", "clearTimer", "timerFired"]);
    this._createCategory(WebInspector.UIString("Touch"), true, ["touchstart", "touchmove", "touchend", "touchcancel"]);

    this._restoreBreakpoints();
}

WebInspector.EventListenerBreakpointsSidebarPane.categotyListener = "listener:";
WebInspector.EventListenerBreakpointsSidebarPane.categotyInstrumentation = "instrumentation:";

WebInspector.EventListenerBreakpointsSidebarPane.eventNameForUI = function(eventName)
{
    if (!WebInspector.EventListenerBreakpointsSidebarPane._eventNamesForUI) {
        WebInspector.EventListenerBreakpointsSidebarPane._eventNamesForUI = {
            "instrumentation:setTimer": WebInspector.UIString("Set Timer"),
            "instrumentation:clearTimer": WebInspector.UIString("Clear Timer"),
            "instrumentation:timerFired": WebInspector.UIString("Timer Fired"),
            "instrumentation:requestAnimationFrame": WebInspector.UIString("Request Animation Frame"),
            "instrumentation:cancelAnimationFrame": WebInspector.UIString("Cancel Animation Frame"),
            "instrumentation:animationFrameFired": WebInspector.UIString("Animation Frame Fired")
        };
    }
    return WebInspector.EventListenerBreakpointsSidebarPane._eventNamesForUI[eventName] || eventName.substring(eventName.indexOf(":") + 1);
}

WebInspector.EventListenerBreakpointsSidebarPane.prototype = {
    _createCategory: function(name, isDOMEvent, eventNames)
    {
        var categoryItem = {};
        categoryItem.element = new TreeElement(name);
        this.categoriesTreeOutline.appendChild(categoryItem.element);
        categoryItem.element.listItemElement.addStyleClass("event-category");
        categoryItem.element.selectable = true;

        categoryItem.checkbox = this._createCheckbox(categoryItem.element);
        categoryItem.checkbox.addEventListener("click", this._categoryCheckboxClicked.bind(this, categoryItem), true);

        categoryItem.children = {};
        for (var i = 0; i < eventNames.length; ++i) {
            var eventName = (isDOMEvent ? WebInspector.EventListenerBreakpointsSidebarPane.categotyListener :  WebInspector.EventListenerBreakpointsSidebarPane.categotyInstrumentation) + eventNames[i];

            var breakpointItem = {};
            var title = WebInspector.EventListenerBreakpointsSidebarPane.eventNameForUI(eventName);
            breakpointItem.element = new TreeElement(title);
            categoryItem.element.appendChild(breakpointItem.element);
            var hitMarker = document.createElement("div");
            hitMarker.className = "breakpoint-hit-marker";
            breakpointItem.element.listItemElement.appendChild(hitMarker);
            breakpointItem.element.listItemElement.addStyleClass("source-code");
            breakpointItem.element.selectable = true;

            breakpointItem.checkbox = this._createCheckbox(breakpointItem.element);
            breakpointItem.checkbox.addEventListener("click", this._breakpointCheckboxClicked.bind(this, eventName), true);
            breakpointItem.parent = categoryItem;

            this._breakpointItems[eventName] = breakpointItem;
            categoryItem.children[eventName] = breakpointItem;
        }
    },

    _createCheckbox: function(treeElement)
    {
        var checkbox = document.createElement("input");
        checkbox.className = "checkbox-elem";
        checkbox.type = "checkbox";
        treeElement.listItemElement.insertBefore(checkbox, treeElement.listItemElement.firstChild);
        return checkbox;
    },

    _categoryCheckboxClicked: function(categoryItem)
    {
        var checked = categoryItem.checkbox.checked;
        for (var eventName in categoryItem.children) {
            var breakpointItem = categoryItem.children[eventName];
            if (breakpointItem.checkbox.checked === checked)
                continue;
            if (checked)
                this._setBreakpoint(eventName);
            else
                this._removeBreakpoint(eventName);
        }
        this._saveBreakpoints();
    },

    _breakpointCheckboxClicked: function(eventName, event)
    {
        if (event.target.checked)
            this._setBreakpoint(eventName);
        else
            this._removeBreakpoint(eventName);
        this._saveBreakpoints();
    },

    _setBreakpoint: function(eventName)
    {
        var breakpointItem = this._breakpointItems[eventName];
        if (!breakpointItem)
            return;
        breakpointItem.checkbox.checked = true;
        if (eventName.startsWith(WebInspector.EventListenerBreakpointsSidebarPane.categotyListener))
            DOMDebuggerAgent.setEventListenerBreakpoint(eventName.substring(WebInspector.EventListenerBreakpointsSidebarPane.categotyListener.length));
        else if (eventName.startsWith(WebInspector.EventListenerBreakpointsSidebarPane.categotyInstrumentation))
            DOMDebuggerAgent.setInstrumentationBreakpoint(eventName.substring(WebInspector.EventListenerBreakpointsSidebarPane.categotyInstrumentation.length));
        this._updateCategoryCheckbox(breakpointItem.parent);
    },

    _removeBreakpoint: function(eventName)
    {
        var breakpointItem = this._breakpointItems[eventName];
        if (!breakpointItem)
            return;
        breakpointItem.checkbox.checked = false;
        if (eventName.startsWith(WebInspector.EventListenerBreakpointsSidebarPane.categotyListener))
            DOMDebuggerAgent.removeEventListenerBreakpoint(eventName.substring(WebInspector.EventListenerBreakpointsSidebarPane.categotyListener.length));
        else if (eventName.startsWith(WebInspector.EventListenerBreakpointsSidebarPane.categotyInstrumentation))
            DOMDebuggerAgent.removeInstrumentationBreakpoint(eventName.substring(WebInspector.EventListenerBreakpointsSidebarPane.categotyInstrumentation.length));
        this._updateCategoryCheckbox(breakpointItem.parent);
    },

    _updateCategoryCheckbox: function(categoryItem)
    {
        var hasEnabled = false, hasDisabled = false;
        for (var eventName in categoryItem.children) {
            var breakpointItem = categoryItem.children[eventName];
            if (breakpointItem.checkbox.checked)
                hasEnabled = true;
            else
                hasDisabled = true;
        }
        categoryItem.checkbox.checked = hasEnabled;
        categoryItem.checkbox.indeterminate = hasEnabled && hasDisabled;
    },

    highlightBreakpoint: function(eventName)
    {
        var breakpointItem = this._breakpointItems[eventName];
        if (!breakpointItem)
            return;
        this.expanded = true;
        breakpointItem.parent.element.expand();
        breakpointItem.element.listItemElement.addStyleClass("breakpoint-hit");
        this._highlightedElement = breakpointItem.element.listItemElement;
    },

    clearBreakpointHighlight: function()
    {
        if (this._highlightedElement) {
            this._highlightedElement.removeStyleClass("breakpoint-hit");
            delete this._highlightedElement;
        }
    },

    _saveBreakpoints: function()
    {
        var breakpoints = [];
        for (var eventName in this._breakpointItems) {
            if (this._breakpointItems[eventName].checkbox.checked)
                breakpoints.push({ eventName: eventName });
        }
        WebInspector.settings.eventListenerBreakpoints.set(breakpoints);
    },

    _restoreBreakpoints: function()
    {
        var breakpoints = WebInspector.settings.eventListenerBreakpoints.get();
        for (var i = 0; i < breakpoints.length; ++i) {
            var breakpoint = breakpoints[i];
            if (breakpoint && typeof breakpoint.eventName === "string")
                this._setBreakpoint(breakpoint.eventName);
        }
    }
}

WebInspector.EventListenerBreakpointsSidebarPane.prototype.__proto__ = WebInspector.SidebarPane.prototype;
;
/*
 * Copyright (C) 2008 Apple Inc. All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE INC. ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE INC. OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @constructor
 * @extends {WebInspector.SidebarPane}
 */
WebInspector.CallStackSidebarPane = function()
{
    WebInspector.SidebarPane.call(this, WebInspector.UIString("Call Stack"));
    this._model = WebInspector.debuggerModel;

    this.bodyElement.addEventListener("keydown", this._keyDown.bind(this), true);
    this.bodyElement.tabIndex = 0;
}

WebInspector.CallStackSidebarPane.prototype = {
    update: function(callFrames)
    {
        this.bodyElement.removeChildren();
        this.placards = [];

        if (!callFrames) {
            var infoElement = document.createElement("div");
            infoElement.className = "info";
            infoElement.textContent = WebInspector.UIString("Not Paused");
            this.bodyElement.appendChild(infoElement);
            return;
        }

        for (var i = 0; i < callFrames.length; ++i) {
            var callFrame = callFrames[i];
            var placard = new WebInspector.CallStackSidebarPane.Placard(callFrame, this);
            placard.element.addEventListener("click", this._placardSelected.bind(this, placard), false);
            this.placards.push(placard);
            this.bodyElement.appendChild(placard.element);
        }
    },

    setSelectedCallFrame: function(x)
    {
        for (var i = 0; i < this.placards.length; ++i) {
            var placard = this.placards[i];
            placard.selected = (placard._callFrame === x);
        }
    },

    _selectNextCallFrameOnStack: function()
    {
        var index = this._selectedCallFrameIndex();
        if (index == -1)
            return;
        this._selectedPlacardByIndex(index + 1);
    },

    _selectPreviousCallFrameOnStack: function()
    {
        var index = this._selectedCallFrameIndex();
        if (index == -1)
            return;
        this._selectedPlacardByIndex(index - 1);
    },

    _selectedPlacardByIndex: function(index)
    {
        if (index < 0 || index >= this.placards.length)
            return;
        this._placardSelected(this.placards[index])
    },

    _selectedCallFrameIndex: function()
    {
        if (!this._model.selectedCallFrame())
            return -1;
        for (var i = 0; i < this.placards.length; ++i) {
            var placard = this.placards[i];
            if (placard._callFrame === this._model.selectedCallFrame())
                return i;
        }
        return -1;
    },

    _placardSelected: function(placard)
    {
        this._model.setSelectedCallFrame(placard._callFrame);
    },

    _copyStackTrace: function()
    {
        var text = "";
        for (var i = 0; i < this.placards.length; ++i)
            text += this.placards[i].title + " (" + this.placards[i].subtitle + ")\n";
        InspectorFrontendHost.copyText(text);
    },

    registerShortcuts: function(section, registerShortcutDelegate)
    {
        var nextCallFrame = WebInspector.KeyboardShortcut.makeDescriptor(WebInspector.KeyboardShortcut.Keys.Period,
            WebInspector.KeyboardShortcut.Modifiers.Ctrl);
        registerShortcutDelegate(nextCallFrame.key, this._selectNextCallFrameOnStack.bind(this));

        var prevCallFrame = WebInspector.KeyboardShortcut.makeDescriptor(WebInspector.KeyboardShortcut.Keys.Comma,
            WebInspector.KeyboardShortcut.Modifiers.Ctrl);
        registerShortcutDelegate(prevCallFrame.key, this._selectPreviousCallFrameOnStack.bind(this));

        section.addRelatedKeys([ nextCallFrame.name, prevCallFrame.name ], WebInspector.UIString("Next/previous call frame"));
    },

    setStatus: function(status)
    {
        if (!this._statusMessageElement) {
            this._statusMessageElement = document.createElement("div");
            this._statusMessageElement.className = "info";
            this.bodyElement.appendChild(this._statusMessageElement);
        }
        if (typeof status === "string")
            this._statusMessageElement.textContent = status;
        else {
            this._statusMessageElement.removeChildren();
            this._statusMessageElement.appendChild(status);
        }
    },

    _keyDown: function(event)
    {
        if (event.altKey || event.shiftKey || event.metaKey || event.ctrlKey)
            return;

        if (event.keyIdentifier === "Up") {
            this._selectPreviousCallFrameOnStack();
            event.consume();
        } else if (event.keyIdentifier === "Down") {
            this._selectNextCallFrameOnStack();
            event.consume();
        }
    }
}

WebInspector.CallStackSidebarPane.prototype.__proto__ = WebInspector.SidebarPane.prototype;

/**
 * @constructor
 * @extends {WebInspector.Placard}
 * @param {WebInspector.DebuggerModel.CallFrame} callFrame
 * @param {WebInspector.CallStackSidebarPane} pane
 */
WebInspector.CallStackSidebarPane.Placard = function(callFrame, pane)
{
    WebInspector.Placard.call(this, callFrame.functionName || WebInspector.UIString("(anonymous function)"), "");
    callFrame.createLiveLocation(this._update.bind(this));
    this.element.addEventListener("contextmenu", this._placardContextMenu.bind(this), true);
    this._callFrame = callFrame;
    this._pane = pane;
}

WebInspector.CallStackSidebarPane.Placard.prototype = {
    _update: function(uiLocation)
    {
        this.subtitle = WebInspector.displayNameForURL(uiLocation.uiSourceCode.url) + ":" + (uiLocation.lineNumber + 1);
    },

    _placardContextMenu: function(event)
    {
        var contextMenu = new WebInspector.ContextMenu();

        if (WebInspector.debuggerModel.canSetScriptSource()) {
            contextMenu.appendItem(WebInspector.UIString("Restart Frame"), this._restartFrame.bind(this));
            contextMenu.appendSeparator();
        }
        contextMenu.appendItem(WebInspector.UIString("Copy Stack Trace"), this._pane._copyStackTrace.bind(this._pane));

        contextMenu.show(event);
    },

    _restartFrame: function()
    {
        this._callFrame.restart(undefined);
    }
}

WebInspector.CallStackSidebarPane.Placard.prototype.__proto__ = WebInspector.Placard.prototype;
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
 * @extends {WebInspector.DialogDelegate}
 * @param {WebInspector.SelectionDialogContentProvider} delegate
 */
WebInspector.FilteredItemSelectionDialog = function(delegate)
{
    WebInspector.DialogDelegate.call(this);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "filteredItemSelectionDialog.css", false);
    xhr.send(null);

    this.element = document.createElement("div");
    this.element.className = "js-outline-dialog";
    this.element.addEventListener("keydown", this._onKeyDown.bind(this), false);
    this.element.addEventListener("mousemove", this._onMouseMove.bind(this), false);
    this.element.addEventListener("click", this._onClick.bind(this), false);
    var styleElement = this.element.createChild("style");
    styleElement.type = "text/css";
    styleElement.textContent = xhr.responseText;

    this._itemElements = [];
    this._elementIndexes = new Map();
    this._elementHighlightChanges = new Map();

    this._promptElement = this.element.createChild("input", "monospace");
    this._promptElement.type = "text";
    this._promptElement.setAttribute("spellcheck", "false");

    this._progressElement = this.element.createChild("div", "progress");

    this._itemElementsContainer = document.createElement("div");
    this._itemElementsContainer.className = "container monospace";
    this._itemElementsContainer.addEventListener("scroll", this._onScroll.bind(this), false);
    this.element.appendChild(this._itemElementsContainer);

    this._delegate = delegate;

    this._delegate.requestItems(this._itemsLoaded.bind(this));
}

WebInspector.FilteredItemSelectionDialog.prototype = {
    /**
     * @param {Element} element
     * @param {Element} relativeToElement
     */
    position: function(element, relativeToElement)
    {
        const minWidth = 500;
        const minHeight = 204;
        var width = Math.max(relativeToElement.offsetWidth * 2 / 3, minWidth);
        var height = Math.max(relativeToElement.offsetHeight * 2 / 3, minHeight);

        this.element.style.width = width + "px";
        this.element.style.height = height + "px";

        const shadowPadding = 20; // shadow + padding
        element.positionAt(
            relativeToElement.totalOffsetLeft() + Math.max((relativeToElement.offsetWidth - width - 2 * shadowPadding) / 2, shadowPadding),
            relativeToElement.totalOffsetTop() + Math.max((relativeToElement.offsetHeight - height - 2 * shadowPadding) / 2, shadowPadding));
    },

    focus: function()
    {
        WebInspector.setCurrentFocusElement(this._promptElement);
    },

    willHide: function()
    {
        if (this._isHiding)
            return;
        this._isHiding = true;
        if (this._filterTimer)
            clearTimeout(this._filterTimer);
    },

    onEnter: function()
    {
        if (!this._selectedElement)
            return;
        this._delegate.selectItem(this._elementIndexes.get(this._selectedElement), this._promptElement.value.trim());
    },

    /**
     * @param {number} index
     * @param {number} chunkLength
     * @param {number} chunkIndex
     * @param {number} chunkCount
     */
    _itemsLoaded: function(index, chunkLength, chunkIndex, chunkCount)
    {
        for (var i = index; i < index + chunkLength; ++i)
            this._itemElementsContainer.appendChild(this._createItemElement(i, this._delegate.itemTitleAt(i)));
        this._filterItems();

        if (chunkIndex === chunkCount)
            this._progressElement.style.backgroundImage = "";
        else {
            const color = "rgb(66, 129, 235)";
            const percent = ((chunkIndex / chunkCount) * 100) + "%";
            this._progressElement.style.backgroundImage = "-webkit-linear-gradient(left, " + color + ", " + color + " " + percent + ",  transparent " + percent + ")";
        }
    },

    /**
     * @param {number} index
     * @param {string} title
     */
    _createItemElement: function(index, title)
    {
        if (this._itemElements[index])
            return this._itemElements[index];

        var itemElement = document.createElement("div");
        itemElement.className = "item";
        var titleElement = itemElement.createChild("span");
        var subtitleElement = itemElement.createChild("span");
        titleElement.textContent = title;
        this._elementIndexes.put(itemElement, index);
        this._itemElements.push(itemElement);

        return itemElement;
    },

    /**
     * @param {Element} itemElement
     */
    _hideItemElement: function(itemElement)
    {
        itemElement.style.display = "none";
    },

    /**
     * @param {Element} itemElement
     */
    _itemElementVisible: function(itemElement)
    {
        return itemElement.style.display !== "none";
    },

    /**
     * @param {Element} itemElement
     */
    _showItemElement: function(itemElement)
    {
        itemElement.style.display = "";
    },

    /**
     * @param {string} query
     * @param {boolean=} isGlobal
     */
    _createSearchRegExp: function(query, isGlobal)
    {
        return this._innerCreateSearchRegExp(this._delegate.rewriteQuery(query), isGlobal);
    },

    /**
     * @param {?string} query
     * @param {boolean=} isGlobal
     */
    _innerCreateSearchRegExp: function(query, isGlobal)
    {
        query = query ? query.trim() : query;
        if (!query)
            return new RegExp(".*");

        var ignoreCase = (query === query.toLowerCase());

        const toEscape = "^[]{}()\\.$*+?|";

        var regExpString = "";
        for (var i = 0; i < query.length; ++i) {
            var c = query.charAt(i);
            if (toEscape.indexOf(c) !== -1)
                c = "\\" + c;
            if (i)
                regExpString += "[^" + c + "]*";
            regExpString += c;
        }
        return new RegExp(regExpString, (ignoreCase ? "i" : "") + (isGlobal ? "g" : ""));
    },

    _filterItems: function()
    {
        delete this._filterTimer;

        var query = this._promptElement.value;
        query = query.trim();
        var regex = this._createSearchRegExp(query);

        var firstElement;
        for (var i = 0; i < this._itemElements.length; ++i) {
            var itemElement = this._itemElements[i];
            itemElement.lastChild.textContent = this._delegate.itemSubtitleAt(i);
            if (regex.test(this._delegate.itemKeyAt(i))) {
                this._showItemElement(itemElement);
                if (!firstElement)
                    firstElement = itemElement;
            } else
                this._hideItemElement(itemElement);
        }

        if (!this._selectedElement || !this._itemElementVisible(this._selectedElement))
            this._updateSelection(firstElement);

        if (query) {
            this._highlightItems(query);
            this._query = query;
        } else {
            this._clearHighlight();
            delete this._query;
        }
    },

    _onKeyDown: function(event)
    {
        function nextItem(itemElement, isPageScroll, forward)
        {
            var scrollItemsLeft = isPageScroll && this._rowsPerViewport ? this._rowsPerViewport : 1;
            var candidate = itemElement;
            var lastVisibleCandidate = candidate;
            do {
                candidate = forward ? candidate.nextSibling : candidate.previousSibling;
                if (!candidate) {
                    if (isPageScroll)
                        return lastVisibleCandidate;
                    else
                        candidate = forward ? this._itemElementsContainer.firstChild : this._itemElementsContainer.lastChild;
                }
                if (!this._itemElementVisible(candidate))
                    continue;
                lastVisibleCandidate = candidate;
                --scrollItemsLeft;
            } while (scrollItemsLeft && candidate !== this._selectedElement);

            return candidate;
        }

        if (this._selectedElement) {
            var candidate;
            switch (event.keyCode) {
            case WebInspector.KeyboardShortcut.Keys.Down.code:
                candidate = nextItem.call(this, this._selectedElement, false, true);
                break;
            case WebInspector.KeyboardShortcut.Keys.Up.code:
                candidate = nextItem.call(this, this._selectedElement, false, false);
                break;
            case WebInspector.KeyboardShortcut.Keys.PageDown.code:
                candidate = nextItem.call(this, this._selectedElement, true, true);
                break;
            case WebInspector.KeyboardShortcut.Keys.PageUp.code:
                candidate = nextItem.call(this, this._selectedElement, true, false);
                break;
            }

            if (candidate) {
                this._updateSelection(candidate);
                event.preventDefault();
                return;
            }
        }

        if (event.keyIdentifier !== "Shift" && event.keyIdentifier !== "Ctrl" && event.keyIdentifier !== "Meta" && event.keyIdentifier !== "Left" && event.keyIdentifier !== "Right")
            this._scheduleFilter();
    },

    _scheduleFilter: function()
    {
        if (this._filterTimer)
            return;
        this._filterTimer = setTimeout(this._filterItems.bind(this), 0);
    },

    /**
     * @param {Element} newSelectedElement
     */
    _updateSelection: function(newSelectedElement)
    {
        if (this._selectedElement === newSelectedElement)
            return;
        if (this._selectedElement)
            this._selectedElement.removeStyleClass("selected");

        this._selectedElement = newSelectedElement;
        if (newSelectedElement) {
            newSelectedElement.addStyleClass("selected");
            newSelectedElement.scrollIntoViewIfNeeded(false);
            if (!this._itemHeight) {
                this._itemHeight = newSelectedElement.offsetHeight;
                this._rowsPerViewport = Math.floor(this._itemElementsContainer.offsetHeight / this._itemHeight);
            }
        }
    },

    _onClick: function(event)
    {
        var itemElement = event.target.enclosingNodeOrSelfWithClass("item");
        if (!itemElement)
            return;
        this._updateSelection(itemElement);
        this._delegate.selectItem(this._elementIndexes.get(this._selectedElement), this._promptElement.value.trim());
        WebInspector.Dialog.hide();
    },

    _onMouseMove: function(event)
    {
        var itemElement = event.target.enclosingNodeOrSelfWithClass("item");
        if (!itemElement)
            return;
        this._updateSelection(itemElement);
    },

    _onScroll: function()
    {
        if (this._query)
            this._highlightItems(this._query);
        else
            this._clearHighlight();
    },

    /**
     * @param {string} query
     */
    _highlightItems: function(query)
    {
        var regex = this._createSearchRegExp(query, true);
        for (var i = 0; i < this._delegate.itemsCount(); ++i) {
            var itemElement = this._itemElements[i];
            if (this._itemElementVisible(itemElement) && this._itemElementInViewport(itemElement))
                this._highlightItem(itemElement, regex);
        }
    },

    _clearHighlight: function()
    {
        for (var i = 0; i < this._delegate.itemsCount(); ++i)
            this._clearElementHighlight(this._itemElements[i]);
    },

    /**
     * @param {Element} itemElement
     */
    _clearElementHighlight: function(itemElement)
    {
        var changes = this._elementHighlightChanges.get(itemElement)
        if (changes) {
            WebInspector.revertDomChanges(changes);
            this._elementHighlightChanges.remove(itemElement);
        }
    },

    /**
     * @param {Element} itemElement
     * @param {RegExp} regex
     */
    _highlightItem: function(itemElement, regex)
    {
        this._clearElementHighlight(itemElement);

        var key = this._delegate.itemKeyAt(this._elementIndexes.get(itemElement));
        var ranges = [];

        var match;
        while ((match = regex.exec(key)) !== null) {
            ranges.push({ offset: match.index, length: regex.lastIndex - match.index });
        }

        var changes = [];
        WebInspector.highlightRangesWithStyleClass(itemElement, ranges, "highlight", changes);

        if (changes.length)
            this._elementHighlightChanges.put(itemElement, changes);
    },

    /**
     * @param {Element} itemElement
     * @return {boolean}
     */
    _itemElementInViewport: function(itemElement)
    {
        if (itemElement.offsetTop + this._itemHeight < this._itemElementsContainer.scrollTop)
            return false;
        if (itemElement.offsetTop > this._itemElementsContainer.scrollTop + this._itemHeight * (this._rowsPerViewport + 1))
            return false;
        return true;
    }
}

WebInspector.FilteredItemSelectionDialog.prototype.__proto__ = WebInspector.DialogDelegate.prototype;

/**
 * @interface
 */
WebInspector.SelectionDialogContentProvider = function()
{
}

WebInspector.SelectionDialogContentProvider.prototype = {
    /**
     * @param {number} itemIndex
     * @return {string}
     */
    itemTitleAt: function(itemIndex) { },

    /*
     * @param {number} itemIndex
     * @return {string}
     */
    itemSubtitleAt: function(itemIndex) { },

    /**
     * @param {number} itemIndex
     * @return {string}
     */
    itemKeyAt: function(itemIndex) { },

    /**
     * @return {number}
     */
    itemsCount: function() { },

    /**
     * @param {function(number, number, number, number)} callback
     */
    requestItems: function(callback) { },

    /**
     * @param {number} itemIndex
     * @param {string} promptValue
     */
    selectItem: function(itemIndex, promptValue) { },

    /**
     * @param {string} query
     * @return {string}
     */
    rewriteQuery: function(query) { },
}

/**
 * @constructor
 * @implements {WebInspector.SelectionDialogContentProvider}
 * @param {WebInspector.View} view
 * @param {WebInspector.ContentProvider} contentProvider
 */
WebInspector.JavaScriptOutlineDialog = function(view, contentProvider)
{
    WebInspector.SelectionDialogContentProvider.call(this);

    this._functionItems = [];
    this._view = view;
    this._contentProvider = contentProvider;
}

/**
 * @param {WebInspector.View} view
 * @param {WebInspector.ContentProvider} contentProvider
 */
WebInspector.JavaScriptOutlineDialog.show = function(view, contentProvider)
{
    if (WebInspector.Dialog.currentInstance())
        return null;
    var delegate = new WebInspector.JavaScriptOutlineDialog(view, contentProvider);
    var filteredItemSelectionDialog = new WebInspector.FilteredItemSelectionDialog(delegate);
    WebInspector.Dialog.show(view.element, filteredItemSelectionDialog);
}

WebInspector.JavaScriptOutlineDialog.prototype = {
    /**
     * @param {number} itemIndex
     * @return {string}
     */
    itemTitleAt: function(itemIndex)
    {
        var functionItem = this._functionItems[itemIndex];
        return functionItem.name + (functionItem.arguments ? functionItem.arguments : "");
    },

    /*
     * @param {number} itemIndex
     * @return {string}
     */
    itemSubtitleAt: function(itemIndex)
    {
        return "";
    },

    /**
     * @param {number} itemIndex
     * @return {string}
     */
    itemKeyAt: function(itemIndex)
    {
        return this._functionItems[itemIndex].name;
    },

    /**
     * @return {number}
     */
    itemsCount: function()
    {
        return this._functionItems.length;
    },

    /**
     * @param {function(number, number, number, number)} callback
     */
    requestItems: function(callback)
    {
        /**
         * @param {?string} content
         * @param {boolean} contentEncoded
         * @param {string} mimeType
         */
        function contentCallback(content, contentEncoded, mimeType)
        {
            if (this._outlineWorker)
                this._outlineWorker.terminate();
            this._outlineWorker = new Worker("ScriptFormatterWorker.js");
            this._outlineWorker.onmessage = this._didBuildOutlineChunk.bind(this, callback);
            const method = "outline";
            this._outlineWorker.postMessage({ method: method, params: { content: content } });
        }
        this._contentProvider.requestContent(contentCallback.bind(this));
    },

    _didBuildOutlineChunk: function(callback, event)
    {
        var data = event.data;

        var index = this._functionItems.length;
        var chunk = data["chunk"];
        for (var i = 0; i < chunk.length; ++i)
            this._functionItems.push(chunk[i]);
        callback(index, chunk.length, data.index, data.total);

        if (data.total === data.index && this._outlineWorker) {
            this._outlineWorker.terminate();
            delete this._outlineWorker;
        }
    },

    /**
     * @param {number} itemIndex
     * @param {string} promptValue
     */
    selectItem: function(itemIndex, promptValue)
    {
        var lineNumber = this._functionItems[itemIndex].line;
        if (!isNaN(lineNumber) && lineNumber >= 0)
            this._view.highlightLine(lineNumber);
        this._view.focus();
    },

    /**
     * @param {string} query
     * @return {string}
     */
    rewriteQuery: function(query)
    {
        return query;
    }
}

WebInspector.JavaScriptOutlineDialog.prototype.__proto__ = WebInspector.SelectionDialogContentProvider.prototype;

/**
 * @constructor
 * @implements {WebInspector.SelectionDialogContentProvider}
 * @param {WebInspector.ScriptsPanel} panel
 * @param {WebInspector.UISourceCodeProvider} uiSourceCodeProvider
 */
WebInspector.OpenResourceDialog = function(panel, uiSourceCodeProvider)
{
    WebInspector.SelectionDialogContentProvider.call(this);
    this._panel = panel;

    this._uiSourceCodes = uiSourceCodeProvider.uiSourceCodes();

    function filterOutEmptyURLs(uiSourceCode)
    {
        return !!uiSourceCode.parsedURL.lastPathComponent;
    }
    this._uiSourceCodes = this._uiSourceCodes.filter(filterOutEmptyURLs);

    function compareFunction(uiSourceCode1, uiSourceCode2)
    {
        return uiSourceCode1.parsedURL.lastPathComponent.localeCompare(uiSourceCode2.parsedURL.lastPathComponent);
    }
    this._uiSourceCodes.sort(compareFunction);
}

WebInspector.OpenResourceDialog.prototype = {
    /**
     * @param {number} itemIndex
     * @return {string}
     */
    itemTitleAt: function(itemIndex)
    {
        return this._uiSourceCodes[itemIndex].parsedURL.lastPathComponent;
    },

    /*
     * @param {number} itemIndex
     * @return {string}
     */
    itemSubtitleAt: function(itemIndex)
    {
        return this._queryLineNumber || "";
    },

    /**
     * @param {number} itemIndex
     * @return {string}
     */
    itemKeyAt: function(itemIndex)
    {
        return this._uiSourceCodes[itemIndex].parsedURL.lastPathComponent;
    },

    /**
     * @return {number}
     */
    itemsCount: function()
    {
        return this._uiSourceCodes.length;
    },

    /**
     * @param {function(number, number, number, number)} callback
     */
    requestItems: function(callback)
    {
        callback(0, this._uiSourceCodes.length, 1, 1);
    },

    /**
     * @param {number} itemIndex
     * @param {string} promptValue
     */
    selectItem: function(itemIndex, promptValue)
    {
        var lineNumberMatch = promptValue.match(/[^:]+\:([\d]*)$/);
        var lineNumber = lineNumberMatch ? Math.max(parseInt(lineNumberMatch[1], 10) - 1, 0) : 0;
        this._panel.showUISourceCode(this._uiSourceCodes[itemIndex], lineNumber);
    },

    /**
     * @param {string} query
     * @return {string}
     */
    rewriteQuery: function(query)
    {
        if (!query)
            return query;
        query = query.trim();
        var lineNumberMatch = query.match(/([^:]+)(\:[\d]*)$/);
        this._queryLineNumber = lineNumberMatch ? lineNumberMatch[2] : "";
        return lineNumberMatch ? lineNumberMatch[1] : query;
    }
}

WebInspector.OpenResourceDialog.prototype.__proto__ = WebInspector.SelectionDialogContentProvider.prototype;

/**
 * @param {WebInspector.ScriptsPanel} panel
 * @param {WebInspector.UISourceCodeProvider} uiSourceCodeProvider
 * @param {Element} relativeToElement
 */
WebInspector.OpenResourceDialog.show = function(panel, uiSourceCodeProvider, relativeToElement)
{
    if (WebInspector.Dialog.currentInstance())
        return;

    var filteredItemSelectionDialog = new WebInspector.FilteredItemSelectionDialog(new WebInspector.OpenResourceDialog(panel, uiSourceCodeProvider));
    WebInspector.Dialog.show(relativeToElement, filteredItemSelectionDialog);
}
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
 * @extends {WebInspector.SourceFrame}
 * @param {WebInspector.ScriptsPanel} scriptsPanel
 * @param {WebInspector.JavaScriptSource} javaScriptSource
 */
WebInspector.JavaScriptSourceFrame = function(scriptsPanel, javaScriptSource)
{
    this._scriptsPanel = scriptsPanel;
    this._breakpointManager = WebInspector.breakpointManager;
    this._javaScriptSource = javaScriptSource;

    var locations = this._breakpointManager.breakpointLocationsForUISourceCode(this._javaScriptSource);
    for (var i = 0; i < locations.length; ++i)
        this._breakpointAdded({data:locations[i]});

    WebInspector.SourceFrame.call(this, javaScriptSource);

    this._popoverHelper = new WebInspector.ObjectPopoverHelper(this.textEditor.element,
            this._getPopoverAnchor.bind(this), this._resolveObjectForPopover.bind(this), this._onHidePopover.bind(this), true);

    this.textEditor.element.addEventListener("keydown", this._onKeyDown.bind(this), true);

    this.textEditor.addEventListener(WebInspector.TextEditor.Events.GutterClick, this._handleGutterClick.bind(this), this);

    this._breakpointManager.addEventListener(WebInspector.BreakpointManager.Events.BreakpointAdded, this._breakpointAdded, this);
    this._breakpointManager.addEventListener(WebInspector.BreakpointManager.Events.BreakpointRemoved, this._breakpointRemoved, this);

    this._javaScriptSource.addEventListener(WebInspector.UISourceCode.Events.ContentChanged, this._onContentChanged, this);
    this._javaScriptSource.addEventListener(WebInspector.UISourceCode.Events.ConsoleMessageAdded, this._consoleMessageAdded, this);
    this._javaScriptSource.addEventListener(WebInspector.UISourceCode.Events.ConsoleMessageRemoved, this._consoleMessageRemoved, this);
    this._javaScriptSource.addEventListener(WebInspector.UISourceCode.Events.ConsoleMessagesCleared, this._consoleMessagesCleared, this);
}

WebInspector.JavaScriptSourceFrame.prototype = {
    // View events
    wasShown: function()
    {
        WebInspector.SourceFrame.prototype.wasShown.call(this);
    },

    willHide: function()
    {
        WebInspector.SourceFrame.prototype.willHide.call(this);
        this._popoverHelper.hidePopover();
    },

    /**
     * @return {boolean}
     */
    canEditSource: function()
    {
        return this._javaScriptSource.isEditable();
    },

    /**
     * @param {string} text 
     */
    commitEditing: function(text)
    {
        if (!this._javaScriptSource.isDirty())
            return;

        this._isCommittingEditing = true;
        this._javaScriptSource.commitWorkingCopy(this._didEditContent.bind(this));
        delete this._isCommittingEditing;
    },

    /**
     * @param {WebInspector.Event} event
     */
    _onContentChanged: function(event)
    {
        if (this._isCommittingEditing)
            return;
        var content = /** @type {string} */ event.data.content;

        if (this._javaScriptSource.togglingFormatter())
            this.setContent(content, false, this._javaScriptSource.mimeType());
        else {
            var breakpointLocations = this._breakpointManager.breakpointLocationsForUISourceCode(this._javaScriptSource);
            for (var i = 0; i < breakpointLocations.length; ++i)
                breakpointLocations[i].breakpoint.remove();
            this.setContent(content, false, this._javaScriptSource.mimeType());
        }
    },

    populateLineGutterContextMenu: function(contextMenu, lineNumber)
    {
        contextMenu.appendItem(WebInspector.UIString(WebInspector.useLowerCaseMenuTitles() ? "Continue to here" : "Continue to Here"), this._continueToLine.bind(this, lineNumber));

        var breakpoint = this._breakpointManager.findBreakpoint(this._javaScriptSource, lineNumber);
        if (!breakpoint) {
            // This row doesn't have a breakpoint: We want to show Add Breakpoint and Add and Edit Breakpoint.
            contextMenu.appendItem(WebInspector.UIString(WebInspector.useLowerCaseMenuTitles() ? "Add breakpoint" : "Add Breakpoint"), this._setBreakpoint.bind(this, lineNumber, "", true));
            contextMenu.appendItem(WebInspector.UIString(WebInspector.useLowerCaseMenuTitles() ? "Add conditional breakpoint…" : "Add Conditional Breakpoint…"), this._editBreakpointCondition.bind(this, lineNumber));
        } else {
            // This row has a breakpoint, we want to show edit and remove breakpoint, and either disable or enable.
            contextMenu.appendItem(WebInspector.UIString(WebInspector.useLowerCaseMenuTitles() ? "Remove breakpoint" : "Remove Breakpoint"), breakpoint.remove.bind(breakpoint));
            contextMenu.appendItem(WebInspector.UIString(WebInspector.useLowerCaseMenuTitles() ? "Edit breakpoint…" : "Edit Breakpoint…"), this._editBreakpointCondition.bind(this, lineNumber, breakpoint));
            if (breakpoint.enabled())
                contextMenu.appendItem(WebInspector.UIString(WebInspector.useLowerCaseMenuTitles() ? "Disable breakpoint" : "Disable Breakpoint"), breakpoint.setEnabled.bind(breakpoint, false));
            else
                contextMenu.appendItem(WebInspector.UIString(WebInspector.useLowerCaseMenuTitles() ? "Enable breakpoint" : "Enable Breakpoint"), breakpoint.setEnabled.bind(breakpoint, true));
        }
    },

    populateTextAreaContextMenu: function(contextMenu, lineNumber)
    {
        WebInspector.SourceFrame.prototype.populateTextAreaContextMenu.call(this, contextMenu, lineNumber);
        var selection = window.getSelection();
        if (selection.type === "Range" && !selection.isCollapsed) {
            var addToWatchLabel = WebInspector.UIString(WebInspector.useLowerCaseMenuTitles() ? "Add to watch" : "Add to Watch");
            contextMenu.appendItem(addToWatchLabel, this._scriptsPanel.addToWatch.bind(this._scriptsPanel, selection.toString()));
            var evaluateLabel = WebInspector.UIString(WebInspector.useLowerCaseMenuTitles() ? "Evaluate in console" : "Evaluate in Console");
            contextMenu.appendItem(evaluateLabel, WebInspector.evaluateInConsole.bind(WebInspector, selection.toString()));
            contextMenu.appendSeparator();
        }
        contextMenu.appendApplicableItems(this._javaScriptSource);
    },

    onTextChanged: function(oldRange, newRange)
    {
        WebInspector.SourceFrame.prototype.onTextChanged.call(this, oldRange, newRange);
        this._removeBreakpointsBeforeEditing();
        this._javaScriptSource.setWorkingCopy(this._textEditor.text());
        this._restoreBreakpointsAfterEditing();
    },

    _didEditContent: function(error)
    {
        if (error) {
            WebInspector.showErrorMessage(error);
            return;
        }
        if (!this._javaScriptSource.supportsEnabledBreakpointsWhileEditing())
            this._restoreBreakpointsAfterEditing();
    },

    _removeBreakpointsBeforeEditing: function()
    {
        var supportsBreakpointsOnEdit = this._javaScriptSource.supportsEnabledBreakpointsWhileEditing();
        if (!this._javaScriptSource.isDirty() || supportsBreakpointsOnEdit) {
            // Disable all breakpoints in the model, store them as muted breakpoints.
            var breakpointLocations = this._breakpointManager.breakpointLocationsForUISourceCode(this._javaScriptSource);
            var lineNumbers = {};
            this._preserveDecorations = true;
            for (var i = 0; i < breakpointLocations.length; ++i) {
                var breakpoint = breakpointLocations[i].breakpoint;
                breakpointLocations[i].breakpoint.remove();
            }
            delete this._preserveDecorations;

            for (var lineNumber = 0; lineNumber < this._textEditor.linesCount; ++lineNumber) {
                var breakpointDecoration = this._textEditor.getAttribute(lineNumber, "breakpoint");
                if (breakpointDecoration)
                    this._addBreakpointDecoration(lineNumber, breakpointDecoration.condition, breakpointDecoration.enabled, !supportsBreakpointsOnEdit);
            }
            this.clearExecutionLine();
        }
    },

    _restoreBreakpointsAfterEditing: function()
    {
        if (!this._javaScriptSource.isDirty() || this._javaScriptSource.supportsEnabledBreakpointsWhileEditing()) {
            // Restore all muted breakpoints.
            for (var lineNumber = 0; lineNumber < this._textEditor.linesCount; ++lineNumber) {
                var breakpointDecoration = this._textEditor.getAttribute(lineNumber, "breakpoint");
                if (breakpointDecoration) {
                    // Remove fake decoration
                    this._removeBreakpointDecoration(lineNumber);
                    // Set new breakpoint
                    this._setBreakpoint(lineNumber, breakpointDecoration.condition, breakpointDecoration.enabled);
                }
            }
        }
    },

    _getPopoverAnchor: function(element, event)
    {
        if (!WebInspector.debuggerModel.isPaused())
            return null;
        if (window.getSelection().type === "Range")
            return null;
        var lineElement = element.enclosingNodeOrSelfWithClass("webkit-line-content");
        if (!lineElement)
            return null;

        if (element.hasStyleClass("webkit-javascript-ident"))
            return element;

        if (element.hasStyleClass("source-frame-token"))
            return element;

        // We are interested in identifiers and "this" keyword.
        if (element.hasStyleClass("webkit-javascript-keyword"))
            return element.textContent === "this" ? element : null;

        if (element !== lineElement || lineElement.childElementCount)
            return null;

        // Handle non-highlighted case
        // 1. Collect ranges of identifier suspects
        var lineContent = lineElement.textContent;
        var ranges = [];
        var regex = new RegExp("[a-zA-Z_\$0-9]+", "g");
        var match;
        while (regex.lastIndex < lineContent.length && (match = regex.exec(lineContent)))
            ranges.push({offset: match.index, length: regex.lastIndex - match.index});

        // 2. 'highlight' them with artificial style to detect word boundaries
        var changes = [];
        WebInspector.highlightRangesWithStyleClass(lineElement, ranges, "source-frame-token", changes);
        var lineOffsetLeft = lineElement.totalOffsetLeft();
        for (var child = lineElement.firstChild; child; child = child.nextSibling) {
            if (child.nodeType !== Node.ELEMENT_NODE || !child.hasStyleClass("source-frame-token"))
                continue;
            if (event.x > lineOffsetLeft + child.offsetLeft && event.x < lineOffsetLeft + child.offsetLeft + child.offsetWidth) {
                var text = child.textContent;
                return (text === "this" || !WebInspector.SourceJavaScriptTokenizer.Keywords[text]) ? child : null;
            }
        }
        return null;
    },

    _resolveObjectForPopover: function(element, showCallback, objectGroupName)
    {
        this._highlightElement = this._highlightExpression(element);

        /**
         * @param {?RuntimeAgent.RemoteObject} result
         * @param {boolean=} wasThrown
         */
        function showObjectPopover(result, wasThrown)
        {
            if (!WebInspector.debuggerModel.isPaused()) {
                this._popoverHelper.hidePopover();
                return;
            }
            showCallback(WebInspector.RemoteObject.fromPayload(result), wasThrown, this._highlightElement);
            // Popover may have been removed by showCallback().
            if (this._highlightElement)
                this._highlightElement.addStyleClass("source-frame-eval-expression");
        }

        if (!WebInspector.debuggerModel.isPaused()) {
            this._popoverHelper.hidePopover();
            return;
        }
        var selectedCallFrame = WebInspector.debuggerModel.selectedCallFrame();
        selectedCallFrame.evaluate(this._highlightElement.textContent, objectGroupName, false, true, false, showObjectPopover.bind(this));
    },

    _onHidePopover: function()
    {
        // Replace higlight element with its contents inplace.
        var highlightElement = this._highlightElement;
        if (!highlightElement)
            return;
        // FIXME: the text editor should maintain highlight on its own. The check below is a workaround for
        // the case when highlight element is detached from DOM by the TextEditor when re-building the DOM.
        var parentElement = highlightElement.parentElement;
        if (parentElement) {
            var child = highlightElement.firstChild;
            while (child) {
                var nextSibling = child.nextSibling;
                parentElement.insertBefore(child, highlightElement);
                child = nextSibling;
            }
            parentElement.removeChild(highlightElement);
        }
        delete this._highlightElement;
    },

    _highlightExpression: function(element)
    {
        // Collect tokens belonging to evaluated expression.
        var tokens = [ element ];
        var token = element.previousSibling;
        while (token && (token.className === "webkit-javascript-ident" || token.className === "source-frame-token" || token.className === "webkit-javascript-keyword" || token.textContent.trim() === ".")) {
            tokens.push(token);
            token = token.previousSibling;
        }
        tokens.reverse();

        // Wrap them with highlight element.
        var parentElement = element.parentElement;
        var nextElement = element.nextSibling;
        var container = document.createElement("span");
        for (var i = 0; i < tokens.length; ++i)
            container.appendChild(tokens[i]);
        parentElement.insertBefore(container, nextElement);
        return container;
    },

    /**
     * @param {number} lineNumber
     * @param {string} condition
     * @param {boolean} enabled
     * @param {boolean} mutedWhileEditing
     */
    _addBreakpointDecoration: function(lineNumber, condition, enabled, mutedWhileEditing)
    {
        var breakpoint = {
            condition: condition,
            enabled: enabled
        };
        this.textEditor.setAttribute(lineNumber, "breakpoint", breakpoint);

        var disabled = !enabled || (mutedWhileEditing && !this._javaScriptSource.supportsEnabledBreakpointsWhileEditing());
        this.textEditor.addBreakpoint(lineNumber, disabled, !!condition);
    },

    _removeBreakpointDecoration: function(lineNumber)
    {
        if (this._preserveDecorations)
            return;
        this.textEditor.removeAttribute(lineNumber, "breakpoint");
        this.textEditor.removeBreakpoint(lineNumber);
    },

    _onKeyDown: function(event)
    {
        if (event.keyIdentifier === "U+001B") { // Escape key
            if (this._popoverHelper.isPopoverVisible()) {
                this._popoverHelper.hidePopover();
                event.consume();
            }
        }
    },

    /**
     * @param {number} lineNumber
     * @param {WebInspector.BreakpointManager.Breakpoint=} breakpoint
     */
    _editBreakpointCondition: function(lineNumber, breakpoint)
    {
        this._conditionElement = this._createConditionElement(lineNumber);
        this.textEditor.addDecoration(lineNumber, this._conditionElement);

        function finishEditing(committed, element, newText)
        {
            this.textEditor.removeDecoration(lineNumber, this._conditionElement);
            delete this._conditionEditorElement;
            delete this._conditionElement;
            if (breakpoint)
                breakpoint.setCondition(newText);
            else
                this._setBreakpoint(lineNumber, newText, true);
        }

        var config = new WebInspector.EditingConfig(finishEditing.bind(this, true), finishEditing.bind(this, false));
        WebInspector.startEditing(this._conditionEditorElement, config);
        this._conditionEditorElement.value = breakpoint ? breakpoint.condition() : "";
        this._conditionEditorElement.select();
    },

    _createConditionElement: function(lineNumber)
    {
        var conditionElement = document.createElement("div");
        conditionElement.className = "source-frame-breakpoint-condition";

        var labelElement = document.createElement("label");
        labelElement.className = "source-frame-breakpoint-message";
        labelElement.htmlFor = "source-frame-breakpoint-condition";
        labelElement.appendChild(document.createTextNode(WebInspector.UIString("The breakpoint on line %d will stop only if this expression is true:", lineNumber)));
        conditionElement.appendChild(labelElement);

        var editorElement = document.createElement("input");
        editorElement.id = "source-frame-breakpoint-condition";
        editorElement.className = "monospace";
        editorElement.type = "text";
        conditionElement.appendChild(editorElement);
        this._conditionEditorElement = editorElement;

        return conditionElement;
    },

    /**
     * @param {number} lineNumber
     */
    setExecutionLine: function(lineNumber)
    {
        this._executionLineNumber = lineNumber;
        if (this.loaded) {
            this.textEditor.setExecutionLine(lineNumber);
            this.revealLine(this._executionLineNumber);
            if (this.canEditSource())
                this.setSelection(WebInspector.TextRange.createFromLocation(lineNumber, 0));
        }
    },

    clearExecutionLine: function()
    {
        if (this.loaded && typeof this._executionLineNumber === "number")
            this.textEditor.clearExecutionLine();
        delete this._executionLineNumber;
    },

    _lineNumberAfterEditing: function(lineNumber, oldRange, newRange)
    {
        var shiftOffset = lineNumber <= oldRange.startLine ? 0 : newRange.linesCount - oldRange.linesCount;

        // Special case of editing the line itself. We should decide whether the line number should move below or not.
        if (lineNumber === oldRange.startLine) {
            var whiteSpacesRegex = /^[\s\xA0]*$/;
            for (var i = 0; lineNumber + i <= newRange.endLine; ++i) {
                if (!whiteSpacesRegex.test(this.textEditor.line(lineNumber + i))) {
                    shiftOffset = i;
                    break;
                }
            }
        }

        var newLineNumber = Math.max(0, lineNumber + shiftOffset);
        if (oldRange.startLine < lineNumber && lineNumber < oldRange.endLine)
            newLineNumber = oldRange.startLine;
        return newLineNumber;
    },

    _breakpointAdded: function(event)
    {
        var uiLocation = /** @type {WebInspector.UILocation} */ event.data.uiLocation;

        if (uiLocation.uiSourceCode !== this._javaScriptSource)
            return;

        var breakpoint = /** @type {WebInspector.BreakpointManager.Breakpoint} */ event.data.breakpoint;
        if (this.loaded)
            this._addBreakpointDecoration(uiLocation.lineNumber, breakpoint.condition(), breakpoint.enabled(), false);
    },

    _breakpointRemoved: function(event)
    {
        var uiLocation = /** @type {WebInspector.UILocation} */ event.data.uiLocation;
        if (uiLocation.uiSourceCode !== this._javaScriptSource)
            return;

        var breakpoint = /** @type {WebInspector.BreakpointManager.Breakpoint} */ event.data.breakpoint;
        var remainingBreakpoint = this._breakpointManager.findBreakpoint(this._javaScriptSource, uiLocation.lineNumber);
        if (!remainingBreakpoint && this.loaded)
            this._removeBreakpointDecoration(uiLocation.lineNumber);
    },

    _consoleMessageAdded: function(event)
    {
        var message = /** @type {WebInspector.PresentationConsoleMessage} */ event.data;
        if (this.loaded)
            this.addMessageToSource(message.lineNumber, message.originalMessage);
    },

    _consoleMessageRemoved: function(event)
    {
        var message = /** @type {WebInspector.PresentationConsoleMessage} */ event.data;
        if (this.loaded)
            this.removeMessageFromSource(message.lineNumber, message.originalMessage);
    },

    _consoleMessagesCleared: function(event)
    {
        this.clearMessages();
    },

    onTextEditorContentLoaded: function()
    {
        if (typeof this._executionLineNumber === "number")
            this.setExecutionLine(this._executionLineNumber);

        var breakpointLocations = this._breakpointManager.breakpointLocationsForUISourceCode(this._javaScriptSource);
        for (var i = 0; i < breakpointLocations.length; ++i) {
            var breakpoint = breakpointLocations[i].breakpoint;
            this._addBreakpointDecoration(breakpointLocations[i].uiLocation.lineNumber, breakpoint.condition(), breakpoint.enabled(), false);
        }

        var messages = this._javaScriptSource.consoleMessages();
        for (var i = 0; i < messages.length; ++i) {
            var message = messages[i];
            this.addMessageToSource(message.lineNumber, message.originalMessage);
        }
    },

    /**
     * @param {Event} event
     */
    _handleGutterClick: function(event)
    {
        if (this._javaScriptSource.isDirty() && !this._javaScriptSource.supportsEnabledBreakpointsWhileEditing())
            return;

        var lineNumber = event.data.lineNumber;
        var eventObject = /** @type {Event} */ event.data.event;

        if (eventObject.button != 0 || eventObject.altKey || eventObject.ctrlKey || eventObject.metaKey)
            return;

        this._toggleBreakpoint(lineNumber, eventObject.shiftKey);
        eventObject.consume(true);
    },

    /**
     * @param {number} lineNumber
     * @param {boolean} onlyDisable
     */
    _toggleBreakpoint: function(lineNumber, onlyDisable)
    {
        var breakpoint = this._breakpointManager.findBreakpoint(this._javaScriptSource, lineNumber);
        if (breakpoint) {
            if (onlyDisable)
                breakpoint.setEnabled(!breakpoint.enabled());
            else
                breakpoint.remove();
        } else
            this._setBreakpoint(lineNumber, "", true);
    },

    toggleBreakpointOnCurrentLine: function()
    {
        var selection = this.textEditor.selection();
        if (!selection)
            return;
        this._toggleBreakpoint(selection.startLine, false);
    },

    /**
     * @param {number} lineNumber
     * @param {string} condition
     * @param {boolean} enabled
     */
    _setBreakpoint: function(lineNumber, condition, enabled)
    {
        this._breakpointManager.setBreakpoint(this._javaScriptSource, lineNumber, condition, enabled);
    },

    /**
     * @param {number} lineNumber
     */
    _continueToLine: function(lineNumber)
    {
        var rawLocation = this._javaScriptSource.uiLocationToRawLocation(lineNumber, 0);
        WebInspector.debuggerModel.continueToLocation(rawLocation);
    }
}

WebInspector.JavaScriptSourceFrame.prototype.__proto__ = WebInspector.SourceFrame.prototype;
;
/*
 * Copyright (C) 2012 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * 1. Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY GOOGLE INC. AND ITS CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GOOGLE INC.
 * OR ITS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @constructor
 * @param {WebInspector.SplitView} parentSplitView
 * @param {WebInspector.View} navigatorView
 * @param {WebInspector.View} editorView
 */
WebInspector.NavigatorOverlayController = function(parentSplitView, navigatorView, editorView)
{
    this._parentSplitView = parentSplitView;
    this._navigatorView = navigatorView;
    this._editorView = editorView;

    this._navigatorSidebarResizeWidgetElement = document.createElement("div");
    this._navigatorSidebarResizeWidgetElement.addStyleClass("scripts-navigator-resizer-widget");
    this._parentSplitView.installResizer(this._navigatorSidebarResizeWidgetElement);
    this._navigatorView.element.appendChild(this._navigatorSidebarResizeWidgetElement);

    this._navigatorShowHideButton = new WebInspector.StatusBarButton(WebInspector.UIString("Hide navigator"), "scripts-navigator-show-hide-button", 3);
    this._navigatorShowHideButton.state = "pinned";
    this._navigatorShowHideButton.addEventListener("click", this._toggleNavigator, this);
    this._editorView.element.appendChild(this._navigatorShowHideButton.element);

    WebInspector.settings.navigatorHidden = WebInspector.settings.createSetting("navigatorHidden", true);
    if (WebInspector.settings.navigatorHidden.get())
        this._toggleNavigator();
}

WebInspector.NavigatorOverlayController.prototype = {
    wasShown: function()
    {
        window.setTimeout(this._maybeShowNavigatorOverlay.bind(this), 0);
    },

    _maybeShowNavigatorOverlay: function()
    {
        if (WebInspector.settings.navigatorHidden.get() && !WebInspector.settings.navigatorWasOnceHidden.get())
            this.showNavigatorOverlay();
    },

    _toggleNavigator: function()
    {
        if (this._navigatorShowHideButton.state === "overlay")
            this._pinNavigator();
        else if (this._navigatorShowHideButton.state === "hidden")
            this.showNavigatorOverlay();
        else
            this._hidePinnedNavigator();
    },

    _hidePinnedNavigator: function()
    {
        this._navigatorShowHideButton.state = "hidden";
        this._navigatorShowHideButton.title = WebInspector.UIString("Show navigator");
        this._parentSplitView.element.appendChild(this._navigatorShowHideButton.element);

        this._editorView.element.addStyleClass("navigator-hidden");
        this._navigatorSidebarResizeWidgetElement.addStyleClass("hidden");

        this._parentSplitView.hideSidebarElement();
        this._navigatorView.detach();
        this._editorView.focus();

        WebInspector.settings.navigatorWasOnceHidden.set(true);
        WebInspector.settings.navigatorHidden.set(true);
    },

    _pinNavigator: function()
    {
        this._navigatorShowHideButton.state = "pinned";
        this._navigatorShowHideButton.title = WebInspector.UIString("Hide navigator");

        this._editorView.element.removeStyleClass("navigator-hidden");
        this._navigatorSidebarResizeWidgetElement.removeStyleClass("hidden");
        this._editorView.element.appendChild(this._navigatorShowHideButton.element);

        this._innerHideNavigatorOverlay();
        this._parentSplitView.showSidebarElement();
        this._navigatorView.show(this._parentSplitView.sidebarElement);
        this._navigatorView.focus();
        WebInspector.settings.navigatorHidden.set(false);
    },

    showNavigatorOverlay: function()
    {
        if (this._navigatorShowHideButton.state === "overlay")
            return;

        this._navigatorShowHideButton.state = "overlay";
        this._navigatorShowHideButton.title = WebInspector.UIString("Pin navigator");

        this._sidebarOverlay = new WebInspector.SidebarOverlay(this._navigatorView, "scriptsPanelNavigatorOverlayWidth", Preferences.minScriptsSidebarWidth);
        this._boundKeyDown = this._keyDown.bind(this);
        this._sidebarOverlay.element.addEventListener("keydown", this._boundKeyDown, false);
        var navigatorOverlayResizeWidgetElement = document.createElement("div");
        navigatorOverlayResizeWidgetElement.addStyleClass("scripts-navigator-resizer-widget");
        this._sidebarOverlay.resizerWidgetElement = navigatorOverlayResizeWidgetElement;

        this._navigatorView.element.appendChild(this._navigatorShowHideButton.element);
        this._boundContainingElementFocused = this._containingElementFocused.bind(this);
        this._parentSplitView.element.addEventListener("mousedown", this._boundContainingElementFocused, false);

        this._sidebarOverlay.show(this._parentSplitView.element);
        this._navigatorView.focus();
    },

    _keyDown: function(event)
    {
        if (event.handled)
            return;

        if (event.keyCode === WebInspector.KeyboardShortcut.Keys.Esc.code) {
            this.hideNavigatorOverlay();
            event.consume(true);
        }
    },

    hideNavigatorOverlay: function()
    {
        if (this._navigatorShowHideButton.state !== "overlay")
            return;

        this._navigatorShowHideButton.state = "hidden";
        this._navigatorShowHideButton.title = WebInspector.UIString("Show navigator");
        this._parentSplitView.element.appendChild(this._navigatorShowHideButton.element);

        this._innerHideNavigatorOverlay();
        this._editorView.focus();
    },

    _innerHideNavigatorOverlay: function()
    {
        this._parentSplitView.element.removeEventListener("mousedown", this._boundContainingElementFocused, false);
        this._sidebarOverlay.element.removeEventListener("keydown", this._boundKeyDown, false);
        this._sidebarOverlay.hide();
    },

    _containingElementFocused: function(event)
    {
        if (!event.target.isSelfOrDescendant(this._sidebarOverlay.element))
            this.hideNavigatorOverlay();
    },
    
    isNavigatorPinned: function()
    {
        return this._navigatorShowHideButton.state === "pinned";
    },
    
    isNavigatorHidden: function()
    {
        return this._navigatorShowHideButton.state === "hidden";
    }
}
;
/*
 * Copyright (C) 2012 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * 1. Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY GOOGLE INC. AND ITS CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GOOGLE INC.
 * OR ITS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @extends {WebInspector.View}
 * @constructor
 */
WebInspector.NavigatorView = function()
{
    WebInspector.View.call(this);
    this.registerRequiredCSS("navigatorView.css");

    this._treeSearchBoxElement = document.createElement("div");
    this._treeSearchBoxElement.className = "navigator-tree-search-box";
    this.element.appendChild(this._treeSearchBoxElement);

    var scriptsTreeElement = document.createElement("ol");
    this._scriptsTree = new WebInspector.NavigatorTreeOutline(this._treeSearchBoxElement, scriptsTreeElement);

    var scriptsOutlineElement = document.createElement("div");
    scriptsOutlineElement.addStyleClass("outline-disclosure");
    scriptsOutlineElement.addStyleClass("navigator");
    scriptsOutlineElement.appendChild(scriptsTreeElement);

    this.element.addStyleClass("fill");
    this.element.addStyleClass("navigator-container");
    this.element.appendChild(scriptsOutlineElement);
    this.setDefaultFocusedElement(this._scriptsTree.element);

    this._folderTreeElements = {};
    this._scriptTreeElementsByUISourceCode = new Map();

    WebInspector.settings.showScriptFolders.addChangeListener(this._showScriptFoldersSettingChanged.bind(this));
}


WebInspector.NavigatorView.Events = {
    ItemSelected: "ItemSelected",
    FileRenamed: "FileRenamed"
}

WebInspector.NavigatorView.prototype = {
    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    addUISourceCode: function(uiSourceCode)
    {
        if (this._scriptTreeElementsByUISourceCode.get(uiSourceCode))
            return;

        var scriptTreeElement = new WebInspector.NavigatorSourceTreeElement(this, uiSourceCode, "");
        this._scriptTreeElementsByUISourceCode.put(uiSourceCode, scriptTreeElement);
        this._updateScriptTitle(uiSourceCode);
        this._addUISourceCodeListeners(uiSourceCode);

        var folderTreeElement = this.getOrCreateFolderTreeElement(uiSourceCode);
        folderTreeElement.appendChild(scriptTreeElement);
    },

    _uiSourceCodeTitleChanged: function(event)
    {
        var uiSourceCode = /** @type {WebInspector.UISourceCode} */ event.target;
        this._updateScriptTitle(uiSourceCode)
    },

    _uiSourceCodeWorkingCopyChanged: function(event)
    {
        var uiSourceCode = /** @type {WebInspector.UISourceCode} */ event.target;
        this._updateScriptTitle(uiSourceCode)
    },

    _uiSourceCodeContentChanged: function(event)
    {
        var uiSourceCode = /** @type {WebInspector.UISourceCode} */ event.target;
        this._updateScriptTitle(uiSourceCode);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     * @param {boolean=} ignoreIsDirty
     */
    _updateScriptTitle: function(uiSourceCode, ignoreIsDirty)
    {
        var scriptTreeElement = this._scriptTreeElementsByUISourceCode.get(uiSourceCode);
        if (!scriptTreeElement)
            return;

        var titleText;
        if (uiSourceCode.parsedURL.isValid) {
            titleText = uiSourceCode.parsedURL.lastPathComponent;
            if (uiSourceCode.parsedURL.queryParams)
                titleText += "?" + uiSourceCode.parsedURL.queryParams;
        } else if (uiSourceCode.parsedURL)
            titleText = uiSourceCode.parsedURL.url;
        if (!titleText)
            titleText = WebInspector.UIString("(program)");
        if (!ignoreIsDirty && uiSourceCode.isDirty())
            titleText = "*" + titleText;
        scriptTreeElement.titleText = titleText;
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     * @return {boolean}
     */
    isScriptSourceAdded: function(uiSourceCode)
    {
        var scriptTreeElement = this._scriptTreeElementsByUISourceCode.get(uiSourceCode);
        return !!scriptTreeElement;
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    revealUISourceCode: function(uiSourceCode)
    {
        if (this._scriptsTree.selectedTreeElement)
            this._scriptsTree.selectedTreeElement.deselect();

        this._lastSelectedUISourceCode = uiSourceCode;

        var scriptTreeElement = this._scriptTreeElementsByUISourceCode.get(uiSourceCode);
        scriptTreeElement.revealAndSelect(true);
    },

    /**
     * @param {WebInspector.UISourceCode} oldUISourceCode
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    replaceUISourceCode: function(oldUISourceCode, uiSourceCode)
    {
        var added = false;
        var selected = false;
        if (this._scriptTreeElementsByUISourceCode.get(oldUISourceCode)) {
            added = true;

            if (this._lastSelectedUISourceCode === oldUISourceCode)
                selected = true;
            this.removeUISourceCode(oldUISourceCode);
        }

        if (!added)
            return;
        this.addUISourceCode(uiSourceCode);
        if (selected)
            this.revealUISourceCode(uiSourceCode);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     * @param {boolean} focusSource
     */
    _scriptSelected: function(uiSourceCode, focusSource)
    {
        this._lastSelectedUISourceCode = uiSourceCode;
        var data = { uiSourceCode: uiSourceCode, focusSource: focusSource};
        this.dispatchEventToListeners(WebInspector.NavigatorView.Events.ItemSelected, data);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    removeUISourceCode: function(uiSourceCode)
    {
        var treeElement = this._scriptTreeElementsByUISourceCode.get(uiSourceCode);
        while (treeElement) {
            var parent = treeElement.parent;
            if (parent) {
                if (treeElement instanceof WebInspector.NavigatorFolderTreeElement)
                    delete this._folderTreeElements[treeElement.folderIdentifier];
                parent.removeChild(treeElement);
                if (parent.children.length)
                    break;
            }
            treeElement = parent;
        }
        this._scriptTreeElementsByUISourceCode.remove(uiSourceCode);
        this._removeUISourceCodeListeners(uiSourceCode);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    _addUISourceCodeListeners: function(uiSourceCode)
    {
        uiSourceCode.addEventListener(WebInspector.UISourceCode.Events.TitleChanged, this._uiSourceCodeTitleChanged, this);
        uiSourceCode.addEventListener(WebInspector.UISourceCode.Events.WorkingCopyChanged, this._uiSourceCodeWorkingCopyChanged, this);
        uiSourceCode.addEventListener(WebInspector.UISourceCode.Events.ContentChanged, this._uiSourceCodeContentChanged, this);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    _removeUISourceCodeListeners: function(uiSourceCode)
    {
        uiSourceCode.removeEventListener(WebInspector.UISourceCode.Events.TitleChanged, this._uiSourceCodeTitleChanged, this);
        uiSourceCode.removeEventListener(WebInspector.UISourceCode.Events.WorkingCopyChanged, this._uiSourceCodeWorkingCopyChanged, this);
        uiSourceCode.removeEventListener(WebInspector.UISourceCode.Events.ContentChanged, this._uiSourceCodeContentChanged, this);
    },

    _showScriptFoldersSettingChanged: function()
    {
        var uiSourceCodes = this._scriptsTree.scriptTreeElements();
        this.reset();

        for (var i = 0; i < uiSourceCodes.length; ++i)
            this.addUISourceCode(uiSourceCodes[i]);

        if (this._lastSelectedUISourceCode)
            this.revealUISourceCode(this._lastSelectedUISourceCode);
    },

    _fileRenamed: function(uiSourceCode, newTitle)
    {    
        var data = { uiSourceCode: uiSourceCode, name: newTitle };
        this.dispatchEventToListeners(WebInspector.NavigatorView.Events.FileRenamed, data);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     * @param {function(boolean)=} callback
     */
    rename: function(uiSourceCode, callback)
    {
        var scriptTreeElement = this._scriptTreeElementsByUISourceCode.get(uiSourceCode);
        if (!scriptTreeElement)
            return;

        // Tree outline should be marked as edited as well as the tree element to prevent search from starting.
        var treeOutlineElement = scriptTreeElement.treeOutline.element;
        WebInspector.markBeingEdited(treeOutlineElement, true);

        function commitHandler(element, newTitle, oldTitle)
        {
            if (newTitle && newTitle !== oldTitle)
                this._fileRenamed(uiSourceCode, newTitle);
            afterEditing.call(this, true);
        }

        function cancelHandler()
        {
            afterEditing.call(this, false);
        }

        /**
         * @param {boolean} committed
         */
        function afterEditing(committed)
        {
            WebInspector.markBeingEdited(treeOutlineElement, false);
            this._updateScriptTitle(uiSourceCode);
            if (callback)
                callback(committed);
        }

        var editingConfig = new WebInspector.EditingConfig(commitHandler.bind(this), cancelHandler.bind(this));
        this._updateScriptTitle(uiSourceCode, true);
        WebInspector.startEditing(scriptTreeElement.titleElement, editingConfig);
        window.getSelection().setBaseAndExtent(scriptTreeElement.titleElement, 0, scriptTreeElement.titleElement, 1);
    },

    reset: function()
    {
        var uiSourceCodes = this._scriptsTree.scriptTreeElements;
        for (var i = 0; i < uiSourceCodes.length; ++i)
            this._removeUISourceCodeListeners(uiSourceCodes[i]);

        this._scriptsTree.stopSearch();
        this._scriptsTree.removeChildren();
        this._folderTreeElements = {};
        this._scriptTreeElementsByUISourceCode.clear();
    },

    /**
     * @param {string} folderIdentifier
     * @param {string} domain
     * @param {string} folderName
     */
    createFolderTreeElement: function(parentFolderElement, folderIdentifier, domain, folderName)
    {
        var folderTreeElement = new WebInspector.NavigatorFolderTreeElement(folderIdentifier, domain, folderName);
        parentFolderElement.appendChild(folderTreeElement);
        this._folderTreeElements[folderIdentifier] = folderTreeElement;
        return folderTreeElement;
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    getOrCreateFolderTreeElement: function(uiSourceCode)
    {
        return this._getOrCreateFolderTreeElement(uiSourceCode.parsedURL.host, uiSourceCode.parsedURL.folderPathComponents);
    },

    /**
     * @param {string} domain
     * @param {string} folderName
     */
    _getOrCreateFolderTreeElement: function(domain, folderName)
    {
        var folderIdentifier = domain + "/" + folderName;
        
        if (this._folderTreeElements[folderIdentifier])
            return this._folderTreeElements[folderIdentifier];

        var showScriptFolders = WebInspector.settings.showScriptFolders.get();

        if ((!domain && !folderName) || !showScriptFolders)
            return this._scriptsTree;

        var parentFolderElement;
        if (!folderName)
            parentFolderElement = this._scriptsTree;
        else
            parentFolderElement = this._getOrCreateFolderTreeElement(domain, "");
        
        return this.createFolderTreeElement(parentFolderElement, folderIdentifier, domain, folderName);
    },

    handleContextMenu: function(event, uiSourceCode)
    {
        var contextMenu = new WebInspector.ContextMenu();
        contextMenu.appendApplicableItems(uiSourceCode);
        contextMenu.show(event);
    }
}

WebInspector.NavigatorView.prototype.__proto__ = WebInspector.View.prototype;

/**
 * @constructor
 * @extends {TreeOutline}
 * @param {Element} treeSearchBoxElement
 * @param {Element} element
 */
WebInspector.NavigatorTreeOutline = function(treeSearchBoxElement, element)
{
    TreeOutline.call(this, element);
    this.element = element;

    this._treeSearchBoxElement = treeSearchBoxElement;
    
    this.comparator = WebInspector.NavigatorTreeOutline._treeElementsCompare;

    this.searchable = true;
    this.searchInputElement = document.createElement("input");
}

WebInspector.NavigatorTreeOutline._treeElementsCompare = function compare(treeElement1, treeElement2)
{
    // Insert in the alphabetical order, first domains, then folders, then scripts.
    function typeWeight(treeElement)
    {
        if (treeElement instanceof WebInspector.NavigatorFolderTreeElement) {
            if (treeElement.isDomain) {
                if (treeElement.titleText === WebInspector.inspectedPageDomain)
                    return 1;
                return 2;
            }
            return 3;
        }
        return 4;
    }

    var typeWeight1 = typeWeight(treeElement1);
    var typeWeight2 = typeWeight(treeElement2);

    var result;
    if (typeWeight1 > typeWeight2)
        result = 1;
    else if (typeWeight1 < typeWeight2)
        result = -1;
    else {
        var title1 = treeElement1.titleText;
        var title2 = treeElement2.titleText;
        result = title1.localeCompare(title2);
    }
    return result;
}

WebInspector.NavigatorTreeOutline.prototype = {
   /**
    * @return {Array.<WebInspector.UISourceCode>}
    */
   scriptTreeElements: function()
   {
       var result = [];
       if (this.children.length) {
           for (var treeElement = this.children[0]; treeElement; treeElement = treeElement.traverseNextTreeElement(false, this, true)) {
               if (treeElement instanceof WebInspector.NavigatorSourceTreeElement)
                   result.push(treeElement.uiSourceCode);
           }
       }
       return result;
   },

   searchStarted: function()
   {
       this._treeSearchBoxElement.appendChild(this.searchInputElement);
       this._treeSearchBoxElement.addStyleClass("visible");
   },

   searchFinished: function()
   {
       this._treeSearchBoxElement.removeChild(this.searchInputElement);
       this._treeSearchBoxElement.removeStyleClass("visible");
   }
}

WebInspector.NavigatorTreeOutline.prototype.__proto__ = TreeOutline.prototype;

/**
 * @constructor
 * @extends {TreeElement}
 * @param {string} title
 * @param {Array.<string>} iconClasses
 * @param {boolean} hasChildren
 * @param {boolean=} noIcon
 */
WebInspector.BaseNavigatorTreeElement = function(title, iconClasses, hasChildren, noIcon)
{
    TreeElement.call(this, "", null, hasChildren);
    this._titleText = title;
    this._iconClasses = iconClasses;
    this._noIcon = noIcon;
}

WebInspector.BaseNavigatorTreeElement.prototype = {
    onattach: function()
    {
        this.listItemElement.removeChildren();
        if (this._iconClasses) {
            for (var i = 0; i < this._iconClasses.length; ++i)
                this.listItemElement.addStyleClass(this._iconClasses[i]);
        }

        var selectionElement = document.createElement("div");
        selectionElement.className = "selection";
        this.listItemElement.appendChild(selectionElement);

        if (!this._noIcon) {
            this.imageElement = document.createElement("img");
            this.imageElement.className = "icon";
            this.listItemElement.appendChild(this.imageElement);
        }
        
        this.titleElement = document.createElement("div");
        this.titleElement.className = "base-navigator-tree-element-title";
        this._titleTextNode = document.createTextNode("");
        this._titleTextNode.textContent = this._titleText;
        this.titleElement.appendChild(this._titleTextNode);
        this.listItemElement.appendChild(this.titleElement);
        this.expand();
    },

    onreveal: function()
    {
        if (this.listItemElement)
            this.listItemElement.scrollIntoViewIfNeeded(true);
    },

    /**
     * @return {string}
     */
    get titleText()
    {
        return this._titleText;
    },

    set titleText(titleText)
    {
        this._titleText = titleText || "";
        if (this.titleElement)
            this.titleElement.textContent = this._titleText;
    },
    
    /**
     * @param {string} searchText
     */
    matchesSearchText: function(searchText)
    {
        return this.titleText.match(new RegExp("^" + searchText.escapeForRegExp(), "i"));
    }
}

WebInspector.BaseNavigatorTreeElement.prototype.__proto__ = TreeElement.prototype;

/**
 * @constructor
 * @extends {WebInspector.BaseNavigatorTreeElement}
 * @param {string} folderIdentifier
 * @param {string} domain
 * @param {string} folderName
 */
WebInspector.NavigatorFolderTreeElement = function(folderIdentifier, domain, folderName)
{
    this._folderIdentifier = folderIdentifier;
    this._folderName = folderName;
    
    var iconClass = this.isDomain ? "navigator-domain-tree-item" : "navigator-folder-tree-item";
    var title = this.isDomain ? domain : folderName.substring(1);

    WebInspector.BaseNavigatorTreeElement.call(this, title, [iconClass], true);
    this.tooltip = folderName;
}

WebInspector.NavigatorFolderTreeElement.prototype = {
    /**
     * @return {string}
     */
    get folderIdentifier()
    {
        return this._folderIdentifier;
    },

    /**
     * @return {boolean}
     */
    get isDomain()
    {
        return this._folderName === "";
    },
    
    onattach: function()
    {
        WebInspector.BaseNavigatorTreeElement.prototype.onattach.call(this);
        if (this.isDomain && this.titleText != WebInspector.inspectedPageDomain)
            this.collapse();
        else
            this.expand();
    }
}

WebInspector.NavigatorFolderTreeElement.prototype.__proto__ = WebInspector.BaseNavigatorTreeElement.prototype;

/**
 * @constructor
 * @extends {WebInspector.BaseNavigatorTreeElement}
 * @param {WebInspector.NavigatorView} navigatorView
 * @param {WebInspector.UISourceCode} uiSourceCode
 * @param {string} title
 */
WebInspector.NavigatorSourceTreeElement = function(navigatorView, uiSourceCode, title)
{
    WebInspector.BaseNavigatorTreeElement.call(this, title, ["navigator-" + uiSourceCode.contentType().name() + "-tree-item"], false);
    this._navigatorView = navigatorView;
    this._uiSourceCode = uiSourceCode;
    this.tooltip = uiSourceCode.url;
}

WebInspector.NavigatorSourceTreeElement.prototype = {
    /**
     * @return {WebInspector.UISourceCode}
     */
    get uiSourceCode()
    {
        return this._uiSourceCode;
    },

    onattach: function()
    {
        WebInspector.BaseNavigatorTreeElement.prototype.onattach.call(this);
        this.listItemElement.draggable = true;
        this.listItemElement.addEventListener("click", this._onclick.bind(this), false);
        this.listItemElement.addEventListener("contextmenu", this._handleContextMenuEvent.bind(this), false);
        this.listItemElement.addEventListener("mousedown", this._onmousedown.bind(this), false);
        this.listItemElement.addEventListener("dragstart", this._ondragstart.bind(this), false);
    },

    _onmousedown: function(event)
    {
        if (event.which === 1) // Warm-up data for drag'n'drop
            this._uiSourceCode.requestContent(callback.bind(this));
        /**
         * @param {?string} content
         * @param {boolean} contentEncoded
         * @param {string} mimeType
         */
        function callback(content, contentEncoded, mimeType)
        {
            this._warmedUpContent = content;
        }
    },

    _ondragstart: function(event)
    {
        event.dataTransfer.setData("text/plain", this._warmedUpContent);
        event.dataTransfer.effectAllowed = "copy";
        return true;
    },

    onspace: function()
    {
        this._navigatorView._scriptSelected(this.uiSourceCode, true);
        return true;
    },

    /**
     * @param {Event} event
     */
    _onclick: function(event)
    {
        this._navigatorView._scriptSelected(this.uiSourceCode, false);
    },

    ondblclick: function()
    {
        this._navigatorView._scriptSelected(this.uiSourceCode, true);
    },

    onenter: function()
    {
        this._navigatorView._scriptSelected(this.uiSourceCode, true);
        return true;
    },

    /**
     * @param {Event} event
     */
    _handleContextMenuEvent: function(event)
    {
        this._navigatorView.handleContextMenu(event, this._uiSourceCode);
    }
}

WebInspector.NavigatorSourceTreeElement.prototype.__proto__ = WebInspector.BaseNavigatorTreeElement.prototype;
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
 * @extends {WebInspector.View}
 */
WebInspector.RevisionHistoryView = function()
{
    WebInspector.View.call(this);
    this.registerRequiredCSS("revisionHistory.css");
    this.element.addStyleClass("revision-history-drawer");
    this.element.addStyleClass("fill");
    this.element.addStyleClass("outline-disclosure");
    this._uiSourceCodeItems = new Map();

    var olElement = this.element.createChild("ol");
    this._treeOutline = new TreeOutline(olElement);

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    function populateRevisions(uiSourceCode)
    {
        if (uiSourceCode.history.length)
            this._createUISourceCodeItem(uiSourceCode);
    }

    WebInspector.workspace.uiSourceCodes().forEach(populateRevisions.bind(this));
    WebInspector.workspace.addEventListener(WebInspector.Workspace.Events.UISourceCodeContentCommitted, this._revisionAdded, this);
    WebInspector.workspace.addEventListener(WebInspector.UISourceCodeProvider.Events.UISourceCodeReplaced, this._uiSourceCodeReplaced, this);
    WebInspector.workspace.addEventListener(WebInspector.UISourceCodeProvider.Events.UISourceCodeRemoved, this._uiSourceCodeRemoved, this);
    WebInspector.workspace.addEventListener(WebInspector.Workspace.Events.WorkspaceReset, this._reset, this);

    this._statusElement = document.createElement("span");
    this._statusElement.textContent = WebInspector.UIString("Local modifications");

}

/**
 * @param {WebInspector.UISourceCode} uiSourceCode
 */
WebInspector.RevisionHistoryView.showHistory = function(uiSourceCode)
{
    if (!WebInspector.RevisionHistoryView._view) 
        WebInspector.RevisionHistoryView._view = new WebInspector.RevisionHistoryView();
    var view = WebInspector.RevisionHistoryView._view;
    WebInspector.showViewInDrawer(view._statusElement, view);
    view._revealUISourceCode(uiSourceCode);
}

WebInspector.RevisionHistoryView.prototype = {
    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    _createUISourceCodeItem: function(uiSourceCode)
    {
        var uiSourceCodeItem = new TreeElement(uiSourceCode.parsedURL.displayName, null, true);
        uiSourceCodeItem.selectable = false;

        // Insert in sorted order
        for (var i = 0; i < this._treeOutline.children.length; ++i) {
            if (this._treeOutline.children[i].title.localeCompare(uiSourceCode.parsedURL.displayName) > 0) {
                this._treeOutline.insertChild(uiSourceCodeItem, i);
                break;
            }
        }
        if (i === this._treeOutline.children.length)
            this._treeOutline.appendChild(uiSourceCodeItem);

        this._uiSourceCodeItems.put(uiSourceCode, uiSourceCodeItem);

        var revisionCount = uiSourceCode.history.length;
        for (var i = revisionCount - 1; i >= 0; --i) {
            var revision = uiSourceCode.history[i];
            var historyItem = new WebInspector.RevisionHistoryTreeElement(revision, uiSourceCode.history[i - 1], i !== revisionCount - 1);
            uiSourceCodeItem.appendChild(historyItem);
        }

        var linkItem = new TreeElement("", null, false);
        linkItem.selectable = false;
        uiSourceCodeItem.appendChild(linkItem);

        var revertToOriginal = linkItem.listItemElement.createChild("span", "revision-history-link revision-history-link-row");
        revertToOriginal.textContent = WebInspector.UIString("apply original content");
        revertToOriginal.addEventListener("click", uiSourceCode.revertToOriginal.bind(uiSourceCode));

        var clearHistoryElement = uiSourceCodeItem.listItemElement.createChild("span", "revision-history-link");
        clearHistoryElement.textContent = WebInspector.UIString("revert");
        clearHistoryElement.addEventListener("click", this._clearHistory.bind(this, uiSourceCode));
        return uiSourceCodeItem;
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    _clearHistory: function(uiSourceCode)
    {
        uiSourceCode.revertAndClearHistory(this._removeUISourceCode.bind(this));
    },

    _revisionAdded: function(event)
    {
        var uiSourceCode = /** @type {WebInspector.UISourceCode} */ event.data.uiSourceCode;
        var uiSourceCodeItem = this._uiSourceCodeItems.get(uiSourceCode);
        if (!uiSourceCodeItem) {
            uiSourceCodeItem = this._createUISourceCodeItem(uiSourceCode);
            return;
        }

        var historyLength = uiSourceCode.history.length;
        var historyItem = new WebInspector.RevisionHistoryTreeElement(uiSourceCode.history[historyLength - 1], uiSourceCode.history[historyLength - 2], false);
        if (uiSourceCodeItem.children.length)
            uiSourceCodeItem.children[0].allowRevert();
        uiSourceCodeItem.insertChild(historyItem, 0);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    _revealUISourceCode: function(uiSourceCode)
    {
        var uiSourceCodeItem = this._uiSourceCodeItems.get(uiSourceCode);
        if (uiSourceCodeItem) {
            uiSourceCodeItem.reveal();
            uiSourceCodeItem.expand();
        }
    },

    _uiSourceCodeRemoved: function(event)
    {
        var uiSourceCode = /** @type {WebInspector.UISourceCode} */ event.data;
        this._removeUISourceCode(uiSourceCode);
    },

    /**
     * @param {WebInspector.Event} event
     */
    _uiSourceCodeReplaced: function(event)
    {
        var oldUISourceCode = /** @type {WebInspector.UISourceCode} */ event.data.oldUISourceCode;
        var uiSourceCode = /** @type {WebInspector.UISourceCode} */ event.data.uiSourceCode;
        this._removeUISourceCode(oldUISourceCode);
        this._revealUISourceCode(uiSourceCode);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    _removeUISourceCode: function(uiSourceCode)
    {
        var uiSourceCodeItem = this._uiSourceCodeItems.get(uiSourceCode);
        this._treeOutline.removeChild(uiSourceCodeItem);
        this._uiSourceCodeItems.remove(uiSourceCode);
    },

    _reset: function()
    {
        this._treeOutline.removeChildren();
        this._uiSourceCodeItems.clear();
    }
}

WebInspector.RevisionHistoryView.prototype.__proto__ = WebInspector.View.prototype;

/**
 * @constructor
 * @extends {TreeElement}
 * @param {WebInspector.Revision} revision
 * @param {WebInspector.Revision} baseRevision
 * @param {boolean} allowRevert
 */
WebInspector.RevisionHistoryTreeElement = function(revision, baseRevision, allowRevert)
{
    TreeElement.call(this, revision.timestamp.toLocaleTimeString(), null, true);
    this.selectable = false;

    this._revision = revision;
    this._baseRevision = baseRevision;

    this._revertElement = document.createElement("span");
    this._revertElement.className = "revision-history-link";
    this._revertElement.textContent = WebInspector.UIString("apply revision content");
    this._revertElement.addEventListener("click", this._revision.revertToThis.bind(this._revision), false);
    if (!allowRevert)
        this._revertElement.addStyleClass("hidden");
}

WebInspector.RevisionHistoryTreeElement.prototype = {
    onattach: function()
    {
        this.listItemElement.addStyleClass("revision-history-revision");
    },

    onexpand: function()
    {
        this.listItemElement.appendChild(this._revertElement);

        if (this._wasExpandedOnce)
            return;
        this._wasExpandedOnce = true;

        this.childrenListElement.addStyleClass("source-code");
        if (this._baseRevision)
            this._baseRevision.requestContent(step1.bind(this));
        else
            this._revision.uiSourceCode.requestOriginalContent(step1.bind(this));

        function step1(baseContent)
        {
            this._revision.requestContent(step2.bind(this, baseContent));
        }

        function step2(baseContent, newContent)
        {
            var baseLines = difflib.stringAsLines(baseContent);
            var newLines = difflib.stringAsLines(newContent);
            var sm = new difflib.SequenceMatcher(baseLines, newLines);
            var opcodes = sm.get_opcodes();
            var lastWasSeparator = false;

            for (var idx = 0; idx < opcodes.length; idx++) {
                var code = opcodes[idx];
                var change = code[0];
                var b = code[1];
                var be = code[2];
                var n = code[3];
                var ne = code[4];
                var rowCount = Math.max(be - b, ne - n);
                var topRows = [];
                var bottomRows = [];
                for (var i = 0; i < rowCount; i++) {
                    if (change === "delete" || (change === "replace" && b < be)) {
                        var lineNumber = b++;
                        this._createLine(lineNumber, null, baseLines[lineNumber], "removed");
                        lastWasSeparator = false;
                    }

                    if (change === "insert" || (change === "replace" && n < ne)) {
                        var lineNumber = n++;
                        this._createLine(null, lineNumber, newLines[lineNumber], "added");
                        lastWasSeparator = false;
                    }

                    if (change === "equal") {
                        b++;
                        n++;
                        if (!lastWasSeparator)
                            this._createLine(null, null, "    \u2026", "separator");
                        lastWasSeparator = true;
                    }
                }
            }
        }
    },

    oncollapse: function()
    {
        if (this._revertElement.parentElement)
            this._revertElement.parentElement.removeChild(this._revertElement);
    },

    /**
     * @param {?number} baseLineNumber
     * @param {?number} newLineNumber
     * @param {string} lineContent
     * @param {string} changeType
     */
    _createLine: function(baseLineNumber, newLineNumber, lineContent, changeType)
    {
        var child = new TreeElement("", null, false);
        child.selectable = false;
        this.appendChild(child);
        var lineElement = document.createElement("span");

        function appendLineNumber(lineNumber)
        {
            var numberString = lineNumber !== null ? numberToStringWithSpacesPadding(lineNumber + 1, 4) : "    ";
            var lineNumberSpan = document.createElement("span");
            lineNumberSpan.addStyleClass("webkit-line-number");
            lineNumberSpan.textContent = numberString;
            child.listItemElement.appendChild(lineNumberSpan);
        }

        appendLineNumber(baseLineNumber);
        appendLineNumber(newLineNumber);

        var contentSpan = document.createElement("span");
        contentSpan.textContent = lineContent;
        child.listItemElement.appendChild(contentSpan);
        child.listItemElement.addStyleClass("revision-history-line");
        child.listItemElement.addStyleClass("revision-history-line-" + changeType);
    },

    allowRevert: function()
    {
        this._revertElement.removeStyleClass("hidden");
    }
}

WebInspector.RevisionHistoryTreeElement.prototype.__proto__ = TreeElement.prototype;
;
/*
 * Copyright (C) 2008 Apple Inc. All Rights Reserved.
 * Copyright (C) 2011 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE INC. ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE INC. OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @constructor
 * @extends {WebInspector.SidebarPane}
 */
WebInspector.ScopeChainSidebarPane = function()
{
    WebInspector.SidebarPane.call(this, WebInspector.UIString("Scope Variables"));
    this._sections = [];
    this._expandedSections = {};
    this._expandedProperties = [];
}

WebInspector.ScopeChainSidebarPane.prototype = {
    update: function(callFrame)
    {
        this.bodyElement.removeChildren();

        if (!callFrame) {
            var infoElement = document.createElement("div");
            infoElement.className = "info";
            infoElement.textContent = WebInspector.UIString("Not Paused");
            this.bodyElement.appendChild(infoElement);
            return;
        }

        for (var i = 0; i < this._sections.length; ++i) {
            var section = this._sections[i];
            if (!section.title)
                continue;
            if (section.expanded)
                this._expandedSections[section.title] = true;
            else
                delete this._expandedSections[section.title];
        }

        this._sections = [];

        var foundLocalScope = false;
        var scopeChain = callFrame.scopeChain;
        for (var i = 0; i < scopeChain.length; ++i) {
            var scope = scopeChain[i];
            var title = null;
            var subtitle = scope.object.description;
            var emptyPlaceholder = null;
            var extraProperties = null;

            switch (scope.type) {
                case "local":
                    foundLocalScope = true;
                    title = WebInspector.UIString("Local");
                    emptyPlaceholder = WebInspector.UIString("No Variables");
                    subtitle = null;
                    if (callFrame.this)
                        extraProperties = [ new WebInspector.RemoteObjectProperty("this", WebInspector.RemoteObject.fromPayload(callFrame.this)) ];
                    if (i == 0) {
                        var details = WebInspector.debuggerModel.debuggerPausedDetails();
                        var exception = details.reason === WebInspector.DebuggerModel.BreakReason.Exception ? details.auxData : 0;
                        if (exception) {
                            extraProperties = extraProperties || [];
                            var exceptionObject = /** @type {RuntimeAgent.RemoteObject} */ exception;
                            extraProperties.push(new WebInspector.RemoteObjectProperty("<exception>", WebInspector.RemoteObject.fromPayload(exceptionObject)));
                        }
                    }
                    break;
                case "closure":
                    title = WebInspector.UIString("Closure");
                    emptyPlaceholder = WebInspector.UIString("No Variables");
                    subtitle = null;
                    break;
                case "catch":
                    title = WebInspector.UIString("Catch");
                    subtitle = null;
                    break;
                case "with":
                    title = WebInspector.UIString("With Block");
                    break;
                case "global":
                    title = WebInspector.UIString("Global");
                    break;
            }

            if (!title || title === subtitle)
                subtitle = null;

            var section = new WebInspector.ObjectPropertiesSection(WebInspector.RemoteObject.fromPayload(scope.object), title, subtitle, emptyPlaceholder, true, extraProperties, WebInspector.ScopeVariableTreeElement);
            section.editInSelectedCallFrameWhenPaused = true;
            section.pane = this;

            if (!foundLocalScope || scope.type === "local" || title in this._expandedSections)
                section.expanded = true;

            this._sections.push(section);
            this.bodyElement.appendChild(section.element);
        }
    }
}

WebInspector.ScopeChainSidebarPane.prototype.__proto__ = WebInspector.SidebarPane.prototype;

/**
 * @constructor
 * @extends {WebInspector.ObjectPropertyTreeElement}
 * @param {WebInspector.RemoteObjectProperty} property
 */
WebInspector.ScopeVariableTreeElement = function(property)
{
    WebInspector.ObjectPropertyTreeElement.call(this, property);
}

WebInspector.ScopeVariableTreeElement.prototype = {
    onattach: function()
    {
        WebInspector.ObjectPropertyTreeElement.prototype.onattach.call(this);
        if (this.hasChildren && this.propertyIdentifier in this.treeOutline.section.pane._expandedProperties)
            this.expand();
    },

    onexpand: function()
    {
        this.treeOutline.section.pane._expandedProperties[this.propertyIdentifier] = true;
    },

    oncollapse: function()
    {
        delete this.treeOutline.section.pane._expandedProperties[this.propertyIdentifier];
    },

    get propertyIdentifier()
    {
        if ("_propertyIdentifier" in this)
            return this._propertyIdentifier;
        var section = this.treeOutline.section;
        this._propertyIdentifier = section.title + ":" + (section.subtitle ? section.subtitle + ":" : "") + this.propertyPath;
        return this._propertyIdentifier;
    },

    get propertyPath()
    {
        if ("_propertyPath" in this)
            return this._propertyPath;

        var current = this;
        var result;

        do {
            if (current.property) {
                if (result)
                    result = current.property.name + "." + result;
                else
                    result = current.property.name;
            }
            current = current.parent;
        } while (current && !current.root);

        this._propertyPath = result;
        return result;
    }
}

WebInspector.ScopeVariableTreeElement.prototype.__proto__ = WebInspector.ObjectPropertyTreeElement.prototype;
;
/*
 * Copyright (C) 2011 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * 1. Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY GOOGLE INC. AND ITS CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GOOGLE INC.
 * OR ITS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @extends {WebInspector.Object}
 * @constructor
 */
WebInspector.ScriptsNavigator = function()
{
    WebInspector.Object.call(this);
    
    this._tabbedPane = new WebInspector.TabbedPane();
    this._tabbedPane.shrinkableTabs = true;
    this._tabbedPane.element.addStyleClass("navigator-tabbed-pane");

    this._scriptsView = new WebInspector.NavigatorView();
    this._scriptsView.addEventListener(WebInspector.NavigatorView.Events.ItemSelected, this._scriptSelected, this);

    this._contentScriptsView = new WebInspector.NavigatorView();
    this._contentScriptsView.addEventListener(WebInspector.NavigatorView.Events.ItemSelected, this._scriptSelected, this);

    this._snippetsView = new WebInspector.SnippetsNavigatorView();
    this._snippetsView.addEventListener(WebInspector.NavigatorView.Events.ItemSelected, this._scriptSelected, this);
    this._snippetsView.addEventListener(WebInspector.NavigatorView.Events.FileRenamed, this._fileRenamed, this);
    this._snippetsView.addEventListener(WebInspector.SnippetsNavigatorView.Events.SnippetCreationRequested, this._snippetCreationRequested, this);
    this._snippetsView.addEventListener(WebInspector.SnippetsNavigatorView.Events.ItemRenamingRequested, this._itemRenamingRequested, this);

    this._tabbedPane.appendTab(WebInspector.ScriptsNavigator.ScriptsTab, WebInspector.UIString("Sources"), this._scriptsView);
    this._tabbedPane.selectTab(WebInspector.ScriptsNavigator.ScriptsTab);
    this._tabbedPane.appendTab(WebInspector.ScriptsNavigator.ContentScriptsTab, WebInspector.UIString("Content scripts"), this._contentScriptsView);
    if (WebInspector.experimentsSettings.snippetsSupport.isEnabled())
        this._tabbedPane.appendTab(WebInspector.ScriptsNavigator.SnippetsTab, WebInspector.UIString("Snippets"), this._snippetsView);
}

WebInspector.ScriptsNavigator.Events = {
    ScriptSelected: "ScriptSelected",
    SnippetCreationRequested: "SnippetCreationRequested",
    ItemRenamingRequested: "ItemRenamingRequested",
    FileRenamed: "FileRenamed"
}

WebInspector.ScriptsNavigator.ScriptsTab = "scripts";
WebInspector.ScriptsNavigator.ContentScriptsTab = "contentScripts";
WebInspector.ScriptsNavigator.SnippetsTab = "snippets";

WebInspector.ScriptsNavigator.prototype = {
    /*
     * @return {WebInspector.View}
     */
    get view()
    {
        return this._tabbedPane;
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    _snippetsNavigatorViewForUISourceCode: function(uiSourceCode)
    {
        if (uiSourceCode.isContentScript)
            return this._contentScriptsView;
        else if (uiSourceCode.isSnippet || uiSourceCode.isSnippetEvaluation)
            return this._snippetsView;
        else
            return this._scriptsView;
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    addUISourceCode: function(uiSourceCode)
    {
        this._snippetsNavigatorViewForUISourceCode(uiSourceCode).addUISourceCode(uiSourceCode);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    removeUISourceCode: function(uiSourceCode)
    {
        this._snippetsNavigatorViewForUISourceCode(uiSourceCode).removeUISourceCode(uiSourceCode);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     * @return {boolean}
     */
    isScriptSourceAdded: function(uiSourceCode)
    {
        return this._snippetsNavigatorViewForUISourceCode(uiSourceCode).isScriptSourceAdded(uiSourceCode);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    revealUISourceCode: function(uiSourceCode)
    {
        this._snippetsNavigatorViewForUISourceCode(uiSourceCode).revealUISourceCode(uiSourceCode);
        if (uiSourceCode.isContentScript)
            this._tabbedPane.selectTab(WebInspector.ScriptsNavigator.ContentScriptsTab);
        else if (uiSourceCode.isSnippet || uiSourceCode.isSnippetEvaluation)
            this._tabbedPane.selectTab(WebInspector.ScriptsNavigator.SnippetsTab);
        else
            this._tabbedPane.selectTab(WebInspector.ScriptsNavigator.ScriptsTab);
    },

    /**
     * @param {WebInspector.UISourceCode} oldUISourceCode
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    replaceUISourceCode: function(oldUISourceCode, uiSourceCode)
    {
        this._scriptsView.replaceUISourceCode(oldUISourceCode, uiSourceCode);
        this._contentScriptsView.replaceUISourceCode(oldUISourceCode, uiSourceCode);
        this._snippetsView.replaceUISourceCode(oldUISourceCode, uiSourceCode);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     * @param {function(boolean)=} callback
     */
    rename: function(uiSourceCode, callback)
    {
        this._snippetsNavigatorViewForUISourceCode(uiSourceCode).rename(uiSourceCode, callback);
    },

    /**
     * @param {WebInspector.Event} event
     */
    _scriptSelected: function(event)
    {
        this.dispatchEventToListeners(WebInspector.ScriptsNavigator.Events.ScriptSelected, event.data);
    },

    /**
     * @param {WebInspector.Event} event
     */
    _fileRenamed: function(event)
    {    
        this.dispatchEventToListeners(WebInspector.ScriptsNavigator.Events.FileRenamed, event.data);
    },

    /**
     * @param {WebInspector.Event} event
     */
    _itemRenamingRequested: function(event)
    {
        this.dispatchEventToListeners(WebInspector.ScriptsNavigator.Events.ItemRenamingRequested, event.data);
    },

    /**
     * @param {WebInspector.Event} event
     */
    _snippetCreationRequested: function(event)
    {    
        this.dispatchEventToListeners(WebInspector.ScriptsNavigator.Events.SnippetCreationRequested, event.data);
    },

    reset: function()
    {
        this._scriptsView.reset();
        this._contentScriptsView.reset();
        this._snippetsView.reset();
    }
}

WebInspector.ScriptsNavigator.prototype.__proto__ = WebInspector.Object.prototype;

/**
 * @constructor
 * @extends {WebInspector.NavigatorView}
 */
WebInspector.SnippetsNavigatorView = function()
{
    WebInspector.NavigatorView.call(this);
    this.element.addEventListener("contextmenu", this.handleContextMenu.bind(this), false);
}

WebInspector.SnippetsNavigatorView.Events = {
    SnippetCreationRequested: "SnippetCreationRequested",
    ItemRenamingRequested: "ItemRenamingRequested"
}

WebInspector.SnippetsNavigatorView.prototype = {
    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    getOrCreateFolderTreeElement: function(uiSourceCode)
    {
        return this._scriptsTree;
    },

    /**
     * @param {Event} event
     * @param {WebInspector.UISourceCode=} uiSourceCode
     */
    handleContextMenu: function(event, uiSourceCode)
    {
        var contextMenu = new WebInspector.ContextMenu();
        if (uiSourceCode) {
            contextMenu.appendItem(WebInspector.UIString("Run"), this._handleEvaluateSnippet.bind(this, uiSourceCode));
            contextMenu.appendItem(WebInspector.UIString("Rename"), this._handleRenameSnippet.bind(this, uiSourceCode));
            contextMenu.appendItem(WebInspector.UIString("Remove"), this._handleRemoveSnippet.bind(this, uiSourceCode));
            contextMenu.appendSeparator();
        }
        contextMenu.appendItem(WebInspector.UIString("New"), this._handleCreateSnippet.bind(this));
        contextMenu.show(event);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     * @param {Event} event
     */
    _handleEvaluateSnippet: function(uiSourceCode, event)
    {
        if (!uiSourceCode.isSnippet)
            return;
        var snippetJavaScriptSource = /** @type {WebInspector.SnippetJavaScriptSource} */ uiSourceCode;
        snippetJavaScriptSource.evaluate();
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     * @param {Event} event
     */
    _handleRenameSnippet: function(uiSourceCode, event)
    {
        this.dispatchEventToListeners(WebInspector.ScriptsNavigator.Events.ItemRenamingRequested, uiSourceCode);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     * @param {Event} event
     */
    _handleRemoveSnippet: function(uiSourceCode, event)
    {
        if (!uiSourceCode.isSnippet)
            return;
        var snippetJavaScriptSource = /** @type {WebInspector.SnippetJavaScriptSource} */ uiSourceCode;
        WebInspector.scriptSnippetModel.deleteScriptSnippet(snippetJavaScriptSource);
    },

    /**
     * @param {Event} event
     */
    _handleCreateSnippet: function(event)
    {
        this._snippetCreationRequested();
    },

    _snippetCreationRequested: function()
    {
        this.dispatchEventToListeners(WebInspector.SnippetsNavigatorView.Events.SnippetCreationRequested, null);
    }
}

WebInspector.SnippetsNavigatorView.prototype.__proto__ = WebInspector.NavigatorView.prototype;
;
/*
 * Copyright (C) 2011 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * 1. Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY GOOGLE INC. AND ITS CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GOOGLE INC.
 * OR ITS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @constructor
 * @implements {WebInspector.SearchScope}
 * @param {WebInspector.UISourceCodeProvider} uiSourceCodeProvider
 */
WebInspector.ScriptsSearchScope = function(uiSourceCodeProvider)
{
    // FIXME: Add title once it is used by search controller.
    WebInspector.SearchScope.call(this)
    this._searchId = 0;
    this._uiSourceCodeProvider = uiSourceCodeProvider;
}

WebInspector.ScriptsSearchScope.prototype = {
    /**
     * @param {WebInspector.SearchConfig} searchConfig
     * @param {function(WebInspector.FileBasedSearchResultsPane.SearchResult)} searchResultCallback
     * @param {function(boolean)} searchFinishedCallback
     */
    performSearch: function(searchConfig, searchResultCallback, searchFinishedCallback)
    {
        this.stopSearch();
        
        var uiSourceCodes = this._sortedUISourceCodes();
        var uiSourceCodeIndex = 0;
        
        function filterOutContentScripts(uiSourceCode)
        {
            return !uiSourceCode.isContentScript;
        }
        
        if (!WebInspector.settings.searchInContentScripts.get())
            uiSourceCodes = uiSourceCodes.filter(filterOutContentScripts);

        function continueSearch()
        {
            // FIXME: Enable support for counting matches for incremental search.
            // FIXME: Enable support for bounding search results/matches number to keep inspector responsive.
            if (uiSourceCodeIndex < uiSourceCodes.length) {
                var uiSourceCode = uiSourceCodes[uiSourceCodeIndex++];
                uiSourceCode.searchInContent(searchConfig.query, !searchConfig.ignoreCase, searchConfig.isRegex, searchCallbackWrapper.bind(this, this._searchId, uiSourceCode));
            } else 
                searchFinishedCallback(true);
        }

        function searchCallbackWrapper(searchId, uiSourceCode, searchMatches)
        {
            if (searchId !== this._searchId) {
                searchFinishedCallback(false);
                return;
            }
            var searchResult = new WebInspector.FileBasedSearchResultsPane.SearchResult(uiSourceCode, searchMatches);
            searchResultCallback(searchResult);
            if (searchId !== this._searchId) {
                searchFinishedCallback(false);
                return;
            }
            continueSearch.call(this);
        }
        
        continueSearch.call(this);
        return uiSourceCodes.length;
    },

    stopSearch: function()
    {
        ++this._searchId;
    },

    /**
     * @param {WebInspector.SearchConfig} searchConfig
     */
    createSearchResultsPane: function(searchConfig)
    {
        return new WebInspector.FileBasedSearchResultsPane(searchConfig);
    },

    /**
     * @return {Array.<WebInspector.UISourceCode>}
     */
    _sortedUISourceCodes: function()
    {
        function filterOutAnonymous(uiSourceCode)
        {
            return !!uiSourceCode.url;
        }
        
        function comparator(a, b)
        {
            return a.url.localeCompare(b.url);   
        }
        
        var uiSourceCodes = this._uiSourceCodeProvider.uiSourceCodes();
        
        uiSourceCodes = uiSourceCodes.filter(filterOutAnonymous);
        uiSourceCodes.sort(comparator);
        
        return uiSourceCodes;
    }
}

WebInspector.ScriptsSearchScope.prototype.__proto__ = WebInspector.SearchScope.prototype;
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
 * @extends {WebInspector.JavaScriptSourceFrame}
 * @param {WebInspector.ScriptsPanel} scriptsPanel
 * @param {WebInspector.SnippetJavaScriptSource} snippetJavaScriptSource
 */
WebInspector.SnippetJavaScriptSourceFrame = function(scriptsPanel, snippetJavaScriptSource)
{
    WebInspector.JavaScriptSourceFrame.call(this, scriptsPanel, snippetJavaScriptSource);
    
    this._snippetJavaScriptSource = snippetJavaScriptSource;
    this._runButton = new WebInspector.StatusBarButton(WebInspector.UIString("Run"), "evaluate-snippet-status-bar-item");
    this._runButton.addEventListener("click", this._runButtonClicked, this);
}

WebInspector.SnippetJavaScriptSourceFrame.prototype = {
    /**
     * @return {Array.<Element>}
     */
    statusBarItems: function()
    {
        return [this._runButton.element];
    },

    _runButtonClicked: function()
    {
        this._snippetJavaScriptSource.evaluate();
    }
}

WebInspector.SnippetJavaScriptSourceFrame.prototype.__proto__ = WebInspector.JavaScriptSourceFrame.prototype;
;
/*
 * Copyright (C) 2012 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * 1. Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY GOOGLE INC. AND ITS CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GOOGLE INC.
 * OR ITS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @constructor
 * @implements {WebInspector.SelectionDialogContentProvider}
 * @param {WebInspector.View} view
 * @param {WebInspector.StyleSource} styleSource
 */
WebInspector.StyleSheetOutlineDialog = function(view, styleSource)
{
    WebInspector.SelectionDialogContentProvider.call(this);

    this._rules = [];
    this._view = view;
    this._styleSource = styleSource;
}

/**
 * @param {WebInspector.View} view
 * @param {WebInspector.StyleSource} styleSource
 */
WebInspector.StyleSheetOutlineDialog.show = function(view, styleSource)
{
    if (WebInspector.Dialog.currentInstance())
        return null;
    var delegate = new WebInspector.StyleSheetOutlineDialog(view, styleSource);
    var filteredItemSelectionDialog = new WebInspector.FilteredItemSelectionDialog(delegate);
    WebInspector.Dialog.show(view.element, filteredItemSelectionDialog);
}

WebInspector.StyleSheetOutlineDialog.prototype = {
    /**
     * @param {number} itemIndex
     * @return {string}
     */
    itemTitleAt: function(itemIndex)
    {
        return this._rules[itemIndex].selectorText;
    },

    /*
     * @param {number} itemIndex
     * @return {string}
     */
    itemSubtitleAt: function(itemIndex)
    {
        return "";
    },

    /**
     * @param {number} itemIndex
     * @return {string}
     */
    itemKeyAt: function(itemIndex)
    {
        return this._rules[itemIndex].selectorText;
    },

    /**
     * @return {number}
     */
    itemsCount: function()
    {
        return this._rules.length;
    },

    /**
     * @param {function(number, number, number, number)} callback
     */
    requestItems: function(callback)
    {
        function didGetAllStyleSheets(error, infos)
        {
            if (error) {
                callback(0, 0, 0, 0);
                return;
            }
  
            for (var i = 0; i < infos.length; ++i) {
                var info = infos[i];
                if (info.sourceURL === this._styleSource.contentURL()) {
                    WebInspector.CSSStyleSheet.createForId(info.styleSheetId, didGetStyleSheet.bind(this));
                    return;
                }
            }
            callback(0, 0, 0, 0);
        }

        CSSAgent.getAllStyleSheets(didGetAllStyleSheets.bind(this));

        /**
         * @param {?WebInspector.CSSStyleSheet} styleSheet
         */
        function didGetStyleSheet(styleSheet)
        {
            if (!styleSheet) {
                callback(0, 0, 0, 0);
                return;
            }

            this._rules = styleSheet.rules;
            callback(0, this._rules.length, 0, 1);
        }
    },

    /**
     * @param {number} itemIndex
     * @param {string} promptValue
     */
    selectItem: function(itemIndex, promptValue)
    {
        var lineNumber = this._rules[itemIndex].sourceLine;
        if (!isNaN(lineNumber) && lineNumber >= 0)
            this._view.highlightLine(lineNumber);
        this._view.focus();
    },

    /**
     * @param {string} query
     * @return {string}
     */
    rewriteQuery: function(query)
    {
        return query;
    }
}

WebInspector.StyleSheetOutlineDialog.prototype.__proto__ = WebInspector.SelectionDialogContentProvider.prototype;
;
/*
 * Copyright (C) 2011 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * 1. Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY GOOGLE INC. AND ITS CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GOOGLE INC.
 * OR ITS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @interface
 */
WebInspector.TabbedEditorContainerDelegate = function() { }

WebInspector.TabbedEditorContainerDelegate.prototype = {
    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     * @return {WebInspector.SourceFrame}
     */
    viewForFile: function(uiSourceCode) { }
}

/**
 * @constructor
 * @extends {WebInspector.Object}
 * @param {WebInspector.TabbedEditorContainerDelegate} delegate
 * @param {string} settingName
 */
WebInspector.TabbedEditorContainer = function(delegate, settingName)
{
    WebInspector.Object.call(this);
    this._delegate = delegate;

    this._tabbedPane = new WebInspector.TabbedPane();
    this._tabbedPane.closeableTabs = true;
    this._tabbedPane.element.id = "scripts-editor-container-tabbed-pane";

    this._tabbedPane.addEventListener(WebInspector.TabbedPane.EventTypes.TabClosed, this._tabClosed, this);
    this._tabbedPane.addEventListener(WebInspector.TabbedPane.EventTypes.TabSelected, this._tabSelected, this);

    this._tabIds = new Map();
    this._files = {};
    this._loadedURLs = {};

    this._previouslyViewedFilesSetting = WebInspector.settings.createSetting(settingName, []);
    this._history = WebInspector.TabbedEditorContainer.History.fromObject(this._previouslyViewedFilesSetting.get());
}


WebInspector.TabbedEditorContainer.Events = {
    EditorSelected: "EditorSelected",
    EditorClosed: "EditorClosed"
}

WebInspector.TabbedEditorContainer._tabId = 0;

WebInspector.TabbedEditorContainer.maximalPreviouslyViewedFilesCount = 30;

WebInspector.TabbedEditorContainer.prototype = {
    /**
     * @return {WebInspector.View}
     */
    get view()
    {
        return this._tabbedPane;
    },

    /**
     * @type {WebInspector.SourceFrame}
     */
    get visibleView()
    {
        return this._tabbedPane.visibleView;
    },

    /**
     * @param {Element} parentElement
     */
    show: function(parentElement)
    {
        this._tabbedPane.show(parentElement);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    showFile: function(uiSourceCode)
    {
        this._innerShowFile(uiSourceCode, true);
    },

    _addScrollAndSelectionListeners: function()
    {
        console.assert(this._currentFile);
        var sourceFrame = this._delegate.viewForFile(this._currentFile);
        sourceFrame.addEventListener(WebInspector.SourceFrame.Events.ScrollChanged, this._scrollChanged, this);
        sourceFrame.addEventListener(WebInspector.SourceFrame.Events.SelectionChanged, this._selectionChanged, this);
    },

    _removeScrollAndSelectionListeners: function()
    {
        if (!this._currentFile)
            return;
        var sourceFrame = this._delegate.viewForFile(this._currentFile);
        sourceFrame.removeEventListener(WebInspector.SourceFrame.Events.ScrollChanged, this._scrollChanged, this);
        sourceFrame.removeEventListener(WebInspector.SourceFrame.Events.SelectionChanged, this._selectionChanged, this);
    },

    _scrollChanged: function(event)
    {
        var lineNumber = /** @type {number} */ event.data;
        this._history.updateScrollLineNumber(this._currentFile.url, lineNumber);
        this._history.save(this._previouslyViewedFilesSetting);
    },

    _selectionChanged: function(event)
    {
        var range = /** @type {WebInspector.TextRange} */ event.data;
        this._history.updateSelectionRange(this._currentFile.url, range);
        this._history.save(this._previouslyViewedFilesSetting);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     * @param {boolean=} userGesture
     */
    _innerShowFile: function(uiSourceCode, userGesture)
    {
        if (this._currentFile === uiSourceCode)
            return;
        this._removeScrollAndSelectionListeners();
        this._currentFile = uiSourceCode;

        var tabId = this._tabIds.get(uiSourceCode) || this._appendFileTab(uiSourceCode, userGesture);
        
        this._tabbedPane.selectTab(tabId, userGesture);
        if (userGesture)
            this._editorSelectedByUserAction();
        
        this._addScrollAndSelectionListeners();
        
        this.dispatchEventToListeners(WebInspector.TabbedEditorContainer.Events.EditorSelected, this._currentFile);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     * @return {string}
     */
    _titleForFile: function(uiSourceCode)
    {
        const maxDisplayNameLength = 30;
        const minDisplayQueryParamLength = 5;

        var title;
        var parsedURL = uiSourceCode.parsedURL;
        if (!parsedURL.isValid)
            title = parsedURL.url ? parsedURL.url.trimMiddle(maxDisplayNameLength) : WebInspector.UIString("(program)");
        else {
            var maxDisplayQueryParamLength = Math.max(minDisplayQueryParamLength, maxDisplayNameLength - parsedURL.lastPathComponent.length);
            var displayQueryParams = parsedURL.queryParams ? "?" + parsedURL.queryParams.trimEnd(maxDisplayQueryParamLength - 1) : "";
            var displayLastPathComponent = parsedURL.lastPathComponent.trimMiddle(maxDisplayNameLength - displayQueryParams.length);
            var displayName = displayLastPathComponent + displayQueryParams;
            title = displayName || WebInspector.UIString("(program)");
        }
        
        if (uiSourceCode.isDirty())
            title += "*";
        return title;
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    addUISourceCode: function(uiSourceCode)
    {
        if (this._userSelectedFiles || this._loadedURLs[uiSourceCode.url])
            return;
        this._loadedURLs[uiSourceCode.url] = true;

        var index = this._history.index(uiSourceCode.url)
        if (index === -1)
            return;

        var tabId = this._tabIds.get(uiSourceCode) || this._appendFileTab(uiSourceCode, false);

        // Select tab if this file was the last to be shown.
        if (index === 0)
            this._innerShowFile(uiSourceCode, false);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    removeUISourceCode: function(uiSourceCode)
    {
        var tabId = this._tabIds.get(uiSourceCode);
        if (tabId)
            this._tabbedPane.closeTab(tabId);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    _editorClosedByUserAction: function(uiSourceCode)
    {
        this._userSelectedFiles = true;
        this._history.remove(uiSourceCode.url);
        this._updateHistory();
    },

    _editorSelectedByUserAction: function()
    {
        this._userSelectedFiles = true;
        this._updateHistory();
    },

    _updateHistory: function()
    {
        var tabIds = this._tabbedPane.lastOpenedTabIds(WebInspector.TabbedEditorContainer.maximalPreviouslyViewedFilesCount);
        
        function tabIdToURL(tabId)
        {
            return this._files[tabId].url;
        }
        
        this._history.update(tabIds.map(tabIdToURL.bind(this)));
        this._history.save(this._previouslyViewedFilesSetting);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     * @return {string}
     */
    _tooltipForFile: function(uiSourceCode)
    {
        return uiSourceCode.url;
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     * @param {boolean=} userGesture
     */
    _appendFileTab: function(uiSourceCode, userGesture)
    {
        var view = this._delegate.viewForFile(uiSourceCode);
        var title = this._titleForFile(uiSourceCode);
        var tooltip = this._tooltipForFile(uiSourceCode);

        var tabId = this._generateTabId();
        this._tabIds.put(uiSourceCode, tabId);
        this._files[tabId] = uiSourceCode;

        var savedScrollLineNumber = this._history.scrollLineNumber(uiSourceCode.url);
        if (savedScrollLineNumber)
            view.scrollToLine(savedScrollLineNumber);
        var savedSelectionRange = this._history.selectionRange(uiSourceCode.url);
        if (savedSelectionRange)
            view.setSelection(savedSelectionRange);

        this._tabbedPane.appendTab(tabId, title, view, tooltip, userGesture);

        this._addUISourceCodeListeners(uiSourceCode);
        return tabId;
    },

    /**
     * @param {WebInspector.Event} event
     */
    _tabClosed: function(event)
    {
        var tabId = /** @type {string} */ event.data.tabId;
        var userGesture = /** @type {boolean} */ event.data.isUserGesture;

        var uiSourceCode = this._files[tabId];
        if (this._currentFile === uiSourceCode) {
            this._removeScrollAndSelectionListeners();
            delete this._currentFile;
        }
        this._tabIds.remove(uiSourceCode);
        delete this._files[tabId];

        this._removeUISourceCodeListeners(uiSourceCode);

        this.dispatchEventToListeners(WebInspector.TabbedEditorContainer.Events.EditorClosed, uiSourceCode);

        if (userGesture)
            this._editorClosedByUserAction(uiSourceCode);
    },

    /**
     * @param {WebInspector.Event} event
     */
    _tabSelected: function(event)
    {
        var tabId = /** @type {string} */ event.data.tabId;
        var userGesture = /** @type {boolean} */ event.data.isUserGesture;

        var uiSourceCode = this._files[tabId];
        this._innerShowFile(uiSourceCode, userGesture);
    },

    /**
     * @param {WebInspector.UISourceCode} oldUISourceCode
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    replaceFile: function(oldUISourceCode, uiSourceCode)
    {
        var tabId = this._tabIds.get(oldUISourceCode);
        
        if (!tabId)
            return;
        
        delete this._files[this._tabIds.get(oldUISourceCode)]
        this._tabIds.remove(oldUISourceCode);
        this._tabIds.put(uiSourceCode, tabId);
        this._files[tabId] = uiSourceCode;

        this._tabbedPane.changeTabTitle(tabId, this._titleForFile(uiSourceCode));
        this._tabbedPane.changeTabView(tabId, this._delegate.viewForFile(uiSourceCode));
        this._tabbedPane.changeTabTooltip(tabId, this._tooltipForFile(uiSourceCode));

        this._removeUISourceCodeListeners(oldUISourceCode);
        this._addUISourceCodeListeners(uiSourceCode);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    _addUISourceCodeListeners: function(uiSourceCode)
    {
        uiSourceCode.addEventListener(WebInspector.UISourceCode.Events.TitleChanged, this._uiSourceCodeTitleChanged, this);
        uiSourceCode.addEventListener(WebInspector.UISourceCode.Events.WorkingCopyChanged, this._uiSourceCodeWorkingCopyChanged, this);
        uiSourceCode.addEventListener(WebInspector.UISourceCode.Events.ContentChanged, this._uiSourceCodeContentChanged, this);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    _removeUISourceCodeListeners: function(uiSourceCode)
    {
        uiSourceCode.removeEventListener(WebInspector.UISourceCode.Events.TitleChanged, this._uiSourceCodeTitleChanged, this);
        uiSourceCode.removeEventListener(WebInspector.UISourceCode.Events.WorkingCopyChanged, this._uiSourceCodeWorkingCopyChanged, this);
        uiSourceCode.removeEventListener(WebInspector.UISourceCode.Events.ContentChanged, this._uiSourceCodeContentChanged, this);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    _updateFileTitle: function(uiSourceCode)
    {
        var tabId = this._tabIds.get(uiSourceCode);
        if (tabId) {
            var title = this._titleForFile(uiSourceCode);
            this._tabbedPane.changeTabTitle(tabId, title);
        }
    },

    _uiSourceCodeTitleChanged: function(event)
    {
        var uiSourceCode = /** @type {WebInspector.UISourceCode} */ event.target;
        this._updateFileTitle(uiSourceCode);
    },

    _uiSourceCodeWorkingCopyChanged: function(event)
    {
        var uiSourceCode = /** @type {WebInspector.UISourceCode} */ event.target;
        this._updateFileTitle(uiSourceCode);
    },

    _uiSourceCodeContentChanged: function(event)
    {
        var uiSourceCode = /** @type {WebInspector.UISourceCode} */ event.target;
        this._updateFileTitle(uiSourceCode);
    },

    reset: function()
    {
        this._tabbedPane.closeAllTabs();
        this._tabIds = new Map();
        this._files = {};
        delete this._currentFile;
        delete this._userSelectedFiles;
        this._loadedURLs = {};
    },

    /**
     * @return {string}
     */
    _generateTabId: function()
    {
        return "tab_" + (WebInspector.TabbedEditorContainer._tabId++);
    },

    /**
     * @return {WebInspector.UISourceCode} uiSourceCode
     */
    currentFile: function()
    {
        return this._currentFile;
    }
}

WebInspector.TabbedEditorContainer.prototype.__proto__ = WebInspector.Object.prototype;

/**
 * @constructor
 * @param {string} url
 * @param {WebInspector.TextRange=} selectionRange
 * @param {number=} scrollLineNumber
 */
WebInspector.TabbedEditorContainer.HistoryItem = function(url, selectionRange, scrollLineNumber)
{
    this.url = url;
    this.selectionRange = selectionRange;
    this.scrollLineNumber = scrollLineNumber;
}

/**
 * @param {Object} serializedHistoryItem
 * @return {WebInspector.TabbedEditorContainer.HistoryItem}
 */
WebInspector.TabbedEditorContainer.HistoryItem.fromObject = function (serializedHistoryItem)
{
    var selectionRange = serializedHistoryItem.selectionRange ? WebInspector.TextRange.fromObject(serializedHistoryItem.selectionRange) : null;
    return new WebInspector.TabbedEditorContainer.HistoryItem(serializedHistoryItem.url, selectionRange, serializedHistoryItem.scrollLineNumber);
}

WebInspector.TabbedEditorContainer.HistoryItem.prototype = {
    /**
     * @return {Object}
     */
    serializeToObject: function()
    {
        var serializedHistoryItem = {};
        serializedHistoryItem.url = this.url;
        serializedHistoryItem.selectionRange = this.selectionRange;
        serializedHistoryItem.scrollLineNumber = this.scrollLineNumber;
        return serializedHistoryItem;
    }
}

WebInspector.TabbedEditorContainer.HistoryItem.prototype.__proto__ = WebInspector.Object.prototype;

/**
 * @constructor
 * @param {Array.<WebInspector.TabbedEditorContainer.HistoryItem>} items
 */
WebInspector.TabbedEditorContainer.History = function(items)
{
    this._items = items;
}

/**
 * @param {Object} serializedHistory
 * @return {WebInspector.TabbedEditorContainer.History}
 */
WebInspector.TabbedEditorContainer.History.fromObject = function(serializedHistory)
{
    var items = [];
    for (var i = 0; i < serializedHistory.length; ++i)
        items.push(WebInspector.TabbedEditorContainer.HistoryItem.fromObject(serializedHistory[i]));
    return new WebInspector.TabbedEditorContainer.History(items);
}

WebInspector.TabbedEditorContainer.History.prototype = {
    /**
     * @param {string} url
     * @return {number}
     */
    index: function(url)
    {
        for (var i = 0; i < this._items.length; ++i) {
            if (this._items[i].url === url)
                return i;
        }
        return -1;
    },

    /**
     * @param {string} url
     * @return {WebInspector.TextRange|undefined}
     */
    selectionRange: function(url)
    {
        var index = this.index(url);
        return index !== -1 ? this._items[index].selectionRange : undefined;
    },

    /**
     * @param {string} url
     * @param {WebInspector.TextRange} selectionRange
     */
    updateSelectionRange: function(url, selectionRange)
    {
        if (!selectionRange)
            return;
        var index = this.index(url);
        if (index === -1)
            return;
        this._items[index].selectionRange = selectionRange;
    },

    /**
     * @param {string} url
     * @return {number|undefined}
     */
    scrollLineNumber: function(url)
    {
        var index = this.index(url);
        return index !== -1 ? this._items[index].scrollLineNumber : undefined;
    },

    /**
     * @param {string} url
     * @param {number} scrollLineNumber
     */
    updateScrollLineNumber: function(url, scrollLineNumber)
    {
        var index = this.index(url);
        if (index === -1)
            return;
        this._items[index].scrollLineNumber = scrollLineNumber;
    },

    /**
     * @param {Array.<string>} urls
     */
    update: function(urls)
    {
        for (var i = urls.length - 1; i >= 0; --i) {
            var index = this.index(urls[i]);
            var item;
            if (index !== -1) {
                item = this._items[index];
                this._items.splice(index, 1);
            } else
                item = new WebInspector.TabbedEditorContainer.HistoryItem(urls[i]);
            this._items.unshift(item);
        }
    },

    /**
     * @param {string} url
     */
    remove: function(url)
    {
        var index = this.index(url);
        if (index !== -1)
            this._items.splice(index, 1);
    },
    
    /**
     * @param {WebInspector.Setting} setting
     */
    save: function(setting)
    {
        setting.set(this._serializeToObject());
    },
    
    /**
     * @return {Object}
     */
    _serializeToObject: function()
    {
        var serializedHistory = [];
        for (var i = 0; i < this._items.length; ++i)
            serializedHistory.push(this._items[i].serializeToObject());
        return serializedHistory;
    }
}

WebInspector.TabbedEditorContainer.History.prototype.__proto__ = WebInspector.Object.prototype;
;
/*
 * Copyright (C) 2012 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * 1. Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY GOOGLE INC. AND ITS CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL GOOGLE INC.
 * OR ITS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * @constructor
 * @extends {WebInspector.SourceFrame}
 * @param {WebInspector.UISourceCode} uiSourceCode
 */
WebInspector.UISourceCodeFrame = function(uiSourceCode)
{
    this._uiSourceCode = uiSourceCode;
    WebInspector.SourceFrame.call(this, this._uiSourceCode);
    this._uiSourceCode.addEventListener(WebInspector.UISourceCode.Events.ContentChanged, this._onContentChanged, this);
}

WebInspector.UISourceCodeFrame.prototype = {
    /**
     * @return {boolean}
     */
    canEditSource: function()
    {
        return true;
    },

    /**
     * @param {string} text
     */
    commitEditing: function(text)
    {
        if (!this._uiSourceCode.isDirty())
            return;

        this._isCommittingEditing = true;
        this._uiSourceCode.commitWorkingCopy(this._didEditContent.bind(this));
        delete this._isCommittingEditing;
    },

    onTextChanged: function(oldRange, newRange)
    {
        this._uiSourceCode.setWorkingCopy(this._textEditor.text());
    },

    _didEditContent: function(error)
    {
        if (error) {
            WebInspector.log(error, WebInspector.ConsoleMessage.MessageLevel.Error, true);
            return;
        }
    },

    /**
     * @param {WebInspector.Event} event
     */
    _onContentChanged: function(event)
    {
        if (!this._isCommittingEditing)
            this.setContent(this._uiSourceCode.content() || "", false, this._uiSourceCode.contentType().canonicalMimeType());
    },

    populateTextAreaContextMenu: function(contextMenu, lineNumber)
    {
        WebInspector.SourceFrame.prototype.populateTextAreaContextMenu.call(this, contextMenu, lineNumber);
        contextMenu.appendApplicableItems(this._uiSourceCode);
        contextMenu.appendSeparator();
    }
}

WebInspector.UISourceCodeFrame.prototype.__proto__ = WebInspector.SourceFrame.prototype;
;
/*
 * Copyright (C) IBM Corp. 2009  All rights reserved.
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
 *     * Neither the name of IBM Corp. nor the names of its
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
 * @extends {WebInspector.SidebarPane}
 */
WebInspector.WatchExpressionsSidebarPane = function()
{
    WebInspector.SidebarPane.call(this, WebInspector.UIString("Watch Expressions"));
}

WebInspector.WatchExpressionsSidebarPane.prototype = {
    show: function()
    {
        this._visible = true;

        // Expand and update watches first time they are shown.
        if (this._wasShown) {
            this._refreshExpressionsIfNeeded();
            return;
        }

        this._wasShown = true;

        this.section = new WebInspector.WatchExpressionsSection();
        this.bodyElement.appendChild(this.section.element);
    
        var refreshButton = document.createElement("button");
        refreshButton.className = "pane-title-button refresh";
        refreshButton.addEventListener("click", this._refreshButtonClicked.bind(this), false);
        this.titleElement.appendChild(refreshButton);
    
        var addButton = document.createElement("button");
        addButton.className = "pane-title-button add";
        addButton.addEventListener("click", this._addButtonClicked.bind(this), false);
        this.titleElement.appendChild(addButton);
        this._requiresUpdate = true;

        if (WebInspector.settings.watchExpressions.get().length > 0)
            this.expanded = true;
    },

    hide: function()
    {
        this._visible = false;
    },

    reset: function()
    {
        this.refreshExpressions();
    },

    refreshExpressions: function()
    {
        this._requiresUpdate = true;
        this._refreshExpressionsIfNeeded();
    },

    addExpression: function(expression)
    {
        this.section.addExpression(expression);
        this.expanded = true;
    },

    _refreshExpressionsIfNeeded: function()
    {
        if (this._requiresUpdate && this._visible) {
            this.section.update();
            delete this._requiresUpdate;
        } else
            this._requiresUpdate = true;
    },

    _addButtonClicked: function(event)
    {
        event.consume();
        this.expanded = true;
        this.section.addNewExpressionAndEdit();
    },

    _refreshButtonClicked: function(event)
    {
        event.consume();
        this.refreshExpressions();
    }
}

WebInspector.WatchExpressionsSidebarPane.prototype.__proto__ = WebInspector.SidebarPane.prototype;

/**
 * @constructor
 * @extends {WebInspector.ObjectPropertiesSection}
 */
WebInspector.WatchExpressionsSection = function()
{
    this._watchObjectGroupId = "watch-group";

    WebInspector.ObjectPropertiesSection.call(this);

    this.emptyElement = document.createElement("div");
    this.emptyElement.className = "info";
    this.emptyElement.textContent = WebInspector.UIString("No Watch Expressions");

    this.watchExpressions = WebInspector.settings.watchExpressions.get();

    this.headerElement.className = "hidden";
    this.editable = true;
    this.expanded = true;
    this.propertiesElement.addStyleClass("watch-expressions");

    this.element.addEventListener("mousemove", this._mouseMove.bind(this), true);
    this.element.addEventListener("mouseout", this._mouseOut.bind(this), true);
    this.element.addEventListener("dblclick", this._sectionDoubleClick.bind(this), false);
}

WebInspector.WatchExpressionsSection.NewWatchExpression = "\xA0";

WebInspector.WatchExpressionsSection.prototype = {
    update: function(e)
    {
        if (e)
            e.consume();

        function appendResult(expression, watchIndex, result, wasThrown)
        {
            if (!result)
                return;

            var property = new WebInspector.RemoteObjectProperty(expression, result);
            property.watchIndex = watchIndex;
            property.wasThrown = wasThrown;

            // To clarify what's going on here:
            // In the outer function, we calculate the number of properties
            // that we're going to be updating, and set that in the
            // propertyCount variable.
            // In this function, we test to see when we are processing the
            // last property, and then call the superclass's updateProperties()
            // method to get all the properties refreshed at once.
            properties.push(property);

            if (properties.length == propertyCount) {
                this.updateProperties(properties, WebInspector.WatchExpressionTreeElement, WebInspector.WatchExpressionsSection.CompareProperties);

                // check to see if we just added a new watch expression,
                // which will always be the last property
                if (this._newExpressionAdded) {
                    delete this._newExpressionAdded;

                    var treeElement = this.findAddedTreeElement();
                    if (treeElement)
                        treeElement.startEditing();
                }

                // Force displaying delete button for hovered element.
                if (this._lastMouseMovePageY)
                    this._updateHoveredElement(this._lastMouseMovePageY);
            }
        }

        // TODO: pass exact injected script id.
        RuntimeAgent.releaseObjectGroup(this._watchObjectGroupId)
        var properties = [];

        // Count the properties, so we known when to call this.updateProperties()
        // in appendResult()
        var propertyCount = 0;
        for (var i = 0; i < this.watchExpressions.length; ++i) {
            if (!this.watchExpressions[i])
                continue;
            ++propertyCount;
        }

        // Now process all the expressions, since we have the actual count,
        // which is checked in the appendResult inner function.
        for (var i = 0; i < this.watchExpressions.length; ++i) {
            var expression = this.watchExpressions[i];
            if (!expression)
                continue;

            WebInspector.consoleView.evalInInspectedWindow(expression, this._watchObjectGroupId, false, true, false, appendResult.bind(this, expression, i));
        }

        if (!propertyCount) {
            if (!this.emptyElement.parentNode)
                this.element.appendChild(this.emptyElement);
        } else {
            if (this.emptyElement.parentNode)
                this.element.removeChild(this.emptyElement);
        }

        // note this is setting the expansion of the tree, not the section;
        // with no expressions, and expanded tree, we get some extra vertical
        // white space
        this.expanded = (propertyCount != 0);
    },

    addExpression: function(expression)
    {
        this.watchExpressions.push(expression);
        this.saveExpressions();
        this.update();
    },

    addNewExpressionAndEdit: function()
    {
        this._newExpressionAdded = true;
        this.watchExpressions.push(WebInspector.WatchExpressionsSection.NewWatchExpression);
        this.update();
    },

    _sectionDoubleClick: function(event)
    {
        if (event.target !== this.element && event.target !== this.propertiesElement && event.target !== this.emptyElement)
            return;
        event.consume();
        this.addNewExpressionAndEdit();
    },

    updateExpression: function(element, value)
    {
        if (value === null) {
            var index = element.property.watchIndex;
            this.watchExpressions.splice(index, 1);
        }
        else
            this.watchExpressions[element.property.watchIndex] = value;
        this.saveExpressions();
        this.update();
    },
    
    _deleteAllExpressions: function()
    {
        this.watchExpressions = [];
        this.saveExpressions();
        this.update();
    },

    findAddedTreeElement: function()
    {
        var children = this.propertiesTreeOutline.children;
        for (var i = 0; i < children.length; ++i) {
            if (children[i].property.name === WebInspector.WatchExpressionsSection.NewWatchExpression)
                return children[i];
        }
    },

    saveExpressions: function()
    {
        var toSave = [];
        for (var i = 0; i < this.watchExpressions.length; i++)
            if (this.watchExpressions[i])
                toSave.push(this.watchExpressions[i]);

        WebInspector.settings.watchExpressions.set(toSave);
        return toSave.length;
    },

    _mouseMove: function(e)
    {
        if (this.propertiesElement.firstChild)
            this._updateHoveredElement(e.pageY);
    },

    _mouseOut: function()
    {
        if (this._hoveredElement) {
            this._hoveredElement.removeStyleClass("hovered");
            delete this._hoveredElement;
        }
        delete this._lastMouseMovePageY;
    },

    _updateHoveredElement: function(pageY)
    {
        var candidateElement = this.propertiesElement.firstChild;
        while (true) {
            var next = candidateElement.nextSibling;
            while (next && !next.clientHeight)
                next = next.nextSibling;
            if (!next || next.totalOffsetTop() > pageY)
                break;
            candidateElement = next;
        }

        if (this._hoveredElement !== candidateElement) {
            if (this._hoveredElement)
                this._hoveredElement.removeStyleClass("hovered");
            if (candidateElement)
                candidateElement.addStyleClass("hovered");
            this._hoveredElement = candidateElement;
        }

        this._lastMouseMovePageY = pageY;
    }
}

WebInspector.WatchExpressionsSection.prototype.__proto__ = WebInspector.ObjectPropertiesSection.prototype;

WebInspector.WatchExpressionsSection.CompareProperties = function(propertyA, propertyB)
{
    if (propertyA.watchIndex == propertyB.watchIndex)
        return 0;
    else if (propertyA.watchIndex < propertyB.watchIndex)
        return -1;
    else
        return 1;
}

/**
 * @constructor
 * @extends {WebInspector.ObjectPropertyTreeElement}
 */
WebInspector.WatchExpressionTreeElement = function(property)
{
    WebInspector.ObjectPropertyTreeElement.call(this, property);
}

WebInspector.WatchExpressionTreeElement.prototype = {
    update: function()
    {
        WebInspector.ObjectPropertyTreeElement.prototype.update.call(this);

        if (this.property.wasThrown)
            this.valueElement.addStyleClass("watch-expressions-error-level");

        var deleteButton = document.createElement("input");
        deleteButton.type = "button";
        deleteButton.title = WebInspector.UIString("Delete watch expression.");
        deleteButton.addStyleClass("enabled-button");
        deleteButton.addStyleClass("delete-button");
        deleteButton.addEventListener("click", this._deleteButtonClicked.bind(this), false);
        this.listItemElement.addEventListener("contextmenu", this._contextMenu.bind(this), false);
        this.listItemElement.insertBefore(deleteButton, this.listItemElement.firstChild);
    },
    
    _contextMenu: function(event)
    {
        var contextMenu = new WebInspector.ContextMenu();
        contextMenu.appendItem(WebInspector.UIString("Delete watch expression"), this._deleteButtonClicked.bind(this));
        if (this.treeOutline.section.watchExpressions.length > 1)
            contextMenu.appendItem(WebInspector.UIString("Delete all watch expressions"), this._deleteAllButtonClicked.bind(this));
        contextMenu.show(event);
    },
    
    _deleteAllButtonClicked: function()
    {
        this.treeOutline.section._deleteAllExpressions();
    },

    _deleteButtonClicked: function()
    {
        this.treeOutline.section.updateExpression(this, null);
    },

    renderPromptAsBlock: function()
    {
        return true;
    },

    /**
     * @param {Event=} event
     */
    elementAndValueToEdit: function(event)
    {
        return [this.nameElement, this.property.name.trim()];
    },

    editingCancelled: function(element, context)
    {
        if (!context.elementToEdit.textContent)
            this.treeOutline.section.updateExpression(this, null);

        WebInspector.ObjectPropertyTreeElement.prototype.editingCancelled.call(this, element, context);
    },

    applyExpression: function(expression, updateInterface)
    {
        expression = expression.trim();

        if (!expression)
            expression = null;

        this.property.name = expression;
        this.treeOutline.section.updateExpression(this, expression);
    }
}

WebInspector.WatchExpressionTreeElement.prototype.__proto__ = WebInspector.ObjectPropertyTreeElement.prototype;
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

/**
 * @constructor
 */
WebInspector.Worker = function(id, url, shared)
{
    this.id = id;
    this.url = url;
    this.shared = shared;
}

/**
 * @constructor
 * @extends {WebInspector.SidebarPane}
 */
WebInspector.WorkersSidebarPane = function(workerManager)
{
    WebInspector.SidebarPane.call(this, WebInspector.UIString("Workers"));

    this._enableWorkersCheckbox = new WebInspector.Checkbox(
        WebInspector.UIString("Pause on start"),
        "sidebar-label",
        WebInspector.UIString("Automatically attach to new workers and pause them. Enabling this option will force opening inspector for all new workers."));
    this._enableWorkersCheckbox.element.id = "pause-workers-checkbox";
    this.bodyElement.appendChild(this._enableWorkersCheckbox.element);
    this._enableWorkersCheckbox.addEventListener(this._autoattachToWorkersClicked.bind(this));
    this._enableWorkersCheckbox.checked = false;

    if (Preferences.sharedWorkersDebugNote) {
        var note = this.bodyElement.createChild("div");
        note.id = "shared-workers-list";
        note.addStyleClass("sidebar-label")
        note.textContent = Preferences.sharedWorkersDebugNote;
    }

    var separator = this.bodyElement.createChild("div", "sidebar-separator");
    separator.textContent = WebInspector.UIString("Dedicated worker inspectors");

    this._workerListElement = document.createElement("ol");
    this._workerListElement.tabIndex = 0;
    this._workerListElement.addStyleClass("properties-tree");
    this._workerListElement.addStyleClass("sidebar-label");
    this.bodyElement.appendChild(this._workerListElement);

    this._idToWorkerItem = {};
    this._workerManager = workerManager;

    workerManager.addEventListener(WebInspector.WorkerManager.Events.WorkerAdded, this._workerAdded, this);
    workerManager.addEventListener(WebInspector.WorkerManager.Events.WorkerRemoved, this._workerRemoved, this);
    workerManager.addEventListener(WebInspector.WorkerManager.Events.WorkersCleared, this._workersCleared, this);
}

WebInspector.WorkersSidebarPane.prototype = {
    _workerAdded: function(event)
    {
        this._addWorker(event.data.workerId, event.data.url, event.data.inspectorConnected);
    },

    _workerRemoved: function(event)
    {
        var workerItem = this._idToWorkerItem[event.data];
        delete this._idToWorkerItem[event.data];
        workerItem.parentElement.removeChild(workerItem);
    },

    _workersCleared: function(event)
    {
        this._idToWorkerItem = {};
        this._workerListElement.removeChildren();
    },

    _addWorker: function(workerId, url, inspectorConnected)
    {
        var item = this._workerListElement.createChild("div", "dedicated-worker-item");
        var link = item.createChild("a");
        link.textContent = url;
        link.href = "#";
        link.target = "_blank";
        link.addEventListener("click", this._workerItemClicked.bind(this, workerId), true);
        this._idToWorkerItem[workerId] = item;
    },

    _workerItemClicked: function(workerId, event)
    {
        event.preventDefault();
        this._workerManager.openWorkerInspector(workerId);
    },

    _autoattachToWorkersClicked: function(event)
    {
        WorkerAgent.setAutoconnectToWorkers(event.target.checked);
    }
}

WebInspector.WorkersSidebarPane.prototype.__proto__ = WebInspector.SidebarPane.prototype;
;

/**
 * @constructor
 * @implements {WebInspector.TabbedEditorContainerDelegate}
 * @implements {WebInspector.ContextMenu.Provider}
 * @extends {WebInspector.Panel}
 * @param {WebInspector.Workspace=} workspaceForTest
 */
WebInspector.ScriptsPanel = function(workspaceForTest)
{
    WebInspector.Panel.call(this, "scripts");
    this.registerRequiredCSS("scriptsPanel.css");

    WebInspector.settings.navigatorWasOnceHidden = WebInspector.settings.createSetting("navigatorWasOnceHidden", false);
    WebInspector.settings.debuggerSidebarHidden = WebInspector.settings.createSetting("debuggerSidebarHidden", false);

    this._workspace = workspaceForTest || WebInspector.workspace;

    function viewGetter()
    {
        return this.visibleView;
    }
    WebInspector.GoToLineDialog.install(this, viewGetter.bind(this));

    var helpSection = WebInspector.shortcutsScreen.section(WebInspector.UIString("Sources Panel"));
    this.debugToolbar = this._createDebugToolbar(helpSection);

    const initialDebugSidebarWidth = 225;
    const maximalDebugSidebarWidthPercent = 50;
    this.createSplitView(this.element, WebInspector.SplitView.SidebarPosition.Right, initialDebugSidebarWidth);
    this.splitView.element.id = "scripts-split-view";
    this.splitView.minimalSidebarWidth = Preferences.minScriptsSidebarWidth;
    this.splitView.minimalMainWidthPercent = 100 - maximalDebugSidebarWidthPercent;

    this.sidebarElement.appendChild(this.debugToolbar);

    this.debugSidebarResizeWidgetElement = document.createElement("div");
    this.debugSidebarResizeWidgetElement.id = "scripts-debug-sidebar-resizer-widget";
    this.splitView.installResizer(this.debugSidebarResizeWidgetElement);

    // Create scripts navigator
    const initialNavigatorWidth = 225;
    const minimalViewsContainerWidthPercent = 50;
    this.editorView = new WebInspector.SplitView(WebInspector.SplitView.SidebarPosition.Left, "scriptsPanelNavigatorSidebarWidth", initialNavigatorWidth);
    this.editorView.element.tabIndex = 0;

    this.editorView.minimalSidebarWidth = Preferences.minScriptsSidebarWidth;
    this.editorView.minimalMainWidthPercent = minimalViewsContainerWidthPercent;
    this.editorView.show(this.splitView.mainElement);

    this._navigator = new WebInspector.ScriptsNavigator();
    this._navigator.view.show(this.editorView.sidebarElement);

    this._editorContainer = new WebInspector.TabbedEditorContainer(this, "previouslyViewedFiles");
    this._editorContainer.show(this.editorView.mainElement);

    this._navigatorController = new WebInspector.NavigatorOverlayController(this.editorView, this._navigator.view, this._editorContainer.view);

    this._navigator.addEventListener(WebInspector.ScriptsNavigator.Events.ScriptSelected, this._scriptSelected, this);
    this._navigator.addEventListener(WebInspector.ScriptsNavigator.Events.SnippetCreationRequested, this._snippetCreationRequested, this);
    this._navigator.addEventListener(WebInspector.ScriptsNavigator.Events.ItemRenamingRequested, this._itemRenamingRequested, this);
    this._navigator.addEventListener(WebInspector.ScriptsNavigator.Events.FileRenamed, this._fileRenamed, this);

    this._editorContainer.addEventListener(WebInspector.TabbedEditorContainer.Events.EditorSelected, this._editorSelected, this);
    this._editorContainer.addEventListener(WebInspector.TabbedEditorContainer.Events.EditorClosed, this._editorClosed, this);

    this.splitView.mainElement.appendChild(this.debugSidebarResizeWidgetElement);

    this.sidebarPanes = {};
    this.sidebarPanes.watchExpressions = new WebInspector.WatchExpressionsSidebarPane();
    this.sidebarPanes.callstack = new WebInspector.CallStackSidebarPane();
    this.sidebarPanes.scopechain = new WebInspector.ScopeChainSidebarPane();
    this.sidebarPanes.jsBreakpoints = new WebInspector.JavaScriptBreakpointsSidebarPane(WebInspector.breakpointManager, this._showSourceLine.bind(this));
    this.sidebarPanes.domBreakpoints = WebInspector.domBreakpointsSidebarPane;
    this.sidebarPanes.xhrBreakpoints = new WebInspector.XHRBreakpointsSidebarPane();
    this.sidebarPanes.eventListenerBreakpoints = new WebInspector.EventListenerBreakpointsSidebarPane();

    if (InspectorFrontendHost.canInspectWorkers() && !WebInspector.WorkerManager.isWorkerFrontend()) {
        WorkerAgent.enable();
        this.sidebarPanes.workerList = new WebInspector.WorkersSidebarPane(WebInspector.workerManager);
    }

    this._debugSidebarContentsElement = document.createElement("div");
    this._debugSidebarContentsElement.id = "scripts-debug-sidebar-contents";
    this.sidebarElement.appendChild(this._debugSidebarContentsElement);

    for (var pane in this.sidebarPanes)
        this._debugSidebarContentsElement.appendChild(this.sidebarPanes[pane].element);

    this.sidebarPanes.callstack.expanded = true;

    this.sidebarPanes.scopechain.expanded = true;
    this.sidebarPanes.jsBreakpoints.expanded = true;

    this.sidebarPanes.callstack.registerShortcuts(helpSection, this.registerShortcut.bind(this));
    var evaluateInConsoleShortcut = WebInspector.KeyboardShortcut.makeDescriptor("e", WebInspector.KeyboardShortcut.Modifiers.Shift | WebInspector.KeyboardShortcut.Modifiers.Ctrl);
    helpSection.addKey(evaluateInConsoleShortcut.name, WebInspector.UIString("Evaluate selection in console"));
    this.registerShortcut(evaluateInConsoleShortcut.key, this._evaluateSelectionInConsole.bind(this));

    var outlineShortcut = WebInspector.KeyboardShortcut.makeDescriptor("o", WebInspector.KeyboardShortcut.Modifiers.CtrlOrMeta | WebInspector.KeyboardShortcut.Modifiers.Shift);
    helpSection.addKey(outlineShortcut.name, WebInspector.UIString("Go to member"));
    this.registerShortcut(outlineShortcut.key, this._showOutlineDialog.bind(this));

    var createBreakpointShortcut = WebInspector.KeyboardShortcut.makeDescriptor("b", WebInspector.KeyboardShortcut.Modifiers.CtrlOrMeta);
    helpSection.addKey(createBreakpointShortcut.name, WebInspector.UIString("Toggle breakpoint"));
    this.registerShortcut(createBreakpointShortcut.key, this._toggleBreakpoint.bind(this));

    var panelEnablerHeading = WebInspector.UIString("You need to enable debugging before you can use the Scripts panel.");
    var panelEnablerDisclaimer = WebInspector.UIString("Enabling debugging will make scripts run slower.");
    var panelEnablerButton = WebInspector.UIString("Enable Debugging");

    this.panelEnablerView = new WebInspector.PanelEnablerView("scripts", panelEnablerHeading, panelEnablerDisclaimer, panelEnablerButton);
    this.panelEnablerView.addEventListener("enable clicked", this._enableDebugging, this);

    this.enableToggleButton = new WebInspector.StatusBarButton("", "enable-toggle-status-bar-item");
    this.enableToggleButton.addEventListener("click", this._toggleDebugging, this);
    if (!Capabilities.debuggerCausesRecompilation)
        this.enableToggleButton.element.addStyleClass("hidden");

    this._pauseOnExceptionButton = new WebInspector.StatusBarButton("", "scripts-pause-on-exceptions-status-bar-item", 3);
    this._pauseOnExceptionButton.addEventListener("click", this._togglePauseOnExceptions, this);

    this._toggleFormatSourceButton = new WebInspector.StatusBarButton(WebInspector.UIString("Pretty print"), "scripts-toggle-pretty-print-status-bar-item");
    this._toggleFormatSourceButton.toggled = false;
    this._toggleFormatSourceButton.addEventListener("click", this._toggleFormatSource, this);

    this._scriptViewStatusBarItemsContainer = document.createElement("div");
    this._scriptViewStatusBarItemsContainer.style.display = "inline-block";

    this._installDebuggerSidebarController();

    this._sourceFramesByUISourceCode = new Map();
    this._updateDebuggerButtons();
    this._pauseOnExceptionStateChanged();
    if (WebInspector.debuggerModel.isPaused())
        this._debuggerPaused();

    WebInspector.settings.pauseOnExceptionStateString.addChangeListener(this._pauseOnExceptionStateChanged, this);
    WebInspector.debuggerModel.addEventListener(WebInspector.DebuggerModel.Events.DebuggerWasEnabled, this._debuggerWasEnabled, this);
    WebInspector.debuggerModel.addEventListener(WebInspector.DebuggerModel.Events.DebuggerWasDisabled, this._debuggerWasDisabled, this);
    WebInspector.debuggerModel.addEventListener(WebInspector.DebuggerModel.Events.DebuggerPaused, this._debuggerPaused, this);
    WebInspector.debuggerModel.addEventListener(WebInspector.DebuggerModel.Events.DebuggerResumed, this._debuggerResumed, this);
    WebInspector.debuggerModel.addEventListener(WebInspector.DebuggerModel.Events.CallFrameSelected, this._callFrameSelected, this);
    WebInspector.debuggerModel.addEventListener(WebInspector.DebuggerModel.Events.ConsoleCommandEvaluatedInSelectedCallFrame, this._consoleCommandEvaluatedInSelectedCallFrame, this);
    WebInspector.debuggerModel.addEventListener(WebInspector.DebuggerModel.Events.ExecutionLineChanged, this._executionLineChanged, this);
    WebInspector.debuggerModel.addEventListener(WebInspector.DebuggerModel.Events.BreakpointsActiveStateChanged, this._breakpointsActiveStateChanged, this);

    WebInspector.startBatchUpdate();
    var uiSourceCodes = this._workspace.uiSourceCodes();
    for (var i = 0; i < uiSourceCodes.length; ++i)
        this._addUISourceCode(uiSourceCodes[i]);
    WebInspector.endBatchUpdate();

    this._workspace.addEventListener(WebInspector.UISourceCodeProvider.Events.UISourceCodeAdded, this._uiSourceCodeAdded, this);
    this._workspace.addEventListener(WebInspector.UISourceCodeProvider.Events.UISourceCodeReplaced, this._uiSourceCodeReplaced, this);
    this._workspace.addEventListener(WebInspector.UISourceCodeProvider.Events.UISourceCodeRemoved, this._uiSourceCodeRemoved, this);
    this._workspace.addEventListener(WebInspector.Workspace.Events.WorkspaceReset, this._reset.bind(this), this);

    WebInspector.advancedSearchController.registerSearchScope(new WebInspector.ScriptsSearchScope(this._workspace));
    WebInspector.ContextMenu.registerProvider(this);
}

WebInspector.ScriptsPanel.prototype = {
    get statusBarItems()
    {
        return [this.enableToggleButton.element, this._pauseOnExceptionButton.element, this._toggleFormatSourceButton.element, this._scriptViewStatusBarItemsContainer];
    },

    defaultFocusedElement: function()
    {
        return this._navigator.view.defaultFocusedElement();
    },

    get paused()
    {
        return this._paused;
    },

    wasShown: function()
    {
        WebInspector.Panel.prototype.wasShown.call(this);
        this._debugSidebarContentsElement.insertBefore(this.sidebarPanes.domBreakpoints.element, this.sidebarPanes.xhrBreakpoints.element);
        this.sidebarPanes.watchExpressions.show();

        this._navigatorController.wasShown();
    },

    willHide: function()
    {
        WebInspector.Panel.prototype.willHide.call(this);
        WebInspector.closeViewInDrawer();
    },

    /**
     * @param {WebInspector.Event} event
     */
    _uiSourceCodeAdded: function(event)
    {
        var uiSourceCode = /** @type {WebInspector.UISourceCode} */ event.data;
        this._addUISourceCode(uiSourceCode);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    _addUISourceCode: function(uiSourceCode)
    {
        if (this._toggleFormatSourceButton.toggled)
            uiSourceCode.setFormatted(true);

        this._navigator.addUISourceCode(uiSourceCode);
        this._editorContainer.addUISourceCode(uiSourceCode);
    },

    _uiSourceCodeRemoved: function(event)
    {
        var uiSourceCode = /** @type {WebInspector.UISourceCode} */ event.data;
        this._editorContainer.removeUISourceCode(uiSourceCode);
        this._navigator.removeUISourceCode(uiSourceCode);
        this._removeSourceFrame(uiSourceCode);
    },

    _consoleCommandEvaluatedInSelectedCallFrame: function(event)
    {
        this.sidebarPanes.scopechain.update(WebInspector.debuggerModel.selectedCallFrame());
    },

    _debuggerPaused: function()
    {
        var details = WebInspector.debuggerModel.debuggerPausedDetails();

        this._paused = true;
        this._waitingToPause = false;
        this._stepping = false;

        this._updateDebuggerButtons();

        WebInspector.inspectorView.setCurrentPanel(this);
        this.sidebarPanes.callstack.update(details.callFrames);

        if (details.reason === WebInspector.DebuggerModel.BreakReason.DOM) {
            this.sidebarPanes.domBreakpoints.highlightBreakpoint(details.auxData);
            function didCreateBreakpointHitStatusMessage(element)
            {
                this.sidebarPanes.callstack.setStatus(element);
            }
            this.sidebarPanes.domBreakpoints.createBreakpointHitStatusMessage(details.auxData, didCreateBreakpointHitStatusMessage.bind(this));
        } else if (details.reason === WebInspector.DebuggerModel.BreakReason.EventListener) {
            var eventName = details.auxData.eventName;
            this.sidebarPanes.eventListenerBreakpoints.highlightBreakpoint(details.auxData.eventName);
            var eventNameForUI = WebInspector.EventListenerBreakpointsSidebarPane.eventNameForUI(eventName);
            this.sidebarPanes.callstack.setStatus(WebInspector.UIString("Paused on a \"%s\" Event Listener.", eventNameForUI));
        } else if (details.reason === WebInspector.DebuggerModel.BreakReason.XHR) {
            this.sidebarPanes.xhrBreakpoints.highlightBreakpoint(details.auxData["breakpointURL"]);
            this.sidebarPanes.callstack.setStatus(WebInspector.UIString("Paused on a XMLHttpRequest."));
        } else if (details.reason === WebInspector.DebuggerModel.BreakReason.Exception) {
            this.sidebarPanes.callstack.setStatus(WebInspector.UIString("Paused on exception: '%s'.", details.auxData.description));
        } else {
            function didGetUILocation(uiLocation)
            {
                var breakpoint = WebInspector.breakpointManager.findBreakpoint(uiLocation.uiSourceCode, uiLocation.lineNumber);
                if (!breakpoint)
                    return;
                this.sidebarPanes.jsBreakpoints.highlightBreakpoint(breakpoint);
                this.sidebarPanes.callstack.setStatus(WebInspector.UIString("Paused on a JavaScript breakpoint."));
            }
            details.callFrames[0].createLiveLocation(didGetUILocation.bind(this));
        }

        this._showDebuggerSidebar();
        this._toggleDebuggerSidebarButton.disabled = true;
        window.focus();
        InspectorFrontendHost.bringToFront();
    },

    _debuggerResumed: function()
    {
        this._paused = false;
        this._waitingToPause = false;
        this._stepping = false;

        this._clearInterface();
        this._toggleDebuggerSidebarButton.disabled = false;
    },

    _debuggerWasEnabled: function()
    {
        this._updateDebuggerButtons();
    },

    _debuggerWasDisabled: function()
    {
        this._reset();
    },

    _reset: function()
    {
        delete this.currentQuery;
        this.searchCanceled();

        this._debuggerResumed();

        delete this._currentUISourceCode;
        this._navigator.reset();
        this._editorContainer.reset();
        this._updateScriptViewStatusBarItems();
        this.sidebarPanes.jsBreakpoints.reset();
        this.sidebarPanes.watchExpressions.reset();

        var uiSourceCodes = this._workspace.uiSourceCodes();
        for (var i = 0; i < uiSourceCodes.length; ++i)
            this._removeSourceFrame(uiSourceCodes[i]);
    },

    get visibleView()
    {
        return this._editorContainer.visibleView;
    },

    _updateScriptViewStatusBarItems: function()
    {
        this._scriptViewStatusBarItemsContainer.removeChildren();

        var sourceFrame = this.visibleView;
        if (sourceFrame) {
            var statusBarItems = sourceFrame.statusBarItems() || [];
            for (var i = 0; i < statusBarItems.length; ++i)
                this._scriptViewStatusBarItemsContainer.appendChild(statusBarItems[i]);
        }
    },

    canShowAnchorLocation: function(anchor)
    {
        if (WebInspector.debuggerModel.debuggerEnabled() && anchor.uiSourceCode)
            return true;
        var uiSourceCodes = this._workspace.uiSourceCodes();
        for (var i = 0; i < uiSourceCodes.length; ++i) {
            if (uiSourceCodes[i].url === anchor.href) {
                anchor.uiSourceCode = uiSourceCodes[i];
                return true;
            }
        }
        return false;
    },

    showAnchorLocation: function(anchor)
    {
        this._showSourceLine(anchor.uiSourceCode, anchor.lineNumber);
    },

    showFunctionDefinition: function(functionLocation)
    {
        WebInspector.inspectorView.showPanelForAnchorNavigation(this);
        var uiLocation = WebInspector.debuggerModel.rawLocationToUILocation(functionLocation);
        this._showSourceLine(uiLocation.uiSourceCode, uiLocation.lineNumber);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     * @param {number} lineNumber
     */
    showUISourceCode: function(uiSourceCode, lineNumber)
    {
        this._showSourceLine(uiSourceCode, lineNumber);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     * @param {number=} lineNumber
     */
    _showSourceLine: function(uiSourceCode, lineNumber)
    {
        var sourceFrame = this._showFile(uiSourceCode);
        if (typeof lineNumber === "number")
            sourceFrame.highlightLine(lineNumber);
        sourceFrame.focus();
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     * @return {WebInspector.SourceFrame}
     */
    _showFile: function(uiSourceCode)
    {
        var sourceFrame = this._getOrCreateSourceFrame(uiSourceCode);
        if (this._currentUISourceCode === uiSourceCode)
            return sourceFrame;
        this._currentUISourceCode = uiSourceCode;

        if (this._navigator.isScriptSourceAdded(uiSourceCode))
            this._navigator.revealUISourceCode(uiSourceCode);
        this._editorContainer.showFile(uiSourceCode);
        this._updateScriptViewStatusBarItems();

        return sourceFrame;
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     * @return {WebInspector.SourceFrame}
     */
    _createSourceFrame: function(uiSourceCode)
    {
        var sourceFrame;
        if (uiSourceCode instanceof WebInspector.SnippetJavaScriptSource) {
            var snippetJavaScriptSource = /** @type {WebInspector.SnippetJavaScriptSource} */ uiSourceCode;
            sourceFrame = new WebInspector.SnippetJavaScriptSourceFrame(this, snippetJavaScriptSource);
        } else if (uiSourceCode instanceof WebInspector.JavaScriptSource) {
                var javaScriptSource = /** @type {WebInspector.JavaScriptSource} */ uiSourceCode;
                sourceFrame = new WebInspector.JavaScriptSourceFrame(this, javaScriptSource);
        } else
            sourceFrame = new WebInspector.UISourceCodeFrame(uiSourceCode);
        this._sourceFramesByUISourceCode.put(uiSourceCode, sourceFrame);
        return sourceFrame;
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     * @return {WebInspector.SourceFrame}
     */
    _getOrCreateSourceFrame: function(uiSourceCode)
    {
        return this._sourceFramesByUISourceCode.get(uiSourceCode) || this._createSourceFrame(uiSourceCode);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     * @return {WebInspector.SourceFrame}
     */
    viewForFile: function(uiSourceCode)
    {
        return this._getOrCreateSourceFrame(uiSourceCode);
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    _removeSourceFrame: function(uiSourceCode)
    {
        var sourceFrame = this._sourceFramesByUISourceCode.get(uiSourceCode);
        if (!sourceFrame)
            return;
        this._sourceFramesByUISourceCode.remove(uiSourceCode);
        sourceFrame.detach();
    },

    /**
     * @param {WebInspector.Event} event
     */
    _uiSourceCodeReplaced: function(event)
    {
        var oldUISourceCode = /** @type {WebInspector.UISourceCode} */ event.data.oldUISourceCode;
        var uiSourceCode = /** @type {WebInspector.UISourceCode} */ event.data.uiSourceCode;

        this._navigator.replaceUISourceCode(oldUISourceCode, uiSourceCode);
        this._editorContainer.replaceFile(oldUISourceCode, uiSourceCode);
        this._removeSourceFrame(oldUISourceCode);
    },

    _clearCurrentExecutionLine: function()
    {
        if (this._executionSourceFrame)
            this._executionSourceFrame.clearExecutionLine();
        delete this._executionSourceFrame;
    },

    _executionLineChanged: function(event)
    {
        var uiLocation = event.data;

        this._clearCurrentExecutionLine();
        if (!uiLocation)
            return;
        var sourceFrame = this._getOrCreateSourceFrame(uiLocation.uiSourceCode);
        sourceFrame.setExecutionLine(uiLocation.lineNumber);
        this._executionSourceFrame = sourceFrame;
    },

    _revealExecutionLine: function(uiLocation)
    {
        // Some scripts (anonymous and snippets evaluations) are not added to files select by default.
        this._editorContainer.addUISourceCode(uiLocation.uiSourceCode);
        var sourceFrame = this._showFile(uiLocation.uiSourceCode);
        sourceFrame.revealLine(uiLocation.lineNumber);
        sourceFrame.focus();
    },

    _callFrameSelected: function(event)
    {
        var callFrame = event.data;

        if (!callFrame)
            return;

        this.sidebarPanes.scopechain.update(callFrame);
        this.sidebarPanes.watchExpressions.refreshExpressions();
        this.sidebarPanes.callstack.setSelectedCallFrame(callFrame);
        callFrame.createLiveLocation(this._revealExecutionLine.bind(this));
    },

    _editorClosed: function(event)
    {
        this._navigatorController.hideNavigatorOverlay();
        var uiSourceCode = /** @type {WebInspector.UISourceCode} */ event.data;

        if (this._currentUISourceCode === uiSourceCode)
            delete this._currentUISourceCode;

        // ScriptsNavigator does not need to update on EditorClosed.
        this._updateScriptViewStatusBarItems();
        WebInspector.searchController.resetSearch();
    },

    _editorSelected: function(event)
    {
        var uiSourceCode = /** @type {WebInspector.UISourceCode} */ event.data;
        var sourceFrame = this._showFile(uiSourceCode);
        this._navigatorController.hideNavigatorOverlay();
        sourceFrame.focus();
        WebInspector.searchController.resetSearch();
    },

    _scriptSelected: function(event)
    {
        var uiSourceCode = /** @type {WebInspector.UISourceCode} */ event.data.uiSourceCode;
        var sourceFrame = this._showFile(uiSourceCode);
        this._navigatorController.hideNavigatorOverlay();
        if (sourceFrame && event.data.focusSource)
            sourceFrame.focus();
    },

    _pauseOnExceptionStateChanged: function()
    {
        var pauseOnExceptionsState = WebInspector.settings.pauseOnExceptionStateString.get();
        switch (pauseOnExceptionsState) {
        case WebInspector.DebuggerModel.PauseOnExceptionsState.DontPauseOnExceptions:
            this._pauseOnExceptionButton.title = WebInspector.UIString("Don't pause on exceptions.\nClick to Pause on all exceptions.");
            break;
        case WebInspector.DebuggerModel.PauseOnExceptionsState.PauseOnAllExceptions:
            this._pauseOnExceptionButton.title = WebInspector.UIString("Pause on all exceptions.\nClick to Pause on uncaught exceptions.");
            break;
        case WebInspector.DebuggerModel.PauseOnExceptionsState.PauseOnUncaughtExceptions:
            this._pauseOnExceptionButton.title = WebInspector.UIString("Pause on uncaught exceptions.\nClick to Not pause on exceptions.");
            break;
        }
        this._pauseOnExceptionButton.state = pauseOnExceptionsState;
    },

    _updateDebuggerButtons: function()
    {
        if (WebInspector.debuggerModel.debuggerEnabled()) {
            this.enableToggleButton.title = WebInspector.UIString("Debugging enabled. Click to disable.");
            this.enableToggleButton.toggled = true;
            this._pauseOnExceptionButton.visible = true;
            this.panelEnablerView.detach();
        } else {
            this.enableToggleButton.title = WebInspector.UIString("Debugging disabled. Click to enable.");
            this.enableToggleButton.toggled = false;
            this._pauseOnExceptionButton.visible = false;
            this.panelEnablerView.show(this.element);
        }

        if (this._paused) {
            this.pauseButton.addStyleClass("paused");

            this.pauseButton.disabled = false;
            this.stepOverButton.disabled = false;
            this.stepIntoButton.disabled = false;
            this.stepOutButton.disabled = false;

            this.debuggerStatusElement.textContent = WebInspector.UIString("Paused");
        } else {
            this.pauseButton.removeStyleClass("paused");

            this.pauseButton.disabled = this._waitingToPause;
            this.stepOverButton.disabled = true;
            this.stepIntoButton.disabled = true;
            this.stepOutButton.disabled = true;

            if (this._waitingToPause)
                this.debuggerStatusElement.textContent = WebInspector.UIString("Pausing");
            else if (this._stepping)
                this.debuggerStatusElement.textContent = WebInspector.UIString("Stepping");
            else
                this.debuggerStatusElement.textContent = "";
        }
    },

    _clearInterface: function()
    {
        this.sidebarPanes.callstack.update(null);
        this.sidebarPanes.scopechain.update(null);
        this.sidebarPanes.jsBreakpoints.clearBreakpointHighlight();
        this.sidebarPanes.domBreakpoints.clearBreakpointHighlight();
        this.sidebarPanes.eventListenerBreakpoints.clearBreakpointHighlight();
        this.sidebarPanes.xhrBreakpoints.clearBreakpointHighlight();

        this._clearCurrentExecutionLine();
        this._updateDebuggerButtons();
    },

    _enableDebugging: function()
    {
        this._toggleDebugging(this.panelEnablerView.alwaysEnabled);
    },

    _toggleDebugging: function(optionalAlways)
    {
        this._paused = false;
        this._waitingToPause = false;
        this._stepping = false;

        if (WebInspector.debuggerModel.debuggerEnabled()) {
            WebInspector.settings.debuggerEnabled.set(false);
            WebInspector.debuggerModel.disableDebugger();
        } else {
            WebInspector.settings.debuggerEnabled.set(!!optionalAlways);
            WebInspector.debuggerModel.enableDebugger();
        }
    },

    _togglePauseOnExceptions: function()
    {
        var nextStateMap = {};
        var stateEnum = WebInspector.DebuggerModel.PauseOnExceptionsState;
        nextStateMap[stateEnum.DontPauseOnExceptions] = stateEnum.PauseOnAllExceptions;
        nextStateMap[stateEnum.PauseOnAllExceptions] = stateEnum.PauseOnUncaughtExceptions;
        nextStateMap[stateEnum.PauseOnUncaughtExceptions] = stateEnum.DontPauseOnExceptions;
        WebInspector.settings.pauseOnExceptionStateString.set(nextStateMap[this._pauseOnExceptionButton.state]);
    },

    _togglePause: function()
    {
        if (this._paused) {
            this._paused = false;
            this._waitingToPause = false;
            DebuggerAgent.resume();
        } else {
            this._stepping = false;
            this._waitingToPause = true;
            DebuggerAgent.pause();
        }

        this._clearInterface();
    },

    _stepOverClicked: function()
    {
        if (!this._paused)
            return;

        this._paused = false;
        this._stepping = true;

        this._clearInterface();

        DebuggerAgent.stepOver();
    },

    _stepIntoClicked: function()
    {
        if (!this._paused)
            return;

        this._paused = false;
        this._stepping = true;

        this._clearInterface();

        DebuggerAgent.stepInto();
    },

    _stepOutClicked: function()
    {
        if (!this._paused)
            return;

        this._paused = false;
        this._stepping = true;

        this._clearInterface();

        DebuggerAgent.stepOut();
    },

    _toggleBreakpointsClicked: function(event)
    {
        WebInspector.debuggerModel.setBreakpointsActive(!WebInspector.debuggerModel.breakpointsActive());
    },

    _breakpointsActiveStateChanged: function(event)
    {
        var active = event.data;
        this._toggleBreakpointsButton.toggled = active;
        if (active) {
            this._toggleBreakpointsButton.title = WebInspector.UIString("Deactivate all breakpoints.");
            WebInspector.inspectorView.element.removeStyleClass("breakpoints-deactivated");
            this.sidebarPanes.jsBreakpoints.listElement.removeStyleClass("breakpoints-list-deactivated");
        } else {
            this._toggleBreakpointsButton.title = WebInspector.UIString("Activate all breakpoints.");
            WebInspector.inspectorView.element.addStyleClass("breakpoints-deactivated");
            this.sidebarPanes.jsBreakpoints.listElement.addStyleClass("breakpoints-list-deactivated");
        }
    },

    _evaluateSelectionInConsole: function()
    {
        var selection = window.getSelection();
        if (selection.type === "Range" && !selection.isCollapsed)
            WebInspector.evaluateInConsole(selection.toString());
    },

    _createDebugToolbar: function(section)
    {
        var debugToolbar = document.createElement("div");
        debugToolbar.className = "status-bar";
        debugToolbar.id = "scripts-debug-toolbar";

        var title, handler, shortcuts;
        var platformSpecificModifier = WebInspector.KeyboardShortcut.Modifiers.CtrlOrMeta;

        // Continue.
        title = WebInspector.UIString("Pause script execution (%s).");
        handler = this._togglePause.bind(this);
        shortcuts = [];
        shortcuts.push(WebInspector.KeyboardShortcut.makeDescriptor(WebInspector.KeyboardShortcut.Keys.F8));
        shortcuts.push(WebInspector.KeyboardShortcut.makeDescriptor(WebInspector.KeyboardShortcut.Keys.Slash, platformSpecificModifier));
        this.pauseButton = this._createButtonAndRegisterShortcuts(section, "scripts-pause", title, handler, shortcuts, WebInspector.UIString("Pause/Continue"));
        debugToolbar.appendChild(this.pauseButton);

        // Step over.
        title = WebInspector.UIString("Step over next function call (%s).");
        handler = this._stepOverClicked.bind(this);
        shortcuts = [];
        shortcuts.push(WebInspector.KeyboardShortcut.makeDescriptor(WebInspector.KeyboardShortcut.Keys.F10));
        shortcuts.push(WebInspector.KeyboardShortcut.makeDescriptor(WebInspector.KeyboardShortcut.Keys.SingleQuote, platformSpecificModifier));
        this.stepOverButton = this._createButtonAndRegisterShortcuts(section, "scripts-step-over", title, handler, shortcuts, WebInspector.UIString("Step over"));
        debugToolbar.appendChild(this.stepOverButton);

        // Step into.
        title = WebInspector.UIString("Step into next function call (%s).");
        handler = this._stepIntoClicked.bind(this);
        shortcuts = [];
        shortcuts.push(WebInspector.KeyboardShortcut.makeDescriptor(WebInspector.KeyboardShortcut.Keys.F11));
        shortcuts.push(WebInspector.KeyboardShortcut.makeDescriptor(WebInspector.KeyboardShortcut.Keys.Semicolon, platformSpecificModifier));
        this.stepIntoButton = this._createButtonAndRegisterShortcuts(section, "scripts-step-into", title, handler, shortcuts, WebInspector.UIString("Step into"));
        debugToolbar.appendChild(this.stepIntoButton);

        // Step out.
        title = WebInspector.UIString("Step out of current function (%s).");
        handler = this._stepOutClicked.bind(this);
        shortcuts = [];
        shortcuts.push(WebInspector.KeyboardShortcut.makeDescriptor(WebInspector.KeyboardShortcut.Keys.F11, WebInspector.KeyboardShortcut.Modifiers.Shift));
        shortcuts.push(WebInspector.KeyboardShortcut.makeDescriptor(WebInspector.KeyboardShortcut.Keys.Semicolon, WebInspector.KeyboardShortcut.Modifiers.Shift | platformSpecificModifier));
        this.stepOutButton = this._createButtonAndRegisterShortcuts(section, "scripts-step-out", title, handler, shortcuts, WebInspector.UIString("Step out"));
        debugToolbar.appendChild(this.stepOutButton);

        this._toggleBreakpointsButton = new WebInspector.StatusBarButton(WebInspector.UIString("Deactivate all breakpoints."), "toggle-breakpoints");
        this._toggleBreakpointsButton.toggled = true;
        this._toggleBreakpointsButton.addEventListener("click", this._toggleBreakpointsClicked, this);
        debugToolbar.appendChild(this._toggleBreakpointsButton.element);

        this.debuggerStatusElement = document.createElement("div");
        this.debuggerStatusElement.id = "scripts-debugger-status";
        debugToolbar.appendChild(this.debuggerStatusElement);

        return debugToolbar;
    },

    _createButtonAndRegisterShortcuts: function(section, buttonId, buttonTitle, handler, shortcuts, shortcutDescription)
    {
        var button = document.createElement("button");
        button.className = "status-bar-item";
        button.id = buttonId;
        button.title = String.vsprintf(buttonTitle, [shortcuts[0].name]);
        button.disabled = true;
        button.appendChild(document.createElement("img"));
        button.addEventListener("click", handler, false);

        var shortcutNames = [];
        for (var i = 0; i < shortcuts.length; ++i) {
            this.registerShortcut(shortcuts[i].key, handler);
            shortcutNames.push(shortcuts[i].name);
        }
        section.addAlternateKeys(shortcutNames, shortcutDescription);

        return button;
    },

    searchCanceled: function()
    {
        if (this._searchView)
            this._searchView.searchCanceled();

        delete this._searchView;
        delete this._searchQuery;
    },

    /**
     * @param {string} query
     */
    performSearch: function(query)
    {
        WebInspector.searchController.updateSearchMatchesCount(0, this);

        if (!this.visibleView)
            return;

        // Call searchCanceled since it will reset everything we need before doing a new search.
        this.searchCanceled();

        this._searchView = this.visibleView;
        this._searchQuery = query;

        function finishedCallback(view, searchMatches)
        {
            if (!searchMatches)
                return;

            WebInspector.searchController.updateSearchMatchesCount(searchMatches, this);
            view.jumpToNextSearchResult();
            WebInspector.searchController.updateCurrentMatchIndex(view.currentSearchResultIndex, this);
        }

        this._searchView.performSearch(query, finishedCallback.bind(this));
    },

    jumpToNextSearchResult: function()
    {
        if (!this._searchView)
            return;

        if (this._searchView !== this.visibleView) {
            this.performSearch(this._searchQuery);
            return;
        }

        if (this._searchView.showingLastSearchResult())
            this._searchView.jumpToFirstSearchResult();
        else
            this._searchView.jumpToNextSearchResult();
        WebInspector.searchController.updateCurrentMatchIndex(this._searchView.currentSearchResultIndex, this);
        return true;
    },

    jumpToPreviousSearchResult: function()
    {
        if (!this._searchView)
            return false;

        if (this._searchView !== this.visibleView) {
            this.performSearch(this._searchQuery);
            if (this._searchView)
                this._searchView.jumpToLastSearchResult();
            return;
        }

        if (this._searchView.showingFirstSearchResult())
            this._searchView.jumpToLastSearchResult();
        else
            this._searchView.jumpToPreviousSearchResult();
        WebInspector.searchController.updateCurrentMatchIndex(this._searchView.currentSearchResultIndex, this);
    },

    /**
     * @return {boolean}
     */
    canSearchAndReplace: function()
    {
        var view = /** @type {WebInspector.SourceFrame} */ this.visibleView;
        return !!view && view.canEditSource();
    },

    /**
     * @param {string} text
     */
    replaceSelectionWith: function(text)
    {
        var view = /** @type {WebInspector.SourceFrame} */ this.visibleView;
        view.replaceSearchMatchWith(text);
    },

    /**
     * @param {string} query
     * @param {string} text
     */
    replaceAllWith: function(query, text)
    {
        var view = /** @type {WebInspector.SourceFrame} */ this.visibleView;
        view.replaceAllWith(query, text);
    },

    _toggleFormatSource: function()
    {
        this._toggleFormatSourceButton.toggled = !this._toggleFormatSourceButton.toggled;
        var uiSourceCodes = this._workspace.uiSourceCodes();
        for (var i = 0; i < uiSourceCodes.length; ++i)
            uiSourceCodes[i].setFormatted(this._toggleFormatSourceButton.toggled);
    },

    addToWatch: function(expression)
    {
        this.sidebarPanes.watchExpressions.addExpression(expression);
    },

    _toggleBreakpoint: function()
    {
        var sourceFrame = this.visibleView;
        if (!sourceFrame)
            return;

        if (sourceFrame instanceof WebInspector.JavaScriptSourceFrame) {
            var javaScriptSourceFrame = /** @type {WebInspector.JavaScriptSourceFrame} */ sourceFrame;
            javaScriptSourceFrame.toggleBreakpointOnCurrentLine();
        }            
    },

    _showOutlineDialog: function()
    {
        var uiSourceCode = this._editorContainer.currentFile();
        if (!uiSourceCode)
            return;

        if (uiSourceCode instanceof WebInspector.JavaScriptSource)
            WebInspector.JavaScriptOutlineDialog.show(this.visibleView, uiSourceCode);
        else if (uiSourceCode instanceof WebInspector.StyleSource)
            WebInspector.StyleSheetOutlineDialog.show(this.visibleView, /** @type {WebInspector.StyleSource} */ uiSourceCode);
    },

    _installDebuggerSidebarController: function()
    {
        this._toggleDebuggerSidebarButton = new WebInspector.StatusBarButton(WebInspector.UIString("Hide debugger"), "scripts-debugger-show-hide-button", 3);
        this._toggleDebuggerSidebarButton.state = "shown";
        this._toggleDebuggerSidebarButton.addEventListener("click", clickHandler, this);

        function clickHandler()
        {
            if (this._toggleDebuggerSidebarButton.state === "shown")
                this._hideDebuggerSidebar();
            else
                this._showDebuggerSidebar();
        }
        this.editorView.element.appendChild(this._toggleDebuggerSidebarButton.element);

        if (WebInspector.settings.debuggerSidebarHidden.get())
            this._hideDebuggerSidebar();

    },

    _showDebuggerSidebar: function()
    {
        if (this._toggleDebuggerSidebarButton.state === "shown")
            return;
        this._toggleDebuggerSidebarButton.state = "shown";
        this._toggleDebuggerSidebarButton.title = WebInspector.UIString("Hide debugger");
        this.splitView.showSidebarElement();
        WebInspector.settings.debuggerSidebarHidden.set(false);
    },

    _hideDebuggerSidebar: function()
    {
        if (this._toggleDebuggerSidebarButton.state === "hidden")
            return;
        this._toggleDebuggerSidebarButton.state = "hidden";
        this._toggleDebuggerSidebarButton.title = WebInspector.UIString("Show debugger");
        this.splitView.hideSidebarElement();
        WebInspector.settings.debuggerSidebarHidden.set(true);
    },

    _fileRenamed: function(event)
    {
        var uiSourceCode = /** @type {WebInspector.UISourceCode} */ event.data.uiSourceCode;
        var name = /** @type {string} */ event.data.name;
        if (!uiSourceCode.isSnippet)
            return;
        var snippetJavaScriptSource = /** @type {WebInspector.SnippetJavaScriptSource} */ uiSourceCode;
        WebInspector.scriptSnippetModel.renameScriptSnippet(snippetJavaScriptSource, name);
    },
        
    /**
     * @param {WebInspector.Event} event
     */
    _snippetCreationRequested: function(event)
    {
        var snippetJavaScriptSource = WebInspector.scriptSnippetModel.createScriptSnippet();
        this._showSourceLine(snippetJavaScriptSource);
        
        var shouldHideNavigator = !this._navigatorController.isNavigatorPinned();
        if (this._navigatorController.isNavigatorHidden())
            this._navigatorController.showNavigatorOverlay();
        this._navigator.rename(snippetJavaScriptSource, callback.bind(this));
    
        /**
         * @param {boolean} committed
         */
        function callback(committed)
        {
            if (shouldHideNavigator)
                this._navigatorController.hideNavigatorOverlay();

            if (!committed) {
                WebInspector.scriptSnippetModel.deleteScriptSnippet(snippetJavaScriptSource);
                return;
            }

            this._showSourceLine(snippetJavaScriptSource);
        }
    },

    /**
     * @param {WebInspector.Event} event
     */
    _itemRenamingRequested: function(event)
    {
        var uiSourceCode = /** @type {WebInspector.UISourceCode} */ event.data;
        
        var shouldHideNavigator = !this._navigatorController.isNavigatorPinned();
        if (this._navigatorController.isNavigatorHidden())
            this._navigatorController.showNavigatorOverlay();
        this._navigator.rename(uiSourceCode, callback.bind(this));
    
        /**
         * @param {boolean} committed
         */
        function callback(committed)
        {
            if (shouldHideNavigator && committed) {
                this._navigatorController.hideNavigatorOverlay();
                this._showSourceLine(uiSourceCode);
            }
        }
    },

    /**
     * @param {WebInspector.UISourceCode} uiSourceCode
     */
    _showLocalHistory: function(uiSourceCode)
    {
        WebInspector.RevisionHistoryView.showHistory(uiSourceCode);
    },

    /** 
     * @param {WebInspector.ContextMenu} contextMenu
     * @param {Object} target
     */
    appendApplicableItems: function(contextMenu, target)
    {
        if (!(target instanceof WebInspector.UISourceCode))
            return;

        var uiSourceCode = /** @type {WebInspector.UISourceCode} */ target;
        contextMenu.appendItem(WebInspector.UIString("Local modifications..."), this._showLocalHistory.bind(this, uiSourceCode));
        if (uiSourceCode.resource() && uiSourceCode.resource().request)
            contextMenu.appendApplicableItems(uiSourceCode.resource().request);
    },

    showGoToSourceDialog: function()
    {
        WebInspector.OpenResourceDialog.show(this, this._workspace, this.editorView.mainElement);
    }
}

WebInspector.ScriptsPanel.prototype.__proto__ = WebInspector.Panel.prototype;
