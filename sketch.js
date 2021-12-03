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
  spawnNumber();
  spawnNumber();
  console.table(grid);
}


// main game loop
function draw() {
  background(255);
  cellWidth = width / 4;
  cellHeight = height / 4;

  create2DArray();


}

function keyPressed() {
  if (key === " ") {
    for (let i = 0; i < gridSize; i++) {
      grid[i] = slide(grid[i]);
      grid[i] = addNumber(grid[i]);
    }
    spawnNumber();
  }
}

// spawn numbers in empty cells
function spawnNumber() {
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
    let emptySpace = 16;


    // check if an empty space exists
    // for (let i = 0; i < gridSize; i ++) {
    //   for (let j = 0; j < gridSize; j ++ ){
    //     if (grid[i][j] === 0) {
    //       emptySpace -=1;
    //     }
    //     if (emptySpace === 0) {
    //       console.log("gameover");
    //     }
    //   }
    // }


    // check if a number exist in the cell
    while (!isZero) {
      numberLocation = random (options);
      if (grid[numberLocation.x][numberLocation.y] === 0) {
        isZero = true;
      }
    }

    console.log(r);


    // place 2 or a 4
    if (r > 0.25) {
      grid[numberLocation.x][numberLocation.y] = 2;
      console.log("thing = 2");
    }
    else {
      grid[numberLocation.x][numberLocation.y] = 4;
      console.log("thing = 4");
    }
  }
}


// move numbers to farthest most point of the specified direction until if reaches an obstruction (the end of the grid or a number it is not equivalent to)
function slide(row) {
  let newArray = row.filter(val => val);
  let missing = 4 - newArray.length;
  let zeros = Array(missing).fill(0);
  newArray = zeros.concat(newArray);
  return newArray;
}

// add numbers that are equivalent when they collide
function addNumber(row) {
  for(let i = 3; i >= 0; i--) {
    let a = row[i];
    let b = row[i -1];
    if (a === b) {
      row[i] = a + b;
      row[i - 1] = 0;
      break;
    }
  }
  return row;
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
        textAlign(CENTER, CENTER);
        textSize(letterSize);
        fill(0);
        noStroke();
        text(grid[i][j], j * cellWidth + cellWidth / 2, i * cellHeight + cellHeight / 2);
      }
    }
  }
}