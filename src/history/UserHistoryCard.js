import { List } from 'native-base';
import React, { Component } from 'react';
import HistoryCard from './HistoryCard';

export class UserHistoryCard extends Component {
  render() {
    return (
      <List>
        {this.props.user.dailyEntries.map(user => (
          <HistoryCard key={user.date} dailyEntry={user} />
                ))}
      </List>
    );
  }
}
