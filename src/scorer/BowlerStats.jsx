import React from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { ACTION_BALL_PLAYED } from '../store/BallResultReducer';


const BowlerStats = props => (
  <div>
    <Table striped>
      <thead>
        <tr>
          <th onClick={() => {
            props.actionPlayed();
          }}
          >Bowlers
          </th>
          <th>Overs</th>
          <th>Maiden</th>
          <th>Runs</th>
          <th>Wickets</th>
        </tr>
      </thead>
      <tbody>
        {
      props.bowlerStatsDetails.map(element =>
        (
          <tr>
            <td>{element.name}</td>
            <td>{Math.trunc( element.balls / 6) + '.' + (element.balls % 6)}</td>
            <td>{element.maiden}</td>
            <td>{element.runs}</td>
            <td>{element.wickets}</td>
          </tr>))
    }
      </tbody>
    </Table>
  </div>
);

const mapStateToBowlerStats = (state) => {
  console.log('from map');
  console.log(state.bowlerStats.batsmenDetails);
  return {
    bowlerStatsDetails: state.bowlerStats.bowlerDetails,
  };
};

const mapDispatchAction = dispatch => ({
  actionPlayed: () => dispatch(ACTION_BALL_PLAYED()),
});

const ConnectedBowlerStats = connect(mapStateToBowlerStats, mapDispatchAction)(BowlerStats);
export default ConnectedBowlerStats;

