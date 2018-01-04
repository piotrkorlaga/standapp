import firebase from 'firebase';
import React, { Component } from 'react';
import { Container, Content, Footer as NativeBaseFooter, Text, Button } from 'native-base';
import { Footer } from './Footer';

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
            style={{ marginTop: 10, marginLeft: 10 }}
            primary
            onPress={() => this.onLogout()}
          >
            <Text>Logout</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
