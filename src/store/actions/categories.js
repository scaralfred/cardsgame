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

export const clearCategories = () => {
    return {
        type: actionTypes.CLEAR_CATEGORIES
    }
};

export const addLevel = (level) => {
    return {
        type: actionTypes.ADD_LEVEL,
        levelName: level
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
