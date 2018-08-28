import React from 'react';
import { connect } from 'react-redux';
import { BALL_TYPE_WIDE, BALL_TYPE_REGULAR } from '../store/BallResultReducer';

class OverComponent extends React.Component {
  static printScore(ball) {
    let score;
    if (ball.out) {
      return 'W ';
    }
    switch (ball.type) {
      case BALL_TYPE_REGULAR:
        score = ball.playerRuns;
        break;

      case BALL_TYPE_WIDE:
        score = BALL_TYPE_WIDE;
        break;

      default:
        score = ball.type + ball.playerRuns;
        break;
    }
    return `${score} `;
  }

  render() {
    return (
      <div>
        <p>This Over: {this.props.currentOver.balls.map(ball => `${OverComponent.printScore(ball)}`)}</p>
        <p>Bowler: {this.props.currentBowler ? this.props.currentBowler.name : ''}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentOver: state.over.currentOver,
  currentBowler: state.over.currentBowler,
});

const ConnectedOverComponent = connect(mapStateToProps)(OverComponent);
export default ConnectedOverComponent;
