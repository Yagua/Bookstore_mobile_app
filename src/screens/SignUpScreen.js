import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    Platform,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';

import ModalComponent from '../components/ModalComponent'

const SignUpScreen = ({navigation}) => {
    let [username, setUserName] = useState('');
    let [firstName, setFirstName] = useState('');
    let [secondName, setSecondName] = useState('');
    let [paternalLastName, setPaternalLastName] = useState('');
    let [maternalLastName, setMaterenalLastName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');

    let [visiblePassword, setVisiblePassword] = useState(false);
    let [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
    let [modalVisible, setModalVisible] = useState(false);
    let [modalSettings, setModalSettings] = useState({
        title: '',
        body: '',
        acceptButtonTitle: '',
        cancelButtonTitle: '',
        isAlert: false
    })

    let data = {
        username: username,
        firstName: firstName,
        secondName: secondName,
        paternalLastName: paternalLastName,
        maternalLastName: maternalLastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
    }

    let allowRegister =
        username.trim().length > 0 &&
        firstName.trim().length > 0 &&
        secondName.trim().length > 0 &&
        paternalLastName.trim().length > 0 &&
        maternalLastName.trim().length > 0 &&
        email.trim().length > 0 &&
        password.length > 0 &&
        confirmPassword.length > 0

    const checkFormValues = () => {
        for(let key in data) {
            if(data[key].length > 0) return false
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
        if(formEmpty) navigation.navigate("SignInScreen")
        else setModalVisible(true)
    }

    const signUp = () => {
        if(data.password !== data.confirmPassword) {
            setModalSettings({
                ...modalSettings,
                title: "Alert",
                body: "The given passwords do not match.",
                cancelButtonTitle: "Okay",
                isAlert: true
            })
            setModalVisible(true)
            return
        }
        console.log("well")
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="default" />
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={goBack}
                >
                    <FontAwesome
                        name="chevron-circle-left"
                        size={30}
                        color="#DAE3E5"
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
                            onChangeText={(value) => setUserName(value)}
                        />
                    </View>

                    <Text style={styles.text_footer}>First Name</Text>
                    <View style={styles.action}>
                        <FontAwesome name="pencil-square-o" size={20} color="#1E2533" />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Your first name"
                            onChangeText={(value) => setFirstName(value)}
                        />
                    </View>

                    <Text style={styles.text_footer}>Second Name</Text>
                    <View style={styles.action}>
                        <FontAwesome name="pencil-square-o" size={20} color="#1E2533" />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Your second name (Opt)"
                            onChangeText={(value) => setSecondName(value)}
                        />
                    </View>

                    <Text style={styles.text_footer}>Paternal Last Name</Text>
                    <View style={styles.action}>
                        <FontAwesome name="pencil-square-o" size={20} color="#1E2533" />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Your paternal last name"
                            onChangeText={(value) => setPaternalLastName(value)}
                        />
                    </View>

                    <Text style={styles.text_footer}>Maternal Last Name</Text>
                    <View style={styles.action}>
                        <FontAwesome name="pencil-square-o" size={20} color="#1E2533" />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Your maternal last name (Opt)"
                            onChangeText={(value) => setMaterenalLastName(value)}
                        />
                    </View>

                    <Text style={styles.text_footer}>Email</Text>
                    <View style={styles.action}>
                        <FontAwesome name="envelope-o" size={20} color="#1E2533" />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Your email"
                            onChangeText={(value) => setEmail(value)}
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
                            onChangeText={(value) => setPassword(value)}
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
                            onChangeText={(value) => setConfirmPassword(value)}
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
                            disabled={!allowRegister}
                            onPress={signUp}
                        >
                            <LinearGradient
                                colors={allowRegister
                                    ? ['#58A1E8', '#5485BE']
                                    : ["#829193", "#75777B"]}
                                style={styles.signIn}
                            >
                                <Text style={styles.textSign}>Sign Up</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[ styles.signIn, {
                                    marginVertical: 10,
                                    borderWidth: 2,
                                    borderColor: '#5485BE',
                                },
                            ]}
                            onPress={goBack}
                        >
                            <Text style={[styles.textSign, { color: '#5485BE' }]}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 30
    },
    footer: {
        flex: 4,
        backgroundColor: '#DAE3E5',
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
        color: '#DAE3E5',
    },
});

export default SignUpScreen;
