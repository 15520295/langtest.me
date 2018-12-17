import React from 'react';
import { Container, Icon, View, Text, Content} from 'native-base';
import {StyleSheet, TouchableOpacity, Alert, Platform} from 'react-native';
import {AppLoading} from 'expo';
import { AnswerState } from './AnswerButton';
import posed, { Transition } from 'react-native-pose';
import QuizStore from '../../store/quizStore';
import QuizScreenHeader from './QuizScreenHeader';
import AudioPlayer from './AudioPlayer';
import { widthPercentageToDP, heightPercentageToDP } from '../../helper/ratioHelper';
import QuizScreenTimer from './QuizScreenTimer';
import { NavigationScreenProps, NavigationParams } from 'react-navigation';
import GestureView from './GestureView';
import sharedQuizService from '../../services/QuizService';
import QuestionComponent from './QuestionComponent';

const BoxAndroid = posed.View({
    before: {
        x: widthPercentageToDP(100),
        y: 0,
        scale: 0.5
    },
    enter: {
        x: 0,
        y: 0,
        scale: 1
    },
    exit: {
        x: -widthPercentageToDP(100),
        y: 0,
        scale: 0.5
    }
});

const BoxiOS = posed.View({
    before: {
        x: 50,
        y: 0,
        opacity: 0,
        scale: 0.7
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
        scale: 0.7,
        opacity: 0
    }
});

export interface QuizScreenContainerProps extends NavigationScreenProps<NavigationParams, any>{ 
    quizStore: QuizStore,
    onQuizOver?: (quizStore: QuizStore) => void
}

interface States{
    answerState: AnswerState[],
    isWaiting: boolean,
    isAnimation: boolean,
    isLoading: boolean,
    isNextQuestion: boolean
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
            isNextQuestion: true,
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

    flipAnimation = () => {
        if(this.state.isAnimation){
            console.log("First");
        } else {
            console.log("Second");
        }
        this.setState({isAnimation: !this.state.isAnimation});
        
    }

    reset = async () => {
        await this.setState({
            isLoading: false,
            answerState: [AnswerState.normal, AnswerState.normal, AnswerState.normal, AnswerState.normal],
            isWaiting: false,
            isAnimation: false,
            isOver: false});
    }


    nextQuestion = async () => {
        this.flipAnimation();
        const {quizStore} = this.props;
        // Wait a bit for disapperance animation
        await this.setState({
            isWaiting: false,
            isNextQuestion: true
        });
        await quizStore.nextQuestion();
        await this.setState({
            answerState: quizStore.getCurrentAnswerState()
        })
    }

    prevQuestion = async () => {
        this.flipAnimation();
        const {quizStore} = this.props;
        //Wait a bit for disapperance animation
        await this.setState({
            isWaiting: false,
            isNextQuestion: false
        });
        await quizStore.prevQuestion();
        await this.setState({
            answerState: quizStore.getCurrentAnswerState()
        })
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

    finishQuiz = () => {
        Alert.alert(
            'Are you sure to finish ?',
            'You can not go back',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Finish', onPress: () => this.quizOver()},
            ],
            { cancelable: true }
          )
    }
    quizOver = () => {
        const {quizStore, navigation} = this.props;
        const onQuizOver: (quizStore : QuizStore) => void = navigation.getParam('rightButtonClick', this.props.onQuizOver);
        if(onQuizOver){
            onQuizOver(quizStore);
            return;
        }
        const reset = this.reset;
        const tryAgainButton = async function (): Promise<void> {
            await sharedQuizService.initQuickTest();
            navigation.navigate('Questions');
        }
        const homeFunc = async function(): Promise<void> {
            await reset();
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
        return (
            <QuestionComponent
                question={question} 
                         answerState={this.state.answerState} 
                         onChooseAnswer={(index) => this.chooseAnswer(index)}
                         style={{flex: 1 ,width: widthPercentageToDP(84)}}/>
        );
    }

    renderAnswerQuestion () {
        const {quizStore} = this.props;
        return (
            <View style={{flex: 1}}>
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
                    <TouchableOpacity onPress={() => {this.nextQuestion();}} >
                        <Icon name='arrow-forward' style={{color: '#019AE8'}} android="md-arrow-forward" ios="ios-arrow-forward" /> 
                    </TouchableOpacity>
                </View>
                {Platform.OS === 'ios'
                ?
                <Transition preEnterPose={this.state.isNextQuestion ? 'before' : 'exit'} 
                            exitPose={this.state.isNextQuestion ? 'exit' : 'before'} style={{position: 'absolute'}}>
                {
                    this.state.isAnimation 
                    ?
                    <BoxiOS key='question'>
                        {this.renderQuestion()}
                    </BoxiOS>
                    :
                    <BoxiOS key='question2'>
                        {this.renderQuestion()}
                    </BoxiOS>
                }
                </Transition>
                :
                <Transition preEnterPose={this.state.isNextQuestion ? 'before' : 'exit'} 
                exitPose={this.state.isNextQuestion ? 'exit' : 'before'}
                enterAfterExit={true}>
                {
                    this.state.isAnimation 
                    ?
                    <BoxAndroid key='question'>
                        {this.renderQuestion()}
                    </BoxAndroid>
                    :
                    <BoxAndroid key='question2'>
                        {this.renderQuestion()}
                    </BoxAndroid>
                }
                </Transition>
                }
            </View>
        );
    }

    render() {
        if (this.state.isLoading || this.state.isOver){
            return <AppLoading/>;
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
                            onFinishButton={this.finishQuiz}
                    />
                    <Content scrollEnabled={false}>
                        <QuizScreenTimer interval={500} 
                        totalTime={5 * 60 * 1000} 
                        style={styles.timer} 
                        height={heightPercentageToDP(0.75)} 
                        width={widthPercentageToDP(100)}
                        color="#019AE8"
                        borderColor="white"
                        borderRadius={0}
                        onOver = {() => {this.quizOver()}}/>
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
        marginTop: heightPercentageToDP(1)
    }
});