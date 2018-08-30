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
          runs: 0,
          wickets: 0,
        },
      ],
    };
    expect(bowlerReducer(initialState, ballPlayedAction)).toEqual(updatedState);
  });
});

describe('bowlerReducer', () => {
  it('should return state with same ball count incase of illegal delivery ', () => {
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
          runs: 0,
          wickets: 0,
        },
      ],
    };
    const illegalBallPlayedAction = ACTION_BALL_PLAYED({
      type: BALL_TYPE_WIDE,
      playerRuns: 1,
      teamRuns: 2,
      extraBall: 0,
      out: false,
      currentBowlingBowler: 'Bumrah',
    });
    expect(bowlerReducer(initialState, illegalBallPlayedAction)).toEqual(updatedState);
  });
});

describe('bowlerReducer', () => {
  it('current striking batsmen with asterisk', () => {
    const newStrikingBatsmanStat = {
      batsmenDetails: [
        {
          name: 'sehwag',
          runs: 25,
          balls: 15,
          fours: 2,
          sixes: 2,
          strikeRate: 56,
        },
      ],
      currentPlayingBatsmen: {
        onStrikeBatsmen: {
          name: 'sachin',
        },
        offStrikeBatsmen: {
          name: 'sehwag',
        },
      },
    };
    const updatedState = {
      batsmenDetails: [
        {
          name: 'sehwag*',
          runs: 25,
          balls: 15,
          fours: 2,
          sixes: 2,
          strikeRate: 56,
        },
        {
          name: 'sachin*',
          runs: 1,
          balls: 1,
          fours: 0,
          sixes: 0,
          strikeRate: 100,
        },
      ],
      currentPlayingBatsmen: {
        onStrikeBatsmen: {
          name: 'sachin',
        },
        offStrikeBatsmen: {
          name: 'sehwag',
        },
      },
    };
    expect(bowlerReducer(newStrikingBatsmanStat, ballPlayedAction)).toEqual(updatedState);
  });
});
