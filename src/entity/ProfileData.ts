// import IProfile from "./Profile";
// import DataHelper from '../helper/DataHelper';
//
// export interface TestResultData{
//     totalQuestion: number,
//     correctAnswer: number,
//     incorrectAnswer: number,
//     timeSpent: number,
// }
//
// export class ProfileData{
//     private _testResultData: Map<number, TestResultData> = new Map();
//
//     public get correctAnswer() : number {
//         let _correctAnswer: number = 0;
//         this._testResultData.forEach((value) => {
//             _correctAnswer += value.correctAnswer;
//         })
//         return _correctAnswer;
//     }
//
//     public get incorrectAnswer() : number {
//         let _incorrectAnswer: number = 0;
//         this._testResultData.forEach((value) => {
//             _incorrectAnswer += value.incorrectAnswer;
//         })
//         return _incorrectAnswer;
//     }
//
//     public get totalQuestion() : number {
//         let _totalQuestion: number = 0;
//         this._testResultData.forEach((value) => {
//             _totalQuestion += value.totalQuestion;
//         })
//         return _totalQuestion;
//     }
//
//     public get timeSpent() : number {
//         let _timeSpent: number = 0;
//         this._testResultData.forEach((value) => {
//             _timeSpent += value.timeSpent;
//         })
//         return _timeSpent;
//     }
//
//     public get rank() : number {
//         return this._rank;
//     }
//     public set rank(v : number) {
//         this._rank = v;
//     }
//
//     public get profile() : IProfile {
//         let _timeSpent: number = 0;
//         let _totalQuestion: number = 0;
//         let _correctAnswer: number = 0;
//         let _incorrectAnswer: number = 0;
//         this._testResultData.forEach((value) => {
//             _timeSpent += value.timeSpent;
//             _correctAnswer += value.correctAnswer;
//             _incorrectAnswer += value.incorrectAnswer
//             _totalQuestion += value.totalQuestion
//         })
//
//         let _profile : IProfile = {
//             avatar: this._avatar,
//             name: this._name,
//             rank: this._rank,
//             timeSpent: _timeSpent,
//             totalQuestion: _totalQuestion,
//             correctAnswer: _correctAnswer,
//             incorrectAnswer: _incorrectAnswer
//         }
//
//         return _profile;
//     }
//
//     public updateTestData(mode: number, totalQuestion: number, correctAnswer: number, incorrectAnswer: number, timeSpent: number){
//         let testResult: TestResultData =  this._testResultData.get(mode);
//         if(testResult !== undefined){
//             testResult.correctAnswer += correctAnswer;
//             testResult.incorrectAnswer += incorrectAnswer;
//             testResult.timeSpent += timeSpent;
//             testResult.totalQuestion += totalQuestion;
//         } else {
//             testResult = {
//                 correctAnswer: correctAnswer,
//                 incorrectAnswer: incorrectAnswer,
//                 timeSpent: timeSpent,
//                 totalQuestion: totalQuestion
//             }
//         }
//         this._testResultData.set(mode, testResult);
//
//         //
//
//     }
//
//     _saveUserTestResult() {
//
//     }
//
//     public getPercent(mode: number): number{
//         let testResult: TestResultData =  this._testResultData.get(mode);
//         if(testResult !== undefined){
//             return Math.ceil(100 * testResult.correctAnswer / testResult.totalQuestion);
//         } else {
//             return 0;
//         }
//     }
//
//     public async syncCloud(): Promise<void>{
//
//     }
//
// }
//
// const MyProfile = new ProfileData();
// export default MyProfile;