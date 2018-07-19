import React, { Component } from 'react';
import classes from './SelectList.css';

class SelectList extends Component {

    componentWillMount(){
        return this.props.defaultValue ? this.props.defaultValue() : null;
    }

    render() {

        const options = (
            this.props.data !== undefined ?
            this.props.data.map((el, i) => {
                return <option key={el + i} value={el}>{el}</option>
            })
            : null
        )

        return(
            <div>
                {this.props.data !== undefined && this.props.data.length > 0 ?
                    <select className={classes.SelectList} value={this.props.value} onChange={(event) => this.props.onChange(event)}>
                        {options}
                    </select>
                    : null
                }
            </div>
        )
    }
};

export default SelectList;