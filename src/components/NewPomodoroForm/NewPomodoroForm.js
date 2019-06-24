import React, {useState} from 'react';
import {connect} from "react-redux";
import * as actionTypes from './../../store/actions/actionTypes';

const NewPomodoroForm = (props) => {

    const [time, setTime] = useState(null);

    const formSubmitted = (event) => {
        event.preventDefault();

        console.log(time);

        const minutes = time.substr(0,2);
        const seconds = time.substr(3,2);

        props.onFormSubmitted(minutes * 60 * 1000 + seconds * 1000);
    };

    const inputChanged = (event) => {
        setTime(event.target.value);
    };

    return (
        <div className="NewPomodoroForm">
            <form>
                <input onChange={inputChanged} type="time" />
                <button onClick={formSubmitted}>Start</button>
            </form>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFormSubmitted: (time) => dispatch({
            type: actionTypes.START_NEW_POMODORO,
            time: time
        })
    }
};

export default connect(null, mapDispatchToProps)(NewPomodoroForm);