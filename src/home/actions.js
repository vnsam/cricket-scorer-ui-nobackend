import history from '../routes/history';
import { Routes } from '../routes/routes';

export const CREATE_GAME = 'CREATE_GAME';
export const SHOW_STATS = 'SHOW_STATS';
export const SHOW_GAME = 'SHOW_GAME';

export const createGameAction = () => (dispatch) => {
  dispatch({ type: CREATE_GAME });
  history.push(Routes.NEW_GAME);
};

export const showStats = () => (dispatch) => {
  dispatch({ type: SHOW_STATS });
  history.push(Routes.SCORER);
};

export const showGame = () => (dispatch) => {
  dispatch({ type: SHOW_GAME });
  history.push(Routes.HOME);
};

export const ACTION_OVER_COMPLETE = () => ({
  type: 'OVER_COMPLETE',
});

