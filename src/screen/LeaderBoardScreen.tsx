import * as React from 'react';
import { Container, Content, Text, View, Button, Header } from 'native-base';
import * as Expo from 'expo';
import MyProfileComponent from '../components/leaderBoardScreen/MyProfile';
import sharedLeaderBoardService from '../services/LoaderBoardService';
import { heightPercentageToDP, widthPercentageToDP } from '../helper/ratioHelper';
import { systemWeights } from 'react-native-typography';
import PeopleProfileComponent from '../components/leaderBoardScreen/PeopleProfile';

export interface LeaderBoardScreenProps{
    
}

export default class LeaderBoardScreen extends React.Component<LeaderBoardScreenProps>{
    render(){
        return(
            <Container>
                <View style={{height: Expo.Constants.statusBarHeight}} />
               <Content  style={{flex: 1, backgroundColor: '#F6F6F6'}}>
                    <MyProfileComponent style={{flex: 1, height: heightPercentageToDP(22), maxHeight: heightPercentageToDP(25)}} profile={sharedLeaderBoardService.getMyProfile()}/>
                    <View style={{flex: 1, height: heightPercentageToDP(5), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: heightPercentageToDP(1)}}>
                        <Button style={{alignSelf: 'center', width: widthPercentageToDP(25), height: heightPercentageToDP(3.5), justifyContent: 'center',
                            borderBottomLeftRadius: heightPercentageToDP(1.75), 
                            borderTopLeftRadius: heightPercentageToDP(1.75),
                            borderBottomRightRadius: 0,
                            borderTopRightRadius: 0}}>
                            <Text style={[{fontSize: 12, textAlign: 'center'}, systemWeights.regular]}>Today</Text>
                        </Button>   
                        <Button disabled style={{alignSelf: 'center', width: widthPercentageToDP(25), height: heightPercentageToDP(3.5), justifyContent: 'center',
                            borderBottomRightRadius: heightPercentageToDP(1.75), 
                            borderTopRightRadius: heightPercentageToDP(1.75),
                            borderBottomLeftRadius: 0,
                            borderTopLeftRadius: 0}}>
                            <Text style={[{fontSize: 12, textAlign: 'center'}, systemWeights.regular]}>All</Text>
                        </Button>   
                    </View>
                    <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
                        <PeopleProfileComponent style={{flex: 1, height: heightPercentageToDP(12), maxHeight: heightPercentageToDP(25)}} profile={sharedLeaderBoardService.getMyProfile()}/>
                        <PeopleProfileComponent style={{flex: 1, height: heightPercentageToDP(12), maxHeight: heightPercentageToDP(25)}} profile={sharedLeaderBoardService.getMyProfile()}/>
                        <PeopleProfileComponent style={{flex: 1, height: heightPercentageToDP(12), maxHeight: heightPercentageToDP(25)}} profile={sharedLeaderBoardService.getMyProfile()}/>
                        <PeopleProfileComponent style={{flex: 1, height: heightPercentageToDP(12), maxHeight: heightPercentageToDP(25)}} profile={sharedLeaderBoardService.getMyProfile()}/>
                        <PeopleProfileComponent style={{flex: 1, height: heightPercentageToDP(12), maxHeight: heightPercentageToDP(25)}} profile={sharedLeaderBoardService.getMyProfile()}/>
                        <PeopleProfileComponent style={{flex: 1, height: heightPercentageToDP(12), maxHeight: heightPercentageToDP(25)}} profile={sharedLeaderBoardService.getMyProfile()}/>
                    </View>
                </Content>
            </Container>
        )
    }
}