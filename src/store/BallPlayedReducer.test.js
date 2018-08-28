import {
  ACTION_EXTRAS,
  ACTION_RUN,
  BallPlayedReducer,
} from './BallPlayedReducer';
import { BALL_TYPE_NO_BALL, BALL_TYPE_WIDE } from './BallResultReducer';

describe('BallPlayedReducer', () => {
  it('should return initial state of all extras unselected', () => {
    const initialState = {
      runSelected: -1,
      extrasSelected: '',
    };
    expect(BallPlayedReducer(undefined, {})).toEqual(initialState);
  });

  it('should return wide when wide is selected', () => {
    expect(BallPlayedReducer(
      undefined,
      ACTION_EXTRAS(BALL_TYPE_WIDE),
    ).extrasSelected).toEqual(BALL_TYPE_WIDE);
  });

  it('should return wide when wide is selected', () => {
    expect(BallPlayedReducer(
      undefined,
      ACTION_EXTRAS(BALL_TYPE_NO_BALL),
    ).extrasSelected).toEqual(BALL_TYPE_NO_BALL);
  });

  it('should return the given selected run in action', () => {
    expect(BallPlayedReducer(undefined, ACTION_RUN('2')).runSelected).toEqual('2');
  });
});

