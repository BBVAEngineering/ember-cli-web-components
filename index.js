'use strict';

module.exports = {
	name: require('./package').name,

	included(app) {
		this._super.included.apply(this, arguments);
		this.app = app;

		if (this._shouldIncludePolyfill()) {
			this._importPolyfill(app);
		}

		this._importTemplateCompiler(app);
	},

	_shouldIncludePolyfill() {
		// TODO: add option to toggle polyfill.
		return true;
	},

	_importPolyfill(app) {
		this._import(app, 'node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js', { options: 'prepend' });
	},

	_importTemplateCompiler(app) {
		this._import(app, 'node_modules/ember-source/dist/ember-template-compiler.js');
	},

	_import(app, path, options) {
		if (this.import) { // support for ember-cli >= 2.7
			this.import(path, options);
		} else if (app.import) { // support ember-cli < 2.7
			app.import(path, options);
		} else {
			// eslint-disable-next-line no-console
			console.warn('Please run: ember install ember-cli-import-polyfill');
		}
	}

};
