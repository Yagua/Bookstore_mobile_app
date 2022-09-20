import { useState } from 'react'
import {ScrollView, View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BookScreen = ({navigation, route: { params: {bookData} }}) => {

    let [lines, setLines] = useState(3)

    // const resolveAthors = (authors) => {
    //     let result = authors.map(
    //         author => `${author.first_name} ${author.paternal_last_name}`
    //     ).join(' / ')
    //     return result
    // }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={{flexDirection: "row"}}>
                    <View>
                        <Image
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
                            <Icon
                                name="typewriter"
                                color="#8BA6A9"
                                size={18}
                                style={{marginRight: 4}}
                            />
                            <Text style={{
                                fontWeight: "200",
                                fontSize: 15,
                                color: "#8BA6A9",
                            }}>
                                {bookData.publishier}
                            </Text>
                        </View>

                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Icon
                                name="book-open-page-variant-outline"
                                color="#8BA6A9"
                                size={18}
                                style={{marginRight: 4}}
                            />
                            <Text style={{
                                marginVertical: 4,
                                fontWeight: "200",
                                fontSize: 15,
                                color: "#8BA6A9"
                            }}>{bookData.page_number} pages</Text>
                        </View>

                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Icon
                                name="check-decagram-outline"
                                color="#8BA6A9"
                                size={18}
                                style={{marginRight: 4}}
                            />
                            <Text style={{
                                marginVertical: 4,
                                fontWeight: "200",
                                fontSize: 15,
                                color: "#8BA6A9"
                            }}>{bookData.edition}</Text>
                        </View>

                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Icon
                                name="star"
                                color="#8BA6A9"
                                size={18}
                                style={{marginRight: 4}}
                            />
                            <Text style={{
                                fontWeight: "200",
                                fontSize: 15,
                                color: "#8BA6A9"
                            }}>{bookData.rating}</Text>
                        </View>
                    </View>
                </View>
                <View style={{marginTop: 20}}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "600",
                            marginBottom: 8,
                        }}
                    >Categorias</Text>
                    <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                        {bookData.categories.map(category => (
                            <LinearGradient
                                colors={['#507DBC', '#5B91D0']}
                                style={[styles.badge, {marginRight: 5}]}
                            >
                                <Text style={{color: "#ffffff", fontWeight: "bold"}}>
                                    {category.name}
                                </Text>
                            </LinearGradient>
                        ))
                        }
                    </View>
                </View>

                <View style={{marginTop: 20}}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "600",
                            marginBottom: 8,
                        }}
                    >Description</Text>
                    <Text numberOfLines={lines}>{bookData.description}</Text>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                            lines > 0 ? setLines(0) : setLines(3)
                        }                        }
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
        fontWeight: "bold",
        padding: 8,
        borderRadius: 40,
        marginVertical: 4
    }
})

export default BookScreen;
