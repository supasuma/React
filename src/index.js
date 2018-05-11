import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

//FUNCTIONAL COMPONENT - components that only consist of a render
function Square(props) {
  return (
  //onClick prop on the built-in DOM <button> component tells React to set up a click event listener.
  //When the button is clicked, React will call the onClick event handler defined in Square’s render() method.
  //This event handler calls this.props.onClick(). Square’s props were specified by the Board.
  //Board passed onClick={() => this.handleClick(i)} to Square, so, when called, it runs this.handleClick(i)
  //on the Board.
    <button className="square" onClick={props.onClick}>
      {/* passing the function props.onClick down is enough and note that onClick={props.onClick()}
      would not work because it would call props.onClick immediately instead of passing it down */}
      {props.value}

    </button>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
  //Note how whenever Board’s state changes, the Square components rerender automatically.

  handleClick(i) {
    console.log("handleclick")
    //.slice() to copy the squares array instead of mutating the existing array (and removes from array)
    const squares = this.state.squares.slice();
    // return if already won OR square already filled
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    console.log("render square")
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
    console.log("board render method")
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

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

function calculateWinner(squares) {
  console.log("calculateWinner")
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // console.log(a, b, c)
    // console.log(squares[a], squares[b], squares[c])
    // console.log(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
