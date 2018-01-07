import React, { Component } from 'react';
import { Container, Content, Footer as FooterNativeBase, FooterTab, Button, Text, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

export class Footer extends Component {
  constructor() {
    super();
    this.state = {
      activeHome: true,
      activeTeam: false,
      activeUserProfile: false,
    };
    this.onHomeButtonPress = this.onHomeButtonPress.bind(this);
    this.onTeamButtonPress = this.onTeamButtonPress.bind(this);
    this.onUserProfileButtonPress = this.onUserProfileButtonPress.bind(this);
  }

  onHomeButtonPress() {
    Actions.main();
    this.setState({ activeHome: true });
    this.setState({ activeTeam: false });
    this.setState({ activeUserProfile: false });
  }

  onTeamButtonPress() {
    Actions.team();
    this.setState({ activeHome: false });
    this.setState({ activeTeam: true });
    this.setState({ activeUserProfile: false });
  }

  onUserProfileButtonPress() {
    Actions.userprofile();
    this.setState({ activeHome: false });
    this.setState({ activeTeam: false });
    this.setState({ activeUserProfile: true });
  }

  render() {
    return (
      <FooterNativeBase>
        <FooterTab>
          <Button
            onPress={this.onHomeButtonPress}
            active={this.state.activeHome}
          >
            <Icon name="ios-home" />
            <Text>Home</Text>
          </Button>
          <Button
            onPress={this.onTeamButtonPress}
            active={this.state.activeTeam}
          >
            <Icon name="ios-people" />
            <Text>Teams</Text>
          </Button>
          <Button
            onPress={this.onUserProfileButtonPress}
            active={this.state.activeUserProfile}
          >
            <Icon name="settings" />
            <Text>User profile</Text>
          </Button>
        </FooterTab>
      </FooterNativeBase>
    );
  }
}
