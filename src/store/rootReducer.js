import { combineReducers } from 'redux';
import gameInformationReducer from '../newGame/reducer';
import updateRunScoreReducer from './runScoreReducer';



const rootReducer = combineReducers({
  gameInformation: gameInformationReducer,
  runScore: updateRunScoreReducer
});

export default rootReducer;