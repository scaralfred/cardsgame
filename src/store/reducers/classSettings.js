import * as actionTypes from '../actions/actionTypes';

const initialState = {
    starCounter: 0,
    classList: {
        PREK1: ["JOHN","FREDO"]
    }
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

        case actionTypes.ADD_CLASS:
            return {
                ...state,
                classList: {
                    ...state.classList,
                    [action.className.toString().toUpperCase()]: []
                }
            }

        case actionTypes.REMOVE_CLASS:
            let newState = Object.keys(state.classList)
                .reduce((acc, cur) => cur === action.className ? acc : { ...acc, [cur]: state.classList[cur] }, {})
            return { ...state, classList: newState }

        case actionTypes.ADD_PLAYER:
            return {
                ...state,
                classList: {
                    ...state.classList,
                    [action.className]: [...state.classList[action.className], action.playerName.toString().toUpperCase()]
                }
            }

        case actionTypes.REMOVE_PLAYER:
            return {
                ...state,
                classList: {
                    ...state.classList,
                    [action.className]: state.classList[action.className].filter(item => item !== action.playerName)
                }
            }

        default:
            return state;
    }
};

export default reducer;