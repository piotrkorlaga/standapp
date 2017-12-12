import React from 'react';
import {Scene, Router, Actions, ActionConst} from 'react-native-router-flux';
import {LoginForm} from "./LoginForm";
import {TodayScreen} from "./TodayScreen";
import {TomorrowScreen} from "./TomorrowScreen";
import {ProblemScreen} from "./ProblemScreen";

export const RouterComponent = () => {
    return(
        // sceneStyle will be applied to all different scenes of our App
        <Router sceneStyle={{ paddingTop: 65 }}>

                <Scene key="login" component={LoginForm} title="Please Login"/>

                <Scene key="today" component={TodayScreen} title="Step 1/3" onRight={() => Actions.tomorrow()} rightTitle="Next" />
                <Scene key="tomorrow" component={TomorrowScreen} title="Step 2/3" onRight={() => Actions.problem()} rightTitle="Next"/>
                <Scene key="problem" component={ProblemScreen} title="Step 3/3" onLeft={() => Actions.tomorrow()} leftTitle="Back"/>

        </Router>
    );
};