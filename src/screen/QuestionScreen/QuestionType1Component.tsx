import * as React from 'react';
import {Text, View} from 'native-base';
import {StyleSheet, ViewStyle, TextStyle } from "react-native";
import IQuestion, { QuestionType } from '../../entity/Question';
import { systemWeights } from 'react-native-typography';
import AnswerButton, { AnswerState } from './AnswerButton';
export interface Props{
    question: IQuestion,
    answerState: AnswerState[],
    onChooseAnswer: (index: number) => void,
}

export default class QuestionType1Component extends React.Component<Props>{
    constructor(prop: Props){
        super(prop);

        if(prop.question.type !== QuestionType.part5){
            throw new TypeError('The question is not type5 question')
        }
    }
    render() {
        const {question, onChooseAnswer, answerState} = this.props;

        return (
            <View>
                <View key='question' style={styles.questionView}>
                    <Text adjustsFontSizeToFit minimumFontScale={.5} style={styles.questionText as TextStyle}>
                        {question.question}
                    </Text>
                </View>
                <View>
                {
                    question.answer.map((value, index) => 
                    <View key={index} style={styles.answerButton as ViewStyle}>
                        <AnswerButton answerState={answerState[index]} 
                            onPress = {() => onChooseAnswer(index)}
                            text={value}/>
                    </View>)
                }
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
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