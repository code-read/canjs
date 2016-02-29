var Component = require('can/component/component');

module.exports = Component.extend({
	tag: "href-component",
	template: $('#basics').html(),
	viewModel: {
		recipe: {
			id: 5,
			name: 'Cool recipe'
		}
	},
	events: {
		"inserted": function(){
			console.log('href-component INSERTED');
		}
	}
});
