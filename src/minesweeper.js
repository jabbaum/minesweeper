class Game {
  constructor(numberOfRows, numberofColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberofColumns, numberOfBombs);
  }
  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);

    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('Game Over!');
      this._board.print();
    } else if (!this._board.hasSafeTiles()) {
      console.log('You win!');
    } else {
      console.log('Current Board:');
      this._board.print();
    }
  }
} // Game
const g = new Game(3,3,3); //instantiate game class
g.playMove(0,0);
