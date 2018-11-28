import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WordFlatList from './components/WordFlatList';

export default class App extends React.Component {
    componentDidMount() {
        Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <TopicFlatlist>

                </TopicFlatlist>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
