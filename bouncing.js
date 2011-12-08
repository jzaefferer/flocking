$(function() {
	var GRAVITY = new Vector(0, 9.81);
	var FRICTION = 0.85;
	var world = {
		x1: 0,
		y1: 0
	};
	$(window).resize(function() {
		world.x2 = $(window).width();
		world.y2 = $(window).height();
	}).trigger("resize");

	function Ball() {
		this.position = new Point(200, 200);
		this.output = $("<div>").addClass("bird").appendTo("body");
		this.velocity = new Vector(-5, 0);
	}
	Ball.prototype = {
		remove: function() {
			this.output.remove();
		},
		move: function() {

			this.velocity = this.velocity.add(GRAVITY.scale(0.1));
			if (this.position.y > world.y2) {
				this.velocity.x2 = -this.velocity.x2 * FRICTION;
				this.position.y = world.y2;
			} else if (this.position.y < world.y1) {
				this.velocity.x2 = -this.velocity.x2 * FRICTION;
				this.position.y = world.y1;
			}
			if (this.position.x < world.x1) {
				this.velocity.x1 = -this.velocity.x1 * FRICTION;
				this.position.x = world.x1;
			} else {
				if (this.position.x > world.x2) {
					this.velocity.x1 = -this.velocity.x1 * FRICTION;
					this.position.x = world.x2;
				}
			}
			this.position.x += this.velocity.x1;
			this.position.y += this.velocity.x2;
			this.output.css({
				left: this.position.x,
				top: this.position.y
			});
		}
	};

	var balls = [];
	balls.push(new Ball());
	setInterval(function() {
		balls.forEach(function(ball) {
			ball.move();
		});
	}, 50);

	var start;
	$(document).mousedown(function(event) {
		start = new Point(event.pageX, event.pageY);
	}).mouseup(function(event) {
		var end = new Point(event.pageX, event.pageY);
		var ball = new Ball();
		ball.position = end;
		ball.velocity = start.relative(end).scale(0.5);
		balls.push(ball);
	});
	$(document).keyup(function(event) {
		// clear on escape
		if (event.keyCode === 27) {
			balls.forEach(function(ball) {
				ball.remove();
			});
			balls.splice(0, balls.length);
		}
	})
});