
import { BALL_TYPE_REGULAR } from '../store/BallResultReducer';

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
    + (BALL_TYPE_REGULAR === ball.type ? 1 : 0), 0);
    return regularBalls;
  }

  isComplete() {
    return BALLS_PER_OVER === this.getBalls();
  }
}

export default Over;
