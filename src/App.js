import React from 'react';
import './App.css';
import Countdown from "./components/Countdown/Countdown";
import NewPomodoroForm from "./components/NewPomodoroForm/NewPomodoroForm";
import Clock from "./components/Clock/Clock";

function App() {
    return (
        <div className="App">
            <NewPomodoroForm/>
            <Countdown/>
            <Clock/>
        </div>
    );
}

export default App;
