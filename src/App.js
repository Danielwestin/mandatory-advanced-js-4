import React, {useReducer} from 'react';
import './App.css';
import Board from './Board'

const yellow = "#FFA300";
const red = "#BD0000";

function initBoard() {
  const cells = [];
  for (let i = 0; i <= 41; i++){
    let cell = {backgroundColor: "", id: i}
    cells.push(cell)
  }
  return cells
}


function findBottomIndex(id, board) {
  const column = id % 7;
  let index = 7 * 5 + column;

  while(index >= 0){
    if(!board[index].backgroundColor){
      break;
    }
    index -= 7
  }

  return index;
}


function vertical(newBoard){
  for (let row = 0; row < 3; row++){
    for (let column = 0; column < 7; column++){

      if (newBoard[row * 7 + column].backgroundColor){
        const x = newBoard[row * 7 + column].backgroundColor;
        if(
          newBoard[(row + 1) * 7 + column].backgroundColor === x
           &&
          newBoard[(row + 2) * 7 + column].backgroundColor === x
           &&
          newBoard[(row + 3) * 7 + column].backgroundColor === x
        ){
          return x
        }
      }
    }
  }
  return null;
}

function horizontal(newBoard){
  for (let row = 0; row < 6; row++){
    for (let column = 0; column < 4; column++){

      if (newBoard[row * 7 + column].backgroundColor){
        const x = newBoard[row * 7 + column].backgroundColor;
        if(
          newBoard[row * 7 + column + 1].backgroundColor === x
           &&
          newBoard[row * 7 + column + 2].backgroundColor === x
           &&
          newBoard[row * 7 + column + 3].backgroundColor === x
        ){
          return x
        }
      }
    }
  }
  return null;
}

function diagonalRight(newBoard){
  for (let row = 0; row < 3; row++){
    for (let column = 0; column < 4; column++){

      if (newBoard[row * 7 + column].backgroundColor){
        const x = newBoard[row * 7 + column].backgroundColor;

        if(newBoard[(row + 1) * 7 + (column + 1)].backgroundColor === x
            &&
          newBoard[(row + 2) * 7 + (column + 2)].backgroundColor === x
            &&
          newBoard[(row + 3) * 7 + (column + 3)].backgroundColor === x
        ) {
          return x
        }
      }
    }
  }
  return null;
}

function diagonalLeft(newBoard){
  for (let row = 3; row < 6; row++){
    for (let column = 0; column < 4; column++){

      if (newBoard[row * 7 + column].backgroundColor){
        const x = newBoard[row * 7 + column].backgroundColor;

        if(newBoard[(row - 1) * 7 + (column + 1)].backgroundColor === x
            &&
          newBoard[(row - 2) * 7 + (column + 2)].backgroundColor === x
            &&
          newBoard[(row - 3) * 7 + (column + 3)].backgroundColor === x
        ) {
          return x
        }
      }
    }
  }
  return null;
}

function draw(newBoard){
  for (let cell of newBoard){
   if (cell.backgroundColor === ""){
     return null
   }
  }
  return "Draw"
}

function checkAll(newBoard){
  return (
    vertical(newBoard)
      ||
    horizontal(newBoard)
      ||
    diagonalLeft(newBoard)
      ||
    diagonalRight(newBoard)
      ||
    draw(newBoard)
  )
}


function reducer(state, action) {
  switch (action.type){
    case "restart":
      return {...state, board: initBoard(), winner: null}

    case "dropDisc":
      const newBoard = [...state.board];

      const index = findBottomIndex(action.id, newBoard);

      if (index < 0 || state.winner) {
        return state;
      }

      newBoard[index] = {
        ...newBoard[index],
        backgroundColor: state.currentPlayer,
      };

      const winner = checkAll(newBoard)

      return {
        board: newBoard,
        currentPlayer: state.currentPlayer === yellow ? red : yellow,
        winner
      }

  }
}


export default function App() {

  const [state, dispatch] = useReducer(reducer, {
    board: initBoard(),
    currentPlayer: yellow,
    winner: null,
  });

  return (
    <>
      <Board
        winner={state.winner}
        onClickCell={(id) => dispatch({ type: "dropDisc", id })}
        board={state.board}
        restart={() => dispatch({ type: "restart"})}
      />
    </>
  );
}
