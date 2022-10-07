import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    ActivityIndicator
} from 'react-native';
import { useState, useEffect, useContext } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';

import UserService from '../service/UserService'
import {AuthContext} from '../context/AuthContext'
import {APP_HOST} from '../../constants'
import {profile} from '../../_testdata/profile'

const ProfileScreen = ({navigation}) => {

    let {userTokens} = useContext(AuthContext)
    let [editGeneralInfo, setEditGeneralInfo] = useState(false)
    let [editSecondaryInfo, setEdiSecondaryInfo] = useState(false)
    let [isLoading, setIsLoading] = useState(false)
    let [generalInfo, setGeneralInfo] = useState({
        email: "",
        first_name: "",
        maternal_last_name: "",
        paternal_last_name: "",
        second_name: "",
        username: "",
    })
    let [secondaryInfo, setSecondaryInfo] = useState({
        adress_line_1: "",
        adress_line_2: "",
        city: "",
        country: "",
        phone: "",
        state_provice_region: "",
        zip_code: "",
        picture: null,
    })

    useEffect(() => {
        setIsLoading(true)
        UserService.getUserProfile(userTokens.access)
            .then(response => {
                let {user, ...secondaryInformation} = response
                setGeneralInfo((prevState) => ({
                    ...prevState,
                    email: user.email,
                    first_name: user.first_name,
                    maternal_last_name: user.maternal_last_name,
                    paternal_last_name: user.paternal_last_name,
                    second_name: user.second_name,
                    username: user.username,
                }))
                setSecondaryInfo((prevState) => ({
                    ...prevState,
                    adress_line_1: secondaryInformation.adress_line_1,
                    adress_line_2: secondaryInformation.adress_line_2,
                    city: secondaryInformation.city,
                    country: secondaryInformation.country,
                    phone: secondaryInformation.phone,
                    state_provice_region: secondaryInformation.state_provice_region,
                    zip_code: secondaryInformation.zip_code,
                    picture: secondaryInformation.picture,
                }))
                setIsLoading(false)
            })
            .catch(error => console.error(error))
    }, [])

    if(isLoading){
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large"/>
            </View>
        );
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
                    >
                        <Image
                            source={secondaryInfo.picture
                                ? {uri: `${APP_HOST}${secondaryInfo.picture}`}
                                : require("../assets/images/defaultUser.png")
                            }
                            style={styles.pictureProfile}
                        />
                    </TouchableOpacity>
                    <Text style={{
                        marginTop: 10,
                        fontWeight: "bold",
                        fontSize: 25,
                        color: "#ffffff",
                    }}
                    >{generalInfo.first_name} {generalInfo.paternal_last_name}</Text>
                    <Text style={{
                        fontSize: 16,
                        color: "#D4D8D9",
                    }}
                    >@{generalInfo.username}</Text>
                </View>
            </LinearGradient>

            <View style={{padding: 10, marginTop: 5, marginBottom: 15}}>
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
                                editable={editGeneralInfo}
                            />
                        </View>
                    </View>

                    {editGeneralInfo &&
                    <View style={styles.bottonsContainer}>
                        <TouchableOpacity activeOpacity={0.7}>
                            <LinearGradient
                                colors={['#58A1E8', '#5485BE']}
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
                            onPress={() => setEditGeneralInfo(false)}
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
                                defaultValue={secondaryInfo.state_province_region}
                                placeholder={"State/Province/Region"}
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
                                editable={editSecondaryInfo}
                            />
                        </View>
                    </View>

                    {editSecondaryInfo &&
                    <View style={styles.bottonsContainer}>
                        <TouchableOpacity activeOpacity={0.7}>
                            <LinearGradient
                                colors={['#58A1E8', '#5485BE']}
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
                            onPress={() => setEdiSecondaryInfo(false)}
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
