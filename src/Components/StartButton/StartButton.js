import React from 'react';
import classes from './StartButton.css'

const StartButton = (props) => (
    <div onClick={props.onClick} className={classes.StartButton}>{props.children}</div>
)

export default StartButton;