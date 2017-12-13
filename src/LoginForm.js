import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Title, Button, Text } from 'native-base';
import firebase from 'firebase';
import { Keyboard } from 'react-native'
import { connect } from 'react-redux';
import {SpinnerComponent} from "./components/Spinner";
import {Actions} from 'react-native-router-flux';
import { emailChanged, passwordChanged } from './actions';

export class LoginForm extends Component {

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    // state = { email: '', password: '', error: '', loading: false };
    //
    // onButtonPress() {
    //     const { email, password } = this.state;
    //
    //     this.setState({ error: '', loading: true });
    //
    //     firebase.auth().signInWithEmailAndPassword(email, password)
    //         .then(this.onLoginSuccess.bind(this))
    //         .catch( () => {
    //            firebase.auth().createUserWithEmailAndPassword(email, password)
    //                .then(this.onLoginSuccess.bind(this))
    //                .catch(this.onLoginFail.bind(this));
    //         });
    //
    //     Keyboard.dismiss();
    // }
    //
    // onLoginSuccess() {
    //     this.setState({ email: '', password: '', loading: false, error: '' })
    //
    //     Actions.today();
    // }
    //
    // onLoginFail() {
    //     this.setState({ error: 'Authentication failed.', loading: false });
    // }
    //
    // renderButton() {
    //     if (this.state.loading) {
    //         return <SpinnerComponent/>
    //     }
    //     return (
    //         <Content>
    //             <Button
    //                 onPress={this.onButtonPress.bind(this)}
    //                 block>
    //                 <Text>Log in</Text>
    //             </Button>
    //         </Content>
    //     );
    // }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>user@domain.com</Label>
                            <Input
                                onChangeText={this.onEmailChange.bind(this)}
                                value={this.props.email}
                            />
                        </Item>

                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input
                                autoCorrect={false}
                                secureTextEntry={false}
                                onChangeText={this.onPasswordChange.bind(this)}
                                value={this.props.password}
                            />
                        </Item>

                        {/*<Text style={styles.errorTextStyle}>*/}
                            {/*{this.state.error}*/}
                        {/*</Text>*/}

                    </Form>
                    {/*{this.renderButton()}*/}
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

const mapStateToProps = state => {
    const { email, password } = state.auth;

    return {
        email: email,
        password: password
    };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged })(LoginForm);