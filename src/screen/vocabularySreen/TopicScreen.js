import React from 'react';
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Button,
    Title,
    View,
    Text,
    Content,
    Icon
} from 'native-base';

import {
    StyleSheet,
    TouchableOpacity,
    Platform, FlatList,
    AsyncStorage
} from 'react-native';
import TopicFlatList from '../../components/vocabulary/TopicFlatList';
import UserScore from '../../components/vocabulary/UserScore';
import flatListData from '../../data/TopicData';
import TopicFlatListItem from '../../components/vocabulary/TopicFlatListItem';

export default class TopicScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            correctAnswer: 0,
            topicResult: null,
            refresh: true
        };

        this._storeData();
    }

    static navigationOptions = {
        header: null, // !!! Hide Header
        drawerIcon: ({tintColor}) => (
            <Icon name='clipboard' style={{fontSize: 24, color: tintColor}}/>
        )
        // title:'Home 1',


    };

    _storeData = async () => {
        try {
            const topicResult = new Map();
            topicResult.set('t1', 0.1);
            topicResult.set('t2', 0.2);

            const str = JSON.stringify(Array.from(topicResult.entries()));

            await AsyncStorage.setItem('topicResult', str);

            await this._retrieveData();
        } catch (error) {
            // Error saving data
            console.log('Chi CS error: ' + error);
        }
    };

    _retrieveData = async () => {
        try {
            const str = await AsyncStorage.getItem('topicResult');
            const topicResult = new Map(JSON.parse(str));

            this.setState(
                {
                    topicResult: topicResult,
                    refresh: !this.state.refresh
                }
            );

        } catch (error) {
            // Error retrieving data
            console.log('Chi CS error: ' + error);
        }
    };

    forceU = this.forceUpdate;

    _getResult(item) {
        let result = 0.0;
        if (this.state.topicResult != null) {
            result = this.state.topicResult.get(item.id)  != null ? this.state.topicResult.get(item.id) : 0.0;
        }
        return result;
    }


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

                    </Right>
                </Header>
                <Content
                    contentContainerStyle={{flexGrow: 1}}>
                    <UserScore/>
                    <View style={{
                        flex: 1,
                        backgroundColor: '#EEEEEE'
                    }}>
                        <FlatList
                            data={flatListData}
                            extraData={this.state.refresh}
                            renderItem={({item, index}) => {
                                return (
                                    <TopicFlatListItem
                                        item={item}
                                        index={index}
                                        result={this._getResult(item)}>

                                    </TopicFlatListItem>);
                            }}
                            keyExtractor={(item, index) => item.id}
                        />
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