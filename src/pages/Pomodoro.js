import React from "react"
import NewPomodoroForm from "../components/NewPomodoroForm/NewPomodoroForm";
import Clock from "../components/Clock/Clock";
import StatusBox from "../components/StatusBox/StatusBox";

const Pomodoro = () => {
    return (
        <>
            <NewPomodoroForm/>
            <Clock/>
            <StatusBox/>
        </>
    );
};

export default Pomodoro