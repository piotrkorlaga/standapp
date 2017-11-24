import React, {Component} from 'react';
import { View, TextInput, Text } from 'react-native';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {input: ''};
        this.update = this.update.bind(this);
    }
    update (e) {
        this.setState({input: e.target.value})
    }
    render() {
        return (
            <View>
                <TextInput  style={styles.textInputStyle}
                            onChange={this.update}
                            multiline={true}
                            placeholder={this.props.placeholder}
                />
                <Text>{this.state.input}</Text>
            </View>
        );
    }
}

const styles = {
    textInputStyle: {
        fontSize: 14,
        alignSelf: 'stretch',
        flexGrow: 30,
    },
};

export default Item;