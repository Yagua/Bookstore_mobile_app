import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    TextInput,
    Image
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {ImageSlider} from 'react-native-image-slider-banner'
import { LinearGradient } from 'expo-linear-gradient';
import { Badge } from "@rneui/themed";

import BookComponent from '../components/BookComponent'
import SearchService from '../service/SearchService'
import LibraryService from '../service/LibraryService'

import {AuthContext} from '../context/AuthContext'
import {APP_HOST} from '../../constants'

const HomeScreen = ({ navigation }) => {

    let {userTokens, userCartInfo, userInfo} = useContext(AuthContext)
    let [isLoading, setIsLoading] = useState(false)
    let [bookSectionsAreLoading, setBookSectionsAreLoading] = useState(false)
    let [searchTerm, setSearchTerm] = useState('')
    let [sections, setSections] = useState([])
    let [upcomingBooks, setUpcomingBooks] = useState([])

    const pruneBadgeNumber = (cant) => {
        if(cant > 99) return "+99"
        return cant
    }

    const bookSectionDispatcher = async (totalSections=3, booksPerSection=10) => {
        try {
            let categoriesResponse = await LibraryService.getAllCategories(userTokens.access)
            let totalCategories = categoriesResponse.count
            if(totalCategories === 0) { setSections([]); return }

            let sections = []
            let selectedCategories = []
            let min = 1
            let max = totalCategories - totalSections

            let randomNum = Math.floor(Math.random() * (max - min + 1)) + min
            for(let i = randomNum; i < randomNum + totalSections; i++)
                selectedCategories.push(categoriesResponse.results[i])

            for(let j = 0; j < totalSections; j++) {
                let category = selectedCategories[j]
                let books = await LibraryService.getBooksByCategoryId(
                    userTokens.access, category.id
                )
                let selectedBooks = await books.slice(0, booksPerSection)

                let sectionName = category.name.trim()
                sectionName = sectionName[0].toUpperCase() + sectionName.substring(1)
                sections.push({
                    "name": sectionName,
                    "books": selectedBooks,
                    "viewSectionCallback": () => {
                        navigation.navigate("SearchResult", {
                            searchResult: books,
                            title: sectionName
                        })
                    }
                })
            }
            setSections(sections)
        } catch (error) {
            console.error(error)
        }
    }

    const triggerSearch = async (searchTerm) => {
        try {
            let response = await SearchService.performSearch(
                userTokens.access,
                searchTerm
            )
            return response
        } catch (error) {
            console.error(error)
        }
    }

    const retriveUpcomingBooks = async () => {
        try {
            let response = await LibraryService.getUpcomingBooks()
            setUpcomingBooks(response.books)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        (async () => {
            setBookSectionsAreLoading(true)
            await bookSectionDispatcher()
            await retriveUpcomingBooks()
            setBookSectionsAreLoading(false)
        })()
    }, [])

    if(isLoading){
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large"/>
            </View>
        );
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
                    <TextInput
                        placeholder="Search"
                        placeholderTextColor="#ffffff"
                        style={{
                            fontSize: 15,
                            padding: 10,
                            height: '100%',
                            width: '90%',
                            color: "#ffffff"
                        }}
                        returnKeyType="search"
                        onChangeText={(value) => {
                            setSearchTerm(value.trim())
                        }}
                        onSubmitEditing={async () => {
                            let encodedSeachTerm = encodeURIComponent(searchTerm)
                            if(encodedSeachTerm === "") return

                            setIsLoading(true)
                            let searchResult = await triggerSearch(searchTerm)
                            navigation.navigate("SearchResult", {
                                searchResult: searchResult,
                                title: "Search Results"
                            })
                            setIsLoading(false)
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => navigation.openDrawer()}
                        activeOpacity={0.5}
                    >
                        <Image
                            source={userInfo.picture
                                ? {uri: `${APP_HOST}${userInfo.picture}`}
                                : require("../assets/images/defaultUser.png")
                            }
                            style={{ width: 38, height: 38, borderRadius: 25}}
                        />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            {bookSectionsAreLoading ? (
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
                        localImg={false}
                        data={upcomingBooks.slice(1, 15).map(book => ({img: book.image}))}
                        autoPlay={true}
                    />

                    <View style={{marginTop: 10}}>
                        {sections.map((section, index) => (
                            <View key={index} style={{marginBottom: 15}}>
                                <View style={styles.headerSection}>
                                    <Text style={{ fontSize: 20, fontWeight: "bold"}}>
                                        {section.name}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={section.viewSectionCallback}
                                    >
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
                                    {section.books.map(book => (
                                        <View style={{marginRight: 10}} key={`${book.id}-t1`}>
                                            <BookComponent
                                                title={book.title}
                                                rating={book.rating}
                                                price={book.price}
                                                bookId={index}
                                                cover={book.cover
                                                    ? {uri: `${APP_HOST}${book.cover}`}
                                                    : require("../assets/images/defaultBook.png")
                                                }
                                                action={() =>
                                                    navigation.navigate("BookPreview", {bookData: book})
                                                }
                                            />
                                        </View>
                                    ))
                                    }
                                </ScrollView>
                            </View>
                        ))
                        }
                        <View style={{marginBottom: 50}}></View>
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
                    {userCartInfo.items.length > 0 &&
                    <Badge
                        status="error"
                        value={pruneBadgeNumber(userCartInfo.items.length)}
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
    headerSection: {
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});

export default HomeScreen;
