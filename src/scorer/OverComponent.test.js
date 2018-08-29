import { BALL_TYPE_REGULAR, BALL_TYPE_WIDE, BALL_TYPE_NO_BALL, BALL_TYPE_BYE, BALL_TYPE_LEG_BYE } from '../store/BallResultReducer';
import { printScore } from './OverComponent';

describe('printScore', () => {
  function ball(type, playerRuns, teamRuns, extraBall, out) {
    return {
      type, playerRuns, teamRuns, extraBall, out,
    };
  }

  it('should print score as per the ball type', () => {
    let ballOne = ball(BALL_TYPE_WIDE, 0, 1, 1, false);
    let result = printScore(ballOne);
    expect(result).toBe('Wd ');

    ballOne = ball(BALL_TYPE_WIDE, 3, 4, 1, false);
    result = printScore(ballOne);
    expect(result).toBe('Wd3 ');

    ballOne = ball(BALL_TYPE_NO_BALL, 1, 2, 1, false);
    result = printScore(ballOne);
    expect(result).toBe('Nb1 ');

    ballOne = ball(BALL_TYPE_BYE, 0, 3, 0, false);
    result = printScore(ballOne);
    expect(result).toBe('B3 ');

    ballOne = ball(BALL_TYPE_LEG_BYE, 0, 2, 0, false);
    result = printScore(ballOne);
    expect(result).toBe('Lb2 ');

    ballOne = ball(BALL_TYPE_REGULAR, 2, 2, 0, false);
    result = printScore(ballOne);
    expect(result).toBe('2 ');

    ballOne = ball(BALL_TYPE_REGULAR, 1, 1, 0, true);
    result = printScore(ballOne);
    expect(result).toBe('W1 ');

    ballOne = ball(BALL_TYPE_WIDE, 1, 1, 1, true);
    result = printScore(ballOne);
    expect(result).toBe('WWd ');

    ballOne = ball(BALL_TYPE_NO_BALL, 1, 1, 1, true);
    result = printScore(ballOne);
    expect(result).toBe('WNb ');
  });
});
