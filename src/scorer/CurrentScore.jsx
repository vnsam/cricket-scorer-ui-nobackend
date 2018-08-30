import React from 'react';
import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import Container from 'reactstrap/lib/Container';
import './CurrentScore.css';
import '../home/Home.css';

export const computeCurrentOvers = (props) => {
  let currentOverBalls = 0;
  let completedOversSoFar;

  if (props.over) {
    const { completedOvers, currentOver } = props.over;
    currentOverBalls = currentOver.getBalls();
    completedOversSoFar = completedOvers;
  }

  return `${completedOversSoFar}.${currentOverBalls}`;
};

const CurrentScoreComponent = props =>
  (
    <Container>
      <Row className="paddingTop-36px">
        <Col
          sm={{ size: 'auto' }}
        ><b>{props.battingTeam.name}</b>
        </Col>
        <Col
          sm={{ size: 'auto' }}
        ><b>{props.battingTeam.runs}/{props.battingTeam.wickets}
                &nbsp;&nbsp;&nbsp; in &nbsp;&nbsp;&nbsp;
          {computeCurrentOvers(props)}/{props.battingTeam.totalOvers}
         </b>
        </Col>
      </Row>
      <Row>
        <Col sm={{ size: 'auto' }}>
          {props.bowlingTeam.name} scored {props.bowlingTeam.runs}
          &nbsp; in {props.bowlingTeam.overBowled} overs
        </Col>
      </Row>
    </Container>);

const mapStateAsPropsForConnectedCurrenScore = state => ({
  battingTeam: state.currentScoreReducer.battingTeam,
  bowlingTeam: state.currentScoreReducer.bowlingTeam,
  over: state.over,
  completedOvers: state.completedOvers,
});
const CurentScore = connect(mapStateAsPropsForConnectedCurrenScore)(CurrentScoreComponent);

export default CurentScore;
