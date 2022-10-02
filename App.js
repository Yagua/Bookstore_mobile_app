import {useState, useEffect, useReducer, useMemo } from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import RootStackScreen from "./src/screens/RootStackScreen"
import { AuthContext } from "./src/context/AuthContext"
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Text, View, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
        userTokens: null,
        userProfile: null,
    }

    const loginReducer = (prevState, action) => {
        switch(action.type) {
            case "GET_STORED_INFO":
                return {
                    ...prevState,
                    userTokens: action.tokens,
                    userProfile: action.userProfile,
                    isLoading: false,
                }
            case "LOGIN":
                return {
                    ...prevState,
                    userTokens: action.tokens,
                    userProfile: action.userProfile,
                    isLoading: false,
                }
            case "LOGOUT":
                return {
                    ...prevState,
                    userTokens: null,
                    userProfile: null,
                    isLoading: false,
                }
            //TODO: add register case
        }
    }

    const retriveStoredInfo = async () => {
        let userProfile = null;
        let tokens = null;
        try {
            let retrivedData = await AsyncStorage.getItem("userInfo")
            let userInfo = await JSON.parse(retrivedData)
            userProfile = userInfo.profile
            tokens = userInfo.tokens

        } catch (error) {
            console.error(error)
        }
        dispatch({
            type: "GET_STORED_INFO",
            tokens: tokens,
            userProfile: userProfile
        })
    }

    useEffect(() => {
        retriveStoredInfo()
    }, [])


    const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)

    const authProvider = useMemo(() => ({
        signIn: async (response) => {
            const userProfile = response.profile
            const tokens = response.tokens

            try {
                await AsyncStorage.setItem("userInfo", JSON.stringify(response))
            } catch (error) {
                console.error(error)
            }

            dispatch({type: "LOGIN", tokens: tokens, userProfile: userProfile})
        },
        signOut: async () => {
            try {
                await AsyncStorage.removeItem("userInfo")
            } catch (error) {
                console.error(error)
            }
            dispatch({type: "LOGOUT"})
        }
    }), []);

    // if(loginState.isLoading) {
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
