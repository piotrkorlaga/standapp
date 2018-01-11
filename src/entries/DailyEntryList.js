import React from 'react';
import { Content, Button, Icon, Text, List, ListItem, Body, Left, Card, CardItem, Right } from 'native-base';

export const DailyEntryList = ({ prop, pressDelete }) => (
  <Content>
    <List>
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
    </List>
  </Content>
);

