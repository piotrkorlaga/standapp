import React, { Component } from 'react';
import { Container } from 'native-base';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import { RouterComponent } from './src/Router';
import reducers from './src/reducers';

export default class App extends Component {

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyDm3K8dRFvmh590NJgEHZsLpdHfIMmdlGo',
            authDomain: 'standapp-e73d7.firebaseapp.com',
            databaseURL: 'https://standapp-e73d7.firebaseio.com',
            projectId: 'standapp-e73d7',
            storageBucket: 'standapp-e73d7.appspot.com',
            messagingSenderId: '878518537515'
        });
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
                <Provider store={store}>
                    <Container>
                        <RouterComponent />
                    </Container>
                </Provider>

        );
    }
}

