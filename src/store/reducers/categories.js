import * as actionTypes from '../actions/actionTypes';

const initialState = {
    categories: {
        preK1: {
            classroom: ["chair","paper","puppet","crayon","table","shelf"],
            body: ["feet", "hands", "nose", "mouth", "ears", "eyes"],
            family: ["mother", "sister", "brother", "father", "baby", "grandparents"],
            toys: ["truck", "ball", "doll", "car", "teddy-bear", "airplane"],
            food: ["sandwich", "carrot", "apple", "cookie", "lemonade", "milk"],
            clothes: ["pants", "t-shirt", "sweater", "shoes", "socks", "skirt"],
            animals: ["fish", "bird", "cat", "kitten", "dog", "puppy"],
            jobs: ["dentist", "nurse", "fire-fighter", "bus-driver", "doctor", "police-officer"]
        },
        preK2: {
            school: ["balls","books","box","hoops","jungle-gym","markers","scissors","shelves"]
        },
        vocabulary: {
            funnyAnimals: ["mouse"]
        }
    },
    categoriesArray: [],
    levelsArray: ["preK1"],
    memoryGame: false
                        
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_CATEGORY:
            return {
                ...state,
                categoriesArray: [...state.categoriesArray, action.categoryName]
            }
            
        case actionTypes.REMOVE_CATEGORY:
            return {
                ...state,
                categoriesArray: state.categoriesArray.filter(item => item !== action.categoryName)
            }

        case actionTypes.ADD_LEVEL:
            return {
                ...state,
                levelsArray: [action.levelName]
            }

        case actionTypes.MEMORY_GAME:
            return {
                ...state,
                memoryGame: !state.memoryGame
            }

        default: 
            return state;
    }
};

export default reducer;