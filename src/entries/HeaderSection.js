import React from 'react';
import { Header, Body, Text } from 'native-base';

const styles = {
  headerStyle: {
    marginBottom: 10,
  },
  headerTextStyle: {
    color: '#ffffff',
    alignSelf: 'center',
  },
};

export const HeaderSection = props => (
  <Header style={styles.headerStyle}>
    <Body>
      <Text style={styles.headerTextStyle}>{props.headerSectionTitle}</Text>
    </Body>
  </Header>
);
