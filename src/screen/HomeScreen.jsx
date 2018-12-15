import React, { Component, PureComponent } from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
    Dimensions,
    ScrollView,
    LayoutAnimation,

} from 'react-native';
import { WebBrowser } from 'expo';
import GridView from 'react-native-super-grid';
import NavigationBar from 'react-native-navbar';

import {Icon, Button, Header, Content, Left, Container} from 'native-base';

import Carousel from 'react-native-snap-carousel';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import CardModal from '../components/CardModal';

var imageGrid = require('../../assets/images/reading.jpg');


let FirstItem = 3;
// FirstItem = 20;  // <----- UNCOMMENT THIS

const SliderWidth = Dimensions.get('screen').width;
const ItemWidth = 300.0;
const ItemHeight = 300.0;

const NumItems = 6;
const Items = [];
for(var i = 0; i < NumItems; i++) {
  Items.push(i);
}

const itemCarousel= [
    { name: 'Grammar', sub: 'Adjective/Adverb/Article/Modal Verb'},
    { name: 'Vocabulary', sub: 'Adjective/Adverb/Article/Modal Verb'},
    { name: 'Listening', sub: 'Adjective/Adverb/Article/Modal Verb'},
    { name: 'Writing', sub: 'Adjective/Adverb/Article/Modal Verb'},
    { name: 'Speaking', sub: 'Adjective/Adverb/Article/Modal Verb'},
    { name: 'Reading', sub: 'Adjective/Adverb/Article/Modal Verb'}
];

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class HomeScreen extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            scroll: true,
        };
    }

    renderNav() {

        const titleConfig = {
            title: 'react-native-card-modal',
        };

        return (
            <NavigationBar
                title={titleConfig}/>
        );

    }

    disableScroll() {
        this.setState({scroll: !this.state.scroll});
    }

    _onPressCard(){
    // Toast.show('This is a long toast.', Toast.LONG)
        Alert.alert('You tapped the button!');
    }

  static navigationOptions = {
      header: null, // !!! Hide Header
      drawerIcon: ({tintColor}) => (
          <Icon name='home' style= {{ fontSize: 24, color: tintColor}}/>
      )
      // title:'Home 1',
      // // header: { visible:false },
    //   drawerIcon: (
    //       <Image source={require('../../assets/images/home.png')}
    //              style={{height: 24, width: 24}}
    //       />
    //   )
  };

  // constructor(props) {
  //   super(props);
  //   this._renderItem = this._renderItem.bind(this)
  // }
  //
  // _renderItem({ item }) {
  //   return (
  //     <View style={styles.viewCard}>
  //       <Card>
  //           <CardImage
  //               source={{uri: 'http://bit.ly/2GfzooV'}}
  //               title={item.name}
  //           />
  //           <CardTitle
  //               subtitle="Number 6"
  //           />
  //           <CardContent text={item.sub} />
  //           <CardAction
  //               separator={true}
  //               inColumn={false}>
  //                   <CardButton
  //                       onPress={() => {}}
  //                       title="Test"
  //                       color="#FEB557"
  //                   />
  //                   <CardButton
  //                       onPress={() => {}}
  //                       title="Chart"
  //                       color="#FEB557"
  //                   />
  //           </CardAction>
  //       </Card>
  //   </View>
  //   );
  // }

  render() {
      // Taken from https://flatuicolors.com/
      const items = [
          { name: 'Grammar', code: '#1abc9c' }, { name: 'Vocabulary', code: '#2ecc71' },
          { name: 'Listening', code: '#3498db' }, { name: 'Writing', code: '#9b59b6' },
          { name: 'Speaking', code: '#34495e' }, { name: 'Reading', code: '#16a085' },
      ];
      return (
          
        //   <Container>
        //       {/* <Header>
        //     <Left>
        //       <Icon name="ios-menu" onPress={()=>this.props.navigation.navigate('DrawerOpen')} />
        //     </Left>
        // </Header> */}
        //       <GridView
        //           itemDimension={130}
        //           items={items}
        //           style={styles.gridView}
        //           renderItem={item => (
        //               <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
        //                   <Image style={styles.drawImage}
        //                       source={imageGrid}
        //                       onPress={this._onPressCard} 
        //                   />
        //                   <Text style={styles.itemName}>{item.name}</Text>
        //                   <Text style={styles.itemCode}>{item.code}</Text>
        //               </View>
        //           )}
        //       />
        //   </Container>

        // <Container>
        // <Header>
        //      <Left>
        //        <Icon name="ios-menu" onPress={()=>this.props.navigation.navigate('DrawerOpen')} />
        //      </Left>
        // </Header>
        //     <ScrollView>
        //     {/* <View style={styles.container}>
        //         <Carousel
        //             layout={'default'}
        //             data={itemCarousel}
        //             firstItem={FirstItem}
        //             itemWidth={ItemWidth}
        //             sliderWidth={SliderWidth}
        //             activeSlideAlignment='center'
        //             renderItem={this._renderItem}
        //             backgroundColor= 'white'
        //         />
        //     </View> */}

        //     {/* <GridView
        //           itemDimension={130}
        //           items={items}
        //           style={styles.gridView}
        //           renderItem={item => (
        //               <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
        //                   <Image style={styles.drawImage}
        //                       source={imageGrid}
        //                       onPress={this._onPressCard}
        //                   />
        //                   <Text style={styles.itemName}>{item.name}</Text>
        //                   <Text style={styles.itemCode}>{item.code}</Text>
        //               </View>
        //           )}
        //       /> */}

        // </ScrollView>
        // </Container>


          <ScrollView style={styles.container}>
              <View style={{
                  flex: 3, backgroundColor: '#54C5F5', alignItems: 'center', height: 200,
              }}>
                  <Image source={require('../../assets/images/info.jpg')}
                         style={styles.imageInfo}
                  />
                  <Text style={{
                      color: '#ffffff', fontWeight: 'bold',
                      marginTop: 10, fontSize: 16,
                  }}>Chí Phèo</Text>
                  <View style={{flexDirection: 'row',}}>
                      <Text style={{color: '#ffffff', marginTop: 10, fontSize: 14,}}>Craiova</Text>
                      <Text style={{color: '#ffffff', marginTop: 10, marginLeft: 14}}>Desiger</Text>
                  </View>

              </View>

              <View style={{flex: 6, backgroundColor: '#F7F7F7'}}>
                  <ScrollView>
                      <GridView
                          itemDimension={130}
                          items={items}
                          style={styles.gridView}
                          renderItem={item => (
                              <View style={[styles.itemContainer, {backgroundColor: '#ffffff'}]}>
                                  <Image style={styles.drawImage}
                                         source={imageGrid}
                                         onPress={this._onPressCard}
                                  />
                                  <Text style={styles.itemName}>{item.name}</Text>
                                  <Text style={styles.itemCode}>{item.code}</Text>
                              </View>
                          )}
                      />
                  </ScrollView>
              </View>

              <View style={{position:'absolute',flex: 1, left: 10, right: 10, top: 150, justifyContent: 'center',
                  alignItems: 'center'}}>
                  <View style={[styles.cardMain, {backgroundColor: '#ffffff'}]}>
                      <View style={{flexDirection: 'row'}}>
                          <View style={{flexDirection: 'column', marginLeft: 10}}>
                              <Text style={{color: '#0099DA',
                                  fontStyle: 'italic',
                                  fontSize: 16}}>Your Result</Text>
                              <View style={{flexDirection:'row', marginTop: 10, alignItems:'center'}}>
                                  <View style={[styles.iconDoc, {backgroundColor: '#BC9CFF'}]}/>
                                  <Text style={{color: '#888888', marginLeft: 10,
                                      fontSize: 12
                                  }}>Time spent: 2112 minutes</Text>
                              </View>
                              <View style={{flexDirection:'row', marginTop: 10, alignItems:'center'}}>
                                  <View style={[styles.iconDoc, {backgroundColor: '#FFBA9C'}]}/>
                                  <Text style={{color: '#888888', marginLeft: 10,
                                      fontSize: 12
                                  }}>1912 Questions</Text>
                              </View>
                          </View>

                          <View>
                              <TouchableOpacity style={{marginLeft: 20, alignItems:'center',
                                  justifyContent:'center', flex: 1}}>
                                  <View style={{
                                      backgroundColor: 'red', alignItems: 'center',
                                      justifyContent: 'center', borderRadius: 30, height: 50,
                                      width: 150, position: 'absolute'
                                  }}
                                  >
                                      <Image style={{alignItems: 'center',
                                          justifyContent: 'center', borderRadius: 30, height: 50,
                                          width: 150,}} source={require('../../assets/images/rectangle.jpg')}/>
                                  </View>
                              </TouchableOpacity>
                          </View>
                      </View>
                  </View>
              </View>


              {/*<View style={{flex: 1}}>*/}
                  {/*<View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>*/}
                      {/*<Text>Centered text</Text>*/}
                  {/*</View>*/}
              {/*</View>*/}

              {/*<View>*/}
                  {/*<View style={{justifyContent: 'flex-end', alignItems: 'center', marginTop: 80,}}>*/}
                      {/*<Text style={{position: 'absolute', }}>ABCGSDFS</Text>*/}
                  {/*</View>*/}
              {/*</View>*/}

          </ScrollView>
      );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf5fd',
    },
    imageInfo:{
        height: 60, 
        width: 60, 
        borderRadius: 20, 
        borderColor: '#ffffff',
        borderWidth: 2,
        marginTop: 20
    },
    gridView: {
        marginTop: 50,
        flex: 1,
        marginLeft: 15,
        marginRight: 15
    },
    itemContainer: {
        borderRadius: 10,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 20,
        color: '#5B5B5B',
        fontWeight: '600',
        marginTop: 20,
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#5B5B5B',
    },
    drawImage:{
        height:30,
        width: 30,
        borderRadius:75,
    },
    cardMain:{
        borderRadius: 10,
        padding: 10,
        height: 100,
    },
    iconDoc:{
        height:10,
        width: 10,
        borderRadius:60,
        justifyContent:'center',
    },
    LinearGradientStyle: {
        height: 40,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        marginBottom: 20
    },

    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        margin: 7,
        color : '#fff',
        backgroundColor: 'transparent'

    },

    // viewCard: {
    //     // flex: 1
    //     width: ItemWidth,
    //     height: ItemHeight,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: 'white'
    // },
    // container: {
    //     // flex: 1,
    //     // backgroundColor: '#fff',
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     paddingTop: 50,
    //     backgroundColor: '#ecf0f1',
    // },
    // developmentModeText: {
    //     marginBottom: 20,
    //     color: 'rgba(0,0,0,0.4)',
    //     fontSize: 14,
    //     lineHeight: 19,
    //     textAlign: 'center',
    // },
    // contentContainer: {
    //     paddingTop: 30,
    // },
    // welcomeContainer: {
    //     alignItems: 'center',
    //     marginTop: 10,
    //     marginBottom: 20,
    // },
    // welcomeImage: {
    //     width: 100,
    //     height: 80,
    //     resizeMode: 'contain',
    //     marginTop: 3,
    //     marginLeft: -10,
    // }, 
    // getStartedContainer: {
    //     alignItems: 'center',
    //     marginHorizontal: 50,
    // },
    // homeScreenFilename: {
    //     marginVertical: 7,
    // },
    // codeHighlightText: {
    //     color: 'rgba(96,100,109, 0.8)',
    // },
    // codeHighlightContainer: {
    //     backgroundColor: 'rgba(0,0,0,0.05)',
    //     borderRadius: 3,
    //     paddingHorizontal: 4,
    // },
    // getStartedText: {
    //     fontSize: 17,
    //     color: 'rgba(96,100,109, 1)',
    //     lineHeight: 24,
    //     textAlign: 'center',
    // },
    // tabBarInfoContainer: {
    //     position: 'absolute',
    //     bottom: 0,
    //     left: 0,
    //     right: 0,
    //     ...Platform.select({
    //         ios: {
    //             shadowColor: 'black',
    //             shadowOffset: { height: -3 },
    //             shadowOpacity: 0.1,
    //             shadowRadius: 3,
    //         },
    //         android: {
    //             elevation: 20,
    //         },
    //     }),
    //     alignItems: 'center',
    //     backgroundColor: '#fbfbfb',
    //     paddingVertical: 20,
    // },
    // tabBarInfoText: {
    //     fontSize: 17,
    //     color: 'rgba(96,100,109, 1)',
    //     textAlign: 'center',
    // },
    // navigationFilename: {
    //     marginTop: 5,
    // },
    // helpContainer: {
    //     marginTop: 15,
    //     alignItems: 'center',
    // },
    // helpLink: {
    //     paddingVertical: 15,
    // },
    // helpLinkText: {
    //     fontSize: 14,
    //     color: '#2e78b7',
    // },
    // parent: {
    //     width: '100%', 
    //     flexDirection: 'row', 
    //     flexWrap: 'wrap',
    //     marginTop: 50,
    // },
    // child: {
    //     width: '48%', 
    //     margin: '1%', 
    //     aspectRatio: 1,
    //     borderRadius:20,
    //     borderWidth: 1,
    //     borderColor: '#fff',
    // },
    // gridView: {
    //     paddingTop: 25,
    //     flex: 1,
    // },
    // itemContainer: {
    //     justifyContent: 'flex-end',
    //     borderRadius: 5,
    //     padding: 10,
    //     height: 200,
    // },
    // itemName: {
    //     fontSize: 16,
    //     color: '#fff',
    //     fontWeight: '600',
    // },
    // itemCode: {
    //     fontWeight: '600',
    //     fontSize: 12,
    //     color: '#fff',
    // },
    // drawImage:{
    //     height:100,
    //     width: 100,
    //     borderRadius:75,
    // },
    // navBar:{
    //     height:100,
    //     width: 100,
    // },
});
