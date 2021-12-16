// user customizable variables
const gridBorderColor = '#aaa';
const gridFillColor = '#222';
const gridEmptyColor = '#fff';
const size = 20;
const centerSize = 1;
const fps = 100;

// calculate radius
const stripeSize = size - centerSize;
const radius = stripeSize * Math.sqrt(2) / 2;

// remove body padding so canvas fills screen
document.body.style.margin = 0;

// get height and width of the screen
const width = document.body.clientWidth;
const height = document.body.clientHeight;

//create canvas and ctx
const canvas = document.createElement("canvas");
canvas.width = width;
canvas.height = height;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// create grid
const gridLenX = Math.floor(width / size) + 1;
const gridLenY = Math.floor(height / size) + 1;

// create gridPoints
var gridPoints = new Array(gridLenX);
for (let i = 0; i < gridLenX; i++){
    gridPoints[i] = new Array(gridLenY);
    for (let j = 0; j < gridLenY; j++) {
        gridPoints[i][j] = 0;
    }
}
// create pointTypes
var pointTypes = new Array(gridLenX);
for (let i = 0; i < gridLenX; i++){
    pointTypes[i] = new Array(gridLenY);
    for (let j = 0; j < gridLenY; j++) {
        //[this one, up, down, left, right]
        pointTypes[i][j] = [0, 0, 0, 0, 0];
    }
}

// set stage variable
// 0 - set points
let stage = 0;

// set timeBenchMarks
var timeAtStage1;