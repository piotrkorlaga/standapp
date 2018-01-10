import firebase from 'firebase';
import axios from 'axios';
import React, { Component } from 'react';
import { Button, Text, Card, CardItem, Right, Left } from 'native-base';


export class SingleInvitation extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
    };
    this.onConfirmInvitationButtonPress = this.onConfirmInvitationButtonPress.bind(this);
  }

  onConfirmInvitationButtonPress() {
    let token = null;
    const { currentUser } = firebase.auth();
    firebase.auth().currentUser.getIdToken(true)
      .then((idToken) => {
        token = idToken;
        this.setState({ token });
        return axios.patch(`https://standapp-e73d7.firebaseio.com/v3/users/${currentUser.uid}.json?auth=${idToken}`, { teamkey: 'nomadit' });
      })
      .then((response) => {
        console.log('Invitations?', response);
        return axios.patch(`https://standapp-e73d7.firebaseio.com/v3/users/${currentUser.uid}/invitations/${this.props.invitation.id}.json?auth=${this.state.token}`, {
          isAccepted: true,
        });
      })
    // kolejny then żeby dopisać uid usera do tabeli teams/nomadit/users
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
