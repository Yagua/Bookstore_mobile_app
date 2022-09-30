import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import RootStackScreen from "./src/screens/RootStackScreen"
import { AuthContext } from "./src/context/AuthContext"
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Text, View, ActivityIndicator } from 'react-native'

import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ShoppingCartScreen from './src/screens/ShoppingCartScreen';
import DrawerContent from './src/screens/DrawerContent';
import BookScreen from './src/screens/BookScreen'
import SearchResultScreen from './src/screens/SeachResultScreen'

const Drawer = createDrawerNavigator();

export default function App() {

    const initialLoginState = {
        isLoading: true,
        userTokens: null
    }

    const loginReducer = (prevState, action) => {
        switch(action.type) {
            case "GET_TOKENS":
                return {
                    ...prevState,
                    isLoading: false,
                    userTokens: action.tokens
                }
            case "LOGIN":
                return {
                    ...prevState,
                    isLoading: false,
                    userTokens: action.tokens
                }
            case "LOGOUT":
                return {
                    ...prevState,
                    isLoading: false,
                    userTokens: null
                }
            //TODO: add register case
        }
    }

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState)

    const authProvider = React.useMemo(() => ({
        signIn: async (value) => {
            dispatch({type: "LOGIN", tokens: value})
        },
        signOut: async () => {
            dispatch({type: "LOGOUT", tokens: null})
        }
    }), []);

    // if(loginState.isLoading){
    //     return (
    //         <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    //             <ActivityIndicator size="large"/>
    //         </View>
    //     );
    // }

    return (
        <AuthContext.Provider value={authProvider}>
            <NavigationContainer theme={DefaultTheme}>
                {loginState.userTokens !== null ? (
                    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                        <Drawer.Screen name="Home" component={HomeScreen}/>
                        <Drawer.Screen name="Profile" component={ProfileScreen}/>
                        <Drawer.Screen name="ShoppingCart" component={ShoppingCartScreen}/>
                        <Drawer.Screen name="BookPreview" component={BookScreen}/>
                        <Drawer.Screen name="SearchResult" component={SearchResultScreen}/>
                    </Drawer.Navigator>
                  )
                :
                  <RootStackScreen/>
                }
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
