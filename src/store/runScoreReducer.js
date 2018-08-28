
const initialState = {
  runScore: 0,
  isSelected: 'unselected',
};

export const UpdateCurrentRunScore = runScore => ({
  type: 'CURRENT_RUN_SCORE',
  runScore,
});

export const runScoreAction = () => ({
  type: 'ACTION_RUN_SCORE',
});

const runScoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CURRENT_RUN_SCORE':
      return { ...state, runScore: action.runScore };
    case 'ACTION_RUN_SCORE':
      console.log('this is from reducer');
      return { ...state, isSelected: state.isSelected === 'selected' ? 'unselected' : 'selected' };
    default: return state;
  }
};

export default runScoreReducer;
