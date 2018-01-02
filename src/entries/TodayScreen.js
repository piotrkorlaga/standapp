import React from 'react';
import { View } from 'react-native';
import { Item } from './Entry';
import { HeaderSection } from './HeaderSection';

export const TodayScreen = () => (
  <View>
    <HeaderSection headerSectionTitle="What have you done today?" />
    <Item placeholder="Thing you get done" inputType="today" />
  </View>
);
