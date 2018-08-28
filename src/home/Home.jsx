import { connect } from 'react-redux';
import React from 'react';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import './Home.css';
import { createGameAction } from './actions';

import BallInput from '../scorer/BallInput';

const Home = () => (
  <Container className="h-auto">
    <Row className="align-items-center w-500">
      <Col className="text-center">
        <BallInput />
      </Col>
    </Row>
    <Row />
  </Container>);


const mapDispatchToProps = dispatch => ({
  createGame: () => dispatch(createGameAction()),
});

export default connect(undefined, mapDispatchToProps)(Home);
