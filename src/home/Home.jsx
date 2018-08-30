import { connect } from 'react-redux';
import React from 'react';
import { Container, Button } from 'reactstrap';
import './Home.css';
import { createGameAction, showStats } from './actions';
import CurrentScore from '../scorer/CurrentScore';
import BallInput from '../scorer/BallInput';
import { ConnectedOverComponent } from '../scorer/OverComponent';

const Home = props => (
  <Container className="col-md-4 col-md-offset-3 main-content">
    <div className="float-right paddingTop-36px">
      <Button onClick={props.switchToStats}>Stats</Button>
    </div>
    <CurrentScore />
    <ConnectedOverComponent />
    <BallInput />
  </Container>
);

const mapDispatchToProps = dispatch => ({
  createGame: () => dispatch(createGameAction()),
  switchToStats: () => dispatch(showStats()),
});

export default connect(undefined, mapDispatchToProps)(Home);
