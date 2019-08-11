import * as actionTypes from './../actions/actionTypes';

const initState = {
  time: null,
  name: null,
  pomodoroFinishedCount: 0,
  nextPomodoroPending: true,
  pomodoroRunning: false
};

const min25 = 25 * 60 * 1000;

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.START_NEW_SET:
      return {
        ...state,
        time: action.time,
        name: action.name,
        pomodoroFinishedCount: 0,
        nextPomodoroPending: false
      };
    case actionTypes.FINISH_POMODORO:
      return {
        ...state,
        pomodoroFinishedCount: state.pomodoroFinishedCount + 1,
        nextPomodoroPending: true,
        pomodoroRunning: false,
      };
    case actionTypes.START_POMODORO:
      return {
        ...state,
        nextPomodoroPending: false,
        time: action.time || state.time || min25,
        pomodoroRunning: true,
      };
    case actionTypes.PAUSE_POMODORO:
      return {
        ...state,
        pomodoroRunning: false
      };
    case actionTypes.RESUME_POMODORO:
      return {
        ...state,
        pomodoroRunning: true
      };
    default:
      return state;
  }
};

export default reducer;