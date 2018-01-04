import React, { Component } from 'react';
import { Container, Content, Tab, Tabs, List } from 'native-base';
import { TeamMember } from './TeamMember';

export class TeamsScreen extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  render() {
    return (
      <Container>
        <Content>
          <Tabs initialPage={1}>
            <Tab heading="NomadIT" />
          </Tabs>
          <TeamMember />
        </Content>
      </Container>
    );
  }
}
