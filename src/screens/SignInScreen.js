import {
    View,
    StyleSheet,
    Text,
    Image,
    TextInput,
    Platform,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useContext } from 'react';
import * as Animatable from 'react-native-animatable';

import { AuthContext } from "../context/AuthContext";
import AuthService from '../service/AuthService'
import ModalComponent from '../components/ModalComponent'

let logo = require('../assets/images/logoTransparent.png');

const SignInScreen = ({ navigation }) => {
    let [username, setUserName] = useState('');
    let [password, setPassword] = useState('');
    let [visiblePassword, setVisiblePassword] = useState(false);
    let [modalVisible, setModalVisible] = useState(false);
    let [modalSettings, setModalSettings] = useState({
        title: '',
        body: '',
        acceptButtonTitle: '',
        cancelButtonTitle: '',
        isAlert: false
    })
    let { signIn } = useContext(AuthContext)
    let [isLoading, setIsLoading] = useState(false)

    const updatePasswordVisibily = () => {
        setVisiblePassword(!visiblePassword);
    };

    let allowLogin = username.trim().length > 0 && password.length > 0

    const handleLogin = () => {
        setIsLoading(true)
        AuthService.login(username, password)
            .then(response => {
                (async () => {
                    await signIn(response)
                    setIsLoading(false)
                })()
            })
            .catch(error => {
                setIsLoading(false)
                setModalSettings((prevState) => ({
                    ...prevState,
                    isAlert: true,
                    title: "Alert",
                    body: "User identified with the given credentials not fonud",
                    acceptButtonTitle: "Accept",
                    cancelButtonTitle: "Cancel",
                }))
                setModalVisible(true)
                console.error(error)
            })
    }

    if(isLoading){
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large"/>
            </View>
        );
    }

    return (
        <LinearGradient
            style={styles.container}
            colors={['#507DBC', '#5485BE']}
            start={{x: 1.2, y: 0.1}}
        >
            <StatusBar barStyle="default" />
            <View style={styles.header}>
                <Image style={styles.logo} source={logo} resizeMode="contain" />
                <Text style={styles.title}>Coeus Bookstore</Text>
            </View>

            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <ScrollView showsVerticalScrollIndicator={false}>
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
                        <TouchableOpacity
                            onPress={updatePasswordVisibily}
                            activeOpacity={0.8}
                        >
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
                            onPress={() => {
                                handleLogin()
                            }}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={allowLogin
                                    ? ['#58A1E8', '#5485BE']
                                    : ["#949EA0", "#75777B"]}
                                style={styles.signIn}
                            >
                                <Text style={styles.textSign}>Sign In</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[ styles.signIn, {
                                    marginTop: 10,
                                    borderWidth: 2,
                                    borderColor: '#507DBC',
                                },
                            ]}
                            onPress={() => navigation.navigate("SignUpScreen")}
                            activeOpacity={0.5}
                        >
                            <Text style={[styles.textSign, { color: '#507DBC' }]}>
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
                </ScrollView>
            </Animatable.View>
            <ModalComponent
                title={modalSettings.title}
                body={modalSettings.body}
                isAlert={modalSettings.isAlert}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                acceptAction={() => {navigation.navigate('SignInScreen')}}
                acceptButtonTitle={modalSettings.acceptButtonTitle}
                cancelButtonTitle={modalSettings.cancelButtonTitle}
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        padding: 25,
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 2,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 28,
        paddingVertical: 25,
    },
    logo: {
        width: '55%',
        height: '85%',
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
        color: '#ffffff',
    },
});

export default SignInScreen;
