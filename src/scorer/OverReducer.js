import Over from '../model/over';
import { ACTION_BALL_PLAYED, BALL_TYPE_NO_BALL } from '../store/BallPlayedReducer';

function ball(type, playerRuns, teamRuns, extraBall, out) {
  return {
    type, playerRuns, teamRuns, extraBall, out,
  };
}

const initialState = {
  currentOver: new Over(),
  currentBallPlayed: ball(BALL_TYPE_NO_BALL, 3, 4, 1, false),
};

const overReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_BALL_PLAYED.type: {
      const over = new Over();
      const currentOver = state.currentOver ? Object.assign(over, state.currentOver) : over;
      currentOver.addBall(state.currentBallPlayed);
      return { ...state, currentOver };
    }
    default:
      return state;
  }
};

export default overReducer;
