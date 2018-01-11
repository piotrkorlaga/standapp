import React from 'react';
import { Header, Body, Text } from 'native-base';

export const HeaderSection = props => (
  <Header>
    <Body>
      <Text style={{ color: '#ffffff', alignSelf: 'center' }}>{props.headerSectionTitle}</Text>
    </Body>
  </Header>
);
