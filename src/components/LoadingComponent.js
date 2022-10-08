import { View, Text, ActivityIndicator } from "react-native";

const LoadingComponent = ({children, ...props}) => {
    return (
        <View>
            {children}
            {props.isLoading &&
                <ActivityIndicator
                    size="large"
                    style={[{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: "center"
                    }, props.style]}
                    color="#58A1E8"
                />
            }
        </View>
    );
}

export default LoadingComponent
