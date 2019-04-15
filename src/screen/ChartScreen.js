import React from 'react';
import {StyleSheet, View, ScrollView, Platform, Text} from 'react-native';
import {
    VictoryBar,
    VictoryChart,
    VictoryTheme,
    VictoryAxis,
    VictoryPolarAxis,
} from 'victory-native';

import {Button, Header, Content, Left, Container, Icon, Right, Body, Title} from 'native-base';

import {AntDesign, Entypo, MaterialCommunityIcons,} from '@expo/vector-icons';

const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
];

export default class ChartScreen extends React.Component {

    static navigationOptions = {
        header: null, // !!! Hide Header
        drawerIcon: ({tintColor}) => (
            <MaterialCommunityIcons name='chart-arc' color={tintColor} size={24}/>
        )

    };

    render() {
        return (
            <Container>
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
                        <Title>Chart</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>
                <View style={styles.container}>
                    <ScrollView
                        style={styles.container}
                        contentContainerStyle={styles.contentContainer}
                    >
                        {/* <VictoryChart minDomain={{ y: 0 }}>
                <VictoryLine data={data}
                  animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 }
                  }}/>
            </VictoryChart>

            <VictoryChart minDomain={{ y: 0 }}>
                <VictoryLine data={data1}
                  animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 }
                  }}/>
            </VictoryChart> */}

                        <VictoryChart polar
                                      theme={VictoryTheme.material}
                                      animate={{
                                          duration: 1000,
                                          easing: 'bounce'
                                      }}
                        >
                            {
                                ['Photographs', 'Response', 'Conversations', 'Talks', 'Incomplete Sentences',
                                    'Text Completion', 'Passages'
                                ].map((d, i) => {
                                    return (
                                        <VictoryPolarAxis dependentAxis
                                                          key={i}
                                                          label={d}
                                                          labelPlacement="perpendicular"
                                                          style={{tickLabels: {fill: 'none'}}}
                                                          axisValue={i}
                                        />
                                    );
                                })
                            }
                            <VictoryBar
                                style={{data: {fill: '#008bff', width: 25}}}
                                data={[
                                    {x: 0, y: 10}, // full: 40
                                    {x: 1, y: 25},
                                    {x: 2, y: 40},
                                    {x: 3, y: 20},
                                    {x: 4, y: 30},
                                    {x: 5, y: 35},
                                    {x: 6, y: 15}
                                ]}
                            />
                        </VictoryChart>

                        {/*<VictoryChart*/}
                        {/*// domainPadding will add space to each side of VictoryBar to*/}
                        {/*// prevent it from overlapping the axis*/}
                        {/*domainPadding={20}*/}
                        {/*>*/}
                        {/*<VictoryAxis*/}
                        {/*// tickValues specifies both the number of ticks and where*/}
                        {/*// they are placed on the axis*/}
                        {/*tickValues={[1, 2, 3, 4]}*/}
                        {/*tickFormat={['01/11', '02/11', '03/11', '04/11']}*/}
                        {/*/>*/}
                        {/*<VictoryAxis*/}
                        {/*dependentAxis*/}
                        {/*// tickFormat specifies how ticks should be displayed*/}
                        {/*tickFormat={(x) => (`${x / 1000}k`)}*/}
                        {/*/>*/}
                        {/*<VictoryBar*/}
                        {/*data={data}*/}
                        {/*x="quarter"*/}
                        {/*y="earnings"*/}
                        {/*/>*/}
                        {/*</VictoryChart>*/}
                    </ScrollView>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {height: -3},
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
    parent: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 50,
    },
    child: {
        width: '48%',
        margin: '1%',
        aspectRatio: 1,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
    },
    gridView: {
        paddingTop: 25,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
    drawImage: {
        height: 100,
        width: 100,
        borderRadius: 75,
    },
    navBar: {
        height: 100,
        width: 100,
    },
});
