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
import {Icon} from 'native-base';


export default class UserScore extends Component {
    render() {
        return (
            <View style={styles.vc_component}>
                <View style={styles.vc_icon}>
                    <Icon type="MaterialCommunityIcons"
                          name="face"
                          style={{color: '#A6A6A6'}}
                    />
                </View>
                <View style={styles.vc_totalScore}>

                </View>
                <View style={styles.vc_detailScore}>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flatListItem: {
        color: 'white',
        padding: 10,
        fontSize: 16,
    }
});


