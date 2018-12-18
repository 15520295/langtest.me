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
                        Total Answer</Text>
                    <Text style={styles.txt_totalScoreValue}>
                        {this.props.totalAnswer}</Text>
                </View>
                <View style={styles.vc_detail}>
                    <View style={styles.vc_detailScore}>
                        <Text style={styles.txt_correctTitle}>
                            Correct</Text>
                        <Text style={styles.txt_correctScoreValue}>
                            {this.props.correctAnswer}</Text>
                    </View>
                    <View style={styles.vc_detailScore}>
                        <Text style={styles.txt_separator}>
                             </Text>
                        <Text style={styles.txt_correctScoreValue}> </Text>
                    </View>
                    <View style={styles.vc_detailScore}>
                        <Text style={styles.txt_wrongTitle}>
                            Wrong</Text>
                        <Text style={styles.txt_wrongScoreValue}>
                            {this.props.totalAnswer - this.props.correctAnswer}</Text>
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
        paddingHorizontal: 18,
        paddingTop:15,
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
        marginRight: 2,
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
        fontFamily:'Roboto_medium',
        color: '#6d6d6d',
        // paddingLeft: 8,

    },
    txt_totalScoreValue: {
        fontSize: 28,
        fontFamily:'Roboto_medium',
        color: '#6d6d6d',
        // paddingLeft: 8,

    },
    txt_correctTitle: {
        fontSize: 19,
        color: '#49c90e',
        fontFamily:'Roboto_medium',

    },
    txt_wrongTitle: {
        fontSize: 19,
        color: '#FF5252',
        fontFamily:'Roboto_medium',
    },
    txt_separator: {
        fontSize: 19,
        color: '#b0c8c8',
    },
    txt_correctScoreValue: {
        fontSize: 19,
        fontFamily:'Roboto_medium',
        color: '#49c90e',
    },
    txt_wrongScoreValue: {
        fontSize: 19,
        fontFamily:'Roboto_medium',
        color: '#FF5252',
    },

});


