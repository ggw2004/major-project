// 2048 Rip Off Version
// George Williams
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
 
let grid = [];
let gridSize = 4;
let rows = 4;
let cols = 4;
let cellWidth;
let cellHeight;
 
 
let gameState;
let direction;
 
 
 
function setup() {
  // create canvas based on the length of the shortest part of the screen
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth * 0.8, windowWidth * 0.8);
  }
  else {
    createCanvas (windowHeight * 0.8, windowHeight * 0.8);
  }
 
 
  createGrid();
 
 
  // spawn first two numbers
  spawnNumber();
  spawnNumber();
}
 
 
// main game loop
function draw() {
  background(255);
  cellWidth = width / 4;
  cellHeight = height / 4;
 
  create2DArray();
 
 
}
 
// create grid
function createGrid() {
  for (let i = 0; i < gridSize; i++) {
    grid[i] = [];
    for (let j = 0; j < gridSize; j++) {
      grid[i][j] = 0;
    }
  }
}
 
// Movement Keys
function keyPressed() {
  // Key to move up
  if (keyCode === 38 || keyCode === 87) { // 37 = UP_ARROW and 87 = w
    direction = "up";
    moveVertical();
  }
 
  // Key to move down
  else if (keyCode === 40 || keyCode === 83) { // 40 = DOWN_ARROW and 83 = s
    direction = "down";
    moveVertical();
  }
 
  // Key to move right
  if (keyCode === 39 || keyCode === 68) { // 39 = RIGHT_ARROW and 68 = d
    direction = "right";
    moveHorizontal();
  }
 
  // Key to move left
  if (keyCode === 37 || keyCode === 65) { // 37 = LEFT_ARROW and 65 = w
    direction = "left";
    moveHorizontal();
  }
 
  if (isGameOver()) {
    console.log("game over");
  }
}
 
 
// check if there are any moves left (if the game is over)
function isGameOver() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) {
        return false;
      }
      if (i !== 3 && grid[i][j] === grid[i + 1][j]) {
        return false;
      }
      if (j !== 3 && grid[i][j] === grid[i][j + 1]) {
        return false;
      }
    }
  }
  return true;
}
 
 
// compare grid copies
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
 
 
// create gid copy
function gridCopy(grid) {
  let newCopy = [];
 
  for (let i = 0; i < gridSize; i++) {
    newCopy[i] = [];
    for (let j = 0; j < gridSize; j++) {
      newCopy[i][j] = 0;
    }
  }
 
  for (let i = 0; i < gridSize; i ++) {
    for (let j = 0; j < gridSize; j ++ ){
      newCopy[i][j] = grid[i][j];
    }
  }
 
  return newCopy;
}
 
// calls the vertical operation functions
function verticalOperate(){
  if (direction === "up") {
    grid = moveUp(grid);
    grid = addNumber(grid);
    grid = moveUp(grid);
  }
 
  if (direction === "down") {
    grid = moveDown(grid);
    grid = addNumber(grid);
    grid = moveDown(grid);
  }
}
 
// call the horizontal operation functions
function horizontalOperate(row) {  
 
  if (direction === "right") {
    row = moveRight(row);
    row = addNumber(row);
    row = moveRight(row);
    return row;
  }
 
  if (direction === "left") {
    row = moveLeft(row);
    row = addNumber(row);
    row = moveLeft(row);
    return row;
  }
}
 
 
// vertical moves
 
// vertical move call function
function moveVertical() {
  let newCopy = gridCopy(grid);
  verticalOperate();
  let changed = compareGrids(newCopy, grid);
  if (changed) {
    spawnNumber();
  }
}
 
// move up
function moveUp(grid) {
  for (let y = 1; y < gridSize; y ++) {
    for (let x = 0; x < gridSize; x ++ ){
      if (grid[y][x] !==0) {
        let thisY = y;
        let thisX = x;
        while (thisY >= 1 && grid[thisY-1][thisX] === 0) { // does not like thisX or thisY
          // swapWithAbove
          grid[thisY -1 ][thisX] = grid[thisY][thisX];
          grid[thisY][thisX] = 0;
 
          //change thisY
          thisY = thisY - 1;
        }        
      }
    }
  }
  return grid;
}
 
// move down
function moveDown(grid) {
  for (let y=3; y >= 0; y--) {  
    for (let x=3; x >= 0; x--) {
      if (grid[y][x] !== 0) {
        let thisY = y;  
        let thisX = x;
        while (thisY >= 0 && thisY + 1 <= 3 && grid[thisY+1][thisX] === 0) { // need to add "&& thisY + 1 <=2" in the while loop
          // swap with below
          grid[thisY + 1][thisX] = grid[thisY][thisX];
          grid[thisY][thisX] = 0;
 
          //change thisY
          thisY = thisY + 1;
        }
      }
    }
  }
  return grid;
}
 
// Horizontal moves
 
// Horizontall movement call function
function moveHorizontal() {
  let newCopy = gridCopy(grid);
  for (let i = 0; i < gridSize; i++) {
    grid[i] = horizontalOperate(grid[i]);
  }
  let changed = compareGrids(newCopy, grid);
  if (changed) {
    spawnNumber();
  }
}
 
// move right
function moveRight(row) {
  let newArray = row.filter(val => val);
  let missing = gridSize - newArray.length;
  let zeros = Array(missing).fill(0);
  newArray = zeros.concat(newArray);
  return newArray;
}
 
// move left
function moveLeft(row) {
  let newArray = row.filter(val => val);
  let missing = gridSize - newArray.length;
  let zeros = Array(missing).fill(0);
  newArray = newArray.concat(zeros);
  return newArray;
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
    }
    // place 4
    else {
      grid[numberLocation.x][numberLocation.y] = 4;
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
 
  // horizontal movement addition
  if (direction === "right"){
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
 
  if (direction === "left"){
    for(let i = 0; i < gridSize; i++) {
      let a = row[i];
      let b = row[i + 1];
      if (a === b) {
        row[i] = a + b;
        row[i + 1] = 0;
      }
    }
    return row;
  }
 
  // vertical movement addition
  if (direction === "up") {
    for (let y = 1; y < gridSize; y ++) {
      for (let x = 0; x < gridSize; x ++ ){
        let a = grid[y][x];
        let b = grid[y - 1][x];
        if (a === b) {
          grid[y][x] = a + b;
          grid[y-1][x] = 0;
        }
      }
    }
    return grid;
  }
 
  if (direction === "down") {
    for (let y=3; y >= 1; y--) {  
      for (let x=3; x >= 0; x--) {
        let a = grid[y][x];
        let b = grid[y - 1][x];
        if (a === b) {
          grid[y][x] = a + b;
          grid[y - 1][x] = 0;
        }
      }
    }
    return grid;
  }
 
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
        let string = "" + grid[i][j];
        let len = string.length - 1;
        let sizes = [64, 64, 32, 16];
        fill(0);
        noStroke();
        textSize(sizes[len]);
        text(grid[i][j], j * cellWidth + cellWidth / 2, i * cellHeight + cellHeight / 2);
      }
    }
  }
}

