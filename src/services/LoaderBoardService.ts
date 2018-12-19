import ILeaderBoardService from './ILeaderBoardService';
import IProfile from '../entity/Profile';


class LeaderBoardService implements ILeaderBoardService {

    getMyProfile(): IProfile {
        return {
            name: 'Trump',
            avatar: 2,
            correctAnswer: 2101,
            incorrectAnswer: 212,
            totalQuestion: 2602,
            rank: 2,
            timeSpent: 1212
        };
    }

    getLeaderBoardAll(_index: number, _numberOfProfile: number): IProfile[] {
        throw new Error('Method not implemented.');
    }

    getLeaderBoardDay(_index: number, _numberOfProfile: number): IProfile[] {
        let profileLeaderBoardDay: IProfile[] = [{
            name: 'Alice',
            avatar: 2,
            correctAnswer: 2700,
            incorrectAnswer: 230,
            totalQuestion: 3000,
            rank: 1,
            timeSpent: 21201
        }, {
            name: 'Trump',
            avatar: 2,
            correctAnswer: 2101,
            incorrectAnswer: 212,
            totalQuestion: 2602,
            rank: 2,
            timeSpent: 1212
        }];

        return profileLeaderBoardDay;
    }
}

const sharedLeaderBoardService = new LeaderBoardService();
export default sharedLeaderBoardService;