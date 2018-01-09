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
    };
  }

  componentWillMount() {
    firebase.auth().currentUser.getIdToken(true)
      .then(idToken => axios.get(`https://standapp-e73d7.firebaseio.com/v3/users/${firebase.auth().currentUser.uid}/invitations.json?auth=${idToken}`)
        .then((response) => {
          const invitationArray = _.map(response.data, (invitationData, id) => new Invitation(invitationData.fromUser, id, invitationData.isRead, invitationData.isAccepted));
          const unacceptedInvitations = invitationArray.filter(invitation => invitation.isAccepted === false);
          if (unacceptedInvitations.length > 0) {
            this.setState({ unacceptedInvitations });
          }
          console.log('unacceptedInvitations.length:', this.state.unacceptedInvitations);
        }));
  }

  render() {
    return (
      this.state.unacceptedInvitations.map(invitation => (
        <Card>
          <CardItem>
            <Left>
              <Text>{`User ${invitation.fromUser} invites you to the team.`}</Text>
            </Left>
            <Right>
              <Button transparent small success>
                <Text>Confirm</Text>
              </Button>
              <Button transparent small danger>
                <Text>Delete</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      ))
    );
  }
}
