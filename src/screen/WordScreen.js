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
    Footer
} from 'native-base';

import {
    StyleSheet,
    TouchableOpacity,
    Platform, FlatList
} from 'react-native';

import TopicFlatList
    from '../components/vocabulary/TopicFlatList';

import WordFlatList
    from '../components/vocabulary/WordFlatList';

import { FloatingAction }
    from 'react-native-floating-action';

import ActionButton from 'react-native-action-button';
import flatListData from "../data/VocabularyList";
import WordFlatListItem from "../components/vocabulary/WordFlatListItem";

export default class WordScreen extends React.Component {
    static navigationOptions = {
        header: null // !!! Hide Header
    };

    constructor(props) {
        super(props);
        this.state = {
            correctAnswer: 0,
            isActionButtonVisible: true,
        };

    }
    _listViewOffset = 0;

    nextQuestion = () => {
        this.setState({
            // isWaiting: false,
            // answerState: [0, 0, 0, 0],
            // currentQuestion: (this.state.currentQuestion + 1) % QuestionData.length
        });
    };

    chooseAnswer = (idAnswer) => {
        // if (this.state.isWaiting) {
        //     return;
        // }
        // this.setState({isWaiting: true});
        // if (idAnswer === QuestionData[this.state.currentQuestion].correct) {
        //     let answerState = this.state.answerState;
        //     answerState[idAnswer - 1] = 1;
        //     this.setState({answerState: answerState, correctAnswer: this.state.correctAnswer + 1});
        // } else {
        //     let answerState = this.state.answerState;
        //     answerState[QuestionData[this.state.currentQuestion].correct - 1] = 1;
        //     answerState[idAnswer - 1] = 2;
        //     this.setState({answerState: answerState, incorrectAnswer: this.state.incorrectAnswer + 1});
        // }
        // setTimeout(() => {
        //     this.nextQuestion();
        // }, 2000);
    };

    render() {
        const { navigation } = this.props;
        const topicName = navigation.getParam('topicName', 'Topic');

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
                        <Title>{topicName}</Title>
                    </Body>
                </Header>
                <Content>
                    <View style={{ flex: 1,
                        backgroundColor:'#EEEEEE'}}>
                        <FlatList
                            onScroll={this._onScroll}
                            data={flatListData}
                            renderItem={({ item, index }) => {
                                return (
                                    <WordFlatListItem item={item} index={index}>

                                    </WordFlatListItem>);
                            }}
                            keyExtractor={(item, index) => item.word}
                        >

                        </FlatList>

                    </View>

                </Content>
                <ActionButton
                    positioningMode="right"
                    offsetX={15}
                    offsetY={15}
                    buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item
                        buttonColor="#3498db"
                        title="Học Từ"
                        onPress={() => {}}>
                        <Icon type="Ionicons"
                              name="md-book"
                              style={{
                                  color: 'white',
                                  fontSize: 22,
                                  height: 22,}}
                        />
                    </ActionButton.Item>
                    <ActionButton.Item
                        buttonColor="#3498db"
                        title="Luyện Tập"
                        onPress={() => {}}>
                        <Icon type="Entypo"
                              name="controller-play"
                              style={{
                                  color: 'white',
                                  fontSize: 22,
                                  height: 22,}}
                        />
                    </ActionButton.Item>
                </ActionButton>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    vc_floatingButton: {
        position: 'absolute',
        width: 100,
        height: 100,
        backgroundColor: 'red',
        bottom:30,
        right:10,
        justifyContent: 'center',
        alignItems:'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    navigationView: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15
    },
    questionView: {
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 10,
        height: 120
    },
    questionText: {
        color: '#4F4F4F',
        fontWeight: '200',
        textAlign: 'justify'
    },
    answerButton: {
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10,
        height: 60,
        shadowRadius: 0
    }
});