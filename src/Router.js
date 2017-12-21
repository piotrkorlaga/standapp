import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import History from './History';
import { TodayScreen } from './TodayScreen';
import { TomorrowScreen } from './TomorrowScreen';
import { ProblemScreen } from './ProblemScreen';

export const RouterComponent = () => (
    // sceneStyle will be applied to all different scenes of our App
    <Router>
        <Scene hideNavBar>

            <Scene key="auth">
                <Scene key="login" component={LoginForm} title="Please login into your account" />
                <Scene key="signup" component={SignUpForm} title="Sign up for free" />
            </Scene>

            <Scene key="main">
                <Scene
                    key="historycard"
                    component={History}
                    title="User's history"
                    onRight={() => Actions.today()}
                    rightTitle="Add"
                    initial
                />

                <Scene
                    key="today"
                    component={TodayScreen}
                    title="Step 1/3"
                    onRight={() => Actions.tomorrow()}
                    rightTitle="Next"
                    onLeft={() => Actions.main({ type: 'reset' })}
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
        </Scene>
    </Router>
);
