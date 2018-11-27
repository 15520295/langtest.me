import React from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, View, Text, Content} from 'native-base';
import {StyleSheet, TouchableOpacity, Platform, PanResponder, Dimensions} from 'react-native';
import AnswerButton from '../../components/AnswerButton';
import {systemWeights} from 'react-native-typography';
import posed, { Transition } from 'react-native-pose';


//TODO: Fix pre-enter pose
const Box = posed.View({
    before: {
        x: 50,
        y: 0,
        opacity: 0,
        scale: 0.9
    },
    enter: {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1
    },
    exit: {
        x: -50,
        y: 0,
        scale: 0.9,
        opacity: 0
    }
});


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

const { width } = Dimensions.get('window');
const touchThreshold = 20;
const swipeThreshold = 30;
const quadrantThreshold = 30;

export default class QuestionScreenDumb extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            quadrants: this.calculateQuadrants(quadrantThreshold),
            correctAnswer: 0,
            incorrectAnswer: 0,
            currentQuestion: 0,
            answerState: [0, 0, 0, 0],
            isWaiting: false,
            isAnimation: false
        };


        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: (evt, gestureState) =>{
                const {dx, dy} = gestureState;
                return (Math.abs(dx) > touchThreshold) || (Math.abs(dy) > touchThreshold);
            },
            onPanResponderRelease: (...args) => this.handleSwipe(...args)
        });

        this.calculateQuadrants = this.calculateQuadrants.bind(this);
        this.handleSwipe = this.handleSwipe.bind(this);
    }


    calculateQuadrants (threshold) {
        return {
            right: [0 + threshold, 0 - threshold],
            up: [-90 + threshold, -90 - threshold],
            down: [90 + threshold, 90 - threshold],
            topLeft: [-180 + threshold, -180],
            bottomLeft: [180, 180 - threshold]
        };
    }

    isInsideQuadrant (quadrants, direction, angle) {
        return angle >= quadrants[direction][1] && angle <= quadrants[direction][0];
    }

    handleSwipe (pan, gesture) {
        const angle = Math.atan2(gesture.dy, gesture.dx) * (180 / Math.PI);
        const distance = Math.sqrt(Math.pow(gesture.dx, 2) + Math.pow(gesture.dy, 2));

        if (distance > swipeThreshold) {
            if (this.isInsideQuadrant(this.state.quadrants, 'right', angle)) {
                this.nextQuestion();
            } else if (this.isInsideQuadrant(this.state.quadrants, 'topLeft', angle)) {
                this.prevQuestion();
            } else if (this.isInsideQuadrant(this.state.quadrants, 'bottomLeft', angle)) {
                this.prevQuestion();
            } 
        } 
    }

    nextQuestion = () => {
        //Wait a bit for disapperance animation
        this.setState({isAnimation: true});
        this.forceUpdate();
        setTimeout(() => {
            this.setState({
                isWaiting: false,
                isAnimation: false,
                answerState: [0, 0, 0, 0],
                currentQuestion: (this.state.currentQuestion + 1) % QuestionData.length
            });
        }, 50);
    }

    prevQuestion = () => {
        this.setState({isAnimation: true});
        this.forceUpdate();
        setTimeout(() => {
            this.setState({
                isWaiting: false,
                isAnimation: false,
                answerState: [0, 0, 0, 0],
                currentQuestion: (this.state.currentQuestion + QuestionData.length- 1) % QuestionData.length
            });
        }, 50);
    }

    chooseAnswer = (idAnswer) => {
        //Avoid click on mutlyply answer
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
        setTimeout(() => {this.nextQuestion();}, 500);
    }

    renderAnswerQuestion () {
        return (
            <View>
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
                <Transition preEnterPose='before' exitPose='exit'>
                    {!this.state.isAnimation && 
            <Box preEnterPose='before' key='question'>
                <View key='question' style={styles.questionView}>
                    <Text adjustsFontSizeToFit minimumFontScale={.5} style={styles.questionText}>
                        {
                            QuestionData[this.state.currentQuestion].question
                        }
                    </Text>
                </View>

                <View key='answer1' style={styles.answerButton}>
                    <AnswerButton correctAnswer={this.state.answerState[0] === 1} 
                        incorrectAnswer={this.state.answerState[0] === 2} 
                        onPress = {() => {this.chooseAnswer(1);}}
                        text={QuestionData[this.state.currentQuestion].answer1}/>
                </View>
            </Box>
                    }
                </Transition>
            </View>
        );
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
                <Content scrollEnabled={false} {...this._panResponder.panHandlers}>
                    {this.renderAnswerQuestion()}
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
        fontSize: 20,
        textAlign: 'justify',
        ...systemWeights.light
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