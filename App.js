/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Header from './src/components/Header';
import HeaderSection from './src/components/HeaderSection';
import Item from './src/components/Item';
import firebase from 'firebase';


export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header headerTitle={'Standapp'}/>
                    <HeaderSection headerSectionTitle={'What have you done today?'} />
                        <Item placeholder={'Thing you get done'} />
                    {/*<HeaderSection headerSectionTitle={'What problems did you meet today?'} />*/}
                        {/*<Item placeholder={'Problem you met'} />*/}
                    {/*<HeaderSection headerSectionTitle={'What will you do next day?'} />*/}
                        {/*<Item placeholder={'Thing to do next day'} />*/}

            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    //alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
});
