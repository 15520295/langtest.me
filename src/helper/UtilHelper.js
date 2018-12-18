import React from 'react';

import {
    AsyncStorage
} from 'react-native';

export default class UtilHelper {
    static _mapToObject = (map) => {
        let jsonResponse = {};
        for (let [key, val] of map.entries()) {
            jsonResponse[key] = val;
        }
        return jsonResponse;
    };

    static _objectToMap = (obj) => {
        return new Map(Object.entries(obj));
    };

    static _printMapConsole = (map) => {
        if (map != null) {
            console.log('Chi CS _printMapConsole: ' +
                JSON.stringify(Array.from(map.entries())));
        } else {
            console.log('Chi CS _printMapConsole: ' + 'null');
        }
    }
}