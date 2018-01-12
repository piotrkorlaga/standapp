import firebase from 'firebase';
import React, { Component } from 'react';
import { Container, Content, Text, Button } from 'native-base';

export class UserProfileScreen extends Component {
  constructor() {
    super();
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    firebase.auth().signOut().then(() => {
      console.log('Logout from firebase successful');
    }, (error) => {
      alert(error);
    });
  }
  render() {
    return (
      <Container>
        <Content>
          <Button
            style={{ marginTop: 10 }}
            block
            onPress={() => this.onLogout()}
          >
            <Text>Logout</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
