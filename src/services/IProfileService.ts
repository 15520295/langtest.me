import IProfile from "../entity/Profile";

export default interface IProfileService{
    loadProfile() : void,
    getProfile() : IProfile,
    updateProfile(totalQuestion: number, correctedAnswer : number, incorrectAnswer : number, timeSpent: number, mode: number) : void,
}