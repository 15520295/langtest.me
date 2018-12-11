import React from 'react';
import { Container, Icon, View, Text, Content} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
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
import GestureView from './GestureView';
import sharedQuizService from '../../services/QuizService';



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


export interface QuizScreenContainerProps extends NavigationScreenProps<{}>{ 
    quizStore: QuizStore,
}

interface States{
    answerState: AnswerState[],
    isWaiting: boolean,
    isAnimation: boolean,
    isLoading: boolean,
    isOver: boolean
}

export default class QuizScreenContainer extends React.Component<QuizScreenContainerProps, States>{
    constructor(props: QuizScreenContainerProps){
        super(props);
        
        this.state = {
            answerState: [AnswerState.normal, AnswerState.normal, AnswerState.normal, AnswerState.normal],
            isWaiting: false,
            isAnimation: false,
            isLoading: true,
            isOver: false
        };
    }

    async componentDidMount(){
        await this.props.quizStore.init();
        this.setState({
            isLoading: false,
            answerState: [AnswerState.normal, AnswerState.normal, AnswerState.normal, AnswerState.normal],
            isWaiting: false,
            isAnimation: false,
            isOver: false});
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
        const {navigation} = this.props;
        const tryAgainButton = async function (): Promise<void> {
            await sharedQuizService.initQuickTest();
            navigation.navigate('Questions');
        }
        const homeFunc = function(): void {
            navigation.navigate('Home');
        }
        navigation.navigate('Results', {totalAnswer: quizStore.getTotalQuestionNumber(),
            correctedAnswer: quizStore.state.correctedAnswer,
            uncorrectedAnswer: quizStore.state.uncorrectedAnswer,
            leftButtonText: "LET DO AGAIN",
            leftButtonClick: tryAgainButton,
            rightButtonText: "Go Home",
            rightButtonClick: homeFunc})
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
                    <Content>
                        <GestureView onLeftSwipe={()=> {this.prevQuestion()}}
                            onRightSwipe={() => {this.nextQuestion()}}
                            style={{flex: 1}}>
                            {this.renderAnswerQuestion()}
                        </GestureView>    
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