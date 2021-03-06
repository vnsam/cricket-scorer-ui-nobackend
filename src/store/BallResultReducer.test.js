import {
  BALL_TYPE_WIDE,
  BALL_TYPE_NO_BALL,
  BALL_TYPE_BYE,
  BALL_TYPE_LEG_BYE,
  ACTION_RUN,
  ACTION_EXTRAS,
  BallResultReducer,
  evaluateBallResult, BALL_TYPE_REGULAR, ACTION_OUT, ACTION_BALL_PLAYED, gameState,
} from './BallResultReducer';

describe('BallResultReducer', () => {
  it('should return initial state of all extras unselected', () => {
    const initialState = {
      runSelected: -1,
      extrasSelected: '',
      outSelected: false,
    };

    const updatedState = BallResultReducer(undefined, {});
    expect(updatedState.runSelected).toEqual(initialState.runSelected);
    expect(updatedState.extrasSelected).toEqual(initialState.extrasSelected);
    expect(updatedState.outSelected).toEqual(initialState.outSelected);
  });

  it('should return wide when wide is selected', () => {
    const initialState = {
      runSelected: -1,
      extrasSelected: '',
      outSelected: false,
    };
    const expectedState = {
      runSelected: -1,
      extrasSelected: BALL_TYPE_WIDE,
      outSelected: false,
    };

    const result = BallResultReducer(
      initialState,
      ACTION_EXTRAS(BALL_TYPE_WIDE),
    );
    expect(result.runSelected).toEqual(expectedState.runSelected);
    expect(result.extrasSelected).toEqual(expectedState.extrasSelected);
    expect(result.outSelected).toEqual(expectedState.outSelected);
  });

  it('should return no ball when noball is selected', () => {
    expect(BallResultReducer(
      undefined,
      ACTION_EXTRAS(BALL_TYPE_NO_BALL),
    ).extrasSelected).toEqual(BALL_TYPE_NO_BALL);
  });

  it('should return the given selected run in action', () => {
    expect(BallResultReducer(undefined, ACTION_RUN('2')).runSelected).toEqual(2);
  });

  it('should toggle the run in action', () => {
    expect(BallResultReducer(BallResultReducer(undefined, ACTION_RUN('2')), ACTION_RUN('2')).runSelected).toEqual(-1);
  });

  it('should return out on out', () => {
    expect(BallResultReducer(undefined, ACTION_OUT).outSelected).toEqual(true);
  });

  it('should toggle  out', () => {
    expect(BallResultReducer(BallResultReducer(undefined, ACTION_OUT), ACTION_OUT).outSelected)
      .toEqual(false);
  });

  const getInitialStateWithPlayer = (player1, player2, player1ActiveState, player2ActiveState) => ({
    runSelected: -1,
    extrasSelected: '',
    outSelected: false,
    currentPlayingBatsmen: {
      onStrikeBatsman: {
        name: player1,
        active: player1ActiveState,
      },
      offStrikeBatsman: {
        name: player2,
        active: player2ActiveState,
      },
    },

  });

  it('should not change player on next ball when not out', () => {
    const defaultBall = {
      type: BALL_TYPE_REGULAR,
      playerRuns: 0,
      teamRuns: 0,
      extraBall: 0,
      out: false,
    };
    const initialState = getInitialStateWithPlayer(
      gameState.team1[0].name,
      gameState.team1[1].name,
      gameState.team1[0].active,
      gameState.team1[1].active,
    );
    const result = BallResultReducer(undefined, ACTION_BALL_PLAYED(defaultBall));
    expect(result.runSelected).toEqual(initialState.runSelected);
    expect(result.extrasSelected).toEqual(initialState.extrasSelected);
    expect(result.outSelected).toEqual(initialState.outSelected);
    expect(result.currentPlayingBatsmen).toEqual(initialState.currentPlayingBatsmen);
  });

  it('should change player on next ball when out', () => {
    const defaultBall = {
      type: BALL_TYPE_REGULAR,
      playerRuns: 1,
      teamRuns: 0,
      extraBall: 0,
      out: true,
      onStrikeBatsman: gameState.team1[0].name,
    };
    const initialState = getInitialStateWithPlayer(
      gameState.team1[2].name,
      gameState.team1[1].name,
      !gameState.team1[0].active,
      !gameState.team1[1].active,
    );
    const result = BallResultReducer(undefined, ACTION_BALL_PLAYED(defaultBall));
    expect(result.currentPlayingBatsmen).toEqual(initialState.currentPlayingBatsmen);
  });

  // it('should change two players one after other on two wickets', () => {
  //   const defaultBall = {
  //     type: BALL_TYPE_REGULAR,
  //     playerRuns: 0,
  //     teamRuns: 0,
  //     extraBall: 0,
  //     out: true,
  //     onStrikeBatsman: gameState.team1[0].name,
  //   };
  //   const initialState = getInitialStateWithPlayer(
  //     gameState.team1[3].name,
  //     gameState.team1[1].name,
  //     gameState.team1[3].active,
  //     !gameState.team1[1].active,
  //   );
  //   let result = BallResultReducer(undefined, ACTION_BALL_PLAYED(defaultBall));
  //   defaultBall.onStrikeBatsman = result.currentPlayingBatsmen.onStrikeBatsman.name;
  //   result = BallResultReducer(result, ACTION_BALL_PLAYED(defaultBall));
  //   expect(result.currentPlayingBatsmen).toEqual(initialState.currentPlayingBatsmen);
  // });

  // it('should change two players and should change active batsmen on odd runs', () => {
  //   const defaultBall = {
  //     type: BALL_TYPE_REGULAR,
  //     playerRuns: 1,
  //     teamRuns: 0,
  //     extraBall: 0,
  //     out: true,
  //     onStrikeBatsman: gameState.team1[0].name,
  //   };
  //   const initialState = getInitialStateWithPlayer(
  //     gameState.team1[3].name,
  //     gameState.team1[1].name,
  //     !gameState.team1[3].active,
  //     gameState.team1[1].active,
  //   );
  //   const result = BallResultReducer(undefined, ACTION_BALL_PLAYED(defaultBall));
  //   expect(result.currentPlayingBatsmen).toEqual(initialState.currentPlayingBatsmen);
  // });
});


