import { ACTION_BYE, ACTION_LEG_BYE, ACTION_NO_BALL, ACTION_WIDE, ExtrasReducer } from './ExtrasReducer';

describe('ExtrasReducer', () => {
  it('should return initial state of all extras unselected', () => {
    const initialState = {
      wideSelected: false,
      noBallSelected: false,
      byeSelected: false,
      legByeSelected: false,
    };
    expect(ExtrasReducer(undefined, {})).toEqual(initialState);
  });

  it('should toggle wide when wide in extras is selected', () => {
    expect(ExtrasReducer(undefined, ACTION_WIDE).wideSelected).toEqual(true);
  });

  it('should toggle noBall when noBall in extras is selected', () => {
    expect(ExtrasReducer(undefined, ACTION_NO_BALL).noBallSelected).toEqual(true);
  });

  it('should toggle bye when bye in extras is selected', () => {
    expect(ExtrasReducer(undefined, ACTION_BYE).byeSelected).toEqual(true);
  });

  it('should toggle legBye when noBall in legBye is selected', () => {
    expect(ExtrasReducer(undefined, ACTION_LEG_BYE).legByeSelected).toEqual(true);
  });
});

