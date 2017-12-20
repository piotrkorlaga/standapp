import React, { Component } from 'react';
import _ from 'lodash';
import firebase from 'firebase';
import { Container } from 'native-base';
import axios from 'axios';
import HistoryCard from "./HistoryCard";

export default class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dailyEntries: []
        };
    }

    componentWillMount() {
        firebase.auth().currentUser.getIdToken(true)
            .then(idToken => axios.get(`https://standapp-e73d7.firebaseio.com/v2/users/${firebase.auth().currentUser.uid}/dailyentry.json?auth=${idToken}`))
            .then(response => {
                // wyjściowy obiekt ze spłaszczoną strukturą. UID jest dopisane do val
                const dailyEntries = _.map(response.data, (val, date) => ({ ...val, date }));
                this.setState({ dailyEntries });
                console.log(this.state.dailyEntries)
            })
            .catch(error => console.log('Error :: ' & error.message));
    }

    render() {

        return (
            <Container>
                {this.state.dailyEntries.map(date => (
                    <HistoryCard key={date.date} dailyEntry={date}/>
                ))}
            </Container>
        );
    }
}
