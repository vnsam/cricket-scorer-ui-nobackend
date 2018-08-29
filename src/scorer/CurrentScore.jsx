import React from 'react';
import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import Container from 'reactstrap/lib/Container';
import './CurrentScore.css';
import '../home/Home.css';

const CurrentScoreComponent = props =>
  (
    <Container>
      <Row className="paddingTop-36px">
        <Col
          sm={{ size: 'auto', offset: 1 }}
        ><b>{props.battingTeam.name}</b>
        </Col>
        <Col
          sm={{ size: 'auto', offset: 1 }}
        ><b>{props.battingTeam.runs}/{props.battingTeam.wickets}
                &nbsp;&nbsp;&nbsp; in &nbsp;&nbsp;&nbsp;
            {props.battingTeam.overBowled}/{props.battingTeam.totalOvers}</b>
        </Col>
      </Row>
      <Row>
        <Col sm={{ size: 'auto', offset: 1 }}>
          {props.bowlingTeam.name} scored {props.bowlingTeam.runs} 
          &nbsp; in {props.bowlingTeam.overBowled} overs
        </Col>
      </Row>
    </Container>);

const mapStateAsPropsForConnectedCurrenScore = state => ({
  battingTeam: state.currentScoreReducer.battingTeam,
  bowlingTeam: state.currentScoreReducer.bowlingTeam,
});
const CurentScore = connect(mapStateAsPropsForConnectedCurrenScore)(CurrentScoreComponent);

export default CurentScore;
