import * as React from 'react';
import {View, Text, Card} from 'native-base';
import {StyleSheet, ViewStyle, Image, ImageStyle, Platform, Animated} from "react-native";
import IQuestion, { QuestionType } from '../../entity/Question';
import { systemWeights } from 'react-native-typography';
import AnswerButton, { AnswerState } from './AnswerButton';
import { widthPercentageToDP, heightPercentageToDP } from '../../helper/ratioHelper';
import ImageZoom from 'react-native-image-pan-zoom';
import posed from 'react-native-pose';
import {AntDesign, MaterialCommunityIcons, Feather} from '@expo/vector-icons';
export interface QuestionComponentProps{
    question: IQuestion,
    answerState: AnswerState[],
    onChooseAnswer: (index: number) => void,
    style?: ViewStyle
}

interface QuestionComponentState{
    isImageZoom: boolean,
    imageHeight: Animated.AnimatedValue
}

const TWO_ROW_MAX_CHARACTER = 10;

const ImageBox = posed.View({
    normal: {
        height: heightPercentageToDP(25),
        transition: {
            default: { ease: 'linear', duration: 500 }
        }
    },
    zoomed: {
        height: heightPercentageToDP(80),
        transition: {
            default: { ease: 'linear', duration: 500 }
        }
    }
});

export default class QuestionComponent extends React.Component<QuestionComponentProps, QuestionComponentState>{
    constructor(prop: QuestionComponentProps){
        super(prop);

        this.state = {
            isImageZoom: false,
            imageHeight: new Animated.Value(heightPercentageToDP(25))
        }
    }
    
    shouldComponentUpdate(nextProps : QuestionComponentProps, nextState : QuestionComponentState) : boolean{
        //render only when image zoomed and change answer state
        if(this.state.isImageZoom !== nextState.isImageZoom){
            return true;
        }
        for(let i = 0; i < this.props.answerState.length; i++){
            if(this.props.answerState[i] != nextProps.answerState[i]){
                return true;
            }
        }
        return true;
    }
    
    toggleImageZoom = () : void => {
        if(this.state.isImageZoom){
            Animated.timing(                            // Animate over time
                this.state.imageHeight,                      // The animated value to drive
                {
                  toValue: heightPercentageToDP(25),  
                  duration: 500                       
                }
              ).start();   
        } else {
            Animated.timing(                            // Animate over time
                this.state.imageHeight,                      // The animated value to drive
                {
                  toValue: heightPercentageToDP(80),  
                  duration: 500                       
                }
              ).start(); 
        }

        this.setState({
            isImageZoom : !this.state.isImageZoom
        });
    }

