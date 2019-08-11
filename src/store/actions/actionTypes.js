export const START_NEW_SET = 'START_NEW_SET';
export const START_POMODORO = 'START_POMODORO';
export const FINISH_POMODORO = 'FINISH_POMODORO';
export const PAUSE_POMODORO = 'PAUSE_POMODORO';
export const RESUME_POMODORO = 'RESUME_POMODORO';

export const finishPomodoroAction = () => {
  return {
    type: FINISH_POMODORO
  }
};

export const startPomodoroAction = (time) => {
  return {
    type: START_POMODORO,
    time: time,
  }
};

export const pausePomodoroAction = () => {
  return {
    type: PAUSE_POMODORO
  }
};

export const resumePomodoroAction = () => {
  return {
    type: RESUME_POMODORO
  }
};
