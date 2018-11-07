import React from 'react';
import {StyleSheet} from 'react-native';
import { Button, Container, Text, View } from 'native-base';

export default class AnswerButton extends React.Component{
    render(){
        return (
            <Button border light style={styles.answerButton} onPress={this.props.onPress}>
                <View style={styles.answerCircle}></View>
                <Text uppercase={false} allowFontScaling={true} style={styles.answerText}>{this.props.text}</Text>
            </Button>);
    }
}

const styles = StyleSheet.create({
    answerButton: {
        flex: 1,
        borderRadius: 30,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#B3B3B3'
    },
    answerText: {
        color: '#4F4F4F',
        fontSize: 16,
        fontWeight: '200',
        flex: 1
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



