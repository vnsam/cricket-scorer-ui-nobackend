export const BALL_TYPE_REGULAR = 'R';
export const BALL_TYPE_WIDE = 'Wd';
export const BALL_TYPE_NO_BALL = 'Nb';
export const BALL_TYPE_BYE = 'B';
export const BALL_TYPE_LEG_BYE = 'Lb';
export const WICKET = 'W';

export const ACTION_BALL_PLAYED = data => ({
  type: 'BALL_PLAYED',
  data,
});

export const ACTION_EXTRAS = name => ({
  type: 'EXTRAS',
  data: name,
});

export const ACTION_RUN = runs => ({
  type: 'RUN',
  data: parseInt(runs, 10),
});

export const ACTION_OUT = {
  type: 'OUT',
};

const initialState = {
  runSelected: -1,
  extrasSelected: '',
  outSelected: false,
};

export const evaluateBallResult = (ballInput) => {
  const ballResult = {
    type: ballInput.extrasSelected ? ballInput.extrasSelected : BALL_TYPE_REGULAR,
    extraBall: 0,
    teamRuns: 0,
    playerRuns: 0,
    out: false,
  };

  if (!ballInput.outSelected) {
    switch (ballInput.extrasSelected) {
      case BALL_TYPE_WIDE:
        ballResult.extraBall = 1;
        ballResult.teamRuns = ballInput.runSelected + 1;
        break;
      case BALL_TYPE_NO_BALL:
        ballResult.extraBall = 1;
        ballResult.playerRuns = ballInput.runSelected;
        ballResult.teamRuns = ballResult.playerRuns + ballResult.extraBall;
        break;
      case BALL_TYPE_BYE:
      case BALL_TYPE_LEG_BYE:
        ballResult.teamRuns = ballInput.runSelected;
        break;
      default:
        ballResult.playerRuns = ballInput.runSelected ? ballInput.runSelected : 0;
        ballResult.teamRuns = ballResult.playerRuns;
    }
  } else {
    ballResult.out = true;
  }
  return ballResult;
};


export const BallResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'EXTRAS':
      return {
        ...state,
        extrasSelected: action.data === state.extrasSelected ? '' : action.data,
        runSelected: state.runSelected,
      };
    case 'RUN':
      return { ...state, runSelected: state.runSelected === action.data ? -1 : action.data };
    case ACTION_OUT.type:
      return {
        ...state, outSelected: !state.outSelected,
      };
    case ACTION_BALL_PLAYED().type:
      return initialState;
    default:
      return state;
  }
};
