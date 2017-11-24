/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
    TextInput,
    CheckBox,
} from 'react-native';
import Header from './src/components/Header';
import HeaderSection from './src/components/HeaderSection';

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header headerTitle={'Standapp'}/>
                    <HeaderSection headerSectionTitle={'What have you done today?'} />
              <View style={styles.subcontainer}>
                <CheckBox style={styles.checkbox}/>
                <DoneItem />
              </View>
                <HeaderSection headerSectionTitle={'What problems did you meet today?'} />

              <View style={styles.subcontainer}>
                <CheckBox style={styles.checkbox}/>
                <ProblemItem />
              </View>
                <HeaderSection headerSectionTitle={'What will you do next day?'} />

              <View style={styles.subcontainer}>
                <CheckBox style={styles.checkbox} />
                <ToDoItem />
              </View>
            </View>
        );
    }
}

class DoneItem extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    render() {
      return (
          <TextInput style={styles.element}
                     placeholder={"What did you get done?"}
                     onChangeText={(text) => this.setState({text})}
                     multiline={true}
          />
      );
    }
}

class ProblemItem extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }
    render() {
        return (
            <TextInput  style={styles.element}
                        placeholder={"Problem did you meet."}
                        onChangeText={(text) => this.setState({text})}
                        multiline={true}
            />
        );
    }
}

class ToDoItem extends Component {
    constructor(props) {
      super(props);
      this.state = {text: ''};
      this.update = this.update.bind(this);
    }
    update (e) {
        this.setState({text: e.target.value})
    }
    render() {
        return (
            <View>
            <TextInput  style={styles.element}
                        placeholder={"Thing to do next day."}
                        onChange={this.update}
                        multiline={true}

            />
            <Text>{this.state.text}</Text>
            </View>
        );
    }
}



const styles = StyleSheet.create({

  container: {
    //alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },

  subcontainer: {
      flexDirection: 'row',
      backgroundColor: 'yellow',
      alignItems: 'stretch',

  },

      checkbox: {
        backgroundColor: 'red',
          flexGrow: 0.1,
      },

      element: {
          fontSize: 14,
          alignSelf: 'stretch',
          flexGrow: 30,
      },







});
