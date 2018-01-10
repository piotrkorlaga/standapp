import firebase from 'firebase';
import axios from 'axios';
import React, { Component } from 'react';
import { Button, Text, Card, CardItem, Right, Left } from 'native-base';


export class SingleInvitation extends Component {
  constructor() {
    super();
    this.onConfirmInvitationButtonPress = this.onConfirmInvitationButtonPress.bind(this);
  }

  onConfirmInvitationButtonPress() {
    firebase.auth().currentUser.getIdToken(true)
      .then(idToken => axios.patch(`https://standapp-e73d7.firebaseio.com/v3/users/${firebase.auth().currentUser.uid}.json?auth=${idToken}`, { teamkey: 'nomadit' })
        .then((response) => {
          axios.patch(`https://standapp-e73d7.firebaseio.com/v3/users/${firebase.auth().currentUser.uid}/invitations/${this.props.invitation.id}.json?auth=${idToken}`, {
            isAccepted: true,
          });
          console.log('Invitations?', response);
        }))
      .catch(error => console.log('Error with confirm of invitation', error));
  }

  render() {
    return (
      <Card key={this.props.invitation.id}>
        <CardItem>
          <Left>
            <Text>{`User ${this.props.invitation.fromUser} invites you to the ${this.props.invitation.teamkey} team.`}</Text>
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
    );
  }
}
