/* jshint asi:true*/
can = {};
var $ = require('zepto');  // jshint ignore:line
System.import('zepto').then(function ($) {
	var empty = $.fn.empty;
	$.fn.empty = function () {
		this.each(function () {
			this.__empty = this.__empty || 0;
			this.__empty++;
		});
		return empty.call(this);
	};

	var remove = $.fn.remove;
	$.fn.remove = function () {
		this.each(function () {
			this.__remove = this.__remove || 0;
			this.__remove++;
		});
		return remove.call(this);
	};

	return System.import('can/util/zepto')
		.then(function($){
			return System.import('can/util/destroyed.js')
				.then(function(can){
					return [$, can];
				})
		})
})
	.then(function (args) {
		var $ = args[0];  // jshint ignore:line
		var can = args[1];
		module("zepto-fill")

		// Zepto 1.0 doesn't have deferreds
		test("deferred", 1, function () {
			var d = can.ajax({
				url: 'thing.json',
				async: false,
				dataType: 'text'
			})
			d.done(function (text) {
				ok(true, "called")
			})
		})

		test("removed", 1, function () {
			can.$("#qunit-fixture")
				.append("<div id='foo'>foo</div>")
			can.$('#foo')
				.bind('removed', function () {
					ok(true, "called")
				})

			can.$('#foo')
				.remove()
		})

		test("$.fn.remove/empty is extended, not replaced (#651)", function () {
			can.$("#qunit-fixture")
				.append("<div id='zepto-remove'>foo</div>");

			var foo = can.$('#zepto-remove')
				.remove();
			equal(foo[0].__remove, 1);
			equal( !! foo[0].parentNode, false);

			can.$("#qunit-fixture")
				.empty();
			equal(can.$("#qunit-fixture")[0].innerHTML, '');
			equal(can.$("#qunit-fixture")[0].__empty, 1);
		});

	})
