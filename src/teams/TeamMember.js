import firebase from 'firebase';
import axios from 'axios';
import React, { Component } from 'react';
import { List, ListItem, Text, Card } from 'native-base';

export class TeamMember extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
    };
  }

  componentWillMount() {
    firebase.auth().currentUser.getIdToken(true)
    // korzystam z props user z komponentu HistoryScreen, w którym mam id userów
      .then(idToken => axios.get(`https://standapp-e73d7.firebaseio.com/v3/users/${this.props.teamMember.id}/email.json?auth=${idToken}`)
        .then((response) => {
          const userName = response.data;
          this.setState({ userName });
        }));
  }
  render() {
    return (
      <Card>
        <List>
          <ListItem>
            <Text>{this.state.userName}</Text>
          </ListItem>
        </List>
      </Card>
    );
  }
}
