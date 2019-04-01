import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import {
	click,
	find,
	render,
	settled
} from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import Component from '@ember/component';
import { defineCustomElements } from 'ember-cli-web-components';

function shadowFind(root, selector) {
	const rootElement = document.querySelector(root);

	if (!rootElement || !rootElement.shadowRoot) {
		return null;
	}

	return rootElement.shadowRoot.querySelector(selector);
}

module('Integration | index', (hooks) => {
	setupRenderingTest(hooks);

	const Button = Component.extend({
		tagName: 'button',
		attributeBindings: ['title'],
		layout: hbs`{{title}}`,
		click() {
			const title = this.get('title');

			title && this.set('title', title.toUpperCase());
		}
	});

	const Content = Component.extend({
		attributeBindings: ['dataId:data-id']
	});

	hooks.beforeEach(function() {
		this.owner.register('component:int-my-button', Button);
		this.owner.register('component:int-my-content', Content);

		defineCustomElements({
			'int-my-button': {
				name: 'int-my-button',
				attributes: ['title']
			},
			'int-my-content': {
				name: 'int-my-content',
				attributes: ['data-id']
			}
		});
	});

	test('it defines custom elements', (assert) => {
		const customElement = customElements.get('int-my-button');

		assert.ok(customElement);
	});

	test('custom element can be created', async(assert) => {
		const element = document.createElement('int-my-button');

		const rootElement = document.querySelector('#ember-testing');

		rootElement.appendChild(element);

		assert.ok(element.isConnected);
	});

	test('custom element can be rendered', async(assert) => {
		await render(hbs`<int-my-button/>`);

		const element = find('int-my-button');

		assert.ok(element);
	});

	test('custom element renders ember component', async(assert) => {
		await render(hbs`<int-my-button/>`);

		const element = shadowFind('int-my-button', 'button');

		assert.ok(element);
	});

	test('custom element reads attributes', async(assert) => {
		await render(hbs`<int-my-button title="foo"/>`);

		const element = shadowFind('int-my-button', 'button');

		assert.equal(element.getAttribute('title'), 'foo');
	});

	test('custom element binds attributes', async(assert) => {
		await render(hbs`<int-my-button title="foo"/>`);

		const root = find('int-my-button');
		const element = shadowFind('int-my-button', 'button');

		root.setAttribute('title', 'bar');

		await settled();

		assert.equal(element.getAttribute('title'), 'bar');
	});

	test('ember component bubbles events to custom element', async function(assert) {
		const done = assert.async();

		this.set('onclick', () => {
			assert.ok(true);
			done();
		});

		await render(hbs`<int-my-button onclick={{onclick}}/>`);

		const element = shadowFind('int-my-button', 'button');

		await click(element, { composed: true });
	});

	test('ember component renders content', async(assert) => {
		await render(hbs`<int-my-content data-id="content">foo</int-my-content>`);

		const element = shadowFind('int-my-content', '[data-id="content"]');

		assert.ok(element);
		assert.equal(element.textContent.trim(), 'foo');
	});

	test('custom element can be reattached', async(assert) => {
		const element = document.createElement('int-my-button');

		const rootElement = document.querySelector('#ember-testing');

		rootElement.appendChild(element);

		await settled();

		element.remove();

		rootElement.appendChild(element);

		assert.ok(element.isConnected);
	});

	test('it can render same custom element multiple times', async(assert) => {
		await render(hbs`
			<int-my-content data-id="foo">foo</int-my-content>
			<int-my-content data-id="bar">bar</int-my-content>
		`);

		const foo = find('[data-id="foo"]');
		const bar = find('[data-id="bar"]');

		assert.ok(foo);
		assert.ok(bar);
	});

	test('it calls onConnect hook', async function(assert) {
		const done = assert.async();

		this.owner.register('component:my-connect', Content);

		defineCustomElements({
			'my-connect': {
				name: 'my-connect'
			}
		}, {
			onConnect() {
				const element = find('[data-id="bar"]');

				assert.equal(this, element);
				done();
			}
		});

		await render(hbs`<my-connect data-id="bar"/>`);
	});

	test('it calls onRender hook', async function(assert) {
		const done = assert.async();

		this.owner.register('component:my-render', Content);

		defineCustomElements({
			'my-render': {
				name: 'my-render'
			}
		}, {
			onRender() {
				const element = find('[data-id="bar"]');

				assert.equal(this, element);
				done();
			}
		});

		await render(hbs`<my-render data-id="bar"/>`);
	});

	test('it can render same custom element multiple times', async(assert) => {
		await render(hbs`<int-my-content data-id="foo">foo</int-my-content>`);

		const foo = find('[data-id="foo"]');

		foo.textContent = 'bar';

		await settled();

		const inner = shadowFind('int-my-content', '[data-id="foo"]');

		assert.equal(inner.textContent.trim(), 'bar');
	});
});
