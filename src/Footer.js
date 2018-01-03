import React, { Component } from 'react';
import { Container, Header, Content, Footer as FooterNativeBase, FooterTab, Button, Text, Icon } from 'native-base';

export class Footer extends Component {
  render() {
    return (
      <Container>
        <FooterNativeBase>
          <FooterTab>
            <Button active>
              <Icon name="ios-home" />
              <Text>Home</Text>
            </Button>
            <Button>
              <Icon name="ios-people" />
              <Text>Teams</Text>
            </Button>
            <Button>
              <Icon name="settings" />
              <Text>User profile</Text>
            </Button>
          </FooterTab>
        </FooterNativeBase>
      </Container>
    );
  }
}
