import { combineReducers } from 'redux';
import gameInformationReducer from '../newGame/reducer';
import { BallPlayedReducer } from './BallPlayedReducer';
import { BallResultReducer } from './BallResultReducer';
import overReducer from '../scorer/OverReducer';
import scoreReducer from '../scorer/currentScore/CurrentScoreReducer';

const rootReducer = combineReducers({
  gameInformation: gameInformationReducer,
  ballInput: BallPlayedReducer,
  currentBallResult: BallResultReducer,
  over: overReducer,
  currentScoreReducer: scoreReducer,
});

export default rootReducer;
