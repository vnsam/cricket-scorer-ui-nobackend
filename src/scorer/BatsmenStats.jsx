import React from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { ACTION_BALL_PLAYED } from '../store/BatsmenStatsReducer';


const BatsmenStats = props => (
  <div>
    <Table striped>
      <thead>
        <tr>
          <th onClick={() => {
            console.log('table head clicked');
            props.actionPlayed();
          }}
          >Batsman
          </th>
          <th>Runs</th>
          <th>Balls</th>
          <th>Fours</th>
          <th>Sixes</th>
          <th>Strike Rate</th>
        </tr>
      </thead>
      <tbody>
        {
          console.log('from table body')}
        { console.log(props.statsDetails)}
        {
      props.statsDetails.map(element =>
        (<tr>
          <td>{element.name}</td>
          <td>{element.runs}</td>
          <td>{element.balls}</td>
          <td>{element.fours}</td>
          <td>{element.sixes}</td>
          <td>{element.strikeRate}</td>
        </tr>),)
    }
      </tbody>
        </Table>
    </div>
);

const mapStateToBatsmenStats = (state) => {
  console.log('from map');
  console.log(state.batsmenStats.batsmenDetails);
  return {
    statsDetails: state.batsmenStats.batsmenDetails,
  };
};

const mapDispatchAction = dispatch => ({
  actionPlayed: () => dispatch(ACTION_BALL_PLAYED()),
});

const ConnectedBatsmenStats = connect(mapStateToBatsmenStats, mapDispatchAction)(BatsmenStats);
export default ConnectedBatsmenStats;

