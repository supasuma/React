import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      //onClick prop on the built-in DOM <button> component tells React to set up a click event listener.
      //When the button is clicked, React will call the onClick event handler defined in Square’s render() method.
      //This event handler calls this.props.onClick(). Square’s props were specified by the Board.
      //Board passed onClick={() => this.handleClick(i)} to Square, so, when called, it runs this.handleClick(i)
      //on the Board.
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      squares: Array(9).fill(null)
    };
  }
  //Note how whenever Board’s state changes, the Square components rerender automatically.

  handleClick(i) {
    //.slice() to copy the squares array instead of mutating the existing array (and removes from array)
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
    return (
      <Square
        //Square no longer keeps its own state; it receives its value from its parent Board
        value={this.state.squares[i]}
        //and informs its parent when it’s clicked.
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
