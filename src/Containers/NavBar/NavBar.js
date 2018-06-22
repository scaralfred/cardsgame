import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './NavBar.css';

class NavBar extends Component {
    render() {
        return (
        <div className={classes.NavBar}>
                <div style={{display: "flex", flex: 1 }}>
                    <Link to="/" className={classes.NavBarLink} active="true">Home</Link>
                </div>
                <div style={{ display: "flex" }}>
                    <Link to="/login" className={classes.NavBarLink} active="true">Login</Link>
                    <Link to="/login" className={classes.NavBarLink} active="true">Logout</Link>
                </div>
            
        </div>
        )
    }
};

export default NavBar;