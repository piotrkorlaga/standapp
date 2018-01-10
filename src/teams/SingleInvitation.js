import firebase from 'firebase';
import axios from 'axios';
import React, { Component } from 'react';
import { Button, Text, Card, CardItem, Right, Left } from 'native-base';


export class SingleInvitation extends Component {
  constructor() {
    super();
    this.state = {
      unacceptedInvitation: [],
      token: '',
    };
    this.onConfirmInvitationButtonPress = this.onConfirmInvitationButtonPress.bind(this);
  }

  onConfirmInvitationButtonPress() {
    const idToken = this.state.token;
    axios.patch(`https://standapp-e73d7.firebaseio.com/v3/users/${firebase.auth().currentUser.uid}.json?auth=${idToken}`, { teamkey: 'nomadit' })
      .then((response) => {
        axios.patch(`https://standapp-e73d7.firebaseio.com/v3/users/${firebase.auth().currentUser.uid}/invitations/.json?auth=${idToken}`);
        console.log('Invitations?', response);
      })
    // .then(exactInvitation => axios.patch(`https://standapp-e73d7.firebaseio.com/v3/users/${firebase.auth().currentUser.uid}/invitations.json?auth=${idToken}&orderBy="${exactInvitation.data.id}"&equalTo="123321"`, {
    //   isAccepted: true,
    // }))
    // })
    // .then((invitations) => {
    //   console.log('invitations: ', invitations);
    //   const invitationArray = _.map(invitations.data, (invitationData, id) => new Invitation(invitationData.fromUser, id, invitationData.isRead, invitationData.isAccepted));
    //       const
    //       return axios.patch(`https://standapp-e73d7.firebaseio.com/v3/users/${firebase.auth().currentUser.uid}/invitations/${invitations}.json?auth=${idToken}`, isAccepted = {
    //             isAccepted: true,
    //         });
    //   })
    // })
      .catch(error => console.log('error with added teamkey ', error));
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
