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
import FlipCard from './FlipCard';
import Highlighter from 'react-native-highlight-words';

export default class WordFlatListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    playSound = async () => {
        const soundObject = new Expo.Audio.Sound();
        try {
            await soundObject.loadAsync(this.props.item.sound);
            await soundObject.playAsync();
            // Your sound is playing!
        } catch (error) {
            // An error occurred!
        }
    };

    _flipCard = () => {
        this.card._toggleCard();
    };

    _flipUp = () => {
        this.card._flipUp();
    };

    render() {
        return (
            <View style={styles.ItemContainer}>
                <FlipCard
                    ref={component => this.card = component} // for perform click
                    style={styles.flip}
                    friction={1000}
                    perspective={1000}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={false}
                    clickable={true}
                >
                    {/* Face Side */}
                    <Card containerStyle={styles.cardView}
                          wrapperStyle={styles.vc_card}>
                        <View style={styles.vc_top}>
                            <View style={styles.vc_topLeft}>
                                <View style={styles.vc_wordDes}>
                                    <Text style={styles.txt_word}>{this.props.item.word}</Text>
                                    <Text style={styles.txt_pronun}>/{this.props.item.pronoun}/</Text>
                                    <Icon
                                        name='volume-up'
                                        type='MaterialIcons'
                                        size={30}
                                        color='#517fa4'
                                        onPress={this.playSound}
                                    />
                                </View>
                                {/* <View style={styles.vc_exampleTitle}>
                                    <Text style={styles.txt_exTitle}>Example:</Text>
                                </View> */}
                            </View>
                            <View style={styles.vc_topRight}>
                                <Image style={styles.img}
                                    // source={{ uri: this.props.item.img }}
                                       source={this.props.item.img}
                                />
                            </View>
                        </View>
                        <View style={styles.vc_bottom}>
                        <Highlighter
                            highlightStyle={{textDecorationLine: 'underline'}}
                            searchWords={[this.props.item.word]}
                            textToHighlight={this.props.item.ex}/>
                        </View>
                        <View style={{flexDirection:"row", flex: 1, justifyContent: "flex-end"}}>
                            <Icon
                                        name='arrow-forward'
                                        type='MaterialIcons'
                                        size={12}
                                        color='#517fa4'
                                        onPress={this.playSound}
                                    />
                        </View>
                    </Card>
                    {/* Back Side */}
                    <Card>
                        <Text style={styles.txt_wordTranslate}>{this.props.item.translate}</Text>
                    </Card>
                </FlipCard>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    // Compoent
    flip: {
        borderWidth: 0,
        padding: 0,
        margin: 0
    },
    ItemContainer: {
        flex: 0,
        justifyContent: 'center',
        marginHorizontal: 10,
        marginVertical: 8
    },
    cardView: {
        borderRadius: 3,
        paddingHorizontal: 5,
        paddingVertical: 14
    },
    img: {
        width: '100%',
        height: '100%',
        minWidth: 50,
        resizeMode: 'cover',
        borderRadius: 3,
        // backgroundColor:'grey'
    },
    txt_word: {
        fontSize: 24,
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
    // View
    vc_cardFront: {
        backfaceVisibility: 'hidden',
        // backgroundColor: 'blue'
    },
    vc_cardBack: {
        // backgroundColor: 'red'
    },
    vc_card: {
        flex: 1,
        width: '100%',
        padding: 3
    },
    vc_top: {
        height: 150,
        flexDirection: 'row',
        // backgroundColor:'red'
    },
    vc_bottom: {
        flex: 0,
        flexDirection: 'row',
        // backgroundColor:'green',
        paddingHorizontal: 5,
        paddingTop: 5,
    },
    vc_topLeft: {
        minWidth: '48%',
        flex: 0
    },
    vc_topRight: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    vc_wordDes: {
        flex: 70,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'blue'
    },
    vc_exampleTitle: {
        flex: 0,
        justifyContent: 'flex-end',
        paddingLeft: 5
    },

});
