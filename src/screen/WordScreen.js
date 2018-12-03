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
    Platform
} from 'react-native';
import TopicFlatList from '../components/vocabulary/TopicFlatList';
import WordFlatList from '../components/vocabulary/WordFlatList';

export default class WordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            correctAnswer: 0,

        };
    }

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
        const topicName = navigation.getParam('topicName', 'null');

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
                    <Title>Part 5</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            {/*<Title style={{paddingRight: 10}}>{this.state.correctAnswer}</Title>*/}
                            {/*<Icon android='md-thumbs-up' ios='ios-thumbs-up'/>*/}
                        </Button>
                        <Button transparent>
                            {/*<Title style={{paddingRight: 10}}>{this.state.incorrectAnswer}</Title>*/}
                            {/*<Icon android='md-thumbs-down' ios='ios-thumbs-down'/>*/}
                        </Button>
                    </Right>
                </Header>
                <Content>

                    <WordFlatList/>

                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
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