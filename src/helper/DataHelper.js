import React from 'react';
import {Constants} from 'expo';
import * as firebase from "firebase";
import UtilHelper from "./UtilHelper";

class DataHelper {
    UID = Constants.installationId;

    usersArr = new Map();

    _getCurrentUserData = () => {
        return this.usersArr.get(this.UID);
    };

    _getUsersData = () => {
        return this.usersArr;
    };

    _getSortedUsersData = () => {
        return new Map(
            Array
                .from(this.usersArr)
                .sort((a, b) => {
                    // a[0], b[0] is the key of the map
                    // a[1], b[1] is the value of the map
                    return a[1].get('correctAnswer') - b[1].get('correctAnswer');
                })
        );
    };

    _putCurUserDataToServer = async () => {
        let userObj = {
            name: 'Alice',
            avatar: 2,
            totalQuestion: 2602,
            correctAnswer: 2101,
            timeSpent: 1212
        };

        firebase.database()
            .ref('users/' + this.UID)
            .set(userObj, (result) => {
                console.log('CCS _upServerUserMap: ' + result);
            });
    };

    _getUserMapFromServer = (callback) => {
        let usersRef = firebase.database().ref('users/');
        usersRef.once('value',
            (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const childKey = childSnapshot.key;
                    const childData = childSnapshot.val();
                    const data = UtilHelper._objectToMap(childData);

                    this.usersArr.set(childKey, data);
                });

                callback();
            });
    };

}

const instance = new DataHelper();
Object.freeze(instance);

export default instance;