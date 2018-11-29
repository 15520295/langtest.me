import React from 'react';
import { Container, Icon, View, Text, Content} from 'native-base';
import {StyleSheet, TouchableOpacity, PanResponder, ViewStyle, PanResponderGestureState, PanResponderInstance} from 'react-native';
import AnswerButton from './AnswerButton';
import {systemWeights} from 'react-native-typography';
import posed, { Transition } from 'react-native-pose';
import QuizStore from '../../store/quizStore';
import QuizScreenHeader from './QuestionScreenHeader';



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

const touchThreshold = 20;
const swipeThreshold = 30;
const quadrantThreshold = 30;

export interface Props{
    quizStore: QuizStore
}

interface States{
    quadrants: any,
    answerState: number[],
    isWaiting: boolean,
    isAnimation: boolean
}

export default class QuestionScreenContainer extends React.Component<Props, States>{
    _panResponder: PanResponderInstance;
    constructor(props: Props){
        super(props);

        this.state = {
            quadrants: this.calculateQuadrants(quadrantThreshold),
            answerState: [0, 0, 0, 0],
            isWaiting: false,
            isAnimation: false
        };


        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: (_, gestureState) =>{
                const {dx, dy} = gestureState;
                return (Math.abs(dx) > touchThreshold) || (Math.abs(dy) > touchThreshold);
            },
            onPanResponderRelease: (_, gestureState) => this.handleSwipe(gestureState)
        });

        this.calculateQuadrants = this.calculateQuadrants.bind(this);
        this.handleSwipe = this.handleSwipe.bind(this);
    }

    calculateQuadrants (threshold: number): any {
        return {
            right: [0 + threshold, 0 - threshold],
            up: [-90 + threshold, -90 - threshold],
            down: [90 + threshold, 90 - threshold],
            topLeft: [-180 + threshold, -180],
            bottomLeft: [180, 180 - threshold]
        };
    }

    isInsideQuadrant (quadrants: any, direction: string, angle: number): boolean {
        return angle >= quadrants[direction][1] && angle <= quadrants[direction][0];
    }

    handleSwipe (gesture:PanResponderGestureState): void {
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
        setTimeout(() => {
            this.setState({
                isWaiting: false,
                isAnimation: false,
                answerState: [0, 0, 0, 0]
            });
            this.props.quizStore.nextQuestion();
        }, 50);
    }

    prevQuestion = () => {
        this.setState({isAnimation: true});
        setTimeout(() => {
            this.setState({
                isWaiting: false,
                isAnimation: false,
                answerState: [0, 0, 0, 0]
            });
            this.props.quizStore.prevQuestion();
        }, 50);
    }

    chooseAnswer = (idAnswer: number) => {
        //Avoid click on mutlyply answer
        if(this.state.isWaiting){
            return;
        }
        this.setState({isWaiting: true});
        let questionInfo = this.props.quizStore.getCurrentQuestionInfo();
        if(this.props.quizStore.answerQuestion(idAnswer)){
            let answerState = this.state.answerState;
            answerState[idAnswer - 1] = 1;
            this.setState({answerState: answerState});
        }
        else
        {
            let answerState = this.state.answerState;
            answerState[questionInfo.correctAnswer - 1] = 1;
            answerState[idAnswer - 1] = 2;
            this.setState({answerState: answerState});
        }
        setTimeout(() => {this.nextQuestion();}, 500);
    }

    renderQuestion () {
        const {quizStore} = this.props;

        return (
            <View>
            {
                quizStore.getCurrentQuestionInfo().answer.map((value, index) => 
                <View key={index} style={styles.answerButton}>
                    <AnswerButton correctAnswer={this.state.answerState[index] === 1} 
                        incorrectAnswer={this.state.answerState[index] === 2} 
                        onPress = {() => {this.chooseAnswer(index + 1);}}
                        text={value}/>
                </View>)
            }
            </View>

        )
    }

    renderAnswerQuestion () {
        const {quizStore} = this.props;
        console.log('Current question info');
        console.log(quizStore.getCurrentQuestionInfo());
        return (
            <View>
                <View style={styles.navigationView}>
                    <TouchableOpacity onPress={() => {this.prevQuestion();}}>
                        <Icon name='arrow-back' style={{color: '#019AE8'}} android="md-arrow-back" ios="ios-arrow-back" /> 
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity>
                            <Text style={{fontSize: 18,color: '#019AE8'}}>{quizStore.getCurrentQuestionNumber() + 1}</Text>
                        </TouchableOpacity>
                        <Text style={{fontSize: 18}}>/{quizStore.getTotalQuestionNumber()}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {this.nextQuestion();}}>
                        <Icon name='arrow-forward' style={{color: '#019AE8'}} android="md-arrow-forward" ios="ios-arrow-forward" /> 
                    </TouchableOpacity>
                </View>
                <Transition preEnterPose='before' exitPose='exit'>
                    {!this.state.isAnimation && 
            <Box preEnterPose='before' key='question'>
                <View key='question' style={styles.questionView}>
                    <Text adjustsFontSizeToFit minimumFontScale={.5} style={styles.questionText}>
                        {quizStore.getCurrentQuestionInfo().question}
                    </Text>
                </View>
                {this.renderQuestion()}
            </Box>
                    }
                </Transition>
            </View>
        );
    }
    render() {
        const {quizStore} = this.props;

        return (
            <Container style={[styles.container as ViewStyle]}>
                <QuizScreenHeader
                    correctAnswer={quizStore.state.correctedAnswer}
                    uncorrectedAnswer={quizStore.state.uncorrectedAnswer}
                />
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