import OverReducer from './OverReducer';
import Over from '../model/over';
import { BALL_TYPE_REGULAR, BALL_TYPE_WIDE, ACTION_BALL_PLAYED } from '../store/BallResultReducer';

describe('over', () => {
  function ball(type, playerRuns, teamRuns, extraBall, out) {
    return {
      type, playerRuns, teamRuns, extraBall, out,
    };
  }

  // TODO: fix this test
  // it('should add a ball to the over', () => {
  //   const over = new Over();
  //   const ballOne = ball(BALL_TYPE_REGULAR, 2, 2, 0, false);
  //   over.addBall(ballOne);
  //   expect(OverReducer(undefined, ACTION_BALL_PLAYED(ballOne)).currentOver).toEqual(over);
  // });

  it('should update the new balls to the same over', () => {
    const over = new Over();
    const ballOne = ball(BALL_TYPE_REGULAR, 3, 3, 0, false);
    over.addBall(ballOne);

    let modifiedState = OverReducer(undefined, ACTION_BALL_PLAYED(ballOne));
    expect(JSON.stringify(modifiedState.currentOver)).toEqual(JSON.stringify(over));
    const ballTwo = ball(BALL_TYPE_WIDE, 4, 12, 1, false);
    over.addBall(ballTwo);

    modifiedState = OverReducer(modifiedState, ACTION_BALL_PLAYED(ballTwo));
    expect(JSON.stringify(modifiedState.currentOver)).toEqual(JSON.stringify(over));
  });
});
