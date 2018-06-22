import React, { Component } from 'react';

const card1 = require("../../assets/cards/school/hoops.png");
const card2 = require("../../assets/cards/school/box.png");
const card3 = require("../../assets/cards/school/balls.png");
const card4 = require("../../assets/cards/school/books.png");
const card5 = require("../../assets/cards/school/jungle-gym.png");
const card6 = require("../../assets/cards/school/markers.png");
const card7 = require("../../assets/cards/school/scissors.png");
const card8 = require("../../assets/cards/school/shelves.png");

class ImagesLoader extends Component {
    render() {
        return (
            <div id="preload" style={{display: "none"}}>
                <img src={card1} />
                <img src={card2} />
                <img src={card3} />
                <img src={card4} />
                <img src={card5} />
                <img src={card6} />
                <img src={card7} />
                <img src={card8} />
            </div>
        );
    }
}

export default ImagesLoader;