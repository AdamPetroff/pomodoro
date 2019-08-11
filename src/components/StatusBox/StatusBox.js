import React from 'react';
import {connect} from "react-redux";
import './StatusBox.css';
import {pausePomodoroAction, resumePomodoroAction, startPomodoroAction} from "../../store/actions/actionTypes";

const StatusBox = (props) => {
    let pomodoroCountEls = [];

    for (let i = 1; i < 5; i++) {
        pomodoroCountEls.push(<div
            className={"StatusBox__pomodoro" + (props.finishedCount >= i ? ' StatusBox__pomodoro--checked' : '')}>{i}</div>);
    }

    const startPomodoro = () => {
        if(props.nextPomodoroPending) {
            props.dispatch(startPomodoroAction());
        } else {
            props.dispatch(resumePomodoroAction());
        }
    };

    const pausePomodoro = () => {
        props.dispatch(pausePomodoroAction());
    };

    let controlButton = <button onClick={startPomodoro}>|></button>;


    if (props.pomodoroRunning) {
        controlButton = <button onClick={pausePomodoro}>II</button>;
    }

    return (
        <div className="StatusBox">
            <h2>{props.name}</h2>
            <div className="StatusBox__pomodoro-count-box">
                {pomodoroCountEls}
            </div>
            {controlButton}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        name: state.name,
        finishedCount: state.pomodoroFinishedCount,
        nextPomodoroPending: state.nextPomodoroPending,
        pomodoroRunning: state.pomodoroRunning
    }
};

export default connect(mapStateToProps)(StatusBox);