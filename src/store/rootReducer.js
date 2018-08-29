import { combineReducers } from 'redux';
import gameInformationReducer from '../newGame/reducer';
import { BallResultReducer } from './BallResultReducer';
import { batsmanReducer } from './BatsmenStatsReducer';
import OverReducer from '../scorer/OverReducer';

const rootReducer = combineReducers({
  gameInformation: gameInformationReducer,
  currentBall: BallResultReducer,
  over: OverReducer,
  batsmenStats: batsmanReducer,
});

export default rootReducer;
