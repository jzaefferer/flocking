(function($) {
	var idCounter = 0;
	var Bird = function() {
		this.id = idCounter++;
		this.output = $("#bird").tmpl(this).appendTo("body");
		this.speed = 1 + Math.random();
		this.maxSpeed = this.maxSpeed + Math.random() * 10;
		this.left = Math.random() * 1000;
		this.top = Math.random() * 1000;
	};
	Bird.prototype = {
		left: 0,
		top: 0,

		targetLeft: 0,
		targetTop: 0,

		speed: 0.1,
		acceleration: 1.05,
		angle: 0,
		maxSpeed: 2,

		move: function() {
			var oldAngle = this.angle;
			var newAngle = Math.atan2(this.targetTop - this.top, this.targetLeft - this.left);
			/* fixes the "can't move to the left" problem, but introduces some other weird behaviour
			if (newAngle < 0 && oldAngle > 0) {
				oldAngle *= -1;
			}
			if (newAngle > 0 && oldAngle < 0) {
				oldAngle *= -1;
			}
			// almost
			var diff = (newAngle - oldAngle) / 10;
			this.angle = oldAngle + diff;
			//*/
			this.angle = newAngle;
			// TODO make acceleration dependent on distance to target, reduce speed when close to target
			this.speed *= this.acceleration;
			this.speed = Math.min(this.maxSpeed, this.speed);
			this.left += this.speed * Math.cos(this.angle);
			this.top += this.speed * Math.sin(this.angle);
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
	for (var i = 0; i < 1; i++) {
		birds.push(new Bird());
	}

	var mousePosition = {
		left: 0,
		top: 0
	};

	$(document).mousemove(function(event) {
		mousePosition = {
			left: event.pageX,
			top: event.pageY
		};
	});

	setInterval(function() {
		birds.forEach(function(bird) {
			bird.targetLeft = mousePosition.left;
			bird.targetTop = mousePosition.top;
			bird.move();
			bird.render();
		});
	}, 50);

});
