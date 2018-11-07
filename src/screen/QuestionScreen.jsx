import React from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, View, Text, Content} from 'native-base';
import {StyleSheet} from 'react-native';
import AnswerButton from '../components/AnswerButton';

export default class QuestionScreen extends React.Component {
    render() {
        return (
            <Container style={styles.container}>
                <Header>
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
                    <View style={styles.questionView}>
                        <Text adjustsFontSizeToFit minimumFontScale={.5} style={styles.questionText}>
                    4?. In the hope of finding fresh ideas he used the internet to help him by using as many search ....... as he could
    discover  using as many search ....... as he could discover sing as many search ....... as he could discover
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
    questionView: {
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 40,
        marginBottom: 10,
        height: 120
    },
    questionText: {
        color: '#4F4F4F',
        // fontSize: 18,
        fontWeight: '200',
        textAlign: 'justify',
        // height: 120
    },
    answerButton: {
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 10,
        height: 60
    }
});