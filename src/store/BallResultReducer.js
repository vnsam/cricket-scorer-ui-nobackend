export const BALL_TYPE_REGULAR = 'R';
export const BALL_TYPE_WIDE = 'Wd';
export const BALL_TYPE_NO_BALL = 'Nb';
export const BALL_TYPE_BYE = 'B';
export const BALL_TYPE_LEG_BYE = 'Lb';
export const WICKET = 'W';

export const ACTION_BALL_PLAYED = data => ({
  type: 'BALL_PLAYED',
  data,
});

export const ACTION_EXTRAS = name => ({
  type: 'EXTRAS',
  data: name,
});

export const ACTION_RUN = runs => ({
  type: 'RUN',
  data: parseInt(runs, 10),
});

export const ACTION_OUT = {
  type: 'OUT',
};

export const gameState = {
  team1: [
    { name: 'Rohit Sharma', out: false },
    { name: 'Shikhar Dhawan', out: false },
    { name: 'Virat Kohli', out: false },
    { name: 'Ajinkya Rahane', out: false },
    { name: 'Hardik Pandya', out: false },
    { name: 'MS Dhoni', out: false },
    { name: 'Kedar Jadhav', out: false },
    { name: 'Bhuvaneshwar', out: false },
    { name: 'Kuldeep Yadav', out: false },
    { name: 'Jasprit Bumra', out: false },
    { name: 'Chahal', out: false },
  ],
  team2: [
    { name: 'Stuart Broad', out: false },
    { name: 'James Anderson', out: false },
    { name: 'Moeen Ali', out: false },
    { name: 'Adil Rashid', out: false },
    { name: 'Sam Curran', out: false },
    { name: 'Stuart Broad', out: false },
    { name: 'James Anderson', out: false },
    { name: 'Moeen Ali', out: false },
    { name: 'Adil Rashid', out: false },
    { name: 'Sam Curran', out: false },
    { name: 'Stuart Broad', out: false },
  ],

};

const initialState = {
  runSelected: -1,
  extrasSelected: '',
  outSelected: false,
  currentPlayingBatsmen: {
    onStrikeBatsman: {
      name: gameState.team1[0].name,
    },
    offStrikeBatsman: {
      name: gameState.team1[1].name,
    },
  },
};

const markOutAndGetNextBatsman = (teamState) => {
  const result = { ...teamState };
  for (let i = 0; i < teamState.players.length; i += 1) {
    if (teamState.players[i].name === teamState.outBatsmanName) {
      result.players[i].out = true;
    }
    if (!result.players[i].out && result.players[i].name !== teamState.playingBatsmanName) {
      result.nextBatsman = result.players[i].name;
      break;
    }
  }
  return result;
};

export const evaluateBallResult = (ballInput) => {
  const ballResult = {
    type: ballInput.extrasSelected ? ballInput.extrasSelected : BALL_TYPE_REGULAR,
    extraBall: 0,
    teamRuns: 0,
    playerRuns: 0,
    out: false,
  };

  switch (ballInput.extrasSelected) {
    case BALL_TYPE_WIDE:
      ballResult.extraBall = 1;
      ballResult.teamRuns = ballInput.runSelected + 1;
      break;
    case BALL_TYPE_NO_BALL:
      ballResult.extraBall = 1;
      ballResult.playerRuns = ballInput.runSelected;
      ballResult.teamRuns = ballResult.playerRuns + ballResult.extraBall;
      break;
    case BALL_TYPE_BYE:
    case BALL_TYPE_LEG_BYE:
      ballResult.teamRuns = ballInput.runSelected;
      break;
    default:
      ballResult.playerRuns = ballInput.runSelected ? ballInput.runSelected : 0;
      ballResult.teamRuns = ballResult.playerRuns;
  }
  ballResult.out = ballInput.outSelected === true;
  return ballResult;
};


export const BallResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'EXTRAS':
      return {
        ...state,
        extrasSelected: action.data === state.extrasSelected ? '' : action.data,
        runSelected: state.runSelected,
      };
    case 'RUN':
      return { ...state, runSelected: state.runSelected === action.data ? -1 : action.data };
    case ACTION_OUT.type:
      return {
        ...state, outSelected: !state.outSelected,
      };
    case ACTION_BALL_PLAYED().type: {
      const udpatedState = { ...initialState };
      if (action.data.out) {
        const udpatedGameState = markOutAndGetNextBatsman({
          players: gameState.team1,
          outBatsmanName: action.data.onStrikeBatsman,
          playingBatsmanName: state.currentPlayingBatsmen.offStrikeBatsman.name,
        });
        gameState.team1 = udpatedGameState.players;
        udpatedState.currentPlayingBatsmen.onStrikeBatsman.name = udpatedGameState.nextBatsman;
      }
      return udpatedState;
    }
    default:
      return state;
  }
};
