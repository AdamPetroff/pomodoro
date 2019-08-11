import React from "react";
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <div className="NavBar">
            <ul>
                <NavLink to="/">Timer</NavLink>
                <NavLink to="/history">History</NavLink>
            </ul>
        </div>
    )
};

export default NavBar;