import React from 'react';
import {Constants} from 'expo';
import * as firebase from "firebase";
import UtilHelper from "./UtilHelper";
import LocalStoreHelper from "./LocalStoreHelper";
import {TestResultData} from "../entity/ProfileData";

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

    //region ----------- User Result

    _getTotalCorrectAnswer() {
        let _correctAnswer = 0;
        this._testResultData.forEach((value) => {
            _correctAnswer += value.correctAnswer;
        });
        return _correctAnswer;
    }

    _getTotalIncorrectAnswer() {
        let _incorrectAnswer = 0;
        this._testResultData.forEach((value) => {
            _incorrectAnswer += value.incorrectAnswer;
        });
        return _incorrectAnswer;
    }

    _getTotalTotalQuestion() {
        let _totalQuestion = 0;
        this._testResultData.forEach((value) => {
            _totalQuestion += value.totalQuestion;
        });
        return _totalQuestion;
    }

    _getTotaltimeSpent() {
        let _timeSpent = 0;
        this._testResultData.forEach((value) => {
            _timeSpent += value.timeSpent;
        });
        return _timeSpent;
    }

    _testResultData = new Map();

    _updateTestResult(mode, totalQuestion, correctAnswer, incorrectAnswer, timeSpent) {
        let testResult = this._testResultData.get(mode);
        if (testResult !== undefined) {
            testResult.correctAnswer += correctAnswer;
            testResult.incorrectAnswer += incorrectAnswer;
            testResult.timeSpent += timeSpent;
            testResult.totalQuestion += totalQuestion;
        } else {
            testResult = {
                correctAnswer: correctAnswer,
                incorrectAnswer: incorrectAnswer,
                timeSpent: timeSpent,
                totalQuestion: totalQuestion
            };
        }
        this._testResultData.set(mode, testResult);

        LocalStoreHelper._storeMapData(LocalStoreHelper.testResult, this._testResultData);
    }

    _loadTestResult = async (callback) => {
        const testResult = await LocalStoreHelper._getMapData(LocalStoreHelper.testResult);
        if (testResult != null && testResult instanceof Map) {
            this._testResultData = new Map(testResult);

            UtilHelper._printMapConsole(testResult);
            UtilHelper._printMapConsole(this._testResultData);
        }

        callback(testResult);
    };

    _getProfile(callback) {
        let _timeSpent = 0;
        let _totalQuestion = 0;
        let _correctAnswer = 0;
        let _incorrectAnswer = 0;
        this._testResultData.forEach((value) => {
            _timeSpent += value.timeSpent;
            _correctAnswer += value.correctAnswer;
            _incorrectAnswer += value.incorrectAnswer;
            _totalQuestion += value.totalQuestion;
        });

        

        let _profile = {
            name: ,
            timeSpent: _timeSpent,
            totalQuestion: _totalQuestion,
            correctAnswer: _correctAnswer,
            incorrectAnswer: _incorrectAnswer
        };

        return _profile;
    }

    _getPercent(mode) {
        let testResult = this._testResultData.get(mode);
        if (testResult !== undefined) {
            return Math.ceil(100 * testResult.correctAnswer / testResult.totalQuestion);
        } else {
            return 0;
        }
    }


    //endregion

    //region ----------------- User Profile

    _getUserAvatar() {
        return require('../../assets/images/settings.png');
    }

    curUserProfile = new Map();

    _initUserProfile = (name, avatar, place, phone) => {
        this.curUserProfile = new Map();

        this.curUserProfile.set('name', name);
        this.curUserProfile.set('avatar', avatar);
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
                || profile.get('avatar') == null
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
            // console.log('Chi CS 1:  ');
            const localUserProfile = await LocalStoreHelper._getMapData(LocalStoreHelper.profile);

            UtilHelper._printMapConsole(localUserProfile);
            if (!this.isProfileNull(localUserProfile)) {
                // console.log('Chi CS 2: ');
                UtilHelper._printMapConsole(localUserProfile);

                this._initUserProfile(localUserProfile.get('name'),
                    localUserProfile.get('avatar'),
                    localUserProfile.get('place'),
                    localUserProfile.get('phone'));
            } else {
                // console.log('Chi CS 3: ');
                // Generate Random
                const name = UtilHelper._generateName();
                const rand = Math.floor(Math.random() * 4);

                this._initUserProfile(name, rand, 'Viet Nam', '+0100000');
                this._saveUserProfileLocal();
            }
        }
        // console.log('Chi CS 0:  ');
        UtilHelper._printMapConsole(this.curUserProfile);
        callback(this.curUserProfile);
    }

    //endregion
}

const instance = new DataHelper();
Object.freeze(instance);

export default instance;