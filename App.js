import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import RootStackScreen from "./src/screens/RootStackScreen"

export default function App() {
    return (
        <NavigationContainer theme={DefaultTheme}>
            <RootStackScreen />
        </NavigationContainer>
    );
}
