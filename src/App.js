import React from 'react';
import {StyleSheet, Text, View, Image, Platform, StatusBar, SafeAreaView, ScrollView} from 'react-native';
import {Root} from 'native-base';
import {AppLoading, Asset, Font, Icon} from 'expo';
import {Expo} from 'expo';

import {
    DrawerItems, createDrawerNavigator,createStackNavigator,createAppContainer,withNavigation, createSwitchNavigator
} from 'react-navigation';

import {
    Container, Header, Body, Content
} from 'native-base';


import QuizScreen from './screen/QuestionScreen/QuizScreen';
import TopicScreen from './screen/vocabularySreen/TopicScreen';
import WordScreen from './screen/vocabularySreen/WordScreen';

//huy

const CustomDrawerContentComponent = (props) => (
    // <Container>
    //     <Header style={{height: 200, backgroundColor:'white'}}>
    //         <Body>
    //         <Image style={styles.drawImage}
    //             source={require('../assets/images/reading.jpg')}
    //         />
    //         </Body>
    //     </Header>
    //     <Content>
    //         <DrawerItems {...props}/>
    //     </Content>
    // </Container>
    <SafeAreaView style={{flex: 1}}>
        <View style={{height: 150, backgroundColor: 'white', alignItems: 'center',
        justifyContent: 'center'}}>
            <Image source={require('../assets/images/reading.jpg')} 
                style={{height: 120, width: 120, borderRadius: 60}}
            />
        </View> 
        <ScrollView>
            <DrawerItems {...props}/>
        </ScrollView>
    </SafeAreaView>
);

// const AppNavigator = createStackNavigator(
//     {
//         App: {
//             screen: HomeScreen,
//         },
//         Topic: {
//             screen: TopicScreen,
//         },
//         Word: {
//             screen: WordScreen
//         },
//     },
//     {
//         initialRouteName:'App',
//         drawerPosition: 'center',
//         contentComponent: CustomDrawerContentComponent,
//         drawerOpenRoute:'DrawerOpen',
//         drawerCloseRoute:'DrawerClose',
//         drawerToggleRoute:'DrawerToggle',
//         headerMode: 'none'
//     }
// );

import AppNavigator from './navigation/AppNavigator';
import HomeScreen from './screen/HomeScreen';
import ChartScreen from './screen/ChartScreen';
import sharedQuizService from './services/QuizService';
import ResultScreen from './screen/QuestionScreen/ResultScreen';
import LeaderBoardScreen from './screen/LeaderBoardScreen';
import LearnScreen from './screen/vocabularySreen/LearnScreen';
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true
        };
    }
    async componentDidMount(){
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            // 'Roboto_light': require('./../assets/fonts/Roboto-Light.ttf'),
            'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf')
        });
        await sharedQuizService.initQuickTest(5, 3);
        this.setState({loading: false});
    }

    render() {
        if(this.state.loading){
            return (<AppLoading/>);
        }
        return (
        // <View style={styles.container}>
        //     <WordFlatList>

            //     </WordFlatList>
            // </View>
            //<QuestionScreen/>
        // <View style={styles.container}>
        //     {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
        //     <AppContainer />
        // </View>
        <MyApp/>
        );
    }
}


const QuestionStack = createSwitchNavigator({
    Questions: QuizScreen,
    Results: ResultScreen
}, {
    initialRouteName: 'Questions'
});

const TopicStack = createStackNavigator({
    Topic: TopicScreen,
    Word: WordScreen,
    Learn: LearnScreen
});

const MyDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeScreen
    },
    Question: {
        screen: QuestionStack
    },
    Topic: {
        screen: TopicStack,
    },
    Chart: {
        screen: ChartScreen
    },
},
{
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
        activeTintColor: 'orange'
    }
}
);

const MyApp = createAppContainer(MyDrawerNavigator);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawImage:{
        flex: 1,
        height:100,
        width: 200,
        borderRadius:75,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

