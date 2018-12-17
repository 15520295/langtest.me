import React from 'react';

import {
    AsyncStorage
} from 'react-native';


export default class MyUtils {
    static topicResult = 'topicResult';

    static _storeMapData = async (key, map) => {
        try {
            const str = JSON.stringify(Array.from(map.entries()));

            await AsyncStorage.setItem(key, str);

        } catch (error) {
            // Error saving data
            console.log('ERROR - _storeMapData - ' + key + ' : ' + error);
        }
    };

    static _getMapData = async (key) => {
        try {
            const str = await AsyncStorage.getItem('topicResult');
            return new Map(JSON.parse(str));
        } catch (error) {
            // Error retrieving data
            console.log('Chi CS error: ' + error);
        }
    };
}