import React, { Component } from 'react';
import { Container, Header, Content, Footer as FooterNativeBase, FooterTab, Button, Text } from 'native-base';

export class Footer extends Component {
  render() {
    return (
      <Container>
        <FooterNativeBase>
          <FooterTab>
            <Button active>
              <Text>Home</Text>
            </Button>
            <Button>
              <Text>Teams</Text>
            </Button>
            <Button>
              <Text>User profile</Text>
            </Button>
          </FooterTab>
        </FooterNativeBase>
      </Container>
    );
  }
}
