import React, { Component } from 'react';
import firebase from 'firebase';
import { Scene, Router, Actions, Stack } from 'react-native-router-flux';
import LoginForm from './authentication/LoginForm';
import SignUpForm from './authentication/SignUpForm';
import { HistoryScreen } from './history/HistoryScreen';
import { TodayScreen } from './entries/TodayScreen';
import { TomorrowScreen } from './entries/TomorrowScreen';
import { ProblemScreen } from './entries/ProblemScreen';
import { Spinner } from './core/Spinner';

class RouterComponent extends Component {
  constructor() {
    super();
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    firebase.auth().signOut().then(() => {
      console.log('Logout from firebase successful');
    }, (error) => {
      console.log(error);
    });
  }

  // sceneStyle will be applied to all different scenes of our App
  render() {
    return (
      <Router>
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
              key="userhistory"
              component={HistoryScreen}
              title="User's history"
              onRight={() => Actions.today()}
              rightTitle="Add"
              onLeft={this.onLogout}
              leftTitle="Logout"
              initial
            />
            <Scene
              key="today"
              component={TodayScreen}
              title="Step 1/3"
              onRight={() => Actions.tomorrow()}
              rightTitle="Next"
              onLeft={() => Actions.main({ type: 'reset' })} // makes back arrow on 'userhistory' disappeared
              leftTitle="Back"
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
            />
          </Scene>
        </Stack>
      </Router>
    );
  }
}

export default RouterComponent;
