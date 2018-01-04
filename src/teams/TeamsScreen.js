import firebase from 'firebase';
import axios from 'axios';
import React, { Component } from 'react';
import { Container, Content, Tab, Tabs, Button, Text } from 'native-base';
import { TeamMember } from './TeamMember';
import { DailyEntry } from '../history/DailyEntry';
import { User } from '../history/User';

export class TeamsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamMembers: [],
    };
  }

  componentWillMount() {
    let token = null;
    firebase.auth().currentUser.getIdToken(true)
      .then((idToken) => {
        token = idToken;
        return axios.get(`https://standapp-e73d7.firebaseio.com/v3/users/${firebase.auth().currentUser.uid}/teamkey.json?auth=${idToken}`);
      }).then((response) => {
        console.log('responseUpper: ', response);
        const teamKey = response.data;
        if (teamKey) {
          axios.get(`https://standapp-e73d7.firebaseio.com/v3/teams/${teamKey}/users.json?auth=${token}`)
            .then((response) => {
              console.log('response: ', response); // loguj dane zaraz po requeście, żeby sprawdzić, czy uzyskałeś dostęp
              // wcześniej zamodelowaliśmy strukturę danych w klasach DailyEntry i User. Teraz dostosowujemy się pod tę strukturę.
              const teamMembers = _.map(response.data, (userDailyEntries, uid) => {
                console.log('userDailyEntries: ', userDailyEntries);
                const dailyEntries = _.map(userDailyEntries.dailyentry, (dailyEntry, date) => new DailyEntry(date, dailyEntry.today, dailyEntry.tomorrows, dailyEntry.problems));
                console.log('dailyEntries: ', dailyEntries);
                return new User(uid, uid, dailyEntries);
              });
              this.setState({ teamMembers });
              console.log('teamMembers', this.state.teamMembers);
            })
            .catch(error => console.log(error));
        } else {
          alert('Some is wrong with your account. Please contact us.');
        }
      })
      .catch(error => console.log(`Error :: ${error.message}`));
  }

  render() {
    return (
      <Container>
        <Content>
          <Tabs initialPage={1}>
            <Tab heading="NomadIT" />
          </Tabs>
          {this.state.teamMembers.map(teamMember => (
            <TeamMember key={teamMember.id} teamMember={teamMember} />
            ))}
          <Button primary block>
            <Text>Create new team</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
