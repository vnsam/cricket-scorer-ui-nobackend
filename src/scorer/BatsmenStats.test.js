import batsmanReducer from '../store/BatsmenStatsReducer';

const ballPlayedAction = {
  type: 'ACTION_BALL_PLAYED',
  ballResult: {
    type: 'Regular',
    playerRuns: 1,
    teamRuns: 2,
    extraBall: 0,
    out: false
  }
};

const initialState = {
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
      name: 'sehwag',
    },
    offStrikeBatsmen: {
      name: 'dravid',
    },
  },
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

    expect(batsmanReducer(initialState, ballPlayedAction)).toEqual(updatedState);
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
    expect(batsmanReducer(newStrikingBatsmanStat, ballPlayedAction)).toEqual(updatedState);
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
    expect(batsmanReducer(newStrikingBatsmanStat, ballPlayedAction)).toEqual(updatedState);
  });
});
