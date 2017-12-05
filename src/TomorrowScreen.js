import React from 'react';
import {View} from 'react-native';
import {Item} from "./components/Item";
import {HeaderSection} from "./components/HeaderSection";

export const TomorrowScreen = () => {
    return(
        <View>
            <HeaderSection headerSectionTitle={'What will you do next day?'} />
            <Item placeholder={'Thing to do next day'} />
        </View>
    );
};