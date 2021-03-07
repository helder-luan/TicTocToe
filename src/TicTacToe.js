import React, { useEffect, useState } from 'react';
import './TicTacToe.css';

function TicTacToe() {
  const emptyBoard = Array(9).fill("");

  const [board,setBoard] = useState(emptyBoard);

  const [currentPlayer, setCurrentPlayer] = useState("O");

  const [winner, setWinner] = useState(null);

  const handleCellClick = (index) => {
    if(winner) {
      return null;
    };

    if(board[index] !== "") {
      return null;
    };

    setBoard(
      board.map(
        (item, itemIndex) => itemIndex === index ? currentPlayer : item
      )
    );

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkWinner = () => {
    const possibleWaysToWin = [
      //horizontal
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
      //vertical
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      //diagonal
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]]
    ]

    possibleWaysToWin.forEach(cells => {
      if (cells.every(
        cell => cell === "O"
      )) {
        setWinner("O");
      };

      if (cells.every(
        cell => cell === "X"
      )) {
        setWinner("X");  
      };
    });

    checkDraw();
  }

  const checkDraw = () => {
    if(board.every(item => item !== "")) {
      setWinner("D");
    }
  }

  
  useEffect(checkWinner, [board]);

  const restartGame = () => {
    setCurrentPlayer("O");
    setBoard(emptyBoard);
    setWinner(null);
  }

  return (
    <main>
      <h1 className="title">Tic Tac Toe</h1>
      <div className={`board ${winner ? "gameOver" : ""}`}>
        {
        board.map((item, index) => (
          <div 
            key={index} 
            className={`cell ${item}`}
            onClick={() => handleCellClick(index)}
          >
            {item}
          </div>
        ))
        }
        
      </div>

      {winner && 
        <footer>
          {
            winner === "D" ?
              <h2 
              className="winnerMessage"
              >
                <span 
                className={winner}
                >
                  Draw!
                </span>
              </h2>
            : 
            <h2 
            className="winnerMessage"
            >
              <span 
              className={winner}
              >
                {winner}
              </span> won!
            </h2>
          }
          

          <button onClick={() => restartGame()}>Restart the game</button>
        </footer>
      }
    </main>
  );
}

export default TicTacToe;
