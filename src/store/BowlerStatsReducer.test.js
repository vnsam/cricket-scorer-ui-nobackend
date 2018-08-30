import { ACTION_BALL_PLAYED, batsmanReducer } from '../store/BatsmenStatsReducer';

const initialState = {
  bowlerDetails: [
    {
      name: 'Brettlee',
      balls: 10,
      maiden: 10,
      runs: 10,
      wickets: 2,
    },
    {
      name: 'Bumrah',
      balls: 20,
      maiden: 0,
      runs: 15,
      wickets: 0,
    },
  ],
  currentBowler: {
    name: 'Brettlee',
  },
};
describe('bowlerReducer', () => {
  it('should return initial state bowlerStats details', () => {
    expect(batsmanReducer(initialState, {})).toEqual(initialState);
  });
});

describe('bowlerReducer', () => {
  it('should return ', () => {
    const updatedState = {
      currentBallResult: {
        type: 'Regular',
        playerRuns: 1,
        teamRuns: 2,
        extraBall: 0,
        out: false,
      },
      batsmenDetails: [
        {
          name: 'sehwag*',
          runs: 26,
          balls: 16,
          fours: 2,
          sixes: 2,
          strikeRate: 162,
        },
      ],
      currentPlayingBatsmen: {
        onStrikeBatsmen: {
          name: 'sehwag',
        },
        offStrikeBatsmen: {
          name: 'dravid',
        },
      },
    };
    expect(batsmanReducer(initialState, ACTION_BALL_PLAYED())).toEqual(updatedState);
  });
});

describe('batsmanReducer', () => {
  it('should return two batsmens stats', () => {
    const newStrikingBatsmanStat = {
      currentBallResult: {
        type: 'Regular',
        playerRuns: 1,
        teamRuns: 2,
        extraBall: 0,
        out: false,
      },
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
          name: 'dravid',
        },
      },
    };
    const updatedState = {
      currentBallResult: {
        type: 'Regular',
        playerRuns: 1,
        teamRuns: 2,
        extraBall: 0,
        out: false,
      },
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
      currentPlayingBatsmen: {
        onStrikeBatsmen: {
          name: 'sachin',
        },
        offStrikeBatsmen: {
          name: 'dravid',
        },
      },
    };
    expect(batsmanReducer(newStrikingBatsmanStat, ACTION_BALL_PLAYED())).toEqual(updatedState);
  });
});

describe('batsmanReducer', () => {
  it('current striking batsmen with asterisk', () => {
    const newStrikingBatsmanStat = {
      currentBallResult: {
        type: 'Regular',
        playerRuns: 1,
        teamRuns: 2,
        extraBall: 0,
        out: false,
      },
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
      currentBallResult: {
        type: 'Regular',
        playerRuns: 1,
        teamRuns: 2,
        extraBall: 0,
        out: false,
      },
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
    expect(batsmanReducer(newStrikingBatsmanStat, ACTION_BALL_PLAYED())).toEqual(updatedState);
  });
});
