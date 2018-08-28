
import { BALL_TYPE_REGULAR } from '../store/BallPlayedReducer';

export const BALLS_PER_OVER = 6;

class Over {
  constructor(bowler) {
    this.bowler = bowler;
    this.balls = [];
  }

  addBall(ball) {
    this.balls.push(ball);
  }

  isComplete() {
    const regularBalls = this.balls.reduce((accumulator, ball) => accumulator
    + (BALL_TYPE_REGULAR === ball.type ? 1 : 0), 0);
    return BALLS_PER_OVER === regularBalls;
  }
}

export default Over;
