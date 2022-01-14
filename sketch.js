// 2048 Rip Off Version
// George Williams
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
 
 
// game variables
let grid = [];
let gridSize = 4;
let rows = 4;
let cols = 4;
let cellWidth;
let cellHeight;
let cornerRound = 30;


// backgroundColor 
let backgroundColor;
let r;
let g;
let b;
 
// state variables
let gameState;
let direction;
 
// text variables
let mainTextColor = "black";
let primaryLetterSize;
let secondaryLetterSize;
let instructionLetterSize;
let textBoxBuffer = 50;
let generalTextBoxBuffer;
 
 
 
function setup() {
  // create canvas based on the length of the shortest part of the screen
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth * 0.8, windowWidth * 0.8);
  }
  else {
    createCanvas (windowHeight * 0.8, windowHeight * 0.8);
  }
 
  gameState = "starting window";

  // color change values (set to lime green)
  r = 50;
  g = 205;
  b = 50;
  backgroundColor = color(r, g, b);
}
 
 
// main game loop
function draw() {
  background(backgroundColor);

  if (gameState === "starting window") {
    // color change values (set to lime green)
    r = 50;
    g = 205;
    b = 50;
    backgroundColor = color(r, g, b);
    displayText();
  }
 
  if (gameState === "instructions"){
    displayText();
    // color change values (set to lime green)
    r = 50;
    g = 205;
    b = 50;
    backgroundColor = color(r, g, b);
  }
 
  if (gameState === "game setup") {
    createGrid();
 
    // spawn first two numbers
    spawnNumber();
    spawnNumber();

    // color change values (set to lime green)
    r = 255;
    g = 255;
    b = 255;
    backgroundColor = color(r, g, b);
    
    // switch states
    gameState = "game loop";
  }
 
  if (gameState === "game loop") {
    cellWidth = width / 4;
    cellHeight = height / 4;

    r = 255;
    g = 255;
    b = 255;
    backgroundColor = color(r, g, b);
   
    create2DArray();
  }
 
  if (gameState === "game over") {

    r = 255;
    g = 255;
    b = 255;
    backgroundColor = color(r, g, b);

    create2DArray();
    displayText();
  }
 
  if (gameState === "game complete") {
    r = 255;
    g = 255;
    b = 255;
    backgroundColor = color(r, g, b);

    create2DArray();
    displayText();
  }
}
 
 
// text function
function displayText(){
  let messageText;
  let controlText;
  let controlTextPlacement;
 
  // starting window text
  if (gameState === "starting window") {
    messageText = "Welcome to 2048";
    controlText = "Press the spacebar to continue";
    controlTextPlacement =  height * 3 / 5 + generalTextBoxBuffer;
    generalTextBoxBuffer = 15;
    primaryLetterSize = 48;
    secondaryLetterSize = 24;
   
  }
 
 
  // game instuction text
  if (gameState === "instructions") {
    messageText = "2048 is a matching game where your job is to combine matching tiles to create larger numbered tiles with the goal of reaching a tile with the value of 2048. When there are no more moves left, and the board is full, the game is over.";
    controlText = "Game Controls:";
    let keyInstructionOne = "W' and UP Arrow move all tiles up on the grid";
    let keyInstructionTwo = "'S' and the DOWN Arrow moves all tiles down on the grid";
    let keyInstructionThree = "'A' and the LEFT Arrow moves all tiles left of the grid";
    let keyInstructionFour = "'D' and the RIGHT arrow move all tiles to the right of the grid";
    let keyInstructionFive = "'R' starts and restarts the game";
    primaryLetterSize = 20;
    secondaryLetterSize = 16;
    let instructionHeight = height + generalTextBoxBuffer;
   
    fill(mainTextColor);
    textSize(primaryLetterSize);
    textAlign(CENTER);
    textWrap(WORD);
    rectMode(CENTER);
    text(messageText, width / 2, height / 2, width - textBoxBuffer, height / 5 * 2);
    textSize(secondaryLetterSize);
    text(controlText, width / 2, instructionHeight, width - textBoxBuffer, height / 16 * 15);
    text(keyInstructionOne, width / 2, instructionHeight, width - textBoxBuffer, height / 16 * 14);
    text(keyInstructionTwo, width / 2, instructionHeight, width - textBoxBuffer, height / 16 * 13);
    text(keyInstructionThree, width / 2, instructionHeight, width - textBoxBuffer, height / 16 * 12);
    text(keyInstructionFour, width / 2, instructionHeight, width - textBoxBuffer, height / 16 * 11);
    text(keyInstructionFive, width / 2, instructionHeight, width - textBoxBuffer, height / 16 * 10);
  }
 
 
  // message for if player lost the game
  if (gameState === "game over") {
    messageText = "You Lose";
    controlText = "Press 'R' to Replay";
    generalTextBoxBuffer = 15;
    primaryLetterSize = 80;
    secondaryLetterSize = 60;
    controlTextPlacement = height / 10 * 6.75 + generalTextBoxBuffer;
  }
 
  // message for if plater won the game
  if (gameState === "game complete") {
    messageText = "You Won";
    controlText = "Press 'R' to Replay";
    generalTextBoxBuffer = 15;
    primaryLetterSize = 80;
    secondaryLetterSize = 60;
    controlTextPlacement = height / 10 * 6.75 + generalTextBoxBuffer;
  }
 
 
  if (gameState !== "instructions") {
    fill(mainTextColor);
    textSize(primaryLetterSize);
    textAlign(CENTER);
    text(messageText, width / 2, height / 2);
    fill(mainTextColor);
    textSize(secondaryLetterSize);
    text(controlText, width / 2, controlTextPlacement);
  }
 
 
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
 
  if (gameState === "starting window") {
    if (keyCode === 32) { // space bar = 32
      gameState = "instructions";
    }
  }
 
  // scenarios when the player may want to restart game
  if (gameState === "game loop" || gameState === "instructions" || gameState === "game over" || gameState === "game complete") {
    // keys to start and restart game
    if (keyCode === 66 || keyCode === 82) { // b = 66 and r = 82
      gameState = "game setup";
    }
  }
 
 
  // key functions for game loop
  if (gameState === "game loop") {
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
 
    // calls function to check if game is over
    let gameOver = isGameOver();
    if (gameOver) {
      gameState = "game over";
    }
 
    // calls function to check if player won the game
    let gameComplete = isGameWon();
    if (gameComplete) {
      gameState = "game complete";
    }
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
 
// check if player won the game
function isGameWon() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 2048) {
        return true;
      }
    }
  }
  return false;
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
    if (r > 0.10) {
      grid[numberLocation.x][numberLocation.y] = 2;
    }
    // place 4
    else {
      grid[numberLocation.x][numberLocation.y] = 4;
    }
  }
}
 
 
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
 
 
// set tile colors and sizes
let tiles = {
  "2": {
    size: 64,
    color: "#0B6A88"
  },
 
  "4": {
    size: 64,
    color: "#2DC5F4"
  },
 
  "8": {
    size: 64,
    color: "#70327E"
  },
 
  "16": {
    size: 64,
    color: "#9253A1"
  },
 
  "32": {
    size: 64,
    color: "#A42963"
  },
 
  "64": {
    size: 64,
    color: "#EC015A"
  },
 
  "128": {
    size: 36,
    color: "#F063A4"
  },
 
  "256": {
    size: 36,
    color: "#F16164"
  },
 
  "512": {
    size: 36,
    color: "#F89E4F"
  },
 
  "1024": {
    size: 36,
    color: "#FCEE21"
  },
 
  "2048": {
    size: 36,
    color: "#D20000"
  }
};
 
// create & and display grid
function create2DArray() {
  for (let i = 0; i < gridSize; i ++) {
    for (let j = 0; j < gridSize; j ++ ){
      noFill();
      strokeWeight(2);
      let val = grid[i][j];
      let s = val.toString();
      stroke(0);
      if (val !== 0) {
        // set tile color
        fill(tiles[s].color);
      }
      else {
        noFill();
      }
      rectMode(CORNER);
      rect(j * cellWidth, i * cellHeight, cellWidth, cellHeight, cornerRound);
      // display numbers
      if (grid[i][j] !== 0) {
        textAlign(CENTER, CENTER);
        noStroke();
        fill(0);
        // set tile text size
        textSize(tiles[s].size);
        text(grid[i][j], j * cellWidth + cellWidth / 2, i * cellHeight + cellHeight / 2);
      }
    }
  }
}

