import * as actionTypes from './../actions/actionTypes';

const initState = {
    time: null
};

const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.START_NEW_POMODORO: return {
                ...state,
                time: action.time
            };
        default: return state;
    }
};

export default reducer;