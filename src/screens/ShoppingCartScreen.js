import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { useContext, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';

import ShoppingCartService from '../service/ShoppingCartService'
import LoadingComponent from '../components/LoadingComponent'
import {AuthContext} from '../context/AuthContext'
import {APP_HOST} from '../../constants'
import { trimText } from '../../utils';

const ShoppingCartScreen = ({ navigation }) => {

    let {userTokens, userCartInfo, setUserCartInfo} = useContext(AuthContext)
    let [bookQty, setBookQty] = useState(1)
    let [isLoading, setIsLoading] = useState(false)

    const handleQuantity = (action) => {
        if(action === "+") {
            setBookQty(bookQty + 1)
        } else if(action === "-") {
            bookQty > 1 ? setBookQty(bookQty - 1) : setBookQty(1)
        }
    }

    const handleDropItem = async (itemId) => {
        setIsLoading(true)
        ShoppingCartService.deleteItemFromCart(userTokens.access, itemId)
            .then(response => {
                setUserCartInfo(response)
                setIsLoading(false)
            })
            .catch(error => console.error(error))
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
                    {userCartInfo.items.length > 0 ?
                    <LoadingComponent
                        isLoading={isLoading}
                        style={{
                            backgroundColor: "#E9EBE9",
                            opacity: 0.5,
                            borderRadius: 10,
                        }}
                    >
                        <View>
                            {userCartInfo.items.map((item) => (
                                <View
                                    style={[styles.cardContainer, {alignItems: "center"}]}
                                    key={item.id}
                                >
                                    <View>
                                        <Image
                                            source={item.book.cover
                                                ? {uri: `${APP_HOST}${item.book.cover}`}
                                                : require("../assets/images/defaultBook.png")
                                            }
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
                                        >Total: ${(item.quantity * item.book.price).toFixed(2)}</Text>
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
                                            }}>{item.quantity}</Text>

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
                                                onPress={() => handleDropItem(item.id)}
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
                    </LoadingComponent>
                        :
                    <View style={{alignItems: "center"}}>
                        <Text style={{fontStyle: "italic"}}>
                            Shopping Cart Empty
                        </Text>
                    </View>
                    }
                    <View style={{marginBottom: 145}}></View>
                </ScrollView>
            </View>
            {userCartInfo.items.length > 0 &&
            <View style={styles.floatingCard}>
                <Text
                    style={{
                        marginBottom: 5,
                        fontSize: 16
                    }}
                >Total order: $1</Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{width: "70%"}}
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
            }
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
