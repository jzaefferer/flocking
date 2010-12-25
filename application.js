(function($) {
	var idCounter = 0;
	var Bird = function() {
		this.id = idCounter++;
		this.output = $("#bird").tmpl(this).appendTo("body");
	};
	Bird.prototype = {
		left: 0,
		top: 0,
		move: function() {
			this.left += 1;
			this.top += 1;
		},
		render: function() {
			this.output.css({
				left: this.left,
				top: this.top
			});
		}
	};
	
	window.Bird = Bird;
})(jQuery);

$(function() {
	var birds = [];
	for (var i = 0; i < 10; i++) {
		birds.push(new Bird());
	}
	setInterval(function() {
		birds.forEach(function(bird) {
			bird.move();
			bird.render();
		});
	}, 50);
});
