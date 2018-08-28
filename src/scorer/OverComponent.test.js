import { BALL_TYPE_REGULAR, BALL_TYPE_WIDE, BALL_TYPE_NO_BALL, BALL_TYPE_BYE, BALL_TYPE_LEG_BYE } from '../store/BallResultReducer';
import ConnectedOverComponent from './OverComponent';

describe('printScore', () => {
  function ball(type, playerRuns, teamRuns, extraBall, out) {
    return {
      type, playerRuns, teamRuns, extraBall, out,
    };
  }

  it('should print score as per the ball type', () => {
    let ballOne = ball(BALL_TYPE_WIDE, 0, 1, 1, false);
    let result = ConnectedOverComponent.printScore(ballOne);
    expect(result).toBe('Wd ');

    ballOne = ball(BALL_TYPE_NO_BALL, 1, 2, 1, false);
    result = ConnectedOverComponent.printScore(ballOne);
    expect(result).toBe('Nb1 ');

    ballOne = ball(BALL_TYPE_BYE, 3, 3, 3, false);
    result = ConnectedOverComponent.printScore(ballOne);
    expect(result).toBe('B3 ');

    ballOne = ball(BALL_TYPE_LEG_BYE, 2, 2, 2, false);
    result = ConnectedOverComponent.printScore(ballOne);
    expect(result).toBe('Lb2 ');

    ballOne = ball(BALL_TYPE_REGULAR, 2, 2, 2, false);
    result = ConnectedOverComponent.printScore(ballOne);
    expect(result).toBe('2 ');

    ballOne = ball(BALL_TYPE_REGULAR, 0, 0, 0, true);
    result = ConnectedOverComponent.printScore(ballOne);
    expect(result).toBe('W ');
  });
});
