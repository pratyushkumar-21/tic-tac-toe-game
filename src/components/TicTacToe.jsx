import { useState } from "react";

function getRandomRowCol(board) {
  let randomRow = parseInt(Math.random() * 10) % 3;
  let randomCol = parseInt(Math.random() * 10) % 3;

  while (board[randomRow][randomCol] !== null) {
    randomRow = parseInt(Math.random() * 10) % 3;
    randomCol = parseInt(Math.random() * 10) % 3;
  }

  return { randomRow, randomCol };
}

function result(board, currRow, currCol, value) {
  //check columwise
  let res = true;
  for (let i = 0; i < board[currRow].length; i++) {
    if (board[currRow][i] !== value) {
      res = false;
      break;
    }
  }

  if (res) return res;

  res = true;

  //check rowise
  for (let i = 0; i < board[currRow].length; i++) {
    if (board[i][currCol] !== value) {
      res = false;
      break;
    }
  }

  return res;
}

export default function TicTacToe() {
  const [board, setBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [msg, setMessage] = useState("");

  const handleCellClick = (e) => {
    const { col, row } = e.target.dataset;

    if (board[row][col]) return;

    setBoard((prevBoard) => {
      const boardClone = [...prevBoard];
      const value = "O";
      boardClone[row][col] = value;
      const playerResult = result(boardClone, row, col, value);
      if (playerResult) {
        setMessage("Player 1 won!");
      }

      if (value === "O" && !playerResult) {
        const { randomRow, randomCol } = getRandomRowCol(boardClone);
        boardClone[randomRow][randomCol] = "X";
        if (result(boardClone, randomRow, randomCol, "X")) {
          setMessage("System  won!");
        }
      }

      return boardClone;
    });
  };

  if (msg) return <div>{msg}</div>;

  return (
    <table border={1} className="board-container">
      <tbody onClick={handleCellClick}>
        {board.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((col, colIndex) => (
              <td key={colIndex} data-row={rowIndex} data-col={colIndex}>
                {col}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
