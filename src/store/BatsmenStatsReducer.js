const initialState = {
  // currentBallResult: {
  //   type: 'Regular',
  //   playerRuns: 1,
  //   teamRuns: 2,
  //   extraBall: 0,
  //   out: false,
  // },
  batsmenDetails: [
    {
      name: 'sachin',
      runs: 25,
      balls: 15,
      fours: 2,
      sixes: 2,
      strikeRate: 56,
    },
    {
      name: 'sehwag',
      runs: 25,
      balls: 15,
      fours: 4,
      sixes: 4,
      strikeRate: 56,
    },
    {
      name: 'dravid',
      runs: 16,
      balls: 20,
      fours: 9,
      sixes: 6,
      strikeRate: 56,
    },
  ],
  currentPlayingBatsmen: {
    onStrikeBatsmen: {
      name: 'dravid',
    },
    offStrikeBatsmen: {
      name: 'sachin',
    },
  },
};


function calculateBatsmenStats(action, currentBatsmenDetails) {
  const batsmenStats = {};
  batsmenStats.name = currentBatsmenDetails.name;
  batsmenStats.runs = currentBatsmenDetails.runs + action.ballResult.playerRuns;
  batsmenStats.balls = currentBatsmenDetails.balls + 1;
  batsmenStats.sixes = currentBatsmenDetails.sixes;
  batsmenStats.fours = currentBatsmenDetails.fours;
  if (action.ballResult.playerRuns === 6) {
    batsmenStats.sixes = currentBatsmenDetails.sixes + 1;
  } else if (action.ballResult.playerRuns >= 4) {
    batsmenStats.fours = currentBatsmenDetails.fours + 1;
  }
  batsmenStats.strikeRate = Math.floor(((batsmenStats.runs / batsmenStats.balls) * 100));
  console.log('calculate fun');
  console.log(batsmenStats);
  return batsmenStats;
}

function addNewBatsmenToBatsmenStats(state, action) {
  const batsmenStats = {};
  batsmenStats.name = state.currentPlayingBatsmen.onStrikeBatsmen.name;
  batsmenStats.runs = action.ballResult.playerRuns;
  batsmenStats.balls = 1;
  batsmenStats.sixes = 0;
  batsmenStats.fours = 0;
  if (action.ballResult.playerRuns === 6) {
    batsmenStats.sixes = 1;
  } else if (action.ballResult.playerRuns >= 4) {
    batsmenStats.fours = 1;
  }
  batsmenStats.strikeRate = Math.floor(((batsmenStats.runs / batsmenStats.balls) * 100));
  return batsmenStats;
}


function assignStarToCurrentlyPlayingBatsmen(state, batsmanModifiedDetails) {
  const batsmanModifiedDetailsWithAsterisk = [];
  batsmanModifiedDetails.forEach((element) => {
    const modifiedElement = Object.assign({}, element);
    modifiedElement.name = element.name.replace('*', '');
    if (element.name === state.currentPlayingBatsmen.onStrikeBatsmen.name ||
      element.name === state.currentPlayingBatsmen.offStrikeBatsmen.name) {
      modifiedElement.name += '*';
    }
    batsmanModifiedDetailsWithAsterisk.push(modifiedElement);
  });

  console.log('astric fun');
  console.log(batsmanModifiedDetailsWithAsterisk);
  return batsmanModifiedDetailsWithAsterisk;
}

const batsmanReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ACTION_BALL_PLAYED': {
      let currentBatsmenstats = null;

      const batsmanModifiedDetails = Object.assign([], state.batsmenDetails);
      let batsmanModifiedDetailsWithAsterisk = batsmanModifiedDetails;
      if (action.ballResult.type.match(/Regular/i)) {
        let i;
        for (i = 0; i < batsmanModifiedDetails.length; i += 1) {
          const element = batsmanModifiedDetails[i];
          element.name = element.name.replace('*', '');
          if (element.name === state.currentPlayingBatsmen.onStrikeBatsmen.name) {
            console.log('batsman name ', element.name);
            console.log('onstrike batsman name ', state.currentPlayingBatsmen.onStrikeBatsmen.name);
            console.log('from reducer: if is passing');
            currentBatsmenstats = calculateBatsmenStats(action, element);
            batsmanModifiedDetails[i].name = currentBatsmenstats.name;
            batsmanModifiedDetails[i].balls = currentBatsmenstats.balls;
            batsmanModifiedDetails[i].runs = currentBatsmenstats.runs;
            batsmanModifiedDetails[i].fours = currentBatsmenstats.fours;
            batsmanModifiedDetails[i].sixes = currentBatsmenstats.sixes;
            batsmanModifiedDetails[i].strikeRate = currentBatsmenstats.strikeRate;
          }
        }
        if (currentBatsmenstats === null) {
          batsmanModifiedDetails.push(addNewBatsmenToBatsmenStats(state, action));
          console.log('from reducer: else is passing');
        }
        console.log('from tempbatsmen');
        console.log(batsmanModifiedDetails);
        batsmanModifiedDetailsWithAsterisk =
         assignStarToCurrentlyPlayingBatsmen(state, batsmanModifiedDetails);
      }
      return { ...state, batsmenDetails: [...batsmanModifiedDetailsWithAsterisk] };
    }
    default:
      return state;
  }
};

export default batsmanReducer;

