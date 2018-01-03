import { Content, Button, Text } from 'native-base';
import React from 'react';
import { Entry } from './Entry';
import { HeaderSection } from './HeaderSection';

export const ProblemScreen = () => (
  <Content>
    <HeaderSection headerSectionTitle="What problems did you meet today?" />
    <Entry placeholder="Problem you met" inputType="problems" />
    <Button block success onPress={() => alert('To be continued')}>
      <Text>Submit changes</Text>
    </Button>
  </Content>
);
