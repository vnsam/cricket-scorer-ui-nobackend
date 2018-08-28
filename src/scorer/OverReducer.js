import Over from "../model/over";
import { ACTION_BALL_PLAYED } from '../store/BallPlayedReducer.js';

const overReducer = (state, action) => {
  switch (action.type) {
    case ACTION_BALL_PLAYED.type:
      let currentOver = state.currentOver ? Object.assign({}, state.currentOver) : new Over();
      currentOver.addBall(state.currentBallPlayed);
      return {...state, currentOver: currentOver};
  }
  return state;
};

export default overReducer;
