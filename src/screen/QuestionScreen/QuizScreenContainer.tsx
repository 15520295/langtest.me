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
// import MyProfile from '../../entity/ProfileData';
import DataHelper from '../../helper/DataHelper';
import Swiper from 'react-native-swiper';


export interface QuizScreenContainerProps extends NavigationScreenProps<NavigationParams, any>{ 
    quizStore: QuizStore,
    onQuizOver?: (quizStore: QuizStore) => void
}

interface States{
    answerState: AnswerState[][],
    isWaiting: boolean,
    isLoading: boolean,
    isOver: boolean,
    flashCorrect: boolean,
    flashIncorrect: boolean
}

export default class QuizScreenContainer extends React.Component<QuizScreenContainerProps, States>{
    _audioPlayer: React.RefObject<AudioPlayer>;
    _questionDisplay: React.RefObject<Swiper>;
    constructor(props: QuizScreenContainerProps){
        super(props);
        this.state = {
            answerState: null,
            isWaiting: false,
            isLoading: true,
            isOver: false,
            flashCorrect: false,
            flashIncorrect: false
        };
        this._audioPlayer = React.createRef();
        this._questionDisplay = React.createRef();

    }

    async componentDidMount(){
        if (this.props.navigation != null) {
            this.props.navigation.addListener(
                'willBlur',
                _ => {
                    console.log(this._audioPlayer);
                    // this.audioPlayer.current._onStopPressed();
                }
            );
        }
        await this.props.quizStore.init();
        this.setState({
            isLoading: false,
            answerState: this.props.quizStore.state.questionList.map((_, __) => {
                return [AnswerState.normal, AnswerState.normal, AnswerState.normal, AnswerState.normal];
            }),
            isWaiting: false,
            isOver: false});
    }


    componentWillUnmount(){
        this.setState({
            isLoading: false,
            answerState: this.props.quizStore.state.questionList.map((_, __) => {
                return [AnswerState.normal, AnswerState.normal, AnswerState.normal, AnswerState.normal];
            }),
            isWaiting: false,
            isOver: false});
    }


    nextQuestion = async () => {
        const {quizStore} = this.props;
        await this.setState({
            isWaiting: false,
        });
        let oldIndex = quizStore.state.currentQuestion;
        await quizStore.nextQuestion();
        this._questionDisplay.current.scrollBy(quizStore.state.currentQuestion - oldIndex, true);
    }

    prevQuestion = async () => {
        const {quizStore} = this.props;
        await this.setState({
            isWaiting: false,
        });
        let oldIndex = quizStore.state.currentQuestion;
        await quizStore.prevQuestion();
        this._questionDisplay.current.scrollBy(quizStore.state.currentQuestion - oldIndex, true);
    }

    chooseAnswer = (idAnswer: number) => {
        //Avoid click on mutlyply answer
        if(this.state.isWaiting || this.props.quizStore.isCurrentQuestionAnswered()){
            return;
        }
        this.setState({isWaiting: true});
        if(this.props.quizStore.answerQuestion(idAnswer) === true){
            this.setState({flashCorrect: true});
        } else {
            this.setState({flashIncorrect: true});
        }
        let answerState = this.state.answerState;
        answerState[this.props.quizStore.state.currentQuestion] = this.props.quizStore.getCurrentAnswerState()
        this.setState({
            answerState: answerState
        })
        if(this.props.quizStore.isOver()){
            setTimeout(() => {
                this.setState({
                    flashCorrect: false,
                    flashIncorrect: false
                });
                this.quizOver();}, 500);
        } else {
            setTimeout(() => {
                this.setState({
                    flashCorrect: false,
                    flashIncorrect: false
                });
                this.nextQuestion();}, 500);
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

    saveQuizResult = () => {
        const {quizStore} = this.props;

        DataHelper._updateTestResult(sharedQuizService.getMode(),
            quizStore.getTotalQuestionNumber(),
            quizStore.state.currentQuestion,
            quizStore.state.uncorrectedAnswer,
            Math.ceil(quizStore.state.doingTimer / 60000));
    }

    quizOver = () => {
        this.saveQuizResult();
        const {quizStore, navigation} = this.props;
        const onQuizOver: (quizStore : QuizStore) => void = navigation.getParam('rightButtonClick', this.props.onQuizOver);
        if(onQuizOver){
            onQuizOver(quizStore);
            return;
        }
        const tryAgainButton = async function (): Promise<void> {
            await sharedQuizService.initLastTest();
            navigation.navigate('Questions');
        }
        const homeFunc = async function(): Promise<void> {
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

    renderAudio () {
        const question = this.props.quizStore.getCurrentQuestionInfo();
        if(question.audioAsset){
            return (
                <AudioPlayer red={this._audioPlayer} uri={question.audioAsset} name={question.id} styles = {{width: widthPercentageToDP(100)}}/>
            );
        }
        return null;
    }

    renderQuestion () {
        const {quizStore} = this.props;
        const question = quizStore.getCurrentQuestionInfo();
        // return (
        //     <QuestionComponent
        //         question={question} 
        //                  answerState={this.state.answerState} 
        //                  onChooseAnswer={(index) => this.chooseAnswer(index)}
        //                  style={{flex: 1 ,width: widthPercentageToDP(84)}}/>
        // );
        return(
            <Swiper 
            ref = {this._questionDisplay}
            loop = {true}
            onIndexChanged={(index) => {quizStore.setState({currentQuestion: index})}}>
            {quizStore.state.questionList.map((question, index) => {
                return (
                    <QuestionComponent
                        key={index}
                        question={question} 
                        answerState={this.state.answerState[index]} 
                        onChooseAnswer={(index) => this.chooseAnswer(index)}
                        style={{flex: 1}}/>
                );
            })}
          </Swiper>
        )
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
                            flashCorrect={this.state.flashCorrect}
                            flashIncorrect={this.state.flashIncorrect}
                    />
                    <Content scrollEnabled={false}>
                        <QuizScreenTimer interval={500} 
                        totalTime={5 * 60 * 1000} 
                        style={styles.timer} 
                        height={heightPercentageToDP(0.4)} 
                        width={widthPercentageToDP(100)}
                        color="#019AE8"
                        borderColor="white"
                        borderRadius={0}
                        onTick = {(timer) => {quizStore.setTimer(timer)}}
                        onOver = {() => {this.quizOver()}}/>
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
                        {this.renderQuestion()}
                    </Content>
                    {this.renderAudio()}   
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