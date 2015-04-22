/**
 * Loginza widget
 * @version 2.0
 */
if ((typeof LOGINZA == "undefined") || !LOGINZA) {
	// инициализация объекта LOGINZA
    var LOGINZA = {
    	loaded: false,
    	service_host: 'http://loginza.ru'
    };
}
// настройки
LOGINZA.Options = {
	mode: 'link', // режим работы link или frame
	ajaxCallback: false
};
// виджет
LOGINZA.Widget = {
	iframe: null,
	Params: {
		provider:null, 
		providers_set:null, 
		token_url:null, 
		lang:null, 
		mobile: false,
		widget_id: null
		//ajax: false
		},
	init: function (widgetId) {
		LOGINZA.Widget.Params.widget_id = widgetId;
		//init json parser
		LOGINZA.Utils.initJSON();
		LOGINZA.Utils.addEvent(window, 'load', LOGINZA.Widget._init);
		LOGINZA.Utils.addEvent(window, 'message', LOGINZA.Utils.scriptMessage);
	},
	_init: function () {
		// если линк режим
		if (LOGINZA.Options.mode == 'link') {
			// обработчик на открытие формы
			if (document.getElementById('loginza') && document.getElementById('loginza').href != undefined) {
				document.getElementById('loginza').onclick = LOGINZA.Widget._show;
			}
			var i, list = LOGINZA.Utils.findClass('loginza'), length = list.length;
			for(i = 0; i < length; i++) {
				if (list[i].href != undefined) {
					list[i].onclick = LOGINZA.Widget._show;
				}
			}
			
			// прочие обработчики
			LOGINZA.Utils.addEvent(window, 'resize', LOGINZA.Widget.resize);
			LOGINZA.Utils.addEvent(document, 'keydown', function(e) {
				e = e || window.event;
				if (e.keyCode == 27) {
					LOGINZA.Widget.close();
				}
				return true;
			});
		} else {
			// режим frame
			LOGINZA.Widget.iframe = document.createElement("iframe");
			
			LOGINZA.Widget.iframe.id = 'loginza_main_ifr';
			LOGINZA.Widget.iframe.width = '359';
			LOGINZA.Widget.iframe.height = '200';
			
			if (LOGINZA.Widget.Params.mobile) {
				LOGINZA.Widget.iframe.width = '320';
				LOGINZA.Widget.iframe.height = '480';
			}
			LOGINZA.Widget.iframe.scrolling = 'no';
			LOGINZA.Widget.iframe.frameBorder = '0';
			LOGINZA.Widget.iframe.src = LOGINZA.Widget.url();
			
			// appends
			document.getElementById('loginza').appendChild(LOGINZA.Widget.iframe);
		}
		
		LOGINZA.Events._callEvent('onReady');
	},
	setFrameMode: function () {
		LOGINZA.Options.mode = 'frame';
		LOGINZA.Widget.Params.token_url = document.location;
	},
	setAjaxCallback: function(callback){
		LOGINZA.Options.ajaxCallback = callback;
	},
	_show: function () {
		// параметры которые берутся по ссылке
		var params = ['provider', 'providers_set', 'token_url', 'lang', 'mobile'];
		for (var i=0, toi=params.length; i<toi; i++) {
			LOGINZA.Widget.Params[params[i]] = LOGINZA.Utils.getQueryStringValue(this, params[i]);
		}
		// определение устройства
		if (LOGINZA.Widget.Params.mobile == 'auto') {
			var nav = window.navigator.userAgent;
			var mobua = ['iPhone', 'Android', 'iPad', 'Opera Mobi', 'Kindle/3.0'];
			LOGINZA.Widget.Params.mobile = false;
			for (var i=0; i<mobua.length; i++){
				if (nav.indexOf(mobua[i]) >= 0) {
					LOGINZA.Widget.Params.mobile = true;
					break;
				}
			}
		} else if (LOGINZA.Widget.Params.mobile) {
			LOGINZA.Widget.Params.mobile = true;
		} else {
			LOGINZA.Widget.Params.mobile = false;
		}
		
		LOGINZA.Widget.show();
		return false;
	},
	show: function () {
		// onOpen
		LOGINZA.Events._callEvent('onOpen');
		
		if (!LOGINZA.Widget.Params.mobile && !LOGINZA.loaded) {
			var cldDiv = document.createElement("div");
			cldDiv.id = 'loginza_auth_form';
			cldDiv.style.overflow = 'visible';
			cldDiv.style.backgroundColor = 'transparent';
			cldDiv.style.zIndex = '10000';
			cldDiv.style.position = 'fixed';
			cldDiv.style.display = 'block';
			cldDiv.style.top = '0px';
			cldDiv.style.left = '0px';
			cldDiv.style.textAlign = 'center';
			cldDiv.style.height = '878px';
			cldDiv.style.width = '1247px';
			cldDiv.style.paddingTop = '125px';
			cldDiv.style.backgroundImage = 'url('+LOGINZA.service_host+'/img/widget/overlay.png)';
			
			var cntDiv = document.createElement("div");
			cntDiv.style.position = 'relative';
			cntDiv.style.display = 'inline';
			cntDiv.style.overflow = 'visible';
			
			var img = document.createElement("img");
			img.onclick = LOGINZA.Widget.close;
			img.style.position = 'relative';
			img.style.left = '348px';
			img.style.top = '-332px';
			img.style.cursor = 'hand';
			img.style.width = '7px';
			img.style.height = '7px';
			img.style.border = '0';
			img.alt = 'X';
			img.title = 'Close';
			img.src = LOGINZA.service_host+'/img/widget/close.gif';
			
			LOGINZA.Widget.iframe = document.createElement("iframe");
			
			LOGINZA.Widget.iframe.id = 'loginza_main_ifr';
			LOGINZA.Widget.iframe.width = '359';
			LOGINZA.Widget.iframe.height = '350';
			
			if (LOGINZA.Widget.Params.mobile) {
				LOGINZA.Widget.iframe.width = '320';
				LOGINZA.Widget.iframe.height = '480';
			}
			LOGINZA.Widget.iframe.scrolling = 'no';
			LOGINZA.Widget.iframe.frameBorder = '0';
			LOGINZA.Widget.iframe.src = "javascript:'<html><body style=background-color:transparent><h1>Loading...</h1></body></html>'";
			
			// appends
			cntDiv.appendChild(img);
			cldDiv.appendChild(cntDiv);
			cldDiv.appendChild(LOGINZA.Widget.iframe);
			
			try {
				cldDiv.style.paddingTop = (window.innerHeight-350)/2 + 'px';
			} catch (e) {
				cldDiv.style.paddingTop = '100px';
			}
			cldDiv.style.paddingLeft = 0;
			cldDiv.style.height = '2000px';
			cldDiv.style.width = document.body.clientWidth + 50 + 'px';
			// создание контейнера для формы
			document.body.appendChild(cldDiv);
			// форма загружена
			LOGINZA.loaded = true;
		}

		if (!LOGINZA.Widget.Params.token_url) {
			LOGINZA.Widget.Params.token_url = document.location;
		}
	
		if (LOGINZA.Widget.Params.mobile) {
			document.location = LOGINZA.Widget.url();
		} else {
			// загрузка формы
			document.getElementById('loginza_main_ifr').setAttribute('src', LOGINZA.Widget.url());
		}

		if (!LOGINZA.Widget.Params.mobile) {
			// показать форму
			document.getElementById('loginza_auth_form').style.display = '';
		}

		return false;
	},
	url: function () {
		return LOGINZA.service_host+'/api/widget.php?'
		+(LOGINZA.Options.mode=='link' ? 'overlay=true' : 'overlay=loginza')
		+'&w='+document.body.clientWidth+
		'&token_url='+encodeURIComponent(LOGINZA.Widget.Params.token_url)+
		'&provider='+encodeURIComponent(LOGINZA.Widget.Params.selected_provider)+
		'&providers_set='+encodeURIComponent(LOGINZA.Widget.Params.providers_set)+
		'&lang='+encodeURIComponent(LOGINZA.Widget.Params.lang)+
		'&ajax='+( (LOGINZA.Options.ajaxCallback !== false) ? 'true' : 'false' )+
		(LOGINZA.Widget.Params.mobile ? '&mobile=true' : '')
		+'&widget_id='+encodeURIComponent(LOGINZA.Widget.Params.widget_id)
		+'&api=2.0';
	},
	close: function () {
		document.getElementById('loginza_auth_form').style.display = 'none';
		// onClose
		LOGINZA.Events._callEvent('onClose');
	},
	resize: function () {
		var frm = document.getElementById('loginza_auth_form');
		if (frm) {
			frm.style.width = document.body.clientWidth + 50 + 'px';
			try {
				frm.style.paddingTop = (window.innerHeight-350)/2 + 'px';
			} catch (e) {
				frm.style.paddingTop = '100px';
			}
		}
	},
	callbacks: {
		onLoad: function(){
			LOGINZA.Events._callEvent('onLoad');
		},
		redirect: function () {
			document.location = LOGINZA.service_host+'/api/redirect?rnd='+Math.random();
		},
		token: function (token) {
			if (LOGINZA.Options.mode=='link') {
				LOGINZA.Widget.close();
			}
			// вызов callback
			if (typeof LOGINZA.Options.ajaxCallback != 'undefined') {
				if (typeof LOGINZA.Options.ajaxCallback == 'string') {
					window[ LOGINZA.Options.ajaxCallback ](token);
				} else {
					LOGINZA.Options.ajaxCallback(token);
				}
			}
		}
	}
};
// АПИ
LOGINZA.Api = {
	bind: function (event, callback) {
		if (LOGINZA.Events[event]) {
			LOGINZA.Events[event][ LOGINZA.Events[event].length ] = callback;
		}
	},
	closeWidget: function () {
		LOGINZA.Widget.close();
	}
};
LOGINZA.Events = {
	onOpen: [],
	onClose: [],
	onReady: [],
	onLoad: [], // форма загружена
	// вызов callback
	_callEvent: function (event, data) {
		if (LOGINZA.Events[event]) {
			for (var i in LOGINZA.Events[event]) {
				LOGINZA.Events[event][i](data);
			}
		}
	}
};
LOGINZA.Utils = {
	getQueryStringValue: function (link, key) {
		var url_str = link.href;
	    var match = null;
	    var query_str = url_str.match(/^[^?]*(?:\?([^#]*))?(?:$|#.*$)/)[1]
	    var _query_regex = new RegExp("([^=]+)=([^&]*)&?", "g");
	    while ((match = _query_regex.exec(query_str)) != null)
	    {
	        if (decodeURIComponent(match[1]) == key) {
	            return decodeURIComponent(match[2]);
	        }
	    }
	    return null;
	},
	findClass: function (str, node) {
		if(document.getElementsByClassName) return (node || document).getElementsByClassName(str);
		else {
			var node = node || document, list = node.getElementsByTagName('*'), length = list.length, Class = str.split(/\s+/), classes = Class.length, array = [], i, j, key;
			for(i = 0; i < length; i++) {
				key = true;
				for(j = 0; j < classes; j++) if(list[i].className.search('\\b' + Class[j] + '\\b') == -1) key = false;
				if(key) array.push(list[i]);
			}
			return array;
		}
	},
	addEvent: function (obj, type, fn){
		if (obj.addEventListener){
		      obj.addEventListener( type, fn, false);
		} else if(obj.attachEvent) {
		      obj.attachEvent( "on"+type, fn );
		} else {
		      obj["on"+type] = fn;
		}
	},
	scriptMessage: function (event) {
		var message = LOGINZA.Utils.secureEvalJSON(event.data);
		if (typeof LOGINZA.Widget.callbacks[message.callback] != 'undefined') {
			// callback call
			LOGINZA.Widget.callbacks[message.callback](message.data);
		}
	},
	callRemoteFunction: function (callback, data) {
		var message = {callback: callback, data: data};
		LOGINZA.Widget.iframe.contentWindow.postMessage(LOGINZA.Utils.toJSON(message), LOGINZA.Widget.iframe.src);
	},
	// json parser
	initJSON: function() {
		(function($){$.toJSON=function(o)
		{if(typeof(JSON)=='object'&&JSON.stringify)
		return JSON.stringify(o);var type=typeof(o);if(o===null)
		return"null";if(type=="undefined")
		return undefined;if(type=="number"||type=="boolean")
		return o+"";if(type=="string")
		return $.quoteString(o);if(type=='object')
		{if(typeof o.toJSON=="function")
		return $.toJSON(o.toJSON());if(o.constructor===Date)
		{var month=o.getUTCMonth()+1;if(month<10)month='0'+month;var day=o.getUTCDate();if(day<10)day='0'+day;var year=o.getUTCFullYear();var hours=o.getUTCHours();if(hours<10)hours='0'+hours;var minutes=o.getUTCMinutes();if(minutes<10)minutes='0'+minutes;var seconds=o.getUTCSeconds();if(seconds<10)seconds='0'+seconds;var milli=o.getUTCMilliseconds();if(milli<100)milli='0'+milli;if(milli<10)milli='0'+milli;return'"'+year+'-'+month+'-'+day+'T'+
		hours+':'+minutes+':'+seconds+'.'+milli+'Z"';}
		if(o.constructor===Array)
		{var ret=[];for(var i=0;i<o.length;i++)
		ret.push($.toJSON(o[i])||"null");return"["+ret.join(",")+"]";}
		var pairs=[];for(var k in o){var name;var type=typeof k;if(type=="number")
		name='"'+k+'"';else if(type=="string")
		name=$.quoteString(k);else
		continue;if(typeof o[k]=="function")
		continue;var val=$.toJSON(o[k]);pairs.push(name+":"+val);}
		return"{"+pairs.join(", ")+"}";}};$.evalJSON=function(src)
		{if(typeof(JSON)=='object'&&JSON.parse)
		return JSON.parse(src);return eval("("+src+")");};$.secureEvalJSON=function(src)
		{if(typeof(JSON)=='object'&&JSON.parse)
		return JSON.parse(src);var filtered=src;filtered=filtered.replace(/\\["\\\/bfnrtu]/g,'@');filtered=filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']');filtered=filtered.replace(/(?:^|:|,)(?:\s*\[)+/g,'');if(/^[\],:{}\s]*$/.test(filtered))
		return eval("("+src+")");else
		throw new SyntaxError("Error parsing JSON, source is not valid.");};$.quoteString=function(string)
		{if(string.match(_escapeable))
		{return'"'+string.replace(_escapeable,function(a)
		{var c=_meta[a];if(typeof c==='string')return c;c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16);})+'"';}
		return'"'+string+'"';};var _escapeable=/["\\\x00-\x1f\x7f-\x9f]/g;var _meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};})(this);
	}
};
