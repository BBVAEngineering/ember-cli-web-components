import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import { defineCustomElements } from 'ember-cli-web-components';

const App = Application.extend({
	modulePrefix: config.modulePrefix,
	podModulePrefix: config.podModulePrefix,
	Resolver
});

loadInitializers(App, config.modulePrefix);

defineCustomElements({
	'my-component': {
		name: 'my-component',
		attributes: ['title']
	}
});

export default App;
