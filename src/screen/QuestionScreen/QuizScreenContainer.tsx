import React from 'react';
import { Container, Icon, View, Text, Content, Button, Fab} from 'native-base';
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
import Carousel from 'react-native-snap-carousel';
import ActionButton from 'react-native-action-button';
import Draggable from 'react-native-draggable-holder';
import Modal from "react-native-modal";
import Chat from "./Chat";
import {AntDesign, MaterialCommunityIcons, FontAwesome, Entypo} from '@expo/vector-icons';

const config = {
    draggable: true,
    dragging: { scale: 1.2 },
    dragEnd: { scale: 1 }
  };
const PosedComponent = posed()(config);
export interface QuizScreenContainerProps extends NavigationScreenProps<NavigationParams, any> {
    quizStore: QuizStore,
    onQuizOver?: (quizStore: QuizStore) => void
}

interface States {
    answerState: AnswerState[][],
    isWaiting: boolean,
    isLoading: boolean,
    isOver: boolean,
    flashCorrect: boolean,
    flashIncorrect: boolean,
    showChat: boolean
}

export default class QuizScreenContainer extends React.Component<QuizScreenContainerProps, States> {
    _audioPlayer: React.RefObject<AudioPlayer>;
    _questionDisplay: React.RefObject<Carousel>;
    constructor(props: QuizScreenContainerProps) {
        super(props);
        this.state = {
            answerState: null,
            isWaiting: false,
            isLoading: true,
            isOver: false,
            flashCorrect: false,
            flashIncorrect: false,
            showChat: false
        };
        this._audioPlayer = React.createRef();
        this._questionDisplay = React.createRef();

    }

    async componentDidMount() {
        if (this.props.navigation != undefined) {
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

    componentWillUnmount() {
        this.setState({
            isLoading: false,
            answerState: this.props.quizStore.state.questionList.map((_, __) => {
                return [AnswerState.normal, AnswerState.normal, AnswerState.normal, AnswerState.normal];
            }),
            isWaiting: false,
            isOver: false});
    }

    toggleChat = () => {
        this.setState({
            showChat: !this.state.showChat
        })
    }
    nextQuestion = async () => {
        const {quizStore} = this.props;
        await this.setState({
            isWaiting: false
        });
        let oldIndex = quizStore.state.currentQuestion;
        await quizStore.nextQuestion();
        // this._questionDisplay.current.scrollBy(quizStore.state.currentQuestion - oldIndex, true);
        this._questionDisplay.current.snapToItem(quizStore.state.currentQuestion, true, false);
    }

    prevQuestion = async () => {
        const {quizStore} = this.props;
        await this.setState({
            isWaiting: false
        });
        let oldIndex = quizStore.state.currentQuestion;
        await quizStore.prevQuestion();
        // this._questionDisplay.current.scrollBy(quizStore.state.currentQuestion - oldIndex, true);
        this._questionDisplay.current.snapToItem(quizStore.state.currentQuestion, true, false);
    }

    chooseAnswer = (idAnswer: number) => {
        // Avoid click on mutlyply answer
        if (this.state.isWaiting || this.props.quizStore.isCurrentQuestionAnswered()) {
            return;
        }
        this.setState({isWaiting: true});
        if (this.props.quizStore.answerQuestion(idAnswer) === true) {
            this.setState({flashCorrect: true});
        } else {
            this.setState({flashIncorrect: true});
        }
        let answerState = this.state.answerState;
        answerState[this.props.quizStore.state.currentQuestion] = this.props.quizStore.getCurrentAnswerState();
        this.setState({
            answerState: answerState
        });
        if (this.props.quizStore.isOver()) {
            setTimeout(() => {
                this.setState({
                    flashCorrect: false,
                    flashIncorrect: false
                });
                this.quizOver(); }, 500);
        } else {
            setTimeout(() => {
                this.setState({
                    flashCorrect: false,
                    flashIncorrect: false
                });
                this.nextQuestion(); }, 500);
        }

    }

    finishQuiz = () => {
        Alert.alert(
            'Are you sure to finish ?',
            'You can not go back',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Finish', onPress: () => this.quizOver()}
            ],
            { cancelable: true }
          );
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
        const onQuizOver: (quizStore: QuizStore) => void = navigation.getParam('rightButtonClick', this.props.onQuizOver);
        if (onQuizOver) {
            onQuizOver(quizStore);
            return;
        }
        const tryAgainButton = async function (): Promise<void> {
            await sharedQuizService.initLastTest();
            navigation.navigate('Questions');
        };
        const homeFunc = async function(): Promise<void> {
            navigation.navigate('Home');
        };
        navigation.navigate('Results', {totalAnswer: quizStore.getTotalQuestionNumber(),
            correctedAnswer: quizStore.state.correctedAnswer,
            uncorrectedAnswer: quizStore.state.uncorrectedAnswer,
            leftButtonText: 'LET DO AGAIN',
            leftButtonClick: tryAgainButton,
            rightButtonText: 'Go Home',
            rightButtonClick: homeFunc});
    }

    renderAudio () {
        const question = this.props.quizStore.getCurrentQuestionInfo();
        if (question.audioAsset) {
            return (
                     <AudioPlayer 
                        ref={this._audioPlayer} 
                        uri={question.audioAsset} 
                        name={question.id}
                        style={{width: widthPercentageToDP(100), alignSelf : 'flex-end', maxHeight: heightPercentageToDP(10)}}/>
            );
        }
        return undefined;
    }

    _renderQuestionItem = ({item, index}) => {
        return (
            <QuestionComponent
                        key={index}
                        question={item}
                        answerState={this.state.answerState[index]}
                        onChooseAnswer={(answerIndex) => this.chooseAnswer(answerIndex)}/>
        );
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
            <Carousel
                data = {quizStore.state.questionList}
                renderItem = {this._renderQuestionItem}
                sliderWidth={widthPercentageToDP(100)}
                sliderHeight={heightPercentageToDP(100)}
                itemWidth={widthPercentageToDP(100)}
                onSnapToItem = {(slideIndex) => {
                    quizStore.setState({currentQuestion: slideIndex});
                }}
                ref = {this._questionDisplay}
                style = {{flex: 1}}>
            </Carousel>
        );
    }

