import React from 'react';
import {TouchableOpacity, Text} from 'react-native';


const Button = ({whenPressed, children}) => {
    return(
        <TouchableOpacity
            style={styles.buttonStyle}
            onPress={whenPressed}
        >
            <Text style={styles.buttonTextStyle}>{children}</Text>
        </TouchableOpacity>
    );
};



const styles = {
    buttonStyle: {
        height: 70,
        width: 70,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#e90a47',
        borderWidth: 1,
        borderRadius: 50,
        borderColor: '#F8F8F8',
        marginRight: 10,
        marginBottom: 10,
        marginTop: 10,

    },
    buttonTextStyle: {
        fontSize: 44,
        fontWeight: '300',
        color: '#F8F8F8',

    },
};

export default Button;