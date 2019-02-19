import { module, test } from 'qunit';
import { defineCustomElements } from 'ember-cli-web-components';
import Application from '@ember/application';
import { waitUntil } from '@ember/test-helpers';

module('Integration | no-app', (hooks) => {
	hooks.beforeEach(function() {
		this.onerror = window.onerror;
		this.namespace = Application.NAMESPACES[0];

		Application.NAMESPACES.length = 0;

		window.onerror = (_0, _1, _2, _3, e) => {
			this.error = e;
			return true;
		};

		defineCustomElements({
			'my-component': {
				name: 'my-component'
			}
		});
	});

	hooks.afterEach(function() {
		Application.NAMESPACES.push(this.namespace);
		window.onerror = this.onerror;
	});

	test('it defines custom component', (assert) => {
		const customElement = customElements.get('my-component');

		assert.ok(customElement);
	});

	test('custom element cannot be created', async function(assert) {
		const element = document.createElement('my-component');

		const rootElement = document.querySelector('#ember-testing');

		assert.test.ignoreGlobalErrors = true;

		rootElement.appendChild(element);

		await waitUntil(() => this.error);

		assert.test.ignoreGlobalErrors = false;

		assert.ok(this.error instanceof Error);
		assert.ok(this.error.message.match(/owner/));
	});
});
