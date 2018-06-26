import * as actionTypes from './actionTypes';

export const addCategory = (name) => {
    return {
        type: actionTypes.ADD_CATEGORY,
        categoryName: name
    }
};

export const removeCategory = (name) => {
    return {
        type: actionTypes.REMOVE_CATEGORY,
        categoryName: name
    }
};

export const addLevel = (level) => {
    return {
        type: actionTypes.ADD_LEVEL,
        levelName: level
    }
};

export const addStar = () => {
    return {
        type: actionTypes.ADD_STAR
    }
};

export const removeStar = () => {
    return {
        type: actionTypes.REMOVE_STAR
    }
};

export const resetStars = () => {
    return {
        type: actionTypes.RESET_STARS
    }
};

export const memoryGame = () => {
    return {
        type: actionTypes.MEMORY_GAME
    }
};

export const whatsMissing = () => {
    return {
        type: actionTypes.WHATS_MISSING
    }
};
