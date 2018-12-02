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
                          style={{fontSize: 80,color: '#4F4F4F',padding:0}}
                    />
                </View>
                <View style={styles.vc_totalScore}>
                    <Text style={styles.txt_totalScore}>
                        Total score</Text>
                    <Text style={styles.txt_totalScoreValue}>
                        30</Text>
                </View>
                <View style={styles.vc_detail}>
                    <View style={styles.vc_detailScore}>
                        <Text style={styles.txt_detailScore}>
                            Reading</Text>
                        <Text style={styles.txt_detailScoreValue}>
                            30</Text>
                    </View>
                    <View style={styles.vc_detailScore}>
                        <Text style={styles.txt_detailScore}>
                            |</Text>
                        <Text style={styles.txt_detailScoreValue}> </Text>
                    </View>
                    <View style={styles.vc_detailScore}>
                        <Text style={styles.txt_detailScore}>
                            Listening</Text>
                        <Text style={styles.txt_detailScoreValue}>
                            30</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    vc_component: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#EEEEEE',
    },
    vc_icon: {
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        // backgroundColor: 'gray',
    },
    vc_totalScore: {
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        // backgroundColor: 'blue',
    },
    vc_detail: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 0,
        // backgroundColor: 'green',
    },
    vc_detailScore: {
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin:2,
        padding: 0,
        // backgroundColor: 'white',
    },
    // Component
    txt_totalScore: {
        fontSize: 22,
        fontFamily: 'System',
        color: '#4F4F4F',
        // paddingLeft: 8,

    },
    txt_totalScoreValue: {
        fontSize: 32,
        fontFamily: 'System',
        fontWeight: 'bold',
        color: '#78E589',
        // paddingLeft: 8,

    },
    txt_detailScore: {
        fontSize: 18,
        fontFamily: 'System',
        color: '#4F4F4F',
        // paddingLeft: 8,

    },
    txt_detailScoreValue: {
        fontSize: 18,
        fontFamily: 'System',
        color: '#78E589',
        // paddingLeft: 8,

    },

});


