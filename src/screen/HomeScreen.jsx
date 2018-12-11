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
        }
    }

    renderNav() {

        const titleConfig = {
            title: 'react-native-card-modal',
        };

        return (
            <NavigationBar
                title={titleConfig}/>
        )

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

  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this)
  }
  
  _renderItem({ item }) {
    return (
      <View style={styles.viewCard}>
        <Card>
            <CardImage 
                source={{uri: 'http://bit.ly/2GfzooV'}} 
                title={item.name}
            />
            <CardTitle
                subtitle="Number 6"
            />
            <CardContent text={item.sub} />
            <CardAction 
                separator={true} 
                inColumn={false}>
                    <CardButton
                        onPress={() => {}}
                        title="Test"
                        color="#FEB557"
                    />
                    <CardButton
                        onPress={() => {}}
                        title="Chart"
                        color="#FEB557"
                    />
            </CardAction>
        </Card>
    </View> 
    );
  }

  render() {
      // Taken from https://flatuicolors.com/
      const items = [
          { name: 'Grammar', code: '#1abc9c' }, { name: 'Vocabulary', code: '#2ecc71' },
          { name: 'Listening', code: '#3498db' }, { name: 'Writing', code: '#9b59b6' },
          { name: 'Speaking', code: '#34495e' }, { name: 'Reading', code: '#16a085' },
          { name: 'Rule of test', code: '#27ae60' }, 
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
        <Container>
        <Header>
             <Left>
               <Icon name="ios-menu" onPress={()=>this.props.navigation.navigate('DrawerOpen')} />
             </Left>
        </Header>
            <ScrollView>
            <View style={styles.container}>
                <Carousel
                    layout={'default'}
                    data={itemCarousel}
                    firstItem={FirstItem}
                    itemWidth={ItemWidth}
                    sliderWidth={SliderWidth}
                    activeSlideAlignment='center'
                    renderItem={this._renderItem}
                    backgroundColor= 'white'
                />
            </View>

            <GridView
                  itemDimension={130}
                  items={items}
                  style={styles.gridView}
                  renderItem={item => (
                      <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                          <Image style={styles.drawImage}
                              source={imageGrid}
                              onPress={this._onPressCard} 
                          />
                          <Text style={styles.itemName}>{item.name}</Text>
                          <Text style={styles.itemCode}>{item.code}</Text>
                      </View>
                  )}
              />
              {/* <CardModal title={'Walmart'}
                           description={'Electronics, home, furniture, and more'}
                           image={require('../../assets/images/reading.jpg').default}
                           color={'#0E48BE'}
                           content={'What started small, with a single discount store and the simple idea of selling more for less, has grown over the last 50 years into the largest retailer in the world. Today, nearly 260 million customers visit our more than 11,500 stores under 63 banners in 28 countries and e-commerce sites in 11 countries each week. With fiscal year 2016 revenue of $482.1 billion, Walmart employs 2.3 million associates worldwide – 1.5 million in the U.S. alone. It’s all part of our unwavering commitment to creating opportunities and bringing value to customers and communities around the world.'}
                           onClick={() => this.disableScroll()}
                           due={3}
                />
                <CardModal title={'Taco Bell'}
                           description={'Tacos, burritos, and more tacos'}
                           image={require('../../assets/images/reading.jpg').default}
                           color='#662BAB'
                           content={'Taco Bell is an American chain of fast-food restaurants based in Irvine, California. A subsidiary of Yum! Brands, Inc., they serve a variety of Tex-Mex foods, including tacos, burritos, quesadillas, nachos, other specialty items, and a variety of "value menu" items. Taco Bell serves more than 2 billion customers each year in 6,407 restaurants, more than 80 percent of which are owned and operated by independent franchisees and licensees.'}
                           onClick={() => this.disableScroll()}
                           due={5}
                />
                <CardModal title={'Walgreens'}
                           description={'Prescribed medicine, contact lenses, and more'}
                           image={require('../../assets/images/reading.jpg').default}
                           color={'#fc3758'}
                           content={'In December 2014, Walgreens completed its strategic combination with Alliance Boots to establish Walgreens Boots Alliance, Inc., forging the first global pharmacy-led, health and wellbeing enterprise. The combination brought together two leading companies with iconic brands, complementary geographic footprints, shared values and a heritage of trusted health care services through community pharmacy care and pharmaceutical wholesaling.  Both companies have more than a century’s worth of experience in customer and patient care. Walgreens is today part of the Retail Pharmacy USA division of Walgreens Boots Alliance.'}
                           onClick={() => this.disableScroll()}
                           due={4}
                />
                <CardModal title={'Apple'}
                           description={'iPhone, iPad, Mac, and Apple Watch'}
                           image={require('../../assets/images/reading.jpg').default}
                           color='black'
                           content={'Apple is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services.'}
                           onClick={() => this.disableScroll()}
                           due={1}
                /> */}
        </ScrollView>
        </Container>
        
      );
  }
}

const styles = StyleSheet.create({
    viewCard: {
        // flex: 1
        width: ItemWidth,
        height: ItemHeight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    container: {
        // flex: 1,
        // backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
        backgroundColor: '#ecf0f1',
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
                shadowOffset: { height: -3 },
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
        borderRadius:20,
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
        height: 200,
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
    drawImage:{
        height:100,
        width: 100,
        borderRadius:75,
    },
    navBar:{
        height:100,
        width: 100,
    },
    box: {
        backgroundColor: 'red'
    },
    button: {
        borderColor: 1,
        borderWidth: 1,
    }
});
