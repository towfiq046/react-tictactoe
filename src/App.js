import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { useState } from "react";

export default function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  return (
    <Container className="d-flex vh-100 align-items-center justify-content-center">
      <Board
        xIsNext={xIsNext}
        squares={currentSquares}
        onPlay={handlePlay}
      ></Board>
    </Container>
  );
}

export function Square({ value, onSquareClick }) {
  return (
    <td
      className="user-select-none h3"
      align="center"
      height="55"
      width="55"
      onClick={onSquareClick}
    >
      {value}
    </td>
  );
}

export function Board({ xIsNext, squares, onPlay }) {
  const nextSquares = [...squares];
  const winner = calculateWinner(squares);
  let status;

  function handleClick(number) {
    if (squares[number] || winner) {
      return;
    }
    if (xIsNext) {
      nextSquares[number] = "X";
    } else {
      nextSquares[number] = "O";
    }
    onPlay(nextSquares);
  }

  if (winner) {
    status = "Winner is: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <Table bordered className="d-flex justify-content-center border-dark">
      <tbody>
        <tr className="d-flex border-0">{status}</tr>
        <tr>
          <Square
            value={squares[0]}
            onSquareClick={() => handleClick(0)}
          ></Square>
          <Square
            value={squares[1]}
            onSquareClick={() => handleClick(1)}
          ></Square>
          <Square
            value={squares[2]}
            onSquareClick={() => handleClick(2)}
          ></Square>
        </tr>
        <tr>
          <Square
            value={squares[3]}
            onSquareClick={() => handleClick(3)}
          ></Square>
          <Square
            value={squares[4]}
            onSquareClick={() => handleClick(4)}
          ></Square>
          <Square
            value={squares[5]}
            onSquareClick={() => handleClick(5)}
          ></Square>
        </tr>
        <tr>
          <Square
            value={squares[6]}
            onSquareClick={() => handleClick(6)}
          ></Square>
          <Square
            value={squares[7]}
            onSquareClick={() => handleClick(7)}
          ></Square>
          <Square
            value={squares[8]}
            onSquareClick={() => handleClick(8)}
          ></Square>
        </tr>
      </tbody>
    </Table>
  );
}

export function calculateWinner(squares) {
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
      console.log(squares[a] + squares[b] + squares[c]);
      return squares[a];
    }
  }
  return null;
}
