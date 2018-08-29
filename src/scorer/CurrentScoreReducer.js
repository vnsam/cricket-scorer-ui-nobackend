import { ACTION_BALL_PLAYED } from '../store/BallResultReducer';

const initialScoreState = {
  battingTeam: {
    name: 'Team 1',
    runs: 0,
    wickets: 0,
    overBowled: 0,
    totalOvers: 20,
  },
  bowlingTeam: {
    name: 'Team 2',
    runs: 180,
    wickets: 6,
    overBowled: 20,
    totalOvers: 20,
  },
};

const evaluteInningsState = (battingTeam, action) => {
  const inningsData = {};
  inningsData.name = 'Team 1';
  inningsData.runs = battingTeam.runs + action.data.teamRuns + action.data.playerRuns;
  inningsData.wickets = battingTeam.wickets + (action.data.out === true ? 1 : 0);
  inningsData.overBowled = 0;
  inningsData.totalOvers = 20;
  return inningsData;
};

const scoreReducer = (state = initialScoreState, action) => {
  switch (action.type) {
    case ACTION_BALL_PLAYED().type:
      return { ...state, battingTeam: evaluteInningsState(state.battingTeam, action) };
    default:
      return state;
  }
};

export default scoreReducer;
