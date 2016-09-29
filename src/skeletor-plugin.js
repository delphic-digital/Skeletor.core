import Skeletor from './skeletor.js'

export default class SkeletorPlugin {

	constructor(element, options){
		this.NAME = this.constructor.name;
		this.UUID = SkeletorPlugin.getYoDigits(6, this.constructor.name)
		this.$element = element || $(document);
		this.options = options;

		//Store plugin on element for later retrievel
		if(!this.$element.data('skeletorPlugin')){ this.$element.data('skeletorPlugin', this); }

		//Store UUID with Skeletor
		Skeletor.registerInstance(this.UUID);
	}

	static register(){
		Skeletor.registerPlugin(this);
	}

	static getYoDigits(length, namespace) {
		length = length || 6;
		return Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)).toString(36).slice(1) + (namespace ? '-' + namespace : '');
	}

	set defaults(value){ this.options = $.extend(true, {}, value, this.options); }
}
