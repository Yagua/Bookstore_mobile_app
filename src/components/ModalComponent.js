import { Modal, StyleSheet, View, Pressable, Text, ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';

const ModalComponent = ({
    title="Title",
    body="Content",
    isAlert=false,
    modalVisible=false,
    setModalVisible,
    acceptAction,
    acceptButtonTitle="Accept",
    cancelButtonTitle="Cancel"
}) => {
    return (
        <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}
        >
            <Animatable.View style={styles.centeredView} animation="zoomInUp">
                <View style={styles.modalView}>
                    <Text
                        style={[
                            styles.modalText,
                            { fontSize: 25, color: '#40376E' },
                        ]}
                    >
                        {title}
                    </Text>
                    <ScrollView style={{maxHeight: 80}}>
                        <Text style={styles.modalText}>
                            {body}
                        </Text>
                    </ScrollView>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        {!isAlert &&
                        <Pressable
                            style={[styles.modalButton, { marginRight: 12 }]}
                            onPress={() => {
                                setModalVisible(!modalVisible);
                                acceptAction()
                            }}
                        >
                            <Text style={styles.textStyle}>{acceptButtonTitle}</Text>
                        </Pressable>
                        }
                        <Pressable
                            style={[
                                styles.modalButton,
                                { backgroundColor: '#829193' },
                            ]}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                            }}
                        >
                            <Text style={styles.textStyle}>{cancelButtonTitle}</Text>
                        </Pressable>
                    </View>
                </View>
            </Animatable.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "80%"
    },
    modalButton: {
        backgroundColor: '#58A1E8',
        borderRadius: 20,
        padding: 15,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default ModalComponent;
