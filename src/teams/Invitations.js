import firebase from 'firebase';
import axios from 'axios';
import _ from 'lodash';
import React, { Component } from 'react';

import { Button, Text, Card, CardItem, Right, Left } from 'native-base';

export class Invitations extends Component {
  render() {
    return (
      <Card dataArray>
        <CardItem>
          <Left>
            <Text>User X invites you to Y team.</Text>
          </Left>
          <Right>
            <Button transparent small success>
              <Text>Confirm</Text>
            </Button>
            <Button transparent small danger>
              <Text>Delete</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>
    );
  }
}
