import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';

import { cart } from '../../_testdata/cart';
import { trimText } from '../../utils';

const ShoppingCartScreen = ({ navigation }) => {

    let [bookQty, setBookQty] = useState(1)

    const handleQuantity = (action) => {
        if(action === "+") {
            setBookQty(bookQty + 1)
        } else if(action === "-") {
            bookQty > 1 ? setBookQty(bookQty - 1) : setBookQty(1)
        }
    }

    return (
        <>
            <View style={styles.container}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 15
                }}>
                    <View>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={navigation.goBack}
                        >
                            <Feather
                                name="arrow-left-circle"
                                size={35}
                                color="gray"
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={{
                        marginLeft: 20,
                        fontWeight: "bold",
                        fontSize: 18
                    }}
                    >Shopping Cart Items</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        {cart.items.map((item, index) => (
                            <View
                                style={[styles.cardContainer, {alignItems: "center"}]}
                                key={index}
                            >
                                <View>
                                    <Image
                                        source={require('../assets/images/defaultBook.png')}
                                        style={styles.bookImage}
                                    />
                                </View>
                                <View style={{ paddingLeft: 8, paddingRight: 5, flex: 1 }}>
                                    <Text
                                        style={{
                                            fontSize: 17,
                                            fontWeight: 'bold',
                                            marginBottom: 5,
                                        }}
                                    >
                                        {trimText(item.book.title, 20)}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            marginBottom: 5
                                        }}
                                    >Total: ${item.quantity * item.book.price}</Text>
                                    <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: "500",
                                        }}
                                        >Qty: </Text>
                                        <TouchableOpacity
                                            onPress={() => {handleQuantity("-")}}
                                            activeOpacity={0.6}
                                            style={{
                                                borderWidth: 1,
                                                borderColor: '#cccccc',
                                                padding: 5
                                            }}
                                        >
                                            <Feather
                                                name="minus"
                                                color="#507DBC"
                                                size={20}
                                            />
                                        </TouchableOpacity>

                                        <Text style={{
                                            borderTopWidth: 1,
                                            borderBottomWidth: 1,
                                            borderColor: '#cccccc',
                                            paddingVertical: 4,
                                            paddingHorizontal: 20,
                                            color: 'grey',
                                            fontSize: 17,
                                        }}>{bookQty}</Text>

                                        <TouchableOpacity
                                            onPress={() => {handleQuantity("+")}}
                                            activeOpacity={0.6}
                                            style={{
                                                borderWidth: 1,
                                                borderColor: '#cccccc',
                                                padding: 5
                                            }}
                                        >
                                            <Feather
                                                name="plus"
                                                color="#507DBC"
                                                size={20}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flexDirection: "row"}}>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                        >
                                            <LinearGradient
                                                colors={['#58A1E8', '#5485BE']}
                                                style={[styles.button, {
                                                    marginRight: 8,
                                                    marginVertical: 15,
                                                    flexDirection: "row",
                                                    alignItems: "center"
                                                }]}
                                            >
                                                <Feather
                                                    name="shopping-bag"
                                                    color="#ffffff"
                                                    size={15}
                                                />
                                                <Text style={{
                                                    color: "#ffffff",
                                                    fontWeight: "bold",
                                                    marginLeft: 5
                                                }}>Buy Now</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                        >
                                            <LinearGradient
                                                colors={['#CF0F08', '#B82722']}
                                                style={[styles.button, {
                                                    marginRight: 8,
                                                    marginVertical: 15,
                                                    flexDirection: "row",
                                                    alignItems: "center"
                                                }]}
                                            >
                                                <Feather
                                                    name="trash-2"
                                                    color="#ffffff"
                                                    size={15}
                                                />
                                                <Text style={{
                                                    color: "#ffffff",
                                                    fontWeight: "bold",
                                                    marginLeft: 5
                                                }}>Drop</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))
                        }
                    </View>
                    <View style={{marginBottom: 145}}></View>
                </ScrollView>
            </View>
            <View style={styles.floatingCard}>
                <Text
                    style={{
                        marginBottom: 5,
                        fontSize: 16
                    }}
                >Total order: $1</Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                        position: "relative",
                        width: "70%"
                    }}
                >
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
                            name="shopping-bag"
                            color="#ffffff"
                            size={15}
                        />
                        <Text style={{
                            color: "#ffffff",
                            fontWeight: "bold",
                            marginLeft: 5
                        }}>Continue Purchase</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    cardContainer: {
        padding: 8,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#B5BCBE',
        flexDirection: 'row',
        marginBottom: 15
    },
    bookImage: {
        width: 115,
        height: 150,
        borderRadius: 10,
        marginHorizontal: 5
    },
    button: {
        padding: 8,
        borderRadius: 40
    },
    floatingCard: {
        position: "absolute",
        alignSelf: "center",
        backgroundColor: "#EEEEEE",
        width: "85%",
        height: 90,
        bottom: "3%",
        borderColor: '#507DBC',
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: "center",
        padding: 10,
        alignItems: "center"
    }
});

export default ShoppingCartScreen;
