import { Container, Content } from 'native-base';
import React, { Component } from 'react';
import _ from 'lodash';
import firebase from 'firebase';
import axios from 'axios';
import UserHistoryCard from './UserHistoryCard';
import { DailyEntry } from './DailyEntry';
import { User } from './User';

// ściąga wpisy całego teamu i grupuje po userze
export class HistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentWillMount() {
    let token = null;
    firebase.auth().currentUser.getIdToken(true)
      .then((idToken) => {
        token = idToken;
        return axios.get(`https://standapp-e73d7.firebaseio.com/v3/users/${firebase.auth().currentUser.uid}/teamkey.json?auth=${idToken}`);
      }).then((response) => {
        const teamKey = response.data;
        axios.get(`https://standapp-e73d7.firebaseio.com/v3/teams/${teamKey}/users.json?auth=${token}`)
          .then((response) => {
            console.log('response: ', response); // loguj dane zaraz po requeście, żeby sprawdzić, czy uzyskałeś dostęp
            // wcześniej zamodelowaliśmy strukturę danych w klasach DailyEntry i User. Teraz dostosowujemy się pod tę strukturę.
            const users = _.map(response.data, (userDailyEntries, uid) => {
              console.log('userDailyEntries: ', userDailyEntries);
              const dailyEntries = _.map(userDailyEntries.dailyentry, (dailyEntry, date) => new DailyEntry(date, dailyEntry.today, dailyEntry.tomorrows, dailyEntry.problems));
              console.log('dailyEntries: ', dailyEntries);
              return new User(uid, uid, dailyEntries);
            });
            this.setState({ users });
            console.log(this.state.users);
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(`Error :: ${error.message}`));
  }

  render() {
    return (
      <Container>
        <Content>
          {/* <UserHistoryCard /> */}
        </Content>
      </Container>
    );
  }
}
