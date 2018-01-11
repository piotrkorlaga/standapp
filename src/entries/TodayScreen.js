import React from 'react';
import { View } from 'native-base';
import { DailyEntry } from './DailyEntry';
import { HeaderSection } from './HeaderSection';

export const TodayScreen = () => (
  <View padder style={{ flex: 1 }}>
    <HeaderSection headerSectionTitle="What have you done today?" />
    <DailyEntry placeholder="Thing you get done" inputType="today" />
  </View>
);

