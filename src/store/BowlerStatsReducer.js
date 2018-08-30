
import { ACTION_BALL_PLAYED, BALL_TYPE_WIDE, BALL_TYPE_NO_BALL } from './BallResultReducer';

const initialState = {

  bowlerDetails: [

  ],
  runsInThisOver: 0,
};

const createNewBowler = (actionData) => {
  const newBowler = {
    name: actionData.currentBowlingBowler,
    balls: 0,
    maiden: 0,
    runs: 0,
    wickets: 0,
  };

  if (actionData.type !== BALL_TYPE_WIDE && actionData.type !== BALL_TYPE_NO_BALL) {
    newBowler.balls += 1;
  }
  newBowler.runs += actionData.teamRuns;
  if (actionData.out) {
    newBowler.wickets += 1;
  }
  return newBowler;
};

const bowlerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_BALL_PLAYED().type: {
      console.log('from bowler stats reducer');
      console.log(action.data);
      const udpatedBowlerDetails = state.bowlerDetails;

      if (action.data.currentBowlingBowler) {
        let didBowlerFound = false;
        state.bowlerDetails.forEach((element, index) => {
          if (element.name === action.data.currentBowlingBowler) {
            didBowlerFound = true;
            if (action.data.type !== BALL_TYPE_WIDE && action.data.type !== BALL_TYPE_NO_BALL) {
              udpatedBowlerDetails[index].balls += 1;
            }
            udpatedBowlerDetails[index].runs += action.data.teamRuns;
            if (action.data.out) {
              udpatedBowlerDetails[index].wickets += 1;
            }
            state.runsInThisOver += action.data.teamRuns;
            if ((udpatedBowlerDetails[index].balls % 6) === 0) {
              if (state.runsInThisOver === 0) {
                udpatedBowlerDetails[index].maiden += 1;
              } else {
                state.runsInThisOver = 0;
              }
            }
          }
        });
        if (!didBowlerFound) {
          udpatedBowlerDetails.push(createNewBowler(action.data));
        }
      }

      return { ...state, bowlerDetails: [...udpatedBowlerDetails] };
    }
    default:
      return state;
  }
};


export default bowlerReducer;

