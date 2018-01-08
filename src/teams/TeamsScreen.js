import firebase from 'firebase';
import axios from 'axios';
import Modal from 'react-native-modal';
import _ from 'lodash';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content, Tab, Tabs, Button, Text, Form, Item, Input } from 'native-base';
import { TeamMember } from './TeamMember';
import { DailyEntry } from '../history/DailyEntry';
import { User } from '../history/User';

export class TeamsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamMembers: [],
      visibleCreateTeamModal: false,
      visibleInviteUserModal: false,
      teamName: '',
    };
    this.renderModalContent = this.renderModalContent.bind(this);
    this.createGroup = this.createGroup.bind(this);
  }

  componentWillMount() {
    let token = null;
    firebase.auth().currentUser.getIdToken(true)
      .then((idToken) => {
        token = idToken;
        return axios.get(`https://standapp-e73d7.firebaseio.com/v3/users/${firebase.auth().currentUser.uid}/teamkey.json?auth=${idToken}`);
      }).then((response) => {
        const teamKey = response.data;
        if (teamKey) {
          axios.get(`https://standapp-e73d7.firebaseio.com/v3/teams/${teamKey}/users.json?auth=${token}`)
            .then((response) => {
              console.log('response: ', response);
              const teamMembers = _.map(response.data, (userDailyEntries, uid) => {
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

  renderModalContent() {
    this.setState({ visibleCreateTeamModal: true });
    this.setState({ visibleInviteUserModal: true });
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
          <Button
            style={{ margin: 10 }}
            primary
            block
            onPress={this.renderModalContent}
          >
            <Text>Create new team</Text>
          </Button>
          <Button
            style={{ margin: 10 }}
            primary
            block
            onPress={() => alert('Ok.')}
          >
            <Text>Invite user</Text>
          </Button>
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
                <Text>Save and close</Text>
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
