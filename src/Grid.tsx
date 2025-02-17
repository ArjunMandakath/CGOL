import React from 'react';
import { LogicModule } from './GameLogic';
///Global 
///Grid Type 
interface GridProps {
  grid: number[][];
  onCellClick: (i: number, j: number) => void;
  numRows: number;
  numCols: number;
  containerSize: number; 
}
///Grid Component 
const Grid: React.FC<GridProps> = ({ grid, onCellClick, numRows, numCols, containerSize }) => {
  const cellSize = Math.floor(containerSize / Math.max(numRows, numCols)); // Dynamically adjust size

  return (
    <div 
      style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
      }}
    >  
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`, 
          gridTemplateRows: `repeat(${numRows}, minmax(0, 1fr))`,  
          width: `${numCols * (cellSize + 1)}px`,  
          height: `${numRows * (cellSize + 1)}px`, 
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => onCellClick(i, j)}
              style={{
                width: cellSize,
                height: cellSize,
                border: '1px solid #999',
                boxSizing: 'border-box',  
                backgroundColor: LogicModule.getColor(cell),
              }}
            />
          )) 
        )}
      </div>
    </div>
  );
};
  
export const GridModule = {
  Grid,
};