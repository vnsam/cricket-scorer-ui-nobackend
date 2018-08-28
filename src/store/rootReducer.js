import { combineReducers } from 'redux';
import gameInformationReducer from '../newGame/reducer';
import { BallPlayedReducer } from './BallPlayedReducer';
import { BallResultReducer } from './BallResultReducer';
import overReducer from '../scorer/OverReducer';

const rootReducer = combineReducers({
  gameInformation: gameInformationReducer,
  ballInput: BallPlayedReducer,
  currentBallResult: BallResultReducer,
  over: overReducer,
});

export default rootReducer;
