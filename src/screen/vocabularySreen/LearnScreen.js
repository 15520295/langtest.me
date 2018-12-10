import React from 'react';
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Title,
    View,
    Text,
    Content
} from 'native-base';

import {
    StyleSheet,
    TouchableOpacity,
    Platform, FlatList
} from 'react-native';

export default class LearnScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    static navigationOptions = {
        header: null
    };


    render() {
        return (
            <Container style={styles.container}>
                <Header androidStatusBarColor="#0076BF"
                        style={{backgroundColor: Platform.OS === 'android' ? '#019AE8' : '#FFFFFF'}}>
                    <Left>
                        {/*<Button transparent>*/}
                            {/*<Icon android='md-arrow-back' ios='ios-arrow-back'/>*/}
                        {/*</Button>*/}
                    </Left>
                    <Body>
                    <Title>Topic Screen</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            {/*<Title style={{paddingRight: 10}}>{this.state.correctAnswer}</Title>*/}
                            {/*<Icon android='md-thumbs-up' ios='ios-thumbs-up'/>*/}
                        </Button>
                        <Button transparent>
                            {/*<Title style={{paddingRight: 10}}>{this.state.incorrectAnswer}</Title>*/}
                            {/*<Icon android='md-thumbs-down' ios='ios-thumbs-down'/>*/}
                        </Button>
                    </Right>
                </Header>
                <Content>

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
        textAlign: 'justify'
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