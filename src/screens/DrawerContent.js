import React, { useState } from 'react';
import { View, StyleSheet, ToastAndroid, Alert, Platform } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Drawer,
} from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

import { AuthContext } from '../context/AuthContext';

const defaultProfileImage = require("../assets/images/defaultUser.png")
import { NO_ACTION_AVAILABLE_MESSAGE } from '../../constants'


const DrawerContent = (props) => {
    let { signOut } = React.useContext(AuthContext)

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
                            <Avatar.Image
                                source={defaultProfileImage}
                                size={70}
                            />
                            <View
                                style={{
                                    marginLeft: 18,
                                    flexDirection: 'column',
                                }}
                            >
                                <Title style={styles.title}>Dilan Baron</Title>
                                <Caption style={styles.caption}>@yagua</Caption>
                            </View>
                        </View>
                    </LinearGradient>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home-outline"
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
                                <Icon
                                    name="account"
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
                                <Icon
                                    name="cart"
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
                                <Icon
                                    name="credit-card-settings"
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
                                <Icon
                                    name="cogs"
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
                                <Icon
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
                        <Icon name="exit-to-app" color={color} size={size} />
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
        color: "#DAE3E5"
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
