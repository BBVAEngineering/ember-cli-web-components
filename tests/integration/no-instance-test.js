import { module, test } from 'qunit';
import { defineCustomElements } from 'ember-cli-web-components';

module('Integration | no-instance', (hooks) => {
	hooks.beforeEach(() => {
		defineCustomElements({
			'my-component': {
				name: 'my-component'
			}
		});
	});

	test('it defines custom component', (assert) => {
		const customElement = customElements.get('my-component');

		assert.ok(customElement);
	});

	test('custom element can be created', async(assert) => {
		const element = document.createElement('my-component');

		const rootElement = document.querySelector('#ember-testing');

		rootElement.appendChild(element);

		assert.ok(element.isConnected);
	});
});
