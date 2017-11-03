export class Board {
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
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    // count for number of adjacent bombs
    let numberOfBombs = 0;
    neighborOffsets.forEach(offSet => {
      //checking eachoffset.
      const neighborRowIndex = rowIndex + offSet[0];
      const neighborColumnIndex = columnIndex + offSet[1];
      //Verify offset is on the board.
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
          //increment adjacent bombs if there is a bomb on the current offset tile.
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }
  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
  }
  //creating a method to handle printing a board
  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }
  static generatePlayerBoard(numberOfRows, numberofColumns) {
    let board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      let row = [];
      for (let columnIndex = 0; columnIndex<numberofColumns; columnIndex++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      let row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
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
  }
} //Board
