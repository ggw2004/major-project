// 2048 Rip Off Version
// George Williams
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
let gridSize = 4;
let rows = 4;
let cols = 4;
let cellWidth;
let cellHeight;
let letterSize = 64;


function setup() {
  // create canvas based on the length of the shortest part of the screen
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth * 0.8, windowWidth * 0.8);
  }
  else {
    createCanvas (windowHeight * 0.8, windowHeight * 0.8);
  }

  
  grid = [
    [0,0,0,0], 
    [0,0,0,0], 
    [0,0,0,0], 
    [0,0,0,0]
  ];
  console.table(grid);
  addNumber();
  addNumber();
  console.table(grid);
}

function draw() {
  background(255);
  cellWidth = width / 4;
  cellHeight = height / 4;

  create2DArray();


}

// add the first two initiall numbers
function addNumber() {
  let options = [];
  for (let i = 0; i < gridSize; i ++) {
    for (let j = 0; j < gridSize; j ++ ){
      options.push({
        x: i,
        y: j,
      });
    }
  }
  // 50:50 chance of it displaying a 2 or a 4
  if (options.length > 0) { 
    // function varibales
    let isZero = false;
    let numberLocation;
    let r = random(0,1);

    // check to not place in a cell with an existing number
    while (!isZero) {
      numberLocation = random (options);
      if (grid[numberLocation.x][numberLocation.y] === 0) {
        isZero = true;
      }
    }

    console.log(r);

    // place 2 or a 4
    if (r > 0.5) {
      grid[numberLocation.x][numberLocation.y] = 2;
      console.log("thing = 2");
    }
    else {
      grid[numberLocation.x][numberLocation.y] = 4;
      console.log("thing = 4");
    }
  }
}

function create2DArray() {
  // create & and display grid
  for (let i = 0; i < gridSize; i ++) {
    for (let j = 0; j < gridSize; j ++ ){
      noFill();
      strokeWeight(2);
      stroke(0);
      rect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
      if (grid[i][j] !== 0) {
        textAlign(CENTER);
        textSize(letterSize);
        fill(0);
        noStroke();
        text(grid[i][j], j * cellWidth + cellWidth / 2, i * cellHeight + cellHeight / 2);
      }
    }
  }
}