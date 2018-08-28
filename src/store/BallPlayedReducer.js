export const BALL_TYPE_REGULAR = 'R';
export const BALL_TYPE_WIDE = 'WD';
export const BALL_TYPE_NO_BALL = 'NB';
export const BALL_TYPE_BYE = 'B';
export const BALL_TYPE_LEG_BYE = 'LB';

export const ACTION_BALL_PLAYED = {
  type: 'BALL_PLAYED',
};

const initialState = {
  type: BALL_TYPE_REGULAR,
  playerRuns: 0,
  teamRuns: 0,
  extraBall: 0,
  out: false,
};

export const BallPlayedReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_BALL_PLAYED.type:
      return state;
    default:
      return state;
  }
};
