$(function() {
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