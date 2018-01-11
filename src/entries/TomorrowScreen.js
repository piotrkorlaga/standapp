import React from 'react';
import { Content } from 'native-base';
import { DailyEntry } from './DailyEntry';
import { HeaderSection } from './HeaderSection';


export const TomorrowScreen = () => (
  <Container>
    <HeaderSection headerSectionTitle="What will you do next day?" />
    <DailyEntry placeholder="Thing to do next day" inputType="tomorrow" />
  </Container>
);
