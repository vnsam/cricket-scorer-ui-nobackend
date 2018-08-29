import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { BALL_TYPE_WIDE, BALL_TYPE_BYE, BALL_TYPE_NO_BALL, BALL_TYPE_LEG_BYE, WICKET } from '../store/BallResultReducer';
import Player from '../model/player';
import Over from '../model/over';
import '../home/Home.css';
import { ACTION_OVER_COMPLETE } from '../home/actions';

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
    const type = ball.teamRuns === 0 ? '' : ball.type;
    score = `${type}${ball.teamRuns}`;
  } else {
    score = ball.teamRuns;
  }

  return `${score} `;
};

export const checkForOverCompletion = (props) => {
  if (props.currentOver.isComplete()) {
    props.overComplete();
  }
};

const OverComponent = props => (
  <Container>
    <Row className="paddingTop-36px">
      <Col sm={{ size: 'auto', offset: 1 }}>
        This Over:
      </Col>
      <Col sm={{ size: 'auto', offset: 1 }}>
        {props.currentOver
                  .balls
                  .map(ball => `${printScore(ball)}`)}
      </Col>
    </Row>
    <Row>
      <Col sm={{ size: 'auto', offset: 1 }}>
        Bowler: {props.currentBowler && props.currentBowler.name}
      </Col>
    </Row>
    {checkForOverCompletion(props)}
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

const mapDispatchToProps = dispatch => ({
  overComplete: () => dispatch(ACTION_OVER_COMPLETE()),
});

export const ConnectedOverComponent = connect(mapStateToProps, mapDispatchToProps)(OverComponent);
