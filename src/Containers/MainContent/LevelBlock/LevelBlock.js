import React from 'react';
import classes from './LevelBlock.css'

const LevelBlock = (props) => (
    <div className={props.selected ? classes.LevelSelected : classes.Level} onClick={props.selectLevel}>
        <p style={{ textTransform: "uppercase", fontSize: 40 }}>{props.levelName}</p>
        {/* <img
            alt={props.categoryName}
            src={require(`../../../assets/units/unit-${props.categoryName}.jpg`)}
            style={{ resizeMode: "contain", width: 50 }}
        /> */}
    </div>
);

export default LevelBlock;