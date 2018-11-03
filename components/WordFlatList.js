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

import flatListData from '../data/VocabularyData';
import WordFlatListItem from './WordFlatListItem';

const styles = StyleSheet.create({
    flatListItem: {
        color: 'white',
        padding: 10,
        fontSize: 16,
    }
});

export default class WordFlatList extends Component {
    static navigationOptions = {
        title:'Home',
        drawerIcon:(
          <Image source={require('../assets/images/home.png')}
            style={{height:24, width:24}}
          />
        )
      };

    render() {
        return (
            <View style={{ flex: 1,
                backgroundColor:'#EEEEEE'}}>
                <FlatList
                    data={flatListData}
                    renderItem={({ item, index }) => {
                        return (
                            <WordFlatListItem item={item} index={index}>

                            </WordFlatListItem>);
                    }}
                    keyExtractor={(item, index) => item.word}
                >

                </FlatList>
            </View>
        );
    }
}


