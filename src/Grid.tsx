import React from 'react';
import { LogicModule } from './GameLogic';
///Global 
const cellSize: number = 20 
///Grid Type 
interface GridProps {
  grid: number[][];
  onCellClick: (i: number, j: number) => void;
}
///Grid Component 
const Grid: React.FC<GridProps> = ({ grid, onCellClick }) => {
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
          gridTemplateColumns: `repeat(${LogicModule.numCols}, minmax(0, 1fr))`, 
          gridTemplateRows: `repeat(${LogicModule.numRows}, minmax(0, 1fr))`,  
          width: `${LogicModule.numCols * (cellSize + 1)}px`,  
          height: `${LogicModule.numRows * (cellSize + 1)}px`, 
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