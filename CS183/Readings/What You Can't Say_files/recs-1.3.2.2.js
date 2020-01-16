var YStore = window.YStore || {};
YStore.CrossSellRecs = (function() {
	
	// Configuration settings.
	var DEBUG = false;	
	var RETRY_LIMIT = 25;
	var RETRY_WAIT = 200; // In milliseconds.
	var orientationSettings = {
		h: { cellsPerRow: 3 },
		v: { cellsPerRow: 1 }
	};
	var classNames = {
		table: 'ystore-cross-sell-table',
		tableOrientation: {
			h: 'ystore-cross-sell-table-horizontal',
			v: 'ystore-cross-sell-table-vertical'
		},
		row: 'ystore-cross-sell-row',
		firstRow: 'ystore-cross-sell-row-first',
		lastRow: 'ystore-cross-sell-row-last',
		titleRow: 'ystore-cross-sell-title-row',
		titleCell: 'ystore-cross-sell-title-cell',
		title: 'ystore-cross-sell-title',		
		cell: 'ystore-cross-sell-cell ys_relatedItemDesc',
		firstCell: 'ystore-cross-sell-cell-first',
		lastCell: 'ystore-cross-sell-cell-last',
		
		img: 'ystore-cross-sell-product-image',
		imgLink: 'ystore-cross-sell-product-image-link',		
		caption: 'ystore-cross-sell-product-caption',
		name: 'ystore-cross-sell-product-name',
		price: 'ystore-cross-sell-product-price',
		regularPrice: 'ystore-cross-sell-product-reg-price',
		salePrice: 'ystore-cross-sell-product-sale-price',
		csDiscPrice: 'ystore-cross-sell-product-cs-disc-price',
		promo: 'ys_promo',
		orderButtonContainer: 'ystore-cross-sell-order-button-container',
		orderButton: 'ys_primary ysco_next_btn'
	};
	var ids = {
		script: 'ystore-cross-sell-script',
		containerDiv: 'ys_relatedItems',
		itemPrefix: 'ystore-cross-sell-item-',
		imgLinkPrefix: 'ystore-cross-sell-image-link-',
		nameLinkPrefix: 'ystore-cross-sell-name-link-',
		orderButtonPrefix: 'ystore-cross-sell-order-btn-'
	};	
	var defaultText = {
		regularPrice: 'Price: ',
		noSaleRegularPrice: 'Price: ',
		price: 'Price: ',
		salePrice: 'Sale Price: ',
		discountPriceProd: 'When purchased with this item: ',
		discountPriceCart: 'Add to Your Order Now and Pay Only: '
	};

	// Private variables.
	var requestStartTime;
	var retryAttempts = 0;
	var cached = {};
	var recViewTagCalled = false;
	
	// Private methods.
	
	// Utility methods.	
	function log(msg) {
		if(DEBUG) {
			if(typeof console != 'undefined') console.log(msg);
		}
	}

	function jsonScriptRequest(fullUrl) {
		log('Starting jsonScriptRequest, with URL: ' + fullUrl);
			
		requestStartTime = new Date();
		createEl('script', { type: 'text/javascript', src: fullUrl, id: ids.script, parent: document.getElementsByTagName("head").item(0) });
	}
	
	function createEl(elementType, attr) {
		var newEl = document.createElement(elementType);
		if(typeof attr === 'undefined') return newEl;

		if(attr.id) newEl.id = attr.id;
		if(attr.className) newEl.className = attr.className;
		if(attr.title) newEl.title = attr.title;

		if(attr.colSpan) newEl.colSpan = attr.colSpan;
		if(attr.href) newEl.setAttribute('href', attr.href);
		if(attr.type) newEl.setAttribute('type', attr.type);
		if(attr.value) newEl.setAttribute('value', attr.value);		
		if(attr.src) newEl.setAttribute('src', attr.src);
		if(attr.alt) newEl.setAttribute('alt', attr.alt);
		if(attr.border) newEl.setAttribute('border', attr.border);
		if(attr.text) newEl.innerHTML = attr.text;
		if(attr.onclick) newEl.onclick = attr.onclick;

		if(attr.parent && attr.insertBefore) attr.parent.insertBefore(newEl, attr.insertBefore);
		else if(attr.parent) attr.parent.appendChild(newEl);

		return newEl;
	}
 
	// CS specific methods.
	function requiredVarsSet() {
		return (
			typeof YStore !== 'undefined' && 
			typeof YStore.CrossSellBeacon !== 'undefined' &&
			typeof YStore.currencySymbol !== 'undefined' &&
			typeof YStore.showCSRecs !== 'undefined' &&
			typeof csell_REC_VIEW_TAG === 'function' &&
			YStore.showCSRecs === 'true' // This must be true (as a string) to continue.
		);
	}
	
	function requiredCapabilitiesPresent() {
		return (
			document && 
			document.getElementById && 
			document.getElementsByTagName && 
			document.createElement && 
			document.createTextNode && 
			document.getElementsByTagName("head").item(0).appendChild && 
			document.getElementsByTagName("head").item(0).setAttribute
		);
	}

	function requiredElementPresent() {
		try {
			var container = document.getElementById(ids.containerDiv);
			return (typeof container === 'object' && container != null && container.nodeType);
		}
		catch(e) {
			return false;
		}
	}
	
	function assembleUrl() {
		return YStore.crossSellUrl + ((YStore.crossSellUrl.match(/\?/)) ? '&' : '?') + 'callback=YStore.CrossSellRecs.asyncCallback&noCacheIE=' + (new Date()).getTime();
	}
	
	function assembleRecommendations(productArray, headerText, orientation, priceLabels) {
		if(!requiredElementPresent()) {
			if(retryAttempts < RETRY_LIMIT) {
				setTimeout(YStore.CrossSellRecs.retryAssembleRecs, RETRY_WAIT);
			}
			else {
				callRecViewTag();
			}
			return;
		}
		var container = document.getElementById(ids.containerDiv);

		if(orientation !== 'h' && orientation !== 'v') {
			orientation = (typeof YStore.page !== 'undefined' && YStore.page === 'p') ? 'h' : 'v';
		}
		var cellsPerRow = orientationSettings[orientation].cellsPerRow;

		if(priceLabels.price === '') priceLabels.price = defaultText.price;
		if(priceLabels.salePrice === '') priceLabels.salePrice = defaultText.salePrice;
		if(priceLabels.csDiscPrice === '') priceLabels.csDiscPrice = (typeof YStore.page !== 'undefined' && YStore.page === 'p') ? defaultText.discountPriceProd : defaultText.discountPriceCart;

		var table = createEl('table', { className: classNames.table + ' ' + classNames.tableOrientation[orientation], parent: container });
		var tableBody = createEl('tbody', { parent: table });
		var titleRow = createEl('tr', { className: classNames.titleRow, parent: tableBody });
		var titleCell = createEl('td', { colSpan: cellsPerRow, className: classNames.titleCell, parent: titleRow });
		var title = createEl('h3', { className: classNames.title, text: headerText, parent: titleCell });

		var funcsAvailable = (typeof YStore.CrossSellBeacon != 'undefined' && typeof YStore.CrossSellBeacon.setClickTagUrl === 'function' && typeof YStore.CrossSellBeacon.addRecData === 'function');
		var showOrderButton = ((typeof YStore.page === 'undefined' || YStore.page === 'c') && typeof YStore.addItemUrl !== 'undefined');

		for(var i = 0, len = productArray.length; i < len; i++) {
			var p = productArray[i];
			var classNameArray;
			if(i % cellsPerRow === 0) {
				classNameArray = [ classNames.row ];
				if(i === 0) classNameArray.push(classNames.firstRow);
				if(len - i <= cellsPerRow) classNameArray.push(classNames.lastRow);
				var row = createEl('tr', { className: classNameArray.join(' '), parent: tableBody });
			}

			classNameArray = [ classNames.cell ];
			if(i % cellsPerRow === 0) classNameArray.push(classNames.firstCell);
			if((i + 1) % cellsPerRow === 0) classNameArray.push(classNames.lastCell);			
			var cell = createEl('td', { className: classNameArray.join(' '), id: ids.itemPrefix + p.id, parent: row });

			var imgLinkId = ids.imgLinkPrefix + p.id;
			var prodLinkId = ids.nameLinkPrefix + p.id;
			var orderButtonId = ids.orderButtonPrefix + p.id;
			var imageExists = (typeof p.i !== 'undefined' && p.i != '');

			if(imageExists) {
				var imgLink = createEl('a', { id: imgLinkId, href: p.u, className: classNames.imgLink, parent: cell });
				var img = createEl('img', { className: classNames.img, src: p.i, alt: '', border: 0, parent: imgLink });
			}
			var caption = createEl('div', { className: classNames.caption, parent: cell });
			var prodName = createEl('h4', { className: classNames.name, parent: caption });
			var prodLink = createEl('a', { id: prodLinkId, href: p.u, text: p.n, parent: prodName });
			if(showOrderButton) (function() {
				var orderUrl = (typeof p.op !== 'undefined' && p.op === 0) ? // Set the Order button URL depending on whether there are options or not.
					YStore.addItemUrl.replace(/%s/, (document.location.href.indexOf('https') === -1) ? '' : 's').replace(/%s/, p.id)  + YStore.sessionInfo :
					p.u;
				var orderButtonContainer = createEl('div', { className: classNames.orderButtonContainer, parent: cell });
				if(typeof YStore.orderButtonFormatStr != 'undefined') {
					orderButtonContainer.innerHTML = YStore.orderButtonFormatStr.replace(/%s/, orderUrl).replace(/%s/, orderButtonId);
				}
				else {
					var orderButton = createEl('input', { className: classNames.orderButton, type: 'button', value: 'Order', onclick: function() { location.href = orderUrl; }, parent: orderButtonContainer });
				}
			})();
			
			if(typeof p.pt !== 'undefined' && p.pt !== 'r' && typeof p.rp !== 'undefined' && p.rp !== '' && p.p != p.rp) {
				var prodRegPrice = createEl('p', { 
					className: classNames.regularPrice, 
					text: priceLabels.price + ' ' + YStore.currencySymbol + p.rp, 
					parent: caption 
				});
				var prodPrice = createEl('p', { 
					className: classNames.price + ' ' + ((p.pt === 'c') ? classNames.csDiscPrice : classNames.salePrice) + ' ' + classNames.promo, 
					text: ((p.pt === 'c') ? priceLabels.csDiscPrice : priceLabels.salePrice) + ' ' + YStore.currencySymbol + p.p, 
					parent: caption 
				});
			}
			else { // This item has only a regular price.
				var prodPrice = createEl('p', { 
					className: classNames.price + ' ' + classNames.regularPrice, 
					text: priceLabels.price + ' ' + YStore.currencySymbol + p.p, 
					parent: caption 
				});				
			}

			// Add the tracking data to the URL of the anchor tags.
			if(funcsAvailable) {
				if(imageExists) {
					YStore.CrossSellBeacon.addRecData(ids.imgLinkPrefix + p.id, p.u, p.id, p.m, p.s, p.v);
					YStore.CrossSellBeacon.setClickTagUrl(imgLinkId);
				}

				YStore.CrossSellBeacon.addRecData(ids.nameLinkPrefix + p.id, p.u, p.id, p.m, p.s, p.v);
				YStore.CrossSellBeacon.setClickTagUrl(prodLinkId);

				// order button
				YStore.CrossSellBeacon.addRecData(ids.orderButtonPrefix + p.id, p.u, p.id, p.m, p.s, p.v);
				YStore.CrossSellBeacon.setClickTagUrl(orderButtonId);
			}
		}

		callRecViewTag();
	}
	
	function callRecViewTag() {
		if(recViewTagCalled || typeof YStore.CrossSellBeacon === 'undefined') return;
		if(typeof YStore.CrossSellBeacon.rid === 'undefined') YStore.CrossSellBeacon.rid = '';
		if(typeof YStore.CrossSellBeacon.sn === 'undefined') YStore.CrossSellBeacon.sn = '';
		log('Calling csell_REC_VIEW_TAG().');
		recViewTagCalled = true;
		csell_REC_VIEW_TAG();
	};

	// Public methods.
	
	return {
		retryAssembleRecs: function() { // Called after a delay if the container element isn't found yet.
			retryAttempts++;
			log('Retry attempt ' + retryAttempts + ' out of ' + RETRY_LIMIT + ', after a delay of ' + RETRY_WAIT + ' ms');
			assembleRecommendations(cached.recsArray, cached.header, cached.orientation, cached.priceLabels);
		},
	  
		asyncCallback: function(obj) {
			log('Total request time: ' + ((new Date()).getTime() - requestStartTime.getTime()) + ' ms');	
			// Guide to short variables names returned from the webservice:
			//	r: recommendations, an array of the products that have been recommended for this product page.
			//		id: product id.
			//		n: product name.
			//		p: product price.
			//		u: product URL.
			//		i: product image URL.
			//		op: 1 or 0 depending on whether the product has options or not.
			//		m: model name.
			//		s: sequence.
			//	rid: Used in beaconing, must be assigned to YStore.CrossSellBeacon.rid.
			//	sn: Used in beaconing, must be assigned to YStore.CrossSellBeacon.sn.
			if(typeof obj !== 'undefined' && 
					typeof obj.r !== 'undefined' && 
					typeof obj.h !== 'undefined' && 
					typeof obj.o !== 'undefined') {
				cached.recsArray = obj.r;
				cached.header = obj.h;
				cached.orientation = obj.o;
				cached.priceLabels = { // We don't check for these because they might not be set.
					price: obj.rpl,
					salePrice: obj.spl,
					csDiscPrice: obj.cpl
				};
				YStore.CrossSellBeacon.vibesData = (typeof obj.v === 'object') ? obj.v : {};

				assembleRecommendations(cached.recsArray, cached.header, cached.orientation, cached.priceLabels);
			}
			else {
				log('Async response does not include the needed data.');
				callRecViewTag();
			}
		},
		
		init: function() {
			if(requiredVarsSet() && requiredCapabilitiesPresent() && requiredElementPresent()) {
				if(typeof YStore.csellData !== 'undefined' && 
						typeof YStore.csellData.r !== 'undefined' && 
						typeof YStore.csellData.h !== 'undefined' && 
						typeof YStore.csellData.o !== 'undefined') { // The data is already present.
					log('Cross-sell data is already present.');
					cached.recsArray = YStore.csellData.r;
					cached.header = YStore.csellData.h;
					cached.orientation = YStore.csellData.o;
					cached.priceLabels = { // We don't check for these because they might not be set.
						price: YStore.csellData.rpl,
						salePrice: YStore.csellData.spl,
						csDiscPrice: YStore.csellData.cpl
					};
					YStore.CrossSellBeacon.vibesData = YStore.csellData.v;
					assembleRecommendations(cached.recsArray, cached.header, cached.orientation, cached.priceLabels);
				}
				else if(typeof YStore.crossSellUrl !== 'undefined') { 
					log('Cross-sell data not found. Fetching...');
					var asyncUrl = assembleUrl();
					jsonScriptRequest(asyncUrl);
				}
				else {
					log('Cross-sell data not found and webservice URL not found. Exiting');
					callRecViewTag();
				}
			}
			else {
				log('Cross-sell recs cannot be rendered; the needed variables, methods and HTML elements aren\'t set.');
				callRecViewTag();
			}
		}
	};
})();
YStore.CrossSellRecs.init();
