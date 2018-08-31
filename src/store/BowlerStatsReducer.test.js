import bowlerReducer from './BowlerStatsReducer';
import { ACTION_BALL_PLAYED, BALL_TYPE_REGULAR, BALL_TYPE_WIDE } from './BallResultReducer';

const ballPlayedAction = ACTION_BALL_PLAYED({
  type: BALL_TYPE_REGULAR,
  playerRuns: 1,
  teamRuns: 2,
  extraBall: 0,
  out: false,
  currentBowlingBowler: 'Bumrah',
});

const initialState = {
  bowlerDetails: [
    {
      name: 'Brettlee',
      balls: 0,
      maiden: 0,
      runs: 0,
      wickets: 0,
    },
    {
      name: 'Bumrah',
      balls: 0,
      maiden: 0,
      runs: 0,
      wickets: 0,
    },
  ],
  runsInThisOver: 0,
};


describe('bowlerReducer', () => {
  it('should return initial state bowlerstats details', () => {
    expect(bowlerReducer(initialState, {})).toEqual(initialState);
  });
});

describe('bowlerReducer', () => {
  it('should return updated ball count for the current bowler whenever a legal delivery happens', () => {
    const updatedState = {
      bowlerDetails: [
        {
          name: 'Brettlee',
          balls: 0,
          maiden: 0,
          runs: 0,
          wickets: 0,
        },
        {
          name: 'Bumrah',
          balls: 1,
          maiden: 0,
          runs: 2,
          wickets: 0,
        },
      ],
      runsInThisOver: 2,
    };
    expect(bowlerReducer(initialState, ballPlayedAction)).toEqual(updatedState);
  });
});

describe('bowlerReducer', () => {
  it('should return state with same ball count incase of illegal delivery ', () => {
    const initialIllegalState = {
      bowlerDetails: [
        {
          name: 'Brettlee',
          balls: 0,
          maiden: 0,
          runs: 0,
          wickets: 0,
        },
        {
          name: 'Bumrah',
          balls: 0,
          maiden: 0,
          runs: 0,
          wickets: 0,
        },
      ],
      runsInThisOver: 0,
    };

    const updatedState = {
      bowlerDetails: [
        {
          name: 'Brettlee',
          balls: 0,
          maiden: 0,
          runs: 0,
          wickets: 0,
        },
        {
          name: 'Bumrah',
          balls: 0,
          maiden: 0,
          runs: 4,
          wickets: 0,
        },
      ],
      runsInThisOver: 4,
    };
    const illegalBallPlayedAction = ACTION_BALL_PLAYED({
      type: BALL_TYPE_WIDE,
      playerRuns: 1,
      teamRuns: 4,
      extraBall: 0,
      out: false,
      currentBowlingBowler: 'Bumrah',
    });
    expect(bowlerReducer(initialIllegalState, illegalBallPlayedAction)).toEqual(updatedState);
  });
});
