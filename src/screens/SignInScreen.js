import {
    View,
    StyleSheet,
    Text,
    Image,
    TextInput,
    Platform,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import * as Animatable from 'react-native-animatable';

let logo = require('../assets/book_logo_transparent.png');

const SignInScreen = ({ navigation }) => {
    let [username, setUserName] = useState('');
    let [password, setPassword] = useState('');
    let [visiblePassword, setVisiblePassword] = useState(false);

    const updatePasswordVisibily = () => {
        setVisiblePassword(!visiblePassword);
    };

    let allowLogin = username.trim().length > 0 && password.length > 0

    return (
        <View style={styles.container}>
            <StatusBar barStyle="default" />
            <View style={styles.header}>
                <Image style={styles.logo} source={logo} resizeMode="contain" />
                <Text style={styles.title}>Bookstore App</Text>
            </View>

            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <Text style={styles.text_footer}>Username</Text>
                <View style={styles.action}>
                    <FontAwesome name="at" size={20} color="#1E2533" />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Your username"
                        onChangeText={(value) => setUserName(value)}
                    />
                </View>

                <Text style={[styles.text_footer, { marginTop: 25 }]}>
                    Password
                </Text>
                <View style={[styles.action, { marginBottom: 30 }]}>
                    <FontAwesome name="lock" size={20} color="#1E2533" />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Your password"
                        secureTextEntry={!visiblePassword}
                        onChangeText={(value) => setPassword(value)}
                    />
                    <TouchableOpacity onPress={updatePasswordVisibily}>
                        {visiblePassword ? (
                            <Feather name="eye" size={15} color="#1E2533" />
                        ) : (
                            <Feather name="eye-off" size={15} color="#1E2533" />
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.button}>
                    <TouchableOpacity style={styles.signIn}
                        disabled={!allowLogin}
                        onPress={() => {}}
                    >
                        <LinearGradient
                            colors={allowLogin
                                ? ['#58A1E8', '#5485BE']
                                : ["#829193", "#75777B"]}
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign}>Sign In</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[ styles.signIn, {
                                marginTop: 10,
                                borderWidth: 2,
                                borderColor: '#5485BE',
                            },
                        ]}
                        onPress={() => navigation.navigate("SignUpScreen")}
                    >
                        <Text style={[styles.textSign, { color: '#5485BE' }]}>
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 15,
                    }}
                >
                    <Text style={{ color: '#2C3D55' }}>Forgot password?</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C3D55',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 25,
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 2,
        backgroundColor: '#DAE3E5',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 28,
        paddingVertical: 25,
    },
    logo: {
        width: '100%',
        height: '80%',
    },
    title: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 30,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        marginTop: 20
    },
    action: {
        flexDirection: 'row',
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#C2C1C6',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -5,
        paddingLeft: 15,
        color: '#8BA6A9',
    },
    button: {
        alignItems: 'center',
        marginTop: 10,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#DAE3E5',
    },
});

export default SignInScreen;
