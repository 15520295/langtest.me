import React from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, View, Text, Content} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import AnswerButton from '../components/AnswerButton';
import {robotoWeights} from 'react-native-typography';

export default class QuestionScreen extends React.Component {
    render() {
        return (
            <Container style={styles.container}>
                <Header androidStatusBarColor="#0076BF" style={{backgroundColor: '#019AE8'}}>
                    <Left>
                        <Button transparent>
                            <Icon android='md-arrow-back' ios='ios-arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Part 5</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Title style={{paddingRight: 10}}>1</Title>
                            <Icon android='md-thumbs-up' ios='ios-thumbs-up'/>
                        </Button>
                        <Button transparent>
                            <Title style={{paddingRight: 10}}>2</Title>
                            <Icon android='md-thumbs-down' ios='ios-thumbs-down'/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <View style={styles.navigationView}>
                        <Icon style={{color: '#019AE8'}} android="md-arrow-back" ios="ios-arrow-back" /> 
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity>
                                <Text style={{fontSize: 18,color: '#019AE8'}}>1</Text>
                            </TouchableOpacity>
                            <Text style={{fontSize: 18}}>/3</Text>
                        </View>
                        <Icon style={{color: '#019AE8'}} android="md-arrow-forward" ios="ios-arrow-forward" /> 
                    </View>
                    <View style={styles.questionView}>
                        <Text adjustsFontSizeToFit minimumFontScale={.5} style={styles.questionText}>
                    4?. In the hope of finding fresh ideas he used the internet to help him by using as many search ....... as he could
    discover  using as many search ....... as he could discover
                        </Text>
                    </View>
                    <View style={styles.answerButton}>
                        <AnswerButton text="Aaas dsadasdass"/>
                    </View>

                    <View style={styles.answerButton}>
                        <AnswerButton text="Aa asdasds"/>
                    </View>
                    
                    <View style={styles.answerButton}>
                        <AnswerButton text="Aas asdas das"/>
                    </View>

                    <View style={styles.answerButton}>
                        <AnswerButton text="Aas asdas das asdas das dasd as asd asdasdas dasd asdasdas das dasd asdasd asdasdas Aas asdas das asdas das dasd as asd asdasdas dasd asdasdas das dasd asdasd asdasdac  asd asdasd asdasdac"/>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    navigationView: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 15
    },
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
        fontWeight: '200',
        textAlign: 'justify',
        ...robotoWeights.light
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