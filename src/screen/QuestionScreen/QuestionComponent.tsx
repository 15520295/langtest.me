import * as React from 'react';
import {View, Text, Card} from 'native-base';
import {StyleSheet, ViewStyle, Image, ImageStyle, Platform} from "react-native";
import IQuestion, { QuestionType } from '../../entity/Question';
import { systemWeights } from 'react-native-typography';
import AnswerButton, { AnswerState } from './AnswerButton';
import { widthPercentageToDP, heightPercentageToDP } from '../../helper/ratioHelper';
import ImageZoom from 'react-native-image-pan-zoom';

export interface QuestionComponentProps{
    question: IQuestion,
    answerState: AnswerState[],
    onChooseAnswer: (index: number) => void,
    style?: ViewStyle
}

interface QuestionComponentState{
    isImageZoom: boolean
}

const TWO_ROW_MAX_CHARACTER = 21;

export default class QuestionComponent extends React.Component<QuestionComponentProps, QuestionComponentState>{
    constructor(prop: QuestionComponentProps){
        super(prop);

        this.state = {
            isImageZoom: false
        }
    }

    toggleImageZoom = () : void => {
        this.setState({
            isImageZoom : !this.state.isImageZoom
        });
    }

    renderAnswerButton(index: number, value: string) {
        const {onChooseAnswer, answerState, style} = this.props;

        return (
            <View key={index} style={[styles.answerButton as ViewStyle, style]}>
                <AnswerButton answerState={answerState[index]} 
                    onPress = {() => onChooseAnswer(index)}
                    text={value}/>
            </View>)
    }

    shouldRenderTwoRow(): boolean {
        let should: boolean = true;
        if(this.props.question.type === QuestionType.part2 || this.props.question.type === QuestionType.part5 ){
            return false;
        }
        this.props.question.answer.forEach((a) => {
            if(a.length > TWO_ROW_MAX_CHARACTER){
                should = false;
            }
        })

        return should;
    }

    renderQuestion(){
        const {question} = this.props; 
        switch(question.type){
            case QuestionType.part6:
                return(
                    <Text adjustsFontSizeToFit minimumFontScale={.5} style={styles.questionText}>	
                        Fill in the {question.id.slice(question.id.length - 3,question.id.length)} blank
                    </Text>
                );
            default:
                    return(
                    <Text adjustsFontSizeToFit minimumFontScale={.5} style={styles.questionText}>	
                        {question.question}
                    </Text>
                    )
        }
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
                if(this.shouldRenderTwoRow()){
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
                } else {
                    return(
                        <View style={styles.answerContainer}>
                            {this.renderAnswerButton(0, question.answer[0])}
                            {this.renderAnswerButton(1, question.answer[1])}
                            {this.renderAnswerButton(2, question.answer[2])}
                            {this.renderAnswerButton(3, question.answer[3])}
                        </View>);
                }
        }
    }
    render() {
        const {question} = this.props;  
        return (
            <View style={styles.container}>
                {question.imageAsset && 
                <Card >
                        <ImageZoom 
                        cropWidth={widthPercentageToDP(100)}
                        cropHeight={this.state.isImageZoom ? heightPercentageToDP(80) : heightPercentageToDP(25)}
                        imageWidth={widthPercentageToDP(100)}
                        imageHeight={this.state.isImageZoom ? heightPercentageToDP(80) : heightPercentageToDP(25)}
                        minScale={0.2}
                        enableDoubleClickZoom={false}
                        onDoubleClick={this.toggleImageZoom}
                        style={styles.imageView as ImageStyle}>
                            <Image style={{width: widthPercentageToDP(100), height: this.state.isImageZoom ? heightPercentageToDP(80) : heightPercentageToDP(25)}}
                                    source={question.imageAsset}
                                    resizeMode='contain'/>
                        </ImageZoom>
                </Card>
                }
                <Text adjustsFontSizeToFit minimumFontScale={.5} style={styles.questionText}>	
                        {this.renderQuestion()}
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
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        flex: 1,
        marginTop: heightPercentageToDP(2),
        marginBottom: heightPercentageToDP(2),
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    questionText: {
        color: '#4F4F4F',
        fontSize: Platform.OS == 'ios' ? 20 : 18,
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
        marginBottom: heightPercentageToDP(1),
        height: Platform.OS == 'ios' ? heightPercentageToDP(9.3) : heightPercentageToDP(9.3), 
        maxHeight: Platform.OS == 'ios' ? heightPercentageToDP(9.3) : heightPercentageToDP(9.3), 
        shadowRadius: 0
    }
});