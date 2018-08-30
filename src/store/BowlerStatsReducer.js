
import { ACTION_BALL_PLAYED, BALL_TYPE_REGULAR, BALL_TYPE_WIDE } from './BallResultReducer';

const initialState = {
  // currentBallResult: {
  //   type: 'Regular',
  //   playerRuns: 1,
  //   teamRuns: 2,
  //   extraBall: 0,
  //   out: false,
  // },
  bowlerDetails: [
    {
      name: 'Stuart Broad',
      balls: 0,
      maiden: 0,
      runs: 0,
      wickets: 0,
    },
    {
      name: 'Bumrah',
      balls: 0,
      maiden: 0,
      runs: 0,
      wickets: 0,
    },
  ],
  currentBowler: {
    name: 'Brettlee',
  },
};

const bowlerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_BALL_PLAYED().type: {
      console.log('from bowler stats reducer')
      console.log(action.data);
      const udpatedBowlerDetails = state.bowlerDetails;
      if (action.data.type === BALL_TYPE_REGULAR) {
        if (action.data.currentBowlingBowler) {
          state.bowlerDetails.forEach((element, index) => {
            if (element.name === action.data.currentBowlingBowler) {
              udpatedBowlerDetails[index].balls += 1;
            }
          });
        }
      }
      return { ...state, bowlerDetails: [...udpatedBowlerDetails] };
    }
    default:
      return state;
  }
};

export default bowlerReducer;

