import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator, createSwitchNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screen/HomeScreen';
import QuizScreen from '../screen/QuestionScreen/QuizScreen';
import ResultScreen from '../screen/QuestionScreen/ResultScreen';
import TopicScreen from '../screen/vocabularySreen/TopicScreen';
import ChartScreen from '../screen/ChartScreen';
import WordScreen from '../screen/vocabularySreen/WordScreen';
import ProfileScreen from "../screen/ProfileScreen/ProfileScreen";
import Step1Question from "../screen/Step1/Step1Question";

const HomeStack = createStackNavigator({
    Home: HomeScreen,
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    ),
};

const ProfileScreenStack = createStackNavigator({
    ProfileScreens: ProfileScreen,
});

ProfileScreenStack.navigationOptions = {
    tabBarLabel: 'ProfileScreens',
};

const QuestionStack = createStackNavigator({
    Questions: QuizScreen,
    Results: ResultScreen
}, {
    headerMode: 'none'
});

QuestionStack.navigationOptions = {
    tabBarLabel: 'Questions',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
        />
    ),
};

const TopicStack = createStackNavigator({
    Topic: TopicScreen,
    Word: WordScreen,
});

TopicStack.navigationOptions = {
    tabBarLabel: 'Topic',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
        />
    ),
};

const ChartStack = createStackNavigator({
    Charts: ChartScreen,
});

ChartStack.navigationOptions = {
    tabBarLabel: 'Charts',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-options' : 'md-heart'}
        />
    ),
};

export default createStackNavigator({
    HomeStack,
    QuestionStack,
    TopicStack,
    ChartStack,
    ProfileScreen,
});