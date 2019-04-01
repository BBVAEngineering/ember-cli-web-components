import { camelize } from '@ember/string';
import Application from '@ember/application';
import { get } from '@ember/object';
import Controller from '@ember/controller';
import Ember from 'ember';
import { schedule } from '@ember/runloop';
import { compileTemplate } from '@ember/template-compilation';

const { generateGuid } = Ember;

/**
 * TODO:
 *	- Normalize attributes based on arguments.
 *	- Destroy component on disconnectedCallback.
 */

function getAttributeList(node) {
	const list = [];

	node.getAttributeNames().forEach((attr) => {
		const normalizedAttr = camelize(attr);

		list.push(`${normalizedAttr}=${normalizedAttr}`);
	});

	return list.join(' ');
}

function setAttributes(context, node) {
	node.getAttributeNames().forEach((attr) => {
		const value = node.getAttribute(attr);
		const normalizedAttr = camelize(attr);

		context.set(normalizedAttr, value);
	});
}

function renderTemplate(owner, template) {
	const guid = generateGuid();
	const OutletView = owner.factoryFor('view:-outlet');
	const toplevelView = OutletView.create();

	owner.register(`template:-outlet-${guid}`, compileTemplate('{{outlet}}'));

	const OutletTemplate = owner.lookup(`template:-outlet-${guid}`);

	owner.register(`template:-web-component-${guid}`, template);

	owner.register(`controller:-web-component-${guid}`, Controller);

	const controller = owner.lookup(`controller:-web-component-${guid}`);

	const outletState = {
		render: {
			owner,
			into: undefined,
			outlet: 'main',
			name: 'application',
			controller: undefined,
			ViewClass: undefined,
			template: OutletTemplate
		},
		outlets: {
			main: {
				render: {
					owner,
					into: undefined,
					outlet: 'main',
					name: 'index',
					controller,
					ViewClass: undefined,
					template: owner.lookup(`template:-web-component-${guid}`),
					outlets: {}
				},
				outlets: {}
			}
		}
	};

	toplevelView.setOutletState(outletState);

	return { toplevelView, controller };
}

function findOwner() {
	const application = get(Application, 'NAMESPACES.0');

	if (!application) {
		return null;
	}

	const applicationInstances = get(application, '_applicationInstances');
	let instance;

	if (applicationInstances.size === 0) {
		instance = application.buildInstance();
	} else {
		instance = applicationInstances.keys().next().value;
	}

	if (!instance._booted) {
		// eslint-disable-next-line no-sync
		instance._bootSync({ shouldRender: false });
	}

	return instance;
}

function fixEnvironment(owner) {
	const environment = owner.lookup('-environment:main');

	if (!environment.isInteractive) {
		environment.isInteractive = true;
	}
}

function initializeCustomElement(elementName, { name: componentName, attributes: componentAttributes }, options) {
	if (customElements.get(elementName)) {
		return;
	}

	class EmberElement extends HTMLElement {
		connectedCallback() {
			if (this.shadowRoot) {
				return;
			}

			const owner = findOwner();

			if (!owner) {
				throw new Error('Cannot find a valid Ember owner to render component.');
			}

			const klass = owner.resolveRegistration(`component:${componentName}`);

			if (!klass) {
				return;
			}

			fixEnvironment(owner);

			const self = this;
			const shadow = this.attachShadow({ mode: 'open' });
			const eventDispatcher = owner.factoryFor('event_dispatcher:main').create();

			// Hack to fix event_dispatcher need of a parent with classList.
			shadow.classList = this.classList;

			if (options.onConnect) {
				options.onConnect.call(self);
			}

			schedule('afterRender', () => {
				const attrs = getAttributeList(self);
				const template = compileTemplate(`{{#${componentName} ${attrs}}}${self.innerHTML}{{/${componentName}}}`);
				const { toplevelView, controller } = renderTemplate(owner, template);

				setAttributes(controller, self);

				self.context = controller;

				toplevelView.appendTo(shadow);

				schedule('afterRender', () => {
					eventDispatcher.setup(null, shadow.children[0]);
				});

				if (options.onRender) {
					options.onRender.call(self);
				}
			});
		}

		attributeChangedCallback() {
			if (this.context) {
				setAttributes(this.context, this);
			}
		}

		static get observedAttributes() {
			return componentAttributes;
		}
	}

	window.customElements.define(elementName, EmberElement);
}

export function defineCustomElements(customElementDefinitions, options = {}) {
	Object.entries(customElementDefinitions).forEach(([elementName, componentDefinition]) => {
		initializeCustomElement(elementName, componentDefinition, options);
	});
}

