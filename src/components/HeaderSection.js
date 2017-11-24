import React from 'react';
import {View, Text} from 'react-native';

const HeaderSection = (props) => {
    const { questionStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <Text style={questionStyle}>{props.headerSectionTitle}</Text>
        </View>
    );
};

const styles = {

    viewStyle: {
        backgroundColor: '#F8F8F8',
        alignItems: 'flex-start', // moving horizontally
        height: 60,
        paddingTop: 15,
        position: 'relative'
    },
    questionStyle: {
        fontSize: 20,
    },

};

export default HeaderSection;