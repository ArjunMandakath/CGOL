import React from 'react';

interface ControlPanelProps {
  running: boolean;
  onStartStop: () => void;
  onClear: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ running, onStartStop, onClear }) => {
  return (
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
