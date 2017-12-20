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
        dailyEntries: [],
        todays: [],
        tomorrows: [],
        problems: []
    };
  }

  componentWillMount() {
    firebase.auth().currentUser.getIdToken(true)
      .then((idToken) => {
        axios.get(`https://standapp-e73d7.firebaseio.com/v2/users/${firebase.auth().currentUser.uid}.json?auth=${idToken}`)
            .then((response) => {
            // wyjściowy obiekt ze spłaszczoną strukturą. UID jest dopisane do val
            const dailyEntries = _.map(response.data.dailyentry, (val, date) => ({ ...val, date }));
            this.setState({ dailyEntries });
            console.log(this.state.dailyEntries);
            const todays = _.flatMap(this.state.dailyEntries, item => {
                return _.map(item.today, (val, uid) => ({ ...val, uid }));
            });
            this.setState({ todays });
            console.log(this.state.todays);

            const tomorrows = _.flatMap(this.state.dailyEntries, item => {
                return _.map(item.tomorrow, (val, uid) => ({ ...val, uid }));
            });
            this.setState({ tomorrows });

            const problems = _.flatMap(this.state.dailyEntries, item => {
                return _.map(item.problems, (val, uid) => ({ ...val, uid }));
            });
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
                  <Subtitle>{`DATE: ${this.props.currentDate}`}</Subtitle>
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
