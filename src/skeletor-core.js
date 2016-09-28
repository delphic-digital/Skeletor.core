import $ from 'jquery';

class Skeletor {
	get VERSION() { return '0.3.0'; }

	constructor(method){
		let type = typeof method;

		//console.log(type)

		this._uuids = [];
		//console.log('this is the skeletor constructor and will create the jquery plugin')
	}

	register(plugin){
		//Get name of function
		let name = plugin.name;

		Object.defineProperty(Skeletor.prototype, name, {
			get: function() {
				return plugin;
			}
		})

		console.info(`successfully registered skeletor plugin: ${name}`)
	}

	set uuid(pluginName){
		this._uuids.push(Skeletor.GetYoDigits(6, pluginName.toLowerCase()));
	}

	static GetYoDigits(length, namespace) {
		length = length || 6;
		return Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)).toString(36).slice(1) + (namespace ? '-' + namespace : '');
	}

}

export let skeletor = new Skeletor();

window.Skeletor = skeletor;

