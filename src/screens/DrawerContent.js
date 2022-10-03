import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ToastAndroid, Alert, Platform, ActivityIndicator, Image } from 'react-native';
import {
    Title,
    Caption,
    Drawer,
} from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';

import { AuthContext } from '../context/AuthContext';
import UserService from '../service/UserService'

const defaultProfileImage = require("../assets/images/defaultUser.png")
import { NO_ACTION_AVAILABLE_MESSAGE, APP_HOST } from '../../constants'

const DrawerContent = (props) => {
    let { signOut, userTokens } = React.useContext(AuthContext)
    let [isLoading, setIsLoading] = useState(false)
    let [userInfo, setUserInfo] = useState({
        username: '',
        first_name: '',
        paternal_last_name: '',
        picture: null,
    })

    useEffect(() => {
        UserService.getUserProfile(userTokens.access)
            .then(response => setUserInfo((prevState) => ({
                ...prevState,
                username: response.user.username,
                first_name: response.user.first_name,
                paternal_last_name: response.user.paternal_last_name,
                picture: response.picture
            })))
            .catch(error => console.error(error))
    }, [])

    return (
        <View style={{ flex: 1, marginTop: "-2%" }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <LinearGradient 
                        colors={['#507DBC', '#5485BE', "#5C8DC7"]}
                        start={{x: 0.5, y: 1.2}}
                        style={styles.userInfoSection}
                    >
                        <View style={{ flexDirection: 'row', alignItems: "center" }}>
                            <Image
                                source={userInfo.picture
                                    ? {uri: `${APP_HOST}${userInfo.picture}`}
                                    : defaultProfileImage
                                }
                                style={{height: 80, width: 80, borderRadius: 50}}
                            />
                            <View
                                style={{
                                    marginLeft: 18,
                                    flexDirection: 'column',
                                }}
                            >
                                <Title style={styles.title}>{userInfo.first_name} {userInfo.paternal_last_name}</Title>
                                <Caption style={styles.caption}>@{userInfo.username}</Caption>
                            </View>
                        </View>
                    </LinearGradient>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Feather
                                    name="home"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {
                                props.navigation.navigate('Home');
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Feather
                                    name="user"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {
                                props.navigation.navigate('Profile');
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Feather
                                    name="shopping-cart"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Shopping Cart"
                            onPress={() => {
                                props.navigation.navigate('ShoppingCart');
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Feather
                                    name="credit-card"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Payments & subscriptions"
                            onPress={() => {
                                if(Platform.OS === "android")
                                    ToastAndroid.show(
                                        NO_ACTION_AVAILABLE_MESSAGE,
                                        ToastAndroid.LONG
                                    )
                                else
                                    Alert.alert(NO_ACTION_AVAILABLE_MESSAGE)
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Feather
                                    name="settings"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => {
                                if(Platform.OS === "android")
                                    ToastAndroid.show(
                                        NO_ACTION_AVAILABLE_MESSAGE ,
                                        ToastAndroid.LONG
                                    )
                                else
                                    Alert.alert(NO_ACTION_AVAILABLE_MESSAGE)
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Feather
                                    name="help-circle"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Help & feedBack"
                            onPress={() => {
                                if(Platform.OS === "android")
                                    ToastAndroid.show(
                                        NO_ACTION_AVAILABLE_MESSAGE,
                                        ToastAndroid.LONG
                                    )
                                else
                                    Alert.alert(NO_ACTION_AVAILABLE_MESSAGE)
                            }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <View style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Feather name="log-out" color={color} size={size} />
                    )}
                    label="Sign Out"
                    onPress={() => {
                        signOut();
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        justifyContent: "center",
        backgroundColor: "red",
        paddingVertical: 30,
        paddingLeft: 20,
    },
    title: {
        fontSize: 18,
        marginTop: 3,
        fontWeight: 'bold',
        color: "#ffffff"
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        color: "#D4D8D9"
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 10,
    },
    bottomDrawerSection: {
        paddingVertical: 10,
        borderTopColor: '#DAE3E5',
        borderTopWidth: 1,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});

export default DrawerContent;
