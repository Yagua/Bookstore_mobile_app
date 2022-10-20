import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    TextInput,
    ActivityIndicator
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useState } from 'react';

import UserService from '../service/UserService'
import ModalComponent from '../components/ModalComponent';
import {generateModalBody} from '../../utils'

const RestorePasswordScreen = ({ navigation }) => {
    let [isLoading, setIsLoading] = useState(false)
    let [modalVisible, setModalVisible] = useState(false)
    let [emailInput, setEmailInput] = useState(null)
    let [payload, setPayload] = useState({
        email: ''
    })
    let [modalSettings, setModalSettings] = useState({
        title: '',
        body: '',
        acceptButtonTitle: '',
        cancelButtonTitle: '',
        isAlert: false
    })

    let allowRestorePsswd = payload.email.trim().length > 0

    const restorePassword = async () => {
        setModalSettings({
            ...modalSettings,
            title: '',
            body: '',
            cancelButtonTitle: 'Okay',
            isAlert: true
        })

        if(!payload.email.match(/^\S+(.\S+)?@\S+.\S+$/)) {
            setModalSettings((prevState) => ({
                ...prevState,
                title: "Error",
                body: "The given email has an incorrect format."
            }))
            setModalVisible(true)
            return
        }

        try {
            setIsLoading(true)
            await UserService.restoreUserPassword(payload)
            setModalSettings((prevState) => ({
                ...prevState,
                title: "Info",
                body: `An email has been sent to "${payload.email}" to reset your password.`
            }))
            setModalVisible(true)
            emailInput.clear()
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
                    ...prevState,
                    title: "Error",
                    body: generateModalBody(responseItems)
                }))
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <LinearGradient
            style={styles.container}
            colors={['#507DBC', '#5485BE']}
            start={{ x: 1.2, y: 0.1 }}
        >
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

            <StatusBar barStyle="default" />
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={navigation.goBack}
                    activeOpacity={0.5}
                    disabled={isLoading}
                >
                    <FontAwesome
                        name="chevron-circle-left"
                        size={30}
                        color="#ffffff"
                    />
                </TouchableOpacity>
                <Text style={styles.title}>Restore Password</Text>
            </View>

            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <View style={{marginTop: 20}}>
                    <Text style={styles.text_footer}>User Email</Text>
                    <View style={styles.action}>
                        <FontAwesome name="envelope-o" size={20} color="#1E2533" />
                        <TextInput
                            style={styles.textInput}
                            ref={input => setEmailInput(input)}
                            placeholder="Your email"
                            textContentType="emailAddress"
                            onChangeText={(value) => {
                                setPayload({email: value.trim()})
                            }}
                        />
                    </View>

                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            disabled={!allowRestorePsswd || isLoading}
                            onPress={!isLoading ? restorePassword : null}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={ allowRestorePsswd
                                        ? ['#58A1E8', '#5485BE']
                                        : ['#829193', '#75777B']
                                }
                                style={styles.signIn}
                            >
                                {isLoading ? (
                                    <ActivityIndicator size="large" />
                                ) : (
                                    <Text style={styles.textSign}>Confirm</Text>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.signIn,
                                {
                                    marginVertical: 10,
                                    borderWidth: 2,
                                    borderColor: '#507DBC',
                                },
                            ]}
                            onPress={navigation.goBack}
                            disabled={isLoading}
                            activeOpacity={0.5}
                        >
                            <Text
                                style={[styles.textSign, { color: '#507DBC' }]}
                            >
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animatable.View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 30,
    },
    footer: {
        flex: 4,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 28,
        paddingVertical: 10,
    },
    title: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 30,
        marginLeft: 13,
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        marginTop: 20,
    },
    action: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 15,
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

export default RestorePasswordScreen;
