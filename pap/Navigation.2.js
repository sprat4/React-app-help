import { createStackNavigator } from '@react-navigation/stack';
import {Navigation} from "./Navigation";
import {Log} from "./Login";
import React from "react";


const RootStack = createStackNavigator(
    {
        Login: Log,
        Nav: Navigation,
    },
    {
        initialRouteName: 'Login',
    }
);

export default class Navi extends React.Component {
    render() {
        return <RootStack />;
    }
}