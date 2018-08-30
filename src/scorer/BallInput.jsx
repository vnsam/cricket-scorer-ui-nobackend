import React from 'react';
import { Row, Col, Container, Button } from 'reactstrap';
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
  const renderARunButton = index => (<Button
    className="ball-input"
    size="lg"
    name={index}
    outline
    color="success"
    active={props.runSelected === index}
    value={index}
    onClick={e => props.toggleRun(e.target.name)}
  > { index } 
                                     </Button>);

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

  const renderAnExtraButton = (name, key) => (<Button
    className="ball-input"
    name={key}
    size="lg"
    outline
    color="success"
    active={props.extrasSelected === key}
    onClick={e => props.toggleExtra(e.target.name)}
  > { name } 
                                              </Button>);

  const anySelected = props.extrasSelected || props.extrasSelected !== '' || props.runSelected !== -1 || props.outSelected;

  return (
    <div>
      <Container>
        <Row className="paddingTop-36px">
          <Col sm={{ size: 'auto' }}>
            This Ball
          </Col>
        </Row>
        <Row>
          <Col sm="1" className="no-padding" />
          <Col sm="5" className="no-padding" >
            <Button outline size="lg" color="secondary"
              block active={props.currentPlayingBatsmen.onStrikeBatsman.active}>
              {props.currentPlayingBatsmen.onStrikeBatsman.name}
            </Button>
          </Col>
          <Col sm="5" className="no-padding">
            <Button outline size="lg" color="secondary"
              block active={props.currentPlayingBatsmen.offStrikeBatsman.active}>
              {props.currentPlayingBatsmen.offStrikeBatsman.name}
            </Button>
          </Col>
          <Col sm="1" className="no-padding" />
        </Row>
        <Row className="paddingTop-36px">
          <Col>
            {runButtons}
          </Col>
        </Row>
        <Row className="paddingTop-24px">
          <Col>
            <span className="ball-label">
                Extras :
            </span>
            {extraButtonNames.map(item => renderAnExtraButton(item.value, item.name))}
          </Col>
        </Row>
        <Row className="paddingTop-24px">
          <Col>
            <Button
              name="out"
              size="lg"
              outline
              color="danger"
              active={props.outSelected}
              onClick={props.toggleOut}
            >Out
            </Button>
          </Col>
        </Row>
        <Row className="paddingTop-24px text-center">
          <Col>
            <Button
              name="actionButton"
              size="lg"
              outline
              color="primary"
              disabled={!anySelected}
              onClick={() => props.onNextBall(props)}
            >Next Ball
            </Button>
          </Col>
        </Row>
      </Container>
    </div>);
};


const mapStateToProps = state => ({
  runSelected: state.currentBall.runSelected,
  extrasSelected: state.currentBall.extrasSelected,
  outSelected: state.currentBall.outSelected,
  //currentPlayingBatsmen: state.OnStrikeReducer.currentPlayingBatsmen,
  currentPlayingBatsmen: state.currentBall.currentPlayingBatsmen,
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
    const ballResult = evaluateBallResult(data);
    ballResult.onStrikeBatsman = props.currentPlayingBatsmen.onStrikeBatsman.name;
    dispatch(ACTION_BALL_PLAYED(ballResult));
  },
});

export default connect(mapStateToProps, mapPropsToDispatcher)(BallInput);
