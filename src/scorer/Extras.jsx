import { connect } from 'react-redux';
import React from 'react';
import { ACTION_BYE, ACTION_LEG_BYE, ACTION_NO_BALL, ACTION_WIDE } from '../store/ExtrasReducer';
import './Extras.css';

const Extras = props => (
  <div>
    <button
      className={props.wideSelected ? 'selected' : ''}
      name={ACTION_WIDE.type}
      onClick={(event) => { props.toggle(event.target.name); }}
    >
      W
    </button>
    <button
      className={props.noBallSelected ? 'selected' : ''}
      name={ACTION_NO_BALL.type}
      onClick={(event) => { props.toggle(event.target.name); }}
    >
      NB
    </button>
    <button
      className={props.byeSelected ? 'selected' : ''}
      name={ACTION_BYE.type}
      onClick={(event) => { props.toggle(event.target.name); }}
    >
      B
    </button>
    <button
      className={props.legByeSelected ? 'selected' : ''}
      name={ACTION_LEG_BYE.type}
      onClick={(event) => { props.toggle(event.target.name); }}
    >
      LB
    </button>
    <button
      onClick={(event) => { props.toggle(event.target.name); }}
    >
      WB
    </button>
  </div>
);

const mapStateToProps = state => ({
  wideSelected: state.extras.wideSelected,
  noBallSelected: state.extras.noBallSelected,
  byeSelected: state.extras.byeSelected,
  legByeSelected: state.extras.legByeSelected,
});


const mapPropsToDispatcher = dispatch => ({
  toggle: name => dispatch({ type: name }),
});

const ExtrasConnectComponent = connect(mapStateToProps, mapPropsToDispatcher)(Extras);

export default ExtrasConnectComponent;
