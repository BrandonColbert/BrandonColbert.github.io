var canvas = document.querySelector<HTMLCanvasElement>("#icon");
var context = canvas.getContext("2d");

var centerX = canvas.width / 2
var centerY = canvas.height / 2
var radius = centerX < centerY ? centerX : centerY

function update() {
	context.save()
	context.clearRect(0, 0, canvas.width, canvas.height)
	context.restore()

	context.translate(centerX, centerY);

	draw()

	context.translate(-centerX, -centerY);
}

var sizeAngle = 0
var sizeAngleDelta = Math.PI / 120
var colorAngle = 0
var colorAngleDelta = Math.PI / 60

function draw() {
	//Vars
	if((sizeAngle += sizeAngleDelta) > 2 * Math.PI)
		sizeAngle = 0
	if((colorAngle += colorAngleDelta) > 2 * Math.PI)
		colorAngle = 0

	//Rotation
	context.rotate(sizeAngleDelta)

	//Color
	var backgroundOuter = 255 * (0.1 + 0.1 * Math.cos(colorAngle))

	var gradient = context.createLinearGradient(-centerX, centerY, centerX, centerY)
	gradient.addColorStop(0, "blue")
	gradient.addColorStop(0.1, "darkblue")
	gradient.addColorStop(0.15, "navy")
	gradient.addColorStop(0.2, "rgb(" + backgroundOuter + "," + backgroundOuter + "," + backgroundOuter + ")")

	//Geometry
	context.beginPath()
	context.arc(0, 0, radius, 0, 2 * Math.PI)
	context.fillStyle = gradient
	context.fill()

	context.beginPath()
	context.arc(0, 0, radius * (0.925 + 0.025 * Math.sin(sizeAngle)), 0, 2 * Math.PI)
	context.fillStyle = "white"
	context.fill()
}

setInterval(update, 16)