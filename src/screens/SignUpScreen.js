import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    Platform,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import * as Animatable from 'react-native-animatable';

import ModalComponent from '../components/ModalComponent'
import UserService from '../service/UserService'

const SignUpScreen = ({navigation}) => {
    let [visiblePassword, setVisiblePassword] = useState(false);
    let [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
    let [isLoading, setIsLoading] = useState(false)
    let [disableGoBack, setDisableGoBack] = useState(false)
    let [modalVisible, setModalVisible] = useState(false);
    let [userData, setUserData] = useState({
        username: '',
        first_name: '',
        second_name: '',
        paternal_last_name: '',
        maternal_last_name: '',
        email: '',
        password: '',
        re_password: '',
    })
    let [modalSettings, setModalSettings] = useState({
        title: '',
        body: '',
        acceptButtonTitle: '',
        cancelButtonTitle: '',
        isAlert: false
    })

    const handleOnChange = (input, value) => {
        value = input === "password" || input === "re_password"
            ? value
            : value.trim()
        setUserData((prevState) => ({...prevState, [input]: value}))
    }

    let allowRegister =
        userData.username.trim().length > 0 &&
        userData.first_name.trim().length > 0 &&
        userData.paternal_last_name.trim().length > 0 &&
        userData.email.trim().length > 0 &&
        userData.password.length > 0 &&
        userData.re_password.length > 0

    const checkFormValues = () => {
        for(let key in userData) {
            if(userData[key].length > 0) return false
        }
        return true
    }

    const goBack = () => {
        setModalSettings({
            ...modalSettings,
            title: "Caution",
            body: "You will lose all data entered so far. Do you want to continue?",
            acceptButtonTitle: "Accept",
            cancelButtonTitle: "Cancel",
            isAlert: false
        })
        let formEmpty = checkFormValues()
        formEmpty ? navigation.navigate("SignInScreen") : setModalVisible(true)
    }

    const validateFields = () => {
        let errors = {}
        if(!userData.email.match(/^\S+.\S+@\S+.\S+$/)) {
            errors.email = "The email has an incorrect format"
        }
        if(userData.password !== userData.re_password) {
            errors.password = "The passwords do not match"
        }
        if(userData.username.match(/[^\S]/)) {
            errors.username = "The username should be a single word"
        } else if(userData.username.length > 10) {
            errors.username = "The user name must not exceed 10 characters in length"
        }
        return errors
    }

    const signUp = async () => {

        setModalSettings({
            ...modalSettings,
            title: "Error",
            body: '',
            cancelButtonTitle: "Okay",
            isAlert: true
        })

        const generateModalBody = (data) => {
            let result = ""
            data.map(([key, value], index) => {
                let title = `[${key.toUpperCase()}]`
                let body = typeof value !== "string" ? value.join(" ") : value
                result += `${title}\n${body}`
                if(index !== data.length - 1) result += "\n\n"
            })
            return result
        }

        let errors = Object.entries(validateFields())
        if(errors.length > 0) {
            setModalSettings((prevState) => ({
                ...prevState, body: generateModalBody(errors)
            }))
            setModalVisible(true)
            return
        }

        try {
            setDisableGoBack(true)
            setIsLoading(true)
            await UserService.createNewUser(userData)
            navigation.navigate("SignInScreen")
        } catch (error) {
            console.error(error)
            if(error.code === "ERR_NETWORK") {
                setModalSettings((prevState) => ({
                    ...prevState, body: "Network Error"
                }))
                return
            } else {
                let responseItems = Object.entries(error.response.data)
                setModalSettings((prevState) => ({
                    ...prevState, body: generateModalBody(responseItems)
                }))
            }
            setModalVisible(true)
        } finally {
            setDisableGoBack(false)
            setIsLoading(false)
        }
    }

    return (
        <LinearGradient
            style={styles.container}
            colors={['#507DBC', '#5485BE']}
            start={{x: 1.2, y: 0.1}}
        >
            <StatusBar barStyle="default" />
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={goBack}
                    activeOpacity={0.5}
                >
                    <FontAwesome
                        name="chevron-circle-left"
                        size={30}
                        color="#ffffff"
                    />
                </TouchableOpacity>
                <Text style={styles.title}>
                    Register Now!
                </Text>
            </View>

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

            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.text_footer}>Username</Text>
                    <View style={styles.action}>
                        <FontAwesome name="at" size={20} color="#1E2533" />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Your username"
                            onChangeText={(value) => handleOnChange("username", value)}
                        />
                    </View>

                    <Text style={styles.text_footer}>First Name</Text>
                    <View style={styles.action}>
                        <FontAwesome name="pencil-square-o" size={20} color="#1E2533" />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Your first name"
                            onChangeText={(value) => handleOnChange("first_name", value)}
                        />
                    </View>

                    <Text style={styles.text_footer}>Second Name</Text>
                    <View style={styles.action}>
                        <FontAwesome name="pencil-square-o" size={20} color="#1E2533" />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Your second name (Opt)"
                            onChangeText={(value) => handleOnChange("second_name", value)}
                        />
                    </View>

                    <Text style={styles.text_footer}>Paternal Last Name</Text>
                    <View style={styles.action}>
                        <FontAwesome name="pencil-square-o" size={20} color="#1E2533" />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Your paternal last name"
                            onChangeText={(value) => handleOnChange("paternal_last_name", value)}
                        />
                    </View>

                    <Text style={styles.text_footer}>Maternal Last Name</Text>
                    <View style={styles.action}>
                        <FontAwesome name="pencil-square-o" size={20} color="#1E2533" />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Your maternal last name (Opt)"
                            onChangeText={(value) => handleOnChange("maternal_last_name", value)}
                        />
                    </View>

                    <Text style={styles.text_footer}>Email</Text>
                    <View style={styles.action}>
                        <FontAwesome name="envelope-o" size={20} color="#1E2533" />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Your email"
                            onChangeText={(value) => handleOnChange("email", value)}
                        />
                    </View>

                    <Text style={styles.text_footer}>
                        Password
                    </Text>
                    <View style={styles.action}>
                        <FontAwesome name="lock" size={20} color="#1E2533" />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Your password"
                            secureTextEntry={!visiblePassword}
                            onChangeText={(value) => handleOnChange("password", value)}
                        />
                        <TouchableOpacity onPress={() => {
                            setVisiblePassword(!visiblePassword)
                        }}>
                            {visiblePassword ? (
                                <Feather name="eye" size={15} color="#1E2533" />
                            ) : (
                                <Feather name="eye-off" size={15} color="#1E2533" />
                            )}
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.text_footer}>
                        Confirm Password
                    </Text>
                    <View style={[styles.action, {marginBottom: 20}]}>
                        <FontAwesome name="lock" size={20} color="#1E2533" />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Confirm password"
                            secureTextEntry={!visibleConfirmPassword}
                            onChangeText={(value) => handleOnChange("re_password", value)}
                        />
                        <TouchableOpacity onPress={() => {
                            setVisibleConfirmPassword(!visibleConfirmPassword)
                        }}>
                            {visibleConfirmPassword ? (
                                <Feather name="eye" size={15} color="#1E2533" />
                            ) : (
                                <Feather name="eye-off" size={15} color="#1E2533" />
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.button}>
                        <TouchableOpacity style={styles.signIn}
                            disabled={!allowRegister || disableGoBack}
                            onPress={!isLoading ? signUp : null}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={allowRegister
                                    ? ['#58A1E8', '#5485BE']
                                    : ["#829193", "#75777B"]}
                                style={styles.signIn}
                            >
                                {isLoading ?
                                    <ActivityIndicator size="large"/>
                                    :
                                    <Text style={styles.textSign}>Sign Up</Text>
                                }
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[ styles.signIn, {
                                    marginVertical: 10,
                                    borderWidth: 2,
                                    borderColor: '#507DBC',
                                },
                            ]}
                            disabled={disableGoBack}
                            onPress={goBack}
                            activeOpacity={0.5}
                        >
                            <Text style={[styles.textSign, { color: '#507DBC' }]}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 30
    },
    footer: {
        flex: 4,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 28,
        paddingVertical: 10,
    },
    logo: {
        width: '100%',
        height: '80%',
    },
    title: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 30,
        marginLeft: 25,
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

export default SignUpScreen;
