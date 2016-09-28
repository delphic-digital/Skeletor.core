export default class Plugin {

	constructor(element, options){
		this._uuids = [];
		this.$element = element || $(document);
		this.options = options;
	}

	set defaults(defaults){
		this.options = $.extend(true, {}, defaults, this.options);
	}
}