import React from 'react';
import {Constants} from 'expo';
import * as firebase from "firebase";
import UtilHelper from "./UtilHelper";
import LocalStoreHelper from "./LocalStoreHelper";

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

    // ----------------- User Profile

    curUserProfile = new Map();

    _initUserProfile = (name, place, phone) => {
        this.curUserProfile = new Map();

        this.curUserProfile.set('name', name);
        this.curUserProfile.set('place', place);
        this.curUserProfile.set('phone', phone);
    };

    _saveUserProfileLocal = () => {
        LocalStoreHelper._storeMapData(LocalStoreHelper.profile, this.curUserProfile);
    };

    isProfileNull = (profile) => {
        if (profile != null && profile instanceof Map) {
            if (
                profile.get('name') == null
                || profile.get('place') == null
                || profile.get('phone') == null
            ) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    };

    _loadUserProfile = async (callback) => {
        if (this.isProfileNull(this.curUserProfile)) {
            console.log('Chi CS 1:  ');
            const localUserProfile = await LocalStoreHelper._getMapData(LocalStoreHelper.profile);

            UtilHelper._printMapConsole(localUserProfile);
            if (! this.isProfileNull(localUserProfile)) {
                console.log('Chi CS 2: ');
                UtilHelper._printMapConsole(localUserProfile);

                this._initUserProfile(localUserProfile.get('name'),
                    localUserProfile.get('place'),
                    localUserProfile.get('phone'));
            } else {
                console.log('Chi CS 3: ');
                // Generate Random
                const name = UtilHelper._generateName();

                this._initUserProfile(name, 'Viet Nam', '+0100000');
                this._saveUserProfileLocal();
            }
        }
        console.log('Chi CS 0:  ');
        UtilHelper._printMapConsole(this.curUserProfile);
        callback(this.curUserProfile);
    }
}

const instance = new DataHelper();
Object.freeze(instance);

export default instance;