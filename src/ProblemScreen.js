import { Content, Button, Text } from 'native-base';
import React from 'react';
import { Item } from './components/Item';
import { HeaderSection } from './components/HeaderSection';

export const ProblemScreen = () => (
  <Content>
    <HeaderSection headerSectionTitle="What problems did you meet today?" />
    <Item placeholder="Problem you met" inputType="problems" />
    <Button block success onPress={() => alert('To be continued')}>
      <Text>Submit changes</Text>
    </Button>
  </Content>
);
