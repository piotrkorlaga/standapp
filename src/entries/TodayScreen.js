import React from 'react';
import { View } from 'react-native';
import { Entry } from './Entry';
import { HeaderSection } from './HeaderSection';

export const TodayScreen = () => (
  <View>
    <HeaderSection headerSectionTitle="What have you done today?" />
    <Entry placeholder="Thing you get done" inputType="today" />
  </View>
);
