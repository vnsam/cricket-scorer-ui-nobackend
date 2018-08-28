import React from 'react';
import './RunScorer.css';
import {UpdateCurrentRunScore} from '../store/runScoreReducer.js'
import connect from 'react-redux/lib/connect/connect';
import {runScoreAction} from '../store/runScoreReducer.js'


const RunScorer = (props)=>    
   <div>
        <button value = '0' className={props.selectedState} onClick={(event)=>{props.runScoreDispatch(event.target.value); props.toggle}}>0</button>
        <button  value = '1' className={props.selectedState} onClick={(event)=>{props.runScoreDispatch(event.target.value); props.toggle}} >1</button>
       <button  value = '2' onClick={(event)=>{props.runScoreDispatch(event.target.value);props.toggle}} >2</button>
       <button  value = '3' onClick={(event)=>{props.runScoreDispatch(event.target.value);props.toggle}} >3</button>
       <button  value = '4' onClick={(event)=>{props.runScoreDispatch(event.target.value);props.toggle}} >4</button>
       <button  value = '5' onClick={(event)=>{props.runScoreDispatch(event.target.value);props.toggle}} >5</button>
       <button  value = '6' onClick={(event)=>{props.runScoreDispatch(event.target.value);;props.toggle}}>6</button>
       <button  value = '7' onClick={(event)=>{props.runScoreDispatch(event.target.value);props.toggle}}>7</button>
   </div>


const mapStateToSelected = (state) =>{
  let tempState = state;
  return {
    selectedState: 'selected'}
}
const mapDispatchToRunScore = (dispatch)=>({  
  runScoreDispatch: (runScore) => dispatch(UpdateCurrentRunScore(runScore)),
  toggle : ()=>{console.log('this is message from toggle'); return dispatch(runScoreAction())}
 });

 const ConnectedRunScore = connect(mapStateToSelected, mapDispatchToRunScore)(RunScorer)

export default ConnectedRunScore;