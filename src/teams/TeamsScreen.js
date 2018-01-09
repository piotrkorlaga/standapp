import firebase from 'firebase';
import axios from 'axios';
import Modal from 'react-native-modal';
import _ from 'lodash';
import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Container, Content, Tab, Tabs, Button, Text, Item, Input, Card,
} from 'native-base';
import { TeamMember } from './TeamMember';
import { DailyEntry } from '../history/DailyEntry';
import { User } from '../history/User.Model';
import { Invitation } from './Invitation.Model';
import { Invitations } from './Invitations';

export class TeamsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamMembers: [],
      visibleCreateTeamModal: false,
      visibleInviteUserModal: false,
      token: '',
      teamName: '',
      userEmail: '',
    };
    this.createGroup = this.createGroup.bind(this);
    this.inviteUser = this.inviteUser.bind(this);
  }

  componentWillMount() {
    let token = null;
    firebase.auth().currentUser.getIdToken(true)
      .then((idToken) => {
        token = idToken;
        this.setState({ token });
        return axios.get(`https://standapp-e73d7.firebaseio.com/v3/users/${firebase.auth().currentUser.uid}/teamkey.json?auth=${idToken}`);
      }).then((response) => {
        const teamKey = response.data;
        if (teamKey) {
          axios.get(`https://standapp-e73d7.firebaseio.com/v3/teams/${teamKey}/users.json?auth=${token}`)
            .then((teamResponse) => {
              console.log('response: ', teamResponse);
              const teamMembers = _.map(teamResponse.data, (userDailyEntries, uid) => {
                const dailyEntries = _.map(userDailyEntries.dailyentry, (dailyEntry, date) => new DailyEntry(date, dailyEntry.today, dailyEntry.tomorrows, dailyEntry.problems));
                return new User(uid, uid, dailyEntries);
              });
              this.setState({ teamMembers });
            })
            .catch(error => console.log(error));
        } else {
          alert('Some is wrong with your account. Please contact us.');
        }
      })
      .catch(error => console.log(`Error :: ${error.message}`));
  }

  createGroup() {
    if (this.state.teamName) {
      const name = this.state.teamName;
      firebase.database().ref('v3/teams/')
        .push({ name });
      this.setState({ teamName: '' });
      this.setState({ visibleCreateTeamModal: false });
    } else {
      this.setState({ visibleCreateTeamModal: false });
    }
  }

  inviteUser() {
    if (this.state.userEmail) {
      const idToken = this.state.token;
      const email = this.state.userEmail;
      axios.get(`https://standapp-e73d7.firebaseio.com/v3/users.json?auth=${idToken}&orderBy="email"&equalTo="${email}"`) // zalogowany user (auth) pobiera użytkownika z tabeli
      // users poprzez posortowanie (orderBy) i filtrowanie (equalTo)
        .then((user) => {
          console.log(user);
          const id = _.map(user.data, (userData, uid) => uid)[0]; // interesuje nas tylko tabela z uid, więc ją zwracamy i przypiujemy wartosć z indeksu[0] do zmiennej id
          console.log(id);
          axios.post(`https://standapp-e73d7.firebaseio.com/v3/users/${id}/invitations.json?auth=${idToken}`, new Invitation(firebase.auth().currentUser.email));
        })
        .catch(error => console.log(error));
      this.setState({ userEmail: '' });
      this.setState({ visibleInviteUserModal: false });
    } else {
      this.setState({ visibleInviteUserModal: false });
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <Tabs initialPage={1}>
            <Tab heading="NomadIT" />
          </Tabs>

          <Invitations />

          <Card>
            {this.state.teamMembers.map(teamMember => (
              <TeamMember key={teamMember.id} teamMember={teamMember} />
            ))}
            <Button
              style={{ margin: 10 }}
              primary
              block
              onPress={() => this.setState({ visibleCreateTeamModal: true })}
            >
              <Text>Create new team</Text>
            </Button>
            <Button
              style={{ margin: 10 }}
              primary
              block
              onPress={() => this.setState({ visibleInviteUserModal: true })}
            >
              <Text>Invite user</Text>
            </Button>
          </Card>

          <Modal
            isVisible={this.state.visibleCreateTeamModal}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalPartsPosition}>Please enter the team name</Text>
              <Item
                style={styles.modalPartsPosition}
                regular
              >
                <Input
                  placeholder="Team name"
                  onChangeText={teamName => this.setState({ teamName })}
                />
              </Item>
              <Button
                style={styles.modalPartsPosition}
                onPress={this.createGroup}
              >
                <Text>Save</Text>
              </Button>
            </View>
          </Modal>

          <Modal
            isVisible={this.state.visibleInviteUserModal}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalPartsPosition}>Please enter user's email</Text>
              <Item
                style={styles.modalPartsPosition}
                regular
              >
                <Input
                  placeholder="User's email"
                  onChangeText={userEmail => this.setState({ userEmail })}
                />
              </Item>
              <Button
                style={styles.modalPartsPosition}
                onPress={this.inviteUser}
              >
                <Text>Invite</Text>
              </Button>
            </View>
          </Modal>
        </Content>
      </Container>
    );
  }
}

const styles = {
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalPartsPosition: {
    margin: 10,
    alignSelf: 'center',
  },
};
