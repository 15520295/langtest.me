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
import {NavigationScreenConfig, withNavigation} from 'react-navigation';
import {QuestionType} from '../../entity/Question';
import LocalStoreHelper from '../../helper/LocalStoreHelper';



class WordScreen extends React.Component {
    topic = null;
    topicData = null;

    static navigationOptions = {
        header: null // !!! Hide Header
    };

    constructor(props) {
        super(props);
        this.state = {};

        this.topic = props.navigation.getParam('topic', null);
        this.topicData = wordMap[this.topic.id];
    }

    //region ------------- TEST SCREEN

    _wordDataToTestData = (wordData) => {
        const questionArr = [];
        for (let curWordIndex = 0; curWordIndex < wordData.length; curWordIndex++) {

            const correctAnswerNum = Math.floor(Math.random() * 4);
            let correctWord = wordData[curWordIndex];

            // Random answer array
            const answerArrIndex = [];
            while (answerArrIndex.length <= 3) {
                const answerIndex = Math.floor(Math.random() * wordData.length);

                let isAdded = false;
                for (const answerIndexGetted of answerArrIndex) {
                    if ((answerIndex === answerIndexGetted)) {
                        isAdded = true;
                        break;
                    }
                }
                if (answerIndex === curWordIndex) {
                    isAdded = true;
                }

                if (!isAdded) {
                    answerArrIndex.push(answerIndex);
                }
            }

            // put Answer and Correct answer into one Array
            const answerArr = [];
            for (let i = 0, j = 0; i < 4; i++) {
                if (i === correctAnswerNum) {
                    answerArr.push(correctWord.translate);
                } else {
                    answerArr.push(wordData[answerArrIndex[j]].translate);
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
    };

    _openTestVocabularyScreen = () => {
        if (this.topicData.length <= 4) {
            Alert.alert(
                'Alert',
                'Not enough data to run test!',
            );
        } else {
            sharedQuizService.initTestVocabulary(this._wordDataToTestData(this.topicData));
            this.props.navigation.navigate('Questions'
                , {
                    'quizOver': this.quizOver
                }
            );
        }
    };

    _onResultScreenOpen = (correctAnswer, totalAnswer) => {
        this._storeVocabularyResult(correctAnswer,totalAnswer);
    };


    _storeVocabularyResult = async (correctAnswer,totalAnswer) => {
        const result = correctAnswer / totalAnswer;
        let topicResultMap = await LocalStoreHelper._getMapData(LocalStoreHelper.topicResult);
        if (topicResultMap == null) {
            topicResultMap = new Map();
        }
        topicResultMap.set(this.topic.id, result);

        // calculate user score
        let score = await LocalStoreHelper._getMapData(LocalStoreHelper.score);
        if (score == null) {
            score = new Map();
            score.set('totalAnswer', totalAnswer);
            score.set('correctAnswer', correctAnswer);
        } else {
            score.set('totalAnswer', totalAnswer + score.get('totalAnswer'));
            score.set('correctAnswer', correctAnswer + score.get('correctAnswer'));
        }

        LocalStoreHelper._storeMapData(LocalStoreHelper.topicResult, topicResultMap);
        LocalStoreHelper._storeMapData(LocalStoreHelper.score, score);
    };

    quizOver = (quizStore) => {
        this.props.navigation.popToTop();
        const navigation = this.props.navigation;
        const tryAgainButton = async () => {
            this._openTestVocabularyScreen();
        };
        const homeFunc = async () => {
            this.props.navigation.navigate('Word',
                {
                    topic: this.topic
                });
        };
        navigation.navigate('Results', {
            totalAnswer: quizStore.getTotalQuestionNumber(),
            correctedAnswer: quizStore.state.correctedAnswer,
            uncorrectedAnswer: quizStore.state.uncorrectedAnswer,
            leftButtonText: 'LET DO AGAIN',
            leftButtonClick: tryAgainButton,
            rightButtonText: 'Go Back',
            rightButtonClick: homeFunc,
            onResultScreenOpen: this._onResultScreenOpen,
        });
    };

    //endregion

    // ------------- LEARN SCREEN

    _openLearnScreen = () => {
        this.props.navigation.navigate('Learn', {
            topic: this.topic
        });
    };

    render() {
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
                    <Title>{this.topic.name}</Title>
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
                    <Title>{this.topic.name}</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>
                <Content
                    contentContainerStyle={{flexGrow: 1}}>
                    <View style={{
                        flex: 1,
                        backgroundColor: '#EEEEEE'
                    }}>
                        <FlatList
                            data={this.topicData}
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
                        title="Learn Word"
                        onPress={() => {
                            this._openLearnScreen();
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
                        title="Practice"
                        onPress={() => {this._openTestVocabularyScreen()}}>
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