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
      <button onClick={onStartStop} style={{ marginLeft: '5px',marginRight: '5px' }}>
        {running ? 'Stop' : 'Start'}
      </button>
      <button onClick={onClear} style={{ marginLeft: '5px',marginRight: '5px' }}>
        Clear
      </button>
    </div>
  );
};

export const ControlModule = {
  ControlPanel,
};
