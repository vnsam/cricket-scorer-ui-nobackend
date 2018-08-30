import OverReducer from './OverReducer';
import Over from '../model/over';
import { BALL_TYPE_REGULAR, BALL_TYPE_WIDE, ACTION_BALL_PLAYED } from '../store/BallResultReducer';
import { ACTION_OVER_COMPLETE } from '../home/actions';

describe('over', () => {
  function ball(type, playerRuns, teamRuns, extraBall, out) {
    return {
      type, playerRuns, teamRuns, extraBall, out,
    };
  }

  it('should add a ball to the over', () => {
    const over = new Over();
    const ballOne = ball(BALL_TYPE_REGULAR, 2, 2, 0, false);
    over.addBall(ballOne);
    expect(OverReducer(undefined, ACTION_BALL_PLAYED(ballOne)).currentOver).toEqual(over);
  });

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

  it('should default the bowler to "Bhuvaneshwar Kumar"', () => {
    const ballOne = ball(BALL_TYPE_REGULAR, 3, 3, 0, false);
    const modifiedState = OverReducer(undefined, ACTION_BALL_PLAYED(ballOne));
    expect(modifiedState.currentBowler.name).toBe('Bhuvaneshwar Kumar');
  });

  it('should reset the current over on ACTION_OVER_COMPLETE', () => {
    const modifiedState = OverReducer(undefined, ACTION_OVER_COMPLETE());
    expect(modifiedState.currentOver.balls.length).toBe(0);
  });

  it('should increment the completedOvers state by 1 on ACTION_OVER_COMPLETE', () => {
    let state = OverReducer(undefined, ACTION_OVER_COMPLETE());
    expect(state.completedOvers).toBe(1);

    state = OverReducer(state, ACTION_OVER_COMPLETE());
    expect(state.completedOvers).toBe(2);
  });
});
