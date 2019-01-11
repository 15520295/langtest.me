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
import DataHelper from "../../helper/DataHelper";


export default class UserScore extends Component {
    state = {
        avatarRequired:DataHelper._getUserAvatar()
    };

    render() {
        return (
            <View style={styles.vc_component}>
                <View style={styles.vc_icon}>
                    <Image source={this.state.avatarRequired}
                           style={{
                               height: 80,
                               width: 80,
                               borderRadius: 20,
                               borderColor: '#ffffff',
                               borderWidth: 2,
                           }}
                    />
                </View>
                <View style={styles.vc_totalScore}>
                    <Text style={styles.txt_totalScore}>
                        Total Answer</Text>
                    <Text style={styles.txt_totalScoreValue}>
                        {this.props.totalAnswer}</Text>
                </View>
                <View style={styles.vc_detailScore}>
                    <Text style={styles.txt_correctTitle}>
                        Correct</Text>
                    <Text style={styles.txt_correctScoreValue}>
                        {this.props.correctAnswer}</Text>
                </View>

                <View style={styles.vc_detailScore}>
                    <Text style={styles.txt_wrongTitle}>
                        Wrong</Text>
                    <Text style={styles.txt_wrongScoreValue}>
                        {this.props.totalAnswer - this.props.correctAnswer}</Text>
                </View>
                {/*<View style={styles.vc_detail}>*/}
                    {/**/}
                    {/*/!*<View style={styles.vc_detailScore}>*!/*/}
                        {/*/!*<Text style={styles.txt_separator}>*!/*/}
                             {/*/!*</Text>*!/*/}
                        {/*/!*<Text style={styles.txt_correctScoreValue}> </Text>*!/*/}
                    {/*/!*</View>*!/*/}
                {/*</View>*/}
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
        marginHorizontal: 2,
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
        fontSize: 20,
        fontFamily:'Roboto_medium',
        color: '#6d6d6d',
        // paddingLeft: 8,

    },
    txt_totalScoreValue: {
        fontSize: 22,
        fontFamily:'Roboto_medium',
        color: '#6d6d6d',
        // paddingLeft: 8,

    },
    txt_correctTitle: {
        fontSize: 19,
        color: '#46C00D',
        fontFamily:'Roboto_medium',

    },
    txt_wrongTitle: {
        fontSize: 19,
        color: '#EF2121',
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


