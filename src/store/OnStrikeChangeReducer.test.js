import OnStrikeReducer from './OnStrikeChangeReducer';
import { ACTION_OVER_COMPLETE } from '../home/actions';
import { BALL_TYPE_REGULAR, ACTION_BALL_PLAYED, BALL_TYPE_WIDE, BALL_TYPE_BYE, BALL_TYPE_LEG_BYE, BALL_TYPE_NO_BALL } from '../store/BallResultReducer';

const initialBatsManState = () => ({
  currentPlayingBatsmen: {
    onStrikeBatsmen: {
      name: 'Dravid',
      active: true,
    },
    offStrikeBatsmen: {
      name: 'Sachin',
      active: false,
    },
  },
});

function mockBallPlayedAction(balltype, teamRun, playerRun, isOut) {
  return {
    type: ACTION_BALL_PLAYED().type,
    data: {
      type: balltype,
      extraBall: 0,
      teamRuns: teamRun,
      playerRuns: playerRun,
      out: isOut,
    },
  };
}

describe('OnStrikeReducer', () => {
  it('should return initial state for batsman selection on game start', () => {
    const initialState =
    {
      currentPlayingBatsmen: {
        onStrikeBatsmen: {
          name: 'Dravid',
          active: true,
        },
        offStrikeBatsmen: {
          name: 'Sachin',
          active: false,
        },
      },
    };
    expect(OnStrikeReducer(undefined, {})).toEqual(initialState);
  });


  it('should change active batsmen on odd runs', () => {
    const oddRunState =
    {
      currentPlayingBatsmen: {
        onStrikeBatsmen: {
          name: 'Dravid',
          active: false,
        },
        offStrikeBatsmen: {
          name: 'Sachin',
          active: true,
        },
      },
    };
    expect(OnStrikeReducer(
      initialBatsManState(),
      mockBallPlayedAction(BALL_TYPE_REGULAR, 0, 1, false),
    )).toEqual(oddRunState);
  });

  it('should change active batsmen on over complete', () => {
    const overCompleteState =
    {
      currentPlayingBatsmen: {
        onStrikeBatsmen: {
          name: 'Dravid',
          active: false,
        },
        offStrikeBatsmen: {
          name: 'Sachin',
          active: true,
        },
      },
    };
    expect(OnStrikeReducer(
      initialBatsManState(),
      ACTION_OVER_COMPLETE(),
    )).toEqual(overCompleteState);
  });

  it('should change active batsmen on extra WIDE with odd number of Runs', () => {
    const wideWithOddRunState =
    {
      currentPlayingBatsmen: {
        onStrikeBatsmen: {
          name: 'Dravid',
          active: false,
        },
        offStrikeBatsmen: {
          name: 'Sachin',
          active: true,
        },
      },
    };
    expect(OnStrikeReducer(
      initialBatsManState(),
      mockBallPlayedAction(BALL_TYPE_WIDE, 2, 1, false),
    )).toEqual(wideWithOddRunState);
  });

  it('should change active batsmen on BYE with odd number of Runs', () => {
    const wideWithOddRunState =
    {
      currentPlayingBatsmen: {
        onStrikeBatsmen: {
          name: 'Dravid',
          active: false,
        },
        offStrikeBatsmen: {
          name: 'Sachin',
          active: true,
        },
      },
    };
    expect(OnStrikeReducer(
      initialBatsManState(),
      mockBallPlayedAction(BALL_TYPE_BYE, 3, 0, false),
    )).toEqual(wideWithOddRunState);
  });

  it('should change active batsmen on extra LEG BYE with odd number of Runs', () => {
    const wideWithOddRunState =
    {
      currentPlayingBatsmen: {
        onStrikeBatsmen: {
          name: 'Dravid',
          active: false,
        },
        offStrikeBatsmen: {
          name: 'Sachin',
          active: true,
        },
      },
    };
    expect(OnStrikeReducer(
      initialBatsManState(),
      mockBallPlayedAction(BALL_TYPE_LEG_BYE, 3, 0, false),
    )).toEqual(wideWithOddRunState);
  });

  it('should change active batsmen on extra NO BALL with odd number of Runs', () => {
    const wideWithOddRunState =
    {
      currentPlayingBatsmen: {
        onStrikeBatsmen: {
          name: 'Dravid',
          active: false,
        },
        offStrikeBatsmen: {
          name: 'Sachin',
          active: true,
        },
      },
    };
    expect(OnStrikeReducer(
      initialBatsManState(),
      mockBallPlayedAction(BALL_TYPE_NO_BALL, 2, 1, false),
    )).toEqual(wideWithOddRunState);
  });
});
