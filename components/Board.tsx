"use client";

import { useEffect, useState } from "react";
import styles from "../app/gameboard.module.css";

export default function Board() {
  const [player, setPlayer] = useState<string>("");
  const [xValues, setXValues] = useState<Array<number>>([]);
  const [yValues, setYValues] = useState<Array<number>>([]);

  const [board, setBoard] = useState<string[]>(Array(9).fill(""));

  const winningSequences = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  useEffect(() => {
    const randomPlayer = Math.random() < 0.5 ? "X" : "Y";
    setPlayer(randomPlayer);
    alert(`Player ${randomPlayer} goes first`);
  }, []);

  useEffect(() => {
    winningSequences.forEach((sequences) => {
      console.log(sequences);
      if (JSON.stringify(xValues) == JSON.stringify(sequences)) {
        console.log(xValues);
        alert("Player X won!");
      }
      if (JSON.stringify(yValues) == JSON.stringify(sequences)) {
        alert("Player Y Won!!");
      }
    });
  }, [xValues, yValues]);

  function DrawBoard() {
    return board.map((value, index) => (
      <div
        key={index}
        className={styles.squares}
        onClick={() => userClick(index)}
      >
        <h1 className={styles.player}>{value}</h1>
      </div>
    ));
  }

  function userClick(squareVal: number) {
    if (board[squareVal] !== "") return;
    const updatedBoard = [...board];
    updatedBoard[squareVal] = player;
    setBoard(updatedBoard);

    if (player === "X") {
      setXValues([...xValues, squareVal]);
      setPlayer("Y");
    } else {
      setYValues([...yValues, squareVal]);
      setPlayer("X");
    }
  }

  return (
    <>
      <h3>Player {player} turn</h3>
      <div className={styles.gameboard}>
        <DrawBoard />
      </div>
    </>
  );
}
