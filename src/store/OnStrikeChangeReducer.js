import { ACTION_OVER_COMPLETE } from '../home/actions';
import { ACTION_BALL_PLAYED } from './BallResultReducer';

const initialState = {
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

const OnStrikeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_OVER_COMPLETE().type:
    {
      const newState = state.currentPlayingBatsmen;
      newState.onStrikeBatsmen.active = !newState.onStrikeBatsmen.active;
      newState.offStrikeBatsmen.active = !newState.offStrikeBatsmen.active;
      return { ...state, currentPlayingBatsmen: newState };
    }

    case ACTION_BALL_PLAYED().type: {
      // if (action.data.out) {
      //     let newState = state.currentPlayingBatsmen;
      //     newState.onStrikeBatsmen.name = 'Shewag';
      //     return { ...state, currentPlayingBatsmen: newState };
      // }
      if (action.data.playerRuns % 2 !== 0) {
        const newState = state.currentPlayingBatsmen;
        newState.onStrikeBatsmen.active = !newState.onStrikeBatsmen.active;
        newState.offStrikeBatsmen.active = !newState.offStrikeBatsmen.active;
        return { ...state, currentPlayingBatsmen: newState };
      }
      return state;
    }
    default: return state;
  }
};

export default OnStrikeReducer;
