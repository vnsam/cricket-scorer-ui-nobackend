import { UpdateCurrentRunScore, runScoreReducer } from '../store/runScoreReducer';

describe('runScoreReducer', () => {
  it('should return run value as 0', () => {
    const updateState = {
      runScore: 0,
    };
    expect(runScoreReducer(undefined, {})).toEqual(updateState);
  });
});

describe('runScoreReducer', () => {
  it('should return run value as 1', () => {
    const updateState = {
      runScore: 1,
    };
    expect(runScoreReducer(undefined, UpdateCurrentRunScore(1))).toEqual(updateState);
  });
});

describe('runScoreReducer', () => {
  it('should return run value as 2', () => {
    const updateState = {
      runScore: 2,
    };
    expect(runScoreReducer(undefined, UpdateCurrentRunScore(2))).toEqual(updateState);
  });
});