    render() {
        if (this.state.isLoading || this.state.isOver) {
            return <AppLoading/>;
        }

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
                    <Draggable reverse={false}>
                    <Button onPress={this.toggleChat} 
                        style={{opacity: this.state.showChat ? 0 : 1, flex: 1, justifyContent: 'center', alignContent: 'center', width: 50, height: 50, borderRadius: 25, backgroundColor: '#019AE8' }}>
                        <Entypo name="help" color="white" size={16}/>
                    </Button>
                    </Draggable>
                            <Modal isVisible={this.state.showChat}>
                            <Chat/>
                            <Draggable offsetX={300}  reverse={false}>
                                <Button onPress={this.toggleChat} 
                                    style={{flex: 1, justifyContent: 'center', alignContent: 'center', width: 50, height: 50, borderRadius: 25, backgroundColor: '#EF2121' }}>
                                    <FontAwesome name="remove" size={widthPercentageToDP(4)} color="white" />    
                                </Button>
                            </Draggable>
                    </Modal>
                    <Content style={{flex: 1, flexDirection: 'column'}} scrollEnabled={false}>
                        <QuizScreenTimer interval={500}
                        totalTime={5 * 60 * 1000}
                        style={styles.timer}
                        height={heightPercentageToDP(0.4)}
                        width={widthPercentageToDP(100)}
                        color='#019AE8'
                        borderColor='white'
                        borderRadius={0}
                        onTick = {(timer) => {quizStore.setTimer(timer); }}
                        onOver = {() => {this.quizOver(); }}/>
                        <View style={styles.navigationView}>
                            <TouchableOpacity  onPress={() => {this.prevQuestion(); }}>
                                <Icon style={[styles.navigationBackButton, {color: '#019AE8'}]} name='arrow-back' android='md-arrow-back' ios='ios-arrow-back' />
                            </TouchableOpacity>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity>
                                    <Text style={{fontSize: 18, color: '#019AE8'}}>{quizStore.getCurrentQuestionNumber() + 1}</Text>
                                </TouchableOpacity>
                                <Text style={{fontSize: 18}}>/{quizStore.getTotalQuestionNumber()}</Text>
                            </View>
                            <TouchableOpacity onPress={() => {this.nextQuestion(); }} >
                                <Icon style={[styles.navigationNextButton, {color: '#019AE8'}]}  name='arrow-forward' android='md-arrow-forward' ios='ios-arrow-forward' />
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
        marginTop: heightPercentageToDP(0)
    },
    navigationView: {
        flex: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: widthPercentageToDP(8),
        marginRight: widthPercentageToDP(8)
    },
    navigationBackButton: {
        paddingRight: widthPercentageToDP(10),
        paddingHorizontal: widthPercentageToDP(2)
    },
    navigationNextButton: {
        paddingLeft: widthPercentageToDP(10),
        paddingHorizontal: widthPercentageToDP(2)
    }
});