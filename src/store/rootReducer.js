import { combineReducers } from 'redux';
import gameInformationReducer from '../newGame/reducer';
import { BallPlayedReducer } from './BallPlayedReducer';
import { BallResultReducer } from './BallResultReducer';

const rootReducer = combineReducers({
  gameInformation: gameInformationReducer,
  ballInput: BallPlayedReducer,
  currentBallResult: BallResultReducer,
});

export default rootReducer;
