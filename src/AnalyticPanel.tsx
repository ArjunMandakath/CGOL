import React from 'react';

const AnalyticsPanel: React.FC = () => {
  return (
    <div>
      <h2>Analytics Panel</h2>
      <p>Statistics about the simulation will go here.</p>
      <ul>
        <li>Live Cells: 0</li>
        <li>Generations: 0</li>
        <li>Stable Structures: 0</li>
      </ul>
    </div>
  );
};

export const AnalyticModule = {
  AnalyticsPanel,
};