import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    Platform,
} from 'react-native';
import { useState, useContext } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import FormData from 'form-data';
import * as ImagePicker from 'expo-image-picker';

import {AuthContext} from '../context/AuthContext'
import UserService from '../service/UserService';
import LoadingComponent from '../components/LoadingComponent';
import ModalComponent from '../components/ModalComponent';
import {generateModalBody, updateStoredData} from '../../utils'
import {APP_HOST} from '../../constants'

const ProfileScreen = ({navigation}) => {

    let {
        userTokens,
        generalUserInfo, setGeneralUserInfo,
        secondaryUserInfo, setSecondaryUserInfo,
    } = useContext(AuthContext)
    let [editGeneralInfo, setEditGeneralInfo] = useState(false)
    let [editSecondaryInfo, setEdiSecondaryInfo] = useState(false)
    let [changingGeneralInfo, setChangingGeneralInfo] = useState(false)
    let [changingSecondaryInfo, setChangingSecondaryInfo] = useState(false)
    let [changingPictureProfile, setChangingPictureProfile] = useState(false)
    let [generalInfo, setGeneralInfo] = useState({
        email: generalUserInfo.email,
        first_name: generalUserInfo.first_name,
        maternal_last_name: generalUserInfo.maternal_last_name,
        paternal_last_name: generalUserInfo.paternal_last_name,
        second_name: generalUserInfo.second_name,
        username: generalUserInfo.username
    })
    let [secondaryInfo, setSecondaryInfo] = useState({
        adress_line_1: secondaryUserInfo.adress_line_1,
        adress_line_2: secondaryUserInfo.adress_line_2,
        city: secondaryUserInfo.city,
        country: secondaryUserInfo.country,
        phone: secondaryUserInfo.phone,
        state_provice_region: secondaryUserInfo.state_provice_region,
        zip_code: secondaryUserInfo.zip_code,
        picture: secondaryUserInfo.picture,
    })

    let [modalVisible, setModalVisible] = useState(false);
    let [modalSettings, setModalSettings] = useState({
        title: '',
        body: '',
        acceptButtonTitle: '',
        cancelButtonTitle: '',
        isAlert: false
    })

    const getFormData = (data) => {
        const form = new FormData()
        const file = data.uri.substring(data.uri.lastIndexOf("/") + 1)
        const fext = file.substring(file.lastIndexOf(".") + 1)

        form.append("picture", {
            uri: data.uri,
            type: `${data.type}/${fext}`,
            name: file
        })

        return form
    }

    const pickImage = async () => {
        try {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') return
            }

            let fileInfo = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
            });
            if (!fileInfo.cancelled) return fileInfo
        } catch (error) {
            console.error(error)
        }
    }

    const updatePictureProfile = async () => {
        try {
            let fileInfo = await pickImage()
            if(!fileInfo) return
            let data =  getFormData(fileInfo)
            setChangingPictureProfile(true)
            let response = await UserService.updatePictureProfile(
                userTokens.access,
                data
            )
            setSecondaryUserInfo((prevState) => ({
                ...prevState,
                picture: response.picture
            }))
            await updateStoredData("userInfo", {
                secondaryUserInfo: {
                    ...secondaryInfo,
                    picture: response.picture
                }
            })
        } catch (error) {
            console.error(error)
        } finally {
            setChangingPictureProfile(false)
        }
    }

    const handleOnChange = (handler, input, value) => {
        value = value.trim()
        handler((prevState) => ({ ...prevState, [input]: value }))
    }

    const restoreInformation = (handler, data) => {
        handler((prevState) => ({ ...prevState, ...data }))
    }

    const allowUpdateGI =
        generalInfo.email.trim().length > 0 &&
        generalInfo.first_name.trim().length > 0 &&
        generalInfo.paternal_last_name.trim().length > 0 &&
        generalInfo.username.trim().length > 0

    const allowUpdateSI =
        secondaryInfo.adress_line_1.trim().length > 0 &&
        secondaryInfo.adress_line_2.trim().length > 0 &&
        secondaryInfo.city.trim().length > 0 &&
        secondaryInfo.country.trim().length > 0 &&
        secondaryInfo.phone.trim().length > 0 &&
        secondaryInfo.state_provice_region.trim().length > 0 &&
        secondaryInfo.zip_code.trim().length > 0

    const setUpModalSettings = (data) => {
        let body = generateModalBody(data)
        setModalSettings({
            ...modalSettings,
            title: "Error",
            body: body,
            cancelButtonTitle: "Okay",
            isAlert: true
        })
    }

    const updateGeneralInfo = async () => {
        try {
            setChangingGeneralInfo(true)
            let response = await UserService.updateGeneralInfo(
                userTokens.access,
                generalInfo
            )
            setGeneralInfo((prevState) => ({ ...prevState, ...response }))
            setGeneralUserInfo((prevState) => ({ ...prevState, ...response }))
            await updateStoredData("userInfo", { generalUserInfo: generalInfo})
        } catch (error) {
            let responseItems = Object.entries(error.response.data)
            setUpModalSettings(responseItems)
            setModalVisible(true)
            restoreInformation(setGeneralInfo, generalUserInfo)

        } finally {
            setChangingGeneralInfo(false)
            setEditGeneralInfo(false)
        }
    }

    const updateSecondaryInfo = async () => {
        try {
            setChangingSecondaryInfo(true)
            let {picture, ...sInfo } = secondaryInfo
            let response = await UserService.updateContactLocationInfo(
                userTokens.access,
                sInfo
            )
            setSecondaryInfo((prevState) => ({ ...prevState, ...response }))
            setSecondaryUserInfo((prevState) => ({ ...prevState, ...response }))
            await updateStoredData("userInfo", {secondaryUserInfo: secondaryInfo})
        } catch (error) {
            let responseItems = Object.entries(error.response.data)
            setUpModalSettings(responseItems)
            setModalVisible(true)
            restoreInformation(setSecondaryInfo, secondaryUserInfo)

        } finally {
            setChangingSecondaryInfo(false)
            setEdiSecondaryInfo(false)
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <LinearGradient
                colors={['#5485BE', '#507DBC', '#5B7FB2']}
                start={{x: 0.6, y: 1.2}}
            >
                <View style={{marginLeft: 15, marginTop: 15}}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={navigation.goBack}
                    >
                        <Feather
                            name="arrow-left-circle"
                            size={35}
                            color="lightgrey"
                        />
                    </TouchableOpacity>
                </View>
                <View style={{
                    paddingBottom: 20,
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onLongPress={updatePictureProfile}
                    >
                        <LoadingComponent
                            isLoading={changingPictureProfile}
                            style={{
                                backgroundColor: "#E9EBE9",
                                opacity: 0.5,
                                borderRadius: 100,
                            }}
                        >
                            <Image
                                source={secondaryUserInfo.picture
                                    ? {uri: `${APP_HOST}${secondaryUserInfo.picture}`}
                                    : require("../assets/images/defaultUser.png")
                                }
                                style={styles.pictureProfile}
                            />
                        </LoadingComponent>
                    </TouchableOpacity>
                    <Text style={{
                        marginTop: 10,
                        fontWeight: "bold",
                        fontSize: 25,
                        color: "#ffffff",
                    }}
                    >{generalUserInfo.first_name} {generalUserInfo.paternal_last_name}</Text>
                    <Text style={{
                        fontSize: 16,
                        color: "#D4D8D9",
                    }}
                    >@{generalUserInfo.username}</Text>
                </View>
            </LinearGradient>

            <View style={{padding: 10, marginTop: 5, marginBottom: 15}}>
                <LoadingComponent
                    isLoading={changingGeneralInfo}
                    style={{
                        backgroundColor: "#E9EBE9",
                        opacity: 0.5,
                        borderRadius: 10,
                    }}
                >
                    <View>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}
                            >General Information</Text>
                            <TouchableOpacity
                                onPress={() => setEditGeneralInfo(true)}
                            >
                                <Text style={{
                                    fontStyle: "italic",
                                    textDecorationLine: "underline",
                                    color: "#507DBC"
                                }}
                                >Edit</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 15,
                            }}>
                                <Text style={styles.textInputLabel}>Username</Text>
                                <TextInput
                                    style={styles.textInput}
                                    defaultValue={generalInfo.username}
                                    placeholder={"Your username"}
                                    onChangeText={(value) =>
                                        handleOnChange(
                                            setGeneralInfo,
                                            "username",
                                            value
                                        )
                                    }
                                    editable={editGeneralInfo}
                                />
                            </View>

                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 10,
                            }}>
                                <Text style={styles.textInputLabel}>Email</Text>
                                <TextInput
                                    style={styles.textInput}
                                    defaultValue={generalInfo.email}
                                    placeholder={"Your email"}
                                    onChangeText={(value) =>
                                        handleOnChange(
                                            setGeneralInfo,
                                            "email",
                                            value
                                        )
                                    }
                                    editable={editGeneralInfo}
                                />
                            </View>

                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 10,
                            }}>
                                <Text style={styles.textInputLabel}>First Name</Text>
                                <TextInput
                                    style={styles.textInput}
                                    defaultValue={generalInfo.first_name}
                                    placeholder={"Your first name"}
                                    onChangeText={(value) =>
                                        handleOnChange(
                                            setGeneralInfo,
                                            "first_name",
                                            value
                                        )
                                    }
                                    editable={editGeneralInfo}
                                />
                            </View>

                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 10,
                            }}>
                                <Text style={styles.textInputLabel}>Second Name</Text>
                                <TextInput
                                    style={styles.textInput}
                                    defaultValue={generalInfo.second_name}
                                    placeholder={"Your second name"}
                                    onChangeText={(value) =>
                                        handleOnChange(
                                            setGeneralInfo,
                                            "second_name",
                                            value
                                        )
                                    }
                                    editable={editGeneralInfo}
                                />
                            </View>

                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginVertical: 10
                            }}>
                                <Text style={styles.textInputLabel}>Paternal Last Name</Text>
                                <TextInput
                                    style={styles.textInput}
                                    defaultValue={generalInfo.paternal_last_name}
                                    placeholder={"Your paternal last name"}
                                    onChangeText={(value) =>
                                        handleOnChange(
                                            setGeneralInfo,
                                            "paternal_last_name",
                                            value
                                        )
                                    }
                                    editable={editGeneralInfo}
                                />
                            </View>

                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                                <Text style={styles.textInputLabel}>Maternal Last Name</Text>
                                <TextInput
                                    style={styles.textInput}
                                    defaultValue={generalInfo.maternal_last_name}
                                    placeholder={"Your maternal last name"}
                                    onChangeText={(value) =>
                                        handleOnChange(
                                            setGeneralInfo,
                                            "maternal_last_name",
                                            value
                                        )
                                    }
                                    editable={editGeneralInfo}
                                />
                            </View>
                        </View>

                        {editGeneralInfo &&
                        <View style={styles.bottonsContainer}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={updateGeneralInfo}
                                disabled={!allowUpdateGI}
                            >
                                <LinearGradient
                                    colors={allowUpdateGI
                                        ? ['#58A1E8', '#5485BE']
                                        : ["#949EA0", "#75777B"]}
                                    style={[styles.button, {
                                        flexDirection: "row",
                                        alignItems: "center",
                                        padding: 10,
                                        justifyContent: "center"
                                    }]}
                                >
                                    <Feather
                                        name="save"
                                        color="#ffffff"
                                        size={15}
                                    />
                                    <Text style={{
                                        color: "#ffffff",
                                        fontWeight: "bold",
                                        marginLeft: 5
                                    }}>Save</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={{marginLeft: 10}}
                                onPress={() => {
                                    restoreInformation(setGeneralInfo, generalUserInfo)
                                    setEditGeneralInfo(false)
                                }}
                            >
                                <LinearGradient
                                    colors={['#CF0F08', '#B82722']}
                                    style={[styles.button, {
                                        flexDirection: "row",
                                        alignItems: "center",
                                        padding: 10,
                                        justifyContent: "center"
                                    }]}
                                >
                                    <Feather
                                        name="x-circle"
                                        color="#ffffff"
                                        size={15}
                                    />
                                    <Text style={{
                                        color: "#ffffff",
                                        fontWeight: "bold",
                                        marginLeft: 5
                                    }}>Cancel</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        }
                    </View>
                </LoadingComponent>

                <LoadingComponent
                    isLoading={changingSecondaryInfo}
                    style={{
                        backgroundColor: "#E9EBE9",
                        opacity: 0.5,
                        borderRadius: 10,
                    }}
                >
                    <View style={{marginTop: 25}}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}
                            >Contact & Location</Text>
                            <TouchableOpacity
                                onPress={() => setEdiSecondaryInfo(true)}
                            >
                                <Text style={{
                                    fontStyle: "italic",
                                    textDecorationLine: "underline",
                                    color: "#507DBC"
                                }}
                                >Edit</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 15,
                            }}>
                                <Text style={styles.textInputLabel}>Adress Line 1</Text>
                                <TextInput
                                    style={styles.textInput}
                                    defaultValue={secondaryInfo.adress_line_1}
                                    placeholder={"Adress line 1"}
                                    onChangeText={(value) =>
                                        handleOnChange(
                                            setSecondaryInfo,
                                            "adress_line_1",
                                            value
                                        )
                                    }
                                    editable={editSecondaryInfo}
                                />
                            </View>

                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 10,
                            }}>
                                <Text style={styles.textInputLabel}>Adress Line 2</Text>
                                <TextInput
                                    style={styles.textInput}
                                    defaultValue={secondaryInfo.adress_line_2}
                                    placeholder={"Adress line 2"}
                                    onChangeText={(value) =>
                                        handleOnChange(
                                            setSecondaryInfo,
                                            "adress_line_2",
                                            value
                                        )
                                    }
                                    editable={editSecondaryInfo}
                                />
                            </View>

                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 10,
                            }}>
                                <Text style={styles.textInputLabel}>Country</Text>
                                <TextInput
                                    style={styles.textInput}
                                    defaultValue={secondaryInfo.country}
                                    placeholder={"Country"}
                                    onChangeText={(value) =>
                                        handleOnChange(
                                            setSecondaryInfo,
                                            "country",
                                            value
                                        )
                                    }
                                    editable={editSecondaryInfo}
                                />
                            </View>

                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 10,
                            }}>
                                <Text style={styles.textInputLabel}>City</Text>
                                <TextInput
                                    style={styles.textInput}
                                    defaultValue={secondaryInfo.city}
                                    placeholder={"City"}
                                    onChangeText={(value) =>
                                        handleOnChange(
                                            setSecondaryInfo,
                                            "city",
                                            value
                                        )
                                    }
                                    editable={editSecondaryInfo}
                                />
                            </View>

                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 10,
                            }}>
                                <Text style={styles.textInputLabel}>State/Province</Text>
                                <TextInput
                                    style={styles.textInput}
                                    defaultValue={secondaryInfo.state_provice_region}
                                    placeholder={"State/Province/Region"}
                                    onChangeText={(value) =>
                                        handleOnChange(
                                            setSecondaryInfo,
                                            "state_provice_region",
                                            value
                                        )
                                    }
                                    editable={editSecondaryInfo}
                                />
                            </View>

                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginVertical: 10
                            }}>
                                <Text style={styles.textInputLabel}>Zip Code</Text>
                                <TextInput
                                    style={styles.textInput}
                                    defaultValue={secondaryInfo.zip_code}
                                    placeholder={"Zip code"}
                                    onChangeText={(value) =>
                                        handleOnChange(
                                            setSecondaryInfo,
                                            "zip_code",
                                            value
                                        )
                                    }
                                    editable={editSecondaryInfo}
                                />
                            </View>

                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                                <Text style={styles.textInputLabel}>Phone</Text>
                                <TextInput
                                    style={styles.textInput}
                                    defaultValue={secondaryInfo.phone}
                                    placeholder={"Your phone"}
                                    onChangeText={(value) =>
                                        handleOnChange(
                                            setSecondaryInfo,
                                            "phone",
                                            value
                                        )
                                    }
                                    editable={editSecondaryInfo}
                                />
                            </View>
                        </View>

                        {editSecondaryInfo &&
                        <View style={styles.bottonsContainer}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={updateSecondaryInfo}
                                disabled={!allowUpdateSI}
                            >
                                <LinearGradient
                                    colors={allowUpdateSI
                                        ? ['#58A1E8', '#5485BE']
                                        : ["#949EA0", "#75777B"]}
                                    style={[styles.button, {
                                        flexDirection: "row",
                                        alignItems: "center",
                                        padding: 10,
                                        justifyContent: "center"
                                    }]}
                                >
                                    <Feather
                                        name="save"
                                        color="#ffffff"
                                        size={15}
                                    />
                                    <Text style={{
                                        color: "#ffffff",
                                        fontWeight: "bold",
                                        marginLeft: 5
                                    }}>Save</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={{marginLeft: 10}}
                                onPress={() => {
                                    restoreInformation(setSecondaryInfo, secondaryUserInfo)
                                    setEdiSecondaryInfo(false)
                                }}
                            >
                                <LinearGradient
                                    colors={['#CF0F08', '#B82722']}
                                    style={[styles.button, {
                                        flexDirection: "row",
                                        alignItems: "center",
                                        padding: 10,
                                        justifyContent: "center"
                                    }]}
                                >
                                    <Feather
                                        name="x-circle"
                                        color="#ffffff"
                                        size={15}
                                    />
                                    <Text style={{
                                        color: "#ffffff",
                                        fontWeight: "bold",
                                        marginLeft: 5
                                    }}>Cancel</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        }
                    </View>
                </LoadingComponent>
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
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    pictureProfile: {
        width: 130,
        height: 130,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "#ffffff",

    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#363636"
    },
    textInput: {
        borderBottomWidth: 1,
        borderColor: "#C2C1C6",
        width: "100%",
        flex: 1,
        marginLeft: 10,
    },
    textInputLabel: {
        fontWeight: "500",
        fontSize: 16
    },
    button: {
        padding: 8,
        borderRadius: 40
    },
    bottonsContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#B5BCBE',
    }
})

export default ProfileScreen;
