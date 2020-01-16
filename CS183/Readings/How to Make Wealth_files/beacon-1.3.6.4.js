/* ------------------------------------------------------------------------------------- */
/* Namespace Declarations.                                                               */
/* ------------------------------------------------------------------------------------- */

var YStore = window.YStore || {};

/* ------------------------------------------------------------------------------------- */
/* Cross Sell Beacon Common Code                                                         */
/* ------------------------------------------------------------------------------------- */
/* This object contains functions and variables common to all Cross Sell Beacon stuff    */
/* ------------------------------------------------------------------------------------- */

YStore.CrossSellBeacon = function() {
	/* addEvent: simplified event attachment */
	function addEvent( obj, type, fn ) {
   		if (obj.addEventListener) {
       			obj.addEventListener( type, fn, false );
       			EventCache.add(obj, type, fn);
   		}
		else if (obj.attachEvent) {
       			obj["e"+type+fn] = fn;
       			obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
       			obj.attachEvent( "on"+type, obj[type+fn] );
       			EventCache.add(obj, type, fn);
		}
		else {
       			obj["on"+type] = obj["e"+type+fn];
		}
	}

	var EventCache = function(){
   		var listEvents = [];
   		return {
       			listEvents : listEvents,
       			add : function(node, sEventName, fHandler){
           			listEvents.push(arguments);
       			},
       			flush : function(){
           			var i, item;
           			for(i = listEvents.length - 1; i >= 0; i = i - 1){
               				item = listEvents[i];
               				if(item[0].removeEventListener){
                   				item[0].removeEventListener(item[1], item[2], item[3]);
               				}
               				if(item[1].substring(0, 2) != "on"){
                   				item[1] = "on" + item[1];
               				}
               				if(item[0].detachEvent){
                   				item[0].detachEvent(item[1], item[2]);
               				}
               				item[0][item[1]] = null;
           			}
       			}
   		};
	}();
	addEvent(window,'unload',EventCache.flush);

	return {
		YS_MN: 'mYS1',
		V_MN: 'v_mn',
                lastViewBeaconUrl: '',
		img: null,
		
		validateKeys: function(obj, keyList) {
			for(var i = 0, len = keyList.length; i < len; i++) {
				var k = keyList[i];
				if (obj[k] === null || obj[k] === undefined) {
					return false;
				}
			}
			return true;
		},

		addRecData: function(urlId, url, itemId, modelName, seqIndex, vibesData) {

			if (urlId === undefined || urlId === null ||
			    url === undefined || url === null ||
			    itemId === undefined || itemId === null) {
				// LOG THIS
				return;
			}
			csell_page_rec_data[urlId] = {};
			csell_page_rec_data[urlId]['ui'] = urlId; // optional - only used for click beacon
			csell_page_rec_data[urlId]['u'] = url; // optional - only used for click beacon
			csell_page_rec_data[urlId]['ii'] = itemId;

			// add vibes data
			if (typeof vibesData === 'object') {
				for(var key in vibesData) {
					if (typeof vibesData[key] == 'string') {
						csell_page_rec_data[urlId][key] = vibesData[key];
					}
				}
			}
		},
		renderBeaconWithRecData: function(url) {

			if (url === null || url === undefined) {
				// LOG THIS
				return;
			}

			var vibesDataStr = '';
			if (typeof YStore.CrossSellBeacon.vibesData === 'object') {
				for(var key in YStore.CrossSellBeacon.vibesData) {
					if (typeof YStore.CrossSellBeacon.vibesData[key] == 'string') {
						vibesDataStr += '/'+key+'='+YStore.CrossSellBeacon.vibesData[key];
					}
				}
			}

			var dupeMap = {};

			var csell_page_rec_data_str = '';

			var found_v_mn = false;

			for(var key in csell_page_rec_data) {
				if (false === this.validateKeys(csell_page_rec_data[key], ['ii'])) {
					// LOG THIS
					continue;
				}

				if (typeof dupeMap[csell_page_rec_data[key]['ii']] === 'undefined') {
					// key indicates which reco this is for
					csell_page_rec_data_str += 'ii='+csell_page_rec_data[key]['ii'];

					found_v_mn = false;

					for(var vkey in csell_page_rec_data[key]) {
						var vval = csell_page_rec_data[key][vkey];

						if (typeof vval === 'string') {
							if ('v_' === vkey.substr(0, 2)) {
								csell_page_rec_data_str += ','+vkey+'='+csell_page_rec_data[key][vkey];

								if (0 === vkey.indexOf(this.V_MN)) {
									found_v_mn = true;
								}
							}
						}
					}

					if (false === found_v_mn) {
						csell_page_rec_data_str += ',';
						csell_page_rec_data_str += this.V_MN+'='+this.YS_MN;
					}

					csell_page_rec_data_str += ';';

					dupeMap[csell_page_rec_data[key]['ii']] = 1;
				}
			}
			this.img = new Image();
			this.lastViewBeaconUrl = url+vibesDataStr+'/recs='+csell_page_rec_data_str;
			this.img.src = this.lastViewBeaconUrl;
		},
		// Should ONLY be called after anchor tag that urlId refers to has been rendered
		setClickTagUrl: function(urlId) {

			if (urlId === null || urlId === undefined) {
				// LOG THIS
				return;
			}

			var el = document.getElementById(urlId);
			if (el === undefined || el === null) {
				// LOG THIS
				return;
			}

			if (csell_page_rec_data[urlId] === undefined) {
				// LOG THIS
				return;
			}

			var recData = csell_page_rec_data[urlId];

			if (false === this.validateKeys(recData, ['u', 'ii'])) {
					// LOG THIS
					return;
			}

			if (false === this.validateKeys(csell_page_data, ['si', 'ii', 'bt', 's'])) {
					// LOG THIS
					return;
			}

			var url = recData['u'];

			var typePrefix;
			if (urlId.match(/-image-/)) {
				typePrefix = 'i';
			}
			else if (urlId.match(/-order-btn-/)) {
				typePrefix = 'o';
			}
			else {
				typePrefix = 't';
			}

			// Possibly optimize so we do not need to copy as many fields- have this initialized on reco render
			// in addClickTagData func
			var data = {};
			data['si'] = csell_page_data['si'];
			data['srci'] = csell_page_data['ii'];
			data['bt'] = csell_page_data['bt']+typePrefix+'c';
			data['en'] = (typeof csell_env === 'string') ? csell_env : 'prod';
			data['dsti'] = recData['ii'];
			data[YAHOO.ULT.SRC_SPACEID_KEY] = csell_page_data['s'];
			data.inArray = '';

			// add vibes global data
			if (typeof YStore.CrossSellBeacon.vibesData === 'object') {
				for(var vkey in YStore.CrossSellBeacon.vibesData) {
					if (typeof YStore.CrossSellBeacon.vibesData[vkey] == 'string') {
						data[vkey] = YStore.CrossSellBeacon.vibesData[vkey];
					}
				}
			}

			var found_v_mn = false;

			// add vibes data for target item
			for(var vkey in recData) {
				var vval = recData[vkey];
				if (typeof vval === 'string') {
					if ('v_' === vkey.substr(0, 2)) {
						if (0 === vkey.indexOf(this.V_MN)) {
							found_v_mn = true;
						}

						data[vkey] = recData[vkey];
					}
				}
			}

			if (false === found_v_mn) {
				data[this.V_MN] = this.YS_MN;
			}

			YAHOO.ULT.BEACON = csell_page_data['url']+'/t';

			var el = document.getElementById(urlId);

			(function(data) {
				addEvent(el, 'click', function(e){ setTimeout(function(){ YAHOO.ULT.beacon_click(data); },0); });
			})(data);
		}
	};
}();
