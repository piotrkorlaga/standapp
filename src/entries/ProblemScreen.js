import { View } from 'native-base';
import React from 'react';
import { DailyEntry } from './DailyEntry';
import { HeaderSection } from './HeaderSection';

export const ProblemScreen = () => (
  <View padder style={{ flex: 1 }}>
    <HeaderSection headerSectionTitle="What problems did you meet today?" />
    <DailyEntry placeholder="Problem you met" inputType="problems" />
  </View>
);
