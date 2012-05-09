(function() {

if ( !$( "<canvas>" )[0].getContext ) {
	$( "<div>" ).text("Your browser doesn't support canvas, which is required for this demo.").appendTo( "body" );
	return;
}

function drawQuadraticCurve(start, c1, stop) {
	var bezier;
	ctx.moveTo( start.x, start.y );
	ctx.beginPath();
	for (var i = 0; i < 100; i++) {
		bezier = getQuadraticBezier(i / 100, start, c1, stop);
		ctx.lineTo( bezier.x, bezier.y );
	}
	ctx.stroke();
}
function drawCubicCurve(start, c1, c2, stop) {
	var bezier;
	ctx.moveTo( start.x, start.y );
	ctx.beginPath();
	for (var i = 0; i < 100; i++) {
		bezier = getCubicBezier(i / 100, start, c1, c2, stop);
		ctx.lineTo( bezier.x, bezier.y );
	}
	ctx.stroke();
}

function drawPoint(point) {
	// ???
	penCtx.beginPath();
	penCtx.lineTo( point.x, point.y );
	penCtx.lineTo( point.x + 1, point.y + 1 );
	penCtx.stroke();
}

var canvas = $("canvas.paper")[0];
canvas.width = $(window).width();
canvas.height = $(window).height();
var ctx = canvas.getContext( "2d" );
ctx.lineWidth = 2;
ctx.fillStyle = "black";
ctx.strokeStyle = "#555";

var penCanvas = $("canvas.pen")[0];
penCanvas.width = canvas.width;
penCanvas.height = canvas.height;
penCtx = penCanvas.getContext("2d");
penCtx.lineWidth = 2;
penCtx.fillStyle = "black";
penCtx.strokeStyle = "#555";

drawCubicCurve(new Point(0, 0), new Point(0, 100), new Point( 100, 120), new Point(140, 0));
drawQuadraticCurve(new Point(0, 0), new Point(50, 100), new Point(140, 0));

var points = [];

$(document).click(function(event) {
	var point = new Point( event.pageX, event.pageY );
	points.push(point);
	drawPoint(point);
	if (points.length === 3) {
		drawQuadraticCurve.apply(this, points);
		penCtx.clearRect(0, 0, penCanvas.width, penCanvas.height);
		points.splice(0);
	}
});

}());