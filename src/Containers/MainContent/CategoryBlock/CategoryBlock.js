import React from 'react'; 
import classes from './CategoryBlock.css'

const CategoryBlock = (props) => (
    <div className={props.selected ? classes.CategorySelected : classes.Category} onClick={props.selectCategory}>
        <p style={{ textTransform: "uppercase" }}>{props.children ? props.children : props.categoryName}</p>
        <img 
        alt={props.categoryName}
        src={require(`../../../assets/units/unit-${props.categoryName}.jpg`)} 
        style={{resizeMode: "contain", width: 50}} 
        />
    </div>
);

export default CategoryBlock;