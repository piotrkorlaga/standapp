import React from 'react';
import { View } from 'react-native';
import { Item } from './Entry';
import { HeaderSection } from './HeaderSection';

export const TomorrowScreen = () => (
  <View>
    <HeaderSection headerSectionTitle="What will you do next day?" />
    <Item placeholder="Thing to do next day" inputType="tomorrow" />
  </View>
);
