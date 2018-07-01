import * as actionTypes from '../actions/actionTypes';

const initialState = {
    starCounter: 0,
    classList: {
        PREK1: ['JACK', 'PAUL'],
        PREK2: ['LISA', 'ROMOLO']
    },
    playerPhoto: {
        PREK1: {
            JACK: {photo: null, visible: false},
            PAUL: { photo: null, visible: false }
        },
        PREK2: {
            LISA: { photo: null, visible: false },
            ROMOLO: { photo: null, visible: false }
        }
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
            let newStatePhoto = Object.keys(state.playerPhoto)
                .reduce((acc, cur) => cur === action.className ? acc : { ...acc, [cur]: state.playerPhoto[cur] }, {})
            
                return { ...state, classList: newState, playerPhoto: newStatePhoto }

        case actionTypes.ADD_PLAYER:
            return {
                ...state,
                classList: {
                    ...state.classList,
                    [action.className]: [...state.classList[action.className], action.playerName]
                },
                playerPhoto: {
                    ...state.playerPhoto,
                    [action.className]: {
                        ...state.playerPhoto[action.className],
                        [action.playerName]: { photo: false, visible: false }
                    }
                }
                
            }

        case actionTypes.REMOVE_PLAYER:

            let modifiedState = Object.keys(state.playerPhoto[action.className])
                .reduce((acc, cur) => cur === action.playerName ? acc : { ...acc, [cur]: state.playerPhoto[action.className][cur] }, {})
            
        return {
                ...state,
                classList: {
                    ...state.classList,
                    [action.className]: state.classList[action.className].filter(item => item !== action.playerName)
                },
                playerPhoto: {
                    ...state.playerPhoto,
                    [action.className]: modifiedState
                }
            }

        case actionTypes.UPLOAD_PHOTO:
            return {
                ...state,
                playerPhoto: {
                    ...state.playerPhoto,
                [action.className]: {
                    ...state.playerPhoto[action.className],
                    [action.playerName]: {
                            ...state.playerPhoto[action.className][action.playerName],
                            photo: action.fileURL
                        }
                    }
                }    
            }    

        case actionTypes.REMOVE_PHOTO:
            return {
                ...state,
                playerPhoto: {
                    ...state.playerPhoto,
                    [action.className]: {
                        ...state.playerPhoto[action.className],
                        [action.playerName]: {
                            ...state.playerPhoto[action.className][action.playerName],
                            photo: null, 
                            visible: false
                        }
                    }
                }
            }     

        case actionTypes.IMAGE_VISIBLE:
            return {
                ...state,
                playerPhoto: {
                    ...state.playerPhoto,
                    [action.className]: {
                        ...state.playerPhoto[action.className],
                        [action.playerName]: {
                            ...state.playerPhoto[action.className][action.playerName],
                            visible: true
                        }
                    }
                }
            }

        default:
            return state;
    }
};

export default reducer;