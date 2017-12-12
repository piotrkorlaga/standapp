import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
    const { textStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerTitle}</Text>
        </View>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#e90a47',
        justifyContent: 'center',    // moving vertically
        alignItems: 'center', // moving horizontally
        height: 60,
        elevation: 12,
        position: 'relative',
        marginBottom: 6,
    },
    textStyle: {
        fontSize: 25,
        fontWeight: '600',
        color: '#F8F8F8',

    },
};

export default Header;