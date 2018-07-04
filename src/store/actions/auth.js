import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userName, classSettings, schoolID) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userName: userName,
        classSettings: classSettings,
        schoolID: schoolID
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('classSettingsID');
    localStorage.removeItem('classSettings');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        };
        let url = 'https://cards-game-login-server.herokuapp.com/users'
        // "http://localhost:5000/users"
        
        if (!isSignUp) {
            url = 'https://cards-game-login-server.herokuapp.com/login'
            // "http://localhost:5000/users/login"
        }
        axios.post(url, authData)
            .then(response => {
                localStorage.setItem('token', response.headers["x-auth"]);
                localStorage.setItem('userName', email);
                console.log(response);
                
                if (isSignUp) {
                    localStorage.setItem('classSettingsID', response.data.school._id);
                    dispatch(authSuccess(response.headers["x-auth"], email, null, response.data.school._id));
                } else {
                    localStorage.setItem('classSettingsID', response.data.user.schoolID);
                    localStorage.setItem('classSettings', JSON.stringify(response.data.schoolSettings));
                    dispatch(authSuccess(response.headers["x-auth"], email, response.data.schoolSettings, response.data.user.schoolID));
                }

            })
            .catch(err => {
                isSignUp ? dispatch(authFail(err.response.data.code)) : dispatch(authFail(err.response.data)) ; // <-- Node js
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
                const userId = localStorage.getItem('userName');
                const schoolSettings = localStorage.getItem('classSettingsID');
                dispatch(authSuccess(token, userId, null, schoolSettings));
        }
    }
}