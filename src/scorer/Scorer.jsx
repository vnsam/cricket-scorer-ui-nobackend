import React from 'react';
import { connect } from 'react-redux';
import { Button, Container } from 'reactstrap';
import CurrentScore from '../scorer/CurrentScore';
import ConnectedBatsmenStats from './BatsmenStats';
import { showGame } from '../home/actions';

const Scorer = props => (
  <Container className="col-md-6 col-md-offset-3 main-content">
    <div className="float-right">
      <Button onClick={props.switchToStats}>Game</Button>
    </div>
    <CurrentScore />
    <div className="paddingTop-36px" />
    <ConnectedBatsmenStats />
  </Container>
);

const mapDispatchToProps = dispatch => ({
  switchToStats: () => dispatch(showGame()),
});

export default connect(undefined, mapDispatchToProps)(Scorer);
