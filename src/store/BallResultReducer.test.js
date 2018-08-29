import {
  BALL_TYPE_WIDE,
  BALL_TYPE_NO_BALL,
  BALL_TYPE_BYE,
  BALL_TYPE_LEG_BYE,
  ACTION_RUN,
  ACTION_EXTRAS,
  BallResultReducer,
  evaluateBallResult, BALL_TYPE_REGULAR, ACTION_OUT,
} from './BallResultReducer';

describe('BallResultReducer', () => {
  it('should return initial state of all extras unselected', () => {
    const initialState = {
      runSelected: -1,
      extrasSelected: '',
      outSelected: false,
    };
    expect(BallResultReducer(undefined, {})).toEqual(initialState);
  });

  it('should return wide when wide is selected', () => {
    const initialState = {
      runSelected: -1,
      extrasSelected: '',
      outSelected: false,
    };
    const updatedState = {
      runSelected: '0',
      extrasSelected: BALL_TYPE_WIDE,
      outSelected: false,
    };
    expect(BallResultReducer(
      initialState,
      ACTION_EXTRAS(BALL_TYPE_WIDE),
    )).toEqual(updatedState);
  });

  it('should return no ball when noball is selected', () => {
    expect(BallResultReducer(
      undefined,
      ACTION_EXTRAS(BALL_TYPE_NO_BALL),
    ).extrasSelected).toEqual(BALL_TYPE_NO_BALL);
  });

  it('should return the given selected run in action', () => {
    expect(BallResultReducer(undefined, ACTION_RUN('2')).runSelected).toEqual('2');
  });

  it('should return out on out', () => {
    expect(BallResultReducer(undefined, ACTION_OUT).outSelected).toEqual(true);
  });

  it('should toggle  out', () => {
    expect(BallResultReducer(BallResultReducer(undefined, ACTION_OUT), ACTION_OUT).outSelected)
      .toEqual(false);
  });
});

describe('evaluateBallResult', () => {
  it('should return initial state', () => {
    const defaultBall = {
      type: BALL_TYPE_REGULAR,
      playerRuns: 0,
      teamRuns: 0,
      extraBall: 0,
      out: false,
    };

    expect(evaluateBallResult({})).toEqual(defaultBall);
  });

  it('should return 0 team run, 1 Player Run , 0 extra ball for 1 Run selected and No extra selected  ', () => {
    const regularBallState = {
      type: BALL_TYPE_REGULAR,
      playerRuns: 1,
      teamRuns: 0,
      extraBall: 0,
      out: false,
    };

    const data = {
      runSelected: 1,
      extrasSelected: '',
    };

    expect(evaluateBallResult(data)).toEqual(regularBallState);
  });

  it('should return 1 team run, 0 Player Run , 1 extra ball for wide and 0 Run Selected ', () => {
    const wideState = {
      type: BALL_TYPE_WIDE,
      playerRuns: 0,
      teamRuns: 1,
      extraBall: 1,
      out: false,
    };

    const data = {
      runSelected: 0,
      extrasSelected: BALL_TYPE_WIDE,
    };

    expect(evaluateBallResult(data)).toEqual(wideState);
  });

  it('should return 5 team run, 0 Player Run , 1 extra ball for wide and 4 Run Selected ', () => {
    const wideState = {
      type: BALL_TYPE_WIDE,
      playerRuns: 0,
      teamRuns: 5,
      extraBall: 1,
      out: false,
    };

    const data = {
      runSelected: 4,
      extrasSelected: BALL_TYPE_WIDE,
    };

    expect(evaluateBallResult(data)).toEqual(wideState);
  });

  it('should return 1 team run, 0 Player Run , 1 extra ball for No Ball and 0 Run Selected ', () => {
    const noBallState = {
      type: BALL_TYPE_NO_BALL,
      playerRuns: 0,
      teamRuns: 1,
      extraBall: 1,
      out: false,
    };

    const data = {
      runSelected: 0,
      extrasSelected: BALL_TYPE_NO_BALL,
    };

    expect(evaluateBallResult(data)).toEqual(noBallState);
  });

  it('should return 1 team run, 4 Player Run , 1 extra ball for No Ball and 4 Run Selected ', () => {
    const noBallState = {
      type: BALL_TYPE_NO_BALL,
      playerRuns: 4,
      teamRuns: 1,
      extraBall: 1,
      out: false,
    };

    const data = {
      runSelected: 4,
      extrasSelected: BALL_TYPE_NO_BALL,
    };

    expect(evaluateBallResult(data)).toEqual(noBallState);
  });

  it('should return 4 team run, 0 Player Run , 0 extra ball for Bye and 4 Run Selected ', () => {
    const byeState = {
      type: BALL_TYPE_BYE,
      playerRuns: 0,
      teamRuns: 4,
      extraBall: 0,
      out: false,
    };

    const data = {
      runSelected: 4,
      extrasSelected: BALL_TYPE_BYE,
    };

    expect(evaluateBallResult(data)).toEqual(byeState);
  });

  it('should return 4 team run, 0 Player Run , 0 extra ball for Leg Bye and 4 Run Selected ', () => {
    const legByeState = {
      type: BALL_TYPE_LEG_BYE,
      playerRuns: 0,
      teamRuns: 4,
      extraBall: 0,
      out: false,
    };

    const data = {
      runSelected: 4,
      extrasSelected: BALL_TYPE_LEG_BYE,
    };

    expect(evaluateBallResult(data)).toEqual(legByeState);
  });
});

