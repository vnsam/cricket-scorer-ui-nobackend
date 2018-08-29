import { combineReducers } from 'redux';
import gameInformationReducer from '../newGame/reducer';
import { BallResultReducer } from './BallResultReducer';
import { batsmanReducer } from './BatsmenStatsReducer';
import OverReducer from '../scorer/OverReducer';
import scoreReducer from '../scorer/CurrentScoreReducer';

const rootReducer = combineReducers({
  gameInformation: gameInformationReducer,
  currentBall: BallResultReducer,
  over: OverReducer,
  batsmenStats: batsmanReducer,
  currentScoreReducer: scoreReducer,
});

export default rootReducer;
