import * as React from 'react';
import {View, Text} from 'native-base';
import {StyleSheet, ViewStyle, Image, ImageStyle} from "react-native";
import IQuestion, { QuestionType } from '../../entity/Question';
import { systemWeights } from 'react-native-typography';
import AnswerButton, { AnswerState } from './AnswerButton';
import { widthPercentageToDP, heightPercentageToDP } from '../../helper/ratioHelper';
import ImageZoom from 'react-native-image-pan-zoom';

export interface QuestionComponentProps{
    question: IQuestion,
    answerState: AnswerState[],
    onChooseAnswer: (index: number) => void,
}


export default class QuestionComponent extends React.Component<QuestionComponentProps>{
    constructor(prop: QuestionComponentProps){
        super(prop);

    }
    renderAnswerButton(index: number, value: string) {
        const {onChooseAnswer, answerState} = this.props;

        return (
            <View key={index} style={styles.answerButton as ViewStyle}>
                <AnswerButton answerState={answerState[index]} 
                    onPress = {() => onChooseAnswer(index)}
                    text={value}/>
            </View>)
    }

    renderAnswer(){
        const {question} = this.props; 
        switch(question.type){
            case QuestionType.part1:
            return(
                <View>
                    <View style={styles.answerContainerTwoRow}>
                        {this.renderAnswerButton(0, question.answer[0])}
                        {this.renderAnswerButton(1, question.answer[1])}
                    </View>

                    <View style={styles.answerContainerTwoRow}>
                        {this.renderAnswerButton(2, question.answer[2])}
                        {this.renderAnswerButton(3, question.answer[3])}
                    </View>
                </View>);
            case QuestionType.part2:
            return(
                <View style={styles.answerContainer}>
                    {this.renderAnswerButton(0, question.answer[0])}
                    {this.renderAnswerButton(1, question.answer[1])}
                    {this.renderAnswerButton(2, question.answer[2])}
                </View>);
            default:
            return(
            <View style={styles.answerContainer}>
                {this.renderAnswerButton(0, question.answer[0])}
                {this.renderAnswerButton(1, question.answer[1])}
                {this.renderAnswerButton(2, question.answer[2])}
                {this.renderAnswerButton(3, question.answer[3])}
            </View>);

        }
    }
    render() {
        const {question} = this.props;  
        return (
            <View style={styles.container}>
                {question.imageAsset && 
                    <ImageZoom 
                        cropWidth={widthPercentageToDP(84)}
                       cropHeight={heightPercentageToDP(25)}
                       imageWidth={widthPercentageToDP(84)}
                       imageHeight={heightPercentageToDP(25)}
                       minScale={0.2}
                    style={styles.imageView as ImageStyle}>
                        <Image style={{width: widthPercentageToDP(84), height: heightPercentageToDP(25)}}
                                source={question.imageAsset}
                                resizeMode='contain'/>
                    </ImageZoom>

                }
                <Text adjustsFontSizeToFit minimumFontScale={.5} style={styles.questionText}>	
                        {question.question}
                </Text>
                {this.renderAnswer()}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    imageView: {
        flex: 1,
        marginLeft: widthPercentageToDP(8),
        marginRight: widthPercentageToDP(8),
        marginTop: heightPercentageToDP(2),
        marginBottom: heightPercentageToDP(2),
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    questionText: {
        color: '#4F4F4F',
        fontSize: 20,
        marginLeft: widthPercentageToDP(8),
        justifyContent: 'center',
        alignItems: 'stretch',
        maxHeight: heightPercentageToDP(15),
        marginBottom: heightPercentageToDP(2),
        ...systemWeights.light
    },
    answerContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: widthPercentageToDP(8),
        marginRight: widthPercentageToDP(8),
    },
    answerContainerTwoRow: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: widthPercentageToDP(8),
        marginRight: widthPercentageToDP(8),
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    answerButton: {
        flex: 1,
        marginBottom: heightPercentageToDP(2),
        height: heightPercentageToDP(9.3),
        maxHeight: heightPercentageToDP(9.3),
        shadowRadius: 0
    }
});