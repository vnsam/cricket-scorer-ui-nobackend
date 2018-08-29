const initialState = {
  currentBallResult: {
    type: 'Regular',
    playerRuns: 1,
    teamRuns: 2,
    extraBall: 0,
    out: false,
  },
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

export const ACTION_BALL_PLAYED = () => ({
  type: 'ACTION_BALL_PLAYED',

});

function calculateBatsmenStats(state, currentBatsmenDetails) {
  const currentBallResult = state.currentBallResult;
  const batsmenStats = {};
  batsmenStats.name = currentBatsmenDetails.name;
  batsmenStats.runs = currentBatsmenDetails.runs + currentBallResult.playerRuns;
  batsmenStats.balls = currentBatsmenDetails.balls + 1;
  batsmenStats.sixes = currentBatsmenDetails.sixes;
  batsmenStats.fours = currentBatsmenDetails.fours;
  if (currentBallResult.playerRuns === 6) {
    batsmenStats.sixes = currentBatsmenDetails.sixes + 1;
  } else if (currentBallResult.playerRuns >= 4) {
    batsmenStats.fours = currentBatsmenDetails.fours + 1;
  }
  batsmenStats.strikeRate = Math.floor(((batsmenStats.runs / batsmenStats.balls) * 100));
  console.log('calculate fun');
  console.log(batsmenStats);
  return batsmenStats;
}

function addNewBatsmenToBatsmenStats(state) {
  const batsmenStats = {};
  batsmenStats.name = state.currentPlayingBatsmen.onStrikeBatsmen.name;
  batsmenStats.runs = state.currentBallResult.playerRuns;
  batsmenStats.balls = 1;
  batsmenStats.sixes = 0;
  batsmenStats.fours = 0;
  if (state.currentBallResult.playerRuns === 6) {
    batsmenStats.sixes = 1;
  } else if (state.currentBallResult.playerRuns >= 4) {
    batsmenStats.fours = 1;
  }
  batsmenStats.strikeRate = Math.floor(((batsmenStats.runs / batsmenStats.balls) * 100));
  return batsmenStats;
}


function assignStarToCurrentlyPlayingBatsmen(state) {
  state.batsmenDetails.forEach((element) => {
    element.name = element.name.replace('*', '');
    if (element.name === state.currentPlayingBatsmen.onStrikeBatsmen.name ||
        element.name === state.currentPlayingBatsmen.offStrikeBatsmen.name) {
      element.name += '*';
    }
  });

  console.log('astric fun');
  console.log(state);
  return state;
}

export const batsmanReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ACTION_BALL_PLAYED': {
      let currentBatsmenstats = null;
      let stateTemp = state;
      if (state.currentBallResult.type === 'Regular') {
        let i;
        for (i = 0; i < state.batsmenDetails.length; i += 1) {
          const element = state.batsmenDetails[i];
          element.name = element.name.replace('*', '');
          if (element.name === stateTemp.currentPlayingBatsmen.onStrikeBatsmen.name) {
            console.log('batsman name ', element.name);
            console.log('onstrike batsman name ', stateTemp.currentPlayingBatsmen.onStrikeBatsmen.name);
            console.log('from reducer: if is passing');
            currentBatsmenstats = calculateBatsmenStats(stateTemp, element);
            state.batsmenDetails[i].name = currentBatsmenstats.name;
            state.batsmenDetails[i].balls = currentBatsmenstats.balls;
            state.batsmenDetails[i].runs = currentBatsmenstats.runs;
            state.batsmenDetails[i].fours = currentBatsmenstats.fours;
            state.batsmenDetails[i].sixes = currentBatsmenstats.sixes;
            state.batsmenDetails[i].strikeRate = currentBatsmenstats.strikeRate;
          }
        }
        if (currentBatsmenstats === null) {
          state.batsmenDetails.push(addNewBatsmenToBatsmenStats(stateTemp));
          console.log('from reducer: else is passing');
        }
        console.log('from tempbatsmen');
        console.log(state.batsmenDetails);
        stateTemp = assignStarToCurrentlyPlayingBatsmen(stateTemp);
      }
      return { ...state, batsmenDetails: [...state.batsmenDetails] };
    }
    default:
      return state;
  }
};

