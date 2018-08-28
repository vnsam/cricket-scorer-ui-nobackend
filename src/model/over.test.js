import Over from './over';
import { BALL_TYPE_REGULAR, BALL_TYPE_WIDE, BALL_TYPE_NO_BALL } from '../store/BallResultReducer';

describe('over', () => {
  function ball(type, playerRuns, teamRuns, extraBall, out) {
    return {
      type, playerRuns, teamRuns, extraBall, out,
    };
  }

  it('over should not complete until the REGULAR ball count reaches 6', () => {
    const over = new Over();

    over.addBall(ball(BALL_TYPE_WIDE, 0, 1, 1, false));
    over.addBall(ball(BALL_TYPE_REGULAR, 3, 3, 0, false));
    over.addBall(ball(BALL_TYPE_NO_BALL, 6, 7, 1, false));
    over.addBall(ball(BALL_TYPE_REGULAR, 1, 1, 0, false));
    over.addBall(ball(BALL_TYPE_REGULAR, 0, 0, 0, true));

    expect(over.isComplete()).toBe(false);
  });

  it('over should complete if all the first 6 balls are REGULAR balls', () => {
    const over = new Over();

    over.addBall(ball(BALL_TYPE_REGULAR, 0, 1, 0, false));
    over.addBall(ball(BALL_TYPE_REGULAR, 3, 3, 0, false));
    over.addBall(ball(BALL_TYPE_REGULAR, 6, 7, 0, false));
    over.addBall(ball(BALL_TYPE_REGULAR, 1, 1, 0, false));
    over.addBall(ball(BALL_TYPE_REGULAR, 0, 0, 0, true));
    over.addBall(ball(BALL_TYPE_REGULAR, 0, 0, 0, true));

    expect(over.isComplete()).toBe(true);
  });

  it('over should complete if all the first 6 balls are REGULAR balls', () => {
    const over = new Over();

    over.addBall(ball(BALL_TYPE_REGULAR, 0, 1, 0, false));
    over.addBall(ball(BALL_TYPE_REGULAR, 3, 3, 0, false));
    over.addBall(ball(BALL_TYPE_WIDE, 0, 0, 1, false));
    over.addBall(ball(BALL_TYPE_REGULAR, 1, 1, 0, false));
    over.addBall(ball(BALL_TYPE_REGULAR, 0, 0, 0, true));
    over.addBall(ball(BALL_TYPE_REGULAR, 0, 0, 0, true));

    expect(over.isComplete()).toBe(false);
  });
});

