//creating player board
const generatePlayerBoard = (numberOfRows, numberofColumns) =>{
  let board = [];
  for (let rowIt=0; rowIt<numberOfRows; rowIt++) {
    let row = [];
    for (let colIt=0; colIt<numberofColumns; colIt++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

//creating bomb board to hold bomb positions
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  for (let rowIt=0; rowIt<numberOfRows; rowIt++) {
    let row = [];
    for (let colIt=0; colIt<numberOfColumns; colIt++) {
      row.push(null);
    }
    board.push(row);
  }
  let numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced<numberOfBombs){
    //this loop currently has the potential to place bombs on top of each other.
    let randomRowIndex = Math.floor(Math.random()*numberOfRows);
    let randomColumnIndex = Math.floor(Math.random()*numberOfColumns);
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced ++;
  }
  return board;
};

//creating a function to handle printing a board
const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);

console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
