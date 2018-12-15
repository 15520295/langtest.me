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
    Content,
} from 'native-base';

import {
    StyleSheet,
    TouchableOpacity,
    Platform,
    FlatList,
} from 'react-native';

import ActionButton from 'react-native-action-button';
import wordMap from '../../data/VocabularyList';
import WordFlatListItem from '../../components/vocabulary/WordFlatListItem';
import sharedQuizService from '../../services/QuizService';
import VocabularyTestData from '../../data/VocabularyTestData';
import {withNavigation} from 'react-navigation';


class WordScreen extends React.Component {
    static navigationOptions = {
        header: null // !!! Hide Header
    };

    constructor(props) {
        super(props);
        this.state = {
        };

    }

    _testVocabularyScreen(topic) {
        sharedQuizService.initTestVocabulary(VocabularyTestData);
        this.props.navigation.navigate('Questions');
    }

    _learnScreen(topic) {
        this.props.navigation.navigate('Learn', {
            topic:topic
        });
    }

    render() {
        const { navigation } = this.props;
        const topic = navigation.getParam('topic', null);


        return (
            <Container style={styles.container}>
                <Header androidStatusBarColor="#0076BF"
                        style={{backgroundColor: Platform.OS === 'android' ? '#019AE8' : '#FFFFFF'}}>
                    <Left>
                        <Button transparent>
                            <Icon android='md-arrow-back' ios='ios-arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>{topic.name}</Title>
                    </Body>
                </Header>
                <Content
                    contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1,
                        backgroundColor:'#EEEEEE'}}>
                        <FlatList
                            data={wordMap[topic.id]}
                            renderItem={({ item, index }) => {
                                return (
                                    <WordFlatListItem item={item} index={index}>

                                    </WordFlatListItem>);
                            }}
                            keyExtractor={(item, index) => item.word}
                        >

                        </FlatList>

                    </View>

                </Content>
                <ActionButton
                    positioningMode="right"
                    offsetX={15}
                    offsetY={15}
                    buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item
                        buttonColor="#3498db"
                        title="Học Từ"
                        onPress={() => {
                            this._learnScreen(topic);
                        }}>
                        <Icon type="Ionicons"
                              name="md-book"
                              style={{
                                  color: 'white',
                                  fontSize: 22,
                                  height: 22,}}
                        />
                    </ActionButton.Item>
                    <ActionButton.Item
                        buttonColor="#3498db"
                        title="Luyện Tập"
                        onPress={() => {
                            this._testVocabularyScreen(topic);
                        }}>
                        <Icon type="Entypo"
                              name="controller-play"
                              style={{
                                  color: 'white',
                                  fontSize: 22,
                                  height: 22,}}
                        />
                    </ActionButton.Item>
                </ActionButton>
            </Container>
        );
    }
}

export default withNavigation(WordScreen);

const styles = StyleSheet.create({
    vc_floatingButton: {
        position: 'absolute',
        width: 100,
        height: 100,
        backgroundColor: 'red',
        bottom:30,
        right:10,
        justifyContent: 'center',
        alignItems:'center',
    },
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