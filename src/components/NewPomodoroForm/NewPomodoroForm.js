import React, {useState} from 'react';
import {connect} from "react-redux";
import * as actionTypes from './../../store/actions/actionTypes';
import './NewPomodoroForm.css'

const NewPomodoroForm = (props) => {

    const [time, setTime] = useState(null);

    const formSubmitted = (event) => {
        event.preventDefault();

        const minutes = time.substr(0,2);
        const seconds = time.substr(3,2);

        const pomodoroName = document.getElementById("pomodoro-name-input").value;

        props.onFormSubmitted(minutes * 60 * 1000 + seconds * 1000, pomodoroName);
    };

    const inputChanged = (event) => {
        setTime(event.target.value);
    };

    return (
        <form className="NewPomodoroForm" onSubmit={formSubmitted}>
            <input onChange={inputChanged} type="time" />
            <input type="text" id="pomodoro-name-input" />
            <button>Start</button>
        </form>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFormSubmitted: (time, name) => dispatch({
            type: actionTypes.START_NEW_SET,
            time: time,
            name: name
        })
    }
};

export default connect(null, mapDispatchToProps)(NewPomodoroForm);