import $ from 'jquery';

class Skeletor {
	get VERSION() { return '0.3.0'; }

	constructor(method){
		this._uuids = [];
	}

	static jQueryPlugin(method){
		let type = typeof method;
		let pluginInstance = this.data('skeletorPlugin'); //determine the class of plugin

		if(type === 'undefined'){ //needs a parameter passed as a method
			throw new ReferenceError(`We're sorry, you have to pass a method for ${(pluginInstance ? pluginInstance.NAME : 'this element')}.`);

		}else if(type === 'string'){ //an individual method to invoke on a plugin or group of plugins
			var args = Array.prototype.slice.call(arguments, 1);

			//make sure both the class and method exist, skip private methods
			if(pluginInstance !== undefined && method.charAt(0) !== '_' && pluginInstance[method] !== undefined){

				if(this.length === 1){ //if there's only one, call it directly.
					pluginInstance[method].apply(pluginInstance, args);

				}else{

					this.each(function(i, el){ //otherwise loop through the jQuery collection and invoke the method on each
						pluginInstance[method].apply($(el).data('skeletorPlugin'), args);
					});
				}
			}else{ //error for no class or no method
				throw new ReferenceError("We're sorry, '" + method + "' is not an available method for " + (pluginInstance ? pluginInstance.NAME : 'this element') + '.');
			}
		}else{ //error for invalid argument type
			throw new TypeError(`We're sorry, ${type} type is not a valid parameter. You must use a string representing the method you wish to invoke.`);
		}

		return this;
	}

	registerPlugin(plugin){

		Object.defineProperty(Skeletor.prototype, plugin.name, {
			get: function() {
				return plugin;
			}
		})

		console.info(`successfully registered skeletor plugin: ${plugin.name}`)
	}

	registerInstance(value){
		this._uuids.push(value);
	}

}

let skeletor = new Skeletor();

class SkeletorPlugin {

	constructor(element, options){
		this.NAME = this.constructor.name;
		this.UUID = SkeletorPlugin.getYoDigits(6, this.constructor.name)
		this.$element = element || $(document);
		this.options = options;

		//Store plugin on element for later retrievel
		if(!this.$element.data('skeletorPlugin')){ this.$element.data('skeletorPlugin', this); }

		//Store UUID with Skeletor
		skeletor.registerInstance(this.UUID);
	}

	static register(){
		skeletor.registerPlugin(this);
	}

	static getYoDigits(length, namespace) {
		length = length || 6;
		return Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)).toString(36).slice(1) + (namespace ? '-' + namespace : '');
	}

	set defaults(value){ this.options = $.extend(true, {}, value, this.options); }
}


window.Skeletor = skeletor;
$.fn.skeletor = skeletor.jQueryPlugin;

export { skeletor, SkeletorPlugin}