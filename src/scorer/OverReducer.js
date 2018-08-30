import Over from '../model/over';
import { ACTION_BALL_PLAYED, gameState } from '../store/BallResultReducer';
import { ACTION_OVER_COMPLETE } from '../home/actions';

const initialState = {
  currentOver: new Over(),
  currentBowler: {
    name: gameState.team2[0].name,
  },
  completedOvers: 0,
};

const nextBowler = (players, currentBowlerName) => {
  let nextBowlerName = currentBowlerName;
  for (let i = 0; i < players.length; i += 1) {
    if (players[i].name === currentBowlerName) {
      nextBowlerName = i === (players.length - 1) ? players[0].name : players[i + 1].name;
      break;
    }
  }
  return nextBowlerName;
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
      return {
        ...state,
        currentOver,
        completedOvers,
        currentBowler: {
          name: nextBowler(gameState.team2, state.currentBowler.name),
        },
      };
    }
    default:
      return state;
  }
};

export default overReducer;
