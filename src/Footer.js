import React, { Component } from 'react';
import { Footer as FooterNativeBase, FooterTab, Button, Text, Icon, Badge } from 'native-base';
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

  // componentWillMount { auth -> event .on nazwa eventu (funkcja)}
  // event listenera (nasłuchuje czy zostao coś dodane) w FB (nie axios!) na url /users/currentUser.uid/invitations -> jeżeli są nowe, automatycznie wyświetl badge

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
            vertical
            onPress={this.onHomeButtonPress}
            active={this.state.activeHome}
          >
            <Icon name="ios-home" />
            <Text>Home</Text>
          </Button>
          <Button
            badge
            vertical
            onPress={this.onTeamButtonPress}
            active={this.state.activeTeam}
          >
            <Badge><Text>1</Text></Badge>
            <Icon name="ios-people" />
            <Text>Teams</Text>
          </Button>
          <Button
            vertical
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
