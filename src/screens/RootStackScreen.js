import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen'
import RestorePasswordScreen from './RestorePasswordScreen'

const RootStack = createStackNavigator();

const RootStackScreen = () => {
    return (
        <RootStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <RootStack.Screen name="SignInScreen" component={SignInScreen} />
            <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
            <RootStack.Screen name="RestorePassword" component={RestorePasswordScreen}/>
        </RootStack.Navigator>
    );
};

export default RootStackScreen;
