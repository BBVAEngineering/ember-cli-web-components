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
		this.owner.register('component:my-button', Button);
		this.owner.register('component:my-content', Content);

		defineCustomElements({
			'my-button': {
				name: 'my-button',
				attributes: ['title']
			},
			'my-content': {
				name: 'my-content',
				attributes: ['data-id']
			}
		});
	});

	test('it defines custom elements', (assert) => {
		const customElement = customElements.get('my-button');

		assert.ok(customElement);
	});

	test('custom element can be created', async(assert) => {
		const element = document.createElement('my-button');

		const rootElement = document.querySelector('#ember-testing');

		rootElement.appendChild(element);

		assert.ok(element.isConnected);
	});

	test('custom element can be rendered', async(assert) => {
		await render(hbs`<my-button/>`);

		const element = find('my-button');

		assert.ok(element);
	});

	test('custom element renders ember component', async(assert) => {
		await render(hbs`<my-button/>`);

		const element = shadowFind('my-button', 'button');

		assert.ok(element);
	});

	test('custom element reads attributes', async(assert) => {
		await render(hbs`<my-button title="foo"/>`);

		const element = shadowFind('my-button', 'button');

		assert.equal(element.getAttribute('title'), 'foo');
	});

	test('custom element binds attributes', async(assert) => {
		await render(hbs`<my-button title="foo"/>`);

		const root = find('my-button');
		const element = shadowFind('my-button', 'button');

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

		await render(hbs`<my-button onclick={{onclick}}/>`);

		const element = shadowFind('my-button', 'button');

		await click(element, { composed: true });
	});

	test('ember component renders content', async(assert) => {
		await render(hbs`<my-content data-id="content">foo</my-content>`);

		const element = shadowFind('my-content', '[data-id="content"]');

		assert.ok(element);
		assert.equal(element.textContent.trim(), 'foo');
	});

	test('custom element can be reattached', async(assert) => {
		const element = document.createElement('my-button');

		const rootElement = document.querySelector('#ember-testing');

		rootElement.appendChild(element);

		await settled();

		element.remove();

		rootElement.appendChild(element);

		assert.ok(element.isConnected);
	});

	test('it can render same custom element multiple times', async(assert) => {
		await render(hbs`
			<my-content data-id="foo">foo</my-content>
			<my-content data-id="bar">bar</my-content>
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
});
