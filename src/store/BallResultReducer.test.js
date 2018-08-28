import { ACTION_COMPUTE_BALL_PLAYED, BALL_TYPE_REGULAR, BALL_TYPE_WIDE, BallResultReducer } from './BallResultReducer';

describe('BallResultReducer', () => {
  it('should return initial state', () => {
    const initialState = {
      type: BALL_TYPE_REGULAR,
      playerRuns: 0,
      teamRuns: 0,
      extraBall: 0,
      out: false,
    };
    expect(BallResultReducer(undefined, { type: '' })).toEqual(initialState);
  });


  it('should return 1 team run, 1 extra ball for wide a wide', () => {
    const wideState = {
      type: BALL_TYPE_WIDE,
      playerRuns: 0,
      teamRuns: 1,
      extraBall: 1,
      out: false,
    };

    const data = {
      extras: {
        wideSelected: true,
      },
    };

    expect(BallResultReducer(undefined, ACTION_COMPUTE_BALL_PLAYED(data))).toEqual(wideState);
  });
});

