import React, {Component} from 'react';
import {Container, Header, Content, Form, Item, Input, Label, Title, Button, Text} from 'native-base';
import {connect} from 'react-redux';
import {SpinnerComponent} from "./components/Spinner";

import {emailChanged, passwordChanged, loginUser} from './actions';

export class SignUpForm extends Component {

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const {email, password} = this.props;

        this.props.loginUser({email, password});
    }

    renderError() {
        if (this.props.error) {
            return (
                <Text style={styles.errorTextStyle}>
                    {this.props.error}
                </Text>
            );
        }
    }

    renderButton() {
        if (this.props.loading) {
            return <SpinnerComponent/>
        } else {
            return (
                <Content>
                    <Button
                        onPress={this.onButtonPress.bind(this)
                            //     () => {
                            //     const { email, password } = this.props;
                            //
                            //     if (!(email && password)) {
                            //         alert('Please provide all needed data.');
                            //     } else {
                            //         this.onButtonPress.bind(this);
                            //     }
                            // }
                        }
                        block>
                        <Text>Sign me up</Text>
                    </Button>
                </Content>
            );
        }
    }

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

                        {this.renderError()}

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
    },

};

const mapStateToProps = state => {
    const {email, password, error, loading} = state.auth;

    return {
        email: email,
        password: password,
        error: error,
        loading: loading
    };
};

export default connect(mapStateToProps, {
    emailChanged, passwordChanged, loginUser
})(SignUpForm);