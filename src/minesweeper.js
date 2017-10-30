class Board {
  constructor(numberOfRows, numberofColumns,numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows*numberofColumns;//size of the board so program can check if the game is over.
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberofColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberofColumns, numberOfBombs);
  }
  get playerBoard() {
    return this._playerBoard;
  }
  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      //check if tile has been flipped
      console.log('This tile has already been flipped!');
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      //placing a bomb on the playerBoard becase they flipped a bomb tile.
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      //displays # of adjacent bombs.
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this.numberOfTiles--;
  }
  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    // all possible offsets
    const neighborOffsets = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
    //getting board dimensions
    this._numberOfRows = this._bombBoard.length;
    this._numberOfColumns = this._bombBoard[1].length;
    // count for number of adjacent bombs
    let numberOfBombs = 0;
    neighborOffsets.forEach(offSet => {
      //checking eachoffset.
      const neighborRowIndex = rowIndex + offSet[0];
      const neighborColumnIndex = columnIndex + offSet[1];
      //Verify offset is on the board.
      if (neighborRowIndex >= 0 && neighborRowIndex < this._numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < this._numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
          //increment adjacent bombs if there is a bomb on the current offset tile.
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }
  hasSafeTiles() {}
  return this._numberOfTiles !== this._numberOfBombs;
}


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
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board:');
printBoard(playerBoard);
