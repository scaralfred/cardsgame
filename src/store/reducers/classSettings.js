import * as actionTypes from '../actions/actionTypes';

const initialState = {
    starCounter: 0,
    classUploaded: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_STAR:
            return {
                ...state,
                starCounter: state.starCounter < 50 ? state.starCounter + 1 : state.starCounter
            }

        case actionTypes.REMOVE_STAR:
            return {
                ...state,
                starCounter: state.starCounter > 0 ? state.starCounter - 1 : state.starCounter
            }
        
        case actionTypes.RESET_STARS:
            return {
                ...state,
                starCounter: 0
            }

        default:
            return state;
    }
};

export default reducer;