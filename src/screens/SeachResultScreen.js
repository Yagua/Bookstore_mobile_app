import { useState } from 'react';
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import BookComponent from '../components/BookComponent'
import {books} from '../../_testdata/_data'

const SearchResultScreen = ({navigation, route: {params: { searchTerm }}}) => {
    let [dataIsLoaded, setDataIsLoaded] = useState(false)

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15
            }}>
                <View>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {navigation.navigate("Home")}}
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
                >Search Results</Text>
            </View>

            {dataIsLoaded ?
            // {!dataIsLoaded ?
                <View style={{
                    flex:1,
                    justifyContent:'center',
                    alignItems:'center',
                    marginTop: 20
                }}>
                    <ActivityIndicator size="large"/>
                </View>
            :
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.resultsContainer}>
                        {books.slice(20, 40).map((book, index) => (
                            <View style={{marginBottom: 15}} key={`br-${index}`}>
                                <BookComponent
                                    title={book.title}
                                    rating={book.rating}
                                    price={book.price}
                                    bookId={index}
                                    // cover={{uri: book.cover}}
                                    cover={require("../assets/images/defaultBook.png")}
                                    action={() =>
                                        navigation.navigate("BookPreview", {bookData: book})
                                    }
                                />
                            </View>
                        ))
                        }
                    </View>
                </ScrollView>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginBottom: 50
    },
    resultsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
        justifyContent: "space-around",
    }
})

export default SearchResultScreen;
