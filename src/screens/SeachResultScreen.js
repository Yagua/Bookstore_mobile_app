import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import BookComponent from '../components/BookComponent'
import {APP_HOST} from '../../constants'
// import SearchService from '../service/SearchService'
// import {AuthContext} from '../context/AuthContext'

const SearchResultScreen = ({navigation, route: {params}}) => {
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
                >{params.title}</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.resultsContainer}>
                    {params.searchResult.length > 0 ?
                        <>
                        {params.searchResult.map(book => (
                            <View style={{marginBottom: 15}} key={`br-${book.id}`}>
                                <BookComponent
                                    title={book.title}
                                    rating={book.rating}
                                    price={book.price}
                                    bookId={book.id}
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
                        </>
                    :
                        <View>
                            <Text style={{fontStyle: "italic"}}>
                                There are not results
                            </Text>
                        </View>
                    }
                </View>
            </ScrollView>
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
