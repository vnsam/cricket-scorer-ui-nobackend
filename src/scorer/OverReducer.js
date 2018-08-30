import Over from '../model/over';
import { ACTION_BALL_PLAYED } from '../store/BallResultReducer';
import { ACTION_OVER_COMPLETE } from '../home/actions';

const initialState = {
  currentOver: new Over(),
  currentBowler: {
    name: 'Bhuvaneshwar Kumar',
  },
  completedOvers: 0,
};

const overReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_BALL_PLAYED().type: {
      const modifiedCurrentOver = new Over();
      state.currentOver.balls.map(ball => modifiedCurrentOver.addBall(ball));
      modifiedCurrentOver.addBall(action.data);
      return { ...state, currentOver: modifiedCurrentOver };
    }
    case ACTION_OVER_COMPLETE().type: {
      const currentOver = new Over();
      const completedOvers = state.completedOvers + 1;
      return { ...state, currentOver, completedOvers };
    }
    default:
      return state;
  }
};

export default overReducer;
