import React from 'react';
import { View } from 'native-base';
import { DailyEntry } from './DailyEntry';
import { HeaderSection } from './HeaderSection';


export const TomorrowScreen = () => (
  <View padder style={{ flex: 1 }}>
    <HeaderSection headerSectionTitle="What will you do next day?" />
    <DailyEntry placeholder="Thing to do next day" inputType="tomorrow" />
  </View>
);
