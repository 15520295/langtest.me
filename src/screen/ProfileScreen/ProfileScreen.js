import React, {Component} from 'react';
import {Card, Icon} from 'react-native-elements';
import {
    Image,
    ImageBackground,
    Linking,
    ListView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';

import Button from 'react-native-flat-button';

export default class ProfileScreen extends React.Component {

    renderHeader = () => {

        return (
            <View style={styles.headerContainer}>
                <ImageBackground
                    style={styles.headerBackgroundImage}
                    blurRadius={10}
                    source={require('../../../assets/images/info.jpg')}
                >
                    <View style={styles.headerColumn}>
                        <Image
                            style={styles.userImage}
                            source={require('../../../assets/images/info.jpg')}
                        />
                        <Text style={styles.userNameText}>ABC</Text>
                        <View style={styles.userAddressRow}>
                            <View>
                                <Icon
                                    name="place"
                                    underlayColor="transparent"
                                    iconStyle={styles.placeIcon}
                                />
                            </View>
                            <View style={styles.userCityRow}>
                                <Text style={styles.userCityText}>
                                    {'adfa'}, {'ádfasdf'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>

                <View style={styles.inputContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch'}}>
                        <View style={[styles.iconDoc, {backgroundColor: '#FFBA9C'}]}/>
                        <TextInput underlineColorAndroid='transparent' style={styles.input}
                                   placeholder={'Name'}
                        />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch'}}>
                        <View style={[styles.iconDoc, {backgroundColor: '#FFBA9C'}]}/>
                        <TextInput underlineColorAndroid='transparent' style={styles.input}
                                   placeholder={'Place'}
                        />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch'}}>
                        <View style={[styles.iconDoc, {backgroundColor: '#FFBA9C'}]}/>
                        <TextInput underlineColorAndroid='transparent' style={styles.input}
                                   placeholder={'Phone number'}
                        />
                    </View>

                </View>

                <View style={styles.buttonCenter}>
                    <Button
                        type="custom"
                        onPress={() => Alert.alert('Saved!')}
                        backgroundColor={'#ff5e52'}
                        borderColor={'#16a085'}
                        borderRadius={10}
                        shadowHeight={5}
                        containerStyle={styles.buttonContainer}
                        contentStyle={styles.content}
                    >
                        Save
                    </Button>
                </View>

            </View>
        );
    };

    render() {
        return (
            <ScrollView style={styles.scroll}>
                <View style={styles.container}>
                    <Card containerStyle={styles.cardContainer}>
                        {this.renderHeader()}
                    </Card>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#F7F7F7',
        borderWidth: 0,
        flex: 1,
        margin: 0,
        padding: 0,
    },
    container: {
        flex: 1,
    },
    emailContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30,
    },
    headerBackgroundImage: {
        paddingBottom: 20,
        paddingTop: 35,
    },
    headerContainer: {},
    headerColumn: {
        backgroundColor: 'transparent',
        ...Platform.select({
            ios: {
                alignItems: 'center',
                elevation: 1,
                marginTop: -1,
            },
            android: {
                alignItems: 'center',
            },
        }),
    },
    placeIcon: {
        color: 'white',
        fontSize: 26,
    },
    scroll: {
        backgroundColor: '#F7F7F7',
    },
    userAddressRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    userCityRow: {
        backgroundColor: 'transparent',
    },
    userCityText: {
        color: '#A5A5A5',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
    },
    userImage: {
        borderColor: '#019AE8',
        borderRadius: 85,
        borderWidth: 3,
        height: 170,
        marginBottom: 15,
        width: 170,
    },
    userNameText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        paddingBottom: 8,
        textAlign: 'center',
    },
    inputContainer: {
        margin: 20,
        marginBottom: 0,
        padding: 20,
        paddingBottom: 10,
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: '#F7F7F7',
        backgroundColor: '#ffffff',
        borderRadius: 5,
    },
    input: {
        fontSize: 16,
        height: 40,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#91b4e8',
        color: '#ffffff',
        borderRadius: 10,
        marginLeft: 10,
    },
    buttonContainer: {
        width: 200,
        height: 50,
        marginVertical: 5
    },
    buttonCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        marginTop: 10,
    },
    iconDoc: {
        height: 10,
        width: 10,
        borderRadius: 60,
        justifyContent: 'center',
    },
});
