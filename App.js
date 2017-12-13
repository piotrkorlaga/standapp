import React, {Component} from 'react';
import {Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Icon, Text} from 'native-base';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import firebase from 'firebase';
import LoginForm from './src/LoginForm';
import {SpinnerComponent} from './src/components/Spinner';
import {RouterComponent} from "./src/Router";
import reducers from './src/reducers';

export default class App extends Component {

    // state = {loggedIn: null};

    componentWillMount() {
        firebase.initializeApp({
            apiKey: "AIzaSyDm3K8dRFvmh590NJgEHZsLpdHfIMmdlGo",
            authDomain: "standapp-e73d7.firebaseapp.com",
            databaseURL: "https://standapp-e73d7.firebaseio.com",
            projectId: "standapp-e73d7",
            storageBucket: "standapp-e73d7.appspot.com",
            messagingSenderId: "878518537515"
        });

    //     firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //             this.setState({loggedIn: true});
    //         } else {
    //             this.setState({loggedIn: false});
    //         }
    //     });
    // }
    //
    // renderContent() {
    //     switch (this.state.loggedIn) {
    //         case true:
    //             return (
    //                 <Content>
    //                     <Button
    //                         onPress={() => firebase.auth().signOut()}
    //                         block
    //                     >
    //                         <Text>Log out</Text>
    //                     </Button>
    //                 </Content>
    //             );
    //         case false:
    //             return <LoginForm/>;
    //         default:
    //             return (
    //                 <Container>
    //                     <SpinnerComponent/>
    //
    //                 </Container>
    //             );
    //     }
    }

// {this.renderContent()}
    render() {
        const store = createStore(reducers);

        return (
                <Provider store={store}>
                    {/*<Container>*/}
                        {/*<RouterComponent/>*/}

                    {/*</Container>*/}
                    <LoginForm/>
                </Provider>

        );
    }
}


