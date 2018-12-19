import * as React from 'react';
import {Container, Content, Text, View, Button, Header} from 'native-base';
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


export default class LeaderBoardScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        };
    }

    componentWillUnmount() {
        this.setState(
            {
                isLoading: true
            }
        );
    }

    componentDidMount() {
        if (this.props.navigation != null) {
            this.props.navigation.addListener(
                'didFocus',
                payload => {
                    console.log('LeaderBoardScreen - onResume');

                    DataHelper._loadUserMapFromServer(() => {
                        UtilHelper._printMapConsole(DataHelper._getCurLeaderBoardProfile());
                        UtilHelper._printMapConsole(DataHelper._getLeaderBoardDataRanked());

                        this.setState({
                            myProfile: DataHelper._getCurLeaderBoardProfile(),
                            peopleProfile: DataHelper._getLeaderBoardDataRanked()
                        });
                        this.setState({
                            isLoading: false
                        });
                    });
                }
            );
        }
    }

    render() {
        if (this.state.isLoading) {
            return <AppLoading/>;
        }

        console.log("People profile");
        console.log(this.state.peopleProfile);
        return (
            <Container>
                <View style={{height: Expo.Constants.statusBarHeight}}/>
                <Content style={{flex: 1, backgroundColor: '#F6F6F6'}}>
                    <MyProfileComponent style={{flex: 1, height: heightPercentageToDP(22), maxHeight: heightPercentageToDP(25)}}
                                        profile={this.state.myProfile}/>
                    <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
                        {
                            this.state.peopleProfile.map((value, index) => {
                                return (
                                    <PeopleProfileComponent key={index} style={{flex: 1, height: heightPercentageToDP(12), maxHeight: heightPercentageToDP(25)}}
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