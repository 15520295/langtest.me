import React from 'react';
import { Container, Icon, View, Text, Content} from 'native-base';
import {StyleSheet, TouchableOpacity, PanResponder, PanResponderGestureState, PanResponderInstance} from 'react-native';
import {AppLoading} from 'expo';
import { AnswerState } from './AnswerButton';
import posed, { Transition } from 'react-native-pose';
import QuizStore from '../../store/quizStore';
import QuizScreenHeader from './QuizScreenHeader';
import QuestionType1Component from './QuestionType1Component';
import AudioPlayer from './AudioPlayer';
import { QuestionType } from '../../entity/Question';
import QuestionType2Component from './QuestionType2Component';
import { widthPercentageToDP, heightPercentageToDP } from '../../helper/ratioHelper';
import QuestionType5Component from './QuestionType5Component';
import QuestionType3Component from './QuestionType3Component';
import QuizScreenTimer from './QuizScreenTimer';
import { NavigationScreenProps } from 'react-navigation';



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

export interface QuizScreenContainerProps extends NavigationScreenProps<{}>{ 
    quizStore: QuizStore,
}

interface States{
    quadrants: any,
    answerState: AnswerState[],
    isWaiting: boolean,
    isAnimation: boolean,
    isLoading: boolean,
    isOver: boolean
}

export default class QuizScreenContainer extends React.Component<QuizScreenContainerProps, States>{
    _panResponder: PanResponderInstance;
    constructor(props: QuizScreenContainerProps){
        super(props);
        
        this.state = {
            quadrants: this.calculateQuadrants(quadrantThreshold),
            answerState: [AnswerState.normal, AnswerState.normal, AnswerState.normal, AnswerState.normal],
            isWaiting: false,
            isAnimation: false,
            isLoading: true,
            isOver: false
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
    async componentDidMount(){
        await this.props.quizStore.init();
        this.setState({isLoading: false});
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

    nextQuestion = async () => {
        const {quizStore} = this.props;
        //Wait a bit for disapperance animation
        await this.setState({isAnimation: true});
        setTimeout(async() => {
            await this.setState({
                isWaiting: false,
                isAnimation: false,
            });
            await quizStore.nextQuestion();
            await this.setState({
                answerState: quizStore.getCurrentAnswerState()
            })
        }, 50);
    }

    prevQuestion = async () => {
        const {quizStore} = this.props;
        await this.setState({isAnimation: true});
        setTimeout(async() => {
            await this.setState({
                isWaiting: false,
                isAnimation: false,
            });
            await quizStore.prevQuestion();
            await this.setState({
                answerState: quizStore.getCurrentAnswerState()
            })
        }, 50);
    }

    chooseAnswer = (idAnswer: number) => {
        //Avoid click on mutlyply answer
        if(this.state.isWaiting || this.props.quizStore.isCurrentQuestionAnswered()){
            return;
        }
        this.setState({isWaiting: true});
        this.props.quizStore.answerQuestion(idAnswer);
        this.setState({
            answerState: this.props.quizStore.getCurrentAnswerState()
        })
        if(this.props.quizStore.isOver()){
            setTimeout(() => {this.quizOver();}, 500);
        } else {
            setTimeout(() => {this.nextQuestion();}, 500);
        }
        
    }

    quizOver = () => {
        const {quizStore} = this.props;
        this.props.navigation.navigate('Results', {totalAnswer: quizStore.getTotalQuestionNumber(),
            correctedAnswer: quizStore.state.correctedAnswer,
            uncorrectedAnswer: quizStore.state.uncorrectedAnswer,
            leftButtonText: "LET DO AGAIN",
            rightButtonText: "Go Home",})
    }

    renderQuestion () {
        const {quizStore} = this.props;
        const question = quizStore.getCurrentQuestionInfo();
        switch(question.type){
            case QuestionType.part1:
                return (
                    <QuestionType1Component 
                        question={question} 
                        answerState={this.state.answerState} 
                        onChooseAnswer={(index) => this.chooseAnswer(index)}/>
                )
            case QuestionType.part2:
                return (
                    <QuestionType2Component
                        question={question} 
                        answerState={this.state.answerState} 
                        onChooseAnswer={(index) => this.chooseAnswer(index)}/>
                )
            case QuestionType.part3: case QuestionType.part4 : case QuestionType.part6 : case QuestionType.part7 :
                return (
                    <QuestionType3Component
                        question={question} 
                        answerState={this.state.answerState} 
                        onChooseAnswer={(index) => this.chooseAnswer(index)}/>
                )
            case QuestionType.part5:
                return (
                    <QuestionType5Component
                        question={question} 
                        answerState={this.state.answerState} 
                        onChooseAnswer={(index) => this.chooseAnswer(index)}/>
                )
            default:
                return (
                    <QuestionType3Component 
                        question={question} 
                        answerState={this.state.answerState} 
                        onChooseAnswer={(index) => this.chooseAnswer(index)}/>
                )
        }
    }

    renderAnswerQuestion () {
        const {quizStore} = this.props;
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
                {this.renderQuestion()}
            </Box>
                    }
                </Transition>
            </View>
        );
    }

    render() {
        if(this.state.isLoading || this.state.isOver){
            return <AppLoading/>
        };

        const {quizStore} = this.props;
        const question = quizStore.getCurrentQuestionInfo();
        return (
            <Container>
                <View style={styles.container}>
                    <QuizScreenHeader
                        title={question.type}
                        correctAnswer={quizStore.state.correctedAnswer}
                        uncorrectedAnswer={quizStore.state.uncorrectedAnswer}
                    />
                    <QuizScreenTimer interval={500} 
                    totalTime={5 * 60 * 1000} 
                    style={styles.timer} 
                    height={heightPercentageToDP(0.75)} 
                    width={widthPercentageToDP(100)}
                    color="#019AE8"
                    borderColor="white"
                    borderRadius={0}
                    onOver = {() => {this.quizOver()}}/>
                    <Content {...this._panResponder.panHandlers}>
                        {this.renderAnswerQuestion()}
                    </Content>
                    {question.audioAsset && 
                        <AudioPlayer uri={question.audioAsset} name={question.id} styles = {{width: widthPercentageToDP(100)}}/>
                    }
                </View>
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
    timer: {
        marginTop: heightPercentageToDP(0),
    },
    navigationView: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginLeft: widthPercentageToDP(8),
        marginRight: widthPercentageToDP(8),
        marginTop: heightPercentageToDP(2)
    }
});