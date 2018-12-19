import React, {Component, PureComponent} from 'react';
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

} from 'react-native';
import {WebBrowser} from 'expo';
import GridView from 'react-native-super-grid';
import NavigationBar from 'react-native-navbar';

import {Icon, Button, Header, Content, Left, Container} from 'native-base';

import Carousel from 'react-native-snap-carousel';
import {Card, CardTitle, CardContent, CardAction, CardButton, CardImage} from 'react-native-cards';
import CardModal from '../components/CardModal';
// import MyProfile from '../entity/ProfileData';
import sharedQuizService from '../services/QuizService';
import {QuestionType} from '../entity/Question';
import DataHelper from "../helper/DataHelper";

var imageGrid = require('../../assets/images/reading.jpg');


let FirstItem = 3;
// FirstItem = 20;  // <----- UNCOMMENT THIS

const SliderWidth = Dimensions.get('screen').width;
const ItemWidth = 300.0;
const ItemHeight = 300.0;

const NumItems = 6;
const Items = [];
for (var i = 0; i < NumItems; i++) {
    Items.push(i);
}

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

export default class HomeScreen extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            scroll: true,
        };
    }

    componentDidMount() {
        if (this.props.navigation != null) {
            this.props.navigation.addListener(
                'didFocus',
                payload => {
                    DataHelper._loadTestResult((testResult) => {
                        DataHelper._loadUserProfile((profile) => {
                            this.setState({
                                avatarRequired: DataHelper._getUserAvatar(),
                                name: profile.get('name'),
                                totalCorrectAnswer: DataHelper._getTotalCorrectAnswer(),
                                totalTimeSpend: DataHelper._getTotaltimeSpent(),
                            });
                            this.setState({
                                isLoading: false
                            });
                        });
                    });
                }
            );
        }
    }

    disableScroll() {
        this.setState({scroll: !this.state.scroll});
    }

    _onPressCard(index) {
        // Toast.show('This is a long toast.', Toast.LONG)
        const {navigation} = this.props;
        switch (index) {
            case 0:
                navigation.navigate('Topic');
                break;
            case 1:
                sharedQuizService.initTest(QuestionType.part1, 5, 3, 5 * 60 * 1000);
                navigation.navigate('Questions');
                break;
            case 2:
                sharedQuizService.initTest(QuestionType.part2, 10, 3, 8 * 60 * 1000);
                navigation.navigate('Questions');
                break;
            case 3:
                sharedQuizService.initTest(QuestionType.part3, 15, 3, 10 * 60 * 1000);
                navigation.navigate('Questions');
                break;
            case 4:
                sharedQuizService.initTest(QuestionType.part4, 15, 3, 10 * 60 * 1000);
                navigation.navigate('Questions');
                break;
            case 5:
                sharedQuizService.initTest(QuestionType.part5, 15, 3, 10 * 60 * 1000);
                navigation.navigate('Questions');
                break;
            case 6:
                sharedQuizService.initTest(QuestionType.part6, 10, 3, 7 * 60 * 1000);
                navigation.navigate('Questions');
                break;
            case 7:
                sharedQuizService.initTest(QuestionType.part7, 10, 3, 7 * 60 * 1000);
                navigation.navigate('Questions');
                break;
        }
    }

    static navigationOptions = {
        header: null, // !!! Hide Header
        drawerIcon: ({tintColor}) => (
            <Icon name='home' style={{fontSize: 24, color: tintColor}}/>
        )
        // title:'Home 1',
        // // header: { visible:false },
        //   drawerIcon: (
        //       <Image source={require('../../assets/images/home.png')}
        //              style={{height: 24, width: 24}}
        //       />
        //   )
    };

    // constructor(props) {
    //   super(props);
    //   this._renderItem = this._renderItem.bind(this)
    // }
    //
    // _renderItem({ item }) {
    //   return (
    //     <View style={styles.viewCard}>
    //       <Card>
    //           <CardImage
    //               source={{uri: 'http://bit.ly/2GfzooV'}}
    //               title={item.name}
    //           />
    //           <CardTitle
    //               subtitle="Number 6"
    //           />
    //           <CardContent text={item.sub} />
    //           <CardAction
    //               separator={true}
    //               inColumn={false}>
    //                   <CardButton
    //                       onPress={() => {}}
    //                       title="Test"
    //                       color="#FEB557"
    //                   />
    //                   <CardButton
    //                       onPress={() => {}}
    //                       title="Chart"
    //                       color="#FEB557"
    //                   />
    //           </CardAction>
    //       </Card>
    //   </View>
    //   );
    // }

    render() {
        // Taken from https://flatuicolors.com/
        const items = [
            {name: 'Vocabulary', code: 0},
            {name: 'Photographs', code: DataHelper._getPercent(1)},
            {name: 'Question-Response', code: DataHelper._getPercent(2)},
            {name: 'Conversations', code: DataHelper._getPercent(3)},
            {name: 'Talks', code: DataHelper._getPercent(4)},
            {name: 'Incomplete Sentences', code: DataHelper._getPercent(5)},
            {name: 'Text Completion:', code: DataHelper._getPercent(6)},
            {name: 'Passages', code: DataHelper._getPercent(7)},
        ];
        const {navigation} = this.props;
        return (

            <Container>
                <Header>
                    <Left>
                        <Icon name="ios-menu" onPress={() => ('')}/>
                    </Left>
                </Header>
                <ScrollView style={styles.container}>

                    <View style={{
                        flex: 3, backgroundColor: '#54C5F5', alignItems: 'center', height: 200,
                    }}>
                        <Image source={this.state.avatarRequired}
                               style={styles.imageInfo}
                        />
                        <Text style={{
                            color: '#ffffff', fontWeight: 'bold',
                            marginTop: 10, fontSize: 16,
                        }}>{this.state.name}</Text>
                        <View style={{flexDirection: 'row',}}>
                            <Image style={{marginTop: 10,}} source={require('../../assets/images/location_on.png')}/>
                            <Text style={{color: '#ffffff', marginTop: 10, fontSize: 14, marginLeft: 5}}>Craiova</Text>
                            <Image style={{marginTop: 10, marginLeft: 15}}
                                   source={require('../../assets/images/work.png')}/>
                            <Text style={{color: '#ffffff', marginTop: 10, marginLeft: 5}}>Desiger</Text>
                        </View>

                    </View>

                    <View style={{flex: 6, backgroundColor: '#F7F7F7'}}>
                        <ScrollView>
                            <GridView
                                itemDimension={130}
                                items={items}
                                style={styles.gridView}
                                renderItem={(item, index) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._onPressCard(index);
                                        }}
                                        style={[styles.itemContainer, {backgroundColor: '#ffffff'}]}>
                                        <Image style={styles.drawImage}
                                               source={imageGrid}
                                        />
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        {/*<Text style={styles.itemCode}>{item.code}</Text>*/}
                                        <View style={styles.progressGray}>
                                            <View style={{
                                                backgroundColor: '#ebecef', height: 4,
                                                width: '90%', borderRadius: 5
                                            }}/>
                                            <View style={{
                                                backgroundColor: '#019AE8', height: 4,
                                                width: item.code, position: 'absolute', borderRadius: 5
                                            }}/>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </ScrollView>
                    </View>

                    <View style={styles.positionAbsolute}>
                        <View style={[styles.cardMain, {backgroundColor: '#ffffff'}]}>
                            <View style={{flexDirection: 'row', flex: 1}}>

                                <View style={{flexDirection: 'column', marginLeft: 10}}>
                                    <Text style={{
                                        color: '#0099DA',
                                        fontStyle: 'italic',
                                        fontSize: 16
                                    }}>Your Result</Text>
                                    <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
                                        <View style={[styles.iconDoc, {backgroundColor: '#FFBA9C'}]}/>
                                        <Text style={{
                                            color: '#888888', marginLeft: 10,
                                            fontSize: 12
                                        }}>{this.state.totalCorrectAnswer} Questions</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
                                        <View style={[styles.iconDoc, {backgroundColor: '#BC9CFF'}]}/>
                                        <Text style={{
                                            color: '#888888', marginLeft: 10,
                                            fontSize: 12
                                        }}>Time spent: {this.state.totalTimeSpend} min</Text>
                                    </View>
                                </View>

                                <View style={{flex: 1}}>
                                    <TouchableOpacity style={{
                                        marginLeft: 20, alignItems: 'center',
                                        justifyContent: 'center', flex: 1
                                    }}
                                                      onPress={async () => {
                                                          await sharedQuizService.initQuickTest(30, 3, 5000);
                                                          navigation.navigate('Questions');
                                                      }}>
                                        <View style={{
                                            backgroundColor: '#F50057', alignItems: 'center',
                                            justifyContent: 'center', borderRadius: 30, height: 45,
                                            width: 130, position: 'absolute'
                                        }}
                                        >
                                            <Image style={{
                                                alignItems: 'center',
                                                justifyContent: 'center', borderRadius: 30, height: 45,
                                                width: 130,
                                            }} source={require('../../assets/images/rectangle.jpg')}
                                            />
                                            <Text style={{position: 'absolute', color: '#ffffff', fontWeight: 'bold'}}>Begin
                                                Test</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </Container>
        );
    }
}

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
        marginTop: 20
    },
    gridView: {
        marginTop: 50,
        flex: 1,
        marginLeft: 15,
        marginRight: 15
    },
    itemContainer: {
        borderRadius: 10,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 20,
        color: '#5B5B5B',
        fontWeight: '600',
        marginTop: 20,
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#5B5B5B',
    },
    drawImage: {
        height: 30,
        width: 30,
        borderRadius: 75,
    },
    cardMain: {
        borderRadius: 10,
        padding: 10,
        height: 100,
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
    }

    // viewCard: {
    //     // flex: 1
    //     width: ItemWidth,
    //     height: ItemHeight,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: 'white'
    // },
    // container: {
    //     // flex: 1,
    //     // backgroundColor: '#fff',
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     paddingTop: 50,
    //     backgroundColor: '#ecf0f1',
    // },
    // developmentModeText: {
    //     marginBottom: 20,
    //     color: 'rgba(0,0,0,0.4)',
    //     fontSize: 14,
    //     lineHeight: 19,
    //     textAlign: 'center',
    // },
    // contentContainer: {
    //     paddingTop: 30,
    // },
    // welcomeContainer: {
    //     alignItems: 'center',
    //     marginTop: 10,
    //     marginBottom: 20,
    // },
    // welcomeImage: {
    //     width: 100,
    //     height: 80,
    //     resizeMode: 'contain',
    //     marginTop: 3,
    //     marginLeft: -10,
    // }, 
    // getStartedContainer: {
    //     alignItems: 'center',
    //     marginHorizontal: 50,
    // },
    // homeScreenFilename: {
    //     marginVertical: 7,
    // },
    // codeHighlightText: {
    //     color: 'rgba(96,100,109, 0.8)',
    // },
    // codeHighlightContainer: {
    //     backgroundColor: 'rgba(0,0,0,0.05)',
    //     borderRadius: 3,
    //     paddingHorizontal: 4,
    // },
    // getStartedText: {
    //     fontSize: 17,
    //     color: 'rgba(96,100,109, 1)',
    //     lineHeight: 24,
    //     textAlign: 'center',
    // },
    // tabBarInfoContainer: {
    //     position: 'absolute',
    //     bottom: 0,
    //     left: 0,
    //     right: 0,
    //     ...Platform.select({
    //         ios: {
    //             shadowColor: 'black',
    //             shadowOffset: { height: -3 },
    //             shadowOpacity: 0.1,
    //             shadowRadius: 3,
    //         },
    //         android: {
    //             elevation: 20,
    //         },
    //     }),
    //     alignItems: 'center',
    //     backgroundColor: '#fbfbfb',
    //     paddingVertical: 20,
    // },
    // tabBarInfoText: {
    //     fontSize: 17,
    //     color: 'rgba(96,100,109, 1)',
    //     textAlign: 'center',
    // },
    // navigationFilename: {
    //     marginTop: 5,
    // },
    // helpContainer: {
    //     marginTop: 15,
    //     alignItems: 'center',
    // },
    // helpLink: {
    //     paddingVertical: 15,
    // },
    // helpLinkText: {
    //     fontSize: 14,
    //     color: '#2e78b7',
    // },
    // parent: {
    //     width: '100%', 
    //     flexDirection: 'row', 
    //     flexWrap: 'wrap',
    //     marginTop: 50,
    // },
    // child: {
    //     width: '48%', 
    //     margin: '1%', 
    //     aspectRatio: 1,
    //     borderRadius:20,
    //     borderWidth: 1,
    //     borderColor: '#fff',
    // },
    // gridView: {
    //     paddingTop: 25,
    //     flex: 1,
    // },
    // itemContainer: {
    //     justifyContent: 'flex-end',
    //     borderRadius: 5,
    //     padding: 10,
    //     height: 200,
    // },
    // itemName: {
    //     fontSize: 16,
    //     color: '#fff',
    //     fontWeight: '600',
    // },
    // itemCode: {
    //     fontWeight: '600',
    //     fontSize: 12,
    //     color: '#fff',
    // },
    // drawImage:{
    //     height:100,
    //     width: 100,
    //     borderRadius:75,
    // },
    // navBar:{
    //     height:100,
    //     width: 100,
    // },
});
