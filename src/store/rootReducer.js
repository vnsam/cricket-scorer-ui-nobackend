import { combineReducers } from 'redux';
import gameInformationReducer from '../newGame/reducer';
import { BallResultReducer } from './BallResultReducer';

import OverReducer from '../scorer/OverReducer';

const rootReducer = combineReducers({
  gameInformation: gameInformationReducer,
  currentBall: BallResultReducer,
  over: OverReducer,
});

export default rootReducer;
