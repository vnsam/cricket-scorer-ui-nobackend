import OnStrikeReducer from './OnStrikeChangeReducer';
import { ACTION_OVER_COMPLETE } from '../home/actions';
import { BALL_TYPE_REGULAR, ACTION_BALL_PLAYED } from '../store/BallResultReducer';

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
      mockBallPlayedAction(0, 1, false),
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
});
