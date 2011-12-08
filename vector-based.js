$(function() {
	function Point(x, y) {
		this.x = x;
		this.y = y;
	}
	Point.prototype = {
		relative: function(to) {
			return new Vector(to.x - this.x, to.y - this.y);
		},
		distance: function(to) {
			return Math.sqrt(Math.pow(this.x - to.x, 2) + Math.pow(this.y - to.y, 2));
		}
	};
	function Vector(x1, x2) {
		this.x1 = x1;
		this.x2 = x2;
	}
	Vector.prototype = {
		add: function(other) {
			return new Vector(this.x1 + other.x1, this.x2 + other.x2);
		},
		scale: function(by) {
			return new Vector(this.x1 * by, this.x2 * by);
		},
		normalize: function() {
			function norm(value) {
				return value > 0 ? 1 : value < 0 ? -1 : 0;
			}
			return new Vector(norm(this.x1), norm(this.x2));
		}
	};
	function Mover(position, velocity) {
		this.output = $("#bird").tmpl(this).appendTo("body");
		this.position = position;
		this.velocity = velocity;
		this.goal = position;
	}
	Mover.prototype = {
		move: function() {
			function easeInOutQuad( t, b, c, d ) {
				if ( ( t /= d / 2 ) < 1 ) return c / 2 * t * t + b;
				return -c / 2 * ( ( --t ) * ( t-2 ) - 1) + b;
			}
			function easeInOutCubic( t, b, c, d ) {
				if ( ( t /= d / 2 ) < 1 ) return c / 2 * t * t * t + b;
				return c / 2 * ( ( t -= 2 ) * t * t + 2) + b;
			}
			function ease(distance) {
				var maxDistance = 250;
				return 1 - easeInOutQuad(maxDistance - Math.min(maxDistance, distance), 0, 1, maxDistance);
			}
			this.velocity = this.velocity.add(this.position.relative(this.goal).normalize()).scale(ease(this.position.distance(this.goal)));
			this.position.x += this.velocity.x1;
			this.position.y += this.velocity.x2;
			this.output.css({
				left: this.position.x,
				top: this.position.y
			});
		}
	};
	var mover = new Mover(new Point(200, 200), new Vector(0, 0));
	setInterval(function() {
		mover.move();
	}, 50);

	$(document).mousemove(function(event) {
		mover.goal = new Point(event.pageX, event.pageY);
	});
});