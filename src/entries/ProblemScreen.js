import { Content } from 'native-base';
import React from 'react';
import { DailyEntry } from './DailyEntry';
import { HeaderSection } from './HeaderSection';

export const ProblemScreen = () => (
  <Content>
    <HeaderSection headerSectionTitle="What problems did you meet today?" />
    <DailyEntry placeholder="Problem you met" inputType="problems" />
  </Content>
);
