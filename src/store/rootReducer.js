import { combineReducers } from 'redux';
import gameInformationReducer from '../newGame/reducer';
import {ExtrasReducer} from "./ExtrasReducer";

const rootReducer = combineReducers({
  gameInformation: gameInformationReducer,
  extras:ExtrasReducer
});

export default rootReducer;