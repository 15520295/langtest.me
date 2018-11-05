import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import WordFlatList from './components/WordFlatList';
import HomeScreen from './screen/HomeScreen';
import SettingsScreen from './screen/SettingsScreen';
import AboutScreen from './screen/AboutScreen';

import {DrawerNavigator, DrawerItems} from 'react-navigation';
import { Container, Header, Body, Content } from 'native-base';
import DatabaseScreen from './screen/DatabaseScreen';

export default class App extends React.Component {
    render() {
        return (
        // <View style={styles.container}>
        //     <WordFlatList>

            //     </WordFlatList>
            // </View>
            <MyApp/>
        );
    }
}

const CustomDrawerContentComponent = (props) => (
    <Container>
        <Header style={{height: 200, backgroundColor:'white'}}>
            <Body>
                <Image 
                    style={styles.drawImage}
                    source={require('./../assets/images/joychou.jpg')}/>
            </Body>
        </Header>
        <Content>
            <DrawerItems {...props}/>
        </Content>
    </Container>
);

const MyApp = DrawerNavigator({
    Home:{
        screen: WordFlatList
    },
    Setting: {
        screen: SettingsScreen
    },
    About:{
        screen: AboutScreen
    },
    Database:{
        screen: DatabaseScreen
    }
},{
    initialRouteName:'Database',
    drawerPosition: 'center',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute:'DrawerOpen',
    drawerCloseRoute:'DrawerClose',
    drawerToggleRoute:'DrawerToggle'
}
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawImage:{
        flex: 1,
        height:100,
        width: 200,
        borderRadius:75,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
