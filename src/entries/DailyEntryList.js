import React from 'react';
import { Button, Icon, Text, ListItem, Body, Content } from 'native-base';

export const DailyEntryList = ({ prop, pressDelete }) => (
  <Content style={{ paddingTop: 5, paddingBottom: 5 }}>
    <ListItem itemDivider last>
      <Button style={{ alignSelf: 'center' }} small danger onPress={pressDelete}>
        <Icon name="trash" />
      </Button>
      <Body>
        <Text>{prop}</Text>
      </Body>
    </ListItem>
  </Content>
);

