import React from 'react';
import {StyleSheet, Animated} from 'react-native';
import { Button, Container, Text, View, Icon } from 'native-base';
import {robotoWeights} from 'react-native-typography';
export default class AnswerButton extends React.Component{
    render(){
        let result = null;

        result = (<Button light style={stylesNormal.answerButton} onPress={this.props.onPress}>
            <View style={stylesNormal.answerCircle}></View>
            <Text uppercase={false} allowFontScaling={true} style={stylesNormal.answerText}>{this.props.text}</Text>
        </Button>);

        if(this.props.correctAnswer){
            result = (
                <Button light style={stylesCorrect.answerButton} onPress={this.props.onPress}>
                    <View style={stylesCorrect.answerCircle}>
                        <Icon style={stylesCorrect.checkIcon} android='md-checkmark' ios='ios-checkmark'/>
                    </View>
                    <Text uppercase={false} allowFontScaling={true} style={stylesCorrect.answerText}>{this.props.text}</Text>
                </Button>);
        }

        if(this.props.incorrectAnswer){
            result =  (            
                <Button style={stylesIncorrect.answerButton}  light onPress={this.props.onPress}>
                    <View style={stylesIncorrect.answerCircle}>
                        <Icon style={stylesIncorrect.checkIcon} type="FontAwesome" android="remove" ios="remove" />   
                    </View>
                    <Text uppercase={false} allowFontScaling={true} style={stylesIncorrect.answerText}>{this.props.text}</Text>
                </Button>);
        }

        return (
            <Animated.View style={stylesNormal.answerButton} >
                {result}
            </Animated.View>
        );
    }
}

const stylesNormal = StyleSheet.create({
    answerButton: {
        flex: 1,
        borderRadius: 30,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#B3B3B3',
        backgroundColor: '#FFFFFF',
        shadowRadius: 0
    },
    answerText: {
        color: '#4F4F4F',
        fontSize: 16,
        flex: 1,
        ...robotoWeights.light
    },
    answerCircle: {
        height: '70%',
        borderRadius: 25,
        aspectRatio: 1,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        marginRight: 0,
        backgroundColor: '#C4C4C4'
    }
});


const stylesCorrect = StyleSheet.create({
    answerButton: {
        flex: 1,
        borderRadius: 30,
        borderWidth: 0,
        backgroundColor: '#46C00D',
        shadowRadius: 0
    },
    answerText: {
        color: '#FFFFFF',
        fontSize: 16,
        flex: 1,
        ...robotoWeights.regular
    },
    answerCircle: {
        height: '70%',
        borderRadius: 25,
        aspectRatio: 1,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        marginRight: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#46C00D'
    },
    checkIcon: {
        color: '#FFFFFF'
    }
});

const stylesIncorrect = StyleSheet.create({
    answerButton: {
        flex: 1,
        borderRadius: 30,
        borderWidth: 0,
        backgroundColor: '#EF2121',
        shadowRadius: 0
    },
    answerText: {
        color: '#FFFFFF',
        fontSize: 16,
        flex: 1,
        ...robotoWeights.regular
    },
    answerCircle: {
        height: '70%',
        borderRadius: 25,
        aspectRatio: 1,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        marginRight: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EF2121'
    },
    checkIcon: {
        color: '#FFFFFF'
    }
});
