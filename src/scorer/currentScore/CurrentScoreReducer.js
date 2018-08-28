export const UPDATE_TEAM_SCORE = {
  type: 'UPDATE_TEAM_SCORE',
};

const initialScoreState = {
  battingTeam: {
    name: 'Team 1',
    runs: 120,
    wickets: 4,
    overBowled: 10.4,
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

const scoreReducer = (state = initialScoreState, action) => {
  switch (action.type) {
    case 'UPDATE_TEAM_SCORE':
      return state;
    default:
      return state;
  }
};

export default scoreReducer;
