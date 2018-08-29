import Over from '../model/over';
import { ACTION_BALL_PLAYED } from '../store/BallResultReducer';

const initialState = {
  currentOver: new Over(),
};

const overReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_BALL_PLAYED().type: {
      const currentOver = Object.assign(new Over(), state.currentOver);
      currentOver.addBall(action.data);
      return { ...state, currentOver };
    }
    default:
      return state;
  }
};

export default overReducer;
