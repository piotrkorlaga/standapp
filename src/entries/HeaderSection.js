import React from 'react';
import { Header, Body, Text } from 'native-base';

export const HeaderSection = props => (
  <Header style={{ marginBottom: 10 }}>
    <Body>
      <Text style={{ color: '#ffffff', alignSelf: 'center' }}>{props.headerSectionTitle}</Text>
    </Body>
  </Header>
);
