import React from 'react';

interface ControlPanelProps {
  running: boolean;
  onStartStop: () => void;
  onClear: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ running, onStartStop, onClear }) => {
  return (
    <div> 
      <h1>Conway's Game Of Life</h1>
      <button onClick={onStartStop} style={{ marginRight: '1rem' }}>
        {running ? 'Stop' : 'Start'}
      </button>
      <button onClick={onClear}>Clear</button>
    </div>
  );
};

export const ControlModule = {
  ControlPanel,
};
