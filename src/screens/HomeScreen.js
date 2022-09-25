import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {ImageSlider} from 'react-native-image-slider-banner'
import { LinearGradient } from 'expo-linear-gradient';
import { Badge } from "@rneui/themed";

import BookComponent from '../components/BookComponent'
import {books} from '../../_testdata/_data'
import {cart} from '../../_testdata/cart'

const windowWidth = Dimensions.get('window').width;

const HomeScreen = ({ navigation }) => {

    // let [loaded, setLoaded] = useState(false)

    const pruneBadgeNumber = (cant) => {
        if(cant > 99) return "+99"
        return cant
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff'}}>
            <LinearGradient
                colors={['#5485BE', '#507DBC']}
                style={styles.header}
                start={{x: 0.5, y: 1.2}}
            >
                <View style={styles.searchBox}>
                    <Feather
                        name="search"
                        size={20}
                        color="#ffffff"
                        style={{ marginRight: 5 }}
                    />
                    <TouchableOpacity
                        style={{
                            fontSize: 15,
                            padding: 15,
                            width: '90%',
                            justifyContent: "center"
                        }}
                        activeOpacity={0.5}
                    >
                        <Text style={{color: "#ffffff"}}>Search</Text>
                    </TouchableOpacity>
                    {/*<TextInput
                        placeholder="Search"
                        placeholderTextColor="#ffffff"
                        style={{
                            fontSize: 15,
                            height: '100%',
                            width: '90%',
                            color: "#ffffff"
                        }}
                    />*/}
                    <TouchableOpacity
                        onPress={() => navigation.openDrawer()}
                        activeOpacity={0.5}
                    >
                        <ImageBackground
                            source={require('../assets/images/defaultUser.png')}
                            style={{ width: 35, height: 35 }}
                            imageStyle={{ borderRadius: 25 }}
                        />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            {!true ? (
                <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                    <ActivityIndicator size="large"/>
                </View>
            )
            : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ paddingVertical: 15, paddingHorizontal: 10 }}
                >
                    <View
                        style={{
                            marginTop: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text style={{ fontSize: 20, fontWeight: "bold"}}>
                            Upcoming Books
                        </Text>
                    </View>
                    <ImageSlider
                        preview={false}
                        localImg={true}
                        data={[
                            {img: require("../assets/images/defaultBook.png")},
                            {img: require("../assets/images/defaultBook.png")},
                            {img: require("../assets/images/defaultBook.png")},
                            {img: require("../assets/images/defaultBook.png")},
                            {img: require("../assets/images/defaultBook.png")},
                            {img: require("../assets/images/defaultBook.png")},
                            {img: require("../assets/images/defaultBook.png")},
                        ]}
                        autoPlay={true}
                        caroselImageContainerStyle={{
                            width: windowWidth - 30,
                            height: 220,
                            borderRadius: 40,
                            marginRight: 20,
                            marginLeft: 5,
                            marginTop: 15,
                        }}
                        caroselImageStyle={{
                            height: "100%",
                            width: "100%",
                            borderRadius: 20,
                        }}
                    />

                    <View style={styles.section}>
                        <View style={styles.headerSection}>
                            <Text style={{ fontSize: 20, fontWeight: "bold"}}>
                                My Books
                            </Text>
                            <TouchableOpacity>
                                <Feather
                                    name="arrow-right-circle"
                                    size={30}
                                    color="#2C3D55"
                                    style={{ marginRight: 5 }}
                                />
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            {(books.splice(150, 170)).map((book, index) => (
                                <View style={{marginRight: 10}} key={`${index}-t1`}>
                                    <BookComponent
                                        title={book.title}
                                        rating={book.rating}
                                        price={book.price}
                                        bookId={index}
                                        cover={require("../assets/images/defaultBook.png")}
                                        action={() =>
                                            navigation.navigate("BookPreview", {bookData: book})
                                        }
                                    />
                                </View>
                            ))
                            }
                        </ScrollView>
                    </View>
                </ScrollView>
            )}

            <View style={{ position: 'absolute', right: 0, bottom: 0, margin: 25 }}>
                <LinearGradient
                    colors={['#5485BE', '#6B91C8']}
                    style={{borderRadius: 50}}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ShoppingCart")}
                        activeOpacity={0.3}
                    >
                        <Feather
                            name="shopping-cart"
                            size={25}
                            color="white"
                            style={{ padding: 15 }}
                        />
                    </TouchableOpacity>
                    {true && //show if cant of items in the cart is greater than 0
                    <Badge
                        status="error"
                        value={pruneBadgeNumber(cart.items.length)}
                        badgeStyle={{ position: 'absolute', bottom: 38, left: 40 }}
                    />
                    }
                </LinearGradient>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "#507DBC",
        shadowColor: "red"
    },
    searchBox: {
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    section: {
        marginTop: 10,
    },
    headerSection: {
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});

export default HomeScreen;
