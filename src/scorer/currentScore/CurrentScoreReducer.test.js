import scoreReducer, { UPDATE_TEAM_SCORE } from './CurrentScoreReducer';

describe('currentScore', () => {
  function scoreUpdateAction() {
    return {
      type: UPDATE_TEAM_SCORE.ScoreReducer,
    };
  }

  it('should return initial state', () => {
    const mockState = {
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

    expect(JSON.stringify(scoreReducer(
      mockState,
      scoreUpdateAction(),
    ))).toEqual(JSON.stringify(mockState));
  });
});
