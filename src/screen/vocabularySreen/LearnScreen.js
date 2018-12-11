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
    Content
} from 'native-base';

import {
    StyleSheet,
    TouchableOpacity,
    Platform,
    FlatList,
    Animated,
    Dimensions
} from 'react-native';

import wordMap from '../../data/VocabularyList';
import WordFlatListItem from '../../components/vocabulary/WordFlatListItem';


export default class LearnScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            // timer
            timer: null,
            counter: 5
        };
        // animation
        this.animA = new Animated.Value(-this.screenWidth);
        this.animB = new Animated.Value(-this.screenWidth);
    }

    screenWidth = Dimensions.get('window').width;

    animDuration = 1000;

    curWordA = 0;
    curWordB = 1;

    counterMaxValue = 5;

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

        });
    };

    slideB = () => {
        this.animA.setValue(0);
        this.animB.setValue(-(this.screenWidth*2));

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

        });
    };

    componentDidMount() {
        this.startTimer();
    }

    componentWillUnmount() {
        this.clearInterval(this.state.timer);
    }

    tick = () => {
        if (this.state.counter <= 1) {
            this.setState({
                counter : this.counterMaxValue+1
            });
            this.stopTimer();
            // this.slideA();
            // this.child.flipCard();
        }
        this.setState({
            counter: this.state.counter - 1
        });

    };

    stopTimer = () =>{
        clearInterval(this.state.timer);
    };

    startTimer = () =>{
        let timer = setInterval(this.tick, 1000);
    };

    render() {

        // const { navigation } = this.props;
        // const topic = navigation.getParam('topic', null);


        return (
            <Container style={styles.container}>
                <Header androidStatusBarColor="#0076BF"
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
                </Header>
                <Content>
                    {/*wordMap[topic.id]*/}
                    <View>
                        <Text>
                            {this.state.counter}
                        </Text>
                    </View>
                    <View
                        style={{flex:0,flexDirection: 'row'}}>
                        <Animated.View
                            style={[
                                {width: this.screenWidth, backgroundColor:'red'},
                                {transform: [
                                    {translateX: this.animA}
                                    ]}
                                ]
                            }>
                            <WordFlatListItem
                                item={wordMap['t1'][this.curWordA]}
                                ref={component => this.wordComponentA = component} // for perform click
                            >

                            </WordFlatListItem>
                        </Animated.View>
                        <Animated.View
                            style={[
                                {width: this.screenWidth, backgroundColor:'blue'},
                                {transform: [
                                    {translateX: this.animB}]}
                                ]
                            }>
                            <WordFlatListItem
                                item={wordMap['t1'][this.curWordB]}
                                ref={component => this.wordComponentB = component} // for perform click
                            >

                            </WordFlatListItem>
                        </Animated.View>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'gray'
    },
    vc_slide: {
        backgroundColor:'blue',
        flexDirection: 'row',
        justifyContent: 'center', alignContent: 'center',
    },
    slideView: {
        backgroundColor:'green',
        flex: 1,
    },
});