import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// class Square extends React.Component {

//     render() {
//     return (
//       <button className="square" onClick={() =>  this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }










// Функциональный компонет
function Square (props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}



















class Board extends React.Component {



  renderSquare(i) {
    return (
        <Square
        // передача двух пропсов
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />
        )
    }

  render() {
    return (
      <div>
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

    constructor(props){
    super(props);
    this.state = {
      history: [
        { squares: Array(9).fill(null), }
      ],
      xIsNext: true,
      stepNumber: 0,
      turns: [
        
      ],
    }
  }
  


handleClick(i){
  const history = this.state.history.slice(0, this.state.stepNumber + 1);
  const current = history[history.length - 1];
  const squares = current.squares.slice();
  // const turns = this.state.turns.concat([turn(history[history.length - 1].squares)]);

  // console.log(turns);
  
  

  // console.log(history);

  if (calculateWinner(squares) || squares[i]) {
      return;
  }
  squares[i] = this.state.xIsNext ? 'X' : 'O';
  this.setState({
    // Метод concat() возвращает новый массив, состоящий из массива, на котором он был вызван, соединённого с другими массивами и/или значениями, переданными в качестве аргументов. [1,2,3].concat([4,5,6]) === [1,2,3,4,5,6]
    history: history.concat([
      { squares: squares, }
    ]),
    stepNumber: history.length,
    xIsNext: !this.state.xIsNext,
    turns: this.state.turns.concat([turn(history[history.length - 1].squares, )]), /////////////////////
  });
console.log(this.state.turns);
}
  

jumpTo(step){
  this.setState({
    stepNumber: step,
    xIsNext: (step % 2) === 0
  })
}
  render() {
    // console.log(this.state.history, 'after');
    

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);



    






// копается в history, применяя к каждому его элементу функцию возвращающую html тэги 
// map первым агрументом принимает объект к которому мрименяется функция, вторым - счётчик операций
const moves = history.map((step, move) => {
    const desc = move ? 'Перейти к ходу ' + move : 'К началу игры';
    // console.log(step, move);
    return(
      <li key={move}>
        <button onClick={() => this.jumpTo(move)}>{desc}</button>
      </li>
    );
});








    let status;
    if (winner) {
      status = 'Выиграл ' + winner;
    } else {
      status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');
    }



    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares = {current.squares}
            onClick = {(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);



  function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    } 
  }
  return null
}





const array1 = [null, null, null, null, null, 'X', null, null, null];
const array2 = [null, null, null, null, null, 'X', 'O', null, null];
const array3 = [null, null, null, null, null, 'X', 'O', null, 'X'];

let turnsArray= []

function turn (array, prev) {
if (prev){
  prev.forEach(prev => {
    array[prev] = null
  });
}

  for (let i = 0; i < array.length; i++) {
    const element = array[i] ? array[i] : null;

    if (!element) {
      continue
    }

      let row;
      let col;
      let num = i++;

      num <= 3 ? row = 'a' : num <= 6 ? row = 'b' : num <= 9 ? row = 'c' : row = null;
      if (num == 1 || num == 4 || num == 7 ) { col = 1 } else
      if (num == 2 || num == 5 || num == 8 ) { col = 2 } else
      if (!(num % 3)) { col = 3 }

      return {
        prev: prev ? prev.concat([i]) : [i],
        player: element,
        row: row,
        col: col,
      }
  }
}





