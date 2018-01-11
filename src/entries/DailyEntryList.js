import React from 'react';
import { Button, Icon, Text, ListItem, Body, Content } from 'native-base';

export const DailyEntryList = ({ prop, pressDelete }) => (
  <Content>
    <ListItem itemDivider last>
      <Button small danger onPress={pressDelete}>
        <Icon name="trash" />
      </Button>
      <Body>
        <Text>{prop}</Text>
      </Body>
    </ListItem>
  </Content>
);

