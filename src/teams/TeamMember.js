import React, { Component } from 'react';
import { List, ListItem, Text, Card } from 'native-base';

export class TeamMember extends Component {
  render() {
    return (
      <Card>
        <List>
          <ListItem>
            <Text>UserEmail</Text>
          </ListItem>
          <ListItem>
            <Text>UserEmail</Text>
          </ListItem>
          <ListItem>
            <Text>UserEmail</Text>
          </ListItem>
        </List>
      </Card>
    );
  }
}