describe('evaluateBallResult', () => {
  it('should return initial state', () => {
    const defaultBall = {
      type: BALL_TYPE_REGULAR,
      playerRuns: 0,
      teamRuns: 0,
      extraBall: 0,
      out: false,
    };

    expect(evaluateBallResult({})).toEqual(defaultBall);
  });

  it('should return 1 team run, 1 Player Run , 0 extra ball for 1 Run selected and No extra selected  ', () => {
    const regularBallState = {
      type: BALL_TYPE_REGULAR,
      playerRuns: 1,
      teamRuns: 1,
      extraBall: 0,
      out: false,
    };

    const data = {
      runSelected: 1,
      extrasSelected: '',
    };

    expect(evaluateBallResult(data)).toEqual(regularBallState);
  });

  it('should return 1 team run, 0 Player Run , 1 extra ball for wide and 0 Run Selected ', () => {
    const wideState = {
      type: BALL_TYPE_WIDE,
      playerRuns: 0,
      teamRuns: 1,
      extraBall: 1,
      out: false,
    };

    const data = {
      runSelected: 0,
      extrasSelected: BALL_TYPE_WIDE,
    };

    expect(evaluateBallResult(data)).toEqual(wideState);
  });

  it('should return 5 team run, 0 Player Run , 1 extra ball for wide and 4 Run Selected ', () => {
    const wideState = {
      type: BALL_TYPE_WIDE,
      playerRuns: 0,
      teamRuns: 5,
      extraBall: 1,
      out: false,
    };

    const data = {
      runSelected: 4,
      extrasSelected: BALL_TYPE_WIDE,
    };

    expect(evaluateBallResult(data)).toEqual(wideState);
  });

  it('should return 1 team run, 0 Player Run , 1 extra ball for No Ball and 0 Run Selected ', () => {
    const noBallState = {
      type: BALL_TYPE_NO_BALL,
      playerRuns: 0,
      teamRuns: 1,
      extraBall: 1,
      out: false,
    };

    const data = {
      runSelected: 0,
      extrasSelected: BALL_TYPE_NO_BALL,
    };

    expect(evaluateBallResult(data)).toEqual(noBallState);
  });

  it('should return 5 team run, 4 Player Run , 1 extra ball for No Ball and 4 Run Selected ', () => {
    const noBallState = {
      type: BALL_TYPE_NO_BALL,
      playerRuns: 4,
      teamRuns: 5,
      extraBall: 1,
      out: false,
    };

    const data = {
      runSelected: 4,
      extrasSelected: BALL_TYPE_NO_BALL,
    };

    expect(evaluateBallResult(data)).toEqual(noBallState);
  });

  it('should return 4 team run, 0 Player Run , 0 extra ball for Bye and 4 Run Selected ', () => {
    const byeState = {
      type: BALL_TYPE_BYE,
      playerRuns: 0,
      teamRuns: 4,
      extraBall: 0,
      out: false,
    };

    const data = {
      runSelected: 4,
      extrasSelected: BALL_TYPE_BYE,
    };

    expect(evaluateBallResult(data)).toEqual(byeState);
  });

  it('should return 4 team run, 0 Player Run , 0 extra ball for Leg Bye and 4 Run Selected ', () => {
    const legByeState = {
      type: BALL_TYPE_LEG_BYE,
      playerRuns: 0,
      teamRuns: 4,
      extraBall: 0,
      out: false,
    };

    const data = {
      runSelected: 4,
      extrasSelected: BALL_TYPE_LEG_BYE,
    };

    expect(evaluateBallResult(data)).toEqual(legByeState);
  });

  it('should return 0 team run, 0 Player Run , 0 extra ball when player is out', () => {
    const playerOutState = {
      type: BALL_TYPE_REGULAR,
      playerRuns: 0,
      teamRuns: 0,
      extraBall: 0,
      out: true,
    };

    const data = {
      runSelected: 0,
      extrasSelected: '',
      outSelected: true,
    };

    expect(evaluateBallResult(data)).toEqual(playerOutState);
  });

  it('should return 3 team run, 3 Player Run , 0 extra ball when player is out', () => {
    const playerOutState = {
      type: BALL_TYPE_REGULAR,
      playerRuns: 3,
      teamRuns: 3,
      extraBall: 0,
      out: true,
    };

    const data = {
      runSelected: 3,
      extrasSelected: '',
      outSelected: true,
    };

    expect(evaluateBallResult(data)).toEqual(playerOutState);
  });
});

