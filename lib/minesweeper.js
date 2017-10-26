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
    //this loop currently has the potential to place bombs on top of each other.
    var randomRowIndex = Math.floor(Math.random() * numberOfRows);
    var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
  }
  return board;
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