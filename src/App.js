import { Container } from 'native-base';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { LOGIN_USER_SUCCESS } from './actions/actions';
import Store from './StoreConfig';
import RouterComponent from './Router';
import { Footer } from './Footer';
import { Invitation } from './teams/Invitation.Model';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      unreadInvitations: [],
    };
  }

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
        const invitationRef = firebase.database().ref(`v3/users/${firebase.auth().currentUser.uid}/invitations`);
        // listener nasłuchuje, czy dane w v3/.../unreadInvitations zostały zmienione. Jeśli tak, przekazuje je do obiektu invitation
        invitationRef.on('value', (snapshot) => {
          // ponowne użycie klasy Invitation i opcjonalnych pól w konstruktorze, aby wyciągnąć dane na
          const invitationArray = _.map(snapshot.val(), (invitationData, id) => new Invitation(invitationData.fromUser, id, invitationData.isRead, invitationData.isAccepted));
          const unreadInvitations = invitationArray.filter(invitation => invitation.isRead === false);
          if (unreadInvitations.length > 0) {
            this.setState({ unreadInvitations });
          }
          console.log(snapshot.val());
          console.log('unreadInvitations.length:', this.state.unreadInvitations.length);
        });
        Actions.main();
      } else {
        Actions.auth();
      }
    });
  }
  render() {
    return (
      <Provider store={Store}>
        <Container>
          <RouterComponent />
          <Footer invitations={this.state.unreadInvitations} />
        </Container>
      </Provider>
    );
  }
}

