import React, {Component} from 'react';

import {
    DrawerItems, createDrawerNavigator,createStackNavigator,createAppContainer,getNavigation,withNavigation
} from 'react-navigation';

import {
    AppRegistry,
    FlatList,
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';

import {
    Card
} from 'react-native-elements';

import {
    Icon
} from 'native-base';


import * as Progress from 'react-native-progress';
import TopicScreen from '../../screen/TopicScreen';
import WordScreen from '../../screen/WordScreen';

class TopicFlatListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.vc_component}>
                <TouchableOpacity
                    activeOpacity={.7}
                    onPress={() =>
                        this.props.navigation.navigate('Word' ,
                            {
                                topicName:this.props.item.name
                            })
                    }
                >
                    <Card containerStyle={styles.cardView}
                          wrapperStyle={styles.vc_card}
                    >
                        <View style={styles.vc_left}>
                            <Image style={styles.img}
                                   source={{uri: this.props.item.img}}/>
                        </View>
                        <View style={styles.vc_right}>
                            <View style={styles.vc_topic}>
                                <View style={styles.vc_topicName}>
                                    <Text style={styles.txt_topicName}>
                                        {this.props.item.name}</Text>

                                </View>
                                <View style={styles.vc_topicDetail}>
                                    <Text style={styles.txt_topicCount}>
                                        {this.props.item.count} words | </Text>
                                    <Text style={styles.txt_topicDetail}>
                                        More Detail</Text>

                                </View>
                                <View style={styles.vc_progress}>
                                    <Progress.Bar
                                        progress={0.5}
                                        borderWidth={0}
                                        unfilledColor={'#E1E1E1'}
                                        color={'#78E589'}
                                        height={14}
                                        borderRadius={10}
                                        width={null}
                                    />
                                    <View style={styles.vc_progressValue}>
                                        <Text style={styles.txt_progressValue}>
                                            30%</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.vc_icArrow}>
                                <Icon type="Ionicons"
                                      name="ios-arrow-forward"
                                      style={{color: '#A6A6A6'}}
                                />
                            </View>
                        </View>

                    </Card>
                </TouchableOpacity>

            </View>
        );
    }
}


export default withNavigation(TopicFlatListItem);

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
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    vc_right: {
        flex: 80,
        flexDirection: 'row',
        // backgroundColor: 'gray',
    },
    vc_icArrow: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        // backgroundColor: 'blue',
    },
    vc_topic: {
        flex: 72,
        flexDirection: 'column',
        // backgroundColor: 'green',
    },
    vc_topicName: {
        flex: 20,
        justifyContent: 'center',
        // backgroundColor: 'yellow',

    },
    vc_topicDetail: {
        flex: 20,
        flexDirection: 'row',
        // backgroundColor: 'white',

    },
    vc_progress: {
        flex: 20,
        justifyContent: 'center',
        paddingHorizontal: 10,
        // backgroundColor: 'red',
    },
    vc_progressValue: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        marginLeft: 10,
        // backgroundColor: 'gray',
    },

    /////// Compoent

    cardView: {
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 14
    },
    img: {
        width: '100%',
        height: '100%',
        minWidth: 50,
        resizeMode: 'cover',
        borderRadius: 3,
        // backgroundColor: 'grey',
    },
    txt_topicName: {
        fontSize: 22,
        fontFamily: 'System',
        color: '#00BCD4',
        paddingLeft: 14,

    },
    txt_topicCount: {
        fontSize: 14,
        fontFamily: 'System',
        color: '#737373',
        paddingLeft: 14,

    },
    txt_topicDetail: {
        fontSize: 14,
        fontFamily: 'System',
        color: '#78E589',
        textDecorationLine: 'underline',
        // paddingLeft: 8,

    },
    txt_progressValue: {
        fontSize: 10,
        fontFamily: 'System',
        color: '#737373',

    },


    flip: {
        borderWidth: 0,
        padding: 0,
        margin: 0
    },

    txt_word: {
        fontSize: 5,
        fontFamily: 'System',
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
