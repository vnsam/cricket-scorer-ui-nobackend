import React from 'react';
import { connect } from 'react-redux';
import { ACTION_EXTRAS, ACTION_RUN } from '../store/BallPlayedReducer';
import './BallInput.css';
import { BALL_TYPE_BYE, BALL_TYPE_LEG_BYE, BALL_TYPE_NO_BALL, BALL_TYPE_WIDE } from '../store/BallResultReducer';

const BallInput = (props) => {
  console.log(props.runSelected);
  const renderARunButton = index => (<input
    name={index}
    type="button"
    className={props.runSelected === index.toString() ? 'selected' : ''}
    value={index}
    onClick={e => props.toggleRun(e.target.name)}
  />);

  const runButtons = [];
  for (let i = 0; i <= 7; i += 1) {
    runButtons.push(renderARunButton(i));
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

  return (
    <div>
      <div>
        {runButtons}
      </div>
      <div>
        {extraButtonNames.map(item => renderAnExtraButton(item.value, item.name))}
      </div>
      <div>
        <button onClick={(event) => {
          props.onNextBall();
        }}
        >Next Ball
        </button>
      </div>
    </div>);
};


const mapStateToProps = state => ({
  runSelected: state.ballInput.runSelected,
  extrasSelected: state.ballInput.extrasSelected,
});


const mapPropsToDispatcher = dispatch => ({
  toggleExtra: name => dispatch(ACTION_EXTRAS(name)),
  toggleRun: runs => dispatch(ACTION_RUN(runs)),
  onNextBall: () => (1),
});

export default connect(mapStateToProps, mapPropsToDispatcher)(BallInput);
