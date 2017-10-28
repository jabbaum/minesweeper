'use strict';

//creating player board
var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberofColumns) {
  var board = [];
  for (var rowIt = 0; rowIt < numberOfRows; rowIt++) {
    var row = [];
    for (var colIt = 0; colIt < numberofColumns; colIt++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

//creating bomb board to hold bomb positions
var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
  var board = [];
  for (var rowIt = 0; rowIt < numberOfRows; rowIt++) {
    var row = [];
    for (var colIt = 0; colIt < numberOfColumns; colIt++) {
      row.push(null);
    }
    board.push(row);
  }
  var numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    //grab a random position on the board.
    var randomRowIndex = Math.floor(Math.random() * numberOfRows);
    var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    //verify position doesn't have a bomb on it alredy
    if (board[randomRowIndex][randomColumnIndex] !== 'B') {
      //place a bomb at the randomly generated position.
      board[randomRowIndex][randomColumnIndex] = 'B';
      numberOfBombsPlaced++;
    }
  }
  return board;
};
//get number of adjacent bombs to flipped tile
var getNumberOfNeighborBombs = function getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex) {
  // all possible offsets
  var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  //getting board dimensions
  var numberOfRows = bombBoard.length;
  var numberOfColumns = bombBoard[1].length;
  // count for number of adjacent bombs
  var numberOfBombs = 0;
  neighborOffsets.forEach(function (offSet) {
    //checking eachoffset.
    var neighborRowIndex = rowIndex + offSet[0];
    var neighborColumnIndex = columnIndex + offSet[1];
    //Verify offset is on the board.
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
        //increment adjacent bombs if there is a bomb on the current offset tile.
        numberOfBombs++;
      }
    }
  });
  return numberOfBombs;
};

// action of flipping a tile.
var flipTile = function flipTile(playerBoard, bombBoard, rowIndex, columnIndex) {
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    //check if tile has been flipped
    console.log('This tile has already been flipped!');
    return;
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    //placing a bomb on the playerBoard becase they flipped a bomb tile.
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    //displays # of adjacent bombs.
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
};

//creating a function to handle printing a board
var printBoard = function printBoard(board) {
  console.log(board.map(function (row) {
    return row.join(' | ');
  }).join('\n'));
};

var playerBoard = generatePlayerBoard(3, 4);
var bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 3, 7);
console.log('Updated Player Board:');
printBoard(playerBoard);