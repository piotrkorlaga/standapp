import React from 'react';
import { Container } from 'native-base';
import { DailyEntry } from './DailyEntry';
import { HeaderSection } from './HeaderSection';

export const TodayScreen = () => (
  <Container>
    <HeaderSection headerSectionTitle="What have you done today?" />
    <DailyEntry placeholder="Thing you get done" inputType="today" />
  </Container>
);

