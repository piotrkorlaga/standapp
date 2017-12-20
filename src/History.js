import React, { Component } from 'react';
import { ListView } from 'react-native';
import _ from 'lodash';
import firebase from 'firebase';
import { Body, Title, Subtitle, Container, Header, Content, List, ListItem, Text, Card } from 'native-base';
import axios from 'axios';

export default class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stores: []
        };
        this.state = { inputs: '' };
    }

    componentWillMount() {
        firebase.auth().currentUser.getIdToken(true)
            .then((idToken) => {
                axios.get(`https://standapp-e73d7.firebaseio.com/users/${firebase.auth().currentUser.uid}.json?auth=${idToken}`)
                    .then((response) => console.log(response))
                // .then(response => {
                //         const stores = response.data.data.inputs.children.map(obj => obj.data);
                //         this.setState({ stores });
                //         console.log(this.state.stores);
                //     })
                    .catch((error) => console.log('Error :: ' & error.message));
            });

    }

    fetchData() {
        const { currentUser } = firebase.auth();
        const recentPostsRef = firebase.database().ref(`users/${currentUser.uid}/inputs/`);
        recentPostsRef.once('value').then(snapshot => {
            // snapshot.val() is the dictionary with all your keys/values from the '/store' path
            this.setState({ stores: snapshot.val() });
        });

        const inputs = _.map(this.state.stores, (val, uid) => ({ ...val, uid }));
        return { inputs };
    }

    createDataSource({ inputs }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(inputs);
    }

    renderRow(inputs) {
        return (
            <Text inputs={inputs}>{this.state.inputs}</Text>
        );
    }

    render() {
        return (
            <Container>

                <Content>
                    <Card>


                        <List>
                            <Header>

                                <Body>
                                <Title>Daily stand up</Title>
                                <Subtitle>Date</Subtitle>
                                </Body>

                            </Header>

                            <ListItem itemDivider>
                                <Text>Done today:</Text>
                            </ListItem>
                            <ListItem first>
                                <Text>{console.log(this.state.stores)}</Text>
                            </ListItem>

                            <ListItem itemDivider>
                                <Text>Will be done tomorrow:</Text>
                            </ListItem>
                            <ListItem first>
                                <Text />
                            </ListItem>

                            <ListItem itemDivider>
                                <Text>Problems met today:</Text>
                            </ListItem>
                            <ListItem first>
                                <Text />
                            </ListItem>
                        </List>


                    </Card>
                </Content>

            </Container>
        );
    }
}
