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

function Q1(t) {
	return t*t;
}
function Q2(t) {
	return 2*t*(1-t);
}
function Q3(t) {
	return (1-t)*(1-t);
}
function getQuadraticBezier(percent,C1,C2,C3) {
	return new Point(
		C1.x*Q1(percent) + C2.x*Q2(percent) + C3.x*Q3(percent),
		C1.y*Q1(percent) + C2.y*Q2(percent) + C3.y*Q3(percent)
	);
}

function B1(t) {
	return t*t*t;
}
function B2(t) {
	return 3*t*t*(1-t);
	}
function B3(t) {
	return 3*t*(1-t)*(1-t);
}
function B4(t) {
	return (1-t)*(1-t)*(1-t);
}
function getCubicBezier(percent,C1,C2,C3,C4) {
	return new Point(
		C1.x*B1(percent) + C2.x*B2(percent) + C3.x*B3(percent) + C4.x*B4(percent),
		C1.y*B1(percent) + C2.y*B2(percent) + C3.y*B3(percent) + C4.y*B4(percent)
	);
}