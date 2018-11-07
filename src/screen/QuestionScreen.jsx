import React from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, View, Text} from 'native-base';
import {StyleSheet} from 'react-native';

export default class QuestionScreen extends React.Component {
    render() {
        return (
            <Container style={styles.Container}>
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
                <Text style={styles.questionText}>
                4. In the hope of finding fresh ideas he used the internet to help him by using as many search ....... as he could
discover
                </Text>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    questionText: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 40,
        color: '#4F4F4F',
        fontSize: 18,
        fontWeight: '200',
        lineHeight: 19,
        textAlign: 'justify',
    }
});