// describe('BallResultReducer', () => {

//   const initialState = () => ({
//     runSelected: -1,
//     extrasSelected: '',
//     outSelected: false,
//     currentPlayingBatsmen: {
//       onStrikeBatsman: {
//         name: gameState.team1[0].name,
//         active: true,
//       },
//       offStrikeBatsman: {
//         name: gameState.team1[1].name,
//         active: false,
//       },
//     },
//   });

//   const getInitialStateWithPlayer =
// (player1, player2, player1ActiveState, player2ActiveState) => ({
//     runSelected: -1,
//     extrasSelected: '',
//     outSelected: false,
//     currentPlayingBatsmen: {
//       onStrikeBatsman: {
//         name: player1,
//         active: player1ActiveState,
//       },
//       offStrikeBatsman: {
//         name: player2,
//         active: player2ActiveState,
//       },
//     },
//   });

//   it('should not rotate
// strike on even runs when batsman is not out and over is incomplete', () => {
//     const ballState = {
//       type: BALL_TYPE_REGULAR,
//       playerRuns: 0,
//       teamRuns: 0,
//       extraBall: 0,
//       out: false,
//     };

//     const expectedState = getInitialStateWithPlayer(
//       gameState.team1[0].name,
//       gameState.team1[1].name,
//       true,
//       false,
//     );

//     console.log(initialState());

//     const updatedState = BallResultReducer(initialState(), ACTION_BALL_PLAYED(ballState));
//     console.log(updatedState);
//     expect(updatedState.currentPlayingBatsmen).toEqual(expectedState.currentPlayingBatsmen);
//   });
// });
