import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Text, View } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, loginUser } from '../actions/index';

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
  orSignUpStyle: {
    paddingTop: 45,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  unlinkedTextStyle: {
    fontSize: 18,
  },
  linkedTextStyle: {
    color: 'blue',
    fontSize: 18,
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


          <View style={styles.orSignUpStyle}>
            <Text style={styles.unlinkedTextStyle}>or </Text>
            <Text
              style={styles.linkedTextStyle}
              onPress={this.onSignUpButtonPress}
            >
              sign up
            </Text>
          </View>

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
