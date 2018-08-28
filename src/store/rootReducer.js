import { combineReducers } from 'redux';
import gameInformationReducer from '../newGame/reducer';
import { ExtrasReducer } from './ExtrasReducer';
import updateRunScoreReducer from './runScoreReducer';

const rootReducer = combineReducers({
  gameInformation: gameInformationReducer,
  runScore: updateRunScoreReducer,
  extras: ExtrasReducer,
});

export default rootReducer;
