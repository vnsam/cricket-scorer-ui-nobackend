export const BALL_TYPE_REGULAR = 'R';
export const BALL_TYPE_WIDE = 'Wd';
export const BALL_TYPE_NO_BALL = 'Nb';
export const BALL_TYPE_BYE = 'B';
export const BALL_TYPE_LEG_BYE = 'Lb';

export const ACTION_BALL_PLAYED = {
  type: 'BALL_PLAYED',
};

export const ACTION_COMPUTE_BALL_PLAYED = data => ({
  type: 'COMPUTE_BALL_PLAYED',
  data,
});

const initialState = {
  type: BALL_TYPE_REGULAR,
  playerRuns: 0,
  teamRuns: 0,
  extraBall: 0,
  out: false,
};

export const BallResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COMPUTE_BALL_PLAYED': {
      const updatedState = { ...state };
      if (action.data.extras.wideSelected) {
        updatedState.type = BALL_TYPE_WIDE;
        updatedState.extraBall = 1;
        updatedState.teamRuns = 1;
        updatedState.out = false;
      }
      return updatedState;
    }
    default:
      return state;
  }
};
