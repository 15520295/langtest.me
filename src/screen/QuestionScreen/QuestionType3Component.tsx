import * as React from 'react';
import {View, Text} from 'native-base';
import {StyleSheet, ViewStyle, Image, ImageStyle} from "react-native";
import IQuestion from '../../entity/Question';
import { systemWeights } from 'react-native-typography';
import AnswerButton, { AnswerState } from './AnswerButton';
import { widthPercentageToDP, heightPercentageToDP } from '../../helper/ratioHelper';
export interface Props{
    question: IQuestion,
    answerState: AnswerState[],
    onChooseAnswer: (index: number) => void,
}


export default class QuestionType3Component extends React.Component<Props>{
    constructor(prop: Props){
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
    render() {
        const {question} = this.props;
        return (
            <View style={styles.container}>
                {question.imageAsset && 
                    <Image style={styles.imageView as ImageStyle}
                            source={question.imageAsset}
                            resizeMode='contain'/>
                }
                <Text adjustsFontSizeToFit minimumFontScale={.5} style={styles.questionText}>	
                        {question.question}
                </Text>            
                <View style={styles.answerContainer}>
                    {this.renderAnswerButton(0, question.answer[0])}
                    {this.renderAnswerButton(1, question.answer[1])}
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
    },
    imageView: {
        flex: 1,
        marginLeft: widthPercentageToDP(8),
        marginRight: widthPercentageToDP(8),
        marginTop: heightPercentageToDP(2),
        marginBottom: heightPercentageToDP(2),
        maxHeight: heightPercentageToDP(33),
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    questionText: {
        color: '#4F4F4F',
        fontSize: 20,
        marginLeft: widthPercentageToDP(8),
        justifyContent: 'center',
        alignItems: 'stretch',
        height: heightPercentageToDP(15),
        ...systemWeights.light
    },
    answerContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: widthPercentageToDP(8),
        marginRight: widthPercentageToDP(8),
    },
    answerButton: {
        flex: 1,
        marginBottom: heightPercentageToDP(2),
        height: heightPercentageToDP(9.3),
        maxHeight: heightPercentageToDP(9.3),
        shadowRadius: 0
    }
});