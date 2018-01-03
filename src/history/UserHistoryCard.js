import firebase from 'firebase';
import axios from 'axios';
import { List, Content, Header, Body, Title } from 'native-base';
import React, { Component } from 'react';
import HistoryCard from './HistoryCard';

export class UserHistoryCard extends Component {
  constructor() {
    super();
    this.state = {
      dailyEntries: [],
      userName: '',
    };
  }

  componentWillMount() {
    firebase.auth().currentUser.getIdToken(true)
    // korzystam z props user z komponentu HistoryScreen, w którym mam id userów
      .then(idToken => axios.get(`https://standapp-e73d7.firebaseio.com/v3/users/${this.props.user.id}/email.json?auth=${idToken}`)
        .then((response) => {
          const userName = response.data;
          this.setState({ userName });
        }));

    this.setState({ dailyEntries: this.props.user.dailyEntries });
  }

  render() {
    return (
      <Content>
        <Header style={{ backgroundColor: 'green' }}>
          <Body>
            <Title>{`Daily stand up of: ${this.state.userName}`}</Title>
          </Body>
        </Header>
        <List>
          {this.state.dailyEntries.map(dailyEntry => (
            <HistoryCard key={dailyEntry.date} dailyEntry={dailyEntry} />
        ))}
        </List>
      </Content>
    );
  }
}
