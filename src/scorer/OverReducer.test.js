import OverReducer from './OverReducer';
import Over from '../model/over';
import { BALL_TYPE_REGULAR, BALL_TYPE_WIDE, ACTION_BALL_PLAYED } from '../store/BallPlayedReducer';

describe('over', () => {
  function ball(type, playerRuns, teamRuns, extraBall, out) {
    return {
      type, playerRuns, teamRuns, extraBall, out,
    };
  }

  function ballPlayedAction() {
    return {
      type: ACTION_BALL_PLAYED.type,
    };
  }

  it('should add a ball to the over', () => {
    const over = new Over();
    const ballOne = ball(BALL_TYPE_REGULAR, 3, 3, 0, false);
    over.addBall(ballOne);

    const expectedState = {
      currentBallPlayed: ballOne,
      currentOver: over,
    };

    expect(JSON.stringify(OverReducer({
      currentBallPlayed: ballOne,
    }, ballPlayedAction()))).toEqual(JSON.stringify(expectedState));
  });

  it('should update the new balls to the same over', () => {
    const over = new Over();
    const ballOne = ball(BALL_TYPE_REGULAR, 3, 3, 0, false);
    over.addBall(ballOne);

    let expectedState = {
      currentBallPlayed: ballOne,
      currentOver: over,
    };

    const currentOverState = Object.assign({}, over);
    expect(JSON.stringify(OverReducer({
      currentBallPlayed: ballOne,
    }, ballPlayedAction()))).toEqual(JSON.stringify(expectedState));


    const ballTwo = ball(BALL_TYPE_WIDE, 4, 12, 1, false);
    over.addBall(ballTwo);

    expectedState = {
      currentBallPlayed: ballTwo,
      currentOver: over,
    };
    expect(JSON.stringify(OverReducer({
      currentBallPlayed: ballTwo,
      currentOver: currentOverState,
    }, ballPlayedAction()))).toEqual(JSON.stringify(expectedState));
  });
});
