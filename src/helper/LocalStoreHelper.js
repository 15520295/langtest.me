import React from 'react';

import {
    AsyncStorage
} from 'react-native';


export default class LocalStoreHelper {
    static topicResult = 'topicResult';

    static score = 'score';

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
            const str = await AsyncStorage.getItem(key);
            return new Map(JSON.parse(str));
        } catch (error) {
            // Error retrieving data
            console.log('Chi CS error: ' + error);
        }
    };

    static _printMapConsole(map) {
        console.log('Chi CS _printMapConsole: ' +
            JSON.stringify(Array.from(map.entries())));
    }
}