    renderAnswerButton(index: number, value: string, half: boolean) {
        const {onChooseAnswer, answerState, question} = this.props;

        return (
            <View key={index} 
                style={[half ? styles.answerButtonHalf : styles.answerButton, 
                question.audioAsset && question.imageAsset && {height: heightPercentageToDP(8)}]}>
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
            case QuestionType.part3: case QuestionType.part4: case QuestionType.part2:
            return(
                <Text adjustsFontSizeToFit minimumFontScale={.5} style={styles.questionText}>	
                    {question.id.slice(question.id.length - 3,question.id.length)}. {question.question}
                </Text>
            );
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
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}}>
                    <View style={styles.answerContainerTwoRow}>
                        {this.renderAnswerButton(0, question.answer[0], true)}
                        {this.renderAnswerButton(1, question.answer[1], true)}
                    </View>
                    <View style={styles.answerContainerTwoRow}>
                        {this.renderAnswerButton(2, question.answer[2], true)}
                        {this.renderAnswerButton(3, question.answer[3], true)}
                    </View>
                </View>
            );
            case QuestionType.part2:
            return(
                <View style={styles.answerContainer}>
                    {this.renderAnswerButton(0, question.answer[0], false)}
                    {this.renderAnswerButton(1, question.answer[1], false)}
                    {this.renderAnswerButton(2, question.answer[2], false)}
                </View>);
            default:
                if(this.shouldRenderTwoRow()){
                    return(
                        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}}>
                            <View style={styles.answerContainerTwoRow}>
                                {this.renderAnswerButton(0, question.answer[0], true)}
                                {this.renderAnswerButton(1, question.answer[1], true)}
                            </View>
                            <View style={styles.answerContainerTwoRow}>
                                {this.renderAnswerButton(2, question.answer[2], true)}
                                {this.renderAnswerButton(3, question.answer[3], true)}
                            </View>
                        </View>
                    );
                } else {
                    return(
                        <View style={styles.answerContainer}>
                            {this.renderAnswerButton(0, question.answer[0], false)}
                            {this.renderAnswerButton(1, question.answer[1], false)}
                            {this.renderAnswerButton(2, question.answer[2], false)}
                            {this.renderAnswerButton(3, question.answer[3], false)}
                        </View>);
                }
        }
    }
    render() {
        const {question, style} = this.props;  
        return (
            <View style={[styles.container, style]}>
                {question.imageAsset && 
                <Card style={{margin: 0, position: this.state.isImageZoom ? 'absolute' : 'relative'}}>
                    <View style={{opacity: 0.3, flex:1, flexDirection:"row", justifyContent: "space-between"}}>
                        <Feather name='arrow-up-left' color='#000000' size= {16}/>
                        <Feather name='arrow-up-right' color='#000000' size= {16}/>
                    </View>
                {/* TODO: Render zoom icon for the first time */}
                    <ImageBox pose={this.state.isImageZoom ? 'zoomed' : 'normal'} style={{height: heightPercentageToDP(80), marginTop: -14, padding: 0}}>
                        <ImageZoom 
                        cropWidth={widthPercentageToDP(100)}
                        cropHeight={this.state.isImageZoom ? heightPercentageToDP(80) : heightPercentageToDP(25)}
                        imageWidth={widthPercentageToDP(100)}
                        imageHeight={this.state.isImageZoom ? heightPercentageToDP(80) : heightPercentageToDP(25)}
                        minScale={0.2}
                        enableDoubleClickZoom={false}
                        onDoubleClick={this.toggleImageZoom}
                        style={styles.imageView as ImageStyle}>
                            <Animated.Image style={{width: widthPercentageToDP(100), height: this.state.imageHeight}}
                                    source={question.imageAsset}
                                    resizeMode='contain'/>
                        </ImageZoom>

                    </ImageBox>

                    <View style={{opacity: 0.3, flex:1, flexDirection:"row", justifyContent: "space-between"}}>
                        <Feather name='arrow-down-left' color='#000000' size= {16}/>
                        <Feather name='arrow-down-right' color='#000000' size= {16}/>
                    </View>
                </Card>
                }
                <View style={{opacity: this.state.isImageZoom ? 0.4 : 1}}>
                <Text adjustsFontSizeToFit minimumFontScale={.3} style={styles.questionText}>	
                        {this.renderQuestion()}
                </Text>
                {this.renderAnswer()}
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
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        flex: 1,
        marginTop: heightPercentageToDP(2),
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    questionText: {
        color: '#4F4F4F',
        fontSize: Platform.OS == 'ios' ? 16 : 16,
        marginLeft: widthPercentageToDP(10),
        marginRight: widthPercentageToDP(10),
        justifyContent: 'center',
        alignItems: 'stretch',
        textAlign: 'left',
        textAlignVertical: 'center',
        maxWidth: widthPercentageToDP(80),
        maxHeight: heightPercentageToDP(15),
        marginTop: heightPercentageToDP(2),
        marginBottom: heightPercentageToDP(2),
        ...systemWeights.regular
    },
    answerContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: widthPercentageToDP(8),
        marginRight: widthPercentageToDP(8),
    },
    answerContainerTwoRow: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        marginLeft: widthPercentageToDP(8),
        marginRight: widthPercentageToDP(8),
    },
    answerButton: {
        flex: 2,
        marginBottom: heightPercentageToDP(1),
        width: widthPercentageToDP(84),
        maxWidth: widthPercentageToDP(84),
        height: Platform.OS == 'ios' ? heightPercentageToDP(9.3) : heightPercentageToDP(9.3), 
        maxHeight: Platform.OS == 'ios' ? heightPercentageToDP(9.3) : heightPercentageToDP(9.3), 
        shadowRadius: 0
    },
    answerButtonHalf: {
        flex: 1,
        marginBottom: heightPercentageToDP(1),
        width: widthPercentageToDP(46),
        height: Platform.OS == 'ios' ? heightPercentageToDP(9.3) : heightPercentageToDP(9.3), 
        maxHeight: Platform.OS == 'ios' ? heightPercentageToDP(9.3) : heightPercentageToDP(9.3), 
        shadowRadius: 0
    }
});