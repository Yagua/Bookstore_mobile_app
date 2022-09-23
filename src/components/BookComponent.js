import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { trimText } from '../../utils'

const BookComponent = ({ title, cover, rating, price, ...props}) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8}
                onPress={props.action}
            >
                <Image source={cover} style={styles.cover}/>
                <View style={styles.caption}>
                    <Text>{trimText(title, 20)}</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}>
                        <Feather
                            name="star"
                            size={15}
                            color="#2C3D55"
                            style={{marginRight: 3}}
                        />
                        <Text>{rating}</Text>
                    </View>
                    <View style={{
                        flexDirection: "row",
                         marginLeft: 10,
                         alignItems: "center"
                    }}>
                        <Feather
                            name="dollar-sign"
                            size={15}
                            color="#2C3D55"
                            style={{marginRight: 2}}
                        />
                        <Text>{price}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 130,
    },
    cover: {
        height: 160,
        width: "100%",
        borderRadius: 8,
    },
    caption: {
        paddingVertical: 7,
    }
});

export default BookComponent;
