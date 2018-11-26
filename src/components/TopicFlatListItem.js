import React, {Component} from 'react';
import {
    AppRegistry,
    FlatList,
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';

import {
    Card,
    Icon
} from 'react-native-elements';

import * as Progress from 'react-native-progress';

export default class TopicFlatListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <View style={styles.vc_component}>
                <Card containerStyle={styles.cardView}
                      wrapperStyle={styles.vc_card}>
                    <View style={styles.vc_left}>
                        <Image style={styles.img}
                               source={{uri: this.props.item.img}}/>
                    </View>
                    <View style={styles.vc_right}>
                        <View style={styles.vc_topic}>
                            <View style={styles.vc_topicName}>
                                <Text style={styles.txt_word}>
                                    {this.props.item.name}</Text>

                            </View>
                            <View style={styles.vc_topicDetail}>
                                <Text style={styles.txt_word}>
                                    {this.props.item.count} words</Text>
                                <Text style={styles.txt_word}>
                                    More Detail</Text>

                            </View>
                            <View style={styles.vc_progress}>
                                <Progress.Bar
                                    progress={0.3}
                                    borderWidth={0}
                                    unfilledColor={'#C4C4C4'}
                                    color={'#78E589'}
                                    height={7}
                                    // width={null}
                                />
                            </View>
                        </View>
                        <View style={styles.vc_icArrow}>
                            <Icon
                                name='volume-up'
                                type='MaterialIcons'
                                size={30}
                                color='#517fa4'
                                onPress={() => {}}
                            />
                        </View>
                    </View>

                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // View
    vc_component: {
        flex: 0,
        justifyContent: 'center',
        marginHorizontal: 10,
        marginVertical: 4
    },
    vc_card: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        padding: 0,
    },
    vc_left: {
        flex: 0,
        height: 100,
        width: 100,
        padding:8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    vc_right: {
        flex: 80,
        flexDirection: 'row',
        backgroundColor: 'gray',
    },
    vc_icArrow: {
        flex: 8,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    vc_topic: {
        flex: 72,
        flexDirection: 'column',
        backgroundColor: 'green',
    },
    vc_topicName: {
        flex: 20,
        backgroundColor: 'yellow',

    },
    vc_topicDetail: {
        flex: 20,
        flexDirection: 'row',
        backgroundColor: 'white',

    },
    vc_progress: {
        flex: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',

    },
    // Compoent
    cardView: {
        borderRadius: 3,
        paddingHorizontal: 8,
        paddingVertical: 10
    },
    img: {
        width: '100%',
        height: '100%',
        minWidth: 50,
        resizeMode: 'cover',
        borderRadius: 3,
        backgroundColor: 'grey',
    },


    flip: {
        borderWidth: 0,
        padding: 0,
        margin: 0
    },

    txt_word: {
        fontSize: 5,
        fontFamily: 'System',
        fontWeight: 'bold',
        color: '#00BCD4',
        paddingRight: 8,
        // backgroundColor:'white'

    },
    txt_wordTranslate: {
        fontSize: 24,
        fontFamily: 'System',
        fontWeight: 'bold',
        color: '#00BCD4',
        paddingRight: 8,
        textAlign: 'center',
        // backgroundColor:'red'

    },
    txt_pronun: {
        fontSize: 14,
        fontFamily: 'System',
        opacity: 0.6,
        paddingTop: 6
    },
    txt_ex: {
        fontSize: 14,
        fontFamily: 'System',
    },
    txt_exTitle: {
        fontSize: 14,
        fontFamily: 'System',
        color: '#6F7FD4',

    },

});
