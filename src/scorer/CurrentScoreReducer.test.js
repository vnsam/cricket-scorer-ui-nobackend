import scoreReducer from './CurrentScoreReducer';
import { BALL_TYPE_REGULAR, ACTION_BALL_PLAYED } from '../store/BallResultReducer';

describe('currentScore', () => {
  function mockBallPlayedData(run, wicket) {
    return {
      battingTeam: {
        name: 'Team 1',
        runs: run,
        wickets: wicket,
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
  }

  function mockBallPlayedAction(teamRun, playerRun, isOut) {
    return {
      type: ACTION_BALL_PLAYED().type,
      data: {
        type: BALL_TYPE_REGULAR,
        extraBall: 0,
        teamRuns: teamRun,
        playerRuns: playerRun,
        out: isOut,
      },
    };
  }

  it('should return initial state', () => {
    expect(scoreReducer(
      mockBallPlayedData(0, 0),
      mockBallPlayedAction(0, 0, false),
    )).toEqual(mockBallPlayedData(0, 0));
  });

  it('should return total runs as 1 when ball played with teamRun 1 and playerRun 0', () => {
    expect(scoreReducer(
      mockBallPlayedData(0, 0),
      mockBallPlayedAction(1, 0, false),
    )).toEqual(mockBallPlayedData(1, 0));
  });

  it('should return total runs as 1 when ball played with teamRun 1 and playerRun 1', () => {
    expect(scoreReducer(
      mockBallPlayedData(0, 0),
      mockBallPlayedAction(2, 1, false),
    )).toEqual(mockBallPlayedData(2, 0));
  });

  it('should return total runs as 0 and wicket is 1 when ball played is bowled and playerRun is 0', () => {
    expect(scoreReducer(
      mockBallPlayedData(0, 0), // initial state
      mockBallPlayedAction(0, 0, true), // played action
    )).toEqual(mockBallPlayedData(0, 1)); // final state
  });

  it('should return total runs as 1 and wicket is 1 when ball played is bowled and playerRun is 1', () => {
    expect(scoreReducer(
      mockBallPlayedData(0, 0), // initial state
      mockBallPlayedAction(1, 1, true), // played action
    )).toEqual(mockBallPlayedData(1, 1)); // final state
  });
});
