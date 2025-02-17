import React from 'react';
import './App.css';
import { GridModule } from './Grid';
import { ControlModule } from './ControlPanel';
import { LogicModule } from './GameLogic';
import { AnalyticModule } from './AnalyticPanel';

const App: React.FC = () => {
  const { grid, setGrid, running, handleStartStop, handleCellClick,  numRows, numCols, changeGridSize  } = LogicModule.useGameLogic();
  const gridContainerSize = 500; 
  return (
    <div style={{display: 'flex', width: '100vw',   textAlign: 'center' }}>
      <div style={{width: '50%', display: 'flex', flexDirection: 'column' }}>
        <ControlModule.ControlPanel 
          running={running} 
          onStartStop={handleStartStop} 
          onClear={() => setGrid(LogicModule.generateEmptyGrid(numRows,numCols))} 
        />
        <label >Grid Size: {numRows} x {numCols}</label>  
        <input 
          type="range" 
          min="2" 
          max="100" 
          value={numRows} 
          onChange={(e) => changeGridSize(Number(e.target.value))} 
        />
    
        <GridModule.Grid grid={grid} onCellClick={handleCellClick} numRows={numRows} numCols={numCols} containerSize={gridContainerSize}/>
      </div>
      <div style={{display: 'flex', width: '50%', flexDirection: 'column'}}>
        <AnalyticModule.AnalyticsPanel/>
      </div>
    </div>
  );
};

export const AppModule = {
 App 
};
