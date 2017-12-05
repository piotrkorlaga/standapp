import React, {Component,} from 'react';
import { View, TextInput } from 'react-native';
import {Button} from './Button';
import {ItemList} from './ItemList';

export class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {input: ''};
        this.state.inputs = [];
    }

    render() {
        return (
            <View style={styles.containerStyle}>

                <TextInput
                            ref={component => { this.inputToClear = component }}
                            style={styles.textInputStyle}
                            onChangeText={text => {
                                    this.setState({input: text})}
                            }
                            multiline={true}
                            placeholder={this.props.placeholder}
                />

                {this.state.inputs.map((element,index) =>
                    <ItemList key={index} prop={element} pressDelete={() => {
                        const result = this.state.inputs.filter((el) => el !== element);
                        this.setState({inputs: result});
                    }}/>)
                }

                <Button
                    style={styles.buttonSectionStyle}
                    whenPressed={() => {
                        if (this.state.input) {
                            this.setState({inputs: [...this.state.inputs,this.state.input]});
                            this.inputToClear.clear();
                            this.setState({input: ''});
                        } else {
                            alert('Pass some data.');
                        }
                    }
                    }
                >
                    +
                </Button>

            </View>
        );
    }
}

// element i el to obiekty, które wykorzystujemy w funkcjach.
// index odpowiada prop KEY, a element prop prop, który przechowuje wartości dla key.

const styles = {
    containerStyle: {
        marginLeft: 5,
        marginRight: 5,
        alignSelf: 'stretch',
    },

    textInputStyle: {
        fontSize: 16,
        alignSelf: 'stretch',
        flexGrow: 30,
    },

    buttonSectionStyle: {
        position: 'relative',
        alignItems: 'flex-end',
        alignContent: 'flex-end',

    }
};