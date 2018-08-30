import batsmanReducer from './BatsmenStatsReducer';
import { ACTION_BALL_PLAYED } from './BallResultReducer';

const ballPlayedData = {
  type: 'Regular',
  playerRuns: 1,
  teamRuns: 2,
  extraBall: 0,
  out: false,
};


const initialState = {
  batsmenDetails: [],
};
describe('batsmanReducer', () => {
  it('should return initial state batsmenStatsDetails', () => {
    expect(batsmanReducer(initialState, {})).toEqual(initialState);
  });
});

describe('batsmanReducer', () => {
  it('should return updated batsmenstat details interms of runs', () => {
    const updatedState = {
      batsmenDetails: [
        {
          name: 'sehwag*',
          runs: 1,
          balls: 1,
          fours: 0,
          sixes: 0,
          strikeRate: 100,
        },
      ],
    };


    ballPlayedData.onStrikeBatsman = 'sehwag';
    ballPlayedData.offStrikeBatsman = 'dravid';

    expect(batsmanReducer(initialState, ACTION_BALL_PLAYED(ballPlayedData))).toEqual(updatedState);
  });
});

describe('batsmanReducer', () => {
  it('should return two batsmens stats', () => {
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
    };
    const updatedState = {
      batsmenDetails: [
        {
          name: 'sehwag',
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
    };

    ballPlayedData.onStrikeBatsman = 'sachin';
    ballPlayedData.offStrikeBatsman = 'dravid';
    expect(batsmanReducer(
      newStrikingBatsmanStat,
      ACTION_BALL_PLAYED(ballPlayedData),
    )).toEqual(updatedState);
  });
});

describe('batsmanReducer', () => {
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
    };

    ballPlayedData.onStrikeBatsman = 'sachin';
    ballPlayedData.offStrikeBatsman = 'sehwag';
    expect(batsmanReducer(
      newStrikingBatsmanStat,
      ACTION_BALL_PLAYED(ballPlayedData),
    )).toEqual(updatedState);
  });
});
