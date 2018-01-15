import React from 'react';
import { View } from 'native-base';
import { DailyEntry } from './DailyEntry';
import { HeaderSection } from './HeaderSection';

const styles = {
  viewStyle: {
    flex: 1,
  },
};

export const TomorrowScreen = () => (
  <View padder style={styles.viewStyle}>
    <HeaderSection headerSectionTitle="What will you do next day?" />
    <DailyEntry placeholder="Thing to do next day" inputType="tomorrow" />
  </View>
);
