import React from 'react';
import {ScrollView, StyleSheet, Text, requireNativeComponent} from 'react-native';
// import { ExpoLinksView } from '@expo/samples';
import PureChart from 'react-native-pure-chart';

export default class ChartScreen extends React.Component {
    // static navigationOptions = {
    //     title: 'Links',
    // };

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
            }
        ]

        return (
            <PureChart type={'line'}
                       style={styles.container}
                       data={sampleData}
                       width={'50%'}
                       height={100}
                       customValueRenderer={(index, point) => {
                           if (index % 2 === 0) return null
                           return (
                               <Text style={{textAlign: 'center'}}>{point.y}</Text>
                           )
                       }}/>
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