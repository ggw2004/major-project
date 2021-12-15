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

let keyState;


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

// Movement Keys
function keyPressed() {
  // Move up
  if (keyCode === 38 || keyCode === 87) { // 37 = UP_ARROW and 87 = w

  }

  else if (keyCode === 40 || keyCode === 83) { // 40 = DOWN_ARROW and 83 = d

  }

  if (key === " ") {

    let newCopy = gridCopy(grid);
    for (let i = 0; i < gridSize; i++) {
      // operate(i);  can also use this to call the function; however, use the code that is commented out instead
      grid[i] = operate(grid[i]);
    }
    let changed = compareGrids(newCopy, grid);
    if (changed) {
      spawnNumber();
    }
  }
}

function compareGrids(a , b) {
  for (let i = 0; i < gridSize; i ++) {
    for (let j = 0; j < gridSize; j ++ ){
      if (a[i][j] !== b[i][j]) {
        return true;
      }
    }
  }
  return false;
}

function gridCopy(grid) {
  let newCopy = [
    [0,0,0,0], 
    [0,0,0,0], 
    [0,0,0,0], 
    [0,0,0,0]
  ];

  for (let i = 0; i < gridSize; i ++) {
    for (let j = 0; j < gridSize; j ++ ){
      newCopy[i][j] = grid[i][j];
    }
  }

  return newCopy;
}

function operate(row) {  // depending on the call function method use the objects in the brackets is either i or row
  // call function method grid[i] = operate(grid[i]);
  row = slide(row);
  row = addNumber(row);
  row = slide(row);
  return row;

  //call function method operate(i);
  // grid[i] = slide(grid[i]);
  // grid[i] = addNumber(grid[i]);
  // grid[i] = slide(grid[i]);
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

    // check if a number exist in the cell
    while (!isZero) {
      numberLocation = random (options);
      if (grid[numberLocation.x][numberLocation.y] === 0) {
        isZero = true;
      }
    }

    // place 2 or a 4
    // place 2
    if (r > 0.25) {
      grid[numberLocation.x][numberLocation.y] = 2;
      console.log("thing = 2");
    }
    // place 4
    else {
      grid[numberLocation.x][numberLocation.y] = 4;
      console.log("thing = 4");
    }
  }
}

// move numbers to farthest most point of the specified direction until if reaches an obstruction (the end of the grid or a number it is not equivalent to)
function slide(row) {
  let newArray = row.filter(val => val);
  let missing = gridSize - newArray.length;
  let zeros = Array(missing).fill(0);
  newArray = zeros.concat(newArray);
  return newArray;
}

// think of nested for loop and move cells as needed

// add numbers that are equivalent when they collide
function addNumber(row) {
  for(let i = 3; i >= 0; i--) {
    let a = row[i];
    let b = row[i -1];
    if (a === b) {
      row[i] = a + b;
      row[i - 1] = 0;
    }
  }
  return row;
}

// create & and display grid
function create2DArray() {
  for (let i = 0; i < gridSize; i ++) {
    for (let j = 0; j < gridSize; j ++ ){
      noFill();
      strokeWeight(2);
      stroke(0);
      rect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
      // display numbers
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