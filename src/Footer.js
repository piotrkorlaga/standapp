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
    this.renderTeamButton = this.renderTeamButton.bind(this);
    this.renderTeamButtonWithBadge = this.renderTeamButtonWithBadge.bind(this);
    this.renderTeamButtonWithoutBadge = this.renderTeamButtonWithoutBadge.bind(this);
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

  renderTeamButton() {
    if (this.props.unreadInvitations.length > 0) {
      this.renderTeamButtonWithBadge();
    } else {
      this.renderTeamButtonWithoutBadge();
    }
  }

  renderTeamButtonWithBadge() {
    return (
      <Button
        vertical
        badge
        onPress={this.onTeamButtonPress}
        active={this.state.activeTeam}
      >
        <Badge><Text>{this.props.unreadInvitations.length}</Text></Badge>
        <Icon name="ios-people" />
        <Text>Teams</Text>
      </Button>
    );
  }

  renderTeamButtonWithoutBadge() {
    return (
      <Button
        vertical
        onPress={this.onTeamButtonPress}
        active={this.state.activeTeam}
      >
        <Icon name="ios-people" />
        <Text>Teams</Text>
      </Button>
    );
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
          {this.renderTeamButtonWithBadge()}
          {console.log('this.props.unreadInvitations: ', this.props.unreadInvitations)}
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
