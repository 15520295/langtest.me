import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screen/HomeScreen';
import QuizScreen from '../screen/QuestionScreen/QuestionScreen';
import TopicScreen from '../screen/TopicScreen';
import ChartScreen from '../screen/ChartScreen';
import WordScreen from '../screen/WordScreen';

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

const QuestionStack = createStackNavigator({
    Questions: QuizScreen,
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

export default createBottomTabNavigator({
    HomeStack,
    QuestionStack,
    TopicStack,
    ChartStack,
});