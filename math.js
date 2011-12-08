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