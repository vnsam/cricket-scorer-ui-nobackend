import { connect } from 'react-redux';
import React from 'react';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import './Home.css';
import { createGameAction } from './actions';
import CurrentScore from '../scorer/CurrentScore';

import BallInput from '../scorer/BallInput';
import { ConnectedOverComponent } from '../scorer/OverComponent';

const Home = () => (
  <Container className="h-auto">
    <Row className="align-items-center w-500">
      <Col className="text-left">
        <CurrentScore />
        <ConnectedOverComponent />
        <BallInput />
      </Col>
    </Row>
    <Row />
  </Container>);


const mapDispatchToProps = dispatch => ({
  createGame: () => dispatch(createGameAction()),
});

export default connect(undefined, mapDispatchToProps)(Home);
