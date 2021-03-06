import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasWon: false,
      board: this.createBoard(),
    };

    this.flipCellsAround = this.flipCellsAround.bind(this);
  }

  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.5,
  };

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  generateRandom() {
    return Math.random() < this.props.chanceLightStartsOn;
  }

  createBoard() {
    const { nrows, ncols } = this.props;

    let board = Array(nrows).fill(Array(ncols).fill(false));

    return board.map((row) => {
      return row.map((col) => {
        return (col = this.generateRandom());
      });
    });
  }

  hasWon(board) {
    const result = board.map((row) => row.includes(true));
    return !result.includes(true);
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let { board, hasWon } = this.state;
    let [y, x] = coord.split('-').map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // flip this cell and the cells around it
    flipCell(y, x);
    flipCell(y + 1, x);
    flipCell(y - 1, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    // win when every cell is turned off
    hasWon = this.hasWon(board);
    this.setState({ board, hasWon });
  }

  /** Render game board or winning message. */

  render() {
    // if the game is won, just show a winning msg & render nothing else

    const { board, hasWon } = this.state;

    return (
      <React.Fragment>
        {hasWon ? (
          <p>You Win!</p>
        ) : (
          <table className='Board'>
            <tbody>
              {board.map((row, y) => {
                return (
                  <tr key={y}>
                    {row.map((col, x) => {
                      let coord = `${y}-${x}`;
                      return (
                        <Cell
                          key={coord}
                          isLit={col}
                          flipCellsAroundMe={() => this.flipCellsAround(coord)}
                        />
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </React.Fragment>
    );
  }
}

export default Board;
