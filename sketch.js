// 2048 Rip Off Version
// George Williams
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;


function setup() {
  createCanvas(windowWidth, windowHeight);
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
  background(220);
}


function addNumber() {
  let options = [];
  let gridSize = 4;
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