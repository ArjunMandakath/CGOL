import React, { useState, useCallback, useRef } from 'react';
import './App.css';

/// Define grid dimensions.
const numRows: number = 30;
const numCols: number = 30;

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
            ) {
              neighbors += g[newI][newJ];
            }
          });
          /// Apply Conway’s rules:
          /// Underpopulation or overpopulation.
          if (cell === 1 && (neighbors < 2 || neighbors > 3)) return 0;
          /// Reproduction.
          if (cell === 0 && neighbors === 3) return 1;
          /// Otherwise, remain the same.
          return cell;
        })
      )
    );
    /// Adjust simulation speed (100ms interval here).
    setTimeout(runSimulation, 100);
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Conway's Game of Life</h1>
      <div style={{ marginBottom: '1rem' }}>
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
                backgroundColor: cell ? 'pink' : undefined,
                border: '1px solid #999',
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
