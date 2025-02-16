import React from 'react';
import './App.css';
import { GridModule } from './Grid';
import { ControlModule } from './ControlPanel';
import { LogicModule } from './GameLogic';
import { AnalyticModule } from './AnalyticPanel';

const App: React.FC = () => {
  const { grid, setGrid, running, handleStartStop, handleCellClick } = LogicModule.useGameLogic();
  return (
    <div style={{display: 'flex', width: '100vw',   textAlign: 'center' }}>
      <div style={{width: '50%', display: 'flex', flexDirection: 'column' }}>
        <ControlModule.ControlPanel 
          running={running} 
          onStartStop={handleStartStop} 
          onClear={() => setGrid(LogicModule.generateEmptyGrid())} 
        />
        <GridModule.Grid grid={grid} onCellClick={handleCellClick} />
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
