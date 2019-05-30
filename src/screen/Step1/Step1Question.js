import React, {Component} from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
    Dimensions,
    ScrollView,
    LayoutAnimation,
    ImageBackground,

} from 'react-native';
import GridView from 'react-native-super-grid';
import {Icon, Button, Header, Content, Left, Container, Body, Title, Right} from 'native-base';
import {Entypo} from '@expo/vector-icons';
import {withNavigation} from "react-navigation";
import DataHelper from "../../helper/DataHelper";

class Step1Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    render() {
        const items = [
            {name: 'Reading', code: DataHelper._getPercent(1), icon: require('../../../assets/icon/i1.png')},
            {name: 'Listening', code: DataHelper._getPercent(2), icon: require('../../../assets/icon/i2.png')},
        ];
        const {navigation} = this.props;

        return (
            <Container style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
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
                        <Title>Step1</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>
                <ScrollView style={styles.container}>
                    <View style={{flex: 1, backgroundColor: '#e7e7e7'}}>
                        <ScrollView style={{flex: 1}}>
                            <GridView
                                itemDimension={180}
                                items={items}
                                style={styles.gridView}
                                renderItem={(item, index) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            // this._openStep1(index);
                                        }}
                                        style={[
                                            styles.viewContainer,
                                            {backgroundColor: '#ffffff'}
                                        ]}>
                                        <View style={styles.itemContainer}>
                                            <Text style={styles.itemName}>{item.name}</Text>
                                            {/*<Text style={{*/}
                                            {/*    fontSize: 16,*/}
                                            {/*    color: '#5B5B5B',*/}
                                            {/*    fontWeight: '600',*/}
                                            {/*    fontStyle: 'italic'*/}
                                            {/*}}>Reading</Text>*/}
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </ScrollView>
                    </View>
                </ScrollView>
                {/*<Text>Hello, world!</Text>*/}
            </Container>
        );
    }

}

export default withNavigation(Step1Question);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf5fd',
    },
    imageInfo: {
        height: 60,
        width: 60,
        borderRadius: 20,
        borderColor: '#ffffff',
        borderWidth: 2,
        marginTop: 10
    },
    imageBackgroundOfStep: {
        borderRadius: 10,
        height: 150,
    },
    gridView: {
        marginTop: 50,
        flex: 1,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'column',
    },
    itemContainer: {
        justifyContent: 'space-around',
        borderRadius: 10,
        height: 150,
        elevation: 1,
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
    },
    viewContainer: {
        borderRadius: 10,
        padding: 10,
        paddingVertical: 10,
        height: 150,
        flex: 1,
    },
    itemName: {
        fontSize: 20,
        color: '#5B5B5B',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#5B5B5B',
    },
    drawImage: {
        height: 35,
        width: 35,
        borderRadius: Platform.OS === 'android' ? 30 : 18,
    },
    cardMain: {
        borderRadius: 10,
        padding: 10,
        height: 100,
        shadowColor: '#03affd',
        shadowOffset: {width: 4, height: 6},
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 1,
    },
    iconDoc: {
        height: 10,
        width: 10,
        borderRadius: 60,
        justifyContent: 'center',
    },
    LinearGradientStyle: {
        height: 40,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        marginBottom: 20
    },

    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        margin: 7,
        color: '#fff',
        backgroundColor: 'transparent'

    },
    positionAbsolute: {
        position: 'absolute',
        left: 25,
        right: 25,
        top: 150,
    },
    progressGray: {
        height: 4,
        width: 150,
        marginTop: 15,
        borderRadius: 5
    },
    headerBackgroundImage: {
        paddingBottom: 20,
        paddingTop: 35,
        flex: 3,
        alignItems: 'center',
        height: 200,
    },
});