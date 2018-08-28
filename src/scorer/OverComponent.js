import React from 'react';
import { connect } from 'react-redux';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { BALL_TYPE_WIDE, BALL_TYPE_REGULAR } from '../store/BallResultReducer';

const printScore = (ball) => {
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
};

const OverComponent = props => (
  <Container className="h-10">
    <Row>
      <Col className="sm-4 vertical-center">
        <Row className="align-items-left">
          <p>This Over: </p>
        </Row>
        <Row className="align-items-left">
          <p>Bowler: {props.currentBowler ? props.currentBowler.name : ''}</p>
        </Row>
      </Col>
      <Col className="sm-4 vertical-center">
        <Row className="justify-content-center">
          <p>{props.currentOver.balls.map(ball => `${printScore(ball)}`)}</p>
        </Row>
      </Col>
      <Col className="sm-4" />
    </Row>
  </Container>
);

const mapStateToProps = state => ({
  currentOver: state.over.currentOver,
  currentBowler: state.over.currentBowler,
});

const ConnectedOverComponent = connect(mapStateToProps)(OverComponent);
export default ConnectedOverComponent;
