import { connect } from 'react-redux';
import React from 'react';
import { Container } from 'reactstrap';
import './Home.css';
import { createGameAction } from './actions';
import CurrentScore from '../scorer/CurrentScore';

import BallInput from '../scorer/BallInput';
import { ConnectedOverComponent } from '../scorer/OverComponent';

const Home = () => (
  <Container className="col-md-6 col-md-offset-3 main-content">
    <CurrentScore />
    <ConnectedOverComponent />
    <BallInput />
  </Container>
);


const mapDispatchToProps = dispatch => ({
  createGame: () => dispatch(createGameAction()),
});

export default connect(undefined, mapDispatchToProps)(Home);
