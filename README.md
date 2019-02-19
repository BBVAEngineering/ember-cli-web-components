ember-cli-web-components
==============================================================================

[![Build Status](https://travis-ci.org/BBVAEngineering/ember-cli-web-components.svg?branch=master)](https://travis-ci.org/BBVAEngineering/ember-cli-web-components)
[![GitHub version](https://badge.fury.io/gh/BBVAEngineering%2Fember-cli-web-components.svg)](https://badge.fury.io/gh/BBVAEngineering%2Fember-cli-web-components)
[![NPM version](https://badge.fury.io/js/ember-cli-web-components.svg)](https://badge.fury.io/js/ember-cli-web-components)
[![Dependency Status](https://david-dm.org/BBVAEngineering/ember-cli-web-components.svg)](https://david-dm.org/BBVAEngineering/ember-cli-web-components)
[![codecov](https://codecov.io/gh/BBVAEngineering/ember-cli-web-components/branch/master/graph/badge.svg)](https://codecov.io/gh/BBVAEngineering/ember-cli-web-components)
[![Greenkeeper badge](https://badges.greenkeeper.io/BBVAEngineering/ember-cli-web-components.svg)](https://greenkeeper.io/)
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-web-components.svg)](https://emberobserver.com/addons/ember-cli-web-components)
[![NPM](https://nodei.co/npm/ember-cli-web-components.png?downloads=true&downloadRank=true)](https://nodei.co/npm/ember-cli-web-components/)

This is an experimental addon to allow Ember Components to be reused in apps with other framework, like Vue, React or Polymer, as native Web Components.

Demo: [ember-cli-web-components](https://bbvaengineering.github.io/ember-cli-web-components)
Inspiration: [Glimmer Web Components](https://github.com/glimmerjs/glimmer-web-component)


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.4 or above
* Ember CLI v2.8 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-cli-web-components
```


Usage
------------------------------------------------------------------------------

The main purpose of this addon is to convert an Ember Application in a package to be used in an app as external dependency and export all its components as native Web components.

First of all, install the addon on the Ember App where you have your Ember components and configure it as follow.

This addon needs to generate a bundle with all the config stored in the javascript. So you need to modify your build file to allow it.

```js
// ember-cli-build.js
const app = new EmberAddon(defaults, {
  storeConfigInMeta: false
});
```

Next, you need to block Ember to boot as an Ember App.

```js
// config/environment.js
ENV.APP.autoboot = false;
```

Now, you can generate the bundle.

```
$ ember build
```

On the target app, you need to copy and include the Ember app files `vendor.js` and `app.js`.

```
<script src="assets/vendor.js"></script>
<script src="assets/dummy.js"></script>
```

On the main file of the target app, define the components you want to import. You need to explicitly declare the binding attributes.

```js
defineCustomElements({
  'my-web-component': {
    name: 'my-ember-component',
    attributes: ['title']
  }
});
```

Now you can use your Ember components as native Web Components!

```html
<my-web-component title="This is a Ember Component under the hood!"/>
```

Options
------------------------------------------------------------------------------

The function `defineCustomElements` accepts an optional argument to enable some hooks to manipulate your components on the app.

```js
defineCustomElements({
  'my-web-component': {
    name: 'my-ember-component',
    attributes: ['title']
  }, {
  onConnect() {
    // `this` is the connected element.
  },
  onRender() {
    // `this` is the rendered element.
  }
});
```

The `onConnect` hook is called when the custom element is connected to the DOM but the Ember component is not yet prepared.

The `onRender` hook is called when the Ember component is fully rendered.

You can use this hooks to insert custom styles or modify the element.

```js
defineCustomElements({
  'my-web-component': {
    name: 'my-ember-component',
    attributes: ['title']
  }, {
  onRender() {
    const root = this.shadowRoot;
    const link = document.createElement('link');

    link.href = 'assets/dummy.css';
    link.rel = 'stylesheet';

    root.appendChild(link);
  }
});
```


Motivation
------------------------------------------------------------------------------

On our work, we have the need to reuse components a lot and some times we work with several frameworks so we often need to copy our Ember components to other framework component implementations.

This addon addressed this need by exporting Ember components and wrapping them in a Web Component interface to allow them to be used across frameworks.


How this works
------------------------------------------------------------------------------

This addon generates Ember components inside Web Components by using the native Web Components hooks and creating a new Ember Application inside them in an isolated environment a.k.a. `Shadow DOM`.


Contribute
------------------------------------------------------------------------------

If you want to contribute to this addon, please read the [CONTRIBUTING.md](CONTRIBUTING.md).


Versioning
------------------------------------------------------------------------------

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/BBVAEngineering/ember-collector-dispatcher/tags).


Authors
------------------------------------------------------------------------------

See the list of [contributors](https://github.com/BBVAEngineering/ember-collector-dispatcher/graphs/contributors) who participated in this project.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
