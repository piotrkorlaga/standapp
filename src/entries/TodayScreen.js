import React from 'react';
import { View } from 'native-base';
import { DailyEntry } from './DailyEntry';
import { HeaderSection } from './HeaderSection';

const styles = {
  viewStyle: {
    flex: 1,
  },
};

export const TodayScreen = () => (
  <View padder style={styles.viewStyle}>
    <HeaderSection headerSectionTitle="What have you done today?" />
    <DailyEntry placeholder="Thing you get done" inputType="today" />
  </View>
);

