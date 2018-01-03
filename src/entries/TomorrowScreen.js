import React from 'react';
import { View } from 'react-native';
import { DailyEntry } from './DailyEntry';
import { HeaderSection } from './HeaderSection';

export const TomorrowScreen = () => (
  <View>
    <HeaderSection headerSectionTitle="What will you do next day?" />
    <DailyEntry placeholder="Thing to do next day" inputType="tomorrow" />
  </View>
);
