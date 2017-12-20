import React, { Component } from 'react';
import _ from 'lodash';
import firebase from 'firebase';
import {
  Body, Title, Subtitle, Container, Header,
  Content, List, ListItem, Text, Card,
} from 'native-base';
import axios from 'axios';

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todays: [],
      tomorrows: [],
      problems: [],
    };
  }

  componentWillMount() {
    firebase.auth().currentUser.getIdToken(true)
      .then((idToken) => {
        axios.get(`https://standapp-e73d7.firebaseio.com/users/${firebase.auth().currentUser.uid}.json?auth=${idToken}`)
          .then((response) => {
            // wyjściowy obiekt ze spłaszczoną strukturą. UID jest dopisane do val
            const todays = _.map(response.data.inputs.today, (val, uid) => ({ ...val, uid }));
            this.setState({ todays });

            const tomorrows = _.map(response.data.inputs.tomorrow, (val, uid) => ({ ...val, uid }));
            this.setState({ tomorrows });

            const problems = _.map(response.data.inputs.problems, (val, uid) => ({ ...val, uid }));
            this.setState({ problems });
          })
          .catch(error => console.log('Error :: ' & error.message));
      });
  }

  renderSection(listName) {
    // uważać na metodę dostępu do tablicy przez [`${}`]. Przy pisaniu apki webowej
    // nazwy zmiennych są często skracane, więc lepiej je hardcodować.
    return this.state[`${listName}`].map(data => (
      <ListItem>
        <Text>
          {data.input}
        </Text>
      </ListItem>
    ));
  }

  render() {
    return (
      <Container>

        <Content>
          <Card>

            <List>
              <Header>

                <Body>
                  <Title>Daily stand up</Title>
                  <Subtitle>Date</Subtitle>
                </Body>

              </Header>

              <ListItem itemDivider>
                <Text>Done today:</Text>
              </ListItem>

              <List>
                {this.renderSection('todays')}
              </List>

              <ListItem itemDivider>
                <Text>Will be done tomorrow:</Text>
              </ListItem>
              <List>
                {this.renderSection('tomorrows')}
              </List>

              <ListItem itemDivider>
                <Text>Problems met today:</Text>
              </ListItem>
              <List>
                {this.renderSection('problems')}
              </List>
            </List>


          </Card>
        </Content>

      </Container>
    );
  }
}
