import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Label } from 'reactstrap';
import CurrentScore from '../scorer/CurrentScore';
import ConnectedBatsmenStats from './BatsmenStats';
import { showGame } from '../home/actions';
import ConnectedBowlerStats from './BowlerStats';

const Scorer = props => (
  <Container className="col-md-4 col-md-offset-3 main-content">
    <div className="float-right paddingTop-36px">
      <Button onClick={props.switchToStats}>Game</Button>
    </div>
    <CurrentScore />
    <div className="paddingTop-36px" />
    <Label><b>Batting Table</b></Label>
    <ConnectedBatsmenStats />
    <div className="paddingTop-36px" />
    <Label><b>Bowling Table</b></Label>
    <ConnectedBowlerStats />
  </Container>
);


const mapDispatchToProps = dispatch => ({
  switchToStats: () => dispatch(showGame()),
});

export default connect(undefined, mapDispatchToProps)(Scorer);
