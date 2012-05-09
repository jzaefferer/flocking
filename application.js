(function($) {
	var idCounter = 0;
	var maxDistance = Math.sqrt( Math.pow($(window).height(), 2) + Math.pow($(window).width(), 2) );
	var Bird = function() {
		this.id = idCounter++;
		this.output = $("<div>").addClass("dot").appendTo("body");
		this.start = this.inbetween = this.target = this.current;
	};
	Bird.prototype = {
		current: new Point(0, 0),

		step: 0,

		distanceToTarget: 0,

		move: function() {
			this.step += 0.05;
			if (this.step >= 1) {
				this.step = 1;
			}
			var step = 1 - this.step;
			this.current = getQuadraticBezier(1 - this.step, this.start, this.inbetween, this.target);
		},

		newTarget: function(target) {
			this.inbetween = this.target;
			this.start = this.current;
			this.step = 0;
			this.target = target;
			this.distanceToTarget = this.current.distance(this.target) / maxDistance;
		},

		render: function() {
			this.output.css({
				left: this.current.x,
				top: this.current.y
			});
		}
	};

	window.Bird = Bird;
})(jQuery);

$(function() {
	var birds = [];
	for (var i = 0; i < 1; i++) {
		birds.push(new Bird());
	}

	var mousePosition = new Point(0, 0);

	$(document).mousemove(function(event) {
		mousePosition = new Point(event.pageX, event.pageY);
	});
	$(document).click(function() {
		birds[0].newTarget(mousePosition);
	});

	setInterval(function() {
		birds.forEach(function(bird) {
			// bird.target = mousePosition;
			bird.move();
			bird.render();
		});
	}, 50);

});
