import React from 'react';
import { Row, Col, Container, Button, ButtonGroup } from 'reactstrap';
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
      { name: BALL_TYPE_WIDE, value: BALL_TYPE_WIDE },
      { name: BALL_TYPE_NO_BALL, value: BALL_TYPE_NO_BALL },
      { name: BALL_TYPE_BYE, value: BALL_TYPE_BYE },
      { name: BALL_TYPE_LEG_BYE, value: BALL_TYPE_LEG_BYE }];

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
      <Container>
        <Row className="paddingTop-36px">
          <Col sm={{ size: 'auto', offset: 1 }}>
            This Ball
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 'auto', offset: 3 }}>
            <Button>
              {props.currentPlayingBatsmen.onStrikeBatsmen.name}
            </Button>
          </Col>
          <Col sm="12" md={{ size: 'auto', offset: 3 }}>
            <Button>
              {props.currentPlayingBatsmen.offStrikeBatsmen.name}
            </Button>
          </Col>
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
