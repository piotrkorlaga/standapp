import React, { Component } from 'react';
import { Icon, Fab, View } from 'native-base';

const styles = {
  buttonStyle: {
    backgroundColor: '#34A34F',
  },
};

export class AddInputButton extends Component {
  render() {
    return (
      <View>
        <Fab
          onPress={this.props.onPress}
          style={styles.buttonStyle}
          position="bottomRight"
        >
          <Icon name="add" />
        </Fab>
      </View>
    );
  }
}

