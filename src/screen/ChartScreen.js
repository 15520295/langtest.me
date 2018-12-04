import React from 'react';
import {ScrollView, StyleSheet, Text, requireNativeComponent, View} from 'react-native';
// import { ExpoLinksView } from '@expo/samples';
import PureChart from 'react-native-pure-chart';

export default class ChartScreen extends React.Component {

    static navigationOptions = {
        header: null // !!! Hide Header
        // title:'Home 1',
        // // header: { visible:false },
        // drawerIcon:(
        //     <Image source={require('../../assets/images/home.png')}
        //            style={{height: 24, width: 24}}
        //     />
        // )
    };

    render() {
        let sampleData = [
            {
                seriesName: 'series1',
                data: [
                    {x: '2018-02-01', y: 30},
                    {x: '2018-02-02', y: 200},
                    {x: '2018-02-03', y: 170},
                    {x: '2018-02-04', y: 250},
                    {x: '2018-02-05', y: 10}
                ],
                color: '#297AB1'
            },
            {
                seriesName: 'series2',
                data: [
                    {x: '2018-02-01', y: 20},
                    {x: '2018-02-02', y: 100},
                    {x: '2018-02-03', y: 140},
                    {x: '2018-02-04', y: 550},
                    {x: '2018-02-05', y: 40}
                ],
                color: '#b1af31'
            },
            {
                seriesName: 'series3',
                data: [
                    {x: '2018-03-01', y: 20},
                    {x: '2018-03-02', y: 50},
                    {x: '2018-03-03', y: 550},
                    {x: '2018-03-04', y: 200},
                    {x: '2018-03-05', y: 140}
                ],
                color: '#f1ae31'
            }
        ]

        return (
            <View style={{flex:1, justifyContent:'center',alignContent:'center'}}>
                <PureChart type={'line'}
                       style={styles.container}
                       data={sampleData}
                       width={'100%'}
                        height={200}
                       customValueRenderer={(index, point) => {
                           if (index % 2 === 0) return null;
                           return (
                               <Text style={{textAlign: 'center'}}>{point.y}</Text>
                           );
                       }}/>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
        alignItems: 'center',

    },
});