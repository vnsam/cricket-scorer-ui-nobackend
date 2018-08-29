import React from 'react';
import { connect } from 'react-redux';
import './BallInput.css';
import {
  ACTION_EXTRAS, ACTION_RUN,
  ACTION_BALL_PLAYED,
  BALL_TYPE_BYE,
  BALL_TYPE_LEG_BYE,
  BALL_TYPE_NO_BALL,
  BALL_TYPE_WIDE, evaluateBallResult, ACTION_OUT,
} from '../store/BallResultReducer';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Container from 'reactstrap/lib/Container';
import { printScore } from './OverComponent';

const BallInput = (props) => {
  const renderARunButton = index => (<input
    name={index}
    type="button"
    className={props.runSelected === index ? 'selected' : ''}
    value={index}
    onClick={e => props.toggleRun(e.target.name)}
  />);

  const runButtons = [];
  for (let i = 0; i <= 7; i += 1) {
    runButtons[runButtons.length] = renderARunButton(i);
  }

  const extraButtonNames =
    [
      { name: BALL_TYPE_WIDE, value: 'W' },
      { name: BALL_TYPE_NO_BALL, value: 'N' },
      { name: BALL_TYPE_BYE, value: 'B' },
      { name: BALL_TYPE_LEG_BYE, value: 'Lb' }];

  const renderAnExtraButton = (name, key) => (<input
    name={key}
    type="button"
    className={props.extrasSelected === key ? 'selected' : ''}
    value={name}
    onClick={e => props.toggleExtra(e.target.name)}
  />);

  const anySelected = props.extrasSelected || props.extrasSelected !== '' || props.runSelected !== -1 || props.outSelected;

  return (
    <div>
      <div>This Ball</div>
      <Container className="h-10">
        <Row>
          <Col className="sm-2 vertical-center" />
          <Col className="sm-4 vertical-center batsmen strike">
            {props.currentPlayingBatsmen.onStrikeBatsmen.name}
          </Col>
          <Col className="sm-4 vertical-center batsmen">
            {props.currentPlayingBatsmen.offStrikeBatsmen.name}
          </Col>
          <Col className="sm-2 vertical-center" />
        </Row>
      </Container>
      <div>
        {runButtons}
      </div>
      <div>
        Extras : {extraButtonNames.map(item => renderAnExtraButton(item.value, item.name))}
      </div>
      <div>
        <input
          name="out"
          type="button"
          className={props.outSelected ? 'selected' : ''}
          value="Out"
          onClick={e => props.toggleOut()}
        />
      </div>
      <div>
        <button
          className="actionButton"
          disabled={!anySelected}
          onClick={(event) => {
          props.onNextBall(props);
        }}
        >Next Ball
        </button>
      </div>
    </div>);
};


const mapStateToProps = state => ({
  runSelected: state.currentBall.runSelected,
  extrasSelected: state.currentBall.extrasSelected,
  outSelected: state.currentBall.outSelected,
  currentPlayingBatsmen: {
    onStrikeBatsmen: {
      name: 'Dravid',
    },
    offStrikeBatsmen: {
      name: 'Sachin',
    },
  },
});


const mapPropsToDispatcher = dispatch => ({
  toggleExtra: name => dispatch(ACTION_EXTRAS(name)),
  toggleRun: runs => dispatch(ACTION_RUN(runs)),
  toggleOut: () => dispatch(ACTION_OUT),
  onNextBall: (props) => {
    const data = {
      runSelected: props.runSelected === -1 ? 0 : props.runSelected,
      extrasSelected: props.extrasSelected,
      outSelected: props.outSelected,
    };
    dispatch(ACTION_BALL_PLAYED(evaluateBallResult(data)));
  },
});

export default connect(mapStateToProps, mapPropsToDispatcher)(BallInput);
