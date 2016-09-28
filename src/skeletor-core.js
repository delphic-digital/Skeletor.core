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
		let name = plugin.name;

		Object.defineProperty(Skeletor.prototype, name, {
			get: function() {
				return plugin;
			}
		})

		console.info(`successfully registered skeletor plugin: ${name}`)
	}

}

export let skeletor = new Skeletor();

window.Skeletor = skeletor;

