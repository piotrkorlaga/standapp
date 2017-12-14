import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';

import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_START,
    SIGNUP_USER_START,
    SIGNUP_USER_FAIL,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER
} from "./types";

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const signUp = () => {
    return {
        type: SIGNUP_USER
    };
};



export const signUpUser = ({email, password}) => {
    return (dispatch) => {
        dispatch({ type: SIGNUP_USER_START });
        console.log('signing up');
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( user => {console.log('signing up 2'); signUpUserSuccess(dispatch, user); firebase.auth().signInWithEmailAndPassword(email, password)})
            .catch( () => signUpUserFail(dispatch))
    };
};

const signUpUserSuccess = (dispatch, user) => {
    dispatch({
        type: SIGNUP_USER_SUCCESS,
        payload: user
    });
    Actions.today();
};

const signUpUserFail = (dispatch) => {
    dispatch({ type: SIGNUP_USER_FAIL });
};

export const loginUser = ({email, password}) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER_START });
        console.log('logging in');
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then( user => {console.log('logging in 2'); loginUserSuccess(dispatch, user)})
            .catch( (error) => {
                console.log(error);
                loginUserFail(dispatch)
            });
    };
};

// Helpers methods to loginUser reduxThunk's Action Creator
const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    Actions.today();
};