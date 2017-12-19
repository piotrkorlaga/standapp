import React from 'react';
import { View, Text } from 'react-native';

export const HeaderSection = (props) => {
    const { questionStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <Text style={questionStyle}>{props.headerSectionTitle}</Text>
        </View>
    );
};

const styles = {

    viewStyle: {
        backgroundColor: '#5c7dd6',
        alignItems: 'flex-start', // moving horizontally
        height: 60,
        paddingTop: 15,
        position: 'relative',
    },
    questionStyle: {
        fontSize: 20,
        color: '#F8F8F8',
        paddingLeft: 10,
    },

};
