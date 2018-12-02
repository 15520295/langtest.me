import React, {
    Component
} from 'react';
import {
    AppRegistry,
    FlatList,
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';

import flatListData from '../../data/TopicData';
import TopicFlatListItem from './TopicFlatListItem';

const styles = StyleSheet.create({
    flatListItem: {
        color: 'white',
        padding: 10,
        fontSize: 16,
    }
});

export default class TopicFlatList extends Component {
    render() {
        return (
            <View style={{ flex: 1,
                backgroundColor:'#EEEEEE'}}>
                <FlatList
                    data={flatListData}
                    renderItem={({ item, index }) => {
                        return (
                            <TopicFlatListItem item={item} index={index}>

                            </TopicFlatListItem>);
                    }}
                    keyExtractor={(item, index) => item.name}
                >

                </FlatList>
            </View>
        );
    }
}


