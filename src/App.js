import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { LOGIN_USER_SUCCESS } from './actions/actions';
import Store from './StoreConfig';
import RouterComponent from './Router';

export default class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDm3K8dRFvmh590NJgEHZsLpdHfIMmdlGo',
      authDomain: 'standapp-e73d7.firebaseapp.com',
      databaseURL: 'https://standapp-e73d7.firebaseio.com',
      projectId: 'standapp-e73d7',
      storageBucket: 'standapp-e73d7.appspot.com',
      messagingSenderId: '878518537515',
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        Store.dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
        Actions.main();
      } else {
        Actions.auth();
      }
    });
  }
  render() {
    return (
      <Provider store={Store}>
        <RouterComponent />
      </Provider>
    );
  }
}

