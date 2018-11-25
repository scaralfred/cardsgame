import React from 'react';
import classes from './LevelBlock.css'

const LevelBlock = (props) => (
    <div className={props.selected ? classes.LevelSelected : classes.Level} onClick={props.selectLevel}>
        <p style={{ textTransform: "uppercase", fontSize: 40 }}>{props.levelName}</p>
    </div>
);

export default LevelBlock;