import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { BALL_TYPE_WIDE, BALL_TYPE_BYE, BALL_TYPE_NO_BALL, BALL_TYPE_LEG_BYE, WICKET } from '../store/BallResultReducer';
import Player from '../model/player';
import Over from '../model/over';

export const printScore = (ball) => {
  if (ball.out) {
    if (BALL_TYPE_WIDE === ball.type || BALL_TYPE_NO_BALL === ball.type) {
      return `${WICKET}${ball.type} `;
    }
    const runs = ball.playerRuns === 0 ? '' : ball.playerRuns;
    return `${WICKET}${runs} `;
  }

  let score = '';
  if (BALL_TYPE_WIDE === ball.type || BALL_TYPE_NO_BALL === ball.type) {
    const runs = ball.teamRuns === 1 ? '' : ball.teamRuns - 1;
    score = `${ball.type}${runs}`;
  } else if (BALL_TYPE_BYE === ball.type || BALL_TYPE_LEG_BYE === ball.type) {
    score = `${ball.type}${ball.teamRuns}`;
  } else {
    score = ball.teamRuns;
  }

  return `${score} `;

  // let score = '';
  // switch (ball.type) {
  //   case BALL_TYPE_WIDE:
  //   case BALL_TYPE_NO_BALL:
  //     const runs = ball.playerRuns === 0 ? '' : ball.playerRuns;
  //     score = `${ball.type}${runs}`;
  //     break;
  //   case BALL_TYPE_BYE:
  //   case BALL_TYPE_LEG_BYE:
  //     score = `${ball.type}${ball.playerRuns}`;
  //     break;

  //   default:
  //     score = ball.type + ball.playerRuns;
  //     break;
  // }
  // return `${score} `;
};

const OverComponent = props => (
  <Container className="h-10">
    <Row>
      <Col className="sm-4 vertical-center">
        <Row className="align-items-left">
          <p>This Over: </p>
        </Row>
        <Row className="align-items-left">
          <p>Bowler: {props.currentBowler
            && props.currentBowler.name}
          </p>
        </Row>
      </Col>
      <Col className="sm-4 vertical-center">
        <Row className="justify-content-center">
          <p>
            {props.currentOver
                  .balls
                  .map(ball => `${printScore(ball)}`)}
          </p>
        </Row>
      </Col>
      <Col className="sm-4" />
    </Row>
  </Container>
);

OverComponent.propTypes = {
  currentBowler: PropTypes.instanceOf(Player),
  currentOver: PropTypes.instanceOf(Over),
};

OverComponent.defaultProps = {
  currentBowler: {},
  currentOver: {},
};

const mapStateToProps = state => ({
  currentOver: state.over.currentOver,
  currentBowler: state.over.currentBowler,
});

export const ConnectedOverComponent = connect(mapStateToProps)(OverComponent);
