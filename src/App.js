import React from 'react';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import {Route, Switch} from "react-router";
import Pomodoro from "./pages/Pomodoro";

function App() {
    return (
        <div className="App">
            <NavBar/>
            <Switch>
                <Route path="/" component={Pomodoro} />
            </Switch>
        </div>
    );
}

export default App;
