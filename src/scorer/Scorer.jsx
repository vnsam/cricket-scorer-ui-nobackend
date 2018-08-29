import React from 'react';
import ScoreBoard from './Scoreboard';
import ConnectedBatsmenStats from './BatsmenStats';

const Scorer = () => (
  <div>
    <ScoreBoard />
    <ConnectedBatsmenStats />
  </div>
);

export default Scorer;
