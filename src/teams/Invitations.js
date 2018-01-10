import firebase from 'firebase';
import axios from 'axios';
import _ from 'lodash';
import React, { Component } from 'react';
import { Invitation } from './Invitation.Model';
import { SingleInvitation } from './SingleInvitation';

export class Invitations extends Component {
  constructor() {
    super();
    this.state = {
      unacceptedInvitations: [],
      token: '',
    };
  }

  componentWillMount() {
    let token = null;
    firebase.auth().currentUser.getIdToken(true) // pobieram token od zalogowanego użytkownika
      .then((idToken) => {
        token = idToken;
        this.setState({ token });
        // zwracamy (dlatego return) obietnicę - opakowanie obiektu response
        return axios.get(`https://standapp-e73d7.firebaseio.com/v3/users/${firebase.auth().currentUser.uid}/invitations.json?auth=${token}`);
      }) // orderBy=isAccepted poprawić
      .then((response) => {
        const invitationArray = _.map(response.data, (invitationData, id) => new Invitation(invitationData.fromUser, id, invitationData.isRead, invitationData.isAccepted, 'nomadit'));
        const unacceptedInvitations = invitationArray.filter(invitation => invitation.isAccepted === false);
        if (unacceptedInvitations.length > 0) {
          this.setState({ unacceptedInvitations });
        }
        console.log('unacceptedInvitations: ', this.state.unacceptedInvitations);
      });
  }

  render() {
    return (
      this.state.unacceptedInvitations.map(invitation => (
        <SingleInvitation invitation={invitation} key={invitation.id} />
      ))
    );
  }
}
