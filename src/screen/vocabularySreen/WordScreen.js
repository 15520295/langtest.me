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
} from 'native-base';

import {
    StyleSheet,
    TouchableOpacity,
    Platform,
    FlatList,
    Alert,
} from 'react-native';

import ActionButton from 'react-native-action-button';
import wordMap from '../../data/VocabularyList';
import WordFlatListItem from '../../components/vocabulary/WordFlatListItem';
import sharedQuizService from '../../services/QuizService';
import VocabularyTestData from '../../data/VocabularyTestData';
import {withNavigation} from 'react-navigation';
import {QuestionType} from '../../entity/Question';


class WordScreen extends React.Component {
    static navigationOptions = {
        header: null // !!! Hide Header
    };

    constructor(props) {
        super(props);
        this.state = {};

    }

    _topicToTestData(topic) {
        const questionArr = [];
        for (let curWordIndex = 0; curWordIndex < topic.length; curWordIndex++) {

            const correctAnswerNum = Math.floor(Math.random() * 4);
            let correctWord = topic[curWordIndex];

            // Random answer array
            const answerArrIndex = [];
            while (answerArrIndex.length <= 3) {
                const answerIndex = Math.floor(Math.random() * topic.length);

                let isAdded = false;
                for (const answerIndexGetted of answerArrIndex) {
                    if ((answerIndex === answerIndexGetted)
                        || (answerIndex === curWordIndex)) {
                        isAdded = true;
                        break;
                    }
                }

                if (! isAdded) {
                    answerArrIndex.push(answerIndex);
                }
            }

            // put Answer and Correct answer into one Array
            const answerArr = [];
            for (let i = 0, j = 0; i < 4; i++) {
                if (i === correctAnswerNum) {
                    answerArr.push(correctWord.translate);
                } else {
                    answerArr.push(topic[ answerArrIndex[j] ].translate);
                    j++;
                }
            }

            //push question to array
            const question = {
                id: correctWord.id,
                type: QuestionType.vocabulary,
                question: correctWord.word,
                answer: answerArr,
                correctAnswer: correctAnswerNum,
                imageAsset: correctWord.img,
                explain: 'Nothing at all',
                help: correctWord.ex,
                difficultLevel: 3,
                comeWith: [correctWord.id]
            };
            questionArr.push(
                question
            );
        }
        return questionArr;
    }

    _testVocabularyScreen(topic) {
        if (topic.length < 4) {
            Alert.alert(
                'Alert',
                'Not enough data to run test!',
            );
        } else {
            sharedQuizService.initTestVocabulary(this._topicToTestData(topic));
            this.props.navigation.navigate('Questions'
                // , {
                //     'quizOver': this.quizOver
                // }
                );
        }
    }

    // quizOver = (quizStore) => {
    //     const navigation = this.props.navigation;
    //     const tryAgainButton = async function () {
    //         await sharedQuizService.initQuickTest();
    //         navigation.navigate('Questions');
    //     };
    //     const homeFunc = async function () {
    //         navigation.navigate('Home');
    //     };
    //     navigation.navigate('Results', {
    //         totalAnswer: quizStore.getTotalQuestionNumber(),
    //         correctedAnswer: quizStore.state.correctedAnswer,
    //         uncorrectedAnswer: quizStore.state.uncorrectedAnswer,
    //         leftButtonText: "LET DO AGAIN",
    //         leftButtonClick: tryAgainButton,
    //         rightButtonText: "Go Home",
    //         rightButtonClick: homeFunc
    //     });
    // };

    _learnScreen(topic) {
        this.props.navigation.navigate('Learn', {
            topic: topic
        });
    }

    render() {
        const {navigation} = this.props;
        const topic = navigation.getParam('topic', null);


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
                    <Title>{topic.name}</Title>
                    </Body>
                </Header>
                <Content
                    contentContainerStyle={{flexGrow: 1}}>
                    <View style={{
                        flex: 1,
                        backgroundColor: '#EEEEEE'
                    }}>
                        <FlatList
                            data={wordMap[topic.id]}
                            renderItem={({item, index}) => {
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
                        onPress={() => {
                            this._learnScreen(wordMap[topic.id]);
                        }}>
                        <Icon type="Ionicons"
                              name="md-book"
                              style={{
                                  color: 'white',
                                  fontSize: 22,
                                  height: 22,
                              }}
                        />
                    </ActionButton.Item>
                    <ActionButton.Item
                        buttonColor="#3498db"
                        title="Luyện Tập"
                        onPress={() => {
                            this._testVocabularyScreen(wordMap[topic.id]);
                        }}>
                        <Icon type="Entypo"
                              name="controller-play"
                              style={{
                                  color: 'white',
                                  fontSize: 22,
                                  height: 22,
                              }}
                        />
                    </ActionButton.Item>
                </ActionButton>
            </Container>
        );
    }
}

export default withNavigation(WordScreen);

const styles = StyleSheet.create({
    vc_floatingButton: {
        position: 'absolute',
        width: 100,
        height: 100,
        backgroundColor: 'red',
        bottom: 30,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
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