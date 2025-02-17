import { useState, useRef, useCallback } from 'react'
/// Define grid dimensions.
const DEFAULT_SIZE = 25;
const SPEED = 100;
const maxAge: number = 10; 
/// Relative positions of the eight neighbors.
const operations: [number, number][] = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],            [0, 1],
  [1, -1],   [1, 0],  [1, 1],
];
///Makes Empty Grid
const generateEmptyGrid = (rows: number, cols: number) => {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
};
///Core Game Logic 
const useGameLogic = () => {
  const [numRows, setNumRows] = useState(DEFAULT_SIZE);
  const [numCols, setNumCols] = useState(DEFAULT_SIZE);
  /// The grid is represented as a 2D array of numbers (0 for dead, 1 for alive).
  const [grid, setGrid] = useState<number[][]>(() => generateEmptyGrid(numRows, numCols));
  const [running, setRunning] = useState<boolean>(false);
  /// A ref to hold the latest running state, useful for recursive simulation calls.
  const runningRef = useRef(running);
  runningRef.current = running;
  ///Recursive Simulator.
  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;
    setGrid((g) =>
      g.map((row, i) =>
        row.map((cell, j) => {
          let neighbors = 0;
          /// Count alive neighbors.
          operations.forEach(([x, y]) => {
          const newI = i + x;
          const newJ = j + y;
          if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols
          ) {if (g[newI][newJ] > 0) neighbors++}
          });
          ///Life Rules 
          if (cell > 0) {
          if (neighbors < 2 || neighbors > 3) return 0; /// Death
          return Math.min(cell + 1, maxAge); /// Increment Age 
          } else {
          if (neighbors === 3) return 1; ///Conception
          return 0; /// Remain Dead 
          }
        })
      )
    );
    ///simulation speed
    setTimeout(runSimulation, SPEED);
  }, [numRows, numCols]);
  ///Manage Simulation Activation 
  const handleStartStop = () => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  };
  ///Conceive Upon Click 
  const handleCellClick = (i: number, j: number) => {
    setGrid((g) =>
      g.map((row, r) =>
        row.map((cell, c) => (r === i && c === j ? (cell > 0 ? 0 : 1) : cell))
      )
    );
  };
  // Handles grid resizing
  const changeGridSize = (size: number) => {
    setNumRows(size);
    setNumCols(size);
    setGrid(generateEmptyGrid(size, size));
  };

  return { grid, setGrid, running, handleStartStop, handleCellClick, numRows, numCols, changeGridSize };
}
///Age Color 
const getColor = (age: number) => {
  if (age === 0) return '#303030';
  const intensity = Math.floor((age / maxAge) * 255); /// Map age to intensity
  return `rgb(${255 - intensity}, ${100 + intensity}, ${150 + intensity})`; /// Color gradient
};
///Module
export const LogicModule = {
  generateEmptyGrid,
  useGameLogic,
  getColor,
}