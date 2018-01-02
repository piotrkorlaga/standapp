import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import { Spinner } from './components/Spinner';
import { emailChanged, passwordChanged, signUpUser } from './actions';

class SignUpForm extends Component {
  constructor() {
    super();
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSignUpButtonPressed = this.onSignUpButtonPressed.bind(this);
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onSignUpButtonPressed() {
    const { email, password } = this.props;
    if (!(email && password)) {
      console.error('Please provide all needed data.');
    } else {
      this.props.signUpUser({ email, password });
    }
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

  renderButton() {
    if (this.props.loading) {
      return <Spinner />;
    }
    return (
      <Content>
        <Button
          onPress={this.onSignUpButtonPressed}
          block
        >
          <Text>Sign me up</Text>
        </Button>
      </Content>
    );
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
              />
            </Item>

            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                autoCorrect={false}
                secureTextEntry={false}
                onChangeText={this.onPasswordChange}
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
    color: 'red',
  },
};

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
  emailChanged, passwordChanged, signUpUser,
})(SignUpForm);
