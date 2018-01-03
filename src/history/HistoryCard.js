import React, { Component } from 'react';
import _ from 'lodash';
import {
  Body, Subtitle, Header,
  List, ListItem, Text, Card,
} from 'native-base';

// drukuje karty użytkowników
export default class HistoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      todays: [],
      tomorrows: [],
      problems: [],
    };
  }

  componentWillMount() {
    this.setState({ date: this.props.dailyEntry.date });

    const todays = _.map(this.props.dailyEntry.today, (val, uid) => ({ ...val, uid }));
    this.setState({ todays });

    const problems = _.map(this.props.dailyEntry.problems, (val, uid) => ({ ...val, uid }));
    this.setState({ problems });

    const tomorrows = _.map(this.props.dailyEntry.tomorrow, (val, uid) => ({ ...val, uid }));
    this.setState({ tomorrows });
  }

  renderSection(listName) {
    // uważać na metodę dostępu do tablicy przez [`${variable}`]. Przy pisaniu apki webowej nazwy zmiennych są często skracane, więc lepiej je hardcodować.
    return this.state[`${listName}`].map(data => (
      <ListItem key={data.uid}>
        <Text>
          {data.input}
        </Text>
      </ListItem>
    ));
  }

  render() {
    return (
      <Card>
        <List>
          <Header>
            <Body>
              <Subtitle>{`DATE: ${this.state.date}`}</Subtitle>
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
    );
  }
}
