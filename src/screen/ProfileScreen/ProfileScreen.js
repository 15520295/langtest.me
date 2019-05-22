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
import {withNavigation} from "react-navigation";

import {Body, Container, Header, Left, Right, Title} from 'native-base'

import Button from 'react-native-flat-button';
import LocalStoreHelper from "../../helper/LocalStoreHelper";
import DataHelper from "../../helper/DataHelper";
import UtilHelper from "../../helper/UtilHelper";
import {AppLoading} from "expo";
import {AnswerState} from "../QuestionScreen/AnswerButton";
import {AntDesign, Entypo, FontAwesome} from '@expo/vector-icons';

// import {withNavigation} from "react-navigation";

class ProfileScreen extends React.Component {

    componentDidMount() {
        if (this.props.navigation != null) {
            this.props.navigation.addListener(
                'didFocus',
                payload => {
                    console.log('onResume');
                    DataHelper._loadUserProfile((profile) => {
                        this.setState({
                            name: profile.get('name'),
                            avatar: profile.get('avatar'),
                            place: profile.get('place'),
                            phone: profile.get('phone'),
                        });
                        this.setState({
                            isLoading: false
                        });
                    });
                }
            );
        }
    }

    componentWillUnmount() {
        this.setState(
            {
                isLoading: true,
            }
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    _saveProfile = () => {
        DataHelper._initUserProfile(this.state.name, this.state.avatar, this.state.place, this.state.phone);
        DataHelper._saveUserProfileLocal();
        this.props.navigation.navigate('Home');
    };

    static navigationOptions = {
        header: null, // !!! Hide Header
        drawerIcon: ({tintColor}) => (
            <FontAwesome name='user' color={tintColor} size={24}/>
        )
        // title:'Home 1',
        // // header: { visible:false },
        //   drawerIcon: (
        //       <Image source={require('../../assets/images/home.png')}
        //              style={{height: 24, width: 24}}
        //       />
        //   )
    };

    render() {
        if (this.state.isLoading) {
            return <AppLoading/>;
        }

        return (
            <Container>
                <Header androidStatusBarColor="#0076BF"
                        style={{backgroundColor: Platform.OS === 'android' ? '#019AE8' : '#FFFFFF'}}>
                    <Left>
                        {Platform.OS === 'ios'
                            ?
                            <Button transparent onPress={() => {
                                this.props.navigation.openDrawer();

                            }}>
                                <Entypo name='menu' color='#000000' size={24}/>
                            </Button>
                            :
                            <Button transparent onPress={() => {
                                this.props.navigation.openDrawer();
                            }}>
                                <Entypo name='menu' color='#ffffff' size={24}/>
                            </Button>
                        }
                    </Left>
                    <Body>
                        <Title>Profile</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>
                <ScrollView style={styles.scroll}>
                    <View style={styles.container}>
                        <Card containerStyle={styles.cardContainer}>
                            {this.renderHeader()}
                        </Card>
                    </View>
                </ScrollView>
            </Container>

        );
    }

    renderHeader = () => {
        return (
            <View style={styles.headerContainer}>
                <ImageBackground
                    style={styles.headerBackgroundImage}
                    blurRadius={10}
                    source={require('../../../assets/images/profile.jpg')}
                >
                    <View style={styles.headerColumn}>
                        <Image
                            style={styles.userImage}
                            source={require('../../../assets/images/profile.jpg')}
                        />
                        <Text style={styles.userNameText}>{this.state.name}</Text>
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
                                    {this.state.place}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>

                <View style={styles.inputContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch'}}>
                        <View style={[styles.iconDoc, {backgroundColor: '#FFBA9C'}]}/>
                        <TextInput
                            onChangeText={
                                (name) => this.setState({name: name})
                            }
                            value={this.state.name}
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            placeholder={'Name'}
                        />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch'}}>
                        <View style={[styles.iconDoc, {backgroundColor: '#FFBA9C'}]}/>
                        <TextInput
                            onChangeText={
                                (place) => this.setState({place: place})
                            }
                            value={this.state.place}
                            underlineColorAndroid='transparent'
                            style={styles.input}
                            placeholder={'Place'}
                        />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch'}}>
                        <View style={[styles.iconDoc, {backgroundColor: '#FFBA9C'}]}/>
                        <TextInput
                            onChangeText={
                                (phone) => this.setState({phone: phone})
                            }
                            value={this.state.phone}
                            underlineColorAndroid='transparent' style={styles.input}
                            placeholder={'Phone number'}
                        />
                    </View>

                </View>

                <View style={styles.buttonCenter}>
                    <Button
                        type="custom"
                        onPress={() => {
                            this._saveProfile();
                        }}
                        backgroundColor={'#ff916e'}
                        borderColor={'#019AE8'}
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
}

export default withNavigation(ProfileScreen);

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
        color: '#FFBA9C',
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
        color: '#FFBA9C',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
    },
    userImage: {
        borderColor: '#ffffff',
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
