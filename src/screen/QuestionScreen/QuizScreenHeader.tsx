import * as React from 'react';
import {Header, Left, Body, Right, Button, Icon, Title, Text} from 'native-base';
import { Platform } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { widthPercentageToDP } from '../../helper/ratioHelper';

export interface Props{
    title: String,
    correctAnswer: number,
    uncorrectedAnswer : number,
    onFinishButton : () => void
}

export default class QuizScreenHeader extends React.Component<Props>{
    render() {
        const {correctAnswer, uncorrectedAnswer, title, onFinishButton} = this.props;

        return (
            <Header androidStatusBarColor="#0076BF" style={{backgroundColor: Platform.OS ==='android' ? '#019AE8' : '#FFFFFF'}}>
            <Left>
                {Platform.OS === 'ios'  
                ? 
                <Button transparent onPress={()=> {onFinishButton()}}>
                    <Text>Finish</Text>
                </Button>
                    :
                <Button transparent onPress={()=> {onFinishButton()}}>
                    <Icon name = 'nothing' android='md-done-all' ios='md-done-all'/>
                </Button>
                }
            </Left>
            <Body>
                <Title>{title}</Title>
            </Body>
            <Right>
                <Button transparent>
                    <Title style={{paddingRight: 10, alignContent: 'center'}}>{correctAnswer}</Title>
                    <AntDesign name='smileo' color={Platform.OS === 'ios' ? 'black' : 'white'} size={widthPercentageToDP(7)}/>
                </Button>
                <Button transparent>
                    <Title style={{paddingRight: 10, alignContent: 'center'}}>{uncorrectedAnswer}</Title>
                    <AntDesign name='frowno' color={Platform.OS === 'ios' ? 'black' : 'white'}  size={widthPercentageToDP(7)}/>
                </Button>
            </Right>
        </Header>
        );
    }
}