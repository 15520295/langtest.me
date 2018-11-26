import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WordFlatList from './components/WordFlatList';
import TopicFlatList from './components/TopicFlatList';

export default class App extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <TopicFlatList>

                </TopicFlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
