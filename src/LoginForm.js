import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { emailChanged, passwordChanged, loginUser } from './actions';

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },

  signUpContentStyle: {
    paddingTop: 100,
  },
};

class LoginForm extends Component {
  constructor() {
    super();
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onLoginButtonPress = this.onLoginButtonPress.bind(this);
    this.onSignUpButtonPress = this.onSignUpButtonPress.bind(this);
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onLoginButtonPress() {
    const { email, password } = this.props;

    if (!(email && password)) {
      console.error('Please provide all needed data.');
    } else {
      this.props.loginUser({ email, password });
    }
  }

  onSignUpButtonPress() {
    Actions.signup();
  }

  renderError() {
    if (this.props.error) {
      return (
        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>
      );
    }
    return null;
  }

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>user@domain.com</Label>
              <Input
                onChangeText={this.onEmailChange}
                value={this.props.email}
              />
            </Item>

            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                autoCorrect={false}
                secureTextEntry={false}
                onChangeText={this.onPasswordChange}
                value={this.props.password}
              />
            </Item>

            {this.renderError()}

            <Content>
              <Button
                onPress={this.onLoginButtonPress}
                block
              >
                <Text>Log in</Text>
              </Button>
            </Content>
          </Form>

          <Content style={styles.signUpContentStyle}>
            <Text style={{ alignSelf: 'center', paddingBottom: 10 }}>Or</Text>
            <Button
              onPress={this.onSignUpButtonPress}
              block
            >
              <Text>Sign up</Text>
            </Button>
          </Content>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    email, password, error, loading,
  } = state.auth;

  const result = {
    email,
    password,
    error,
    loading,
  };
  return result;
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser,
})(LoginForm);
