import * as React from 'react';
import { Container, Content, Text, View } from 'native-base';
import { Header } from 'react-native-elements';
import * as Expo from 'expo';
import MyProfileComponent from '../components/leaderBoardScreen/MyProfile';
import sharedLeaderBoardService from '../services/LoaderBoardService';
import { heightPercentageToDP } from '../helper/ratioHelper';

export interface LeaderBoardScreenProps{
    
}

export default class LeaderBoardScreen extends React.Component{
    render(){
        return(
            <Container>
                <View style={{height: Expo.Constants.statusBarHeight}} />
                <Content style={{flex: 1}}>
                    <MyProfileComponent style={{flex: 1, height: heightPercentageToDP(25), maxHeight: heightPercentageToDP(25)}} profile={sharedLeaderBoardService.getMyProfile()}/>
                    <View style={{flex: 1, backgroundColor: 'green'}}>
                        <Text>Fuasdas</Text>
                    </View>
                </Content>
            </Container>
        )
    }
}