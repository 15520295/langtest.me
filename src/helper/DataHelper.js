import React from 'react';

import {
    AsyncStorage
} from 'react-native';
import * as firebase from "firebase";


class DataHelper {
    UID = Expo.Constants.installationId;

    topicResult = 'topicResult';

    _storeUserData = async (data) => {
        firebase.database().ref('users/' + this.UID).set(data);
    };

    _getUserData(callback) {
        firebase.database()
            .ref('users/' + this.UID)
            .on('value', (snapshot) => {
            const data = snapshot.val();
            callback(data);
        });
    }
}

const instance = new DataHelper();
Object.freeze(instance);

export default instance;