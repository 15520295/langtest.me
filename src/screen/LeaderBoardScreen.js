import * as React from 'react';
import {Container, Content, Text, View, Button, Header, Right, Left, Title, Body} from 'native-base';
import * as Expo from 'expo';
import MyProfileComponent from '../components/leaderBoardScreen/MyProfile';
import sharedLeaderBoardService from '../services/LoaderBoardService';
import {heightPercentageToDP, widthPercentageToDP} from '../helper/ratioHelper';
import {systemWeights} from 'react-native-typography';
import PeopleProfileComponent from '../components/leaderBoardScreen/PeopleProfile';
import IProfile from '../entity/Profile';
import DataHelper from '../helper/DataHelper';
import UtilHelper from '../helper/UtilHelper';
import {AppLoading} from 'expo';
import {NetInfo, Platform, TouchableOpacity} from 'react-native';
import * as Progress from 'react-native-progress';
import { AntDesign, MaterialCommunityIcons, FontAwesome, Entypo } from '@expo/vector-icons';


export default class LeaderBoardScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            info: 0 // 0: loading, 1: not connect, 2: loaded
        };
    }

    componentWillUnmount() {
        this.setState(
            {
                info: 0
            }
        );
    }

    componentDidMount() {
        if (this.props.navigation != null) {
            this.props.navigation.addListener(
                'didFocus',
                payload => {
                    console.log('LeaderBoardScreen - onResume');
                    NetInfo.isConnected.fetch().then(isConnected => {
                        console.log('First, is ' + (isConnected ? 'online' : 'offline'));
                        if (isConnected) {
                            DataHelper._putCurUserDataToServer();

                            DataHelper._loadUserMapFromServer(() => {
                                DataHelper._getCurLeaderBoardProfile((curLeaderBoardDataRanked) => {
                                    let listLeaderBoardDataRanked = DataHelper._getLeaderBoardDataRanked();

                                    this.setState({
                                        myProfile: curLeaderBoardDataRanked,
                                        peopleProfile: listLeaderBoardDataRanked
                                    });
                                    this.setState({
                                        info: 2
                                    });
                                });
                            });
                        } else {
                            this.setState({
                                info: 1
                            });
                        }
                    });
                }
            );
        }
    }

    static navigationOptions = {
        header: null, // !!! Hide Header
        drawerIcon: ({tintColor}) => (
            <FontAwesome name='trophy' color={tintColor} size= {24}/>
        )
    };

    render() {
        if (this.state.info === 0) {
            return <AppLoading/>;
        } else if (this.state.info === 1) {
            return (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 25
                    }}>
                    <Progress.Circle
                        size={35}
                        thickness={5}
                        indeterminate={true}
                    />
                    <Text
                        style={{
                            paddingHorizontal: 10
                        }}>
                        Please connect to Internet to see the LeaderBoard
                    </Text>
                </View>
            );
        }

        return (
            <Container>
                <View style={{height: Platform.OS === 'android' ? 0 : Expo.Constants.statusBarHeight}}/>
                
                 {/* <Header androidStatusBarColor="#0076BF" style={{backgroundColor: Platform.OS ==='android' ? '#019AE8' : '#019AE8'}}>
                <Left>
                    <Button transparent onPress={() => {
                                this.props.navigation.openDrawer();
                            }}>
                                <Entypo name='menu' color='#ffffff' size= {24}/>
                    </Button>
                </Left>
                <Body>
                    <Title style={{color: '#ffffff'}}>Leaderboard</Title>
                </Body>
                <Right>

                </Right>
            </Header> */}
                <Content style={{flex: 1, backgroundColor: '#F6F6F6'}}>
                <View style={{flex: 1, backgroundColor: '#019AE8', height: heightPercentageToDP(5), alignItems: 'center', justifyContent: 'center'}}>
                    <Button style={{marginLeft: 5}} transparent onPress={() => {
                                this.props.navigation.openDrawer();
                            }}>
                                <Entypo name='menu' color='#ffffff' size= {24}/>
                    </Button>
                </View>
                    <MyProfileComponent
                        style={{flex: 1, height: heightPercentageToDP(22), maxHeight: heightPercentageToDP(25)}}
                        profile={this.state.myProfile}/>
                    <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
                        {
                            Array.from(this.state.peopleProfile.values()).map((value, index) => {

                                console.log("v");
                                console.log(value);
                                return (
                                    <PeopleProfileComponent key={index} style={{
                                        flex: 1,
                                        height: heightPercentageToDP(12),
                                        maxHeight: heightPercentageToDP(25)
                                    }}
                                                            profile={value}/>
                                );
                            })
                        }
                    </View>
                </Content>
            </Container>
        );
    }
}