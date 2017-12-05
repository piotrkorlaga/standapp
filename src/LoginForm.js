import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Title, Button, Text } from 'native-base';
import firebase from 'firebase';
import {SpinnerComponent} from "./components/Spinner";

export class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch( () => {
               firebase.auth().createUserWithEmailAndPassword(email, password)
                   .then(this.onLoginSuccess.bind(this))
                   .catch(this.onLoginFail.bind(this));
            });
    }

    onLoginSuccess() {
        this.setState({ email: '', password: '', loading: false, error: '' })
    }

    onLoginFail() {
        this.setState({ error: 'Authentication failed.', loading: false });
    }

    renderButton() {
        if (this.state.loading) {
            return <SpinnerComponent/>
        }
        return (
            <Content>
                <Button
                    onPress={this.onButtonPress.bind(this)}
                    block>
                    <Text>Log in</Text>
                </Button>
            </Content>
        );
    }

    render() {
        return (
            <Container>
                <Header>
                    <Title>Authentication</Title>
                </Header>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>user@domain.com</Label>
                            <Input
                                value={this.state.email}
                                onChangeText={text => this.setState({ email: text })}
                            />
                        </Item>

                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input
                                autoCorrect={false}
                                secureTextEntry={false}
                                value={this.state.password}
                                onChangeText={password => this.setState({ password })}
                            />
                        </Item>

                        <Text style={styles.errorTextStyle}>
                            {this.state.error}
                        </Text>

                    </Form>
                    {this.renderButton()}
                </Content>

            </Container>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};