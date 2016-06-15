/**
 * @copyright   2016, The Skeletor Project
 * @license     http://opensource.org/licenses/BSD-3-Clause
 */

define(['jquery'],function ($){

	// Global Skeletor object

	var Skeletor = {
		namespace: '',
		debug: false,
		messages: {
			loading: 'Loading...',
			error: 'An error has occurred!'
		},
		_plugins: {},

		_uuids: [],

		registerPlugin: function(plugin, name) {

			// Object key to use when adding to global Skeletor object
			// Examples: Skeletor.Reveal, Skeletor.OffCanvas
			var className = (name || functionName(plugin));

			// Object key to use when storing the plugin
			var attrName  = hyphenate(className);

			// Add to the Skeletor object and the plugins list
			this._plugins[attrName] = this[className] = plugin;

			return;
		},
		/**
		 * @function
		 * Populates the _uuids array with pointers to each individual plugin instance.
		 * Adds the `zfPlugin` data-attribute to programmatically created plugins to allow use of $(selector).foundation(method) calls.
		 * @param {Object} plugin - an instance of a plugin, usually `this` in context.
		 * @param {String} name - the name of the plugin, passed as a camelCased string.
		 */
		instantiatePlugin: function(plugin, name){
			var pluginName = name ? hyphenate(name) : functionName(plugin.constructor).toLowerCase();
			plugin.uuid = this.GetYoDigits(6, pluginName);

			if(!plugin.$element.data('skeletorPlugin')){ plugin.$element.data('skeletorPlugin', plugin); }

			this._uuids.push(plugin.uuid);
		},
		GetYoDigits: function (length, namespace) {
			length = length || 6;
			return Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)).toString(36).slice(1) + (namespace ? '-' + namespace : '');
		},
	};

	//The skeletor jquery plugin
	//Thanks to Zurbs Foundation for there hardwork on this pattern

	var skeletor = function(method) {
		var type = typeof method;

		if(type === 'undefined'){//needs a parameter passed as a method
			throw new ReferenceError("We're sorry, you have to pass a method for " + (plugClass ? functionName(plugClass) : 'this element') + '.');
		}else if(type === 'string'){//an individual method to invoke on a plugin or group of plugins
			var args = Array.prototype.slice.call(arguments, 1);//collect all the arguments, if necessary
			var plugClass = this.data('skeletorPlugin');//determine the class of plugin
			if(plugClass !== undefined && plugClass[method] !== undefined){//make sure both the class and method exist
				if(this.length === 1){//if there's only one, call it directly.
					plugClass[method].apply(plugClass, args);
				}else{
					this.each(function(i, el){//otherwise loop through the jQuery collection and invoke the method on each
						plugClass[method].apply($(el).data('skeletorPlugin'), args);
					});
				}
			}else{//error for no class or no method
				throw new ReferenceError("We're sorry, '" + method + "' is not an available method for " + (plugClass ? functionName(plugClass) : 'this element') + '.');
			}
		}else{//error for invalid argument type
				throw new TypeError(`We're sorry, ${type} is not a valid parameter. You must use a string representing the method you wish to invoke.`);
			}
		return this;
	}

	//UTILS

	function functionName(fn) {
		if (Function.prototype.name === undefined) {
			var funcNameRegex = /function\s([^(]{1,})\(/;
			var results = (funcNameRegex).exec((fn).toString());
			return (results && results.length > 1) ? results[1].trim() : "";
		}
		else if (fn.prototype === undefined) {
			return fn.constructor.name;
		}
		else {
			return fn.prototype.constructor.name;
		}
	}

	// Convert PascalCase to kebab-case
	// Thank you: http://stackoverflow.com/a/8955580
	function hyphenate(str) {
		return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}


	window.Skeletor = Skeletor;
	$.fn.skeletor = skeletor;

	return Skeletor;
});
