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
    Platform,
    FlatList,
    Animated,
    Dimensions
} from 'react-native';

import wordMap from '../../data/VocabularyList';
import WordFlatListItem from '../../components/vocabulary/WordFlatListItem';


export default class LearnScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            // animA: new Animated.Value(-500),
            // animB: new Animated.Value(0),
        };
        this.animA = new Animated.Value(-500);
        this.animB = new Animated.Value(-500);
    }

    screenWidth = Dimensions.get('window').width;

    curWordA = 0;
    curWordB = 1;

    slideA = () => {
        this.animA.setValue(-this.screenWidth);
        this.animB.setValue(-this.screenWidth);

        Animated.parallel([
            Animated.timing(this.animA, {
                toValue: 0,
                duration: 5000
            }),
            Animated.timing(this.animB, {
                toValue: 0,
                duration: 5000
            })
        ]).start(() => {
            this.slideB();
        });
    };

    slideB = () => {
        this.animA.setValue(0);
        this.animB.setValue(-(this.screenWidth*2));

        Animated.parallel([
            Animated.timing(this.animA, {
                toValue: this.screenWidth,
                duration: 1000
            }),
            Animated.timing(this.animB, {
                toValue: -this.screenWidth,
                duration: 1000
            })
        ]).start(() => {

        });
    };



    componentDidMount() {
        this.slideA();
    }

    render() {

        // const { navigation } = this.props;
        // const topic = navigation.getParam('topic', null);


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
                        <Title>Learn Screen</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content>
                    {/*wordMap[topic.id]*/}
                    <View
                        style={{flex:0,flexDirection: 'row'}}>
                        <Animated.View
                            style={[
                                {width: this.screenWidth, backgroundColor:'red'},
                                {transform: [
                                    {translateX: this.animA}
                                    ]}
                                ]
                            }>
                            <WordFlatListItem item={wordMap['t1'][this.curWordA]}>

                            </WordFlatListItem>
                        </Animated.View>
                        <Animated.View
                            style={[
                                {width: this.screenWidth, backgroundColor:'blue'},
                                {transform: [
                                    {translateX: this.animB}]}
                                ]
                            }>
                            <WordFlatListItem item={wordMap['t1'][this.curWordB]}>

                            </WordFlatListItem>
                        </Animated.View>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'gray'
    },
    vc_slide: {
        backgroundColor:'blue',
        flexDirection: 'row',
        justifyContent: 'center', alignContent: 'center',
    },
    slideView: {
        backgroundColor:'green',
        flex: 1,
    },
});