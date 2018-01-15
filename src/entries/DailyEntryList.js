import React from 'react';
import { Button, Icon, Text, ListItem, Body, Content } from 'native-base';

const styles = {
  containerStyle: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  buttonStyle: {
    alignSelf: 'center',
  },
};

export const DailyEntryList = ({ prop, pressDelete }) => (
  <Content style={styles.containerStyle}>
    <ListItem itemDivider last>
      <Button style={styles.buttonStyle} small danger onPress={pressDelete}>
        <Icon name="trash" />
      </Button>
      <Body>
        <Text>{prop}</Text>
      </Body>
    </ListItem>
  </Content>
);

