// 2048 Rip Off Version
// George Williams
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
let gridSize = 4;
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
    let numberLocation = random (options);
    let r = random(1);
    if (r > 0.5) {
      grid[numberLocation.x][numberLocation.y] = 2;
    }
    else {
      grid[numberLocation.x][numberLocation.y] = 4;
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
      rect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
      if (grid[i][j] !== 0) {
        // console.log("work");
        textAlign(CENTER);
        textSize(letterSize);
        fill(0);
        noStroke();
        text("2", i * cellWidth - cellWidth / 2, j * cellWidth - cellWidth / 2);
      }
    }
  }
}