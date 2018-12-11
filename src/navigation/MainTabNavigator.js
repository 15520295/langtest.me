import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator, createSwitchNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screen/HomeScreen';
import QuizScreen from '../screen/QuestionScreen/QuizScreen';
import TopicScreen from '../screen/TopicScreen';
import ChartScreen from '../screen/ChartScreen';
import WordScreen from '../screen/WordScreen';
import ResultScreen from '../screen/QuestionScreen/ResultScreen';

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

const QuestionStack = createSwitchNavigator({
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

const TopicStack = createSwitchNavigator({
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

export default createBottomTabNavigator({
    HomeStack,
    QuestionStack,
    TopicStack,
    ChartStack,
});