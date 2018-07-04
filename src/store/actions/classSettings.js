import * as actionTypes from './actionTypes';

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

export const addClass = (className) => {
    return {
        type: actionTypes.ADD_CLASS,
        className
    }
};

export const removeClass = (className) => {
    return {
        type: actionTypes.REMOVE_CLASS,
        className
    }
};

export const addPlayer = (playerName, className) => {
    return {
        type: actionTypes.ADD_PLAYER,
        playerName,
        className
    }
};

export const removePlayer = (playerName, className) => {
    return {
        type: actionTypes.REMOVE_PLAYER,
        playerName,
        className
    }
};

export const uploadPhoto = (className, playerName, fileURL) => {
    return {
        type: actionTypes.UPLOAD_PHOTO,
        className,
        playerName,
        fileURL
    }
};

export const removePhoto = (className, playerName) => {
    return {
        type: actionTypes.REMOVE_PHOTO,
        className,
        playerName
    }
};

export const imageVisible = (className, playerName) => {
    return {
        type: actionTypes.IMAGE_VISIBLE,
        className,
        playerName
    }
};

export const retrieveState = (newState) => {
    return {
        type: actionTypes.RETRIEVE_STATE,
        newState
    }
}
