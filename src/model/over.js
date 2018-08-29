
import { BALL_TYPE_NO_BALL, BALL_TYPE_WIDE } from '../store/BallResultReducer';

export const BALLS_PER_OVER = 6;

class Over {
  constructor(bowler) {
    this.bowler = bowler;
    this.balls = [];
  }

  addBall(ball) {
    this.balls.push(ball);
  }

  getBalls() {
    const regularBalls = this.balls.reduce((accumulator, ball) => accumulator
    + (((BALL_TYPE_NO_BALL === ball.type) || (BALL_TYPE_WIDE === ball.type)) ? 0 : 1), 0);
    return regularBalls;
  }

  isComplete() {
    return BALLS_PER_OVER === this.getBalls();
  }
}

export default Over;
