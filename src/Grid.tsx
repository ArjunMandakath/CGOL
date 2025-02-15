import React from 'react';
import { LogicModule } from './GameLogic';

interface GridProps {
  grid: number[][];
  onCellClick: (i: number, j: number) => void;
}

const Grid: React.FC<GridProps> = ({ grid, onCellClick }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${LogicModule.numCols}, 20px)`,
        justifyContent: 'center',
        gap: '1px',
      }}
    >
      {grid.map((row, i) =>
        row.map((cell, j) => (
          <div
            key={`${i}-${j}`}
            onClick={() => onCellClick(i, j)}
            style={{
              width: 20,
              height: 20,
              backgroundColor: LogicModule.getColor(cell),
              border: '1px solid #999',
            }}
          />
        )) 
      )}
    </div>
  );
};
  
export const GridModule = {
  Grid,
};