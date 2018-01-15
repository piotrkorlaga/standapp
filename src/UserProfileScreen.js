import firebase from 'firebase';
import React, { Component } from 'react';
import { Container, Content, Text, Button } from 'native-base';

const styles = {
  buttonStyle: {
    marginTop: 10,
  },
};

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
            style={styles.buttonStyle}
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
