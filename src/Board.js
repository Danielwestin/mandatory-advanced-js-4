import React from 'react';
import './App.css';
import Popup from './Popup'



export default function Board({ board, onClickCell, restart, winner }) {
  return (
    <>
      {
        winner ? <Popup winner={winner} restart={restart}/> : null
      }
      <div className="game-header">
        <h1>
          <span className="red">Connect</span>
          <span className="yellow">4</span>
        </h1>
        <button onClick={() => restart()}> New Game </button>
      </div>

      <div className="board">
      {
        board.map(cell => (
          <div
            className="cell"
            key={cell.id}
            style={{backgroundColor: cell.backgroundColor}}
            onClick={() => onClickCell(cell.id)}
          >
          
          </div>
        ))
      }
      </div>
    </>
  );
}
