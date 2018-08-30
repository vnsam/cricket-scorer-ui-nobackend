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
      name: 'Brettlee',
      balls: 10,
      maiden: 10,
      runs: 10,
      wickets: 2,
    },
    {
      name: 'Bumrah',
      balls: 20,
      maiden: 0,
      runs: 15,
      wickets: 0,
    },
  ],
  currentBowler: {
    name: 'Brettlee',
  },
};

export const ACTION_BALL_PLAYED = () => ({
  type: 'ACTION_BALL_PLAYED',

});

export const bowlerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ACTION_BALL_PLAYED': {
      return state;
      // return { ...state, batsmenDetails: [...state.batsmenDetails] };
    }
    default:
      return state;
  }
};

