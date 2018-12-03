import * as React from 'react';
import {Header, Left, Body, Right, Button, Icon, Title} from 'native-base';
import { Platform } from "react-native";

export interface Props{
    correctAnswer: number,
    uncorrectedAnswer : number;
}

export default class QuizScreenHeader extends React.Component<Props>{
    render() {
        const {correctAnswer, uncorrectedAnswer} = this.props;

        return (
            <Header androidStatusBarColor="#0076BF" style={{backgroundColor: Platform.OS ==='android' ? '#019AE8' : '#FFFFFF'}}>
            <Left>
                <Button transparent>
                    <Icon name='arrow-back' android='md-arrow-back' ios='md-arrow-back' />
                </Button>
            </Left>
            <Body>
                <Title>Part 5</Title>
            </Body>
            <Right>
                <Button transparent>
                    <Title style={{paddingRight: 10, alignContent: 'center'}}>{correctAnswer}</Title>
                    <Icon name ='nothing' android='md-thumbs-up' ios='md-thumbs-up'/>
                </Button>
                <Button transparent>
                    <Title style={{paddingRight: 10, alignContent: 'center'}}>{uncorrectedAnswer}</Title>
                    <Icon name = 'nothing' android='md-thumbs-down' ios='md-thumbs-down'/>
                </Button>
            </Right>
        </Header>
        );
    }
}