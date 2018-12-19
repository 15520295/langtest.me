import React from 'react';

import {
    AsyncStorage
} from 'react-native';
import UtilHelper from "./UtilHelper";

export default class LocalStoreHelper {
    static topicResult = 'topicResult';

    static score = 'score';

    static profile = 'profile';

    static testResult = 'testResult';

    static _storeMapData = async (key, map) => {
        try {
            console.log('_storeMapData' + key + ' : ');
            UtilHelper._printMapConsole(map);
            const str = JSON.stringify(Array.from(map.entries()));

            await AsyncStorage.setItem(key, str,
                error => {
                    // console.log('ERROR - _storeMapData - ' + key + ' : ' + error);
                });

        } catch (error) {
            // Error saving data
            console.log('ERROR - _storeMapData - ' + key + ' : ' + error);
        }
    };

    static _getMapData = async (key) => {
        try {
            const str = await AsyncStorage.getItem(key,
                    error => {
                // console.log('ERROR - _storeMapData - ' + key + ' : ' + error);
            });
            return new Map(JSON.parse(str));
        } catch (error) {
            console.log('Chi CS error: ' + error);
        }
    };

    static _removeData = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log('Chi CS error: ' + error);
        }
    };
}