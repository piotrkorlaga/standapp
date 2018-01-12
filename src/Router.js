import React, { Component } from 'react';
import { Scene, Router, Actions, Stack } from 'react-native-router-flux';
import LoginForm from './authentication/LoginForm';
import SignUpForm from './authentication/SignUpForm';
import { HistoryScreen } from './history/HistoryScreen';
import { TodayScreen } from './entries/TodayScreen';
import { TomorrowScreen } from './entries/TomorrowScreen';
import { ProblemScreen } from './entries/ProblemScreen';
import { Spinner } from './core/Spinner';
import { TeamsScreen } from './teams/TeamsScreen';
import { UserProfileScreen } from './UserProfileScreen';

class RouterComponent extends Component {
  // sceneStyle will be applied to all different scenes of our App
  render() {
    return (
      <Router titleStyle={{ alignSelf: 'center'}}>
        <Stack key="root" hideNavBar>
          <Scene key="loader" component={Spinner} />
          <Scene key="auth">
            <Scene
              key="login"
              component={LoginForm}
              title="Please login into your account"
            />
            <Scene
              key="signup"
              component={SignUpForm}
              title="Sign up for free"
            />
          </Scene>
          <Scene key="main">
            <Scene
              key="home"
              component={HistoryScreen}
              title="User's history"
              onRight={() => Actions.entries()}
              rightTitle="Add"
              initial
            />
            <Scene key="entries">
              <Scene
                key="today"
                component={TodayScreen}
                title="Step 1/3"
                onRight={() => Actions.tomorrow()}
                rightTitle="Next"
                onLeft={() => Actions.main({ type: 'reset' })} // makes back arrow on 'home' disappeared
                leftTitle="Back"
                initial
              />
              <Scene
                key="tomorrow"
                component={TomorrowScreen}
                title="Step 2/3"
                onLeft={() => Actions.today()}
                leftTitle="Back"
                onRight={() => Actions.problem()}
                rightTitle="Next"
              />
              <Scene
                key="problem"
                component={ProblemScreen}
                title="Step 3/3"
                onLeft={() => Actions.tomorrow()}
                leftTitle="Back"
                onRight={() => Actions.home()}
                rightTitle="Home"
              />
            </Scene>
            <Scene key="team">
              <Scene
                key="teams"
                component={TeamsScreen}
                title="Teams"
              />
            </Scene>
            <Scene key="userprofile">
              <Scene
                key="profile"
                component={UserProfileScreen}
                title="User Profile"
              />
            </Scene>
          </Scene>
        </Stack>
      </Router>
    );
  }
}

export default RouterComponent;
