import React, { Component } from 'react';
import { View, } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Icon, Text } from 'native-base';
// import Header2 from './src/components/Header';
// import HeaderSection from './src/components/HeaderSection';
// import {Item} from './src/components/Item';
import firebase from 'firebase';
import {LoginForm} from './src/LoginForm';
import {SpinnerComponent} from './src/components/Spinner';
// import {Button} from "./src/components/Button";

{/*<View style={styles.container}>*/}
{/*<Header headerTitle={'Standapp'}/>*/}
{/*<HeaderSection headerSectionTitle={'What problems did you meet today?'} />*/}
{/*<Item placeholder={'Problem you met'} />*/}
{/*<HeaderSection headerSectionTitle={'What will you do next day?'} />*/}
{/*<Item placeholder={'Thing to do next day'} />*/}
{/*<HeaderSection headerSectionTitle={'What have you done today?'} />*/}
{/*<Item placeholder={'Thing you get done'} />*/}
{/*</View>*/}

export default class App extends Component {

    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyDm3K8dRFvmh590NJgEHZsLpdHfIMmdlGo",
            authDomain: "standapp-e73d7.firebaseapp.com",
            databaseURL: "https://standapp-e73d7.firebaseio.com",
            projectId: "standapp-e73d7",
            storageBucket: "standapp-e73d7.appspot.com",
            messagingSenderId: "878518537515"
        });

        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch(this.state.loggedIn) {
            case true:
                return (
                    <Content>
                        <Button
                            onPress={() => firebase.auth().signOut()}
                            block
                        >
                            <Text>Log out</Text>
                        </Button>
                    </Content>
                );
            case false:
                return <LoginForm/>;
            default:
                return <SpinnerComponent/>;
        }
    }

    render() {
        return (
            <Container>
                {this.renderContent()}
            </Container>
        );
    }
}


