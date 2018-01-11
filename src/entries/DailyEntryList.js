import React from 'react';
import { Button, Icon, Text, ListItem, Body, Right } from 'native-base';

export const DailyEntryList = ({ prop, pressDelete }) => (
  <ListItem>
    <Body>
      <Text>{prop}</Text>
    </Body>
    <Right>
      <Button small danger onPress={pressDelete}>
        <Icon name="trash" />
      </Button>
    </Right>
  </ListItem>
);

