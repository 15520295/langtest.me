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
            animIn: new Animated.Value(-500),
            animOut: new Animated.Value(0),
        };
    }


    slide = () => {
        Animated.parallel([
            Animated.timing(this.state.animIn, {
                toValue: 0,
                duration: 1000
            }),
            Animated.timing(this.state.animOut, {
                toValue: 500,
                duration: 1000
            })
        ]).start(() => {

        });
    };

    componentDidMount() {
        this.slide();
    }

    render() {

        let curWord = 0;
        // const { navigation } = this.props;
        // const topic = navigation.getParam('topic', null);

        const screenWidth = Dimensions.get('window').width;

        return (
            <Container style={styles.container}>
                <Header androidStatusBarColor="#0076BF"
                        style={{backgroundColor: Platform.OS === 'android' ? '#019AE8' : '#FFFFFF'}}>
                    <Left>
                        {/*<Button transparent>*/}
                            {/*<Icon android='md-arrow-back' ios='ios-arrow-back'/>*/}
                        {/*</Button>*/}
                    </Left>
                    <Body>
                        <Title>Learn Screen</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content>
                    {/*wordMap[topic.id]*/}
                    <View
                        style={{flexDirection: 'row', width: screenWidth*2}}>
                        <Animated.View
                            style={[
                                {flex:0, width: screenWidth},
                                {
                                transform: [
                                    {
                                        translateX: this.state.animIn
                                    }]
                                }
                                ]
                            }>
                            <WordFlatListItem item={wordMap['t1'][0]}>

                            </WordFlatListItem>
                        </Animated.View>
                        <Animated.View
                            style={[
                                {flex:0, width: screenWidth},
                                {
                                transform: [
                                    {
                                        translateX: this.state.animIn
                                    }]
                                }
                                ]
                            }>
                            <WordFlatListItem item={wordMap['t1'][1]}>

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