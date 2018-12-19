import IProfile from "./Profile";

export interface TestResultData{
    totalQuestion: number,
    correctAnswer: number,
    incorrectAnswer: number,
    timeSpent: number,
}

export class ProfileData{
    private _name : string = 'ParkHanSeo';
    private _avatar : number = require('./../../assets/images/joychou.jpg');
    private _rank : number = 0;
    private _testResultData: Map<number, TestResultData> = new Map();

    public get name() : string {
        return this._name;
    }
    public set name(v : string) {
        this._name = v;
    }

    public get avatar() : number {
        return this._avatar;
    }


    public set avatar(v : number) {
        this._avatar = v;
    }

    public get correctAnswer() : number {
        let _correctAnswer: number = 0;
        this._testResultData.forEach((value) => {
            _correctAnswer += value.correctAnswer;
        })
        return _correctAnswer;
    }

    public get incorrectAnswer() : number {
        let _incorrectAnswer: number = 0;
        this._testResultData.forEach((value) => {
            _incorrectAnswer += value.incorrectAnswer;
        })
        return _incorrectAnswer;
    }

    public get totalQuestion() : number {
        let _totalQuestion: number = 0;
        this._testResultData.forEach((value) => {
            _totalQuestion += value.totalQuestion;
        })
        return _totalQuestion;
    }

    public get timeSpent() : number {
        let _timeSpent: number = 0;
        this._testResultData.forEach((value) => {
            _timeSpent += value.timeSpent;
        })
        return _timeSpent;
    }

    public get rank() : number {
        return this._rank;
    }
    public set rank(v : number) {
        this._rank = v;
    }

    public loadProfile(){

    }

    public get profile() : IProfile {
        let _timeSpent: number = 0;
        let _totalQuestion: number = 0;
        let _correctAnswer: number = 0;
        let _incorrectAnswer: number = 0;
        this._testResultData.forEach((value) => {
            _timeSpent += value.timeSpent;
            _correctAnswer += value.correctAnswer;
            _incorrectAnswer += value.incorrectAnswer
            _totalQuestion += value.totalQuestion
        })

        let _profile : IProfile = {
            avatar: this._avatar,
            name: this._name,
            rank: this._rank,
            timeSpent: _timeSpent,
            totalQuestion: _totalQuestion,
            correctAnswer: _correctAnswer,
            incorrectAnswer: _incorrectAnswer
        }

        return _profile;
    }

    public updateTestData(mode: number, totalQuestion: number, correctAnswer: number, incorrectAnswer: number, timeSpent: number){
        let testResult: TestResultData =  this._testResultData.get(mode);
        if(testResult !== undefined){
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
            }
        }
        this._testResultData.set(mode, testResult);
    }

    public async syncCloud(): Promise<void>{

    }
}

const MyProfile = new ProfileData();
export default MyProfile;