import Component from '@ember/component';

export default Component.extend({

	tagName: '',

	actions: {
		increment() {
			const value = this.getWithDefault('value', 0);

			this.set('value', value + 1);
		}
	}

});
