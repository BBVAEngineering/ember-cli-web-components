import { module, test } from 'qunit';
import { defineCustomElements } from 'ember-cli-web-components';
import Component from '@ember/component';

module('Integration | no-instance', (hooks) => {
	hooks.beforeEach(() => {
		define('dummy/components/no-instance', ['exports'], (exports) => {
			exports.default = Component.extend();
		});

		defineCustomElements({
			'no-instance': {
				name: 'no-instance'
			}
		});
	});

	hooks.afterEach(() => {
		delete require('dummy/components/no-instance');
	});

	test('it defines custom component', (assert) => {
		const customElement = customElements.get('no-instance');

		assert.ok(customElement);
	});

	test('custom element can be created', async(assert) => {
		const element = document.createElement('no-instance');

		const rootElement = document.querySelector('#ember-testing');

		rootElement.appendChild(element);

		assert.ok(element.isConnected);
	});
});
