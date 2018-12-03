import * as React from 'react';
import {View} from 'native-base';
import {StyleSheet, ViewStyle, Dimensions, Image, ImageStyle} from "react-native";
import IQuestion, { QuestionType } from '../../entity/Question';
import { systemWeights } from 'react-native-typography';
import AnswerButton, { AnswerState } from './AnswerButton';
export interface Props{
    question: IQuestion,
    answerState: AnswerState[],
    onChooseAnswer: (index: number) => void,
}

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');

export default class QuestionType1Component extends React.Component<Props>{
    constructor(prop: Props){
        super(prop);

        if(prop.question.type !== QuestionType.part1){
            throw new TypeError('The question is not type1 question')
        }
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
    render() {
        const {question} = this.props;

        return (
            <View style={styles.container}>
                <Image style={styles.imageView as ImageStyle}
                     source={question.imageAsset}/>
                <View style={styles.answerContainer}>
                    {this.renderAnswerButton(0, question.answer[0])}
                    {this.renderAnswerButton(1, question.answer[1])}
                </View>

                <View style={styles.answerContainer}>
                    {this.renderAnswerButton(2, question.answer[2])}
                    {this.renderAnswerButton(3, question.answer[3])}
                </View>
                <View>
                   
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageView: {
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 10,
        maxHeight: DEVICE_HEIGHT / 3,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    questionText: {
        color: '#4F4F4F',
        fontSize: 20,
        textAlign: 'justify',
        ...systemWeights.light
    },
    answerContainer: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: 30,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    answerButton: {
        flex: 1,
        height: 60,
        shadowRadius: 0,
        width: DEVICE_WIDTH / 2
    }
});