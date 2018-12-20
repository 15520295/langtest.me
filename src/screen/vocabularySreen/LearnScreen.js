import React from 'react';
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Title,
    View,
    Text,
    Content,
    Picker
} from 'native-base';

import {
    StyleSheet,
    TouchableOpacity,
    Platform,
    FlatList,
    Animated,
    Dimensions
} from 'react-native';

import * as Progress from 'react-native-progress';

import wordMap from '../../data/VocabularyList';
import WordFlatListItem from '../../components/vocabulary/WordFlatListItem';
import Slider from 'react-native-slider';


export default class LearnScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            // timer
            timer: null,
            counter: this.counterMaxValue,
            progress: 0,
            topicID: 't1',

            // picker
            selected: this.counterMaxValue,
            sliderValue:this.counterMaxValue,
        };
        // animation
        this.animA = new Animated.Value(-this.screenWidth);
        this.animB = new Animated.Value(-this.screenWidth);
    }

    componentDidMount() {
        this.startTimer();
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    //region ------------------- Card
    screenWidth = Dimensions.get('window').width;
    counterMaxValue = 4;
    isFlipDown = false;
    animDuration = 1000;

    slideA = () => {
        this.animA.setValue(-this.screenWidth);
        this.animB.setValue(-this.screenWidth);

        Animated.parallel([
            Animated.timing(this.animA, {
                toValue: 0,
                duration: this.animDuration
            }),
            Animated.timing(this.animB, {
                toValue: 0,
                duration: this.animDuration
            })
        ]).start(() => {
            this.startTimer();

            if (this.curWordA === wordMap[this.props.navigation.state.params.topic.id].length - 1) {//
                this.curWordB = 0;
            } else {
                this.curWordB = this.curWordA + 1;
            }
        });
    };

    slideB = () => {
        this.animA.setValue(0);
        this.animB.setValue(-(this.screenWidth * 2));

        Animated.parallel([
            Animated.timing(this.animA, {
                toValue: this.screenWidth,
                duration: this.animDuration
            }),
            Animated.timing(this.animB, {
                toValue: -this.screenWidth,
                duration: this.animDuration
            })
        ]).start(() => {
            this.startTimer();

            if (this.curWordB === wordMap[this.props.navigation.state.params.topic.id].length - 1) {//
                this.curWordA = 0;
            } else {
                this.curWordA = this.curWordB + 1;
            }
        });
    };

    curWordB = 0;
    curWordA = 1;
    isSlideA = true;

    _slideCard = () => {
        if (this.isSlideA) {
            this.slideA();

            this.isSlideA = false;
        } else {
            this.slideB();

            this.isSlideA = true;
        }
    };
    //endregion

    //region ---------------- Timer
    tick = () => {
        // Time Out
        if (this.state.counter <= 1) {
            this.setState({
                counter: (this.counterMaxValue + 1), //reset Value
            });
            if (this.isFlipDown) {
                this.stopTimer();
                this.wordComponentA._flipUp();
                this.wordComponentB._flipUp();
                this.isFlipDown = false;

                this._slideCard();

            } else {
                this.wordComponentA._flipCard();
                this.wordComponentB._flipCard();
                this.isFlipDown = true;
            }

        }

        // Ticking

        this.setState(previousState => ({
            counter: this.state.counter - 1,
            progress: 1 - (this.state.counter - 1) / this.counterMaxValue
        }));

    };

    startTimer = () => {

        let timer = setInterval(this.tick, 1000);
        this.setState({timer});
    };

    stopTimer = () => {
        clearInterval(this.state.timer);
    };

    //endregion

    // --------------- Picker

    _onSeekSliderValueChange = async value => {
        this.setState({
            sliderValue: value,
        });
        this.counterMaxValue = value;
    };

    render() {

        const {navigation} = this.props;
        const topic = navigation.getParam('topic', null);

        return (
            <Container style={styles.container}>
                {/* <Header androidStatusBarColor="#0076BF"
                        style={{backgroundColor: Platform.OS === 'android' ? '#019AE8' : '#FFFFFF'}}>
                    <Left>
                        <Button transparent>
                            <Icon android='md-arrow-back' ios='ios-arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Learn Screen</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header> */}
                <Header androidStatusBarColor="#0076BF"
                        style={{backgroundColor: Platform.OS === 'android' ? '#019AE8' : '#FFFFFF'}}>
                   <Left>
                {Platform.OS === 'ios'  
                ? 
                <Button transparent onPress={()=> {this.props.navigation.goBack()}}>
                    <Text>{'<Back'}</Text>
                </Button>
                    :
                <Button transparent onPress={()=> {this.props.navigation.goBack()}}>
                    <Icon name = 'nothing' android='md-arrow-back' ios='ios-arrow-back'/>
                </Button>
                }
            </Left>
                    <Body>
                    <Title>Learn Screen</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>
                <Content
                    contentContainerStyle={{ flexGrow: 1 }}>
                    <View
                        style={{flex: 1}}>
                        <View
                            style={{flex: 50,
                                justifyContent: 'flex-end',
                                alignContent: 'center',}}>
                            <View
                                style={{
                                    minHeight:280,
                                    flexDirection: 'row',
                                    alignContent: 'center',
                                }}>
                                <Animated.View
                                    style={[
                                        {
                                            width: this.screenWidth,
                                        },
                                        {
                                            transform: [
                                                {translateX: this.animA}
                                            ]
                                        }
                                    ]
                                    }>
                                    <WordFlatListItem
                                        item={wordMap[topic.id][this.curWordA]}//
                                        ref={component => this.wordComponentA = component} // for perform click
                                    >

                                    </WordFlatListItem>
                                </Animated.View>
                                <Animated.View
                                    style={[
                                        {
                                            width: this.screenWidth,
                                        },
                                        {
                                            transform: [
                                                {translateX: this.animB}]
                                        }
                                    ]
                                    }>
                                    <WordFlatListItem
                                        item={wordMap[topic.id][this.curWordB]}//
                                        ref={component => this.wordComponentB = component} // for perform click
                                    >

                                    </WordFlatListItem>
                                </Animated.View>
                            </View>
                        </View>
                        <View
                            style={{flex: 50,
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                alignContent: 'center',
                                paddingBottom:60,
                                paddingTop:30,
                            }}>
                            <View
                                style={{flex: 0,
                                    flexDirection: 'column',
                                }}>
                                <View
                                    style={styles.vc_top}>
                                    <View
                                        style={styles.vc_timer}>
                                        <Progress.Circle
                                            size={50}
                                            showsText={false}
                                            progress={this.state.progress}
                                            borderWidth={0}
                                            thickness={4}
                                            fill='white'
                                            color='#00BCD4'
                                            style={{}}/>
                                        <View
                                            style={styles.vc_timerCounter}>
                                            <Text
                                                style={{color:'#55BE66'}}>
                                                {this.state.counter}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{flex: 0,
                                    flexDirection: 'row',
                                    paddingHorizontal: 60
                                }}>
                                <View
                                    style={{flex: 80,
                                    }}>
                                    <Slider
                                        style={styles.slider}
                                        minimumValue={1}
                                        maximumValue={10}
                                        step={1}
                                        value={this.state.sliderValue}
                                        onValueChange={this._onSeekSliderValueChange}
                                        trackStyle={styles.sliderTrack}
                                        thumbStyle={styles.sliderThumb}
                                        thumbTintColor='#000000'
                                        minimumTrackTintColor='#78E589'
                                    />
                                </View>
                                <View
                                    style={{
                                        flex: 20,
                                        justifyContent: 'center',
                                        alignContent: 'center'
                                    }}>
                                    <Text
                                        style={{
                                            flex:0,
                                            textAlignVertical: 'center',
                                            textAlign: 'center',
                                            color: '#55BE66',
                                            fontWeight:'bold',
                                        }}>
                                        {this.state.sliderValue}s
                                    </Text>
                                </View>
                            </View>

                        </View>
                    </View>

                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5'
    },
    vc_top: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    vc_timerPicker: {
        flex: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    vc_timer: {
        flex: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    vc_timerCounter: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    vc_slide: {
        flexDirection: 'row',
        justifyContent: 'center', alignContent: 'center',
    },
    slideView: {
        flex: 1,
    },
    slider: {
        width: '100%',
        marginLeft: 10,
        marginRight: 10,
    },
    sliderTrack: {
        height: 14,
        borderRadius: 2,
        backgroundColor: 'white',
        borderColor: '#9a9a9a',
        borderWidth: 1,
    },
    sliderThumb: {
        width: 20,
        height: 20,
        borderRadius: 2,
        backgroundColor: '#eaeaea',
        borderColor: '#9a9a9a',
        borderWidth: 1,
    }

});