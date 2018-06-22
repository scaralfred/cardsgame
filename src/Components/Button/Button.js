import React from 'react';
import classes from './Button.css'

const StartButton = (props) => (
    <div onClick={props.onClick} style={props.style} className={classes.Button}>{props.children}</div>
)

export default StartButton;