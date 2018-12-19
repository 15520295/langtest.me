import React from 'react';
import {Constants} from 'expo';
import * as firebase from "firebase";
import UtilHelper from "./UtilHelper";
import LocalStoreHelper from "./LocalStoreHelper";
import {TestResultData} from "../entity/ProfileData";

class DataHelper {
    UID = Constants.installationId;

    usersArr = new Map();

    _getCurLeaderBoardProfile = (callback) => {
        if (this.usersArr.get(this.UID) == null) {
             this._createCurServerProfile(curSeverProfile =>{
                 this._putCurUserDataToServer();

                 this.usersArr.set(this.UID, curSeverProfile);
                 callback(curSeverProfile);
             });
        } else {
            callback(this.usersArr.get(this.UID));
        }
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
                    return b[1].get('correctAnswer') - a[1].get('correctAnswer') ;
                })
        );
    };

    _getLeaderBoardDataRanked = () => {
        const sortedUsersData = this._getSortedUsersData();
        let i = 1;
        sortedUsersData.forEach(userProfile => {
            userProfile.set('rank', i);
            i++;
        });

        return sortedUsersData;
    };

    _putCurUserDataToServer = async () => {
        this._createCurServerProfile(curServerProfile => {
            const objectData = UtilHelper._mapToObject(curServerProfile);

            firebase.database()
                .ref('users/' + this.UID)
                .set(objectData,
                    (result) => {
                        console.log('CCS _upServerUserMap - result : ' + result);
                    }
                );
        });
    };

    _loadUserMapFromServer = (callback) => {
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
            // this._testResultData = new Map(testResult);
            for (const [key, value] of testResult.entries()) {
                this._testResultData.set(key, value);
            }
        }

        callback(testResult);
    };

    _createCurServerProfile = (callback) => {
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

        this._loadUserProfile(profile => {
            const curSeverProfile = new Map();

            curSeverProfile.set('name', profile.get('name'));
            curSeverProfile.set('avatar', profile.get('avatar'));
            curSeverProfile.set('timeSpent', _timeSpent);
            curSeverProfile.set('totalQuestion', _totalQuestion);
            curSeverProfile.set('correctAnswer', _correctAnswer);
            curSeverProfile.set('incorrectAnswer', _incorrectAnswer);

            callback(curSeverProfile);
        });
    };

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

    _getUserAvatar(num) {
        if (num == null &&
            this.curUserProfile != null &&
            this.curUserProfile.get('avatar') != null) {
            num = this.curUserProfile.get('avatar');
        }

        switch (num) {
            case 0:
                return require('../../assets/icon/avatar1.jpg');
            case 1:
                return require('../../assets/icon/avatar2.jpg');
            case 2:
                return require('../../assets/icon/avatar3.jpg');
            case 3:
                return require('../../assets/icon/avatar4.jpg');
            default:
                return require('../../assets/icon/avatar1.jpg');
        }
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