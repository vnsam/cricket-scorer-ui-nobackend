import React from 'react';
import { Label } from 'reactstrap';
import { connect } from 'react-redux';
import Container from 'reactstrap/lib/Container';
import './CurrentScore.css';

const CurrentScoreComponent = props =>
  (
    <Container className="h-100">
      <div className="clearfix current-score-bold">
        <Label
          className="float-left"
        >
          <b>{props.battingTeam.name}</b>
        </Label>
        <Label className="float-right">
          <b>{props.battingTeam.runs}/{props.battingTeam.wickets}
            in {props.battingTeam.overBowled}/{props.battingTeam.totalOvers}
          </b>
        </Label>
      </div>

      <div className="clearfix current-score">
        <Label
          className="float-left"
        >
          {props.bowlingTeam.name} scored {props.bowlingTeam.runs} in {props.bowlingTeam.overBowled} overs
        </Label>
      </div>
    </Container>);

const mapStateAsPropsForConnectedCurrenScore = state => ({
  battingTeam: state.currentScoreReducer.battingTeam,
  bowlingTeam: state.currentScoreReducer.bowlingTeam,
});
const CurentScore = connect(mapStateAsPropsForConnectedCurrenScore)(CurrentScoreComponent);

export default CurentScore;
