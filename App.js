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

    let [userTokens, setUserTokens] = useState(null)
    let [userInfo, setUserInfo] = useState(null)

    const retriveStoredInfo = async () => {
        try {
            let retrivedData = await AsyncStorage.getItem("userInfo")
            if(!retrivedData) return
            let userInfo = await JSON.parse(retrivedData)
            setUserInfo(userInfo.profile)
            setUserTokens(userInfo.tokens)

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        retriveStoredInfo()
    }, [])


    const signIn = async (response) => {
        const userInfo = response.profile
        const tokens = response.tokens

        try {
            await AsyncStorage.setItem("userInfo", JSON.stringify(response))
            setUserTokens(tokens)
            setUserInfo(userInfo)
        } catch (error) {
            console.error(error)
        }
    }

    const signOut = async () => {
        try {
            await AsyncStorage.removeItem("userInfo")
            setUserTokens(null)
            setUserInfo(null)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <AuthContext.Provider value={{signIn, signOut, userTokens, userInfo}}>
            <NavigationContainer theme={DefaultTheme}>
                {userTokens !== null ? (
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
