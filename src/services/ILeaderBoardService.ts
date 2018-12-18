import IProfile from '../entity/Profile';

export default interface ILeaderBoardService {
    getMyProfile(): IProfile,

    getLeaderBoardDay(index: number, numberOfProfile: number): IProfile[],

    getLeaderBoardAll(index: number, numberOfProfile: number): IProfile[],
}