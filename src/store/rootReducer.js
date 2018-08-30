import { combineReducers } from 'redux';
import gameInformationReducer from '../newGame/reducer';
import { BallResultReducer } from './BallResultReducer';
import batsmanReducer from './BatsmenStatsReducer';
import OverReducer from '../scorer/OverReducer';
import scoreReducer from '../scorer/CurrentScoreReducer';
import { OnStrikeReducer } from '../store/OnStrikeChangeReducer';

const rootReducer = combineReducers({
  gameInformation: gameInformationReducer,
  currentBall: BallResultReducer,
  over: OverReducer,
  batsmenStats: batsmanReducer,
  currentScoreReducer: scoreReducer,
  OnStrikeReducer,
});

export default rootReducer;
