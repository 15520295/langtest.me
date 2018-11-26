import React from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, View, Text, Content} from 'native-base';
import {StyleSheet, TouchableOpacity, Platform} from 'react-native';
import AnswerButton from '../components/AnswerButton';
import {robotoWeights} from 'react-native-typography';


const QuestionData = [
    {
        id: 1,
        question: 'Thank you for your ------ in the Foxdale Apartments community enhancement survey',
        answer1: 'participant',
        answer2: 'participation',
        answer3: 'participate',
        answer4: 'participated',
        correct: 2
    },
    {
        id: 2,
        question: 'Company officials must disclose their own ------ affairs.',
        answer1: 'finance',
        answer2: 'financing',
        answer3: 'financial',
        answer4: 'financed',
        correct: 3
    },
    {
        id: 3,
        question: 'Ms. Kim asks that the marketing team e-mail the final draft to ------ before 5 p.m.',
        answer1: 'her',
        answer2: 'she',
        answer3: 'hers',
        answer4: 'herself',
        correct: 1
    }
];

export default class QuestionScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            correctAnswer: 0,
            incorrectAnswer: 0,
            currentQuestion: 0,
            answerState: [0, 0, 0, 0],
            isWaiting: false
        };
    }

    nextQuestion = () => {
        this.setState({
            isWaiting: false,
            answerState: [0, 0, 0, 0],
            currentQuestion: (this.state.currentQuestion + 1) % QuestionData.length
        });
    }

    prevQuestion = () => {
        this.setState({
            isWaiting: false,
            answerState: [0, 0, 0, 0],
            currentQuestion: (this.state.currentQuestion + QuestionData.length- 1) % QuestionData.length
        });
    }

    chooseAnswer = (idAnswer) => {
        if(this.state.isWaiting){
            return;
        }
        this.setState({isWaiting: true});
        if(idAnswer === QuestionData[this.state.currentQuestion].correct){
            let answerState = this.state.answerState;
            answerState[idAnswer - 1] = 1;
            this.setState({answerState: answerState, correctAnswer: this.state.correctAnswer + 1});
        }
        else
        {
            let answerState = this.state.answerState;
            answerState[QuestionData[this.state.currentQuestion].correct - 1] = 1;
            answerState[idAnswer - 1] = 2;
            this.setState({answerState: answerState, incorrectAnswer: this.state.incorrectAnswer + 1});
        }
        setTimeout(() => {this.nextQuestion();}, 2000);
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header androidStatusBarColor="#0076BF" style={{backgroundColor: Platform.OS ==='android' ? '#019AE8' : '#FFFFFF'}}>
                    <Left>
                        <Button transparent>
                            <Icon android='md-arrow-back' ios='ios-arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Part 5</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Title style={{paddingRight: 10}}>{this.state.correctAnswer}</Title>
                            <Icon android='md-thumbs-up' ios='ios-thumbs-up'/>
                        </Button>
                        <Button transparent>
                            <Title style={{paddingRight: 10}}>{this.state.incorrectAnswer}</Title>
                            <Icon android='md-thumbs-down' ios='ios-thumbs-down'/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <View style={styles.navigationView}>
                        <TouchableOpacity onPress={() => {this.prevQuestion();}}>
                            <Icon style={{color: '#019AE8'}} android="md-arrow-back" ios="ios-arrow-back" /> 
                        </TouchableOpacity>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity>
                                <Text style={{fontSize: 18,color: '#019AE8'}}>{this.state.currentQuestion + 1}</Text>
                            </TouchableOpacity>
                            <Text style={{fontSize: 18}}>/{QuestionData.length}</Text>
                        </View>
                        <TouchableOpacity onPress={() => {this.nextQuestion();}}>
                            <Icon style={{color: '#019AE8'}} android="md-arrow-forward" ios="ios-arrow-forward" /> 
                        </TouchableOpacity>
                    </View>
                    <View style={styles.questionView}>
                        <Text adjustsFontSizeToFit minimumFontScale={.5} style={styles.questionText}>
                            {
                                QuestionData[this.state.currentQuestion].question
                            }
                        </Text>
                    </View>
                    <View style={styles.answerButton}>
                        <AnswerButton correctAnswer={this.state.answerState[0] === 1} 
                            incorrectAnswer={this.state.answerState[0] === 2} 
                            onPress = {() => {this.chooseAnswer(1);}}
                            text={QuestionData[this.state.currentQuestion].answer1}/>
                    </View>

                    <View style={styles.answerButton}>
                        <AnswerButton correctAnswer={this.state.answerState[1] === 1} 
                            incorrectAnswer={this.state.answerState[1] === 2} 
                            onPress = {() => {this.chooseAnswer(2);}}
                            text={QuestionData[this.state.currentQuestion].answer2}/>
                    </View>
                    
                    <View style={styles.answerButton}>
                        <AnswerButton correctAnswer={this.state.answerState[2] === 1} 
                            incorrectAnswer={this.state.answerState[2] === 2} 
                            onPress = {() => {this.chooseAnswer(3);}}
                            text={QuestionData[this.state.currentQuestion].answer3}/>
                    </View>

                    <View style={styles.answerButton}>
                        <AnswerButton correctAnswer={this.state.answerState[3] === 1} 
                            incorrectAnswer={this.state.answerState[3] === 2} 
                            onPress = {() => {this.chooseAnswer(4);}}
                            text={QuestionData[this.state.currentQuestion].answer4}/>
                    </View>
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
        textAlign: 'justify',
        ...robotoWeights.light
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