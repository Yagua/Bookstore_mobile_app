import { useState, useEffect } from 'react'
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

const BookScreen = ({navigation, route: { params: {bookData} }}) => {
    let [lines, setLines] = useState(1)
    let [bookQty, setBookQty] = useState(1)

    useEffect(() => {
        // restart the state of the screen
        setLines(1)
        setBookQty(1)
        console.log("reset state (do not delete me until backend connection")
    }, [bookData])

    const handleQuantity = (action) => {
        if(action === "+") {
            setBookQty(bookQty + 1)
        } else if(action === "-") {
            bookQty > 1 ? setBookQty(bookQty - 1) : setBookQty(1)
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.container}>
                <View>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={navigation.goBack}
                    >
                        <Feather
                            name="arrow-left-circle"
                            size={35}
                            color="gray"
                            style={{marginBottom: 10}}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: "row"}}>
                    <View>
                        <Image
                            // source={{uri: bookData.cover}}
                            source={require("../assets/images/defaultBook.png")}
                            style={styles.cover}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <View>
                            <Text style={styles.title}>
                                {bookData.title}
                            </Text>
                        </View>

                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Feather
                                name="flag"
                                color="#8BA6A9"
                                size={18}
                                style={{marginRight: 4}}
                            />
                            <Text style={{
                                fontWeight: "200",
                                fontSize: 15,
                                color: "#8BA6A9",
                                flex: 1
                            }}>
                                {bookData.publishier}
                            </Text>
                        </View>

                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Feather
                                name="book-open"
                                color="#8BA6A9"
                                size={18}
                                style={{marginRight: 4}}
                            />
                            <Text style={{
                                marginVertical: 4,
                                fontWeight: "200",
                                fontSize: 15,
                                color: "#8BA6A9",
                                flex: 1
                            }}>{bookData.page_number} pages</Text>
                        </View>

                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Feather
                                name="check-square"
                                color="#8BA6A9"
                                size={18}
                                style={{marginRight: 4}}
                            />
                            <Text style={{
                                marginVertical: 4,
                                fontWeight: "200",
                                fontSize: 15,
                                color: "#8BA6A9",
                                flex: 1
                            }}>{bookData.edition}</Text>
                        </View>

                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Feather
                                name="globe"
                                color="#8BA6A9"
                                size={18}
                                style={{marginRight: 4}}
                            />
                            <Text style={{
                                marginVertical: 4,
                                fontWeight: "200",
                                fontSize: 15,
                                color: "#8BA6A9",
                                flex: 1
                            }}>{bookData.language}</Text>
                        </View>

                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Feather
                                name="star"
                                color="#8BA6A9"
                                size={18}
                                style={{marginRight: 4}}
                            />
                            <Text style={{
                                marginVertical: 4,
                                fontWeight: "200",
                                fontSize: 15,
                                color: "#8BA6A9",
                                flex: 1
                            }}>{bookData.rating}</Text>
                        </View>
                    </View>
                </View>

                <View style={{marginTop: 20}}>
                    <View style={{
                        borderWidth: 1,
                        borderColor: "#B5BCBE",
                        paddingTop: 10,
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        marginBottom: 10
                    }}>

                        <Text style={{
                            fontSize: 16,
                            fontWeight: "500",
                            marginBottom: 8
                        }}
                        >Total: ${(bookData.price * bookQty).toFixed(2)} </Text>

                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: "500",
                            }}
                            >Quantity: </Text>
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

                        <View style={{flexDirection: "row", justifyContent: "center"}}>
                            <TouchableOpacity
                                onPress={() => {}}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={['#58A1E8', '#5485BE']}
                                    style={[styles.button, {
                                        marginRight: 8,
                                        marginVertical: 15
                                    }]}
                                >
                                    <Text style={{
                                        color: "#ffffff",
                                        fontWeight: "bold"
                                    }}>Buy now</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {}}
                                activeOpacity={0.8}
                            >
                                <LinearGradient
                                    colors={['#58A1E8', '#5485BE']}
                                    style={[styles.button, {
                                        marginRight: 8,
                                        marginVertical: 15
                                    }]}
                                >
                                    <Text style={{
                                        color: "#ffffff",
                                        fontWeight: "bold"
                                    }}>Add to Cart</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{alignItems: "center"}}>
                    <Text
                        style={{
                            fontSize: 20,
                            marginTop: 15,
                            fontWeight: "600",
                            textAlign: "center"
                        }}
                    >Book Information</Text>
                </View>
                <View style={{marginTop: 20}}>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            marginBottom: 8,
                        }}
                    >Categories</Text>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                    >
                        {bookData.categories.map((category, index) => (
                            <LinearGradient
                                colors={['#507DBC', '#5B91D0']}
                                style={[styles.badge, {marginRight: 5}]}
                                key={index}
                            >
                                <Text style={{color: "#ffffff", fontWeight: "bold"}}>
                                    {category.name}
                                </Text>
                            </LinearGradient>
                        ))
                        }
                    </ScrollView>
                </View>

                <View style={{marginTop: 20}}>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            marginBottom: 8,
                        }}
                    >Authors</Text>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                    >
                        {bookData.authors.map((author, index)=> (
                            <LinearGradient
                                colors={['#507DBC', '#5B91D0']}
                                key={index}
                                style={[styles.badge, {
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginRight: 5
                                }]}
                            >
                                <Feather
                                    name="user"
                                    color="#ffffff"
                                    size={20}
                                    style={{marginRight: 5}}
                                />
                                <Text
                                    style={{color: "#ffffff", fontWeight: "bold"}}
                                >
                                    {`${author.first_name} ${author.paternal_last_name}`}
                                </Text>
                            </LinearGradient>
                        ))
                        }
                    </ScrollView>
                </View>

                <View style={{marginTop: 20}}>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "600",
                            marginBottom: 8,
                        }}
                    >Description</Text>
                    <Text numberOfLines={lines}>{bookData.description}</Text>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                                lines > 0 ? setLines(0) : setLines(3)
                            }
                        }
                    >
                        <Text style={{color: "grey", marginTop: 4}}>
                            {lines > 0 ? "See more..." : "See less"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    cover: {
        width: 130,
        height: 215,
        borderRadius: 8,
        marginRight: 10
    },
    title: {
        fontSize: 18,
        marginBottom: 4,
        fontWeight: "600",
        color: "#04080F"
    },
    badge: {
        padding: 8,
        borderRadius: 40,
        marginVertical: 4
    },
    button: {
        padding: 10,
        borderRadius: 40
    },
})

export default BookScreen;
