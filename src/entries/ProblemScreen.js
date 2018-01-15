import { View } from 'native-base';
import React from 'react';
import { DailyEntry } from './DailyEntry';
import { HeaderSection } from './HeaderSection';

const styles = {
  viewStyle: {
    flex: 1,
  },
};

export const ProblemScreen = () => (
  <View padder style={styles.viewStyle}>
    <HeaderSection headerSectionTitle="What problems did you meet today?" />
    <DailyEntry placeholder="Problem you met" inputType="problems" />
  </View>
);
