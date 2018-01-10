import firebase from 'firebase';
import axios from 'axios';
import _ from 'lodash';
import React, { Component } from 'react';
import { Button, Text, Card, CardItem, Right, Left } from 'native-base';
import { Invitation } from './Invitation.Model';

export class Invitations extends Component {
  constructor() {
    super();
    this.state = {
      unacceptedInvitations: [],
      token: '',
    };
    this.onConfirmInvitationButtonPress = this.onConfirmInvitationButtonPress.bind(this);
  }

  componentWillMount() {
    let token = null;
    firebase.auth().currentUser.getIdToken(true) // pobieram token od zalogowanego użytkownika
      .then((idToken) => {
        token = idToken;
        this.setState({ token });
        // zwracamy obietnicę - opakowanie obiektu response (dlatego return)
        return axios.get(`https://standapp-e73d7.firebaseio.com/v3/users/${firebase.auth().currentUser.uid}/invitations.json?auth=${token}`);
      }) // orderBy=isAccepted poprawić
      .then((response) => {
        const invitationArray = _.map(response.data, (invitationData, id) => new Invitation(invitationData.fromUser, id, invitationData.isRead, invitationData.isAccepted));
        const unacceptedInvitations = invitationArray.filter(invitation => invitation.isAccepted === false);
        if (unacceptedInvitations.length > 0) {
          this.setState({ unacceptedInvitations });
        }
        console.log('unacceptedInvitations: ', this.state.unacceptedInvitations);
      });
  }

  onConfirmInvitationButtonPress() {
    const idToken = this.state.token;

    axios.patch(`https://standapp-e73d7.firebaseio.com/v3/users/${firebase.auth().currentUser.uid}.json?auth=${idToken}`, {
      teamkey: 'nomadit',
    })
      .catch(error => console.log('error with added teamkey ', error));
  }

  render() {
    return (
      this.state.unacceptedInvitations.map(invitation => (
        <Card key={invitation.id}>
          <CardItem>
            <Left>
              <Text>{`User ${invitation.fromUser} invites you to the team.`}</Text>
            </Left>
            <Right>
              <Button
                onPress={this.onConfirmInvitationButtonPress}
                transparent
                small
                success
              >
                <Text>Confirm</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      ))
    );
  }
}
