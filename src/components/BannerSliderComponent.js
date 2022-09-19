import React from 'react';
import { View, Image } from 'react-native';

const BannerSliderComponent = ({data}) => {
    return (
        <View>
            <Image
                source={require("../assets/images/defaultBook.png")}
                style={{ height: 150, width: 300, borderRadius: 10 }}
            />
        </View>
    );
};

export default BannerSliderComponent;
