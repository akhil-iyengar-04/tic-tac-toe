import {useEffect, useState} from "react";
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
  handleClick: React.MouseEventHandler<HTMLButtonElement>
  // TODO 2B: ADD EXTRA PROPERTIES THAT ARE PASSED DOWNN FROM BOARD
  // HINT 2B: ONCLICK PROPERTY HAS TYPE: React.MouseEventHandler<HTMLButtonElement>
}

function Square(props: SquareProps) {
  return (
    // TODO 2C: PASS ONCLICK FUNCTION TO THE BUTTON AS A PROP
    <button className="square" onClick={props.handleClick}>
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
  // TODO 1A: SET THE BOARD'S INITIAL STATE OF SQUARES TO AN ARRAY OF NULLS
  // HINT 1A: Array(2).fill(true) gives an array of two elements with true as their values
  const [squares, setSquares] = useState(Array(9).fill(null))
  // TODO 4A: SET THE BOARD'S INITIAL STATE TO INDICATE WHICH PLAYER'S TURN IT IS
  const[isXturn, setIsXTurn] = useState(true)

  function renderSquare(i: number) {
    // TODO 1B: RENDER BASED ON SQUARE STATE
    // TODO 2A: PASS DOWN A FUNCTION TO HANDLE CLICK TO THE SQUARE AS A PROP
    return <Square value={squares[i]} handleClick={() => handleClick(i)}/>;
  }

  function handleClick(i: number) {
  // TODO 3: COMPLETE THE HANDLECLICK FUNCTION, THE SQUARE CONTENT SHOULD CHANGE TO 'X' ON CLICK
  // HINT 3: USE array.slice() TO COPY AN ARRAY & USE THE SET FUNCTION TO SET NEW VALUE TO THE SQUARE STATE

  const newSquares = squares.slice()

  if (isXturn) {
    newSquares[i] = 'X'
  
  } else {
    newSquares[i] = 'O'
  }
  
  setSquares(newSquares)
  setIsXTurn(!isXturn)
  // TODO 4B: SET SQUARE CONTENT BASED ON PLAYER TURN, EITHER X OR O
  // TODO 4C: MODIFY THE STATE THAT INDICATES PLAYERS' TURN
  // TODO 5B: IGNORE CLICK WHEN SOMEONE HAS WON THE GAME OR THE SQUARE IS ALREADY FILLED
  }

  // TODO 4D: MODIFY STATUS TEXT TO REFLECT ON THE PLAYER'S TURN
  // TODO 5A: MODIFY STATUS TO DISPLAY WINNER USING "calculateWinner" function
  
  var status;
  if(calculateWinner(squares)) {
    status = `Winner is: ${calculateWinner(squares)}`
  } else {
    status = isXturn ? 'Next player: X' : 'Next player: O';  
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
