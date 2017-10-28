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
    //grab a random position on the board.
    let randomRowIndex = Math.floor(Math.random()*numberOfRows);
    let randomColumnIndex = Math.floor(Math.random()*numberOfColumns);
    //verify position doesn't have a bomb on it alredy
    if (board[randomRowIndex][randomColumnIndex] !== 'B') {
      //place a bomb at the randomly generated position.
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced ++;
    }
  }
  return board;
};
//get number of adjacent bombs to flipped tile
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  // all possible offsets
  const neighborOffsets = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
  //getting board dimensions
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[1].length;
  // count for number of adjacent bombs
  let numberOfBombs = 0;
  neighborOffsets.forEach(offSet => {
    //checking eachoffset.
    const neighborRowIndex = rowIndex + offSet[0];
    const neighborColumnIndex = columnIndex + offSet[1];
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
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
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
const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);

console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 3, 7);
console.log('Updated Player Board:');
printBoard(playerBoard);
