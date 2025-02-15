import React, { useState, useCallback, useRef } from 'react';
import './App.css';

/// Define grid dimensions.
const numRows: number = 50;
const numCols: number = 50;
const maxAge: number = 10; 


/// Relative positions of the eight neighbors.
const operations: [number, number][] = [
  [0, 1],    ///right
  [0, -1],   ///left 
  [1, -1],   ///down-left
  [-1, 1],   ///up-right
  [1, 1],    ///down-right
  [-1, -1],  ///up-left
  [1, 0],    ///down
  [-1, 0],   ///up
];

/// Helper to create an empty grid.
const generateEmptyGrid = (): number[][] => {
  return Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => 0)
  );
};


const App: React.FC = () => {
  /// The grid is represented as a 2D array of numbers (0 for dead, 1 for alive).
  const [grid, setGrid] = useState<number[][]>(() => generateEmptyGrid());
  const [running, setRunning] = useState<boolean>(false);
  /// A ref to hold the latest running state, useful for recursive simulation calls.
  const runningRef = useRef(running);
  runningRef.current = running;

  /// Function to run the simulation recursively.
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
            if (
              newI >= 0 &&
              newI < numRows &&
              newJ >= 0 &&
              newJ < numCols
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
    setTimeout(runSimulation, 100);
  }, []);

  const getColor = (age: number) => {
    if (age === 0) return '#303030';
    const intensity = Math.floor((age / maxAge) * 255); /// Map age to intensity
    return `rgb(${255 - intensity}, ${100 + intensity}, ${150 + intensity})`; /// Color gradient
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Conway's Game of Life</h1>
      {/* Render the grid as a set of clickable cells */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
          justifyContent: 'center',
          gap: '1px',
        }}
      >
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => {
                const newGrid = grid.map((row, r) =>
                  row.map((col, c) => {
                    if (r === i && c === j) {
                      return grid[i][j] ? 0 : 1;
                    }
                    return col;
                  })
                );
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor:  getColor(cell),
                border: '1px solid #999',
              }}
            />
          ))
        )}
      </div>


      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          backgroundColor: '#303030',
          padding: '1rem',
          boxShadow: '0 -2px 5px rgba(0,0,0,0.2)',
          textAlign: 'center',
        }}
      >
        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
          style={{ marginRight: '1rem' }}
        >
          {running ? 'Stop' : 'Start'}
        </button>
        <button onClick={() => setGrid(generateEmptyGrid())}>Clear</button>
      </div>


    </div>
  );
};

export default App;
