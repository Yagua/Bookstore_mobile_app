import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BookComponent = ({ title, cover, style, ...props }) => {

    const trimTitle = (title) => {
        if(title.length > 20) {
            let newTitle = title.substring(0, 20);
            return `${newTitle}...`;
        }
        return title;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8}>
                <Image source={cover} style={styles.cover}/>
                <View style={styles.caption}>
                    <Text>{trimTitle(title)}</Text>
                </View>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <View style={{flexDirection: "row"}}>
                        <Icon
                            name="star"
                            color="#2C3D55"
                            size={18}
                            style={{marginRight: 2}}
                        />
                        <Text>9.8</Text>
                    </View>
                    <View style={{flexDirection: "row", marginLeft: 10}}>
                        <Icon
                            name="currency-usd"
                            color="#2C3D55"
                            size={18}
                        />
                        <Text>5.99</Text>
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
        paddingHorizontal: 3,
        paddingVertical: 7,
    }
});

export default BookComponent;
