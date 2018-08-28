const ACTION_BALL_PLAYED = {
  type: 'ACTION_BALL_PLAYED',
};

const ACTION_EXTRAS = name => ({
  type: 'EXTRAS',
  data: name,
});

const ACTION_RUN = runs => ({
  type: 'RUN',
  data: runs,
});

const initialState = {
  runSelected: -1,
  extrasSelected: '',
};

const BallPlayedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'EXTRAS':
      return { ...state, extrasSelected: action.data };
    case 'RUN':
      return { ...state, runSelected: action.data };
    default:
      return state;
  }
};
export { BallPlayedReducer, ACTION_RUN, ACTION_EXTRAS, ACTION_BALL_PLAYED };
