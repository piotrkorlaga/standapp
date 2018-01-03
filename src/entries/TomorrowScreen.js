import React from 'react';
import { View } from 'react-native';
import { Entry } from './Entry';
import { HeaderSection } from './HeaderSection';

export const TomorrowScreen = () => (
  <View>
    <HeaderSection headerSectionTitle="What will you do next day?" />
    <Entry placeholder="Thing to do next day" inputType="tomorrow" />
  </View>
);
