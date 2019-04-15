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
import UserScore from '../../components/vocabulary/UserScore';
import flatListData from '../../data/TopicData';
import TopicFlatListItem from '../../components/vocabulary/TopicFlatListItem';
import LocalStoreHelper from '../../helper/LocalStoreHelper';
import {withNavigation} from 'react-navigation';
import {AntDesign, MaterialCommunityIcons, Entypo} from '@expo/vector-icons';


class TopicScreen extends React.Component {
    static navigationOptions = {
        header: null, // !!! Hide Header
    };

    constructor(props) {
        super(props);
        this.state = {
            refresh: true,

            totalAnswer: 0,
            correctAnswer: 0,
        };
    }

    _refreshList = async () => {
        const topicResult = await LocalStoreHelper._getMapData(LocalStoreHelper.topicResult);
        const score = await LocalStoreHelper._getMapData(LocalStoreHelper.score);

        this.setState({
            refresh: !this.state.refresh,
            topicResult: topicResult,
            totalAnswer: score.get('totalAnswer'),
            correctAnswer: score.get('correctAnswer')
        });
    };

    _getResult(item) {
        let result = 0.0;

        const topicResult = this.state.topicResult;
        if (topicResult != null) {
            result = topicResult.get(item.id) != null ? topicResult.get(item.id) : 0.0;
        }
        return result;
    }

    componentDidMount() {
        if (this.props.navigation != null) {
            this.props.navigation.addListener(
                'didFocus',
                payload => {
                    this._refreshList();
                }
            );
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header androidStatusBarColor="#0076BF"
                        style={{backgroundColor: Platform.OS === 'android' ? '#019AE8' : '#FFFFFF'}}>
                    <Left>
                        {Platform.OS === 'ios'
                            ?
                            <Button transparent onPress={() => {
                                this.props.navigation.openDrawer();

                            }}>
                                <Entypo name='menu' color='#000000' size= {24}/>
                            </Button>
                            :
                            <Button transparent onPress={() => {
                                this.props.navigation.openDrawer();
                            }}>
                                <Entypo name='menu' color='#ffffff' size= {24}/>
                            </Button>
                        }
                    </Left>
                    <Body>
                        <Title>Topic</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>
                <Content
                    contentContainerStyle={{flexGrow: 1}}>
                    <UserScore
                        totalAnswer={this.state.totalAnswer != null ? this.state.totalAnswer : 0}
                        correctAnswer={this.state.correctAnswer != null ? this.state.correctAnswer : 0}
                    />
                    <View style={{
                        flex: 1,
                        backgroundColor: '#EEEEEE'
                    }}>
                        <FlatList
                            ref={component => this.topicFlatListItem = component}
                            data={flatListData}
                            extraData={this.state.refresh}
                            renderItem={({item, index}) => {
                                return (
                                    <TopicFlatListItem
                                        item={item}
                                        index={index}
                                        result={this._getResult(item)}
                                    >

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

export default withNavigation(TopicScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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