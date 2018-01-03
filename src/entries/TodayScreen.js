import React from 'react';
import { View } from 'react-native';
import { DailyEntry } from './DailyEntry';
import { HeaderSection } from './HeaderSection';

export const TodayScreen = () => (
  <View>
    <HeaderSection headerSectionTitle="What have you done today?" />
    <DailyEntry placeholder="Thing you get done" inputType="today" />
  </View>
);
