import React, { Component } from 'react';
import { Icon, Fab, View } from 'native-base';

export class AddInputButton extends Component {
  render() {
    return (
      <View>
        <Fab
          onPress={this.props.onPress}
          style={{ backgroundColor: '#34A34F' }}
          position="bottomRight"
        >
          <Icon name="add" />
        </Fab>
      </View>
    );
  }
}

