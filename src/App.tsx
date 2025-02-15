import React from 'react';
import './App.css';
import { GridModule } from './Grid';
import { ControlModule } from './ControlPanel';
import { LogicModule } from './GameLogic';

const App: React.FC = () => {
  const { grid, setGrid, running, handleStartStop, handleCellClick } = LogicModule.useGameLogic();
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Conway's Game of Life</h1>
      <GridModule.Grid grid={grid} onCellClick={handleCellClick} />
      <ControlModule.ControlPanel 
        running={running} 
        onStartStop={handleStartStop} 
        onClear={() => setGrid(LogicModule.generateEmptyGrid())} 
      />
    </div>
  );
};

export const AppModule = {
 App 
};
