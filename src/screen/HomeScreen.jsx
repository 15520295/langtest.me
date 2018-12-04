import React, { Component } from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
} from 'react-native';
import { WebBrowser } from 'expo';
import GridView from 'react-native-super-grid';

import {Icon, Button, Header, Content, Left, Container} from 'native-base';


var imageGrid = require('../../assets/images/joychou.jpg');

export default class HomeScreen extends React.Component {
    _onPressCard(){
    // Toast.show('This is a long toast.', Toast.LONG)
        Alert.alert('You tapped the button!');
    }

  static navigationOptions = {
      header: null,
      title:'Home',
      drawerIcon:(
          <Image source={require('../../assets/images/home.png')}
                 style={{height: 12, width: 12}}
          />
      )
  };

  render() {
      // Taken from https://flatuicolors.com/
      const items = [
          { name: 'Grammar', code: '#1abc9c' }, { name: 'Vocabulary', code: '#2ecc71' },
          { name: 'Listening', code: '#3498db' }, { name: 'Writing', code: '#9b59b6' },
          { name: 'Speaking', code: '#34495e' }, { name: 'Reading', code: '#16a085' },
          { name: 'Rule of test', code: '#27ae60' }, 
      // { name: 'BELIZE HOLE', code: '#2980b9' },
      // { name: 'WISTERIA', code: '#8e44ad' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
      // { name: 'SUN FLOWER', code: '#f1c40f' }, { name: 'CARROT', code: '#e67e22' },
      // { name: 'ALIZARIN', code: '#e74c3c' }, { name: 'CLOUDS', code: '#ecf0f1' },
      // { name: 'CONCRETE', code: '#95a5a6' }, { name: 'ORANGE', code: '#f39c12' },
      // { name: 'PUMPKIN', code: '#d35400' }, { name: 'POMEGRANATE', code: '#c0392b' },
      // { name: 'SILVER', code: '#bdc3c7' }, { name: 'ASBESTOS', code: '#7f8c8d' },
      ];
      return (
          <Container>
              {/* <Header>
            <Left>
              <Icon name="ios-menu" onPress={()=>this.props.navigation.navigate('DrawerOpen')} />
            </Left>
        </Header> */}
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
    drawImage:{
        height:100,
        width: 100,
        borderRadius:75,
    },
});
