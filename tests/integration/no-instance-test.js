import { module, test } from 'qunit';
import { defineCustomElements } from 'ember-cli-web-components';

module('Integration | no-component', (hooks) => {
	hooks.beforeEach(() => {
		defineCustomElements({
			'fake-component': {
				name: 'fake-component'
			}
		});
	});

	test('it defines custom component', (assert) => {
		const customElement = customElements.get('fake-component');

		assert.ok(customElement);
	});

	test('custom element can be created', async(assert) => {
		const element = document.createElement('fake-component');

		const rootElement = document.querySelector('#ember-testing');

		rootElement.appendChild(element);

		assert.ok(element.isConnected);
	});
});
