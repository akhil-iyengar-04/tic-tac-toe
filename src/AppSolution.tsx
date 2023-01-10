import React, {useEffect, useState} from "react";
import './App.scss';
const API_URL = process.env.REACT_APP_API;

function App() {
  const [data, setData] = useState("No data :(");
  
  useEffect(() => {
    async function getData() {
      const url = `${API_URL}/hello`;
      const response = await fetch(url);
      const data = await response.json();
      setData(data.msg);
    }
    getData();
  }, []); 

  return (
    <>
      <h1>MERN App!</h1>
      <p>Data from server: {data}</p>
      <Game />
    </>
  );
}

interface SquareProps {
  value: number
  // TODO 2B: ADD EXTRA PROPERTIES THAT ARE PASSED DOWNN FROM BOARD
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

function Square(props: SquareProps) {
  return (
    // TODO 2C: PASS ONCLICK FUNCTION TO THE BUTTON
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
  
function Board() {
  /**
   * To collect data from multiple children, or to have two child components 
   * communicate with each other, you need to declare the shared state in their 
   * parent component instead. The parent component can pass the state back down 
   * to the children by using props; this keeps the child components in sync with 
   * each other and with the parent component.
   */
  // TODO 1A: SET THE BOARD'S INITIAL STATE FOR SQUARES
  const [squares, setSquares] = useState(Array(9).fill(null))
  // TODO 4A: SET THE BOARD'S INITIAL STATE FOR PLAYER TURN INDICATOR
  const [XisNext, setXisNext] = useState(true)

  function renderSquare(i: number) {
    // TODO 1B: CREATE SQUARE BASED ON BOARD'S STATE
    // TODO 2A: PASS DOWN A FUNCTION TO HANDLE CLICK OF THE SQUARE
    return <Square value={squares[i]} onClick={() => handleClick(i)}/>;
  }

  // TODO 3: COMPLATE THE HANDLECLICK FUNCTION 
  function handleClick(i: number) {
  // TODO 3: COMPLATE THE HANDLECLICK FUNCTION 
  // TODO 4B: MARK SQUARES BASED ON PLAYER TURN IN HANDLECLICK
  // TODO 4C: MODIFY PLAYER TURN INDICATOR STATE
  // TODO 5B: IGNORE CLICK WHEN SOMEONE HAS WON THE GAME OR THE SQUARE IS ALREADY FILLED
    if (calculateWinner(squares) || squares[i]) {
      return 
    }
    const squaresCopy = squares.slice()
    squaresCopy[i] =  XisNext ? 'X' : 'O'
    setSquares(squaresCopy)
    setXisNext(!XisNext)
  }

  // TODO 4D: MODIFY STATUS TEXT TO REFLECT ON THE PLAYER'S TURN
  // TODO 5A: MODIFY STATUS TO DISPLAY WINNER USING "calculateWinner" function
  const winner = calculateWinner(squares)
  let status: string;
  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (XisNext? 'X' : 'O');
  }

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
            </div>
            <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
            </div>
            <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
        </div>
    </div>
    );
}

function Game() {
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

function calculateWinner(squares: Array<number>) {
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
      return squares[a];
    }
  }
  return null;
}


export default App;
