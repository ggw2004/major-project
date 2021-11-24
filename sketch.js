// 2048 Rip Off Version
// George Williams
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
let gridSize = 4;


function setup() {
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
  let cellWidth = width / 4;
  let cellHeight = height / 4;
  for (let i = 0; i < gridSize; i ++) {
    for (let j = 0; j < gridSize; j ++ ){
      noFill();
      strokeWeight(2);
      stroke(0);
      rect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
    }
  }
}


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

  if (options.length > 0) { 
    let spot = random (options);
    let r = random(1);
    if (r > 0.5) {
      grid[spot.x][spot.y] = 2;
    }
    else {
      grid[spot.x][spot.y] = 4;
    }
  }
}

