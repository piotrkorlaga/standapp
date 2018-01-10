import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_START,
  SIGNUP_USER_START,
  SIGNUP_USER_FAIL,
  SIGNUP_USER_SUCCESS,
} from './actions';

export const emailChanged = text => ({
  type: EMAIL_CHANGED,
  payload: text,
});

export const passwordChanged = text => ({
  type: PASSWORD_CHANGED,
  payload: text,
});

export const signUpUser = ({ email, password }) => (dispatch) => {
  dispatch({ type: SIGNUP_USER_START });
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {

      // post v3/users/uid/email
      signUpUserSuccess(dispatch, user);
      firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .catch(() => signUpUserFail(dispatch));
};

const signUpUserSuccess = (dispatch, user) => {
  dispatch({
    type: SIGNUP_USER_SUCCESS,
    payload: user,
  });
  Actions.main();
};

const signUpUserFail = (dispatch) => {
  dispatch({ type: SIGNUP_USER_FAIL });
};

export const loginUser = ({ email, password }) => (dispatch) => {
  dispatch({ type: LOGIN_USER_START });
  console.log('logging in');
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch(error => loginUserFail(dispatch, error));
};

// Helpers methods to loginUser reduxThunk's Action Creator
const loginUserFail = (dispatch, error) => {
  dispatch({ type: LOGIN_USER_FAIL });
  console.log(error.message);
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user,
  });
  Actions.main();
};
