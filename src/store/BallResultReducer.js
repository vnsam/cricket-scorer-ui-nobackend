import { ACTION_OVER_COMPLETE } from '../home/actions';

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
    { name: 'Rohit Sharma', out: false, active: true },
    { name: 'Shikhar Dhawan', out: false, active: false },
    { name: 'Virat Kohli', out: false, active: false },
    { name: 'Ajinkya Rahane', out: false, active: false },
    { name: 'Hardik Pandya', out: false, active: false },
    { name: 'MS Dhoni', out: false, active: false },
    { name: 'Kedar Jadhav', out: false, active: false },
    { name: 'Bhuvaneshwar', out: false, active: false },
    { name: 'Kuldeep Yadav', out: false, active: false },
    { name: 'Jasprit Bumra', out: false, active: false },
    { name: 'Chahal', out: false, active: false },
  ],
  team2: [
    { name: 'Stuart Broad', out: false, active: false },
    { name: 'James Anderson', out: false, active: false },
    { name: 'Moeen Ali', out: false, active: false },
    { name: 'Adil Rashid', out: false, active: false },
    { name: 'Sam Curran', out: false, active: false },
    { name: 'Stuart Broad', out: false, active: false },
    { name: 'James Anderson', out: false, active: false },
    { name: 'Moeen Ali', out: false, active: false },
    { name: 'Adil Rashid', out: false, active: false },
    { name: 'Sam Curran', out: false, active: false },
    { name: 'Stuart Broad', out: false, active: false },
  ],
};

const initialState = {
  runSelected: -1,
  extrasSelected: '',
  outSelected: false,
  currentPlayingBatsmen: {
    onStrikeBatsman: {
      name: gameState.team1[0].name,
      active: true,
    },
    offStrikeBatsman: {
      name: gameState.team1[1].name,
      active: false,
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
      //   console.log("ACTION_BALL_PLAYED");
      //   console.log(action.data);
      const udpatedState = { ...initialState };
      const { onStrikeBatsman, offStrikeBatsman } = state.currentPlayingBatsmen;
      let outBatsman;
      let inCreaseBatsman;
      if (onStrikeBatsman.active) {
        outBatsman = onStrikeBatsman.name;
        inCreaseBatsman = offStrikeBatsman.name;
      } else {
        outBatsman = offStrikeBatsman.name;
        inCreaseBatsman = onStrikeBatsman.name;
      }

      //  console.log("data");
      //  console.log(action.data);

      if (action.data.out) {
        const udpatedGameState = markOutAndGetNextBatsman({
          players: gameState.team1,
          outBatsmanName: outBatsman,
          playingBatsmanName: inCreaseBatsman,
        });

        gameState.team1 = udpatedGameState.players;
        if (onStrikeBatsman.active) {
          udpatedState.currentPlayingBatsmen.onStrikeBatsman.name = udpatedGameState.nextBatsman;
        } else {
          udpatedState.currentPlayingBatsmen.offStrikeBatsman.name = udpatedGameState.nextBatsman;
        }
      }

      let runs = ((action.data.type === BALL_TYPE_WIDE)
        || (action.data.type === BALL_TYPE_BYE)
        || (action.data.type === BALL_TYPE_LEG_BYE)) ?
        action.data.teamRuns : action.data.playerRuns;
      runs = (action.data.type === BALL_TYPE_WIDE) ? runs - 1 : runs;
      if (runs % 2 !== 0) {
        udpatedState.currentPlayingBatsmen.onStrikeBatsman.active =
          !udpatedState.currentPlayingBatsmen.onStrikeBatsman.active;
        udpatedState.currentPlayingBatsmen.offStrikeBatsman.active =
          !udpatedState.currentPlayingBatsmen.offStrikeBatsman.active;
      }
      return udpatedState;
    }
    case ACTION_OVER_COMPLETE().type:
    {
      const newState = state.currentPlayingBatsmen;
      newState.onStrikeBatsman.active = !newState.onStrikeBatsman.active;
      newState.offStrikeBatsman.active = !newState.offStrikeBatsman.active;
      return { ...state, currentPlayingBatsmen: newState };
    }
    default:
      return state;
  }
};
